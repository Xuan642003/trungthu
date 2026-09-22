import React, { useState, useEffect } from 'react';
import { CountdownTime } from '../types';
import { midAutumnAudio } from '../utils/audio';

interface CountdownHeaderProps {
  onOpenWishModal: () => void;
  onOpenCardModal: () => void;
  onOpenGallery: () => void;
  onExploreRandomWish: () => void;
}

export const CountdownHeader: React.FC<CountdownHeaderProps> = ({
  onOpenWishModal,
  onOpenCardModal,
  onOpenGallery,
  onExploreRandomWish,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Target: Rằm tháng 8 Âm lịch (Đêm Hội Trăng Rằm)
  // Target date set to September 25, 2026, 20:00:00
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const targetDate = new Date('2026-09-25T20:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds, isPast: false });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = async () => {
    const active = await midAutumnAudio.togglePlay();
    setIsPlaying(active);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    midAutumnAudio.setVolume(val);
  };

  return (
    <header className="relative z-30 w-full px-3 pt-2.5 pb-2 sm:px-6 sm:pt-4 flex flex-col items-center">
      {/* Top bar with festive title and audio toggle */}
      <div className="w-full max-w-5xl flex items-center justify-between">
        {/* Left: Festive Emblem */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-400 via-red-600 to-amber-600 flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.6)] border border-amber-300">
            <i className="fa-solid fa-moon text-amber-100 text-sm sm:text-base"></i>
          </div>
          <div>
            <h1 className="text-gold-gradient font-title text-base sm:text-xl md:text-2xl font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              ĐÊM HỘI TRĂNG RẰM
            </h1>
            <p className="text-amber-200/80 text-[11px] sm:text-xs font-festive hidden xs:block">
              Tết Trung Thu Đoàn Viên & Khát Vọng An Lành
            </p>
          </div>
        </div>

        {/* Right: Audio Music Controller (FontAwesome icons) */}
        <div className="flex items-center gap-2 relative">
          <button
            id="audio-toggle-btn"
            onClick={handleToggleAudio}
            className={`flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border transition-all duration-300 shadow-md ${
              isPlaying
                ? 'bg-red-950/80 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(255,215,0,0.5)]'
                : 'bg-black/50 border-amber-500/40 text-amber-200/80 hover:border-amber-400'
            }`}
            title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền Trung Thu'}
          >
            <i className={`fa-solid ${isPlaying ? 'fa-music fa-bounce' : 'fa-volume-xmark'} text-xs sm:text-sm`}></i>
            <span className="text-[11px] sm:text-xs font-medium whitespace-nowrap">
              {isPlaying ? 'Nhạc Trăng Rằm' : 'Bật nhạc'}
            </span>

            {/* Equalizer animation when playing */}
            {isPlaying && (
              <div className="flex items-end gap-[2px] h-3.5 pl-1">
                <span className="w-0.5 bg-amber-400 h-2 animate-[wavePulse_0.8s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-amber-300 h-3 animate-[wavePulse_0.6s_ease-in-out_infinite_0.2s]" />
                <span className="w-0.5 bg-amber-400 h-1.5 animate-[wavePulse_0.9s_ease-in-out_infinite_0.4s]" />
              </div>
            )}
          </button>

          {/* Volume gear toggle */}
          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 border border-amber-500/30 text-amber-300/80 flex items-center justify-center hover:text-amber-200 transition-colors"
            title="Âm lượng"
          >
            <i className="fa-solid fa-sliders text-xs"></i>
          </button>

          {/* Volume popover */}
          {showVolumeSlider && (
            <div className="absolute right-0 top-11 bg-[#2b0306] border border-amber-500/60 rounded-xl p-2.5 shadow-2xl z-50 flex items-center gap-2 backdrop-blur-md">
              <i className="fa-solid fa-volume-low text-xs text-amber-400"></i>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 accent-amber-400 h-1 bg-amber-950 rounded-lg cursor-pointer"
              />
              <i className="fa-solid fa-volume-high text-xs text-amber-400"></i>
            </div>
          )}
        </div>
      </div>

      {/* Countdown Timer to Full Moon Night (Rằm Tháng Tám) */}
      <div className="mt-2 sm:mt-3 flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-950/90 via-amber-950/80 to-red-950/90 border border-amber-400/50 shadow-[0_0_15px_rgba(255,180,0,0.3)] mb-1.5 backdrop-blur-sm">
          <i className="fa-solid fa-hourglass-half text-amber-400 text-xs animate-spin [animation-duration:8s]"></i>
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-amber-200">
            {countdown.isPast
              ? 'ĐÊM HỘI TRĂNG RẰM ĐANG DIỄN RA'
              : 'ĐẾM NGƯỢC ĐẾN ĐÊM HỘI TRĂNG RẰM (RẰM THÁNG 8)'}
          </span>
          <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
        </div>

        {/* 4 Golden Countdown Boxes */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <CountdownBox value={countdown.days} label="Ngày" icon="fa-calendar-day" />
          <span className="text-amber-400 font-bold text-base sm:text-xl -mt-3">:</span>
          <CountdownBox value={countdown.hours} label="Giờ" icon="fa-clock" />
          <span className="text-amber-400 font-bold text-base sm:text-xl -mt-3">:</span>
          <CountdownBox value={countdown.minutes} label="Phút" icon="fa-stopwatch" />
          <span className="text-amber-400 font-bold text-base sm:text-xl -mt-3">:</span>
          <CountdownBox value={countdown.seconds} label="Giây" icon="fa-bolt" isSecond />
        </div>
      </div>

      {/* Quick Festive Navigation Buttons (PC & Mobile optimized) */}
      <div className="mt-2.5 sm:mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-3xl">
        <button
          id="btn-hang-wish"
          onClick={onOpenWishModal}
          className="group flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-amber-100 font-medium text-xs sm:text-sm shadow-[0_4px_16px_rgba(217,4,41,0.5)] border border-amber-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <i className="fa-solid fa-envelope-open-text text-amber-300 group-hover:rotate-12 transition-transform"></i>
          <span>Treo Thư Điều Ước</span>
        </button>

        <button
          id="btn-random-wish"
          onClick={onExploreRandomWish}
          className="group flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-stone-900 font-semibold text-xs sm:text-sm shadow-[0_4px_16px_rgba(255,190,11,0.5)] border border-yellow-200 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <i className="fa-solid fa-wand-magic-sparkles text-red-700 group-hover:scale-110 transition-transform"></i>
          <span>Khám Phá Điều Ước</span>
        </button>

        <button
          id="btn-share-card"
          onClick={onOpenCardModal}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-red-950/80 text-amber-200 font-medium text-xs sm:text-sm border border-amber-400/60 hover:bg-red-900/90 hover:border-amber-300 active:scale-95 transition-all duration-200 cursor-pointer backdrop-blur-sm shadow-md"
        >
          <i className="fa-solid fa-gift text-amber-400"></i>
          <span>Tạo & Chia Sẻ Thiệp</span>
        </button>

        <button
          id="btn-open-gallery"
          onClick={onOpenGallery}
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-black/40 text-amber-300/90 font-medium text-xs sm:text-sm border border-amber-500/30 hover:border-amber-400 hover:text-amber-200 active:scale-95 transition-all duration-200 cursor-pointer backdrop-blur-sm"
        >
          <i className="fa-solid fa-scroll text-yellow-400 text-xs"></i>
          <span>Bảng Nguyện Ước</span>
        </button>
      </div>
    </header>
  );
};

interface CountdownBoxProps {
  value: number;
  label: string;
  icon: string;
  isSecond?: boolean;
}

const CountdownBox: React.FC<CountdownBoxProps> = ({ value, label, icon, isSecond }) => {
  const formatted = value.toString().padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-11 h-12 sm:w-14 sm:h-16 rounded-xl bg-gradient-to-b from-[#7a0611] via-[#540209] to-[#2e0104] border border-amber-400/70 shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
        {/* Top glossy highlight */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-white/10 rounded-t-xl pointer-events-none" />
        {/* Subtle center fold */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/40" />

        <span
          className={`font-mono font-bold text-base sm:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
            isSecond ? 'text-yellow-300' : 'text-amber-200'
          }`}
        >
          {formatted}
        </span>
      </div>
      <span className="text-[10px] sm:text-[11px] font-medium text-amber-300/80 mt-1 flex items-center gap-1">
        <i className={`fa-solid ${icon} text-[9px] text-amber-400/70`}></i>
        {label}
      </span>
    </div>
  );
};
