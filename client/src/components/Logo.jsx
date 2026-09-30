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
      container: 'w-11 h-11 sm:w-12 sm:h-12 rounded-2xl',
      title: 'text-lg sm:text-xl font-black',
      subtitle: 'text-[10px]',
    },
    md: {
      container: 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl',
      title: 'text-xl sm:text-2xl font-black',
      subtitle: 'text-[11px]',
    },
    lg: {
      container: 'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl',
      title: 'text-3xl sm:text-4xl font-black',
      subtitle: 'text-xs',
    },
    xl: {
      container: 'w-28 h-28 sm:w-32 sm:h-32 rounded-3xl',
      title: 'text-4xl sm:text-5xl font-black',
      subtitle: 'text-sm',
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

