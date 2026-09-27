import React from 'react';
import { ListCheck, Trash2, Flag, CheckSquare, Square } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

export const ItemList = ({ items, categories, onToggleComplete, onDeleteItem }) => {
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {});

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-lg">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <h3 className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
          <ListCheck className="w-3.5 h-3.5 text-orange-400" />
          Plan Öğe Listesi
        </h3>
        <span className="text-[10px] text-zinc-500 font-mono">{items.length} Öğe</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-6 text-zinc-600 text-xs italic font-serif-accent">
          Henüz eklenmiş bir hedef veya etkinlik yok.
        </div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {items.map((item) => {
            const cat = categoryMap[item.categoryId] || { name: 'Genel', color: '#F97316' };
            return (
              <div
                key={item.id}
                className={`flex items-start justify-between p-2.5 bg-zinc-950 border rounded-xl text-xs transition-all ${
                  item.completed ? 'border-zinc-850 opacity-60' : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <button
                    onClick={() => onToggleComplete(item.id)}
                    className="mt-0.5 text-zinc-500 hover:text-orange-400 transition-colors shrink-0"
                    title={item.completed ? 'Tamamlanmadı yap' : 'Tamamlandı yap'}
                  >
                    {item.completed ? (
                      <CheckSquare className="w-4 h-4 text-orange-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className={`font-semibold text-zinc-200 truncate ${item.completed ? 'line-through text-zinc-500' : ''}`}>
                        {item.title}
                      </span>
                      {item.milestone && (
                        <span className="px-1.5 py-0.2 bg-orange-500/10 text-orange-400 text-[10px] rounded font-medium flex items-center gap-0.5">
                          <Flag className="w-2.5 h-2.5" /> Milestone
                        </span>
                      )}
                    </div>
                    
                    <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-2">
                      <span>{formatDate(item.startDate)} - {formatDate(item.endDate)}</span>
                    </div>

                    {item.notes && (
                      <p className="text-[11px] text-zinc-400 italic mt-0.5 line-clamp-1">
                        "{item.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-1 text-zinc-600 hover:text-red-400 transition-colors shrink-0 ml-2"
                  title="Öğeyi Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
