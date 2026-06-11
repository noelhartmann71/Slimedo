import { useRef } from 'react';
import { useChildInView } from '@/hooks/useInView';

const collageItems = [
  {
    img: '/images/slimedo/slimedo-img.png',
    gradient: 'linear-gradient(160deg,#E8E0CE,#D5C9AF)',
    badge: {
      title: 'Mehr als nur ein Rezept.',
      sub: 'Ärztlich geprüft. Diskret versendet.',
      side: 'top-right' as const,
    },
  },
  {
    img: '/images/slimedo/slimedo-img-two.png',
    gradient: 'linear-gradient(160deg,#C5D5C0,#A8BFA0)',
    badge: {
      title: 'Gewichtsverlust ist nur der Anfang.',
      sub: 'Ein besseres Körpergefühl ist das Ziel.',
      side: 'bottom-left' as const,
    },
  },
  {
    img: '/images/slimedo/slimedo-img-three.png',
    gradient: 'linear-gradient(160deg,#DDD6C6,#C8BFA8)',
  },
];

export default function LifestyleSection() {
  const ref = useRef<HTMLElement | null>(null);
  useChildInView(ref);

  return (
    <section
      ref={ref}
      id="slimedo"
      className="lifestyle-section-resp"
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
            className={`slimedo-anim slimedo-d${i + 1} ${i === 2 ? 'lifestyle-mobile-hidden' : ''}`}
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
              alt=""
              aria-hidden="true"
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
            {'badge' in item && item.badge && (
              <div className={`lifestyle-badge lifestyle-badge--${item.badge.side}`}>
                <span className="lifestyle-quote-mark">&ldquo;</span>
                <p className="lifestyle-badge-title">{item.badge.title}</p>
                <div className="lifestyle-badge-divider" />
                <div className="lifestyle-badge-pill">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="8" fill={item.badge.side === 'bottom-left' ? 'rgba(255,255,255,0.9)' : '#3D5C4A'} />
                    <path d="M4.5 8.5l2.5 2 4.5-5" stroke={item.badge.side === 'bottom-left' ? '#1A1A1A' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item.badge.sub}</span>
                </div>
              </div>
            )}
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
        .lifestyle-badge { display: none; }

        @media (max-width: 640px) {
          .lifestyle-section-resp { padding: 36px 0 28px !important; }
          .lifestyle-hl-resp { margin-bottom: 24px !important; font-size: 30px !important; }
          .collage-grid-resp {
            grid-template-columns: 1fr !important;
            padding: 0 12px !important;
            gap: 10px !important;
          }
          .collage-grid-resp > div {
            height: clamp(320px, 70vh, 600px) !important;
          }
          .lifestyle-mobile-hidden {
            display: none !important;
          }
          .lifestyle-badge {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: absolute;
          }
          .lifestyle-badge--top-right {
            top: 22px;
            right: 24px;
            max-width: 260px;
          }
          .lifestyle-badge--bottom-left {
            bottom: 24px;
            left: 24px;
            max-width: 260px;
          }
          .lifestyle-quote-mark {
            font-family: "Instrument Serif", Georgia, serif;
            font-size: 44px;
            line-height: 1;
            color: #1A1A1A;
            margin: 0 0 4px;
            display: block;
          }
          .lifestyle-badge-title {
            font-family: "Instrument Serif", Georgia, serif;
            font-size: 28px;
            font-weight: 700;
            color: #1A1A1A;
            line-height: 1.12;
            margin: 0 0 14px;
            white-space: normal;
          }
          .lifestyle-badge-divider {
            width: 24px;
            height: 1.5px;
            background: #1A1A1A;
            margin-bottom: 14px;
            flex-shrink: 0;
          }
          .lifestyle-badge-pill {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            background: rgba(240, 236, 226, 0.88);
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            padding: 6px 14px 6px 8px;
            font-family: "Inter", sans-serif;
            font-size: 12px;
            font-weight: 500;
            color: #1A1A1A;
          }
          .lifestyle-badge--bottom-left .lifestyle-quote-mark {
            color: #FFFFFF;
          }
          .lifestyle-badge--bottom-left .lifestyle-badge-title {
            color: #FFFFFF;
          }
          .lifestyle-badge--bottom-left .lifestyle-badge-divider {
            background: rgba(255, 255, 255, 0.7);
          }
          .lifestyle-badge--bottom-left .lifestyle-badge-pill {
            background: rgba(255, 255, 255, 0.18);
            border-color: rgba(255, 255, 255, 0.3);
            color: #FFFFFF;
          }
        }
      `}</style>
    </section>
  );
}
