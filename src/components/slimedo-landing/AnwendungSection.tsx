import { useRef, useEffect } from 'react';

const imageCards = [
  {
    img: '/images/home/injection-img.png',
    title: 'Vorbereitung',
    subtitle: 'Dosis einstellen',
    gradient: 'linear-gradient(180deg, #F5EEDB 0%, #E5D9BD 100%)',
  },
  {
    img: '/images/home/medication-img.png',
    title: 'Injektion',
    subtitle: 'In das Bauchfett',
    gradient: 'linear-gradient(180deg, #E8E0CE 0%, #D5C9AF 100%)',
  },
  {
    img: '/images/home/prescription-process-img.png',
    title: 'Intervall',
    subtitle: 'Ein Mal die Woche',
    gradient: 'linear-gradient(180deg, #DDD6C6 0%, #C8BFA8 100%)',
  },
];

const PlaceholderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 64, height: 64 }}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

export default function AnwendungSection() {
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
        background: 'radial-gradient(ellipse at 15% 20%, rgba(205,221,203,0.45) 0%, transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(237,216,154,0.3) 0%, transparent 55%), #FAF5EA',
        padding: '96px 0 104px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <header
          style={{
            marginBottom: 56,
            position: 'relative',
            zIndex: 2,
            maxWidth: 900,
          }}
        >
          <p
            className="slimedo-anim"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 12,
              color: '#3D5C4A',
              margin: '0 0 16px',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontWeight: 500,
            }}
          >
            Anwendung
          </p>
          <h2
            className="slimedo-anim slimedo-d1 anw-hl-resp"
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 62,
              margin: 0,
              color: '#1A1A1A',
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}
          >
            Einfach in deinen{' '}
            <em style={{ color: '#3D5C4A', fontStyle: 'italic' }}>Alltag</em> integriert
          </h2>
          <p
            className="slimedo-anim slimedo-d2"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 19,
              fontWeight: 600,
              color: '#1A1A1A',
              margin: '32px 0 12px',
              letterSpacing: '-0.005em',
              lineHeight: 1.35,
            }}
          >
            Eine wöchentliche Injektion — alltagstauglich
          </p>
          <p
            className="slimedo-anim slimedo-d3"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 16,
              color: '#768064',
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 640,
            }}
          >
            Eine etablierte, klinisch geprüfte Therapie. Weltweit eingesetzt und ärztlich
            verschrieben.
          </p>
        </header>

        {/* Image grid */}
        <div
          className="anw-grid-resp"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {imageCards.map((card, i) => (
            <div
              key={i}
              className={`slimedo-anim slimedo-d${i + 1}`}
              style={{
                aspectRatio: '3/4',
                background: card.gradient,
                borderRadius: 24,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow:
                  '0 1px 2px rgba(15,31,26,0.04),0 8px 24px rgba(15,31,26,0.06)',
              }}
            >
              {/* Actual image */}
              <img
                src={card.img}
                alt={card.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Placeholder fallback */}
              <PlaceholderIcon />
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 12,
                  color: '#3D5C4A',
                  opacity: 0.6,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  fontWeight: 500,
                  marginTop: 8,
                }}
              >
                Bild folgt
              </span>

              {/* Label overlay */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '28px 24px 24px',
                  background:
                    'linear-gradient(180deg, rgba(30,58,46,0) 0%, rgba(30,58,46,0.85) 100%)',
                  textAlign: 'center',
                }}
              >
                <h3
                  style={{
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: 20,
                    fontWeight: 600,
                    margin: '0 0 4px',
                    color: '#FFFDF7',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 13.5,
                    color: '#E5DDC8',
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .anw-hl-resp { font-size: 48px !important; }
        }
        @media (max-width: 640px) {
          .anw-grid-resp { grid-template-columns: 1fr !important; }
          .anw-hl-resp { font-size: 32px !important; }
        }
      `}</style>
    </section>
  );
}
