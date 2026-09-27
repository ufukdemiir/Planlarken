import React from 'react';
import { calculateDaysDifference, getScaleMode, getScaleLabel } from '../../utils/dateUtils';

const COLORS = ['#F97316','#10B981','#6366F1','#EC4899','#F59E0B','#3B82F6','#8B5CF6','#14B8A6'];

const modeInfo = {
  micro:  { emoji: '⏱', color: '#10B981', bg: '#ECFDF5', border: '#6EE7B7' },
  medium: { emoji: '📊', color: '#F97316', bg: '#FFF7ED', border: '#FED7AA' },
  macro:  { emoji: '🗺', color: '#6366F1', bg: '#EEF2FF', border: '#C7D2FE' }
};

export const ControlPanel = ({
  projectMeta,
  categories,
  items,
  onChangeMeta,
  onAddCategory,
  onDeleteCategory,
  onAddItem,
  onToggleComplete,
  onDeleteItem,
  onExportPdf,
  onExportJson,
  onExportCsv,
  onExportIcs,
  onImportJson,
  onResetDefault
}) => {
  const [newCatName, setNewCatName] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('#F97316');
  const [itemTitle, setItemTitle] = React.useState('');
  const [itemStart, setItemStart] = React.useState(projectMeta.startDate || '');
  const [itemEnd, setItemEnd] = React.useState(projectMeta.endDate || '');
  const [itemCat, setItemCat] = React.useState(categories[0]?.id || '');
  const [itemMilestone, setItemMilestone] = React.useState(false);
  const [itemNotes, setItemNotes] = React.useState('');
  const fileRef = React.useRef(null);

  const diffDays = calculateDaysDifference(projectMeta.startDate, projectMeta.endDate);
  const mode = getScaleMode(diffDays);
  const info = modeInfo[mode];

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemTitle.trim()) return;
    onAddItem({
      id: 'item_' + Date.now(),
      title: itemTitle.trim(),
      startDate: itemStart || projectMeta.startDate,
      endDate: itemEnd || itemStart || projectMeta.endDate,
      categoryId: itemCat || categories[0]?.id,
      milestone: itemMilestone,
      completed: false,
      notes: itemNotes.trim()
    });
    setItemTitle('');
    setItemNotes('');
    setItemMilestone(false);
  };

  const handleAddCat = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    onAddCategory({ id: 'cat_' + Date.now(), name: newCatName.trim(), color: selectedColor });
    setNewCatName('');
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed?.projectMeta && parsed?.categories && parsed?.items) {
          onImportJson(parsed);
        } else {
          alert('Gecersiz JSON formati.');
        }
      } catch {
        alert('Dosya okunamadi.');
      }
    };
  };

  // ─── Bölüm stili ───
  const section = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    padding: '16px',
    display: 'flex', flexDirection: 'column', gap: '12px'
  };
  const label = { fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '5px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* ─── 1. Proje Bilgileri ─── */}
      <div style={section}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Proje Bilgileri</span>
          <span style={{
            fontSize: '11px', fontWeight: '600', padding: '3px 10px',
            borderRadius: '99px', background: info.bg, color: info.color,
            border: `1px solid ${info.border}`
          }}>
            {info.emoji} {getScaleLabel(mode)}
          </span>
        </div>

        <div>
          <label style={label}>Plan Basligi</label>
          <input
            type="text"
            value={projectMeta.title}
            onChange={e => onChangeMeta({ ...projectMeta, title: e.target.value })}
            placeholder="Ornek: 2026 Yillik Hedefler"
          />
        </div>

        <div>
          <label style={label}>Alt Baslik</label>
          <input
            type="text"
            value={projectMeta.subtitle || ''}
            onChange={e => onChangeMeta({ ...projectMeta, subtitle: e.target.value })}
            placeholder="Kisaca bir aciklama..."
            style={{ fontStyle: 'italic' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label style={label}>Baslangic</label>
            <input type="date" value={projectMeta.startDate || ''} onChange={e => onChangeMeta({ ...projectMeta, startDate: e.target.value })} />
          </div>
          <div>
            <label style={label}>Bitis</label>
            <input type="date" value={projectMeta.endDate || ''} onChange={e => onChangeMeta({ ...projectMeta, endDate: e.target.value })} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label style={label}>Kagit</label>
            <select value={projectMeta.paperSize || 'A4'} onChange={e => onChangeMeta({ ...projectMeta, paperSize: e.target.value })}>
              <option value="A4">A4</option>
              <option value="A3">A3</option>
            </select>
          </div>
          <div>
            <label style={label}>Yonelim</label>
            <select value={projectMeta.orientation || 'landscape'} onChange={e => onChangeMeta({ ...projectMeta, orientation: e.target.value })}>
              <option value="landscape">Yatay</option>
              <option value="portrait">Dikey</option>
            </select>
          </div>
        </div>
      </div>

      {/* ─── 2. Kategoriler ─── */}
      <div style={section}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Kategoriler</span>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map(cat => (
            <span key={cat.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '4px 10px', borderRadius: '99px',
              background: cat.color + '18', border: `1px solid ${cat.color}50`,
              fontSize: '12px', fontWeight: '500', color: 'var(--text-primary)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
              {cat.name}
              {categories.length > 1 && (
                <button
                  onClick={() => onDeleteCategory(cat.id)}
                  title="Sil"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1, padding: '0 0 0 2px' }}
                >×</button>
              )}
            </span>
          ))}
        </div>

        <form onSubmit={handleAddCat} style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Yeni Kategori</label>
            <input
              type="text"
              value={newCatName}
              onChange={e => setNewCatName(e.target.value)}
              placeholder="Kategori adi..."
            />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
            + Ekle
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Renk:</span>
          {COLORS.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedColor(c)}
              title={c}
              style={{
                width: '18px', height: '18px', borderRadius: '50%', background: c,
                border: selectedColor === c ? '2.5px solid var(--text-primary)' : '2px solid transparent',
                cursor: 'pointer', transition: 'transform 0.1s', transform: selectedColor === c ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── 3. Yeni Görev ─── */}
      <div style={section}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Yeni Gorev / Hedef</span>

        <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <label style={label}>Baslik *</label>
            <input
              type="text"
              value={itemTitle}
              onChange={e => setItemTitle(e.target.value)}
              placeholder="Ornek: Proje teslimi, Hedef, Etkinlik..."
              autoComplete="off"
            />
          </div>

          <div>
            <label style={label}>Kategori</label>
            <select value={itemCat} onChange={e => setItemCat(e.target.value)}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={label}>Baslangic</label>
              <input type="date" value={itemStart} onChange={e => setItemStart(e.target.value)} />
            </div>
            <div>
              <label style={label}>Bitis</label>
              <input type="date" value={itemEnd} onChange={e => setItemEnd(e.target.value)} />
            </div>
          </div>

          <div>
            <label style={label}>Notlar</label>
            <textarea
              value={itemNotes}
              onChange={e => setItemNotes(e.target.value)}
              placeholder="Isteğe bagli aciklama..."
              rows={2}
              style={{ resize: 'none' }}
            />
          </div>

          <label style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '13px', cursor: 'pointer', color: 'var(--text-secondary)'
          }}>
            <input
              type="checkbox"
              checked={itemMilestone}
              onChange={e => setItemMilestone(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--orange)', cursor: 'pointer' }}
            />
            <span>🚩 Kilometre Tasi (Milestone)</span>
          </label>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            + Haritaya Ekle
          </button>
        </form>
      </div>

      {/* ─── 4. Görev Listesi ─── */}
      {items.length > 0 && (
        <div style={section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
              Oge Listesi
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{items.length} oge</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
            {items.map(item => {
              const cat = categories.find(c => c.id === item.categoryId) || categories[0];
              return (
                <div key={item.id} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 10px',
                  background: 'var(--bg-muted)',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  opacity: item.completed ? 0.55 : 1
                }}>
                  <button
                    onClick={() => onToggleComplete(item.id)}
                    style={{
                      width: '18px', height: '18px', borderRadius: '5px',
                      border: `2px solid ${item.completed ? 'var(--orange)' : 'var(--border)'}`,
                      background: item.completed ? 'var(--orange)' : 'transparent',
                      cursor: 'pointer', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: '11px'
                    }}
                  >
                    {item.completed ? '✓' : ''}
                  </button>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cat?.color, flexShrink: 0 }} />
                  <span style={{
                    flex: 1, fontSize: '12px', fontWeight: '500',
                    color: 'var(--text-primary)',
                    textDecoration: item.completed ? 'line-through' : 'none',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>
                    {item.milestone ? '🚩 ' : ''}{item.title}
                  </span>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    title="Sil"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1,
                      flexShrink: 0, padding: '0 2px'
                    }}
                  >×</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── 5. Dışa / İçe Aktar ─── */}
      <div style={section}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
          Disa Aktar & Kaydet
        </span>

        <button className="btn-primary" onClick={onExportPdf} style={{ width: '100%', justifyContent: 'center' }}>
          🖨️ PDF Olarak Yazdir / Kaydet
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {[
            { label: '💾 JSON', action: onExportJson, title: 'Yedekle ve geri yukle' },
            { label: '📊 CSV', action: onExportCsv, title: 'Excel / Sheets icin' },
            { label: '📅 ICS', action: onExportIcs, title: 'Apple / Google Takvim' }
          ].map(({ label: l, action, title: t }) => (
            <button key={l} className="btn-ghost" onClick={action} title={t}
              style={{ justifyContent: 'center', fontSize: '12px' }}>
              {l}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
          <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleFileImport} />
          <button className="btn-ghost" onClick={() => fileRef.current?.click()} style={{ flex: 1, justifyContent: 'center', fontSize: '12px' }}>
            📂 JSON Yukle
          </button>
          <button
            onClick={onResetDefault}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '12px', color: 'var(--text-muted)', padding: '8px 10px',
              borderRadius: '8px', fontFamily: 'var(--font-sans)'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
            title="Varsayilan ornege don"
          >
            Sifirla
          </button>
        </div>
      </div>
    </div>
  );
};
