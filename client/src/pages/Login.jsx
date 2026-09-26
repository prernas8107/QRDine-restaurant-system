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
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import AuthBrandPanel from '../components/AuthBrandPanel';

const inputClass =
  'w-full pl-11 pr-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-all duration-200 text-sm font-medium';

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
    <div className="min-h-screen bg-[#09090b] flex font-sans">
      <div className="hidden lg:block lg:w-[46%] shrink-0">
        <AuthBrandPanel
          headline={
            <>
              Scan. Order.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Dine with QRDine.
              </span>
            </>
          }
          subhead="Sign in to save favorites, earn rewards, and send orders straight to the kitchen from your table."
        />
      </div>

      <div className="w-full lg:w-[54%] flex items-center justify-center px-5 py-10 sm:px-10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.07),transparent_40%)] pointer-events-none" />

        <div className="w-full max-w-[420px] relative z-10">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20">
              <QrCode className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white">QRDine</h1>
              <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-[0.2em]">
                Contactless dining
              </p>
            </div>
          </div>

          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-400 mb-2">
            Member access
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Welcome back</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 mb-8 leading-relaxed">
            Sign in to your QRDine account to continue.
          </p>

          {successMsg && !error && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-emerald-300 text-xs sm:text-sm font-semibold">{successMsg}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-red-400 text-xs sm:text-sm font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="block mb-2 text-xs font-extrabold text-zinc-400 uppercase tracking-wider"
              >
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
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
                className="block mb-2 text-xs font-extrabold text-zinc-400 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
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
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
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
                  className="w-4 h-4 bg-zinc-950 border-zinc-700 rounded focus:ring-2 focus:ring-amber-400/40 accent-amber-400"
                />
                <label htmlFor="remember-login" className="text-xs text-zinc-400 font-medium">
                  Remember me
                </label>
              </div>
              <Link
                to="/recovery"
                className="text-xs text-amber-400 hover:text-amber-300 font-bold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xl shadow-amber-400/20 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in to QRDine</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-xs sm:text-sm text-zinc-500 text-center font-medium">
            New to QRDine?{' '}
            <Link to="/register" className="text-amber-400 hover:text-amber-300 font-extrabold">
              Create an account
            </Link>
          </p>
          <p className="mt-3 text-center text-[11px] text-zinc-600 font-medium">
            Or continue as{' '}
            <Link to="/welcome" className="text-zinc-400 hover:text-amber-400 font-bold underline">
              Guest (QR scan)
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
