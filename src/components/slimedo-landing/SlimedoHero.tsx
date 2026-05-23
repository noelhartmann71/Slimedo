import { useEffect, useRef } from 'react';

const trustItems = [
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
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
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
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
    label: 'Deutsche, approbierte Ärzte',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
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
];

export default function SlimedoHero() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const anims = container.querySelectorAll<HTMLElement>('.slimedo-anim');
    anims.forEach((el) => {
      setTimeout(() => el.classList.add('played'), 100);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        background: '#F5EEDB',
        display: 'grid',
        gridTemplateColumns: '58% 42%',
        minHeight: '90vh',
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
          padding: '88px 48px 88px 64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Badge */}
        <span
          className="slimedo-anim slimedo-d1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(61,92,74,.1)',
            border: '1px solid rgba(61,92,74,.18)',
            padding: '7px 16px',
            borderRadius: 999,
            fontSize: 12,
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
          Ärztlich begleitet · 100% diskret
        </span>

        {/* H1 */}
        <h1
          className="slimedo-anim slimedo-d2 hero-h1-resp"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 66,
            lineHeight: 1.07,
            fontWeight: 400,
            letterSpacing: '.005em',
            color: '#1A1A1A',
            marginBottom: 26,
          }}
        >
          Dein Weg zu einem
          <br />
          gesünderen{' '}
          <em style={{ color: '#3D5C4A', fontStyle: 'italic' }}>Körpergefühl.</em>
        </h1>

        {/* Subtitle */}
        <p
          className="slimedo-anim slimedo-d3 hero-sub-resp"
          style={{
            fontSize: 17,
            color: '#6E6A60',
            lineHeight: 1.65,
            marginBottom: 40,
            maxWidth: 430,
            fontFamily: '"Inter", sans-serif',
          }}
        >
          Ärztlich verschriebene GLP-1-Therapie (sog. Abnehmspritze) — diskret, klinisch geprüft
          und direkt nach Hause geliefert.
        </p>

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
            className="btn-sage-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background:
                'linear-gradient(160deg,#4A6E58 0%,#3D5C4A 55%,#324E3F 100%)',
              color: '#FAF5EA',
              fontSize: 15,
              fontWeight: 500,
              padding: '18px 32px 18px 36px',
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
            Behandlung starten{' '}
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
              fontSize: 14,
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
                fontSize: 12.5,
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

      {/* Right — video / image placeholder */}
      <div
        className="hero-right-resp"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* Sand gradient overlay on left edge */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background:
              'linear-gradient(to right,#F5EEDB 0%,rgba(245,238,219,.5) 15%,transparent 40%)',
          }}
        />
        {/* Hero image */}
        <img
          src="/images/slimedo/hero-design.png"
          alt="Slimedo – ärztliche GLP-1 Therapie"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
          onError={(e) => {
            // Fallback placeholder if image not found
            const parent = (e.target as HTMLImageElement).parentElement!;
            (e.target as HTMLImageElement).style.display = 'none';
            parent.style.background = 'linear-gradient(150deg,#C5D5C0,#98B895)';
          }}
        />
        {/* Fallback video placeholder */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            zIndex: 0,
            background: 'linear-gradient(150deg,#C5D5C0,#98B895)',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.2)',
              border: '1.5px solid rgba(255,255,255,.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M8 6l10 5-10 5V6Z" fill="white" opacity="0.8" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: 12,
              fontWeight: 600,
              color: 'rgba(30,58,46,.4)',
              textTransform: 'uppercase',
              letterSpacing: '.12em',
            }}
          >
            Video · Slimedo
          </span>
        </div>
      </div>

      {/* Responsive overrides via style tag */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-left-resp { padding: 56px 32px !important; }
          .hero-h1-resp { font-size: 52px !important; }
        }
        @media (max-width: 640px) {
          section[style*="58% 42%"] { grid-template-columns: 1fr !important; min-height: auto !important; }
          .hero-right-resp { height: 300px !important; }
          .hero-left-resp { padding: 48px 20px !important; }
          .hero-h1-resp { font-size: 38px !important; }
          .hero-trust-resp { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
          .hero-sub-resp { font-size: 15px !important; }
        }
      `}</style>
    </section>
  );
}
