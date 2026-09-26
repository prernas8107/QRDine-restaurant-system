import React from 'react';
import { QrCode, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      {/* Advertisement / Perks Section */}
      <div className="bg-slate-50/80 border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Special Offer */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-3xl font-black text-emerald-600 mb-1">30% OFF</div>
              <p className="text-slate-900 text-sm font-bold">On your first order</p>
              <p className="text-emerald-700 text-xs mt-1 font-semibold">Use code: FIRST30</p>
            </div>

            {/* Fast Table Service */}
            <div className="bg-white border border-teal-200 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-3xl font-black text-teal-600 mb-1">FAST</div>
              <p className="text-slate-900 text-sm font-bold">10-15 Min Table Delivery</p>
              <p className="text-teal-700 text-xs mt-1 font-semibold">Zero wait time at table</p>
            </div>

            {/* Pure Veg */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-3xl font-black text-slate-800 mb-1">100%</div>
              <p className="text-slate-900 text-sm font-bold">Fresh Vegetarian Quality</p>
              <p className="text-slate-500 text-xs mt-1 font-semibold">Authentic chef recipes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-xs text-white">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black text-slate-900">QRDine</h4>
                <p className="text-[10px] text-emerald-700 uppercase tracking-wider font-bold">Smart Restaurant Platform</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Serving authentic gourmet vegetarian recipes with seamless QR table ordering and instant kitchen dispatch.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-slate-900 font-bold mb-3 text-xs uppercase tracking-wider">Contact & Location</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fine Dining Plaza, City Center</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>support@qrdine.com</span>
              </p>
            </div>
          </div>

          {/* Dining Hours */}
          <div>
            <h4 className="text-slate-900 font-bold mb-3 text-xs uppercase tracking-wider">Restaurant Hours</h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">Monday - Friday:</p>
              <p className="text-slate-500">11:00 AM - 11:00 PM</p>
              <p className="font-semibold text-slate-800 pt-1">Saturday - Sunday:</p>
              <p className="text-slate-500">10:30 AM - 11:30 PM</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-slate-900 font-bold mb-3 text-xs uppercase tracking-wider">Follow Us</h4>
            <p className="text-xs text-slate-500 mb-3">Stay updated with our daily chef specials and seasonal promotions.</p>
            <div className="flex gap-2.5">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-8 pt-6 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} QRDine. All rights reserved. Clean Contactless Table Dining.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
