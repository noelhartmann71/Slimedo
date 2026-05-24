import { Link } from 'react-router';

const behandlungLinks = [
  { label: 'GLP-1 Therapie', path: '/' },
  { label: 'Adipositas-Behandlung', path: '/' },
  { label: 'Fragebogen starten', path: '/' },
  { label: 'Unsere Ärzte', path: '/' },
];

const unternehmenLinks = [
  { label: 'Über uns', path: '/' },
  { label: 'Blog', path: '/' },
  { label: 'FAQ', path: '/#faq' },
  { label: 'Kontakt', path: '/' },
];

const rechtlichesLinks = [
  { label: 'Datenschutz', path: '/privacy' },
  { label: 'Impressum', path: '/' },
  { label: 'AGB', path: '/terms' },
  { label: 'Cookie-Einstellungen', path: '/' },
  { label: 'Medizinische Ethik', path: '/' },
];

export default function SlimedoFooter() {
  return (
    <footer
      style={{
        background:
          'linear-gradient(to bottom, #1E3A2E 0%, #131E17 18%, #0F1F1A 40%)',
        padding: '64px 32px 0',
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        {/* Top grid */}
        <div
          className="footer-top-resp"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: 48,
            paddingBottom: 56,
            borderBottom: '1px solid rgba(205,221,203,.1)',
          }}
        >
          {/* Brand column */}
          <div>
            <span
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: 16,
                fontWeight: 700,
                color: '#FAF5EA',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 14,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <circle cx="9" cy="7.5" r="3.8" fill="#CDDDCB" />
                <path
                  d="M2 22C2 22 2 16.5 9 16.5C16 16.5 16 22 16 22"
                  stroke="#CDDDCB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="20" cy="6" r="4.5" fill="rgba(205,221,203,.65)" />
                <path
                  d="M13 22C13 22 13 15.5 20 15.5C27 15.5 27 22 27 22"
                  stroke="rgba(205,221,203,.65)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              SLIMEDO
            </span>
            <p
              style={{
                fontSize: 13.5,
                color: 'rgba(205,221,203,.5)',
                lineHeight: 1.6,
                marginBottom: 22,
                maxWidth: 240,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Telemedizin-Plattform für ärztlich geprüfte Adipositas-Therapie — 100% diskret
              und vertraulich.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {/* Instagram */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(205,221,203,.08)',
                  borderRadius: 9,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(205,221,203,.12)',
                  cursor: 'pointer',
                  transition: 'background .2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'rgba(205,221,203,.16)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'rgba(205,221,203,.08)')
                }
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="#CDDDCB" strokeWidth="1.3" />
                  <circle cx="8" cy="8" r="2.8" stroke="#CDDDCB" strokeWidth="1.3" />
                  <circle cx="11.2" cy="4.8" r="0.8" fill="#CDDDCB" />
                </svg>
              </div>
              {/* TikTok */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(205,221,203,.08)',
                  borderRadius: 9,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(205,221,203,.12)',
                  cursor: 'pointer',
                  transition: 'background .2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'rgba(205,221,203,.16)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'rgba(205,221,203,.08)')
                }
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10.5 2C10.7 3.5 11.6 4.4 13 4.5V6.5C12 6.5 11.1 6.2 10.5 5.7V10.5C10.5 12.7 8.7 14 6.8 14C4.9 14 3 12.7 3 10.5C3 8.3 4.9 7 6.8 7C7 7 7.2 7 7.4 7V9.1C7.2 9 7 9 6.8 9C6 9 5.2 9.7 5.2 10.5C5.2 11.3 6 12 6.8 12C7.6 12 8.3 11.3 8.3 10.5V2H10.5Z"
                    stroke="#CDDDCB"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <FooterCol title="Behandlung" links={behandlungLinks} />
          <FooterCol title="Unternehmen" links={unternehmenLinks} />
          <FooterCol title="Rechtliches" links={rechtlichesLinks} />
        </div>

        {/* Bottom bar */}
        <div
          className="footer-btm-resp"
          style={{
            padding: '22px 0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          {/* Payment badges */}
          <div>
            <span
              style={{ fontSize: 12, color: 'rgba(205,221,203,.35)', marginRight: 8, fontFamily: '"Inter", sans-serif' }}
            >
              Zahlung:
            </span>
            {['stripe', 'PayPal', 'Apple Pay', 'Klarna.'].map((name) => (
              <span
                key={name}
                style={{
                  background: 'rgba(255,255,255,.9)',
                  borderRadius: 5,
                  padding: '3px 8px',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#333',
                  marginRight: 6,
                  display: 'inline-block',
                }}
              >
                {name}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <div style={{ textAlign: 'right' }}>
            <p
              style={{
                fontSize: 12,
                color: 'rgba(205,221,203,.3)',
                lineHeight: 1.5,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              © 2026 Slimedo Telemedicine Platform Ltd
              <br />
              Alle Rechte vorbehalten
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .footer-top-resp { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 640px) {
          .footer-top-resp { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .footer-btm-resp { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; path: string }[];
}) {
  return (
    <div>
      <h4
        style={{
          fontFamily: '"Manrope", sans-serif',
          fontSize: 13,
          fontWeight: 600,
          color: '#FAF5EA',
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          marginBottom: 18,
        }}
      >
        {title}
      </h4>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.path}
              style={{
                fontSize: 14,
                color: 'rgba(205,221,203,.55)',
                textDecoration: 'none',
                transition: 'color .2s',
                fontFamily: '"Inter", sans-serif',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = '#FAF5EA')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(205,221,203,.55)')
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
