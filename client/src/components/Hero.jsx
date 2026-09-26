import React from 'react';
import { UtensilsCrossed, ArrowRight, Star, Clock, Award, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-gray-900 to-[#0a0a0a] border-b border-gray-800">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] lg:min-h-[600px]">
       
          <div className="text-center lg:text-left space-y-5 lg:space-y-6">
           
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-white font-medium">Rated 4.8/5 by 5000+ Customers</span>
            </div>

           
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Experience
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Authentic Vegetarian
              </span>
              Cuisine
            </h1>

          
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover a world of flavors with our carefully crafted vegetarian menu. 
              Fresh ingredients, traditional recipes, and modern culinary artistry come together 
              to create an unforgettable dining experience.
            </p>
 
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <UtensilsCrossed className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">100% Vegetarian</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-6">
              <button
                onClick={() => {
                  const menuSection = document.getElementById('menu-section');
                  if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group px-6 py-3 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/scan')}
                className="px-6 py-3 bg-zinc-900 border border-amber-400/40 text-amber-300 font-bold rounded-xl hover:bg-amber-400/10 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Scan / View Table QRs</span>
              </button>

              <button
                onClick={() => {
                  navigate('/cart');
                }}
                className="px-6 py-3 bg-zinc-900/80 border border-zinc-700 text-zinc-300 font-semibold rounded-xl hover:bg-zinc-800 transition-all duration-200"
              >
                View Cart
              </button>
            </div>

        
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Branches</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">49+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Menu Items</div>
              </div>
            </div>
          </div>

       
          <div className="relative hidden lg:block h-full">
            <div className="relative h-full flex items-center">
            
              <div className="w-full space-y-6">
                <div className="flex gap-4 animate-float">
                  <div className="flex-1 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-2xl hover:border-yellow-400/30 transition-all duration-300">
                    <div className="w-full h-48 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-lg mb-4 flex items-center justify-center">
                      <UtensilsCrossed className="w-20 h-20 text-yellow-400/50" />
                    </div>
                    <div className="h-4 bg-gray-700/50 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-700/30 rounded w-1/2"></div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-2xl hover:border-yellow-400/30 transition-all duration-300" style={{ animationDelay: '0.5s' }}>
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-lg mb-4 flex items-center justify-center">
                      <UtensilsCrossed className="w-20 h-20 text-orange-400/50" />
                    </div>
                    <div className="h-4 bg-gray-700/50 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-700/30 rounded w-1/2"></div>
                  </div>
                </div>
                
                
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-2xl border-2 border-yellow-400/20 animate-bounce-slow z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold whitespace-nowrap">Free Delivery on Orders Above ₹500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-600 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
