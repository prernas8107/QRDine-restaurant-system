import React, { useState } from 'react';

export const Logo = ({
  size = 'md',
  showText = false,
  darkText = true,
  subtitle = 'Smart Dining',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeMap = {
    sm: {
      container: 'w-8 h-8 sm:w-10 sm:h-10 rounded-xl',
      title: 'text-base sm:text-lg font-black',
      subtitle: 'text-[9px] sm:text-[10px]',
    },
    md: {
      container: 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl',
      title: 'text-lg sm:text-xl md:text-2xl font-black',
      subtitle: 'text-[9px] sm:text-[10px] md:text-[11px]',
    },
    lg: {
      container: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl',
      title: 'text-2xl sm:text-3xl md:text-4xl font-black',
      subtitle: 'text-[10px] sm:text-xs',
    },
    xl: {
      container: 'w-22 h-22 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl sm:rounded-3xl',
      title: 'text-3xl sm:text-4xl md:text-5xl font-black',
      subtitle: 'text-xs sm:text-sm',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3.5 group ${className}`}>
      <div
        className={`${currentSize.container} bg-white border border-slate-200/80 shadow-md shadow-orange-500/15 flex items-center justify-center p-1 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-200`}
      >
        {!imgError ? (
          <img
            src="/logo.png"
            alt="QRDine Logo"
            className="w-full h-full object-contain drop-shadow-xs"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-400 flex items-center justify-center text-white">
            <svg
              className="w-6 h-6"
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
        )}
      </div>

      {showText && (
        <div>
          <h1
            className={`tracking-tight leading-none ${currentSize.title} ${
              darkText ? 'text-slate-900' : 'text-white'
            }`}
          >
            QRDine
          </h1>
          <p
            className={`font-bold uppercase tracking-[0.2em] mt-1.5 ${currentSize.subtitle} ${
              darkText ? 'text-orange-600' : 'text-orange-300'
            }`}
          >
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
};

