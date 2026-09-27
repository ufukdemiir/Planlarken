import React from 'react';
import { HelpCircle, ShieldAlert, Link2, Bookmark, Sun, Moon, Edit3, Eye } from 'lucide-react';

export const Header = ({
  theme,
  onToggleTheme,
  onOpenUsage,
  onOpenDisclaimer,
  onOpenLinks,
  onOpenBookmark,
  activeMobileTab,
  setActiveMobileTab
}) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 p-0.5 shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-orange-400 font-serif-title font-bold text-lg">
              P
            </div>
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-serif-title font-bold text-zinc-100 tracking-tight flex items-center gap-2">
              Planlarken
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-sans font-normal hidden sm:inline-block">
                Client-Side Engine
              </span>
            </h1>
            <p className="text-xs text-zinc-400 hidden sm:block italic font-serif-accent">
              "Geleceğinizi planlarken karmaşaya yer yok."
            </p>
          </div>
        </div>

        {/* Mobil Tab Switcher */}
        <div className="flex lg:hidden bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveMobileTab('control')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMobileTab === 'control'
                ? 'bg-orange-500 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Kontrol</span>
          </button>
          <button
            onClick={() => setActiveMobileTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMobileTab === 'preview'
                ? 'bg-orange-500 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Önizleme</span>
          </button>
        </div>

        {/* İkon Butonlar Grubu (YAZI İÇERMEYEN, SADECE TELİFSİZ İKONLAR) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 1. Nasıl Kullanılır? */}
          <button
            onClick={onOpenUsage}
            className="p-2.5 sm:p-3 text-zinc-400 hover:text-orange-400 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 hover:border-orange-500/30 rounded-xl transition-all group"
            aria-label="Nasıl Kullanılır?"
            title="Nasıl Kullanılır? (Kullanım Kılavuzu)"
          >
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
          </button>

          {/* 2. Sorumluluk Reddi */}
          <button
            onClick={onOpenDisclaimer}
            className="p-2.5 sm:p-3 text-zinc-400 hover:text-orange-400 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 hover:border-orange-500/30 rounded-xl transition-all group"
            aria-label="Sorumluluk Reddi"
            title="Sorumluluk Reddi & Gizlilik"
          >
            <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
          </button>

          {/* 3. Bağlantılar */}
          <button
            onClick={onOpenLinks}
            className="p-2.5 sm:p-3 text-zinc-400 hover:text-orange-400 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 hover:border-orange-500/30 rounded-xl transition-all group"
            aria-label="Bağlantılar & Ekosistem"
            title="Bağlantılar & Diğer Uygulamalar"
          >
            <Link2 className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
          </button>

          {/* 4. Yer İmine Ekle */}
          <button
            onClick={onOpenBookmark}
            className="p-2.5 sm:p-3 text-zinc-400 hover:text-orange-400 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 hover:border-orange-500/30 rounded-xl transition-all group"
            aria-label="Yer İmine Ekle"
            title="Yer İmlerine Ekle"
          >
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-zinc-800 mx-1"></div>

          {/* 5. Gece/Gündüz Modu */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 sm:p-3 text-zinc-400 hover:text-amber-400 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 hover:border-amber-500/30 rounded-xl transition-all group"
            aria-label="Tema Değiştir"
            title={theme === 'dark' ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-rotate-12" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
