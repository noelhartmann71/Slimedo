import { useRef, useEffect, useState } from 'react';

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

/* ── Animated list-item for the Slimedo (left) card ── */
function AnimatedCheckItem({ item, index, visible }: { item: string; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '5px 8px 5px 4px',
        marginLeft: -4,
        borderRadius: 8,
        background: hovered ? 'rgba(61,92,74,0.065)' : 'transparent',
        transition: 'background 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        cursor: 'default',
        opacity: visible ? undefined : 0,
        animationName: visible ? 'warum-item-in' : 'none',
        animationDuration: '0.38s',
        animationTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
        animationFillMode: 'both',
        animationDelay: `${0.04 + index * 0.08}s`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          transform: hovered ? 'translateX(5px) translateY(-2px)' : 'translateX(0)',
          transition: 'transform 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* Icon bubble */}
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
            background: hovered ? 'rgba(61,92,74,0.22)' : 'rgba(61,92,74,0.1)',
            color: '#3D5C4A',
            boxShadow: hovered ? '0 0 10px rgba(61,92,74,0.35)' : 'none',
            transform: hovered ? 'scale(1.12)' : 'scale(1)',
            transition:
              'background 0.35s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.35s cubic-bezier(0.32, 0.72, 0, 1), transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          <CheckIcon delay={0.08 + index * 0.05} />
        </span>
        {/* Label */}
        <span
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 14.5,
            lineHeight: 1.5,
            color: hovered ? '#0A1A10' : '#1A1A1A',
            fontWeight: hovered ? 500 : 400,
            transition: 'color 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          {item}
        </span>
      </div>
    </li>
  );
}

/* ── Animated list-item for the "Andere" (right) card ── */
function AnimatedXItem({ item, index, visible }: { item: string; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '5px 8px 5px 4px',
        marginLeft: -4,
        borderRadius: 8,
        background: hovered ? 'rgba(255,255,255,0.025)' : 'transparent',
        transition: 'background 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        cursor: 'default',
        opacity: visible ? undefined : 0,
        animationName: visible ? 'warum-item-in' : 'none',
        animationDuration: '0.38s',
        animationTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
        animationFillMode: 'both',
        animationDelay: `${0.06 + index * 0.08}s`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          transform: hovered ? 'translateX(3px)' : 'translateX(0)',
          transition: 'transform 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
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
            background: hovered ? 'rgba(181,101,75,0.25)' : 'rgba(181,101,75,0.15)',
            transition: 'background 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          <XIcon />
        </span>
        <span
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 14,
            lineHeight: 1.5,
            color: hovered ? 'rgba(205,221,203,0.78)' : 'rgba(205,221,203,0.60)',
            fontWeight: 400,
            transition: 'color 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          {item}
        </span>
      </div>
    </li>
  );
}

/* ════════════════════════════════════════════════════════════════ */

