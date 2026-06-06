import { useEffect, useRef, useState } from 'react';

const heroVideoPoster = '/images/slimedo/slimedohero-poster.webp';
const heroVideoSources = [
  { src: '/images/slimedo/slimedohero.webm', type: 'video/webm' },
  { src: '/images/slimedo/slimedohero-optimized.mp4', type: 'video/mp4' },
];

const trustItems = [
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 13 13" fill="none">
        <path
          d="M6.5 1L2 3.5V6.5C2 9.5 4 12 6.5 13C9 12 11 9.5 11 6.5V3.5L6.5 1Z"
          stroke="#768064"
          strokeWidth="1.2"
        />
        <polyline
          points="3.5,6.5 5.5,8.5 9.5,4.5"
          stroke="#768064"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    label: 'DSGVO-konform',
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 13 13" fill="none">
        <circle cx="6.5" cy="6.5" r="5" stroke="#768064" strokeWidth="1.2" />
        <polyline
          points="3.5,7 5.5,9 10,4.5"
          stroke="#768064"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    label: 'In Deutschland approbierte Ärzt:innen',
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 13 13" fill="none">
        <rect x="2" y="5" width="9" height="6" rx="1" stroke="#768064" strokeWidth="1.2" />
        <path
          d="M4 5V3.5C4 2.1 5 1 6.5 1C8 1 9 2.1 9 3.5V5"
          stroke="#768064"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: 'Telemedizin-Plattform',
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 13 13" fill="none">
        <path
          d="M6.5 1L2 3.5V6.5C2 9.5 4 12 6.5 13C9 12 11 9.5 11 6.5V3.5L6.5 1Z"
          stroke="#768064"
          strokeWidth="1.2"
        />
        <polyline
          points="3.5,6.5 5.5,8.5 9.5,4.5"
          stroke="#768064"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    label: '100% diskret & vertraulich',
  },
];

