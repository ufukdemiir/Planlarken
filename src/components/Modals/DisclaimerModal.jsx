import React from 'react';
import { Modal } from './Modal';
import { ShieldCheck } from 'lucide-react';

export const DisclaimerModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Sorumluluk Reddi">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{
        display: 'flex', gap: '14px', padding: '16px',
        background: 'var(--orange-light)',
        border: '1px solid var(--border-accent)',
        borderRadius: '12px'
      }}>
        <ShieldCheck size={22} color="var(--orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <p style={{
          fontSize: '14px', lineHeight: '1.7',
          color: 'var(--text-primary)', fontStyle: 'italic'
        }}>
          "Tum verileriniz sunucu baglantisi olmaksizin tarayicinizin yerel deposunda
          (<code style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--orange)' }}>localStorage</code>)
          tutulur ve sayfa kapatildiginda korunur; ancak onbellek temizligi kaynakli
          kalici veri kayiplari tamamen kullanici sorumlulugundadir."
        </p>
      </div>

      <div style={{
        padding: '14px',
        background: 'var(--bg-muted)',
        borderRadius: '12px',
        fontSize: '13px',
        color: 'var(--text-secondary)',
        lineHeight: '1.7'
      }}>
        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
          Veri Guvenliginiz Icin Oneriler:
        </strong>
        <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <li>Planlarinizi duzenli olarak <strong>JSON Indir</strong> butonu ile bilgisayariniza yedekleyin.</li>
          <li>Tarayici geciminizi temizlemeden once verilerinizi disa aktarmayi unutmayin.</li>
          <li>Uygulama hicbir verInizi uzak sunuculara gondermez, her sey cihazinizda kalir.</li>
        </ul>
      </div>
    </div>
  </Modal>
);
