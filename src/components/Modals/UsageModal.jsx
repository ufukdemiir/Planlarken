import React from 'react';
import { ModalWrapper } from './ModalWrapper';
import { HelpCircle, Calendar, Layers, Download, Keyboard } from 'lucide-react';

export const UsageModal = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Nasıl Kullanılır?">
      <div className="space-y-5">
        <div className="flex items-start gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
          <Calendar className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-zinc-100 text-sm mb-1">1. Tarih Aralığı Belirleyin</h4>
            <p className="text-xs text-zinc-400">
              Sol paneldeki tarih seçiciden planınızın Başlangıç ve Bitiş tarihlerini girin. Uygulama otomatik olarak:
            </p>
            <ul className="list-disc list-inside text-xs text-zinc-400 mt-2 space-y-1">
              <li><span className="text-orange-400 font-medium">1 - 7 Gün:</span> Dikey Akış (Daily Timeline) Moduna</li>
              <li><span className="text-orange-400 font-medium">1 Hafta - 6 Ay:</span> Grid & Swimlane Kulvar Moduna</li>
              <li><span className="text-orange-400 font-medium">6 Ay - 10+ Yıl:</span> Yol Haritası (Roadmap) Moduna ölçeklenir.</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
          <Layers className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-zinc-100 text-sm mb-1">2. Kategoriler ve Hedefler Ekleyin</h4>
            <p className="text-xs text-zinc-400">
              İş, Kişisel, Sağlık veya Finans gibi özel renkli kategoriler oluşturun. Ardından etkinliklerinizi ve kilit <strong>Dönüm Noktalarınızı (Milestones)</strong> ekleyin.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
          <Download className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-zinc-100 text-sm mb-1">3. Yazdırın veya Dışa Aktarın</h4>
            <p className="text-xs text-zinc-400">
              Sağ paneldeki canlı A4/A3 baskı önizlemesini tek tıkla <strong>PDF</strong>, <strong>JSON</strong>, <strong>CSV</strong> veya Apple/Google Takvim <strong>ICS</strong> formatlarında indirin.
            </p>
          </div>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-orange-400 font-semibold text-xs mb-2">
            <Keyboard className="w-4 h-4" />
            <span>Klavye Kısayolları</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
            <div><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded font-mono text-[11px] border border-zinc-700">ESC</kbd> Modalları Kapatır</div>
            <div><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded font-mono text-[11px] border border-zinc-700">Ctrl + P</kbd> PDF Yazdırır</div>
            <div><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded font-mono text-[11px] border border-zinc-700">Ctrl + S</kbd> JSON İndirir</div>
            <div><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded font-mono text-[11px] border border-zinc-700">Enter</kbd> Yeni Öğe Ekle</div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
