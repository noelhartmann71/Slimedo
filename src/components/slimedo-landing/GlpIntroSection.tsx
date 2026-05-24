import { useRef, useEffect } from 'react';

const cards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#3D5C4A" strokeWidth="1.5" />
        <path d="M8 12h8M12 8v8" stroke="#3D5C4A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Ärztlich verschriebenes Rezept',
    text: 'Dein Rezept wird von einem approbierten Arzt mit Praxissitz in Deutschland nach Prüfung deines Fragebogens ausgestellt.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          stroke="#3D5C4A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M9 22V12h6v10"
          stroke="#3D5C4A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Direkt-Lieferung zur Apotheke',
    text: 'Das E-Rezept geht direkt zur Versandapotheke. Das Medikament wird diskret und schnell zu dir geliefert — ohne Arztbesuch oder Wartezimmer.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#3D5C4A" strokeWidth="1.5" />
        <path
          d="M9 12l2 2 4-4"
          stroke="#3D5C4A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Laufende Dosisanpassung',
    text: 'Die Therapie startet niedrig dosiert und wird schrittweise angepasst. Dein Arzt begleitet dich während der gesamten Behandlung.',
  },
];

export default function GlpIntroSection() {
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
      id="intro"
      style={{ background: '#FAF5EA', padding: '80px 0' }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 40px' }}>
        <div
          className="intro-layout-resp"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <div>
            <p
              className="slimedo-anim"
              style={{
                fontSize: 12,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '.16em',
                color: '#3D5C4A',
                marginBottom: 14,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Die Therapie
            </p>
            <h2
              className="slimedo-anim slimedo-d1"
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: 48,
                lineHeight: 1.06,
                fontWeight: 400,
                letterSpacing: '-.01em',
                color: '#1A1A1A',
                marginBottom: 20,
              }}
            >
              Was ist die
              <br />
              GLP-1-<em style={{ color: '#3D5C4A', fontStyle: 'italic' }}>Therapie?</em>
            </h2>
            <p
              className="slimedo-anim slimedo-d2"
              style={{
                fontSize: 16.5,
                color: '#6E6A60',
                lineHeight: 1.7,
                marginBottom: 28,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Semaglutid und Tirzepatid sind verschreibungspflichtige Wirkstoffe, die ein
              körpereigenes Sättigungshormon (GLP-1) nachahmen. Sie verstärken das
              Sättigungsgefühl, verlangsamen die Magenentleerung und regulieren den Blutzucker.
              Ursprünglich wurden sie zur Behandlung von Typ-2-Diabetes entwickelt — heute werden
              sie bei ärztlicher Indikation auch zur medizinischen Gewichtsreduktion eingesetzt.
            </p>
            <p
              className="slimedo-anim slimedo-d3"
              style={{
                fontSize: 15,
                color: '#6E6A60',
                lineHeight: 1.7,
                marginBottom: 20,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Bei Slimedo erhältst du nach ärztlicher Prüfung ein Rezept, das direkt an eine
              Versandapotheke übermittelt wird. Die Apotheke liefert das Medikament diskret zu dir
              nach Hause.
            </p>
            <div
              className="slimedo-anim slimedo-d3"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(61,92,74,.08)',
                border: '1px solid rgba(61,92,74,.15)',
                padding: '8px 16px',
                borderRadius: 999,
                fontSize: 13,
                color: '#3D5C4A',
                marginBottom: 28,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="#3D5C4A" strokeWidth="1.3" />
                <line
                  x1="7"
                  y1="4.5"
                  x2="7"
                  y2="7.5"
                  stroke="#3D5C4A"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <circle cx="7" cy="9.5" r="0.8" fill="#3D5C4A" />
              </svg>
              Bekannt als die{' '}
              <strong style={{ color: '#3D5C4A' }}>&ldquo;Abnehmspritze&rdquo;</strong>
            </div>
            <br />
            <a
              href="#schritte"
              className="slimedo-anim slimedo-d4"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#3D5C4A',
                color: '#FAF5EA',
                fontSize: 14,
                fontWeight: 500,
                padding: '14px 28px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'background .2s',
                fontFamily: '"Inter", sans-serif',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#1E3A2E')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#3D5C4A')
              }
            >
              So läuft es ab →
            </a>
          </div>

          {/* Right — cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {cards.map((card, i) => (
              <div
                key={i}
                className={`slimedo-anim slimedo-d${i + 1}`}
                style={{
                  background: '#FFFDF7',
                  borderRadius: 16,
                  padding: '24px 26px',
                  border: '1px solid #E5D9BD',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  transition: 'transform .2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')
                }
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(61,92,74,.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: '"Manrope", sans-serif',
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#1A1A1A',
                      marginBottom: 5,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13.5,
                      color: '#768064',
                      lineHeight: 1.55,
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .intro-layout-resp { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
