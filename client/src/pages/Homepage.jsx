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
    toast.success(`Added ${item.name} to cart`);
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
    <div className="space-y-8 pb-24">
      {/* Table Dine-In Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-black font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-md shadow-amber-400/20">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                Table #{tableNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Dine-In Active
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              QRDine{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Digital Menu
              </span>
            </h1>

            <p className="text-sm text-zinc-400 max-w-xl">
              Freshly prepared artisanal dishes. Tap any item to add to your
              table's order. Our staff will bring it straight to you!
            </p>
          </div>

          {/* Quick Action Button for Waiter */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWaiterModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2 transition-all hover:border-amber-400/50"
            >
              <BellRing className="w-4 h-4 text-amber-400" />
              <span>Call Waiter</span>
            </button>
            <button
              onClick={() => navigate('/welcome')}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors"
            >
              Change Table
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Explore Menu</span>
            <span className="text-xs font-normal text-zinc-500">
              ({menuItems.length} items)
            </span>
          </h2>

          {/* Search Box on mobile / inline */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search dishes or drinks..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-9 pr-8 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => dispatch(setSelectedCategory(cat))}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-bold'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
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
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl h-80 animate-pulse p-4 space-y-3"
            >
              <div className="h-44 bg-zinc-800 rounded-xl"></div>
              <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
              <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
          <p className="text-red-400 font-medium mb-3">{error}</p>
          <button
            onClick={() => dispatch(fetchMenuItems(selectedCategory))}
            className="px-5 py-2 rounded-xl bg-amber-400 text-black font-semibold text-xs hover:bg-amber-300"
          >
            Retry Loading
          </button>
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 space-y-3">
          <UtensilsCrossed className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No items found</h3>
          <p className="text-xs text-zinc-400">
            Try a different search term or category filter.
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
                className="group bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop';
                      }}
                    />

                    {/* Veg Badge */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        100% Veg
                      </span>
                    </div>

                    {/* Category Pill */}
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-zinc-300 font-medium border border-zinc-800">
                      {item.category}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-base font-black text-amber-400 whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.description ||
                        'Delicious authentic recipe prepared with fresh ingredients and aromatic spices.'}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:p-5 pt-0">
                  {qty === 0 ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-amber-400 text-white hover:text-black font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-zinc-700/80 hover:border-amber-400 active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Order</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-zinc-950/80 border border-amber-400/40 rounded-xl p-1">
                      <button
                        onClick={() => handleDecreaseQuantity(item._id)}
                        className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="font-extrabold text-xs text-amber-400 px-3">
                        {qty} in cart
                      </span>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-8 h-8 rounded-lg bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center font-bold transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
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
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-xl z-50 animate-bounce-slow"
        >
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-black p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 font-bold border border-amber-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-black/70">
                  Table #{tableNumber} • {totalCartCount}{' '}
                  {totalCartCount === 1 ? 'Item' : 'Items'}
                </p>
                <p className="text-lg font-black text-black">
                  ₹{totalCartPrice}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/cart')}
              className="py-2.5 px-5 bg-black text-white hover:bg-zinc-900 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <span>View Cart & Order</span>
              <span>➔</span>
            </button>
          </div>
        </aside>
      )}

      {/* Call Waiter Modal */}
      {waiterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-sm w-full space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellRing className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Table #{tableNumber} Service
                </h3>
              </div>
              <button
                onClick={() => setWaiterModalOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Need assistance at your table? Tap an option below to notify our
              floor team instantly:
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { title: 'Bring Water', icon: '💧' },
                { title: 'Clean Table', icon: '🧹' },
                { title: 'Call Server', icon: '🙋‍♂️' },
                { title: 'Request Bill', icon: '🧾' },
              ].map((act) => (
                <button
                  key={act.title}
                  onClick={() => handleCallWaiter(act.title)}
                  className="p-3.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-amber-400 text-left transition-all text-xs font-semibold text-zinc-200"
                >
                  <span className="text-lg block mb-1">{act.icon}</span>
                  <span>{act.title}</span>
                </button>
              ))}
            </div>

            {waiterRequestSent && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Our server has been notified for Table #{tableNumber}!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
