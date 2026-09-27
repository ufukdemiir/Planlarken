import React from 'react';
import { getDaysArray, formatDate } from '../../utils/dateUtils';
import { Flag, Calendar } from 'lucide-react';

export const MicroFlowView = ({ projectMeta, categories, items }) => {
  const days = getDaysArray(projectMeta.startDate, projectMeta.endDate);

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
        <span className="text-xs uppercase font-mono tracking-wider text-orange-400 font-semibold flex items-center gap-1.5">
          <Calendar className="w-4 h-4" /> Mikro Ölçek — Dikey Zaman Akışı (1-7 Gün)
        </span>
        <span className="text-xs text-zinc-500 font-serif-accent italic">
          {days.length} Günlük Ayrıntılı Takip
        </span>
      </div>

      <div className="space-y-4">
        {days.map((dayDate, dayIdx) => {
          const dayStr = dayDate.toISOString().split('T')[0];
          const dayItems = items.filter((it) => {
            return dayStr >= it.startDate && dayStr <= it.endDate;
          });

          return (
            <div
              key={dayStr}
              className="relative pl-6 border-l-2 border-orange-500/40 pb-4 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-orange-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              </div>

              {/* Day Header */}
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-sm font-bold text-zinc-100 font-serif-title">
                  Gün {dayIdx + 1}: {formatDate(dayStr, 'medium')}
                </h4>
                <span className="text-[11px] text-zinc-500 font-mono">
                  ({dayItems.length} Etkinlik)
                </span>
              </div>

              {/* Day Items */}
              {dayItems.length === 0 ? (
                <p className="text-xs text-zinc-600 italic font-serif-accent">
                  Bu gün için kayıtlı etkinlik bulunmuyor.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {dayItems.map((item) => {
                    const cat = categoryMap[item.categoryId] || { name: 'Genel', color: '#F97316' };
                    return (
                      <div
                        key={item.id}
                        className="p-3 bg-zinc-900/80 border border-zinc-800/80 rounded-xl space-y-1.5 hover:border-orange-500/30 transition-all"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span className={`text-xs font-semibold text-zinc-200 truncate ${item.completed ? 'line-through text-zinc-500' : ''}`}>
                              {item.title}
                            </span>
                          </div>
                          {item.milestone && (
                            <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-400 text-[10px] rounded font-medium shrink-0 flex items-center gap-0.5">
                              <Flag className="w-2.5 h-2.5" /> Milestone
                            </span>
                          )}
                        </div>

                        {item.notes && (
                          <p className="text-[11px] text-zinc-400 italic leading-relaxed">
                            "{item.notes}"
                          </p>
                        )}
                        <div className="text-[10px] text-zinc-500 font-mono pt-1 border-t border-zinc-800/60 flex items-center justify-between">
                          <span>{cat.name}</span>
                          <span>{item.startDate === item.endDate ? 'Tüm Gün' : `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</span>
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
};
