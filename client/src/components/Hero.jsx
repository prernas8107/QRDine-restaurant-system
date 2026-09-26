import React from 'react';
import {
  UtensilsCrossed,
  ArrowRight,
  Star,
  Clock,
  Award,
  QrCode,
  Flame,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0b0c10] via-[#10121a] to-[#090a0f] border-b border-zinc-800/80">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute -bottom-24 left-1/4 w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[130px] animate-pulse"
          style={{ animationDelay: '2.5s' }}
        />
        {/* Subtle grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top Rating & Service Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-amber-400/10 to-orange-500/10 border border-amber-400/25 rounded-full backdrop-blur-md shadow-inner shadow-amber-400/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-semibold text-amber-300 tracking-wide uppercase">
                Contactless Table Dining & Live Menu
              </span>
              <div className="flex items-center gap-1 pl-2 border-l border-amber-400/30">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-white">4.9/5</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Savor Gourmet Flavors,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-500">
                Ordered Instantly
              </span>{' '}
              From Your Table.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Scan the QR at your table to browse our signature vegetarian recipes,
              customize orders in real-time, apply exclusive instant coupons, and enjoy
              speedy, chef-crafted dining with zero wait time.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-300 text-xs font-medium">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>10-15 Min Fast Prep</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-300 text-xs font-medium">
                <Award className="w-4 h-4 text-amber-400" />
                <span>100% Pure Vegetarian</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-300 text-xs font-medium">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Direct Kitchen Dispatch</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-4">
              <button
                onClick={() => {
                  const menuSection = document.getElementById('menu-section');
                  if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group px-7 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-extrabold rounded-xl hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 cursor-pointer"
              >
                <span>Browse Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/scan')}
                className="px-6 py-3.5 bg-zinc-900/90 border border-amber-400/40 hover:border-amber-400 text-amber-300 font-bold rounded-xl hover:bg-amber-400/10 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Scan / Pick Table</span>
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="px-6 py-3.5 bg-zinc-900/70 border border-zinc-700/80 hover:border-zinc-500 text-zinc-200 font-semibold rounded-xl hover:bg-zinc-800 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                View Cart
              </button>
            </div>

            {/* Live Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-white">
                  50k+
                </div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                  Orders Served
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">
                  12m
                </div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                  Avg Serve Time
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-white">
                  100%
                </div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                  Fresh Ingredients
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Showcase Graphic Cards */}
          <div className="lg:col-span-5 relative hidden lg:flex flex-col items-center justify-center">
            {/* Glowing Accent Ring */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-amber-500/20 to-orange-500/20 blur-3xl" />

            <div className="relative w-full max-w-md space-y-4">
              {/* Showcase Card 1: Gourmet Paneer */}
              <div className="relative bg-zinc-900/90 border border-zinc-700/60 backdrop-blur-xl rounded-2xl p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-amber-400/40">
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-zinc-700">
                    <img
                      src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop&q=80"
                      alt="Shahi Paneer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-bold text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Veg
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                        Chef's Special
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        4.9
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white truncate">
                      Royal Shahi Paneer Butter Masala
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      Rich cashew gravy with fresh aromatic spices
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-amber-400">₹320</span>
                      <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md">
                        🔥 400+ ordered today
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Showcase Card 2: Crispy Dosa Platter */}
              <div className="relative bg-zinc-900/90 border border-zinc-700/60 backdrop-blur-xl rounded-2xl p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-amber-400/40 ml-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-zinc-700">
                    <img
                      src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&auto=format&fit=crop&q=80"
                      alt="Masala Dosa"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-bold text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Veg
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full border border-orange-400/20">
                        South Delight
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        4.8
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white truncate">
                      Special Mysore Masala Dosa
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      Served with 3 authentic chutneys & hot sambar
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-amber-400">₹180</span>
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Ready in 10m
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Promo Banner */}
              <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/10 border border-amber-400/30 rounded-2xl p-3.5 backdrop-blur-md shadow-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Welcome Offer Active</p>
                    <p className="text-[11px] text-amber-300/90">
                      Use code <span className="font-extrabold text-amber-400">FIRST30</span> at checkout
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-amber-400 text-black px-2.5 py-1 rounded-lg">
                  30% OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