export default function SlimedoHero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const anims = container.querySelectorAll<HTMLElement>('.slimedo-anim');
    anims.forEach((el) => {
      setTimeout(() => el.classList.add('played'), 100);
    });

    const connection = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (connection.connection?.saveData || prefersReducedMotion.matches) return;

    const idleWindow = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;
    const loadHeroVideo = () => setShouldLoadHeroVideo(true);

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(loadHeroVideo, { timeout: 1200 });
    } else {
      timeoutHandle = window.setTimeout(loadHeroVideo, 700);
    }

    return () => {
      if (idleHandle !== undefined && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadHeroVideo || !videoRef.current) return;
    videoRef.current.load();
    void videoRef.current.play().catch(() => undefined);
  }, [shouldLoadHeroVideo]);

  return (
    <section
      ref={containerRef}
      className="slimedo-hero-section"
      style={{
        background: '#F5EEDB',
        display: 'grid',
        gridTemplateColumns: '45% 55%',
        minHeight: 'clamp(620px, 82vh, 1150px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Radial overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 75% 40%,rgba(61,92,74,.10) 0%,rgba(61,92,74,.04) 35%,transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 20% 50%,rgba(237,216,154,.13) 0%,rgba(237,216,154,.04) 40%,transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Left */}
      <div
        className="hero-left-resp"
        style={{
          padding: '88px 40px 88px 64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Badge */}
        <span
          className="slimedo-anim slimedo-d1 hero-badge-resp"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(61,92,74,.1)',
            border: '1px solid rgba(61,92,74,.18)',
            padding: '7px 16px',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 500,
            color: '#3D5C4A',
            textTransform: 'uppercase',
            letterSpacing: '.1em',
            marginBottom: 28,
            width: 'fit-content',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#3D5C4A" strokeWidth="1.5" />
            <polyline
              points="3,6.5 5,8.5 9,4"
              stroke="#3D5C4A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          Ärztlich begleitet · Persönlich betreut
        </span>

        {/* H1 */}
        <h1
          className="slimedo-anim slimedo-d2 hero-h1-resp"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 'clamp(50px, 4vw, 112px)',
            lineHeight: 1.07,
            fontWeight: 400,
            letterSpacing: '.005em',
            color: '#1A1A1A',
            marginBottom: 26,
          }}
        >
          Mit der
          <br />
          {' '}
          <em style={{ color: '#3D5C4A', fontStyle: 'italic' }}>Abnehmspritze.</em>
            <br/>
            zu einem gesünderem
            <br/>
            Körpergefühl
        </h1>

        {/* Bullet points */}
        <ul
          className="slimedo-anim slimedo-d3 hero-bullets-resp"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 40px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {[
            'Behandlungsgebühr 29 € + Medikament ab 171,96 €',
            'Ärztliche Behandlung, klinisch geprüft',
            'Direkt nach Hause geliefert',
          ].map((text, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 18, color: '#3A3730' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <polyline
                  points="2,8 6,12 14,4"
                  stroke="#3D5C4A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {text}
            </li>
          ))}
        </ul>

        {/* CTA Row */}
        <div
          className="slimedo-anim slimedo-d4"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 44,
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#"
            className="btn-sage-primary hero-cta-btn-resp"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background:
                'linear-gradient(160deg,#4A6E58 0%,#3D5C4A 55%,#324E3F 100%)',
              color: '#FAF5EA',
              fontSize: 17,
              fontWeight: 500,
              padding: '20px 36px 20px 40px',
              borderRadius: 14,
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(30,58,46,.22),0 1px 0 rgba(255,255,255,.06) inset',
              transition: 'box-shadow .25s,transform .2s',
              position: 'relative',
              overflow: 'hidden',
              letterSpacing: '.005em',
              fontFamily: '"Inter", sans-serif',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow =
                '0 8px 28px rgba(30,58,46,.32),0 1px 0 rgba(255,255,255,.06) inset';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow =
                '0 4px 16px rgba(30,58,46,.22),0 1px 0 rgba(255,255,255,.06) inset';
              el.style.transform = 'translateY(0)';
            }}
          >
            Behandlung anfragen{' '}
            <span style={{ display: 'flex', alignItems: 'center', opacity: 0.85 }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2 6.5h9M7 3l3.5 3.5L7 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
          <a
            href="#schritte"
            style={{
              fontSize: 16,
              color: '#3D5C4A',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontFamily: '"Inter", sans-serif',
              transition: 'gap .15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.gap = '9px')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.gap = '5px')}
          >
            Wie funktioniert es? <span>→</span>
          </a>
        </div>

        {/* Trust row */}
        <div
          className="slimedo-anim slimedo-d5 hero-trust-resp"
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 28,
            gap: 0,
            position: 'relative',
            borderTop: '1px solid #E5D9BD',
            flexWrap: 'wrap',
          }}
        >
          {trustItems.map((item, i) => (
            <span
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 15,
                color: '#768064',
                paddingRight: i < trustItems.length - 1 ? 20 : 0,
                marginRight: i < trustItems.length - 1 ? 20 : 0,
                borderRight:
                  i < trustItems.length - 1 ? '1px solid #E5D9BD' : 'none',
                whiteSpace: 'nowrap',
                transition: 'color .2s,transform .2s',
                cursor: 'default',
                fontFamily: '"Inter", sans-serif',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = '#3D5C4A';
                el.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = '#768064';
                el.style.transform = 'scale(1)';
              }}
            >
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* Right — video  */}
      <div
        className="hero-right-resp"
        style={{
          position: 'relative',
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 38%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 38%)',
        }}
      >
        {/* Hero video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload={shouldLoadHeroVideo ? 'metadata' : 'none'}
          poster={heroVideoPoster}
          aria-hidden="true"
          tabIndex={-1}
          style={{
            position: 'absolute',
            inset: 0,
            width: '116%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '80% top',
            backgroundImage: `url(${heroVideoPoster})`,
            backgroundPosition: '80% top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            zIndex: 0,
          }}
        >
          {shouldLoadHeroVideo
            ? heroVideoSources.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))
            : null}
        </video>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, transparent, #F5EEDB)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Responsive overrides via style tag */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-left-resp { padding: 56px 32px !important; }
          .hero-h1-resp { font-size: 50px !important; }
        }
        @media (max-width: 640px) {
          .slimedo-hero-section { grid-template-columns: 1fr !important; min-height: 520px !important; position: relative !important; }
          .hero-right-resp {
            position: absolute !important;
            right: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 70% !important;
            height: 100% !important;
            z-index: 1 !important;
            mask-image: linear-gradient(to right, transparent 0%, black 80%) !important;
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 68%) !important;
          }
          .hero-left-resp { padding: 48px 20px !important; position: relative !important; z-index: 2 !important; }
          .hero-h1-resp { font-size: 38px !important; }
          .hero-trust-resp { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
          .hero-sub-resp { font-size: 15px !important; }
          .hero-badge-resp {
            font-size: 10px !important;
            padding: 5px 11px !important;
            letter-spacing: .06em !important;
            gap: 5px !important;
            margin-bottom: 18px !important;
            white-space: nowrap !important;
          }
          .hero-bullets-resp { gap: 9px !important; margin-bottom: 24px !important; }
          .hero-bullets-resp li { font-size: 13px !important; gap: 8px !important; }
          .hero-cta-btn-resp {
            font-size: 13px !important;
            padding: 13px 22px 13px 24px !important;
            border-radius: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
