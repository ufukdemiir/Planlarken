import React from 'react';
import { Modal } from './Modal';
import { ExternalLink, CheckSquare, Sun } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const LinkRow = ({ href, icon: Icon, label, desc }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px',
      background: 'var(--bg-muted)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      textDecoration: 'none',
      color: 'var(--text-primary)',
      transition: 'all 0.2s',
      gap: '12px'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--orange)';
      e.currentTarget.style.background = 'var(--orange-light)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.background = 'var(--bg-muted)';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ color: 'var(--text-secondary)' }}>
        <Icon />
      </span>
      <div>
        <div style={{ fontWeight: '600', fontSize: '14px' }}>{label}</div>
        {desc && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{desc}</div>}
      </div>
    </div>
    <ExternalLink size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
  </a>
);

export const LinksModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Baglantilar" wide>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Gelistirici Profili */}
      <div>
        <p style={{
          fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em',
          color: 'var(--text-muted)', textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          Gelistirici Profili
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <LinkRow href="https://github.com/ufukdemiir"          icon={GithubIcon}   label="GitHub"    desc="github.com/ufukdemiir" />
          <LinkRow href="https://www.linkedin.com/in/ufukdemiir/" icon={LinkedInIcon} label="LinkedIn"  desc="linkedin.com/in/ufukdemiir" />
          <LinkRow href="https://tr.pinterest.com/demiirufuk/"    icon={PinterestIcon} label="Pinterest" desc="pinterest.com/demiirufuk" />
        </div>
      </div>

      {/* Ayirici */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        color: 'var(--text-muted)', fontSize: '12px'
      }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <span className="font-serif" style={{ fontStyle: 'italic' }}>Diger Uygulamalar</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      {/* Diger Uygulamalar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <a
          href="https://ufukdemiir.github.io/YapilacaklarListesi/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px',
            background: 'var(--bg-muted)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.background = 'var(--orange-light)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-muted)'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'var(--orange)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <CheckSquare size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>Yapilacaklar Listesi</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Minimalist gorev takip uygulamasi</div>
            </div>
          </div>
          <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
        </a>

        <a
          href="https://ufukdemiir.github.io/GuneBaslarken/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px',
            background: 'var(--bg-muted)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#F59E0B'; e.currentTarget.style.background = '#FFFBEB'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-muted)'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: '#F59E0B', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Sun size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>Gune Baslarken</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Gunluk sabah rutini ve odak uygulamasi</div>
            </div>
          </div>
          <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
        </a>
      </div>
    </div>
  </Modal>
);
