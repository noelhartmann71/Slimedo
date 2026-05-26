import { useRef, useEffect, type ReactNode } from 'react';

interface ShieldItemProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  side: 'left' | 'right';
}

function ShieldItem({ title, subtitle, icon, side }: ShieldItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        flexDirection: side === 'left' ? 'row-reverse' : 'row',
        cursor: 'default',
        transition: 'transform .35s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = side === 'left' ? 'translateX(-4px)' : 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
      }}
    >
      {/* Shield SVG */}
      <svg
        viewBox="0 0 50 50"
        fill="none"
        style={{ width: 50, height: 50, flexShrink: 0, [side === 'left' ? 'marginLeft' : 'marginRight']: 4 }}
      >
        <path
          d="M25 4L8 11V23C8 34.5 15.5 43.5 25 46C34.5 43.5 42 34.5 42 23V11L25 4Z"
          fill="#CDDDCB"
          fillOpacity="0.13"
          stroke="#CDDDCB"
          strokeWidth="1.5"
          style={{ animation: 'slimedo-shield-shimmer 3.5s ease-in-out infinite' }}
        />
        <g style={{ animation: 'slimedo-shield-shimmer 3.5s ease-in-out 0.7s infinite' }}>
          {icon}
        </g>
      </svg>

      {/* Text */}
      <div
        style={{
          padding: '0 16px',
          textAlign: side === 'left' ? 'right' : 'left',
        }}
      >
        <h4
          style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: 15,
            fontWeight: 600,
            color: '#FAF5EA',
            marginBottom: 4,
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontSize: 12.5,
            color: 'rgba(205,221,203,0.55)',
            lineHeight: 1.4,
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

