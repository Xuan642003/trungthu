import React from 'react';
import { Wish, LanternType } from '../types';

interface WishingTreeSkyProps {
  wishes: Wish[];
  onSelectWish: (wish: Wish) => void;
  onOpenWishModal: () => void;
}

export const WishingTreeSky: React.FC<WishingTreeSkyProps> = ({
  wishes,
  onSelectWish,
  onOpenWishModal,
}) => {
  // Pre-configured positions for hanging lanterns across the sky
  const lanternSlots = [
    { top: '18%', left: '8%', delay: '0s', scale: 0.95 },
    { top: '14%', left: '26%', delay: '1.2s', scale: 1.05 },
    { top: '22%', left: '44%', delay: '0.6s', scale: 1.0 },
    { top: '15%', left: '68%', delay: '1.8s', scale: 1.1 },
    { top: '20%', left: '86%', delay: '0.4s', scale: 0.95 },
    { top: '34%', left: '16%', delay: '2.1s', scale: 0.9 },
    { top: '38%', left: '36%', delay: '1.4s', scale: 1.0 },
    { top: '35%', left: '58%', delay: '0.9s', scale: 0.95 },
    { top: '32%', left: '78%', delay: '1.6s', scale: 1.05 },
  ];

  return (
    <div className="relative z-10 w-full flex-1 flex flex-col justify-between overflow-hidden px-3 sm:px-8 py-2">
      {/* Lanterns Sky Area */}
      <div className="relative w-full h-[320px] sm:h-[380px] md:h-[440px]">
        {/* Floating Wish Lanterns */}
        {wishes.slice(0, 9).map((wish, index) => {
          const slot = lanternSlots[index % lanternSlots.length];
          return (
            <div
              key={wish.id}
              onClick={() => onSelectWish(wish)}
              style={{
                top: slot.top,
                left: slot.left,
                animationDelay: slot.delay,
                transform: `scale(${slot.scale})`,
              }}
              className="absolute -translate-x-1/2 cursor-pointer group transition-transform duration-300 hover:scale-115 hover:z-40"
              title={`Điều ước của ${wish.author}: "${wish.content.slice(0, 40)}..." - Nhấn để xem`}
            >
              {/* Hanging string */}
              <div className="w-[1px] h-6 sm:h-10 bg-amber-400/80 mx-auto" />

              {/* Lantern Graphic depending on type */}
              <div className="animate-lantern-sway flex flex-col items-center">
                <LanternVisual type={wish.lanternType} likes={wish.likes} />

                {/* Hanging Parchment Wish Letter Tag (Lá thư điều ước) */}
                <div className="relative -mt-1 group-hover:-translate-y-0.5 transition-transform duration-200">
                  {/* Red cord linking to parchment */}
                  <div className="w-[1.5px] h-3 bg-red-500 mx-auto" />

                  {/* Red/Gold festive wish envelope/tag */}
                  <div className="px-2 py-1 rounded bg-gradient-to-b from-[#8a0a14] to-[#470207] border border-amber-400/90 shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-center min-w-[70px] max-w-[95px] backdrop-blur-sm group-hover:border-yellow-300 group-hover:shadow-[0_0_12px_rgba(255,215,0,0.8)]">
                    <p className="text-[10px] font-semibold text-amber-200 truncate leading-tight">
                      {wish.author}
                    </p>
                    <p className="text-[8px] text-amber-300/80 truncate">
                      {wish.location || 'Ước nguyện'}
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-0.5 text-[8px] text-red-300">
                      <i className="fa-solid fa-heart text-[7px] text-rose-400"></i>
                      <span>{wish.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Hint and Action Prompt */}
      <div className="relative z-20 w-full max-w-xl mx-auto text-center pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-amber-500/40 backdrop-blur-md shadow-lg">
          <i className="fa-solid fa-hand-pointer text-amber-400 text-xs animate-bounce"></i>
          <span className="text-xs text-amber-100 font-medium">
            Chạm vào bất kỳ <span className="text-yellow-300 font-bold">Lồng Đèn Điều Ước</span> trên trời để xem tâm nguyện
          </span>
          <button
            onClick={onOpenWishModal}
            className="ml-1 text-xs text-red-300 underline font-semibold hover:text-amber-200 transition-colors"
          >
            + Treo điều ước
          </button>
        </div>
      </div>
    </div>
  );
};

interface LanternVisualProps {
  type: LanternType;
  likes: number;
}

const LanternVisual: React.FC<LanternVisualProps> = ({ type }) => {
  switch (type) {
    case 'star':
      return (
        <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-yellow-400 shadow-[0_0_12px_rgba(255,215,0,0.8)]" />
          <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-10 sm:h-10">
            <polygon
              points="50,5 64,36 98,36 71,57 81,91 50,70 19,91 29,57 2,36 36,36"
              fill="#D90429"
              stroke="#FFD700"
              strokeWidth="4"
            />
            <circle cx="50" cy="50" r="14" fill="#FFA500" />
          </svg>
        </div>
      );

    case 'lotus':
      return (
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-200 shadow-[0_0_16px_rgba(255,105,180,0.85)] border border-pink-300 flex items-center justify-center">
            <i className="fa-solid fa-spa text-xs text-amber-100"></i>
          </div>
        </div>
      );

    case 'rabbit':
      return (
        <div className="relative w-8 h-9 sm:w-9 sm:h-10 flex items-center justify-center">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-b from-amber-100 to-yellow-200 shadow-[0_0_15px_rgba(255,255,200,0.9)] border border-amber-300 flex items-center justify-center">
            <i className="fa-solid fa-paw text-[11px] text-amber-700"></i>
          </div>
        </div>
      );

    case 'gold':
      return (
        <div className="relative w-8 h-10 sm:w-9 sm:h-12 flex flex-col items-center">
          <div className="w-8 h-1.5 bg-yellow-600 rounded-sm" />
          <div className="w-7 sm:w-8 h-8 sm:h-9 bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-600 rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.9)] border border-yellow-200 flex items-center justify-center">
            <span className="text-[10px] font-bold text-amber-950 font-festive">Tài</span>
          </div>
        </div>
      );

    case 'red':
    default:
      return (
        <div className="relative w-8 h-10 sm:w-9 sm:h-12 flex flex-col items-center">
          <div className="w-8 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 rounded-sm" />
          <div className="w-7 sm:w-8 h-8 sm:h-9 bg-gradient-to-b from-[#e60000] via-[#b30000] to-[#660000] rounded-xl shadow-[0_0_20px_rgba(255,50,50,0.9)] border-t border-b border-amber-300 flex items-center justify-center">
            <span className="text-[10px] font-bold text-amber-200 font-festive">Phúc</span>
          </div>
        </div>
      );
  }
};
