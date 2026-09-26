import React from 'react';
import { QrCode, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-950/90 border-t border-zinc-800/80 mt-auto">
      {/* Advertisement Section */}
      <div className="bg-gradient-to-r from-zinc-900/80 to-zinc-950/80 border-b border-zinc-800/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Special Offer */}
            <div className="bg-amber-400/5 border border-amber-400/15 rounded-2xl p-6 text-center group hover:border-amber-400/30 transition-all duration-300">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">20% OFF</div>
              <p className="text-zinc-300 text-sm font-medium">On your first order</p>
              <p className="text-amber-400/80 text-xs mt-1 font-semibold">Use code: FIRST20</p>
            </div>

            {/* Free Delivery */}
            <div className="bg-emerald-400/5 border border-emerald-400/15 rounded-2xl p-6 text-center group hover:border-emerald-400/30 transition-all duration-300">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">FREE</div>
              <p className="text-zinc-300 text-sm font-medium">Delivery on orders above ₹500</p>
              <p className="text-emerald-400/80 text-xs mt-1 font-semibold">Valid for all locations</p>
            </div>

            {/* Loyalty Program */}
            <div className="bg-violet-400/5 border border-violet-400/15 rounded-2xl p-6 text-center group hover:border-violet-400/30 transition-all duration-300">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 mb-2">EARN</div>
              <p className="text-zinc-300 text-sm font-medium">Points on every order</p>
              <p className="text-violet-400/80 text-xs mt-1 font-semibold">Join our loyalty program</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/15">
                <QrCode className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">QRDine</h3>
                <p className="text-[10px] text-amber-400 uppercase tracking-wider font-bold">Smart Restaurant Platform</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Serving delicious vegetarian cuisine with a commitment to quality, freshness, and exceptional service since 2015.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/30 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/30 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/30 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/30 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors"></span>
                  Our Menu
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors"></span>
                  Reservations
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors"></span>
                  Events & Catering
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors"></span>
                  Gift Cards
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors"></span>
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Branch Locations */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Our Branches</h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold">Mumbai - Bandra</p>
                    <p className="text-zinc-500 text-xs">123 Hill Road, Bandra West</p>
                    <p className="text-zinc-600 text-xs">Mumbai - 400050</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold">Delhi - Connaught Place</p>
                    <p className="text-zinc-500 text-xs">45 Block A, Connaught Place</p>
                    <p className="text-zinc-600 text-xs">New Delhi - 110001</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold">Bangalore - Koramangala</p>
                    <p className="text-zinc-500 text-xs">78 5th Block, Koramangala</p>
                    <p className="text-zinc-600 text-xs">Bangalore - 560095</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Call Us</p>
                  <a href="tel:+919876543210" className="text-white text-sm font-medium hover:text-amber-400 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Email Us</p>
                  <a href="mailto:info@qrdine.com" className="text-white text-sm font-medium hover:text-amber-400 transition-colors">
                    info@qrdine.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Opening Hours</p>
                  <p className="text-white text-sm font-medium">Mon - Sun: 11 AM - 11 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800/60 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-xs text-center md:text-left">
              © 2024 QRDine. All rights reserved. Smart Restaurant Platform.
            </p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="text-zinc-500 hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-zinc-500 hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-zinc-500 hover:text-amber-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
