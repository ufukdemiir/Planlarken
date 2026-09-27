import React from 'react';
import { Settings, Calendar, Layout, FileText } from 'lucide-react';
import { calculateDaysDifference, getScaleMode } from '../../utils/dateUtils';

export const ProjectMetaForm = ({ projectMeta, onChangeMeta }) => {
  const handleInputChange = (field, value) => {
    onChangeMeta({ ...projectMeta, [field]: value });
  };

  const diffDays = calculateDaysDifference(projectMeta.startDate, projectMeta.endDate);
  const scaleMode = getScaleMode(diffDays);

  const getScaleBadge = () => {
    if (scaleMode === 'micro') {
      return { text: '1-7 Gün (Akış Modu)', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    }
    if (scaleMode === 'medium') {
      return { text: '1 Hafta - 6 Ay (Grid & Swimlane)', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' };
    }
    return { text: '6 Ay - 10+ Yıl (Yol Haritası)', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' };
  };

  const badge = getScaleBadge();

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-4 shadow-lg">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <h2 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
          <Settings className="w-4 h-4 text-orange-400" />
          Proje & Zaman Ayarları
        </h2>
        <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${badge.color}`}>
          {badge.text}
        </span>
      </div>

      {/* Proje Başlığı & Alt Başlık */}
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-zinc-400 block mb-1">Plan/Proje Başlığı</label>
          <input
            type="text"
            value={projectMeta.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Örn: 2026 Stratejik Yol Haritası"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors font-serif-title"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-400 block mb-1">Alt Başlık / Slogan</label>
          <input
            type="text"
            value={projectMeta.subtitle || ''}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            placeholder="Örn: Geleceğinizi planlarken karmaşaya yer yok."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors font-serif-accent italic"
          />
        </div>
      </div>

      {/* Tarih Aralığı Seçici */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-zinc-400 block mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-orange-400" /> Başlangıç
          </label>
          <input
            type="date"
            value={projectMeta.startDate || ''}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-400 block mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-orange-400" /> Bitiş
          </label>
          <input
            type="date"
            value={projectMeta.endDate || ''}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Kağıt Boyutu ve Yönü Seçimi */}
      <div className="grid grid-cols-2 gap-3 border-t border-zinc-800/80 pt-3">
        <div>
          <label className="text-xs font-medium text-zinc-400 block mb-1 flex items-center gap-1">
            <FileText className="w-3 h-3 text-orange-400" /> Kağıt
          </label>
          <select
            value={projectMeta.paperSize || 'A4'}
            onChange={(e) => handleInputChange('paperSize', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
          >
            <option value="A4">A4 Standart</option>
            <option value="A3">A3 Büyük Poster</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-400 block mb-1 flex items-center gap-1">
            <Layout className="w-3 h-3 text-orange-400" /> Yönelim
          </label>
          <select
            value={projectMeta.orientation || 'landscape'}
            onChange={(e) => handleInputChange('orientation', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
          >
            <option value="landscape">Yatay (Landscape)</option>
            <option value="portrait">Dikey (Portrait)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
