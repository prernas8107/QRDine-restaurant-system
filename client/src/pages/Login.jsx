import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  QrCode,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import AuthBrandPanel from '../components/AuthBrandPanel';
import { Logo } from '../components/Logo';

const inputClass =
  'w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all duration-200 text-sm';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg] = useState(
    location.state?.registered
      ? 'Account created successfully! Please sign in with your credentials.'
      : ''
  );
  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    password: '',
  });

  useEffect(() => {
    if (role) {
      navigate('/');
    }
  }, [role, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData))
      .unwrap()
      .then(() => {
        localStorage.removeItem('sessionToken');
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden lg:block lg:w-[46%] shrink-0">
        <AuthBrandPanel
          headline={
            <>
              Scan. Order.
              <span className="block text-orange-300">Dine with Ease.</span>
            </>
          }
          subhead="Sign in to save favorite dishes, collect loyalty discounts, and send orders straight to the kitchen from your table."
        />
      </div>

      <div className="w-full lg:w-[54%] flex items-center justify-center px-5 py-10 sm:px-10 relative bg-white">
        <div className="w-full max-w-[420px] relative z-10">
          <div className="lg:hidden mb-10">
            <Logo showText={true} subtitle="Smart Dining" />
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-700 mb-2">
            Member access
          </p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back</h2>
          <p className="text-sm text-slate-500 mt-2 mb-8">
            Sign in to your QRDine account to continue.
          </p>

          {successMsg && !error && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-orange-700" />
              </div>
              <p className="text-orange-800 text-sm font-medium">{successMsg}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center shrink-0">
                <span className="text-rose-600 text-sm font-bold">!</span>
              </div>
              <p className="text-rose-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`${inputClass} pr-12`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="remember-login"
                  type="checkbox"
                  className="w-4 h-4 bg-white border-slate-300 rounded focus:ring-2 focus:ring-orange-500/30 accent-orange-500"
                />
                <label htmlFor="remember-login" className="text-xs text-slate-600 font-medium cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link
                to="/recovery"
                className="text-xs text-orange-700 hover:text-orange-800 font-bold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-md shadow-orange-500/20 active:scale-[0.98] cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in to QRDine</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-slate-600 text-center">
            New to QRDine?{' '}
            <Link to="/register" className="text-orange-700 hover:text-orange-800 font-bold">
              Create an account
            </Link>
          </p>
          <p className="mt-3 text-center text-[11px] text-slate-400">
            Or continue as{' '}
            <Link to="/welcome" className="text-slate-600 hover:text-orange-700 font-semibold">
              Guest (QR scan)
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
