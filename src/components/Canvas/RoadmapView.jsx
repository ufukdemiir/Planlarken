import React from 'react';
import { getYearsArray, formatDate } from '../../utils/dateUtils';
import { Map, Award, Calendar } from 'lucide-react';

export const RoadmapView = ({ projectMeta, categories, items }) => {
  const years = getYearsArray(projectMeta.startDate, projectMeta.endDate);

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {});

  const quarters = ['Q1 (Oca-Mar)', 'Q2 (Nis-Haz)', 'Q3 (Tem-Eyl)', 'Q4 (Eki-Ara)'];

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
        <span className="text-xs uppercase font-mono tracking-wider text-orange-400 font-semibold flex items-center gap-1.5">
          <Map className="w-4 h-4" /> Makro Ölçek — Kuşbakışı Yol Haritası & Milestones (6 Ay - 10 Yıl)
        </span>
        <span className="text-xs text-zinc-500 font-serif-accent italic">
          {years.length} Yıllık Stratejik Panorama
        </span>
      </div>

      <div className="space-y-8">
        {years.map((year) => {
          const yearItems = items.filter((it) => {
            const startY = new Date(it.startDate).getFullYear();
            const endY = new Date(it.endDate).getFullYear();
            return year >= startY && year <= endY;
          });

          return (
            <div key={year} className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 space-y-4">
              {/* Year Title Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                <h3 className="text-lg font-serif-title font-bold text-orange-400 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  {year} Yılı Dönem Görünümü
                </h3>
                <span className="text-xs text-zinc-400 font-mono">
                  {yearItems.length} Stratejik Hedef
                </span>
              </div>

              {/* Quarters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {quarters.map((qLabel, qIdx) => {
                  const qStartMonth = qIdx * 3;
                  const qEndMonth = qStartMonth + 2;

                  const qItems = yearItems.filter((it) => {
                    const s = new Date(it.startDate);
                    const e = new Date(it.endDate);
                    const sMonth = s.getMonth();
                    const eMonth = e.getMonth();
                    return s.getFullYear() === year && eMonth >= qStartMonth && sMonth <= qEndMonth;
                  });

                  return (
                    <div
                      key={qLabel}
                      className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-3 space-y-2 min-h-[140px]"
                    >
                      <div className="text-xs font-mono font-semibold text-zinc-300 border-b border-zinc-800/60 pb-1.5 flex items-center justify-between">
                        <span>{qLabel}</span>
                        <span className="text-[10px] text-zinc-500">{qItems.length}</span>
                      </div>

                      {qItems.length === 0 ? (
                        <p className="text-[11px] text-zinc-600 italic py-2">Hedef tanımlanmadı.</p>
                      ) : (
                        <div className="space-y-2">
                          {qItems.map((item) => {
                            const cat = categoryMap[item.categoryId] || { name: 'Genel', color: '#F97316' };
                            return (
                              <div
                                key={item.id}
                                className={`p-2 rounded-lg border text-xs transition-all ${
                                  item.milestone
                                    ? 'border-orange-500/50 bg-orange-500/10 shadow-sm'
                                    : 'border-zinc-800 bg-zinc-950/80'
                                }`}
                              >
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: cat.color }}
                                  />
                                  <span className="font-semibold text-zinc-200 truncate text-[11px]">
                                    {item.title}
                                  </span>
                                </div>

                                {item.milestone && (
                                  <div className="flex items-center gap-1 text-[10px] font-medium text-orange-400 my-0.5">
                                    <Award className="w-3 h-3" />
                                    <span>Milestone / Kilit Hedef</span>
                                  </div>
                                )}

                                <div className="text-[9px] text-zinc-500 font-mono">
                                  {formatDate(item.startDate)} - {formatDate(item.endDate)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
