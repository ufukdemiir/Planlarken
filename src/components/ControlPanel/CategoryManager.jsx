import React, { useState } from 'react';
import { Tag, Plus, Trash2 } from 'lucide-react';

const PRESET_COLORS = [
  '#F97316', // Orange
  '#10B981', // Emerald
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#14B8A6'  // Teal
];

export const CategoryManager = ({ categories, onAddCategory, onDeleteCategory }) => {
  const [newCatName, setNewCatName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#F97316');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    onAddCategory({
      id: 'cat_' + Date.now(),
      name: newCatName.trim(),
      color: selectedColor
    });

    setNewCatName('');
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-lg">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <h3 className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-orange-400" />
          Kategoriler & Kulvarlar
        </h3>
        <span className="text-[10px] text-zinc-500 font-mono">{categories.length} Adet</span>
      </div>

      {/* Eklenmiş Kategoriler Listesi */}
      <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-xs"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: cat.color }}
            />
            <span className="text-zinc-300 font-medium">{cat.name}</span>
            {categories.length > 1 && (
              <button
                onClick={() => onDeleteCategory(cat.id)}
                className="text-zinc-500 hover:text-red-400 ml-1 transition-colors"
                title="Kategoriyi Sil"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Yeni Kategori Ekleme Formu */}
      <form onSubmit={handleSubmit} className="space-y-2 pt-1 border-t border-zinc-800/60">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Yeni kategori adı..."
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ekle</span>
          </button>
        </div>

        {/* Renk Seçici */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-[10px] text-zinc-500 font-medium">Renk:</span>
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedColor(c)}
              className={`w-4 h-4 rounded-full transition-transform ${
                selectedColor === c ? 'scale-125 ring-2 ring-white/60' : 'hover:scale-110 opacity-80'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </form>
    </div>
  );
};
