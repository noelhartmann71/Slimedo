import { useRef, useEffect } from 'react';

const slimedoItems = [
  'Ausschließlich approbierte Deutsche ÄrztInnen',
  '100% anonym und diskret',
  'Keine versteckten Kosten, kein Abo-Modell',
  'Freie Wahl des Medikaments',
  'E-Rezept direkt zur Apotheke',
  'Erfahrene Ärzte mit Praxissitz in Deutschland',
  'Bei Rückfragen innerhalb von 24 Stunden erreichbar',
];

const anderenItems = [
  'Ärzte im Ausland, oft nicht erreichbar',
  'Versteckte Gebühren oder Abo-Modell',
  'Kein datensicheres E-Rezept',
  'Unzureichender Kundensupport',
  'Wenig Erfahrung in der Adipositas-Therapie',
];

function CheckIcon({ delay }: { delay: number }) {
  return (
    <svg
      viewBox="0 0 13 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 13, height: 13 }}
    >
      <polyline
        points="2,7 5,10 11,3"
        style={{
          strokeDasharray: 14,
          animation: `slimedo-draw-check 0.45s ease ${delay}s both`,
        }}
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="#B5654B"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ width: 12, height: 12 }}
    >
      <line x1="2" y1="2" x2="10" y2="10" />
      <line x1="10" y1="2" x2="2" y2="10" />
    </svg>
  );
}

