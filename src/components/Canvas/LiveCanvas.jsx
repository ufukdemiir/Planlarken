import React from 'react';
import { calculateDaysDifference, getScaleMode, formatDate } from '../../utils/dateUtils';
import { MicroFlowView } from './MicroFlowView';
import { SwimlaneView } from './SwimlaneView';
import { RoadmapView } from './RoadmapView';

export const LiveCanvas = ({ projectMeta, categories, items }) => {
  const diffDays = calculateDaysDifference(projectMeta.startDate, projectMeta.endDate);
  const scaleMode = getScaleMode(diffDays);

  const isLandscape = projectMeta.orientation === 'landscape';
  const paperSize = projectMeta.paperSize || 'A4';

  return (
    <div className="w-full flex justify-center overflow-x-auto pb-8">
      {/* Printable Paper Container */}
      <div
        id="printable-canvas"
        className={`paper-page bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl p-6 lg:p-10 shadow-2xl transition-all print-area w-full ${
          isLandscape ? 'max-w-5xl min-h-[600px]' : 'max-w-3xl min-h-[800px]'
        }`}
      >
        {/* Paper Header / Branding */}
        <div className="border-b-2 border-orange-500/60 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-orange-400 font-mono font-semibold mb-1">
              Zaman Haritası & Planlama Raporu
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif-title font-bold text-zinc-100 tracking-tight">
              {projectMeta.title || 'Yeni Proje Planı'}
            </h1>
            {projectMeta.subtitle && (
              <p className="text-sm text-zinc-400 italic font-serif-accent mt-1">
                "{projectMeta.subtitle}"
              </p>
            )}
          </div>

          <div className="text-left md:text-right bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 shrink-0">
            <div className="text-xs text-zinc-400 font-mono">
              <span className="text-zinc-500">Tarih Aralığı:</span> {formatDate(projectMeta.startDate, 'medium')} — {formatDate(projectMeta.endDate, 'medium')}
            </div>
            <div className="text-xs text-zinc-400 font-mono mt-1">
              <span className="text-zinc-500">Toplam Süre:</span> <strong className="text-orange-400">{diffDays} Gün</strong> | Format: {paperSize} {isLandscape ? 'Yatay' : 'Dikey'}
            </div>
          </div>
        </div>

        {/* Category Legend (Renk Efsanesi) */}
        <div className="flex items-center gap-3 flex-wrap mb-6 bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/40">
          <span className="text-xs font-semibold text-zinc-400 font-mono">Kategoriler:</span>
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Core Scaled View */}
        {scaleMode === 'micro' && (
          <MicroFlowView projectMeta={projectMeta} categories={categories} items={items} />
        )}
        {scaleMode === 'medium' && (
          <SwimlaneView projectMeta={projectMeta} categories={categories} items={items} />
        )}
        {scaleMode === 'macro' && (
          <RoadmapView projectMeta={projectMeta} categories={categories} items={items} />
        )}

        {/* Paper Footer / Watermark */}
        <div className="border-t border-zinc-800/80 pt-4 mt-10 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div>
            Planlarken — Geleceğinizi planlarken karmaşaya yer yok.
          </div>
          <div>
            https://ufukdemiir.github.io/Planlarken/
          </div>
        </div>
      </div>
    </div>
  );
};
