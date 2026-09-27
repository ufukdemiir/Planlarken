import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProjectMetaForm } from './components/ControlPanel/ProjectMetaForm';
import { CategoryManager } from './components/ControlPanel/CategoryManager';
import { ItemForm } from './components/ControlPanel/ItemForm';
import { ItemList } from './components/ControlPanel/ItemList';
import { ExportImport } from './components/ControlPanel/ExportImport';
import { LiveCanvas } from './components/Canvas/LiveCanvas';

import { UsageModal } from './components/Modals/UsageModal';
import { DisclaimerModal } from './components/Modals/DisclaimerModal';
import { LinksModal } from './components/Modals/LinksModal';
import { BookmarkModal } from './components/Modals/BookmarkModal';

import { loadProjectData, saveProjectData, clearProjectData } from './utils/storage';
import { defaultProjectData } from './utils/defaultData';
import { exportToPdf } from './utils/exportPdf';

export function App() {
  const [projectData, setProjectData] = useState(() => loadProjectData());
  const [theme, setTheme] = useState('dark');
  const [activeMobileTab, setActiveMobileTab] = useState('control'); // 'control' veya 'preview'

  // Modal Durumları
  const [modals, setModals] = useState({
    usage: false,
    disclaimer: false,
    links: false,
    bookmark: false
  });

  // LocalStorage Otomatik Senkronizasyonu
  useEffect(() => {
    saveProjectData(projectData);
  }, [projectData]);

  // Tema Değişimi Effect
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Global Klavye Kısayolları (Ctrl+P, Ctrl+S)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Ctrl+P / Cmd+P -> PDF İndir
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        exportToPdf('printable-canvas', `${projectData.projectMeta.title || 'Planlarken'}.pdf`);
      }
      // Ctrl+S / Cmd+S -> JSON İndir
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `${projectData.projectMeta.title || 'Planlarken'}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [projectData]);

  // Handlerlar
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const openModal = (name) => setModals(prev => ({ ...prev, [name]: true }));
  const closeModal = (name) => setModals(prev => ({ ...prev, [name]: false }));

  const handleMetaChange = (newMeta) => {
    setProjectData(prev => ({ ...prev, projectMeta: newMeta }));
  };

  const handleAddCategory = (newCat) => {
    setProjectData(prev => ({ ...prev, categories: [...prev.categories, newCat] }));
  };

  const handleDeleteCategory = (catId) => {
    if (projectData.categories.length <= 1) {
      alert("En az bir kategori bulunmalıdır.");
      return;
    }
    setProjectData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== catId),
      items: prev.items.filter(i => i.categoryId !== catId)
    }));
  };

  const handleAddItem = (newItem) => {
    setProjectData(prev => ({ ...prev, items: [newItem, ...prev.items] }));
  };

  const handleToggleComplete = (itemId) => {
    setProjectData(prev => ({
      ...prev,
      items: prev.items.map(i => i.id === itemId ? { ...i, completed: !i.completed } : i)
    }));
  };

  const handleDeleteItem = (itemId) => {
    setProjectData(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== itemId)
    }));
  };

  const handleImportJson = (newData) => {
    setProjectData(newData);
  };

  const handleResetDefault = () => {
    if (window.confirm("Tüm değişiklikler sıfırlanıp varsayılan veriler yüklenecek. Emin misiniz?")) {
      clearProjectData();
      setProjectData(defaultProjectData);
    }
  };

  return (
    <div className={`min-h-screen font-sans ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-100 text-zinc-900'} transition-colors`}>
      
      {/* Sticky Navigation Bar (İkonalı) */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenUsage={() => openModal('usage')}
        onOpenDisclaimer={() => openModal('disclaimer')}
        onOpenLinks={() => openModal('links')}
        onOpenBookmark={() => openModal('bookmark')}
        activeMobileTab={activeMobileTab}
        setActiveMobileTab={setActiveMobileTab}
      />

      {/* Main Responsive Workspace */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Sol Panel (Kontrol Merkezi - ~350px width desktop, mobil tab toggle) */}
          <div className={`lg:col-span-4 xl:col-span-4 space-y-5 ${activeMobileTab === 'control' ? 'block' : 'hidden lg:block'}`}>
            <ProjectMetaForm
              projectMeta={projectData.projectMeta}
              onChangeMeta={handleMetaChange}
            />
            <CategoryManager
              categories={projectData.categories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
            />
            <ItemForm
              categories={projectData.categories}
              defaultStartDate={projectData.projectMeta.startDate}
              defaultEndDate={projectData.projectMeta.endDate}
              onAddItem={handleAddItem}
            />
            <ItemList
              items={projectData.items}
              categories={projectData.categories}
              onToggleComplete={handleToggleComplete}
              onDeleteItem={handleDeleteItem}
            />
            <ExportImport
              projectData={projectData}
              onImportJson={handleImportJson}
              onResetDefault={handleResetDefault}
            />
          </div>

          {/* Sağ Panel (Canlı Önizleme - Canvas - Desktop 8 col, mobil tab toggle) */}
          <div className={`lg:col-span-8 xl:col-span-8 ${activeMobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <LiveCanvas
              projectMeta={projectData.projectMeta}
              categories={projectData.categories}
              items={projectData.items}
            />
          </div>

        </div>
      </main>

      {/* Modallar */}
      <UsageModal
        isOpen={modals.usage}
        onClose={() => closeModal('usage')}
      />
      <DisclaimerModal
        isOpen={modals.disclaimer}
        onClose={() => closeModal('disclaimer')}
      />
      <LinksModal
        isOpen={modals.links}
        onClose={() => closeModal('links')}
      />
      <BookmarkModal
        isOpen={modals.bookmark}
        onClose={() => closeModal('bookmark')}
      />

    </div>
  );
}

export default App;
