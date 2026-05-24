import { useRef, useEffect } from 'react';

export default function CtaSection() {
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
      id="start"
      style={{
        background: '#1E3A2E',
        padding: '104px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glows */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 15% 50%,rgba(61,92,74,.3) 0%,transparent 60%),radial-gradient(ellipse at 85% 50%,rgba(61,92,74,.2) 0%,transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -30,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: '"Instrument Serif", Georgia, serif',
          fontSize: 'clamp(80px,18vw,220px)',
          fontWeight: 400,
          color: '#CDDDCB',
          opacity: 0.07,
          letterSpacing: '-.04em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        slimedo
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Logo circle */}
        <div
          className="slimedo-anim"
          style={{
            width: 80,
            height: 80,
            background: '#FAF5EA',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 36px',
            boxShadow: '0 4px 24px rgba(0,0,0,.15)',
          }}
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="17" cy="12" r="5" stroke="#1E3A2E" strokeWidth="2" />
            <path
              d="M7 34C7 34 7 24 17 24C27 24 27 34 27 34"
              stroke="#1E3A2E"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="29" cy="10" r="6" stroke="#1E3A2E" strokeWidth="2" />
            <path
              d="M20 34C20 34 20 22 29 22C38 22 38 34 38 34"
              stroke="#1E3A2E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2
          className="slimedo-anim slimedo-d1 cta-hl-resp"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 68,
            lineHeight: 1.02,
            fontWeight: 400,
            letterSpacing: '-.01em',
            color: '#FAF5EA',
            marginBottom: 20,
          }}
        >
          Bereit für deinen{' '}
          <em style={{ color: '#CDDDCB', fontStyle: 'italic' }}>Neuanfang?</em>
        </h2>

        <p
          className="slimedo-anim slimedo-d2"
          style={{
            fontSize: 17,
            color: 'rgba(205,221,203,.7)',
            marginBottom: 40,
            fontFamily: '"Inter", sans-serif',
          }}
        >
          Starte jetzt deine ärztlich begleitete Behandlung.
          <br />
          Diskret · ärztlich geprüft · direkt nach Hause.
        </p>

        <a
          href="#"
          className="slimedo-anim slimedo-d3"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: '#FAF5EA',
            color: '#1E3A2E',
            fontSize: 16,
            fontWeight: 600,
            padding: '18px 44px',
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(0,0,0,.2)',
            transition: 'background .2s,transform .15s',
            fontFamily: '"Inter", sans-serif',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = '#CDDDCB';
            el.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = '#FAF5EA';
            el.style.transform = 'translateY(0)';
          }}
        >
          Rezeptanfrage machen
          <span
            style={{
              width: 32,
              height: 32,
              background: '#1E3A2E',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="#FAF5EA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .cta-hl-resp { font-size: 40px !important; }
        }
      `}</style>
    </section>
  );
}
