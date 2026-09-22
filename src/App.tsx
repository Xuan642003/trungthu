import React, { useState, useEffect, useCallback } from 'react';
import { Wish } from './types';
import { INITIAL_WISHES } from './data/initialWishes';
import { MoonAndSky } from './components/MoonAndSky';
import { MapleLeavesCanvas } from './components/MapleLeavesCanvas';
import { CountdownHeader } from './components/CountdownHeader';
import { WishingTreeSky } from './components/WishingTreeSky';
import { WishModal } from './components/WishModal';
import { RandomWishViewer } from './components/RandomWishViewer';
import { GreetingCardModal } from './components/GreetingCardModal';
import { WishGalleryModal } from './components/WishGalleryModal';

const STORAGE_KEY = 'mid_autumn_wishes_v2';

export default function App() {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_WISHES;
  });

  // Modals state
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeWish, setActiveWish] = useState<Wish | null>(null);
  const [cardDefaultMessage, setCardDefaultMessage] = useState<string | undefined>(undefined);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lantern release celebration animation
  const [showCelebration, setShowCelebration] = useState(false);

  // Save to localStorage whenever wishes change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      // Ignore storage errors
    }
  }, [wishes]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add new wish
  const handleAddWish = (newWishData: Omit<Wish, 'id' | 'likes' | 'createdAt'>) => {
    const newWish: Wish = {
      ...newWishData,
      id: `wish-${Date.now()}`,
      likes: 1,
      createdAt: new Date().toISOString(),
    };

    setWishes((prev) => [newWish, ...prev]);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
    showToast(`🏮 Lồng đèn "${newWish.author}" đã được thả lên trời cao!`);
  };

  // Like a wish
  const handleLikeWish = (wishId: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === wishId ? { ...w, likes: w.likes + 1 } : w))
    );
    showToast('✨ Đã gửi một lời chúc phúc lành đến tác giả!');
  };

  // Pick random wish
  const handleExploreRandom = useCallback(() => {
    if (wishes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * wishes.length);
    setActiveWish(wishes[randomIndex]);
  }, [wishes]);

  // Open Greeting Card with specific wish content
  const handleOpenCardWithWish = (wish: Wish) => {
    setCardDefaultMessage(
      `"${wish.content}" - Lời chúc từ ${wish.author} gửi đến mọi người nhân dịp Tết Trung Thu.`
    );
    setIsCardModalOpen(true);
  };

  return (
    <div
      id="mid-autumn-app"
      className="relative w-screen h-screen overflow-hidden flex flex-col justify-between bg-[#1f0104] text-amber-50 select-none"
    >
      {/* Visual Scenery Layers */}
      <MoonAndSky />
      <MapleLeavesCanvas />

      {/* Main Content Area */}
      <div className="relative z-20 flex-1 flex flex-col justify-between overflow-hidden">
        {/* Top Header with Live Countdown & Audio Synth Player */}
        <CountdownHeader
          onOpenWishModal={() => setIsWishModalOpen(true)}
          onOpenCardModal={() => {
            setCardDefaultMessage(undefined);
            setIsCardModalOpen(true);
          }}
          onOpenGallery={() => setIsGalleryOpen(true)}
          onExploreRandomWish={handleExploreRandom}
        />

        {/* Interactive Sky & Hanging Wish Lanterns */}
        <WishingTreeSky
          wishes={wishes}
          onSelectWish={(wish) => setActiveWish(wish)}
          onOpenWishModal={() => setIsWishModalOpen(true)}
        />

        {/* Festive Bottom Footer Bar */}
        <footer className="relative z-20 w-full px-3 py-2 sm:px-6 bg-gradient-to-t from-[#150002] via-[#240004]/90 to-transparent flex items-center justify-between text-xs text-amber-300/80 border-t border-amber-500/20 backdrop-blur-xs">
          <div className="flex items-center gap-1.5 truncate">
            <i className="fa-solid fa-moon text-yellow-400 text-xs"></i>
            <span className="font-festive italic text-[11px] sm:text-xs text-amber-200/90 truncate">
              &ldquo;Trăng rằm tròn đầy phúc lộc — Soi sáng muôn nhà vạn sự an khang&rdquo;
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline-block text-[11px] text-amber-400/80">
              <i className="fa-solid fa-fire-flame-curved text-red-500 mr-1"></i>
              {wishes.length} lời ước đã treo
            </span>

            <button
              onClick={() => {
                setCardDefaultMessage(undefined);
                setIsCardModalOpen(true);
              }}
              className="text-[11px] font-semibold text-yellow-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-share-nodes text-xs"></i>
              <span>Chia sẻ thiệp</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Celebration Lantern Ascension Animation */}
      {showCelebration && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center animate-bounce">
            <div className="w-16 h-20 rounded-2xl bg-gradient-to-b from-yellow-300 via-red-500 to-amber-600 shadow-[0_0_50px_rgba(255,215,0,0.9)] border-2 border-yellow-200 flex items-center justify-center">
              <i className="fa-solid fa-paper-plane text-2xl text-yellow-100"></i>
            </div>
            <span className="mt-2 text-sm font-bold text-yellow-200 drop-shadow-md">
              Ước Nguyện Đang Bay Lên Cung Trăng!
            </span>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-gradient-to-r from-red-950 via-amber-950 to-red-950 border border-amber-400 text-amber-100 text-xs sm:text-sm font-medium shadow-[0_0_25px_rgba(255,215,0,0.5)] flex items-center gap-2 backdrop-blur-md animate-fade-in">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hang a Wish Modal */}
      <WishModal
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
        onSubmitWish={handleAddWish}
      />

      {/* Random Wish Viewer Modal */}
      <RandomWishViewer
        wish={activeWish}
        onClose={() => setActiveWish(null)}
        onNextRandom={handleExploreRandom}
        onLikeWish={handleLikeWish}
        onOpenCardWithWish={handleOpenCardWithWish}
      />

      {/* Create & Share Mid-Autumn Greeting Card Modal */}
      <GreetingCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        defaultMessage={cardDefaultMessage}
      />

      {/* Wish Community Gallery Modal */}
      <WishGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        wishes={wishes}
        onSelectWish={(w) => setActiveWish(w)}
        onLikeWish={handleLikeWish}
        onOpenWishModal={() => setIsWishModalOpen(true)}
      />
    </div>
  );
}
