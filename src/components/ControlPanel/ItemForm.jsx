import React, { useState } from 'react';
import { PlusCircle, Flag } from 'lucide-react';

export const ItemForm = ({ categories, defaultStartDate, defaultEndDate, onAddItem }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(defaultStartDate || '');
  const [endDate, setEndDate] = useState(defaultEndDate || '');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [milestone, setMilestone] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddItem({
      id: 'item_' + Date.now(),
      title: title.trim(),
      startDate: startDate || defaultStartDate,
      endDate: endDate || startDate || defaultEndDate,
      categoryId: categoryId || categories[0]?.id,
      milestone,
      completed: false,
      notes: notes.trim()
    });

    setTitle('');
    setNotes('');
    setMilestone(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-lg">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <h3 className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
          <PlusCircle className="w-3.5 h-3.5 text-orange-400" />
          Yeni Görev / Hedef Ekle
        </h3>
        <span className="text-[10px] text-zinc-500 font-mono">Hızlı Form</span>
      </div>

      {/* Etkinlik Başlığı */}
      <div>
        <label className="text-xs font-medium text-zinc-400 block mb-1">Görev veya Etkinlik Adı</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Örn: Yeni Ürün Lansmanı"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Kategori Seçimi */}
      <div>
        <label className="text-xs font-medium text-zinc-400 block mb-1">Kategori</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tarihler */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">Başlangıç</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">Bitiş</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Milestone Checkbox & Notlar */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
          <input
            type="checkbox"
            checked={milestone}
            onChange={(e) => setMilestone(e.target.checked)}
            className="rounded border-zinc-700 text-orange-500 focus:ring-orange-500 bg-zinc-950 w-4 h-4"
          />
          <span className="flex items-center gap-1 font-medium text-orange-400">
            <Flag className="w-3.5 h-3.5" /> Kilit Dönüm Noktası (Milestone)
          </span>
        </label>
      </div>

      <div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notlar veya açıklama (İsteğe bağlı)..."
          rows="2"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-orange-500 resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-orange-500/10 transition-all flex items-center justify-center gap-1.5"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Haritaya Ekle (Enter)</span>
      </button>
    </form>
  );
};
