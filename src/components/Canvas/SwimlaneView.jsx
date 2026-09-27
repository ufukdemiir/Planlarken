import React from 'react';
import { getMonthsArray, formatDate } from '../../utils/dateUtils';
import { Layers, Flag } from 'lucide-react';

export const SwimlaneView = ({ projectMeta, categories, items }) => {
  const months = getMonthsArray(projectMeta.startDate, projectMeta.endDate);

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
        <span className="text-xs uppercase font-mono tracking-wider text-orange-400 font-semibold flex items-center gap-1.5">
          <Layers className="w-4 h-4" /> Orta Ölçek — Kategori Kulvarları (Grid & Swimlane)
        </span>
        <span className="text-xs text-zinc-500 font-serif-accent italic">
          {months.length} Aylık Kulvar Matrisi
        </span>
      </div>

      {/* Swimlane Matrix */}
      <div className="overflow-x-auto">
        <div className="min-w-[650px] border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950/60">
          
          {/* Month Columns Header */}
          <div className="grid border-b border-zinc-800 bg-zinc-900/90 text-xs font-semibold text-zinc-300"
               style={{ gridTemplateColumns: `180px repeat(${months.length}, minmax(0, 1fr))` }}>
            <div className="p-3 border-r border-zinc-800 font-serif-title">Kategori Kulvarı</div>
            {months.map((m) => (
              <div key={m.toISOString()} className="p-3 text-center border-r border-zinc-800 last:border-r-0 font-mono text-[11px] text-orange-400">
                {formatDate(m.toISOString(), 'medium').split(' ')[1]} {m.getFullYear()}
              </div>
            ))}
          </div>

          {/* Category Rows */}
          {categories.map((cat) => {
            const categoryItems = items.filter((it) => it.categoryId === cat.id);

            return (
              <div
                key={cat.id}
                className="grid border-b border-zinc-800/80 last:border-b-0 min-h-[90px]"
                style={{ gridTemplateColumns: `180px repeat(${months.length}, minmax(0, 1fr))` }}
              >
                {/* Swimlane Label */}
                <div className="p-3 border-r border-zinc-800/80 bg-zinc-900/30 flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div>
                    <div className="text-xs font-bold text-zinc-200">{cat.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">{categoryItems.length} Öğe</div>
                  </div>
                </div>

                {/* Month Cells */}
                {months.map((m) => {
                  const mStart = new Date(m.getFullYear(), m.getMonth(), 1).toISOString().split('T')[0];
                  const mEnd = new Date(m.getFullYear(), m.getMonth() + 1, 0).toISOString().split('T')[0];

                  const cellItems = categoryItems.filter((it) => {
                    return it.startDate <= mEnd && it.endDate >= mStart;
                  });

                  return (
                    <div
                      key={m.toISOString()}
                      className="p-2 border-r border-zinc-800/60 last:border-r-0 space-y-1.5 bg-zinc-950/20"
                    >
                      {cellItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-2 rounded-lg text-xs border border-zinc-800 transition-all hover:border-orange-500/40 relative overflow-hidden group"
                          style={{
                            borderLeftWidth: '4px',
                            borderLeftColor: cat.color,
                            backgroundColor: 'rgba(24, 24, 27, 0.9)'
                          }}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className={`font-semibold text-zinc-200 text-[11px] truncate ${item.completed ? 'line-through text-zinc-500' : ''}`}>
                              {item.title}
                            </span>
                            {item.milestone && (
                              <Flag className="w-3 h-3 text-orange-400 shrink-0" title="Milestone" />
                            )}
                          </div>
                          {item.notes && (
                            <p className="text-[10px] text-zinc-400 italic line-clamp-1 mt-0.5">
                              {item.notes}
                            </p>
                          )}
                          <div className="text-[9px] text-zinc-500 font-mono mt-1">
                            {formatDate(item.startDate)} - {formatDate(item.endDate)}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
