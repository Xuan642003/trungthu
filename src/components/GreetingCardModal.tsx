import React, { useState, useRef } from 'react';

interface GreetingCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMessage?: string;
}

const PRESET_MESSAGES = [
  'Chúc bạn và gia đình một mùa Tết Trung Thu ấm áp, tràn ngập tiếng cười, vạn sự bình an và trọn vẹn đoàn viên!',
  'Trăng rằm tháng Tám sáng soi muôn nơi. Kính chúc cha mẹ luôn dồi dào sức khỏe, an khang trường thọ và hạnh phúc bên con cháu!',
  'Mùa trăng cổ tích về, chúc người thương của anh/em luôn rạng ngời như ánh trăng rằm, ngọt ngào như vị bánh trung thu!',
  'Chúc các bạn nhỏ có một đêm rằm rước đèn phá cỗ tưng bừng, luôn chăm ngoan, học giỏi và ngập tràn niềm vui tuổi thơ!',
  'Tết Trung Thu đoàn viên, chúc cho công việc của chúng ta luôn thuận buồm xuôi gió, hợp tác bền lâu và gặt hái nhiều thành công rực rỡ!',
];

const CARD_THEMES = [
  { id: 'moon', name: 'Trăng Rằm & Đèn Lồng', bg: 'from-[#50000a] via-[#850818] to-[#300005]', border: 'border-yellow-400' },
  { id: 'gold', name: 'Hoàng Kim Cát Tường', bg: 'from-[#421d00] via-[#874300] to-[#260f00]', border: 'border-amber-300' },
  { id: 'night', name: 'Đêm Huyền Diệu', bg: 'from-[#1a0026] via-[#480d54] to-[#12001c]', border: 'border-pink-300' },
];

