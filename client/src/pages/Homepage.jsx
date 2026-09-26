import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenuItems, setSelectedCategory, setSearchQuery } from '../redux/menuSlice';
import { addToCart, decreaseQuantity } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import {
  UtensilsCrossed,
  Search,
  Plus,
  Minus,
  ShoppingBag,
  BellRing,
  CheckCircle2,
  Sparkles,
  X,
  Clock,
  Flame,
  Award,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { menuItems, categories, loading, error, selectedCategory, searchQuery } =
    useSelector((state) => state.menu);

  const cartItems = useSelector((state) => state.cart.items);
  const tableNumber =
    useSelector((state) => state.cart.tableNumber) ||
    localStorage.getItem('tableNumber') ||
    '1';

  const [waiterModalOpen, setWaiterModalOpen] = useState(false);
  const [waiterRequestSent, setWaiterRequestSent] = useState(false);

  useEffect(() => {
    dispatch(fetchMenuItems(selectedCategory));
  }, [dispatch, selectedCategory]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * (item.menuItem.price || 0),
    0
  );

  const getItemQuantity = (id) => {
    const found = cartItems.find(
      (item) => (item.menuItem._id || item.menuItem.id) === id
    );
    return found ? found.quantity : 0;
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`Added ${item.name} to order`);
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleCallWaiter = (reason) => {
    setWaiterRequestSent(true);
    toast.success(`Waiter alerted for Table #${tableNumber}: ${reason}`);
    setTimeout(() => {
      setWaiterModalOpen(false);
      setWaiterRequestSent(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-28">
      {/* Table Dine-In Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/15 to-orange-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-md shadow-amber-500/20">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                Table #{tableNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Dine-In Active
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-medium border border-amber-400/20">
                <Zap className="w-3 h-3 text-amber-400" />
                Instant Kitchen Dispatch
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              QRDine{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
                Digital Menu
              </span>
            </h1>

            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
              Freshly prepared artisanal dishes. Tap any item to add to your table's order.
              Our staff will deliver hot meals directly to Table #{tableNumber}.
            </p>
          </div>

          {/* Quick Action Button for Waiter */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setWaiterModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-zinc-800/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-100 text-xs font-bold flex items-center gap-2.5 transition-all hover:border-amber-400/60 shadow-lg active:scale-95"
            >
              <BellRing className="w-4 h-4 text-amber-400 animate-bounce-slow" />
              <span>Call Waiter</span>
            </button>
            <button
              onClick={() => navigate('/welcome')}
              className="px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-semibold transition-all hover:border-zinc-700"
            >
              Change Table
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar & Search Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Explore Dishes</span>
            </h2>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 text-xs font-bold text-amber-400 border border-zinc-700/50">
              {menuItems.length} Available
            </span>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search dishes or drinks..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 pr-8 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => dispatch(setSelectedCategory(cat))}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-400 text-zinc-950 shadow-lg shadow-amber-400/20 scale-105'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800/90 border border-zinc-800/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900/50 border border-zinc-800 rounded-3xl h-80 animate-pulse p-4 space-y-3"
            >
              <div className="h-44 bg-zinc-800 rounded-2xl"></div>
              <div className="h-4 bg-zinc-800 rounded-lg w-3/4"></div>
              <div className="h-3 bg-zinc-800 rounded-lg w-1/2"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 space-y-4">
          <p className="text-red-400 font-semibold">{error}</p>
          <button
            onClick={() => dispatch(fetchMenuItems(selectedCategory))}
            className="px-5 py-2.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
          >
            Retry Loading
          </button>
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 space-y-3">
          <UtensilsCrossed className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No items found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try searching for another dish or selecting a different menu category above.
          </p>
        </div>
      ) : (
        /* Menu Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const qty = getItemQuantity(item._id);
            return (
              <div
                key={item._id}
                className="group bg-zinc-900/70 border border-zinc-800/90 hover:border-amber-400/40 rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop';
                      }}
                    />

                    {/* Veg Badge */}
                    <div className="absolute top-3.5 left-3.5 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">
                        100% Veg
                      </span>
                    </div>

                    {/* Category Pill */}
                    <div className="absolute bottom-3.5 left-3.5 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] text-zinc-300 font-bold border border-zinc-800/80">
                      {item.category}
                    </div>

                    {/* Price Badge Overlay */}
                    <div className="absolute bottom-3.5 right-3.5 bg-amber-400 text-black font-black text-sm px-3 py-1 rounded-xl shadow-lg shadow-amber-400/20">
                      ₹{item.price}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.description ||
                        'Delicious authentic recipe prepared with fresh ingredients and aromatic spices.'}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0">
                  {qty === 0 ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-3 px-4 bg-zinc-800 hover:bg-amber-400 text-white hover:text-black font-extrabold text-xs rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 border border-zinc-700/80 hover:border-amber-400 active:scale-95 shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Order</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-zinc-950/90 border border-amber-400/50 rounded-2xl p-1.5 shadow-inner">
                      <button
                        onClick={() => handleDecreaseQuantity(item._id)}
                        className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors active:scale-95"
                        aria-label="Decrease"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="font-extrabold text-xs text-amber-400 px-3">
                        {qty} in cart
                      </span>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-9 h-9 rounded-xl bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center font-bold transition-colors active:scale-95"
                        aria-label="Increase"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom Cart Bar */}
      {totalCartCount > 0 && (
        <aside 
          aria-label="Current Cart Order"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-xl z-50 animate-bounce-slow"
        >
          <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black p-4 rounded-3xl shadow-2xl flex items-center justify-between gap-4 font-bold border border-amber-300 glow-amber">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-black text-amber-400 flex items-center justify-center shrink-0 shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-black/80 font-extrabold">
                  Table #{tableNumber} • {totalCartCount}{' '}
                  {totalCartCount === 1 ? 'Item' : 'Items'}
                </p>
                <p className="text-xl font-black text-black">
                  ₹{totalCartPrice}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/cart')}
              className="py-3 px-5 bg-black text-white hover:bg-zinc-900 rounded-2xl text-xs font-extrabold transition-all shadow-xl active:scale-95 flex items-center gap-2 shrink-0"
            >
              <span>View Cart & Order</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </aside>
      )}

      {/* Call Waiter Modal */}
      {waiterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    Table #{tableNumber} Assistance
                  </h3>
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Floor Service</p>
                </div>
              </div>
              <button
                onClick={() => setWaiterModalOpen(false)}
                className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Need assistance at Table #{tableNumber}? Tap an option below to notify our staff immediately:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Bring Water', icon: '💧' },
                { title: 'Clean Table', icon: '🧹' },
                { title: 'Call Server', icon: '🙋‍♂️' },
                { title: 'Request Bill', icon: '🧾' },
              ].map((act) => (
                <button
                  key={act.title}
                  onClick={() => handleCallWaiter(act.title)}
                  className="p-4 rounded-2xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-amber-400 text-left transition-all text-xs font-bold text-zinc-200 active:scale-95 space-y-1"
                >
                  <span className="text-2xl block">{act.icon}</span>
                  <span>{act.title}</span>
                </button>
              ))}
            </div>

            {waiterRequestSent && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Our server is on their way to Table #{tableNumber}!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
