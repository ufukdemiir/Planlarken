import React from 'react';
import { HelpCircle, ShieldAlert, Link2, Bookmark, Sun, Moon, Eye, Edit3 } from 'lucide-react';

const IconBtn = ({ onClick, title, children }) => (
  <button
    onClick={onClick}
    title={title}
    aria-label={title}
    style={{
      background: 'none',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      padding: '8px',
      cursor: 'pointer',
      color: 'var(--text-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.15s'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--orange)';
      e.currentTarget.style.color = 'var(--orange)';
      e.currentTarget.style.background = 'var(--orange-light)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.color = 'var(--text-secondary)';
      e.currentTarget.style.background = 'none';
    }}
  >
    {children}
  </button>
);

export const Header = ({
  theme,
  onToggleTheme,
  onOpenUsage,
  onOpenDisclaimer,
  onOpenLinks,
  onOpenBookmark,
  activeMobileTab,
  setActiveMobileTab
}) => {
  return (
    <header
      className="no-print"
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'background 0.3s, border-color 0.3s'
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #F97316, #EA580C)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(249,115,22,0.25)',
            flexShrink: 0
          }}>
            <span className="font-serif" style={{
              color: 'white', fontSize: '18px', fontWeight: '700', lineHeight: 1
            }}>P</span>
          </div>
          <div>
            <h1 className="font-serif" style={{
              fontSize: '20px', fontWeight: '700',
              color: 'var(--text-primary)', letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              Planlarken
            </h1>
            <p style={{
              fontSize: '11px', color: 'var(--text-muted)',
              fontStyle: 'italic', lineHeight: 1,
              display: 'block'
            }}>
              Zamaninizi Gorsellestirun
            </p>
          </div>
        </div>

        {/* Mobil Tab Geçişi */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-muted)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '3px',
          gap: '2px'
        }} className="lg-hide">
          {[
            { key: 'control', label: 'Kontrol', Icon: Edit3 },
            { key: 'preview', label: 'Onizleme', Icon: Eye }
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveMobileTab(key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '6px 12px', borderRadius: '7px',
                border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '500',
                fontFamily: 'var(--font-sans)',
                background: activeMobileTab === key ? 'var(--orange)' : 'transparent',
                color: activeMobileTab === key ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.15s'
              }}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* Ikon Butonlar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <IconBtn onClick={onOpenUsage} title="Nasil Kullanilir?">
            <HelpCircle size={18} />
          </IconBtn>
          <IconBtn onClick={onOpenDisclaimer} title="Sorumluluk Reddi">
            <ShieldAlert size={18} />
          </IconBtn>
          <IconBtn onClick={onOpenLinks} title="Baglantilar">
            <Link2 size={18} />
          </IconBtn>
          <IconBtn onClick={onOpenBookmark} title="Yer Imi Ekle">
            <Bookmark size={18} />
          </IconBtn>

          <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 4px' }} />

          <IconBtn
            onClick={onToggleTheme}
            title={theme === 'light' ? 'Karanlik Moda Gec' : 'Aydinlik Moda Gec'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </IconBtn>
        </div>
      </div>
    </header>
  );
};
