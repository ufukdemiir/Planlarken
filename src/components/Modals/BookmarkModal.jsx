import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import { Bookmark, Check, Star } from 'lucide-react';

export const BookmarkModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isMac = typeof window !== 'undefined' && window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcutKey = isMac ? 'Cmd + D' : 'Ctrl + D';

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Yer İmlerine Ekle">
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-400">
          <Star className="w-10 h-10 fill-orange-400/20" />
        </div>

        <p className="text-zinc-200 text-sm leading-relaxed">
          <strong>Planlarken</strong> uygulamasına istediğiniz zaman tek tıkla ulaşmak için tarayıcınızın yer imlerine ekleyin.
        </p>

        <div className="w-full bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs text-zinc-400 block">Klavye Kısayolu:</span>
            <span className="text-base font-bold text-orange-400 font-mono">{shortcutKey}</span>
          </div>
          <button
            onClick={handleCopyUrl}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Bağlantı Kopyalandı!</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Sayfa Linkini Kopyala</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-zinc-400">
          İpucu: Mobil cihazlarda tarayıcı menüsünden <em>"Ana Ekrana Ekle"</em> seçeneğini tercih edebilirsiniz.
        </p>
      </div>
    </ModalWrapper>
  );
};
