import { useRef, useEffect } from 'react';

const collageItems = [
  {
    img: '/images/slimedo/slimedo-img.png',
    gradient: 'linear-gradient(160deg,#E8E0CE,#D5C9AF)',
  },
  {
    img: '/images/slimedo/slimedo-img-two.png',
    gradient: 'linear-gradient(160deg,#C5D5C0,#A8BFA0)',
  },
  {
    img: '/images/slimedo/slimedo-img-three.png',
    gradient: 'linear-gradient(160deg,#DDD6C6,#C8BFA8)',
  },
];

export default function LifestyleSection() {
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
      id="slimedo"
      style={{ background: '#F5EEDB', padding: 'clamp(54px, 4.38vw, 100px) 0 clamp(42px, 3.5vw, 80px)', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: 1800, margin: '0 auto', padding: '0 40px' }}>
        <p
          className="slimedo-anim"
          style={{
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '.16em',
            color: '#3D5C4A',
            marginBottom: 14,
            textAlign: 'center',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          Slimedo Begleitung
        </p>
        <h2
          className="slimedo-anim slimedo-d1 lifestyle-hl-resp"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 'clamp(42px, 3.44vw, 90px)',
            fontWeight: 400,
            letterSpacing: '-.01em',
            color: '#1A1A1A',
            marginBottom: 48,
            textAlign: 'center',
          }}
        >
          Mehr als nur ein{' '}
          <em style={{ color: '#3D5C4A', fontStyle: 'italic' }}>Rezept</em>
        </h2>
      </div>

      <div
        className="collage-grid-resp"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 8,
          padding: '0 8px',
        }}
      >
        {collageItems.map((item, i) => (
          <div
            key={i}
            className={`slimedo-anim slimedo-d${i + 1}`}
            style={{
              height: 'clamp(480px, 82vh, 960px)',
              borderRadius: '18px 18px 0 0',
              background: item.gradient,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={item.img}
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
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 1800, margin: '0 auto', padding: '0 40px' }}>
        <p
          style={{
            fontSize: 10,
            color: '#768064',
            padding: '8px 0 0',
            textAlign: 'right',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          *Individuelles Ergebnis. STEP-1, NEJM 2021.
        </p>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .collage-grid-resp {
            grid-template-columns: 1fr !important;
            padding: 0 12px !important;
            gap: 10px !important;
          }
          .collage-grid-resp > div {
            height: clamp(320px, 70vh, 600px) !important;
          }
          .lifestyle-hl-resp { font-size: 30px !important; }
        }
      `}</style>
    </section>
  );
}
