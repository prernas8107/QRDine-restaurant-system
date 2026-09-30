import React from 'react';
import {
  UtensilsCrossed,
  ArrowRight,
  Star,
  Clock,
  Award,
  QrCode,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-white border border-slate-200/80 rounded-3xl shadow-sm">
      {/* Dynamic Ambient Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-orange-100/60 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] bg-amber-100/50 rounded-full blur-[100px]" />
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top Rating & Service Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-orange-50 border border-orange-200/80 rounded-full shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-xs font-bold text-orange-800 tracking-wide uppercase">
                Contactless Table Dining & Live Menu
              </span>
              <div className="flex items-center gap-1 pl-2 border-l border-orange-200">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-slate-800">4.9/5</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
              Savor Gourmet Flavors,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600">
                Ordered Instantly
              </span>{' '}
              From Your Table.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Scan the QR code at your table to browse our signature culinary recipes,
              customize orders in real-time, apply instant discounts, and enjoy speedy
              chef-crafted dishes with zero wait time.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>10-15 Min Fast Prep</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-orange-500" />
                <span>100% Pure Vegetarian</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5 text-orange-500" />
                <span>Direct Kitchen Dispatch</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-3">
              <button
                onClick={() => {
                  const menuSection = document.getElementById('menu-section');
                  if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md shadow-orange-500/20 active:scale-95 cursor-pointer"
              >
                <span>Browse Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/scan')}
                className="px-5 py-3 bg-white border border-slate-300 hover:border-orange-500 hover:text-orange-600 text-slate-700 font-bold text-sm rounded-xl hover:bg-orange-50/50 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-orange-500" />
                <span>Scan / Pick Table</span>
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl active:scale-95 transition-all duration-200 cursor-pointer"
              >
                View Cart
              </button>
            </div>

            {/* Live Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-200 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-black text-slate-900">50k+</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                  Orders Served
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-black text-orange-500">12m</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                  Avg Serve Time
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-black text-slate-900">100%</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                  Fresh Ingredients
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Showcase Food Cards */}
          <div className="lg:col-span-5 relative hidden lg:flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md space-y-4">
              {/* Showcase Card 1 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-md transition-all duration-300 hover:shadow-xl hover:border-orange-300">
                <div className="flex items-center gap-4">
                  <div className="relative w-22 h-22 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop&q=80"
                      alt="Shahi Paneer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-white/95 px-1.5 py-0.5 rounded text-[9px] font-bold text-emerald-700 flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Veg
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                        Chef's Special
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        4.9
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      Royal Shahi Paneer Butter Masala
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      Rich cashew gravy with fresh aromatic spices
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-slate-900">₹320</span>
                      <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                        🔥 400+ ordered today
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Showcase Card 2 */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-md transition-all duration-300 hover:shadow-xl hover:border-orange-300 ml-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-22 h-22 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&auto=format&fit=crop&q=80"
                      alt="Masala Dosa"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-white/95 px-1.5 py-0.5 rounded text-[9px] font-bold text-emerald-700 flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Veg
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        South Delight
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        4.8
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      Special Mysore Masala Dosa
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      Served with 3 authentic chutneys & hot sambar
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-slate-900">₹180</span>
                      <span className="text-[10px] text-orange-600 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Ready in 10m
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Offer Banner */}
              <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-3.5 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Welcome Discount</p>
                    <p className="text-[11px] text-slate-600">
                      Use code <span className="font-extrabold text-orange-700">FIRST30</span> at checkout
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-orange-500 text-white px-2.5 py-1 rounded-lg">
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