const leftItems: Omit<ShieldItemProps, 'side'>[] = [
  {
    title: 'Sichere Zahlung',
    subtitle: 'Stripe · PCI DSS Level 1',
    icon: (
      <>
        <rect x="16" y="21" width="18" height="12" rx="2" stroke="#CDDDCB" strokeWidth="1.5" />
        <line x1="16" y1="26" x2="34" y2="26" stroke="#CDDDCB" strokeWidth="1.5" />
        <line
          x1="18.5"
          y1="30"
          x2="22.5"
          y2="30"
          stroke="#CDDDCB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: 'Schweigepflicht',
    subtitle: 'Gesetzlich geschützt und vertraulich',
    icon: (
      <>
        <path
          d="M15 18H35C36.1 18 37 18.9 37 20V30C37 31.1 36.1 32 35 32H28L25 36L22 32H15C13.9 32 13 31.1 13 30V20C13 18.9 13.9 18 15 18Z"
          stroke="#CDDDCB"
          strokeWidth="1.5"
        />
        <rect x="22" y="22" width="6" height="5" rx="1" stroke="#CDDDCB" strokeWidth="1.3" />
        <path
          d="M23 22V21C23 19.9 23.9 19 25 19C26.1 19 27 19.9 27 21V22"
          stroke="#CDDDCB"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </>
    ),
  },
];

const rightItems: Omit<ShieldItemProps, 'side'>[] = [
  {
    title: 'Keine Datenweitergabe',
    subtitle: 'Kein Verkauf. Keine Weitergabe.',
    icon: (
      <>
        <rect x="17" y="26" width="16" height="11" rx="2" stroke="#CDDDCB" strokeWidth="1.5" />
        <path
          d="M20 26V23C20 20.8 22.2 19 25 19C27.8 19 30 20.8 30 23V26"
          stroke="#CDDDCB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="25" cy="31.5" r="1.5" fill="#CDDDCB" />
      </>
    ),
  },
  {
    title: 'Diskrete Abwicklung',
    subtitle: 'Anonym. Kein öffentlicher Eintrag.',
    icon: (
      <>
        <path
          d="M13 25C13 25 17 19 25 19C33 19 37 25 37 25C37 25 33 31 25 31C17 31 13 25 13 25Z"
          stroke="#CDDDCB"
          strokeWidth="1.5"
        />
        <line
          x1="14"
          y1="36"
          x2="36"
          y2="14"
          stroke="#CDDDCB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
];

export default function PrivacySection() {
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
      id="datenschutz"
      style={{
        background:
          'linear-gradient(145deg,#1E3A2E 0%,#234035 38%,#3D6B50 66%,#FAF5EA 100%)',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <header style={{ marginBottom: 64 }}>
          <p
            className="slimedo-anim"
            style={{
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '.16em',
              color: '#CDDDCB',
              marginBottom: 14,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Datenschutz &amp; Diskretion
          </p>
          <h2
            className="slimedo-anim slimedo-d1 priv-hl-resp"
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 62,
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: '-.01em',
              color: '#FAF5EA',
              marginBottom: 16,
            }}
          >
            Deine Gesundheit
            <br />
            bleibt{' '}
            <em style={{ color: '#CDDDCB', fontStyle: 'italic' }}>deine Sache.</em>
          </h2>
          <p
            className="slimedo-anim slimedo-d2"
            style={{
              fontSize: 16,
              color: 'rgba(205,221,203,.65)',
              maxWidth: 560,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            <strong style={{ color: 'rgba(205,221,203,.9)', fontWeight: 500 }}>
              Vertraulich.
            </strong>{' '}
            Ärztlich geschützt.{' '}
            <strong style={{ color: 'rgba(205,221,203,.9)', fontWeight: 500 }}>
              Niemals weitergegeben.
            </strong>
          </p>
        </header>

        {/* Three-column layout */}
        <div
          className="priv-layout-resp"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 220px 1fr',
            alignItems: 'center',
            gap: 0,
            maxWidth: 1040,
            margin: '0 auto',
          }}
        >
          {/* Left shield items */}
          <div
            className="slimedo-anim slimedo-d1"
            style={{ display: 'flex', flexDirection: 'column', gap: 48, alignItems: 'flex-end', paddingRight: 72 }}
          >
            {leftItems.map((item, i) => (
              <ShieldItem key={i} {...item} side="left" />
            ))}
          </div>

          {/* Central shield */}
          <div
            className="slimedo-anim slimedo-d2"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'slimedo-shield-glow 3s ease-in-out infinite alternate',
              opacity: 1,
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 200,
                height: 200,
                flexShrink: 0,
              }}
            >
            <svg
              viewBox="0 0 200 200"
              fill="none"
              width="200"
              height="200"
              style={{ width: '100%', height: '100%', display: 'block' }}
            >
              <path
                d="M100 12L30 38V88C30 132 58 164 100 178C142 164 170 132 170 88V38L100 12Z"
                fill="#FAF5EA"
                fillOpacity="0.92"
                stroke="#CDDDCB"
                strokeWidth="2.5"
                style={{ animation: 'slimedo-shield-shimmer 4s ease-in-out infinite' }}
              />
              <path
                d="M100 24L42 46V90C42 128 65 156 100 168C135 156 158 128 158 90V46L100 24Z"
                fill="none"
                stroke="#CDDDCB"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.5"
                style={{ animation: 'slimedo-shield-shimmer 4s ease-in-out 0.5s infinite' }}
              />
            </svg>
            <img
              src="/images/logo/cta-banner.png"
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -52%)',
                width: 96,
                height: 96,
                objectFit: 'contain',
                opacity: 0.85,
                pointerEvents: 'none',
              }}
            />
            </div>
          </div>

          {/* Right shield items */}
          <div
            className="slimedo-anim slimedo-d3"
            style={{ display: 'flex', flexDirection: 'column', gap: 48, alignItems: 'flex-start', paddingLeft: 72 }}
          >
            {rightItems.map((item, i) => (
              <ShieldItem key={i} {...item} side="right" />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .priv-layout-resp { grid-template-columns: 1fr !important; gap: 32px !important; }
          .priv-hl-resp { font-size: 48px !important; }
        }
        @media (max-width: 640px) {
          .priv-hl-resp { font-size: 40px !important; }
        }
      `}</style>
    </section>
  );
}

