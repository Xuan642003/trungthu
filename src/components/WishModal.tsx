import React, { useState } from 'react';
import { Wish, WishCategory, LanternType } from '../types';
import { CATEGORY_LABELS } from '../data/initialWishes';

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitWish: (newWish: Omit<Wish, 'id' | 'likes' | 'createdAt'>) => void;
}

const SAMPLE_WISHES = [
  'Mong Trung Thu này cả gia đình được quây quần đông đủ, bố mẹ luôn mạnh khỏe và an vui.',
  'Cầu mong công danh đỗ đạt, thi cử thuận lợi, sự nghiệp hanh thông.',
  'Chúc cho tâm hồn luôn an nhiên, mọi âu lo tan biến như mây trôi dưới ánh trăng rằm.',
  'Ước cho tình yêu đôi lứa luôn sắt son, bền chặt và ngọt ngào như hương vị bánh nướng.',
  'Cầu chúc các em nhỏ luôn có những nụ cười rạng rỡ và mùa trăng cổ tích trọn vẹn.',
];

export const WishModal: React.FC<WishModalProps> = ({ isOpen, onClose, onSubmitWish }) => {
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<WishCategory>('doan-vien');
  const [lanternType, setLanternType] = useState<LanternType>('red');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitWish({
        author: author.trim(),
        location: location.trim() || 'Việt Nam',
        content: content.trim(),
        category,
        lanternType,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const handlePickSample = (sample: string) => {
    setContent(sample);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-hidden">
      <div
        className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-2xl bg-gradient-to-b from-[#380106] via-[#240003] to-[#150002] border-2 border-amber-400/80 shadow-[0_0_40px_rgba(230,57,70,0.6)] text-amber-50 p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top traditional gold crest */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 text-stone-950 font-bold text-xs shadow-md border border-amber-200 uppercase tracking-widest flex items-center gap-1.5">
          <i className="fa-solid fa-moon text-red-700"></i>
          <span>Thư Nguyện Ước Trăng Rằm</span>
          <i className="fa-solid fa-star text-red-700"></i>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-950/80 border border-amber-500/50 text-amber-300 hover:text-white hover:bg-red-800 transition-colors flex items-center justify-center cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <div className="text-center mt-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold font-festive text-gold-gradient">
            Treo Lên Hy Vọng Đêm Rằm
          </h2>
          <p className="text-xs text-amber-200/80 mt-1">
            Gửi gắm ước nguyện vào lồng đèn lung linh để thắp sáng bầu trời đêm hội
          </p>
        </div>

        {/* Form Body - scrollable internally if tiny mobile screen */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
          {/* Inputs Row: Name & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                Tên hoặc Biệt danh *
              </label>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-xs text-amber-500/80"></i>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Minh Anh, Tuấn..."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-red-950/60 border border-amber-500/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                Địa điểm / Quê hương
              </label>
              <div className="relative">
                <i className="fa-solid fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-xs text-amber-500/80"></i>
                <input
                  type="text"
                  placeholder="Ví dụ: Hà Nội, Hội An..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-red-950/60 border border-amber-500/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-yellow-300"
                />
              </div>
            </div>
          </div>

          {/* Category selection */}
          <div>
            <label className="block text-[11px] font-semibold text-amber-300 mb-1">
              Chủ đề tâm nguyện
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {(Object.keys(CATEGORY_LABELS) as WishCategory[]).map((catKey) => {
                const item = CATEGORY_LABELS[catKey];
                const active = category === catKey;
                return (
                  <button
                    type="button"
                    key={catKey}
                    onClick={() => setCategory(catKey)}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-medium border flex flex-col items-center gap-1 transition-all ${
                      active
                        ? 'bg-amber-400 text-stone-950 border-yellow-200 font-bold shadow-[0_0_10px_rgba(255,215,0,0.5)]'
                        : 'bg-red-950/40 border-amber-500/30 text-amber-200/80 hover:border-amber-400/60'
                    }`}
                  >
                    <i className={`fa-solid ${item.icon} text-xs`}></i>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lantern Style Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-amber-300 mb-1">
              Chọn Lồng Đèn mang ước nguyện
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { type: 'red', name: 'Đèn Lồng Đỏ', icon: 'fa-lightbulb' },
                { type: 'star', name: 'Đèn Ông Sao', icon: 'fa-star' },
                { type: 'lotus', name: 'Hoa Đăng', icon: 'fa-spa' },
                { type: 'rabbit', name: 'Thỏ Ngọc', icon: 'fa-paw' },
                { type: 'gold', name: 'Hoàng Kim', icon: 'fa-coins' },
              ].map((lan) => {
                const active = lanternType === lan.type;
                return (
                  <button
                    type="button"
                    key={lan.type}
                    onClick={() => setLanternType(lan.type as LanternType)}
                    className={`py-1.5 px-1 rounded-lg text-[10px] border flex flex-col items-center gap-1 transition-all ${
                      active
                        ? 'bg-gradient-to-r from-red-600 to-amber-600 text-yellow-100 border-yellow-300 shadow-md scale-102'
                        : 'bg-red-950/40 border-amber-500/30 text-amber-300/70 hover:border-amber-400'
                    }`}
                  >
                    <i className={`fa-solid ${lan.icon} text-xs`}></i>
                    <span className="truncate">{lan.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-amber-300">
                Nội dung ước nguyện *
              </label>
              <span className="text-[10px] text-amber-400/70">
                {content.length}/200 ký tự
              </span>
            </div>
            <textarea
              required
              rows={3}
              maxLength={200}
              placeholder="Hãy viết ra những mong ước chân thành nhất của bạn..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm rounded-xl bg-red-950/70 border border-amber-500/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-yellow-300 resize-none font-festive"
            />
          </div>

          {/* Quick inspiration chips */}
          <div>
            <span className="text-[10px] text-amber-300/70 mb-1 block">
              Gợi ý câu chúc nhanh:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_WISHES.slice(0, 3).map((sample, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handlePickSample(sample)}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-red-900/40 border border-amber-500/30 text-amber-200/90 hover:bg-red-800/60 transition-colors text-left truncate max-w-full"
                >
                  &ldquo;{sample.slice(0, 36)}...&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !author.trim() || !content.trim()}
              className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-red-600 via-yellow-500 to-amber-600 text-stone-950 font-bold text-sm shadow-[0_4px_20px_rgba(255,215,0,0.6)] border border-yellow-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <i className="fa-solid fa-paper-plane text-red-900"></i>
              <span>{isSubmitting ? 'Đang Treo Ước Nguyện...' : 'Treo Thư Lên Bầu Trời Đêm'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
