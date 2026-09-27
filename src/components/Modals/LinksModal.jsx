import React from 'react';
import { ModalWrapper } from './ModalWrapper';
import { ExternalLink, Bookmark, CheckSquare, Sun } from 'lucide-react';

// Telifsiz Temiz Inline SVG İkonlar
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const LinksModal = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Bağlantılar & Diğer Uygulamalar">
      <div className="space-y-6">
        {/* Sosyal Medya & Profil Bağlantıları */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-3">Geliştirici Profili</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="https://github.com/ufukdemiir"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-zinc-950/80 hover:bg-orange-500/10 border border-zinc-800 hover:border-orange-500/40 rounded-xl transition-all group no-underline text-zinc-200"
            >
              <div className="flex items-center gap-2.5">
                <GithubIcon className="text-zinc-400 group-hover:text-orange-400 transition-colors" />
                <span className="font-medium text-sm">GitHub</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 transition-colors" />
            </a>

            <a
              href="https://www.linkedin.com/in/ufukdemiir/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-zinc-950/80 hover:bg-orange-500/10 border border-zinc-800 hover:border-orange-500/40 rounded-xl transition-all group no-underline text-zinc-200"
            >
              <div className="flex items-center gap-2.5">
                <LinkedinIcon className="text-zinc-400 group-hover:text-orange-400 transition-colors" />
                <span className="font-medium text-sm">LinkedIn</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 transition-colors" />
            </a>

            <a
              href="https://tr.pinterest.com/demiirufuk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-zinc-950/80 hover:bg-orange-500/10 border border-zinc-800 hover:border-orange-500/40 rounded-xl transition-all group no-underline text-zinc-200"
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-5 h-5 text-zinc-400 group-hover:text-orange-400 transition-colors" />
                <span className="font-medium text-sm">Pinterest</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 transition-colors" />
            </a>
          </div>
        </div>

        {/* Zarif Ayrım (Separator) */}
        <div className="relative py-1 flex items-center justify-center">
          <div className="w-full border-t border-zinc-800/80"></div>
          <span className="absolute bg-zinc-900 px-3 text-xs font-serif-title italic text-zinc-500">
            Ekosistem
          </span>
        </div>

        {/* Diğer Uygulamalar */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-orange-400 mb-3">Diğer Uygulamalar</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="https://ufukdemiir.github.io/YapilacaklarListesi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-zinc-950/90 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-orange-500/50 rounded-xl transition-all group no-underline text-zinc-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-500/10 text-orange-400 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-zinc-100 group-hover:text-orange-400 transition-colors">Yapılacaklar Listesi</div>
                  <div className="text-xs text-zinc-400">Minimalist görev takip motoru</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-orange-400 transition-colors" />
            </a>

            <a
              href="https://ufukdemiir.github.io/GuneBaslarken/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-zinc-950/90 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-orange-500/50 rounded-xl transition-all group no-underline text-zinc-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-zinc-100 group-hover:text-amber-400 transition-colors">Güne Başlarken</div>
                  <div className="text-xs text-zinc-400">Günlük odaklanma & rutin uygulaması</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-orange-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
