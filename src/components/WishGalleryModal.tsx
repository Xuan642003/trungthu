import React, { useState } from 'react';
import { Wish, WishCategory } from '../types';
import { CATEGORY_LABELS } from '../data/initialWishes';

interface WishGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: Wish[];
  onSelectWish: (wish: Wish) => void;
  onLikeWish: (wishId: string) => void;
  onOpenWishModal: () => void;
}

export const WishGalleryModal: React.FC<WishGalleryModalProps> = ({
  isOpen,
  onClose,
  wishes,
  onSelectWish,
  onLikeWish,
  onOpenWishModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredWishes = wishes.filter((w) => {
    const matchesCategory =
      selectedCategory === 'all' || w.category === selectedCategory;
    const matchesSearch =
      w.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.location && w.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-hidden">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-gradient-to-b from-[#2e0104] via-[#1a0002] to-[#120001] border-2 border-amber-400/90 shadow-[0_0_50px_rgba(255,180,0,0.4)] text-amber-50 p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Badge */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-stone-950 font-bold text-xs shadow-md border border-amber-200 uppercase tracking-widest flex items-center gap-1.5">
          <i className="fa-solid fa-scroll text-stone-950"></i>
          <span>Bảng Nguyện Ước Đêm Rằm</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-950/80 border border-amber-500/50 text-amber-300 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <div className="text-center mt-2 mb-3">
          <h2 className="text-lg sm:text-2xl font-bold font-festive text-gold-gradient">
            Tất Cả Lời Chúc & Tâm Nguyện
          </h2>
          <p className="text-xs text-amber-200/80 mt-0.5">
            Khám phá những niềm hy vọng ấm áp từ mọi miền đất nước ({wishes.length} điều ước)
          </p>
        </div>

        {/* Search & Filter Header */}
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-3">
          {/* Search bar */}
          <div className="relative w-full sm:flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-xs text-amber-400/70"></i>
            <input
              type="text"
              placeholder="Tìm theo tên, nơi chốn hoặc nội dung..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-red-950/60 border border-amber-500/40 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-yellow-300"
            />
          </div>

          {/* Quick Hang Wish button */}
          <button
            onClick={() => {
              onClose();
              onOpenWishModal();
            }}
            className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-amber-100 font-semibold text-xs border border-amber-300 shadow hover:scale-102 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <i className="fa-solid fa-plus text-xs"></i>
            <span>Treo điều ước mới</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap border transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-stone-950 border-yellow-200 font-bold shadow'
                : 'bg-red-950/50 border-amber-500/30 text-amber-200/80 hover:border-amber-400'
            }`}
          >
            Tất cả ({wishes.length})
          </button>
          {(Object.keys(CATEGORY_LABELS) as WishCategory[]).map((catKey) => {
            const item = CATEGORY_LABELS[catKey];
            const active = selectedCategory === catKey;
            const count = wishes.filter((w) => w.category === catKey).length;
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap border flex items-center gap-1 transition-all ${
                  active
                    ? 'bg-amber-400 text-stone-950 border-yellow-200 font-bold shadow'
                    : 'bg-red-950/50 border-amber-500/30 text-amber-200/80 hover:border-amber-400'
                }`}
              >
                <i className={`fa-solid ${item.icon} text-[10px]`}></i>
                <span>{item.label}</span>
                <span className="opacity-70 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Wishes Grid */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredWishes.length === 0 ? (
            <div className="col-span-2 py-10 text-center text-amber-300/60">
              <i className="fa-solid fa-scroll text-3xl mb-2 block"></i>
              <p className="text-xs">Không tìm thấy lá thư điều ước nào phù hợp</p>
            </div>
          ) : (
            filteredWishes.map((wish) => {
              const cat = CATEGORY_LABELS[wish.category];
              return (
                <div
                  key={wish.id}
                  onClick={() => {
                    onClose();
                    onSelectWish(wish);
                  }}
                  className="rounded-xl bg-gradient-to-b from-[#3a0207] to-[#220004] border border-amber-500/40 p-3 hover:border-amber-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-900 text-amber-200 text-[10px] font-medium border border-amber-500/30">
                        <i className={`fa-solid ${cat?.icon || 'fa-star'} text-[8px] text-amber-300`}></i>
                        <span>{cat?.label || 'Tâm nguyện'}</span>
                      </span>
                      <span className="text-[10px] text-amber-300/70">
                        {wish.location || 'Việt Nam'}
                      </span>
                    </div>

                    <p className="font-festive text-xs sm:text-sm text-amber-100 italic line-clamp-3 my-1">
                      &ldquo;{wish.content}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-amber-500/20 mt-2">
                    <span className="text-[11px] font-bold text-amber-300 truncate">
                      {wish.author}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikeWish(wish.id);
                      }}
                      className="flex items-center gap-1 text-[11px] text-rose-300 hover:text-rose-100 transition-colors"
                    >
                      <i className="fa-solid fa-heart text-rose-400"></i>
                      <span>{wish.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
