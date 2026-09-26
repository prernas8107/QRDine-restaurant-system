import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Lock,
  UserPlus,
  QrCode,
  Loader2,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import AuthBrandPanel from '../components/AuthBrandPanel';

const inputClass =
  'w-full pl-11 pr-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-all duration-200 text-sm font-medium';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (formData.password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    dispatch(register(formData))
      .unwrap()
      .then(() => {
        navigate('/login', {
          state: {
            registered: true,
            email: formData.email,
          },
        });
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col lg:flex-row font-sans">
      <div className="w-full lg:w-[54%] flex items-center justify-center px-5 py-10 sm:px-10 relative order-2 lg:order-1">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(251,191,36,0.07),transparent_40%)] pointer-events-none" />

        <div className="w-full max-w-[480px] relative z-10">
          <div className="lg:hidden flex items-center gap-3 mb-8">
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
            Join QRDine
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Create your account</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 mb-8 leading-relaxed">
            Faster checkout, saved favorites, and rewards on every table order.
          </p>

          {(validationError || error) && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-red-400 text-xs sm:text-sm font-semibold">{validationError || error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="reg-name"
                  className="block mb-2 text-xs font-extrabold text-zinc-400 uppercase tracking-wider"
                >
                  Full name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="reg-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="reg-email"
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
                    id="reg-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="you@email.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="reg-phone"
                className="block mb-2 text-xs font-extrabold text-zinc-400 uppercase tracking-wider"
              >
                Phone
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
                </div>
                <input
                  type="tel"
                  id="reg-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Your phone number"
                  maxLength="15"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="reg-password"
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
                    id="reg-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`${inputClass} pr-12`}
                    placeholder="Min. 6 chars"
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

              <div>
                <label
                  htmlFor="reg-confirm-password"
                  className="block mb-2 text-xs font-extrabold text-zinc-400 uppercase tracking-wider"
                >
                  Confirm
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield className="h-4 w-4 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="reg-confirm-password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    className={`${inputClass} pr-12`}
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start pt-1 gap-2.5">
              <input
                id="terms-reg"
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 bg-zinc-950 border-zinc-700 rounded focus:ring-2 focus:ring-amber-400/40 accent-amber-400"
              />
              <label htmlFor="terms-reg" className="text-xs text-zinc-400 leading-relaxed font-medium">
                I agree to QRDine&apos;s{' '}
                <a href="#" className="text-amber-400 hover:text-amber-300 font-bold">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="text-amber-400 hover:text-amber-300 font-bold">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xl shadow-amber-400/20 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Join QRDine</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-xs sm:text-sm text-zinc-500 text-center font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-400 hover:text-amber-300 font-extrabold">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block lg:w-[46%] shrink-0 order-1 lg:order-2">
        <AuthBrandPanel
          headline={
            <>
              Join the table.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Join QRDine.
              </span>
            </>
          }
          subhead="Create a free account and get welcome offers, loyalty points, and quicker ordering at every QRDine table."
        />
      </div>
    </div>
  );
};

export default Register;