export default function WarumWirSection() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const anims = section.querySelectorAll<HTMLElement>('.slimedo-anim');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('played');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -20px 0px' }
    );
    anims.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: '#1E3A2E',
        padding: '96px 0 104px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow bottom-right */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          bottom: '-10%',
          width: '50%',
          height: '60%',
          background:
            'radial-gradient(ellipse at center, rgba(61,92,74,0.35) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: '0 40px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header */}
        <header
          style={{ textAlign: 'center', marginBottom: 52, position: 'relative', zIndex: 2 }}
        >
          <p
            className="slimedo-anim"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 12,
              fontWeight: 500,
              color: '#CDDDCB',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              marginBottom: 16,
            }}
          >
            Warum wir
          </p>
          <h2
            className="slimedo-anim slimedo-d1 warum-hl-resp"
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 62,
              color: '#FAF5EA',
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: '-0.01em',
              marginBottom: 20,
            }}
          >
            Warum du bei{' '}
            <em style={{ color: '#CDDDCB', fontStyle: 'italic' }}>Slimedo</em> richtig bist
          </h2>
          <p
            className="slimedo-anim slimedo-d2"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 16,
              color: 'rgba(205,221,203,0.65)',
              maxWidth: 580,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Viele Menschen suchen online nach einem seriösen Anbieter für ihre GLP-1-Therapie —
            entscheidend ist dabei eine 100% sichere und gesetzeskonforme Betreuung.
          </p>
        </header>

        {/* Comparison grid */}
        <div
          className="warum-grid-resp"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            alignItems: 'start',
            marginBottom: 48,
          }}
        >
          {/* Slimedo card */}
          <div
            className="slimedo-anim slimedo-d1"
            style={{
              background: '#FAF5EA',
              clipPath: 'polygon(0 0, calc(100% - 44px) 0, 100% 44px, 100% 100%, 0 100%)',
              borderRadius: '0 0 24px 24px',
              padding: '40px 36px 44px',
              position: 'relative',
              overflow: 'visible',
              filter: 'drop-shadow(7px 9px 0 #C8BC9E) drop-shadow(0 8px 20px rgba(0,0,0,0.18))',
              transition: 'transform 0.35s ease',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'translate(5px,-6px)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'translate(0,0)')
            }
          >
            {/* LED glow */}
            <div
              style={{
                position: 'absolute',
                top: '-15%',
                left: '-10%',
                width: '80%',
                height: '60%',
                background:
                  'radial-gradient(ellipse at 30% 30%, rgba(237,216,154,0.35) 0%, rgba(237,216,154,0.12) 40%, transparent 70%)',
                pointerEvents: 'none',
                animation: 'slimedo-led-pulse 3.5s ease-in-out infinite',
                borderRadius: '50%',
                zIndex: 0,
              }}
            />
            {/* Diagonal cut corner */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 44,
                height: 44,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '0 44px 44px 0',
                  borderColor: 'transparent #1E3A2E transparent transparent',
                }}
              />
            </div>

            {/* Card header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 26,
                paddingBottom: 20,
                borderBottom: '1px solid rgba(30,58,46,0.13)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: '#CDDDCB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                  <img
                      src="/images/logo/cta-banner.png"
                      alt=""
                      style={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }}
                  />
              </div>
              <span
                style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 17,
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    color: '#1E3A2E',
                }}
              >
                  Slimedo
              </span>
            </div>

              {/* List */}
              <ul
                  style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 13,
                      position: 'relative',
                      zIndex: 1,
              }}
            >
              {slimedoItems.map((item, i) => (
                <li
                  key={i}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      flexShrink: 0,
                      marginTop: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(61,92,74,0.1)',
                      color: '#3D5C4A',
                    }}
                  >
                    <CheckIcon delay={0.6 + i * 0.1} />
                  </span>
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: 14.5,
                      lineHeight: 1.5,
                      color: '#1A1A1A',
                      fontWeight: 400,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Andere card */}
          <div
            className="slimedo-anim slimedo-d2"
            style={{
              background: '#162B20',
              clipPath: 'polygon(44px 0, 100% 0, 100% 100%, 0 100%, 0 44px)',
              borderRadius: '0 24px 24px 0',
              border: '1px solid rgba(205,221,203,0.07)',
              padding: '52px 36px 44px',
              position: 'relative',
              overflow: 'visible',
              transition: 'transform 0.35s ease',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'translate(-5px,-6px)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'translate(0,0)')
            }
          >
            {/* Cut corner */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 44,
                height: 44,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '44px 44px 0 0',
                  borderColor: '#1E3A2E transparent transparent transparent',
                }}
              />
            </div>

            {/* Card header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 26,
                paddingBottom: 20,
                borderBottom: '1px solid rgba(205,221,203,0.09)',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: 'rgba(205,221,203,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20 }}>
                  <circle
                    cx="10"
                    cy="10"
                    r="7"
                    stroke="rgba(205,221,203,0.3)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="7"
                    y1="7"
                    x2="13"
                    y2="13"
                    stroke="rgba(205,221,203,0.3)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="13"
                    y1="7"
                    x2="7"
                    y2="13"
                    stroke="rgba(205,221,203,0.3)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  color: 'rgba(205,221,203,0.7)',
                }}
              >
                Andere Anbieter
              </span>
            </div>

            {/* List */}
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 13,
              }}
            >
              {anderenItems.map((item, i) => (
                <li
                  key={i}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      flexShrink: 0,
                      marginTop: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(181,101,75,0.15)',
                    }}
                  >
                    <XIcon />
                  </span>
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: 'rgba(205,221,203,0.60)',
                      fontWeight: 400,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div
          className="slimedo-anim slimedo-d3"
          style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 13,
              color: 'rgba(205,221,203,0.5)',
              marginBottom: 20,
            }}
          >
            Überzeug dich selbst — starte jetzt deinen ärztlich begleiteten Weg.
          </p>
          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#3D5C4A',
              color: '#FAF5EA',
              fontFamily: '"Inter", sans-serif',
              fontSize: 15,
              fontWeight: 500,
              padding: '18px 40px',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = '#1E3A2E';
              el.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = '#3D5C4A';
              el.style.transform = 'translateY(0)';
            }}
          >
            Rezeptanfrage machen
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .warum-hl-resp { font-size: 48px !important; }
        }
        @media (max-width: 640px) {
          .warum-grid-resp { grid-template-columns: 1fr !important; gap: 12px !important; }
          .warum-hl-resp { font-size: 30px !important; }
        }
      `}</style>
    </section>
  );
}
