import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenuItems, setSelectedCategory, setSearchQuery } from '../redux/menuSlice';
import { addToCart, decreaseQuantity } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
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
  Star,
  Coffee,
  IceCream,
  Wheat,
  Salad,
  Soup,
  RotateCcw,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

// Helper to get category icons
const getCategoryIcon = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('starter') || cat.includes('appetizer')) return <Salad className="w-3.5 h-3.5" />;
  if (cat.includes('main') || cat.includes('curry') || cat.includes('gravy')) return <Soup className="w-3.5 h-3.5" />;
  if (cat.includes('bread') || cat.includes('roti') || cat.includes('naan')) return <Wheat className="w-3.5 h-3.5" />;
  if (cat.includes('beverage') || cat.includes('drink') || cat.includes('shake')) return <Coffee className="w-3.5 h-3.5" />;
  if (cat.includes('dessert') || cat.includes('sweet') || cat.includes('ice')) return <IceCream className="w-3.5 h-3.5" />;
  return <UtensilsCrossed className="w-3.5 h-3.5" />;
};

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
    <div className="space-y-10 pb-28">
      {/* Featured Restaurant Hero */}
      <Hero />

      {/* Table Dine-In Status Bar */}
      <div id="menu-section" className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-amber-400 text-black font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md shadow-amber-400/20">
                <UtensilsCrossed className="w-4 h-4" />
                Table #{tableNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Dine-In Session Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Chef Crafted{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
                Vegetarian Delights
              </span>
            </h1>

            <p className="text-sm text-zinc-300 max-w-xl leading-relaxed">
              Order directly from your phone. Dishes will be freshly prepared and brought
              straight to your table.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setWaiterModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-amber-400/60 text-zinc-200 text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <BellRing className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>Call Waiter</span>
            </button>
            <button
              onClick={() => navigate('/welcome')}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Switch Table
            </button>
          </div>
        </div>
      </div>

      {/* Menu Header & Search Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <span>Explore Our Menu</span>
              <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                {menuItems.length} Dishes
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Filter by category or search by dish name
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search paneer, dosa, soup, desserts..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 pr-9 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => dispatch(setSelectedCategory(cat))}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-black shadow-lg shadow-amber-400/20 scale-[1.02]'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
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
              className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl h-84 animate-pulse p-4 space-y-3"
            >
              <div className="h-44 bg-zinc-800/80 rounded-xl"></div>
              <div className="h-4 bg-zinc-800/80 rounded w-3/4"></div>
              <div className="h-3 bg-zinc-800/50 rounded w-1/2"></div>
              <div className="h-9 bg-zinc-800/80 rounded-xl mt-4"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 space-y-4">
          <p className="text-red-400 font-medium">{error}</p>
          <button
            onClick={() => dispatch(fetchMenuItems(selectedCategory))}
            className="px-6 py-2.5 rounded-xl bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 transition-colors shadow-lg"
          >
            Retry Loading
          </button>
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-8 space-y-3">
          <UtensilsCrossed className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No items found</h3>
          <p className="text-xs text-zinc-400">
            Try a different search term or pick another category.
          </p>
          <button
            onClick={() => {
              dispatch(setSelectedCategory('All'));
              dispatch(setSearchQuery(''));
            }}
            className="mt-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>
      ) : (
        /* Dish Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const qty = getItemQuantity(item._id);
            return (
              <div
                key={item._id}
                className="group relative bg-zinc-900/80 border border-zinc-800/90 hover:border-amber-400/40 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop';
                      }}
                    />

                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* 100% Veg Badge */}
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">
                        100% Veg
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2 py-1 rounded-full border border-amber-400/40 flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-[11px] font-black text-amber-300">
                        {item.rating || '4.8'}
                      </span>
                    </div>

                    {/* Category Pill */}
                    <div className="absolute bottom-3 left-3 bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-zinc-300 font-semibold border border-zinc-700/80">
                      {item.category}
                    </div>

                    {/* Prep Time */}
                    <div className="absolute bottom-3 right-3 text-[10px] font-medium text-zinc-300 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-zinc-800">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{item.prepTime || '10-15m'}</span>
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-lg font-black text-amber-400 whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                      {item.description ||
                        'Prepared with fresh garden vegetables, aromatic ground herbs, and authentic spices.'}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0">
                  {qty === 0 ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-amber-400 text-white hover:text-black font-extrabold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-zinc-700/80 hover:border-amber-400 shadow-md active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Order</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-zinc-950 border border-amber-400/50 rounded-xl p-1.5 shadow-inner">
                      <button
                        onClick={() => handleDecreaseQuantity(item._id)}
                        className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="font-black text-xs text-amber-300 px-3">
                        {qty} in cart
                      </span>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-8 h-8 rounded-lg bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center font-bold transition-colors cursor-pointer"
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
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-black p-4 rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center justify-between gap-4 font-bold border-2 border-amber-300">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-black text-amber-400 flex items-center justify-center shadow-md">
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
              className="py-2.5 px-5 bg-black hover:bg-zinc-900 text-amber-400 rounded-xl text-xs font-black transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>View Cart & Order</span>
              <span>➔</span>
            </button>
          </div>
        </aside>
      )}

      {/* Call Waiter Modal */}
      {waiterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <BellRing className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Table #{tableNumber} Service
                </h3>
              </div>
              <button
                onClick={() => setWaiterModalOpen(false)}
                className="text-zinc-500 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Need assistance at your table? Choose an option below and our staff will come immediately:
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { title: '💧 Need Water', reason: 'Fresh Drinking Water' },
                { title: '🍴 Need Cutlery', reason: 'Extra Cutlery & Plates' },
                { title: '🧹 Clean Table', reason: 'Table Cleaning' },
                { title: '🧾 Bill Request', reason: 'Printed Bill & Payment' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCallWaiter(item.reason)}
                  disabled={waiterRequestSent}
                  className="p-3 bg-zinc-800/80 hover:bg-amber-400 hover:text-black border border-zinc-700/80 rounded-xl text-left transition-colors text-xs font-semibold active:scale-95 cursor-pointer"
                >
                  {item.title}
                </button>
              ))}
            </div>

            {waiterRequestSent && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 justify-center">
                <CheckCircle2 className="w-4 h-4" />
                <span>Waiter Alerted! On the way.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
