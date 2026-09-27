import React, { useState } from 'react';
import { Modal } from './Modal';
import { Bookmark, Check, Star } from 'lucide-react';

export const BookmarkModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isMac = typeof navigator !== 'undefined' &&
    /Mac|iPhone|iPad|iPod/.test(navigator.platform || '');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yer Imi Ekle">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingTop: '8px' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '20px',
          background: 'var(--orange-light)',
          border: '1px solid var(--border-accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Star size={28} color="var(--orange)" fill="rgba(249,115,22,0.15)" />
        </div>

        <p style={{
          fontSize: '14px', color: 'var(--text-secondary)',
          textAlign: 'center', lineHeight: '1.7', maxWidth: '340px'
        }}>
          Planlarken'e istediginiz zaman hizlica erisebilmek icin tarayicinizin
          yer imleri listesine ekleyin.
        </p>

        <div style={{
          width: '100%', padding: '16px',
          background: 'var(--bg-muted)', borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>
              Klavye Kisayolu
            </div>
            <kbd style={{
              fontSize: '16px', fontWeight: '700', fontFamily: 'monospace',
              color: 'var(--orange)', letterSpacing: '0.05em'
            }}>
              {isMac ? 'Cmd + D' : 'Ctrl + D'}
            </kbd>
          </div>
          <button
            className="btn-primary"
            onClick={handleCopy}
            style={{ flexShrink: 0 }}
          >
            {copied ? <Check size={15} /> : <Bookmark size={15} />}
            {copied ? 'Kopyalandi!' : 'Baglantıyı Kopyala'}
          </button>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
          Mobil cihazlarda tarayici menusunden "Ana Ekrana Ekle" secenegini kullanabilirsiniz.
        </p>
      </div>
    </Modal>
  );
};
