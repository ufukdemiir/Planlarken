import React from 'react';
import { ModalWrapper } from './ModalWrapper';
import { ShieldAlert } from 'lucide-react';

export const DisclaimerModal = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Sorumluluk Reddi">
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-400">
          <ShieldAlert className="w-10 h-10" />
        </div>
        
        <p className="text-zinc-200 text-base leading-relaxed bg-zinc-950/60 p-5 rounded-xl border border-zinc-800/60">
          "Tüm verileriniz sunucu bağlantısı olmaksızın tarayıcınızın yerel deposunda (<code className="text-orange-400 font-mono text-xs px-1.5 py-0.5 bg-zinc-900 rounded">localStorage</code>) tutulur ve sayfa kapatıldığında korunur; ancak önbellek temizliği kaynaklı kalıcı veri kayıpları tamamen kullanıcı sorumluluğundadır."
        </p>

        <div className="w-full text-left bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/40 text-xs text-zinc-400 space-y-2">
          <p className="font-semibold text-zinc-300">Önemli İpuçları:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-400">
            <li>Planlarınızı düzenli aralıklarla sol paneldeki <strong className="text-orange-400">JSON İndir</strong> seçeneği ile bilgisayarınıza yedekleyebilirsiniz.</li>
            <li>Tarayıcı geçmişinizi ve önbelleğinizi temizlerken site verilerinin silinebileceğini unutmayınız.</li>
          </ul>
        </div>
      </div>
    </ModalWrapper>
  );
};
