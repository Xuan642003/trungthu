import React from 'react';

export const MoonAndSky: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep atmospheric Mid-Autumn night sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#140003] via-[#330007] to-[#120002]" />

      {/* Radiant warm golden red aura in the upper center */}
      <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-radial from-amber-600/20 via-red-800/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Giant Luminous Full Moon */}
      <div
        id="mid-autumn-full-moon"
        className="absolute top-10 sm:top-14 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full animate-moon-halo transition-all duration-700 pointer-events-auto cursor-pointer group"
        title="Trăng Rằm Tháng Tám lung linh"
      >
        {/* Moon body & glowing crater details */}
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#FFD369] via-[#FFF1C5] to-[#FFFFFF] relative overflow-hidden shadow-[inset_-18px_-18px_45px_rgba(230,120,20,0.45)]">
          {/* Subtle lunar maria / Chú Cuội cây đa silhouette illusion */}
          <div className="absolute top-1/4 left-1/4 w-20 h-20 sm:w-28 sm:h-28 bg-[#F0C060]/30 rounded-full blur-md" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-16 sm:w-32 sm:h-24 bg-[#E0A040]/25 rounded-full blur-lg" />
          <div className="absolute top-1/2 left-1/3 w-16 h-28 bg-[#DE9530]/20 rounded-full blur-sm rotate-45" />

          {/* Faint mythical silhouette: Chị Hằng & Chú Cuội under banyan tree */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-90 sm:scale-100">
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
              {/* Banyan tree branch */}
              <path d="M50 95 C48 70 35 50 25 45 C30 40 45 42 50 35 C55 42 70 40 75 45 C65 50 52 70 50 95 Z" fill="#995511" opacity="0.6"/>
              <ellipse cx="50" cy="30" rx="35" ry="18" fill="#995511" opacity="0.4" />
              {/* Moon rabbit silhouette */}
              <path d="M62 78 C62 74 65 70 69 70 C72 70 75 73 75 78 C75 82 71 85 68 85 C64 85 62 82 62 78 Z" fill="#AA6622" />
              <path d="M72 70 C72 65 75 62 76 60 C77 62 75 66 74 70 Z" fill="#AA6622" />
              <path d="M74 70 C75 66 79 63 80 61 C80 64 77 67 75 70 Z" fill="#AA6622" />
            </svg>
          </div>
        </div>

        {/* Soft clouds slowly drifting across the moon */}
        <div className="absolute -left-16 top-1/3 w-40 sm:w-56 h-8 bg-white/20 rounded-full blur-md animate-pulse pointer-events-none" />
        <div className="absolute -right-12 bottom-1/4 w-36 sm:w-48 h-6 bg-amber-100/25 rounded-full blur-md pointer-events-none" />
      </div>

      {/* Decorative Pagoda Roof Silhouette on top corners */}
      <div className="absolute top-0 left-0 w-32 sm:w-56 md:w-80 h-28 sm:h-40 pointer-events-none opacity-80">
        <svg viewBox="0 0 300 150" className="w-full h-full fill-[#1c0004]">
          <path d="M0 0 L180 0 C150 15 110 35 70 50 C40 60 15 65 0 90 Z" />
          <path d="M70 50 C110 35 150 15 180 0 C210 20 250 50 290 65 C260 70 210 65 170 55 C120 52 80 75 0 120 L0 0 Z" opacity="0.9" />
          <path d="M290 65 C275 60 260 45 285 20 C280 35 295 50 300 55 Z" fill="#d4af37" opacity="0.6"/>
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-32 sm:w-56 md:w-80 h-28 sm:h-40 pointer-events-none opacity-80 transform -scale-x-100">
        <svg viewBox="0 0 300 150" className="w-full h-full fill-[#1c0004]">
          <path d="M0 0 L180 0 C150 15 110 35 70 50 C40 60 15 65 0 90 Z" />
          <path d="M70 50 C110 35 150 15 180 0 C210 20 250 50 290 65 C260 70 210 65 170 55 C120 52 80 75 0 120 L0 0 Z" opacity="0.9" />
          <path d="M290 65 C275 60 260 45 285 20 C280 35 295 50 300 55 Z" fill="#d4af37" opacity="0.6"/>
        </svg>
      </div>

      {/* Swaying Traditional Hanging Lanterns */}
      {/* Top Left Lantern 1 - Red Cylinder Lantern */}
      <div className="absolute top-0 left-4 sm:left-12 md:left-24 pointer-events-auto z-10 animate-lantern-sway">
        {/* Hanging wire */}
        <div className="w-[1.5px] h-12 sm:h-20 bg-amber-500/80 mx-auto" />
        {/* Lantern cap */}
        <div className="w-10 sm:w-14 h-2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 rounded-sm mx-auto shadow-md" />
        {/* Lantern body */}
        <div className="w-9 sm:w-12 h-14 sm:h-18 bg-gradient-to-b from-[#ff2a2a] via-[#d60000] to-[#800000] rounded-xl mx-auto shadow-[0_0_25px_rgba(255,80,30,0.85)] relative flex items-center justify-center border-t border-b border-amber-300">
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 rounded-xl pointer-events-none" />
          <span className="text-amber-200 font-festive text-xs sm:text-sm font-bold z-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            Phúc
          </span>
          {/* Inner candle flicker */}
          <div className="w-3 h-5 bg-amber-200/80 rounded-full blur-[2px] animate-pulse" />
        </div>
        {/* Bottom cap */}
        <div className="w-8 sm:w-10 h-1.5 bg-amber-600 rounded-sm mx-auto" />
        {/* Silk golden tassel */}
        <div className="w-1.5 h-10 sm:h-14 bg-gradient-to-b from-yellow-400 via-amber-500 to-red-600 mx-auto rounded-full shadow-sm" />
      </div>

      {/* Top Left Lantern 2 - Star Lantern (Đèn Ông Sao) */}
      <div className="absolute top-0 left-16 sm:left-28 md:left-48 pointer-events-auto z-10 animate-lantern-sway-slow hidden sm:block">
        <div className="w-[1px] h-24 md:h-32 bg-amber-400/70 mx-auto" />
        <div className="relative w-12 md:w-16 h-12 md:h-16 -mt-1 mx-auto flex items-center justify-center">
          {/* Outer circle */}
          <div className="absolute inset-0 border-2 border-yellow-400/90 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)]" />
          {/* 5-pointed star */}
          <svg viewBox="0 0 100 100" className="w-10 md:w-14 h-10 md:h-14 drop-shadow-[0_0_12px_rgba(255,50,50,0.9)]">
            <polygon
              points="50,5 64,36 98,36 71,57 81,91 50,70 19,91 29,57 2,36 36,36"
              fill="#E50914"
              stroke="#FFD700"
              strokeWidth="3"
            />
            <circle cx="50" cy="50" r="12" fill="#FFAA00" />
          </svg>
        </div>
        <div className="w-1.5 h-8 bg-gradient-to-b from-yellow-400 to-red-500 mx-auto rounded-full mt-1" />
      </div>

      {/* Top Right Lantern 1 - Golden Lotus Lantern */}
      <div className="absolute top-0 right-4 sm:right-12 md:right-24 pointer-events-auto z-10 animate-lantern-sway-slow">
        <div className="w-[1.5px] h-14 sm:h-24 bg-amber-500/80 mx-auto" />
        <div className="w-10 sm:w-14 h-2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 rounded-sm mx-auto" />
        <div className="w-9 sm:w-12 h-14 sm:h-18 bg-gradient-to-b from-[#ff3333] via-[#b80000] to-[#6b0000] rounded-xl mx-auto shadow-[0_0_25px_rgba(255,90,40,0.85)] relative flex items-center justify-center border-t border-b border-amber-300">
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 rounded-xl pointer-events-none" />
          <span className="text-amber-200 font-festive text-xs sm:text-sm font-bold z-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            An
          </span>
          <div className="w-3 h-5 bg-yellow-200/90 rounded-full blur-[2px] animate-pulse" />
        </div>
        <div className="w-8 sm:w-10 h-1.5 bg-amber-600 rounded-sm mx-auto" />
        <div className="w-1.5 h-10 sm:h-14 bg-gradient-to-b from-yellow-400 via-amber-500 to-red-600 mx-auto rounded-full shadow-sm" />
      </div>

      {/* Top Right Lantern 2 - Star Lantern (Đèn Ông Sao) */}
      <div className="absolute top-0 right-16 sm:right-28 md:right-48 pointer-events-auto z-10 animate-lantern-sway hidden sm:block">
        <div className="w-[1px] h-20 md:h-28 bg-amber-400/70 mx-auto" />
        <div className="relative w-12 md:w-16 h-12 md:h-16 -mt-1 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-yellow-400/90 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)]" />
          <svg viewBox="0 0 100 100" className="w-10 md:w-14 h-10 md:h-14 drop-shadow-[0_0_12px_rgba(255,50,50,0.9)]">
            <polygon
              points="50,5 64,36 98,36 71,57 81,91 50,70 19,91 29,57 2,36 36,36"
              fill="#E50914"
              stroke="#FFD700"
              strokeWidth="3"
            />
            <circle cx="50" cy="50" r="12" fill="#FFAA00" />
          </svg>
        </div>
        <div className="w-1.5 h-8 bg-gradient-to-b from-yellow-400 to-red-500 mx-auto rounded-full mt-1" />
      </div>

      {/* Bottom Misty Lake & Floating Lotus Lanterns (Thả Hoa Đăng) */}
      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 pointer-events-none z-10">
        {/* River water gradient & ripples */}
        <div className="w-full h-full bg-gradient-to-t from-[#100002] via-[#220005]/85 to-transparent relative">
          {/* Subtle water shimmer line */}
          <div className="absolute top-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />

          {/* Floating water lanterns (hoa đăng trôi lững lờ) */}
          <div className="absolute bottom-6 left-[8%] sm:left-[15%] animate-float-gentle opacity-85">
            <div className="relative">
              {/* Lotus petal glow */}
              <div className="w-8 h-4 bg-gradient-to-r from-pink-500 via-rose-600 to-pink-500 rounded-b-full shadow-[0_0_14px_rgba(255,105,180,0.85)]" />
              {/* Candle flame */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-3 bg-amber-200 rounded-full blur-[1px] animate-pulse" />
              {/* Reflection */}
              <div className="w-8 h-2 bg-pink-500/30 blur-sm rounded-full mt-0.5" />
            </div>
          </div>

          <div className="absolute bottom-8 left-[38%] animate-float-gentle [animation-delay:1.5s] opacity-90 hidden sm:block">
            <div className="relative">
              <div className="w-9 h-5 bg-gradient-to-r from-amber-400 via-red-500 to-amber-500 rounded-b-full shadow-[0_0_16px_rgba(255,165,0,0.9)]" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-3.5 bg-yellow-100 rounded-full blur-[1px] animate-pulse" />
              <div className="w-9 h-2 bg-amber-400/30 blur-sm rounded-full mt-0.5" />
            </div>
          </div>

          <div className="absolute bottom-5 right-[12%] sm:right-[22%] animate-float-gentle [animation-delay:3s] opacity-85">
            <div className="relative">
              <div className="w-8 h-4 bg-gradient-to-r from-rose-500 via-red-600 to-rose-400 rounded-b-full shadow-[0_0_14px_rgba(255,99,71,0.85)]" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-3 bg-amber-200 rounded-full blur-[1px] animate-pulse" />
              <div className="w-8 h-2 bg-rose-500/30 blur-sm rounded-full mt-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
