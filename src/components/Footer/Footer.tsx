import { Link } from 'react-router';

const abnehmProgrammeLinks = [
  { label: "So funktioniert's", path: '/#how-it-works-section' },
  { label: 'Eignung prüfen', path: '/product/select' },
  { label: 'Unsere Ärzte', path: '/team' },
];

const rechtlichesLinks = [
  { label: 'Datenschutz', path: '/privacy' },
  { label: 'AGB', path: '/terms' },
  { label: 'Impressum', path: '/' },
  { label: 'Cookie-Einstellungen', path: '/' },
];

const kontaktLinks = [
  { label: 'Häufige Fragen (FAQ)', path: '/#faq' },
  { label: 'Kontaktformular', path: '/' },
];

const chipStyle = {
  background: 'rgba(255,255,255,.9)',
  borderRadius: 5,
  padding: '3px 8px',
  fontSize: 11,
  fontWeight: 700,
  color: '#333',
  display: 'inline-block',
};

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
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 14,
                }}
            >
              <span
                  aria-hidden="true"
                  style={{
                    width: 39,
                    height: 39,
                    borderRadius: '999px',
                    background: '#FFFFFF',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 14px rgba(8,15,12,.22)',
                    flexShrink: 0,
                  }}
              >
                <img
                    src="/images/logo/cta-banner.png"
                    alt="Slimedo Logo"
                    style={{
                      width: 38,
                      height: 38,
                      objectFit: 'contain',
                      flexShrink: 0,
                    }}
                />
              </span>
              <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 19,
                    fontWeight: 700,
                    color: '#FAF5EA',
                    letterSpacing: '0',
                    lineHeight: 1,
                  }}
              >
                Slimedo
              </span>
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
                Ihr vertrauenswürdiger Telemedizin-Partner für professionelle medizinische Beratung
                und Rezeptdienste.
              </p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: 10 }}>
                {/* Facebook */}
                <SocialIcon label="Facebook">
                  <path
                      d="M6.1 14V8.8H4.4V6.7H6.1V5.2C6.1 3.4 7.2 2.4 8.8 2.4C9.6 2.4 10.3 2.5 10.5 2.5V4.4H9.4C8.5 4.4 8.3 4.8 8.3 5.5V6.7H10.4L10.1 8.8H8.3V14H6.1Z"
                      fill="#CDDDCB"
                  />
                </SocialIcon>
                {/* Twitter / X */}
                <SocialIcon label="Twitter / X">
                  <path d="M3 3L12.1 13H13.8L4.7 3H3Z" stroke="#CDDDCB" strokeWidth="1.2" />
                  <path d="M3.1 13L6.6 9.3M9.4 6.4L12.8 3" stroke="#CDDDCB" strokeWidth="1.2" strokeLinecap="round" />
                </SocialIcon>
                {/* Instagram */}
                <SocialIcon label="Instagram">
                  <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="#CDDDCB" strokeWidth="1.3" />
                  <circle cx="8" cy="8" r="2.8" stroke="#CDDDCB" strokeWidth="1.3" />
                  <circle cx="11.2" cy="4.8" r="0.8" fill="#CDDDCB" />
                </SocialIcon>
                {/* TikTok */}
                <SocialIcon label="TikTok">
                  <path
                      d="M10.5 2C10.7 3.5 11.6 4.4 13 4.5V6.5C12 6.5 11.1 6.2 10.5 5.7V10.5C10.5 12.7 8.7 14 6.8 14C4.9 14 3 12.7 3 10.5C3 8.3 4.9 7 6.8 7C7 7 7.2 7 7.4 7V9.1C7.2 9 7 9 6.8 9C6 9 5.2 9.7 5.2 10.5C5.2 11.3 6 12 6.8 12C7.6 12 8.3 11.3 8.3 10.5V2H10.5Z"
                      stroke="#CDDDCB"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </SocialIcon>
              </div>
            </div>

            {/* Link columns */}
            <FooterCol title="Abnehm-Programme" links={abnehmProgrammeLinks} />
            <FooterCol title="Rechtliches" links={rechtlichesLinks} />
            <ContactCol />
          </div>

          {/* Bottom bar */}
          <div
              className="footer-btm-resp"
              style={{
                padding: '22px 0 28px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 24,
              }}
          >
            {/* Shipping */}
            <div style={{ maxWidth: 360 }}>
              <p
                  style={{
                    fontSize: 12,
                    color: 'rgba(205,221,203,.35)',
                    marginBottom: 9,
                    fontFamily: '"Inter", sans-serif',
                  }}
              >
                Versand &amp; Abholung
              </p>
              <span style={chipStyle}>GO! Express</span>
              <p
                  style={{
                    fontSize: 12,
                    color: 'rgba(205,221,203,.45)',
                    lineHeight: 1.55,
                    margin: '10px 0 0',
                    fontFamily: '"Inter", sans-serif',
                  }}
              >
                Versand erfolgt ausschließlich durch zugelassene Apotheken. slimedo versendet
                keine Arzneimittel.
              </p>
            </div>

            {/* Payment badges and copyright */}
            <div className="footer-pay-resp" style={{ textAlign: 'right' }}>
              <p
                  style={{
                    fontSize: 12,
                    color: 'rgba(205,221,203,.35)',
                    marginBottom: 9,
                    fontFamily: '"Inter", sans-serif',
                  }}
              >
                Sichere Zahlungsmethoden
              </p>
              <div>
                {['Visa', 'Mastercard', 'Stripe', 'PayPal', 'Apple Pay', 'Klarna'].map((name) => (
                    <span
                        key={name}
                        style={{
                          ...chipStyle,
                          marginRight: 6,
                          marginBottom: 6,
                        }}
                    >
                      {name}
                    </span>
                ))}
              </div>
              <p
                  style={{
                    fontSize: 12,
                    color: 'rgba(205,221,203,.3)',
                    lineHeight: 1.5,
                    marginTop: 18,
                    fontFamily: '"Inter", sans-serif',
                  }}
              >
                © 2026 slimedo. Alle Rechte vorbehalten.
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
          .footer-pay-resp { text-align: left !important; }
        }
      `}</style>
      </footer>
  );
}

function SocialIcon({
                      label,
                      children,
                    }: {
  label: string;
  children: React.ReactNode;
}) {
  return (
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
          aria-label={label}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {children}
        </svg>
      </div>
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
        <FooterHeading>{title}</FooterHeading>
        <FooterLinks links={links} />
      </div>
  );
}

function ContactCol() {
  return (
      <div>
        <FooterHeading>Kontakt</FooterHeading>
        <FooterLinks links={kontaktLinks} />
        <div style={{ marginTop: 13 }}>
          <a
              href="mailto:support@slimedo.de"
              style={{
                fontSize: 13.5,
                color: '#FAF5EA',
                textDecoration: 'none',
                transition: 'color .2s',
                fontFamily: '"Inter", sans-serif',
              }}
              onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = '#CDDDCB')
              }
              onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = '#FAF5EA')
              }
          >
            support@slimedo.de
          </a>
          <p
              style={{
                fontSize: 12,
                color: 'rgba(205,221,203,.55)',
                lineHeight: 1.55,
                margin: '4px 0 0',
                fontFamily: '"Inter", sans-serif',
              }}
          >
            Antwort in 24-48 Stunden
          </p>
        </div>
        <p
            style={{
              fontSize: 12,
              color: 'rgba(205,221,203,.45)',
              lineHeight: 1.55,
              margin: '15px 0 0',
              fontFamily: '"Inter", sans-serif',
            }}
        >
          slimedo ist nicht für medizinische Notfälle gedacht. Im Notfall wähle die 112.
        </p>
      </div>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
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
        {children}
      </h4>
  );
}

function FooterLinks({ links }: { links: { label: string; path: string }[] }) {
  return (
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
  );
}
