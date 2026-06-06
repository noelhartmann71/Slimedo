import { useRef, useEffect } from 'react';

const steps = [
  {
    num: '1',
    title: 'Fragebogen ausfüllen',
    desc: 'Starte die Online-Konsultation und beantworte die medizinischen Fragen.',
    img: '/images/how-it-work/step-1-de.png',
    imgAlt: 'Fragebogen',
    rotate: '-6deg',
    hasExpress: false,
  },
  {
    num: '2',
    title: 'Arzt prüft & verschreibt',
    desc: 'Approbierte Ärzte prüfen deine Angaben und stellen bei Bedarf ein Rezept aus.',
    img: '/images/how-it-work/step-2.png',
    imgAlt: 'Arzt prüft',
    rotate: '0deg',
    marginTop: -20,
    hasExpress: false,
  },
  {
    num: '3',
    title: 'Lieferung in 1–2 Werktagen',
    desc: 'Diskreter Versand deiner Medikamente direkt zu dir nach Hause.',
    img: '/images/how-it-work/step-3.png',
    imgAlt: 'Versand',
    rotate: '6deg',
    hasExpress: true,
  },
];

export default function ThreeStepsSection() {
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
      id="schritte"
      style={{
        background: 'linear-gradient(180deg,#F0EDDF 0%,#EEF4EE 40%,#F5F5F0 100%)',
        padding: 'clamp(56px, 5vw, 96px) 0 clamp(48px, 4vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 clamp(16px, 3.5vw, 40px)' }}>
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
          SO EINFACH GEHT ES
        </p>
        <h2
          className="slimedo-anim slimedo-d1 steps-hl-resp"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 62,
            lineHeight: 1.02,
            fontWeight: 400,
            letterSpacing: '-.01em',
            color: '#1A1A1A',
            marginBottom: 12,
          }}
        >
          In drei Schritten zur{' '}
          <em style={{ color: '#3D5C4A', fontStyle: 'italic' }}>Behandlung</em>
        </h2>
        <p
          className="slimedo-anim slimedo-d2"
          style={{
            fontSize: 15,
            color: '#6E6A60',
            textAlign: 'center',
            marginBottom: 56,
            letterSpacing: '.01em',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          100% online · diskret · ärztlich begleitet
        </p>

        {/* Cards grid */}
        <div
          className="steps-grid-resp"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 32,
            position: 'relative',
            alignItems: 'flex-start',
            padding: '20px 8px 40px',
          }}
        >
          {/* Honey decoration line */}
          <div
            style={{
              position: 'absolute',
              top: '42%',
              left: '4%',
              right: '4%',
              height: 2,
              background:
                'linear-gradient(to right,transparent,#EDD89A 25%,#EDD89A 75%,transparent)',
              opacity: 0.55,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`slimedo-anim slimedo-d${i + 1} step-card`}
              style={{
                background: 'white',
                borderRadius: 20,
                padding: '32px 24px 0',
                position: 'relative',
                zIndex: 1,
                boxShadow:
                  '0 2px 8px rgba(15,31,26,.05),0 12px 32px rgba(15,31,26,.10)',
                transition:
                  'transform .35s cubic-bezier(.34,1.2,.64,1),box-shadow .35s ease',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transform: `rotate(${step.rotate})`,
                marginTop: (step as any).marginTop ?? 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'rotate(0deg) translateY(-8px)';
                el.style.boxShadow =
                  '0 4px 16px rgba(15,31,26,.08),0 20px 48px rgba(15,31,26,.15)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = `rotate(${step.rotate})`;
                el.style.boxShadow =
                  '0 2px 8px rgba(15,31,26,.05),0 12px 32px rgba(15,31,26,.10)';
              }}
            >
              {/* Number badge */}
              <span
                style={{
                  position: 'absolute',
                  top: -16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#3D5C4A',
                  color: '#FAF5EA',
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: 15,
                  fontWeight: 700,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(61,92,74,.3)',
                  zIndex: 2,
                }}
              >
                {step.num}
              </span>

              {/* Express pill */}
              {step.hasExpress && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    background: '#EDD89A',
                    color: '#5A3F00',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '4px 11px',
                    borderRadius: 999,
                    letterSpacing: '.04em',
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 3,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  ⚡ Express
                </span>
              )}

              <p
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: 17,
                  fontWeight: 600,
                  color: '#1A1A1A',
                  marginBottom: 10,
                  marginTop: 28,
                  textAlign: 'center',
                }}
              >
                {step.title}
              </p>
              <p
                style={{
                  fontSize: 13.5,
                  color: '#6E6A60',
                  lineHeight: 1.55,
                  textAlign: 'center',
                  padding: '0 4px',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {step.desc}
              </p>

              {/* Image */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: 16,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  minHeight: 160,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={step.img}
                  alt={step.imgAlt}
                  style={{
                    width: '100%',
                    height: 160,
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    borderRadius: '0 0 18px 18px',
                  }}
                  onError={(e) => {
                    const ph = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                    (e.target as HTMLImageElement).style.display = 'none';
                    if (ph) ph.style.display = 'flex';
                  }}
                />
                {/* fallback placeholder */}
                <div
                  style={{
                    display: 'none',
                    width: '100%',
                    height: 160,
                    background:
                      'linear-gradient(160deg,#F5EEDB 0%,#FAF5EA 100%)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 500,
                    color: '#6E6A60',
                    textTransform: 'uppercase',
                    letterSpacing: '.1em',
                    borderRadius: '0 0 18px 18px',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {step.imgAlt}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 56, textAlign: 'center' }}>
          <a
            href="/product/select"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background:
                'linear-gradient(160deg,#4A6E58 0%,#3D5C4A 55%,#324E3F 100%)',
              color: '#FAF5EA',
              fontSize: 15,
              fontWeight: 500,
              padding: '16px 36px',
              borderRadius: 14,
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(61,92,74,.22)',
              transition: 'transform .15s',
              fontFamily: '"Inter", sans-serif',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')
            }
          >
            Jetzt Fragebogen ausfüllen
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M2 6.5h9M7 3l3.5 3.5L7 10"
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
          .steps-grid-resp { grid-template-columns: 1fr !important; }
          .steps-hl-resp { font-size: 48px !important; }
          .step-card { margin-top: 0 !important; }
        }
        @media (max-width: 640px) {
          .steps-hl-resp { font-size: 36px !important; }
        }
      `}</style>
    </section>
  );
}
