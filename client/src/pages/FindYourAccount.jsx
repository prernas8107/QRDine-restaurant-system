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
    <div className="min-h-screen bg-[#090a0f] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-zinc-900/90 border border-zinc-800/90 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl space-y-6">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>

        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mx-auto flex items-center justify-center mb-3">
            <Search className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-black text-white">Find Your Account</h1>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
            Enter your registered email address and we'll help you locate your account details.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-bold text-emerald-300">Search Request Sent</p>
            <p className="text-xs text-zinc-400">
              If an account with <b>{email}</b> exists, you will receive password reset instructions.
            </p>
            <Link
              to="/login"
              className="inline-block mt-3 px-4 py-2 bg-zinc-800 text-xs font-bold text-white rounded-xl hover:bg-zinc-700 transition-colors"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="search-email"
                className="block mb-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider"
              >
                Your Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-amber-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="search-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 active:scale-95 text-black font-extrabold text-xs rounded-xl transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
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