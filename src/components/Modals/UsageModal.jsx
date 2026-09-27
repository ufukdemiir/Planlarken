import React from 'react';
import { Modal } from './Modal';
import { BookOpen, Calendar, Download, Keyboard } from 'lucide-react';

const Step = ({ icon: Icon, title, children }) => (
  <div style={{
    display: 'flex', gap: '16px', padding: '16px',
    background: 'var(--bg-muted)', borderRadius: '12px',
    marginBottom: '10px'
  }}>
    <div style={{
      width: '36px', height: '36px', borderRadius: '10px',
      background: 'var(--orange)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>
      <Icon size={18} color="white" />
    </div>
    <div>
      <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>
        {title}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  </div>
);

export const UsageModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Nasil Kullanilir?">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Step icon={Calendar} title="1. Tarih Araligini Belirleyin">
        Sol panelden baslangic ve bitis tarihlerini girin. Uygulama otomatik olarak
        en uygun görselleştirme modunu secer: 1-7 gün için <strong>Akis Modu</strong>,
        1 hafta - 6 ay için <strong>Kulvar Modu</strong>, 6 ay - 10 yil için <strong>Yol Haritasi</strong>.
      </Step>

      <Step icon={BookOpen} title="2. Gorev ve Hedeflerinizi Ekleyin">
        "Yeni Oge Ekle" formuyla her hedefi tarih araligina dagitarak ekleyin.
        Onemli tarihler için "Kilometre Tasi (Milestone)" secenegini isaretleyin.
      </Step>

      <Step icon={Download} title="3. Indirin veya Yazdierin">
        Sag paneldeki önizlemeyi <strong>PDF</strong> (tarayici ile yazdir),
        <strong> JSON</strong> (yedekleme/geri yukleme), <strong>CSV</strong> (Excel)
        veya <strong>ICS</strong> (Google/Apple Takvim) formatinda indirin.
      </Step>

      <div style={{
        marginTop: '12px', padding: '14px',
        background: 'var(--orange-light)',
        border: '1px solid var(--border-accent)',
        borderRadius: '12px'
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          fontWeight: '600', fontSize: '13px', color: 'var(--orange)',
          marginBottom: '8px'
        }}>
          <Keyboard size={15} /> Klavye Kisayollari
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '6px', fontSize: '12px', color: 'var(--text-secondary)'
        }}>
          {[
            ['ESC', 'Modal kapat'],
            ['Ctrl + P', 'PDF yazdir'],
            ['Ctrl + S', 'JSON indir'],
            ['Enter', 'Yeni oge ekle']
          ].map(([key, desc]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <kbd style={{
                padding: '2px 8px', background: 'var(--bg-card)',
                border: '1px solid var(--border)', borderRadius: '6px',
                fontFamily: 'monospace', fontSize: '11px', fontWeight: '600'
              }}>{key}</kbd>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Modal>
);
