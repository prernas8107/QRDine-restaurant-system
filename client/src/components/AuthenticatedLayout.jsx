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
  Award,
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
    <div className="min-h-screen bg-[#090a0f] text-white flex flex-col font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 border-b border-zinc-800/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
            {/* Brand Logo & Name */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 group focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-5 h-5 text-black" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                  QRDine
                </h1>
                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Contactless Dining
                </p>
              </div>
            </Link>

            {/* Table Badge & QR Switcher */}
            <button
              onClick={() => setIsTableModalOpen(true)}
              className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-black flex items-center gap-2 transition-all shrink-0 active:scale-95 cursor-pointer shadow-sm"
              title="View all tables & QR codes"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Table #{tableNumber}</span>
              <span className="hidden md:inline text-[10px] text-amber-400/70 font-semibold">
                (Switch)
              </span>
            </button>

            {/* Search Input (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-sm mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search food, desserts, drinks..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="w-full pl-10 pr-9 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
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

            {/* Right Side Navigation */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Scan Link Button */}
              <Link
                to="/scan"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-bold transition-colors"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>QR Scanner</span>
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 transition-all active:scale-95 cursor-pointer shadow-sm"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-5 h-5 text-amber-400" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Profile or Guest Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                    {name ? name[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs font-bold text-zinc-200 hidden sm:inline">
                    {name || 'Guest'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
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
                    <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-2 z-20 space-y-1 backdrop-blur-2xl">
                      <div className="p-3 border-b border-zinc-800">
                        <p className="text-xs font-bold text-white">
                          {name || 'Guest Customer'}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {email || `Table #${tableNumber} Session`}
                        </p>
                        <span className="inline-block mt-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-zinc-800 text-amber-400">
                          {name ? 'Verified Customer' : 'Dine-In Guest'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          setIsTableModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-xl transition-colors cursor-pointer"
                      >
                        <QrCode className="w-4 h-4 text-amber-400" />
                        <span>View Table QR Codes</span>
                      </button>

                      {!name ? (
                        <>
                          <Link
                            to="/login"
                            onClick={() => setIsProfileOpen(false)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-amber-400 hover:bg-zinc-800/80 rounded-xl transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span>Login for Rewards</span>
                          </Link>
                          <Link
                            to="/register"
                            onClick={() => setIsProfileOpen(false)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-xl transition-colors"
                          >
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span>Join VIP Club (30% Off)</span>
                          </Link>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
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