export const GreetingCardModal: React.FC<GreetingCardModalProps> = ({
  isOpen,
  onClose,
  defaultMessage,
}) => {
  const [recipient, setRecipient] = useState('Gia Đình & Bạn Bè');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState(
    defaultMessage || PRESET_MESSAGES[0]
  );
  const [theme, setTheme] = useState(CARD_THEMES[0]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  // Social sharing handlers
  const appUrl = window.location.href;
  const shareTitle = `🌕 Thiệp Chúc Trung Thu Đoàn Viên từ ${sender || 'Tôi'} gửi tặng ${recipient}!`;

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      appUrl
    )}&quote=${encodeURIComponent(`${shareTitle}\n"${message}"`)}`;
    window.open(url, '_blank');
  };

  const handleShareTwitter = () => {
    const text = `${shareTitle}\n"${message}"\n✨ Hãy cùng đón Tết Trung Thu tại:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(appUrl)}`;
    window.open(url, '_blank');
  };

  const handleShareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      appUrl
    )}&text=${encodeURIComponent(`${shareTitle}\n"${message}"`)}`;
    window.open(url, '_blank');
  };

  const handleShareZalo = () => {
    // Zalo sharing standard web sharer
    const url = `https://sp.zalo.me/plugins/share?url=${encodeURIComponent(
      appUrl
    )}&title=${encodeURIComponent(shareTitle)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    const contentToCopy = `🌕 ${shareTitle}\n\n"${message}"\n\n✨ Nhận thiệp và gửi điều ước Trung Thu tại: ${appUrl}`;
    navigator.clipboard.writeText(contentToCopy);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Render & download greeting card using HTML5 Canvas
  const handleDownloadCard = () => {
    setIsExporting(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background gradient
    const grad = ctx.createLinearGradient(0, 0, 1000, 700);
    grad.addColorStop(0, '#380006');
    grad.addColorStop(0.5, '#780614');
    grad.addColorStop(1, '#200003');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1000, 700);

    // Golden ornate borders
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 940, 640);
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(42, 42, 916, 616);

    // Glowing Moon in top right
    const moonGrad = ctx.createRadialGradient(820, 150, 20, 820, 150, 110);
    moonGrad.addColorStop(0, '#FFFFFF');
    moonGrad.addColorStop(0.4, '#FFF0B0');
    moonGrad.addColorStop(0.8, '#FFC233');
    moonGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(820, 150, 110, 0, Math.PI * 2);
    ctx.fill();

    // Title
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 44px "Cinzel Decorative", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('TẾT TRUNG THU ĐOÀN VIÊN', 500, 110);

    ctx.fillStyle = '#FFE082';
    ctx.font = 'italic 24px "Playfair Display", Georgia, serif';
    ctx.fillText('Đêm Hội Trăng Rằm - Rằm Tháng Tám', 500, 150);

    // Recipient
    ctx.fillStyle = '#FFF8E1';
    ctx.font = 'bold 30px "Be Vietnam Pro", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Kính gửi: ${recipient || 'Bạn Thân Yêu'}`, 100, 240);

    // Message box with line wrapping
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(90, 270, 820, 250);
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(90, 270, 820, 250);

    ctx.fillStyle = '#FFFDE7';
    ctx.font = 'italic 26px "Playfair Display", serif';
    ctx.textAlign = 'left';

    const words = message.split(' ');
    let line = '';
    let y = 330;
    const maxWidth = 760;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 120, y);
        line = words[n] + ' ';
        y += 42;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 120, y);

    // Sender
    ctx.textAlign = 'right';
    ctx.fillStyle = '#FFD54F';
    ctx.font = 'bold 28px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`Người gửi: ${sender || 'Một Người Bạn'}`, 900, 580);

    // Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 235, 180, 0.6)';
    ctx.font = '16px "Be Vietnam Pro", sans-serif';
    ctx.fillText('🌕 Chúc một mùa trăng rằm bình an, hạnh phúc và vạn sự như ý ✨', 500, 640);

    // Trigger download
    const link = document.createElement('a');
    link.download = `thiep-trung-thu-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setIsExporting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-hidden">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-gradient-to-b from-[#2b0105] via-[#1a0003] to-[#100002] border-2 border-amber-400/90 shadow-[0_0_50px_rgba(255,180,0,0.4)] text-amber-50 p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Badge */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-stone-950 font-bold text-xs shadow-md border border-amber-200 uppercase tracking-widest flex items-center gap-1.5">
          <i className="fa-solid fa-gift text-stone-950"></i>
          <span>Thiệp Chúc Trung Thu Đoàn Viên</span>
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
            Tạo & Chia Sẻ Thiệp Trung Thu
          </h2>
          <p className="text-xs text-amber-200/80 mt-0.5">
            Gửi gắm lời chúc trăng rằm ý nghĩa đến người thân và bạn bè qua mạng xã hội
          </p>
        </div>

        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3.5">
          {/* Live Card Preview Box */}
          <div
            ref={cardRef}
            className={`relative rounded-2xl bg-gradient-to-br ${theme.bg} border-2 ${theme.border} p-4 sm:p-6 shadow-[0_0_25px_rgba(0,0,0,0.8)] overflow-hidden`}
          >
            {/* Glowing moon in card background */}
            <div className="absolute -top-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-white via-yellow-100 to-amber-300 opacity-80 blur-[1px] shadow-[0_0_30px_rgba(255,215,0,0.8)] pointer-events-none" />

            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 text-yellow-400/50 text-xs">❖</div>
            <div className="absolute top-2 right-2 text-yellow-400/50 text-xs">❖</div>
            <div className="absolute bottom-2 left-2 text-yellow-400/50 text-xs">❖</div>
            <div className="absolute bottom-2 right-2 text-yellow-400/50 text-xs">❖</div>

            {/* Card Content */}
            <div className="relative z-10">
              <div className="text-center mb-2">
                <span className="font-title text-gold-gradient text-xs sm:text-sm font-bold tracking-widest block uppercase">
                  TẾT TRUNG THU ĐOÀN VIÊN
                </span>
                <span className="text-[10px] text-amber-200/70 font-festive italic">
                  Đêm Hội Trăng Rằm - Rằm Tháng Tám
                </span>
              </div>

              <div className="text-xs font-semibold text-amber-300 mb-1.5 flex items-center gap-1.5">
                <i className="fa-solid fa-heart text-red-400 text-[10px]"></i>
                <span>Gửi tặng: {recipient || 'Người thương yêu'}</span>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-amber-400/30 backdrop-blur-xs my-2">
                <p className="font-festive text-xs sm:text-sm text-amber-100 italic leading-relaxed">
                  &ldquo;{message}&rdquo;
                </p>
              </div>

              <div className="text-right text-xs text-amber-300 font-medium pt-1">
                <span>Thân gửi từ: </span>
                <span className="font-bold text-amber-100">{sender || 'Tôi'}</span>
              </div>
            </div>
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                Gửi tới (Người nhận)
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Bố Mẹ, Bạn Thân, Mai Anh..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-xl bg-red-950/60 border border-amber-500/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-yellow-300"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                Người gửi (Tên bạn)
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Hoàng, Linh..."
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-xl bg-red-950/60 border border-amber-500/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-yellow-300"
              />
            </div>
          </div>

          {/* Message Area */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-amber-300">
                Lời chúc Trung Thu
              </label>
              <span className="text-[10px] text-amber-400/70">{message.length}/250 ký tự</span>
            </div>
            <textarea
              rows={2}
              maxLength={250}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm rounded-xl bg-red-950/70 border border-amber-500/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-yellow-300 resize-none font-festive"
            />
          </div>

          {/* Preset message inspiration */}
          <div>
            <span className="text-[10px] text-amber-300/70 mb-1 block">
              Chọn mẫu lời chúc hay:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_MESSAGES.map((msg, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setMessage(msg)}
                  className={`text-[10px] px-2.5 py-1 rounded-full border text-left truncate max-w-full transition-colors ${
                    message === msg
                      ? 'bg-amber-500 text-stone-950 border-yellow-200 font-bold'
                      : 'bg-red-950/40 border-amber-500/30 text-amber-200/80 hover:border-amber-400'
                  }`}
                >
                  Mẫu {idx + 1}: &ldquo;{msg.slice(0, 32)}...&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Theme selection */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-amber-300 whitespace-nowrap">
              Màu thiệp:
            </span>
            <div className="flex items-center gap-2">
              {CARD_THEMES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setTheme(t)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-all ${
                    theme.id === t.id
                      ? 'border-yellow-300 bg-amber-400 text-stone-950 font-bold'
                      : 'border-amber-500/40 text-amber-200 hover:border-amber-400'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons: Download & Social Sharing */}
        <div className="mt-3 pt-3 border-t border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Download Image Button */}
          <button
            onClick={handleDownloadCard}
            disabled={isExporting}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-stone-950 font-bold text-xs sm:text-sm border border-yellow-200 shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-download text-red-900"></i>
            <span>{isExporting ? 'Đang Xuất Thiệp...' : 'Tải Thiệp Về Máy (Ảnh)'}</span>
          </button>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center">
            <span className="text-xs text-amber-200/80 mr-1 hidden sm:inline">Chia sẻ:</span>

            {/* Facebook */}
            <button
              onClick={handleShareFacebook}
              className="flex-1 sm:flex-none px-2.5 py-2 rounded-xl bg-[#1877F2] text-white hover:bg-[#166fe5] text-xs font-semibold flex items-center justify-center gap-1 shadow-md transition-transform active:scale-95"
              title="Chia sẻ lên Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
              <span className="sm:hidden">Facebook</span>
            </button>

            {/* Zalo */}
            <button
              onClick={handleShareZalo}
              className="flex-1 sm:flex-none px-2.5 py-2 rounded-xl bg-[#0068FF] text-white hover:bg-[#005cd6] text-xs font-semibold flex items-center justify-center gap-1 shadow-md transition-transform active:scale-95"
              title="Chia sẻ qua Zalo"
            >
              <i className="fa-solid fa-comment-dots"></i>
              <span className="sm:hidden">Zalo</span>
            </button>

            {/* Twitter / X */}
            <button
              onClick={handleShareTwitter}
              className="flex-1 sm:flex-none px-2.5 py-2 rounded-xl bg-black text-white hover:bg-neutral-900 border border-neutral-700 text-xs font-semibold flex items-center justify-center gap-1 shadow-md transition-transform active:scale-95"
              title="Chia sẻ lên X (Twitter)"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </button>

            {/* Telegram */}
            <button
              onClick={handleShareTelegram}
              className="flex-1 sm:flex-none px-2.5 py-2 rounded-xl bg-[#229ED9] text-white hover:bg-[#1f8fc4] text-xs font-semibold flex items-center justify-center gap-1 shadow-md transition-transform active:scale-95"
              title="Gửi qua Telegram"
            >
              <i className="fa-brands fa-telegram"></i>
            </button>

            {/* Copy link */}
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-red-950/80 border border-amber-400 text-amber-200 hover:bg-red-900 text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
              title="Sao chép lời chúc & liên kết"
            >
              <i className="fa-solid fa-link text-amber-400"></i>
              <span>{copiedLink ? 'Đã chép!' : 'Chép link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
