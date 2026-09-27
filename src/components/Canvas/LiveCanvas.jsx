import React from 'react';
import {
  calculateDaysDifference, getScaleMode,
  formatDateTR, getDaysArray, getMonthsArray, getYearsArray, getDayName
} from '../../utils/dateUtils';

/* ─── Mikro (1-7 Gun): Dikey Zaman Akisi ─── */
const MicroView = ({ projectMeta, categories, items }) => {
  const days = getDaysArray(projectMeta.startDate, projectMeta.endDate);
  const catMap = Object.fromEntries(categories.map(c => [c.id, c]));

  return (
    <div>
      <div style={{
        fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#F97316',
        marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px'
      }}>
        <span style={{ width: '20px', height: '1px', background: '#F97316', display: 'inline-block' }} />
        Akis Modu — Gunluk Zaman Cizelgesi
        <span style={{ width: '20px', height: '1px', background: '#F97316', display: 'inline-block' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {days.map((dayStr, idx) => {
          const dayItems = items.filter(it => dayStr >= it.startDate && dayStr <= it.endDate);
          const isLast = idx === days.length - 1;

          return (
            <div key={dayStr} style={{ display: 'flex', gap: '16px', paddingBottom: isLast ? 0 : '16px', position: 'relative' }}>
              {/* Sol: Zaman Cubugu */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '40px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: dayItems.length > 0 ? '#F97316' : '#E4E4E7',
                  color: dayItems.length > 0 ? 'white' : '#71717A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '700', flexShrink: 0
                }}>
                  {idx + 1}
                </div>
                {!isLast && (
                  <div style={{ width: '2px', flex: 1, background: '#E4E4E7', minHeight: '16px', marginTop: '4px' }} />
                )}
              </div>

              {/* Sag: Gun Icerik */}
              <div style={{ flex: 1, paddingTop: '4px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#18181B' }}>
                    {formatDateTR(dayStr, 'medium')}
                  </div>
                  <div style={{ fontSize: '11px', color: '#71717A' }}>
                    {getDayName(dayStr)}
                  </div>
                </div>

                {dayItems.length === 0 ? (
                  <div style={{
                    fontSize: '11px', color: '#A1A1AA',
                    fontStyle: 'italic', padding: '8px 0'
                  }}>
                    Bu gun icin etkinlik bulunmuyor.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {dayItems.map(item => {
                      const cat = catMap[item.categoryId] || categories[0];
                      return (
                        <div key={item.id} style={{
                          display: 'flex', gap: '10px', padding: '10px 12px',
                          background: cat.color + '10',
                          border: `1px solid ${cat.color}30`,
                          borderLeft: `3px solid ${cat.color}`,
                          borderRadius: '8px'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: '13px', fontWeight: '600',
                              color: '#18181B',
                              textDecoration: item.completed ? 'line-through' : 'none',
                              opacity: item.completed ? 0.5 : 1
                            }}>
                              {item.milestone ? '🚩 ' : ''}{item.title}
                            </div>
                            {item.notes && (
                              <div style={{ fontSize: '11px', color: '#71717A', marginTop: '2px', fontStyle: 'italic' }}>
                                {item.notes}
                              </div>
                            )}
                          </div>
                          <div style={{
                            fontSize: '10px', color: cat.color, fontWeight: '600',
                            flexShrink: 0, paddingTop: '1px'
                          }}>
                            {cat.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Orta (1 Hafta - 6 Ay): Kulvar (Swimlane) Modu ─── */
const SwimlaneView = ({ projectMeta, categories, items }) => {
  const months = getMonthsArray(projectMeta.startDate, projectMeta.endDate);
  const colCount = months.length;

  return (
    <div>
      <div style={{
        fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#F97316',
        marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px'
      }}>
        <span style={{ width: '20px', height: '1px', background: '#F97316', display: 'inline-block' }} />
        Kulvar Modu — Kategori & Ay Matrisi
        <span style={{ width: '20px', height: '1px', background: '#F97316', display: 'inline-block' }} />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `160px repeat(${colCount}, minmax(120px, 1fr))`,
          border: '1px solid #E4E4E7',
          borderRadius: '12px',
          overflow: 'hidden',
          minWidth: '500px'
        }}>
          {/* Baslik satiri */}
          <div style={{ padding: '10px 14px', background: '#F4F4F5', borderRight: '1px solid #E4E4E7', fontSize: '11px', fontWeight: '700', color: '#52525B' }}>
            Kategori
          </div>
          {months.map(m => (
            <div key={m.toISOString()} style={{
              padding: '10px 8px', background: '#F4F4F5',
              borderRight: '1px solid #E4E4E7',
              fontSize: '11px', fontWeight: '700', color: '#F97316',
              textAlign: 'center'
            }}>
              {formatDateTR(m.toISOString().split('T')[0], 'monthYear')}
            </div>
          ))}

          {/* Kategori Satirlari */}
          {categories.map((cat, ci) => {
            const catItems = items.filter(it => it.categoryId === cat.id);
            const isLast = ci === categories.length - 1;
            const rowStyle = {
              borderTop: '1px solid #E4E4E7',
              minHeight: '80px'
            };
            return (
              <React.Fragment key={cat.id}>
                <div style={{
                  ...rowStyle,
                  padding: '10px 14px',
                  borderRight: '1px solid #E4E4E7',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: cat.color + '08'
                }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#18181B' }}>{cat.name}</span>
                </div>
                {months.map(m => {
                  const ms = new Date(m.getFullYear(), m.getMonth(), 1).toISOString().split('T')[0];
                  const me = new Date(m.getFullYear(), m.getMonth() + 1, 0).toISOString().split('T')[0];
                  const cell = catItems.filter(it => it.startDate <= me && it.endDate >= ms);
                  return (
                    <div key={m.toISOString()} style={{
                      ...rowStyle,
                      padding: '6px',
                      borderRight: '1px solid #E4E4E7',
                      display: 'flex', flexDirection: 'column', gap: '4px'
                    }}>
                      {cell.map(item => (
                        <div key={item.id} style={{
                          padding: '5px 8px',
                          background: cat.color + '18',
                          borderLeft: `3px solid ${cat.color}`,
                          borderRadius: '6px',
                          fontSize: '11px', fontWeight: '600',
                          color: '#18181B',
                          textDecoration: item.completed ? 'line-through' : 'none',
                          opacity: item.completed ? 0.5 : 1
                        }}>
                          {item.milestone ? '🚩 ' : ''}{item.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─── Makro (6 Ay - 10+ Yıl): Yol Haritası Modu ─── */
const RoadmapView = ({ projectMeta, categories, items }) => {
  const years = getYearsArray(projectMeta.startDate, projectMeta.endDate);
  const quarters = [
    { label: 'Q1 · Oca–Mar', months: [0, 1, 2] },
    { label: 'Q2 · Nis–Haz', months: [3, 4, 5] },
    { label: 'Q3 · Tem–Eyl', months: [6, 7, 8] },
    { label: 'Q4 · Eki–Ara', months: [9, 10, 11] }
  ];
  const catMap = Object.fromEntries(categories.map(c => [c.id, c]));

  return (
    <div>
      <div style={{
        fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#F97316',
        marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px'
      }}>
        <span style={{ width: '20px', height: '1px', background: '#F97316', display: 'inline-block' }} />
        Yol Haritasi — Yillik Ceyrek Panorama
        <span style={{ width: '20px', height: '1px', background: '#F97316', display: 'inline-block' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {years.map(year => {
          const yearItems = items.filter(it => {
            const sy = new Date(it.startDate).getFullYear();
            const ey = new Date(it.endDate).getFullYear();
            return year >= sy && year <= ey;
          });

          return (
            <div key={year}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'
              }}>
                <span className="font-serif" style={{
                  fontSize: '22px', fontWeight: '700', color: '#F97316'
                }}>{year}</span>
                <div style={{ flex: 1, height: '1px', background: '#FED7AA' }} />
                <span style={{ fontSize: '11px', color: '#A1A1AA' }}>
                  {yearItems.length} hedef
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {quarters.map(q => {
                  const qItems = yearItems.filter(it => {
                    const sm = new Date(it.startDate).getMonth();
                    const em = new Date(it.endDate).getMonth();
                    const sy = new Date(it.startDate).getFullYear();
                    const ey = new Date(it.endDate).getFullYear();
                    const startInYear = sy === year ? sm : 0;
                    const endInYear   = ey === year ? em : 11;
                    return q.months.some(m => m >= startInYear && m <= endInYear);
                  });

                  return (
                    <div key={q.label} style={{
                      background: '#FAFAFA',
                      border: '1px solid #E4E4E7',
                      borderRadius: '10px',
                      padding: '10px',
                      minHeight: '100px'
                    }}>
                      <div style={{
                        fontSize: '10px', fontWeight: '700', color: '#F97316',
                        letterSpacing: '0.05em', marginBottom: '8px',
                        paddingBottom: '6px', borderBottom: '1px solid #FED7AA'
                      }}>
                        {q.label}
                      </div>
                      {qItems.length === 0 ? (
                        <div style={{ fontSize: '11px', color: '#D4D4D8', fontStyle: 'italic' }}>—</div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          {qItems.map(item => {
                            const cat = catMap[item.categoryId] || categories[0];
                            return (
                              <div key={item.id} style={{
                                padding: '5px 8px',
                                background: item.milestone ? '#FFF7ED' : '#F4F4F5',
                                border: item.milestone ? '1px solid #FED7AA' : '1px solid #E4E4E7',
                                borderLeft: `3px solid ${cat.color}`,
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: item.milestone ? '700' : '500',
                                color: '#18181B',
                                textDecoration: item.completed ? 'line-through' : 'none',
                                opacity: item.completed ? 0.5 : 1
                              }}>
                                {item.milestone ? '🚩 ' : ''}{item.title}
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

/* ─── Ana Canvas Bileşeni ─── */
export const LiveCanvas = ({ projectMeta, categories, items }) => {
  const diffDays = calculateDaysDifference(projectMeta.startDate, projectMeta.endDate);
  const mode = getScaleMode(diffDays);
  const isLandscape = projectMeta.orientation === 'landscape';

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: '32px'
    }}>
      {/* A4 Kagit Simülatörü */}
      <div
        id="printable-canvas"
        className="paper-shadow print-root"
        style={{
          background: '#FFFFFF',
          color: '#18181B',
          borderRadius: '8px',
          padding: '40px 48px',
          width: '100%',
          maxWidth: isLandscape ? '900px' : '640px',
          minHeight: isLandscape ? '500px' : '700px',
          fontFamily: "'Playfair Display', Georgia, serif",
          transition: 'all 0.3s ease'
        }}
      >
        {/* Baslik Alani */}
        <div style={{
          borderBottom: '2px solid #F97316',
          paddingBottom: '20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{
              fontSize: '10px', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#F97316',
              fontWeight: '700', marginBottom: '6px',
              fontFamily: "'Inter', sans-serif"
            }}>
              Zaman Haritasi & Planlama
            </div>
            <h1 className="font-serif" style={{
              fontSize: '26px', fontWeight: '700',
              color: '#18181B', letterSpacing: '-0.02em',
              lineHeight: 1.2, margin: 0
            }}>
              {projectMeta.title || 'Proje Plani'}
            </h1>
            {projectMeta.subtitle && (
              <p style={{
                fontSize: '14px', color: '#71717A',
                fontStyle: 'italic', marginTop: '4px',
                fontFamily: "'Playfair Display', Georgia, serif"
              }}>
                "{projectMeta.subtitle}"
              </p>
            )}
          </div>

          <div style={{
            textAlign: 'right',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#71717A',
            lineHeight: '1.8',
            flexShrink: 0
          }}>
            <div>{formatDateTR(projectMeta.startDate, 'medium')} — {formatDateTR(projectMeta.endDate, 'medium')}</div>
            <div style={{ color: '#F97316', fontWeight: '700' }}>{diffDays} Gun · {projectMeta.paperSize || 'A4'} {isLandscape ? 'Yatay' : 'Dikey'}</div>
          </div>
        </div>

        {/* Kategori Efsanesi */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '10px',
          marginBottom: '24px',
          fontFamily: "'Inter', sans-serif"
        }}>
          {categories.map(cat => (
            <span key={cat.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '11px', fontWeight: '600', color: '#52525B'
            }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
              {cat.name}
            </span>
          ))}
        </div>

        {/* Bos Durum */}
        {items.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            color: '#A1A1AA',
            fontFamily: "'Inter', sans-serif"
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>Henuz hic hedef veya gorev eklenmedi.</div>
            <div style={{ fontSize: '12px', marginTop: '6px' }}>Sol panelden "Yeni Gorev / Hedef" formunu kullanarak baslayin.</div>
          </div>
        )}

        {/* Ölcekli Gorunum */}
        {items.length > 0 && mode === 'micro'  && <MicroView  projectMeta={projectMeta} categories={categories} items={items} />}
        {items.length > 0 && mode === 'medium' && <SwimlaneView projectMeta={projectMeta} categories={categories} items={items} />}
        {items.length > 0 && mode === 'macro'  && <RoadmapView  projectMeta={projectMeta} categories={categories} items={items} />}

        {/* Alt Bilgi / Footer */}
        <div style={{
          borderTop: '1px solid #E4E4E7',
          marginTop: '32px', paddingTop: '12px',
          display: 'flex', justifyContent: 'space-between',
          fontSize: '10px', color: '#A1A1AA',
          fontFamily: "'Inter', sans-serif"
        }}>
          <span>Planlarken — Geleceginizi planlarken karmasaya yer yok.</span>
          <span>ufukdemiir.github.io/Planlarken</span>
        </div>
      </div>
    </div>
  );
};
