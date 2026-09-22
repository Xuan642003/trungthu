import React, { useState } from 'react';
import { Wish } from '../types';
import { CATEGORY_LABELS } from '../data/initialWishes';

interface RandomWishViewerProps {
  wish: Wish | null;
  onClose: () => void;
  onNextRandom: () => void;
  onLikeWish: (wishId: string) => void;
  onOpenCardWithWish?: (wish: Wish) => void;
}

export const RandomWishViewer: React.FC<RandomWishViewerProps> = ({
  wish,
  onClose,
  onNextRandom,
  onLikeWish,
  onOpenCardWithWish,
}) => {
  const [copied, setCopied] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  if (!wish) return null;

  const categoryInfo = CATEGORY_LABELS[wish.category] || {
    label: 'Ước Nguyện',
    icon: 'fa-star',
    color: 'from-amber-500 to-red-600',
  };

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      onLikeWish(wish.id);
    }
  };

  const handleCopy = () => {
    const text = `🌕 Điều ước Trung Thu từ ${wish.author} (${wish.location || 'Việt Nam'}): "${wish.content}"\n✨ Cùng gửi gắm ước nguyện tại Đêm Hội Trăng Rằm!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareFacebook = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-hidden">
      <div
        className="relative w-full max-w-md flex flex-col rounded-3xl bg-gradient-to-b from-[#2e0104] via-[#1a0002] to-[#120001] border-2 border-amber-400/90 shadow-[0_0_50px_rgba(255,215,0,0.4)] text-amber-50 p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ribbon seal */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-amber-100 font-bold text-xs shadow-lg border border-amber-200 uppercase tracking-wider flex items-center gap-1.5">
          <i className="fa-solid fa-envelope-open-text text-yellow-300"></i>
          <span>Lá Thư Nguyện Ước</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-red-950/80 border border-amber-500/50 text-amber-300 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        {/* Wish Scroll Body */}
        <div className="mt-4 relative rounded-2xl bg-gradient-to-b from-[#fff8e7] via-[#fff2d1] to-[#fcedc7] p-5 sm:p-6 text-stone-900 border-2 border-amber-500/60 shadow-[inset_0_0_20px_rgba(180,100,20,0.2)]">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-amber-700/40 text-xs">✤</div>
          <div className="absolute top-2 right-2 text-amber-700/40 text-xs">✤</div>
          <div className="absolute bottom-2 left-2 text-amber-700/40 text-xs">✤</div>
          <div className="absolute bottom-2 right-2 text-amber-700/40 text-xs">✤</div>

          {/* Category Badge & Origin */}
          <div className="flex items-center justify-between border-b border-amber-300/80 pb-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-800 text-amber-100 text-[11px] font-semibold">
              <i className={`fa-solid ${categoryInfo.icon} text-[10px] text-amber-300`}></i>
              {categoryInfo.label}
            </span>
            <span className="text-xs text-amber-900/80 flex items-center gap-1 font-medium">
              <i className="fa-solid fa-location-dot text-red-600 text-[11px]"></i>
              {wish.location || 'Việt Nam'}
            </span>
          </div>

          {/* Letter Quote Body */}
          <div className="my-3 text-center">
            <i className="fa-solid fa-quote-left text-amber-600/40 text-lg block mb-1"></i>
            <p className="font-festive text-base sm:text-lg text-red-950 leading-relaxed italic font-medium px-2">
              &ldquo;{wish.content}&rdquo;
            </p>
            <i className="fa-solid fa-quote-right text-amber-600/40 text-lg block mt-1"></i>
          </div>

          {/* Author Signature */}
          <div className="mt-4 text-right pt-2 border-t border-amber-300/60">
            <p className="text-xs text-amber-900/70">Người gửi gắm:</p>
            <p className="font-festive text-base font-bold text-red-900 tracking-wide">
              {wish.author}
            </p>
          </div>
        </div>

        {/* Interaction Actions */}
        <div className="mt-4 flex items-center justify-between gap-2">
          {/* Like / Bless button */}
          <button
            onClick={handleLike}
            className={`flex-1 py-2 px-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              hasLiked
                ? 'bg-rose-900/80 border-rose-400 text-rose-200'
                : 'bg-red-950/70 border-amber-500/40 text-amber-200 hover:border-amber-400'
            }`}
          >
            <i
              className={`fa-solid fa-heart ${
                hasLiked ? 'text-rose-400 scale-125' : 'text-amber-400'
              } transition-transform`}
            ></i>
            <span>{hasLiked ? 'Đã Gửi Phúc Lành' : 'Gửi Phúc Lành'}</span>
            <span className="text-xs opacity-80">({wish.likes + (hasLiked ? 1 : 0)})</span>
          </button>

          {/* Next Random Wish Button */}
          <button
            onClick={onNextRandom}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-bold text-xs sm:text-sm border border-yellow-200 shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <i className="fa-solid fa-shuffle text-red-800"></i>
            <span>Xem Lá Thư Khác</span>
          </button>
        </div>

        {/* Social Share & Copy row */}
        <div className="mt-3 pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs text-amber-200/80">
          <span className="text-[11px]">Chia sẻ điều ước:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/30 hover:border-amber-400 text-amber-300 flex items-center gap-1 transition-colors"
              title="Sao chép lời ước"
            >
              <i className="fa-solid fa-copy text-xs"></i>
              <span>{copied ? 'Đã sao chép!' : 'Sao chép'}</span>
            </button>
            <button
              onClick={handleShareFacebook}
              className="w-7 h-7 rounded-lg bg-[#1877F2]/80 text-white flex items-center justify-center hover:bg-[#1877F2] transition-colors"
              title="Chia sẻ lên Facebook"
            >
              <i className="fa-brands fa-facebook-f text-xs"></i>
            </button>
            {onOpenCardWithWish && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCardWithWish(wish);
                }}
                className="px-2.5 py-1 rounded-lg bg-amber-600/80 text-amber-100 flex items-center gap-1 hover:bg-amber-600 transition-colors"
                title="Làm thành thiệp chúc"
              >
                <i className="fa-solid fa-gift text-xs"></i>
                <span>Tạo thiệp</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
