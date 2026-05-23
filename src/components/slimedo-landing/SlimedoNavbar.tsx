import { useState } from 'react';

const links = [
  { label: "So funktioniert's", href: '#schritte' },
  { label: 'Abnehmspritzen', href: '#intro' },
  { label: 'Wissenswertes', href: '#wirk' },
  { label: 'FAQ', href: '#faq' },
];

export default function SlimedoNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        background: 'rgba(250,245,234,.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(30,58,46,.08)',
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 58,
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            textDecoration: 'none',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="7.5" r="3.8" fill="#1E3A2E" />
            <path
              d="M2 22C2 22 2 16.5 9 16.5C16 16.5 16 22 16 22"
              stroke="#1E3A2E"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="20" cy="6" r="4.5" fill="#3D5C4A" />
            <path
              d="M13 22C13 22 13 15.5 20 15.5C27 15.5 27 22 27 22"
              stroke="#3D5C4A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span
            style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: 18,
              fontWeight: 700,
              color: '#1E3A2E',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
            }}
          >
            SLIMEDO
          </span>
        </a>

        {/* Desktop links */}
        <ul
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: 24, listStyle: 'none', margin: 0, padding: 0 }}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#3D5C4A',
                  textDecoration: 'none',
                  transition: 'color .2s',
                  fontFamily: '"Inter", sans-serif',
                }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#1E3A2E')}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#3D5C4A')}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: '#6E6A60',
                textDecoration: 'none',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="#"
              style={{
                background: '#3D5C4A',
                color: '#FAF5EA',
                padding: '9px 20px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                fontFamily: '"Inter", sans-serif',
                transition: 'background .2s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#1E3A2E')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#3D5C4A')
              }
            >
              Fragebogen starten →
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#1E3A2E',
            padding: 4,
          }}
          aria-label="Menü"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6l-12 12"
                stroke="#1E3A2E"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="#1E3A2E"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: 'rgba(250,245,234,.97)',
            borderTop: '1px solid rgba(30,58,46,.08)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: '#3D5C4A',
                textDecoration: 'none',
                fontFamily: '"Inter", sans-serif',
                padding: '8px 0',
                borderBottom: '1px solid rgba(30,58,46,.06)',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            style={{
              background: '#3D5C4A',
              color: '#FAF5EA',
              padding: '12px 20px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              textAlign: 'center',
              marginTop: 8,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Fragebogen starten →
          </a>
        </div>
      )}
    </nav>
  );
}
