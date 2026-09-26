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
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import AuthBrandPanel from '../components/AuthBrandPanel';
import { Logo } from '../components/Logo';

const inputClass =
  'w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-200 text-sm';

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
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <div className="w-full lg:w-[54%] flex items-center justify-center px-5 py-10 sm:px-10 relative order-2 lg:order-1 bg-white">
        <div className="w-full max-w-[480px] relative z-10">
          <div className="lg:hidden mb-8">
            <Logo showText={true} subtitle="Smart Dining" />
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 mb-2">
            Join QRDine
          </p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create your account</h2>
          <p className="text-sm text-slate-500 mt-2 mb-8">
            Faster checkout, saved favorites, and loyalty rewards on every table order.
          </p>

          {(validationError || error) && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center shrink-0">
                <span className="text-rose-600 text-sm font-bold">!</span>
              </div>
              <p className="text-rose-600 text-sm font-medium">{validationError || error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="reg-name"
                  className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Full name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
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
                  className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
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
                className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Phone (Optional)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
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
                  className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
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
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="reg-confirm-password"
                  className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
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
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-md shadow-emerald-600/20 active:scale-[0.98] cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-slate-600 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-700 hover:text-emerald-800 font-bold">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block lg:w-[46%] shrink-0 order-1 lg:order-2">
        <AuthBrandPanel
          headline={
            <>
              Fresh Food.
              <span className="block text-emerald-300">Seamless Tabletop Ordering.</span>
            </>
          }
          subhead="Register to enjoy special chef discounts, track dine-in receipts, and access express contactless checkout."
        />
      </div>
    </div>
  );
};

export default Register;
