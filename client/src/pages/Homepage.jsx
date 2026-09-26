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
    <div className="space-y-8 pb-28">
      {/* Featured Restaurant Hero */}
      <Hero />

      {/* Table Dine-In Status Bar */}
      <div id="menu-section" className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-xs">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                Table #{tableNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Dine-In Session Active
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Chef Crafted{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Vegetarian Delights
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Order directly from your smartphone. Dishes will be freshly prepared and brought straight to Table #{tableNumber}.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setWaiterModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-2 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <BellRing className="w-4 h-4 text-emerald-600" />
              <span>Call Waiter</span>
            </button>
            <button
              onClick={() => navigate('/welcome')}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
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
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <span>Explore Menu</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {menuItems.length} Dishes
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Filter by category or search delicious dishes
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search paneer, dosa, soup, desserts..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
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
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-2xs'
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
              className="bg-white border border-slate-200 rounded-2xl h-84 animate-pulse p-4 space-y-3 shadow-xs"
            >
              <div className="h-44 bg-slate-200 rounded-xl"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-100 rounded w-1/2"></div>
              <div className="h-9 bg-slate-200 rounded-xl mt-4"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-xs">
          <p className="text-rose-600 font-semibold">{error}</p>
          <button
            onClick={() => dispatch(fetchMenuItems(selectedCategory))}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-xs"
          >
            Retry Loading
          </button>
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8 space-y-3 shadow-xs">
          <UtensilsCrossed className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No dishes found</h3>
          <p className="text-xs text-slate-500">
            Try searching for a different dish or select another category.
          </p>
          <button
            onClick={() => {
              dispatch(setSelectedCategory('All'));
              dispatch(setSearchQuery(''));
            }}
            className="mt-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5"
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
                className="group relative bg-white border border-slate-200/90 hover:border-emerald-300 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative h-50 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.target.src =
                          'https://placehold.co/600x400/10b981/ffffff?text=Delicious+Dish';
                      }}
                    />

                    {/* Veg Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200 flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
                        Veg
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-full border border-slate-200 flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-[11px] font-bold text-slate-800">
                        {item.rating || '4.8'}
                      </span>
                    </div>

                    {/* Category Pill */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-slate-700 font-bold border border-slate-200 shadow-xs">
                      {item.category}
                    </div>

                    {/* Prep Time */}
                    <div className="absolute bottom-3 right-3 text-[10px] font-semibold text-slate-700 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-slate-200 shadow-xs">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>{item.prepTime || '10-15m'}</span>
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-base font-black text-slate-900 whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                      {item.description ||
                        'Prepared with fresh ingredients, ground herbs, and authentic spices.'}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:p-5 pt-0">
                  {qty === 0 ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2.5 px-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-xs active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Order</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-slate-50 border border-emerald-300 rounded-xl p-1 shadow-xs">
                      <button
                        onClick={() => handleDecreaseQuantity(item._id)}
                        className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="font-extrabold text-xs text-emerald-800 px-3">
                        {qty} in cart
                      </span>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center font-bold transition-colors cursor-pointer"
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
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 font-bold border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  Table #{tableNumber} • {totalCartCount}{' '}
                  {totalCartCount === 1 ? 'Item' : 'Items'}
                </p>
                <p className="text-xl font-black text-white">
                  ₹{totalCartPrice}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/cart')}
              className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>View Cart & Order</span>
              <span>➔</span>
            </button>
          </div>
        </aside>
      )}

      {/* Call Waiter Modal */}
      {waiterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <BellRing className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Table #{tableNumber} Service
                </h3>
              </div>
              <button
                onClick={() => setWaiterModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Need assistance at your table? Choose an option below and our waitstaff will arrive immediately:
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
                  className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 border border-slate-200 rounded-xl text-left transition-colors text-xs font-semibold active:scale-95 cursor-pointer text-slate-800"
                >
                  {item.title}
                </button>
              ))}
            </div>

            {waiterRequestSent && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
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
