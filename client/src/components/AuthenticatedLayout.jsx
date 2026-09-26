import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { setSearchQuery } from '../redux/menuSlice';
import {
  UtensilsCrossed,
  User,
  LogOut,
  X,
  ChevronDown,
  ShoppingCart,
  Search,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Footer from './Footer';
import TableQRModal from './TableQRModal';

const AuthenticatedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { name, email } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const tableNumber =
    useSelector((state) => state.cart.tableNumber) ||
    localStorage.getItem('tableNumber') ||
    '1';
  const searchQuery = useSelector((state) => state.menu.searchQuery);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 border-b border-slate-200/80 backdrop-blur-xl shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
            {/* Brand Logo & Name */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 group focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform text-white">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
                  QRDine
                </h1>
                <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                  Smart Dining
                </p>
              </div>
            </Link>

            {/* Table Badge & QR Switcher */}
            <button
              onClick={() => setIsTableModalOpen(true)}
              className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 transition-all shrink-0 active:scale-95 cursor-pointer shadow-xs"
              title="View all tables & QR codes"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>Table #{tableNumber}</span>
              <span className="hidden md:inline text-[10px] text-emerald-600 font-semibold">
                (Switch)
              </span>
            </button>

            {/* Search Input (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-sm mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search dishes, desserts, drinks..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="w-full pl-10 pr-9 py-2 bg-slate-100/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => dispatch(setSearchQuery(''))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Scan Link Button */}
              <Link
                to="/scan"
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>QR Scanner</span>
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 transition-all active:scale-95 cursor-pointer shadow-xs"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-5 h-5 text-slate-800" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-md shadow-emerald-600/30 animate-pulse">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Profile or Guest Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {name ? name[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                    {name || 'Guest'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsProfileOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-20 space-y-1">
                      <div className="p-3 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">
                          {name || 'Guest Customer'}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {email || `Table #${tableNumber} Session`}
                        </p>
                        <span className="inline-block mt-1.5 text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {name ? 'Verified Customer' : 'Dine-In Guest'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          setIsTableModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                      >
                        <QrCode className="w-4 h-4 text-emerald-600" />
                        <span>View Table QR Codes</span>
                      </button>

                      {!name ? (
                        <>
                          <Link
                            to="/login"
                            onClick={() => setIsProfileOpen(false)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span>Login for Rewards</span>
                          </Link>
                          <Link
                            to="/register"
                            onClick={() => setIsProfileOpen(false)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
                          >
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            <span>Join VIP Club (30% Off)</span>
                          </Link>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Table & QR Modal */}
      <TableQRModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        currentTableNumber={tableNumber}
      />
    </div>
  );
};

export default AuthenticatedLayout;