export default function WarumWirSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const leftUlRef = useRef<HTMLUListElement | null>(null);
  const rightUlRef = useRef<HTMLUListElement | null>(null);
  const [leftHovered, setLeftHovered] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  /* ── IntersectionObserver: entry animations ── */
  useEffect(() => {
    const section = sectionRef.current;
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

  /* ── Scroll reveal: trigger list items when each <ul> enters viewport ── */
  useEffect(() => {
    const targets = [
      { ref: leftUlRef, set: setLeftVisible },
      { ref: rightUlRef, set: setRightVisible },
    ];
    const observers = targets.map(({ ref, set }) => {
      const el = ref.current;
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            set(true);
            obs.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  /* ── Shimmer sweep: re-trigger the CSS animation on every hover-in ── */
  useEffect(() => {
    const card = leftCardRef.current;
    if (!card || !leftHovered) return;
    const shimmer = card.querySelector<HTMLElement>('.warum-shimmer');
    if (!shimmer) return;
    shimmer.classList.remove('warum-shimmer--run');
    // Force a reflow so the browser resets the animation
    void shimmer.offsetWidth;
    shimmer.classList.add('warum-shimmer--run');
  }, [leftHovered]);

  return (
    <section
      ref={sectionRef}
      className="warum-section-resp"
      style={{
        background: '#1E3A2E',
        padding: 'clamp(72px, 5.88vw, 130px) 0 clamp(78px, 6.38vw, 143px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section background radial glow (bottom-right) */}
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
          maxWidth: 1800,
          margin: '0 auto',
          padding: '0 40px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* ── Header ── */}
        <header
          className="warum-header-resp"
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
              fontSize: 'clamp(48px, 3.75vw, 100px)',
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

        {/* ── Comparison grid ── */}
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

          {/* ════ LEFT CARD WRAPPER ════
              The wrapper carries the entry animation (.slimedo-anim) so the
              inner card div can own hover transforms without conflicting with
              the CSS `slimedo-fade-up` keyframe (which also animates `transform`).
          */}
          <div
            className="slimedo-anim slimedo-d1"
            style={{
              position: 'relative',
              // Elevate above the right card when hovered (scale-up overlap)
              zIndex: leftHovered ? 10 : undefined,
            }}
          >
            {/* ── Backlight L1: close warm glow — primary halo ── */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-44px -32px',
                background:
                  'radial-gradient(ellipse at 45% 38%, rgba(237,216,154,0.62) 0%, rgba(237,216,154,0.3) 42%, transparent 72%)',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: leftHovered ? 1 : 0.72,
                filter: 'blur(34px)',
                transition: 'opacity 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            />
            {/* ── Backlight L2: wide diffuse halo — always breathing ── */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-75px -58px',
                background:
                  'radial-gradient(ellipse at 50% 42%, rgba(237,216,154,0.36) 0%, rgba(205,221,203,0.16) 50%, transparent 76%)',
                pointerEvents: 'none',
                zIndex: 0,
                filter: 'blur(40px)',
                opacity: 0.45,
                animation: 'warum-aura-breathe 4.5s ease-in-out infinite',
              }}
            />
            {/* ── Backlight L3: floor glow — light pooling beneath the card ── */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: -24,
                left: '6%',
                width: '88%',
                height: 52,
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(237,216,154,0.5) 0%, rgba(237,216,154,0.18) 55%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: leftHovered ? 1 : 0.55,
                filter: 'blur(18px)',
                transition: 'opacity 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            />

            {/* ── The actual Slimedo card ── */}
            <div
              ref={leftCardRef}
              onMouseEnter={() => setLeftHovered(true)}
              onMouseLeave={() => setLeftHovered(false)}
              className="warum-card-pad-left"
              style={{
                background: '#FAF5EA',
                clipPath: 'polygon(0 0, calc(100% - 44px) 0, 100% 44px, 100% 100%, 0 100%)',
                borderRadius: '0 0 24px 24px',
                padding: '40px 36px 44px',
                position: 'relative',
                overflow: 'visible',
                // Hover transform: only set inline when hovered to avoid
                // fighting with the parent's entry animation transform.
                transform: leftHovered
                  ? 'scale(1.028) translate(4px, -10px)'
                  : undefined,
                // Base: warm glow even at rest. Hover: intense double-ring blaze.
                filter: leftHovered
                  ? 'drop-shadow(0 0 28px rgba(237,216,154,0.55)) drop-shadow(7px 14px 0 #C8BC9E) drop-shadow(0 20px 40px rgba(0,0,0,0.32))'
                  : 'drop-shadow(0 0 12px rgba(237,216,154,0.25)) drop-shadow(7px 9px 0 #C8BC9E) drop-shadow(0 8px 20px rgba(0,0,0,0.18))',
                transition:
                  'transform 0.55s cubic-bezier(0.32, 0.72, 0, 1), filter 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            >
              {/* Shimmer sweep — one-shot on each hover-in, driven by CSS class */}
              <div
                aria-hidden="true"
                className="warum-shimmer"
                style={{
                  position: 'absolute',
                  top: '-5%',
                  left: '-45%',
                  width: '35%',
                  height: '110%',
                  background:
                    'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.16) 50%, transparent 80%)',
                  pointerEvents: 'none',
                  zIndex: 5,
                  willChange: 'transform',
                }}
              />

              {/* LED pulse glow — intensifies on hover */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-15%',
                  left: '-10%',
                  width: '80%',
                  height: '60%',
                  background: leftHovered
                    ? 'radial-gradient(ellipse at 30% 30%, rgba(237,216,154,0.58) 0%, rgba(237,216,154,0.24) 40%, transparent 70%)'
                    : 'radial-gradient(ellipse at 30% 30%, rgba(237,216,154,0.35) 0%, rgba(237,216,154,0.12) 40%, transparent 70%)',
                  pointerEvents: 'none',
                  animation: 'slimedo-led-pulse 3.5s ease-in-out infinite',
                  borderRadius: '50%',
                  zIndex: 0,
                  transition: 'background 0.55s cubic-bezier(0.32, 0.72, 0, 1)',
                }}
              />

              {/* Top edge light line — brightens on hover */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '8%',
                  right: '16%', // leave space for diagonal cut
                  height: 1,
                  background: leftHovered
                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), rgba(255,255,255,0.6), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  pointerEvents: 'none',
                  zIndex: 6,
                  transition: 'background 0.55s cubic-bezier(0.32, 0.72, 0, 1)',
                }}
              />

              {/* Left edge light line */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '5%',
                  left: 0,
                  width: 1,
                  height: '80%',
                  background: leftHovered
                    ? 'linear-gradient(180deg, transparent, rgba(255,255,255,0.72), rgba(255,255,255,0.32), transparent)'
                    : 'linear-gradient(180deg, transparent, rgba(255,255,255,0.22), transparent)',
                  pointerEvents: 'none',
                  zIndex: 6,
                  transition: 'background 0.55s cubic-bezier(0.32, 0.72, 0, 1)',
                }}
              />

              {/* Diagonal cut corner (top-right) */}
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
                    fontSize: 30,
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    color: '#1E3A2E',
                  }}
                >
                  Slimedo
                </span>
              </div>

              {/* Feature list */}
              <ul
                ref={leftUlRef}
                className="warum-list-gap"
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
                  <AnimatedCheckItem key={i} item={item} index={i} visible={leftVisible} />
                ))}
              </ul>
            </div>
          </div>

          {/* ════ RIGHT CARD ("Andere Anbieter") ════
              Dims and gently recedes when the left card is hovered.
              Uses `undefined` for opacity/filter when not dimmed so the
              .slimedo-anim entry animation can control those properties freely.
          */}
          <div
            className="slimedo-anim slimedo-d2 warum-card-pad-right"
            style={{
              background: '#162B20',
              clipPath: 'polygon(44px 0, 100% 0, 100% 100%, 0 100%, 0 44px)',
              borderRadius: '0 24px 24px 0',
              border: '1px solid rgba(205,221,203,0.07)',
              padding: '52px 36px 44px',
              position: 'relative',
              overflow: 'visible',
              // Recede when left card is hovered; no own hover lift (removed
              // to keep the left-card-dominant interaction clean)
              transform: leftHovered
                ? 'scale(0.982) translateY(-3px)'
                : undefined,
              opacity: leftHovered ? 0.76 : undefined,
              filter: leftHovered ? 'brightness(0.82) saturate(0.88)' : undefined,
              transition:
                'transform 0.55s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.55s cubic-bezier(0.32, 0.72, 0, 1), filter 0.55s cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
            {/* Cut corner (top-left) */}
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

            {/* Feature list */}
            <ul
              ref={rightUlRef}
              className="warum-list-gap"
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 13,
              }}
            >
              {anderenItems.map((item, i) => (
                <AnimatedXItem key={i} item={item} index={i} visible={rightVisible} />
              ))}
            </ul>
          </div>
        </div>

        {/* ── CTA ── */}
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
            href="/product/select"
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
        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .warum-hl-resp { font-size: 48px !important; }
        }
        @media (max-width: 640px) {
          .warum-section-resp { padding: 44px 0 !important; }
          .warum-header-resp { margin-bottom: 28px !important; }
          .warum-grid-resp { grid-template-columns: 1fr !important; gap: 12px !important; }
          .warum-hl-resp  { font-size: 30px !important; }
        }

        /* MacBook 14" */
        @media (min-width: 1280px) and (max-width: 1520px) {
          .warum-section-resp { padding-top: 48px !important; padding-bottom: 48px !important; }
          .warum-hl-resp { font-size: 44px !important; }
          .warum-header-resp { margin-bottom: 32px !important; }
          .warum-grid-resp { gap: 14px !important; margin-bottom: 28px !important; }
          .warum-card-pad-left { padding: 28px 28px 32px !important; }
          .warum-card-pad-right { padding: 36px 28px 32px !important; }
          .warum-list-gap { gap: 8px !important; }
        }

        /* MacBook 16" */
        @media (min-width: 1600px) and (max-width: 1800px) {
          .warum-section-resp { padding-top: 56px !important; padding-bottom: 56px !important; }
          .warum-hl-resp { font-size: 52px !important; }
          .warum-header-resp { margin-bottom: 38px !important; }
          .warum-grid-resp { gap: 16px !important; margin-bottom: 32px !important; }
          .warum-card-pad-left { padding: 32px 32px 36px !important; }
          .warum-card-pad-right { padding: 40px 32px 36px !important; }
          .warum-list-gap { gap: 10px !important; }
        }

        /* ── List-item scroll reveal ── */
        @keyframes warum-item-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Backlight halo: slow breathing pulse on the wide aura layer ── */
        @keyframes warum-aura-breathe {
          0%, 100% { opacity: 0.55; transform: scale(1);    }
          50%       { opacity: 0.88; transform: scale(1.05); }
        }

        /* ── Shimmer sweep: one-shot across the left card on hover ── */
        @keyframes warum-shimmer-run {
          from {
            transform: translateX(0) skewX(-12deg);
            opacity: 1;
          }
          to {
            transform: translateX(520%) skewX(-12deg);
            opacity: 0;
          }
        }
        .warum-shimmer--run {
          animation: warum-shimmer-run 0.72s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
      `}</style>
    </section>
  );
}
