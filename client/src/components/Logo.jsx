import React from 'react';

export const Logo = ({
  size = 'md',
  showText = false,
  darkText = true,
  subtitle = 'Smart Dining',
}) => {
  const isLarge = size === 'lg';
  const containerSize = isLarge ? 'w-12 h-12' : 'w-10 h-10 sm:w-11 sm:h-11';
  const iconSize = isLarge ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-3 group">
      <div className={`${containerSize} rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-600/25 text-white overflow-hidden shrink-0 group-hover:scale-105 transition-transform relative`}>
        {/* QR Code Scanner Motif Corners */}
        <div className="absolute inset-1.5 border border-white/30 rounded-xl pointer-events-none" />
        <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-2xs shadow-xs" />
        <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-2xs shadow-xs" />
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-2xs shadow-xs" />

        {/* Fork & Knife Vector Icon */}
        <svg
          className={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
      </div>

      {showText && (
        <div>
          <h1
            className={`font-black tracking-tight leading-none ${
              isLarge ? 'text-2xl' : 'text-base sm:text-lg'
            } ${darkText ? 'text-slate-900' : 'text-white'}`}
          >
            QRDine
          </h1>
          <p
            className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${
              darkText ? 'text-emerald-700' : 'text-emerald-300'
            }`}
          >
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
};
