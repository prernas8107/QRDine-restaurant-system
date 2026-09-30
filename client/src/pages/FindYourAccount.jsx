import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Search, CheckCircle2 } from 'lucide-react';

function FindYourAccount() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>

        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-orange-700 mx-auto flex items-center justify-center mb-3">
            <Search className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Find Your Account</h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Enter your registered email address and we'll help you locate your account details.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-orange-600 mx-auto" />
            <p className="text-sm font-bold text-orange-900">Search Request Sent</p>
            <p className="text-xs text-slate-600">
              If an account with <b>{email}</b> exists, you will receive password reset instructions.
            </p>
            <Link
              to="/login"
              className="inline-block mt-3 px-4 py-2 bg-slate-900 text-xs font-bold text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="search-email"
                className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Your Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="search-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-orange-500/20 cursor-pointer"
            >
              Search Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default FindYourAccount;