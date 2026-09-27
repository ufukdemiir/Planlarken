import React, { useState, useEffect } from 'react';
import './index.css';

import { Header }       from './components/Header';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { LiveCanvas }   from './components/Canvas/LiveCanvas';

import { UsageModal }      from './components/Modals/UsageModal';
import { DisclaimerModal } from './components/Modals/DisclaimerModal';
import { LinksModal }      from './components/Modals/LinksModal';
import { BookmarkModal }   from './components/Modals/BookmarkModal';

import { loadProjectData, saveProjectData, clearProjectData } from './utils/storage';
import { defaultProjectData } from './utils/defaultData';
import { exportToPdf }   from './utils/exportPdf';
import { exportToCsv }   from './utils/exportCsv';
import { exportToIcs }   from './utils/exportIcs';

export default function App() {
  const [data, setData]     = useState(() => loadProjectData());
  const [theme, setTheme]   = useState('light'); // Varsayilan: Aydinlik Mod
  const [mobileTab, setMobileTab] = useState('control');

  const [modals, setModals] = useState({
    usage: false, disclaimer: false, links: false, bookmark: false
  });

  // LocalStorage Senkronizasyonu
  useEffect(() => { saveProjectData(data); }, [data]);

  // Tema Efekti
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  // Klavye Kisayollari
  useEffect(() => {
    const handler = (e) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key === 'p') { e.preventDefault(); handleExportPdf(); }
      if (ctrl && e.key === 's') { e.preventDefault(); handleExportJson(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [data]);

  const openModal  = (k) => setModals(p => ({ ...p, [k]: true }));
  const closeModal = (k) => setModals(p => ({ ...p, [k]: false }));

  // Veri Isaretcileri
  const update = (partial) => setData(p => ({ ...p, ...partial }));

  const handleExportPdf = () => exportToPdf();

  const handleExportJson = () => {
    const str = JSON.stringify(data, null, 2);
    const blob = new Blob([str], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (data.projectMeta.title || 'Planlarken') + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () =>
    exportToCsv(data.projectMeta, data.categories, data.items,
      (data.projectMeta.title || 'Planlarken') + '.csv');

  const handleExportIcs = () =>
    exportToIcs(data.projectMeta, data.categories, data.items,
      (data.projectMeta.title || 'Planlarken') + '.ics');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)', transition: 'all 0.3s' }}>

      {/* ── Header ── */}
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        onOpenUsage={()      => openModal('usage')}
        onOpenDisclaimer={()  => openModal('disclaimer')}
        onOpenLinks={()       => openModal('links')}
        onOpenBookmark={()    => openModal('bookmark')}
        activeMobileTab={mobileTab}
        setActiveMobileTab={setMobileTab}
      />

      {/* ── Ana Icerik ── */}
      <main style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '24px 24px 48px',
        display: 'grid',
        gridTemplateColumns: '340px 1fr',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Sol: Kontrol Paneli */}
        <div style={{
          position: 'sticky',
          top: '76px',
          maxHeight: 'calc(100vh - 92px)',
          overflowY: 'auto',
          display: mobileTab === 'control' ? 'block' : 'none'
        }}
          className="desktop-show"
        >
          <ControlPanel
            projectMeta={data.projectMeta}
            categories={data.categories}
            items={data.items}
            onChangeMeta={projectMeta => update({ projectMeta })}
            onAddCategory={cat => update({ categories: [...data.categories, cat] })}
            onDeleteCategory={id => {
              if (data.categories.length <= 1) { alert('En az bir kategori olmalidir.'); return; }
              update({
                categories: data.categories.filter(c => c.id !== id),
                items: data.items.filter(i => i.categoryId !== id)
              });
            }}
            onAddItem={item => update({ items: [item, ...data.items] })}
            onToggleComplete={id => update({
              items: data.items.map(i => i.id === id ? { ...i, completed: !i.completed } : i)
            })}
            onDeleteItem={id => update({ items: data.items.filter(i => i.id !== id) })}
            onExportPdf={handleExportPdf}
            onExportJson={handleExportJson}
            onExportCsv={handleExportCsv}
            onExportIcs={handleExportIcs}
            onImportJson={parsed => setData(parsed)}
            onResetDefault={() => {
              if (window.confirm('Tum veriler silinip ornek veri yuklenecek. Devam edilsin mi?')) {
                clearProjectData();
                setData(defaultProjectData);
              }
            }}
          />
        </div>

        {/* Sag: Canli Onizleme */}
        <div style={{ display: mobileTab === 'preview' ? 'block' : 'block' }}
          className="canvas-area"
        >
          <LiveCanvas
            projectMeta={data.projectMeta}
            categories={data.categories}
            items={data.items}
          />
        </div>
      </main>

      {/* ── Modallar ── */}
      <UsageModal      isOpen={modals.usage}      onClose={() => closeModal('usage')} />
      <DisclaimerModal isOpen={modals.disclaimer} onClose={() => closeModal('disclaimer')} />
      <LinksModal      isOpen={modals.links}      onClose={() => closeModal('links')} />
      <BookmarkModal   isOpen={modals.bookmark}   onClose={() => closeModal('bookmark')} />

      {/* ── Responsive CSS ── */}
      <style>{`
        @media (max-width: 768px) {
          main {
            grid-template-columns: 1fr !important;
          }
          .desktop-show {
            position: static !important;
            max-height: none !important;
          }
          .canvas-area {
            display: ${mobileTab === 'preview' ? 'block' : 'none'} !important;
          }
          .desktop-show {
            display: ${mobileTab === 'control' ? 'block' : 'none'} !important;
          }
          .lg-hide {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .lg-hide {
            display: none !important;
          }
          .desktop-show {
            display: block !important;
          }
          .canvas-area {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
