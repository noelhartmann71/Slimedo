import { useRef, useEffect, type ReactNode, type CSSProperties } from 'react';

interface ShieldItemProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  side: 'left' | 'right';
  className?: string;
  style?: CSSProperties;
}

type Point = {
  x: number;
  y: number;
};

type OrbitTrack = {
  start: Point;
  c1: Point;
  c2: Point;
  end: Point;
  delay: number;
};

const ORBIT_DURATION_MS = 1400;
const ORBIT_STAGGERS_MS = [0, 110, 220, 330] as const;
const REVEAL_TRIGGER_VIEWPORT_RATIO = 0.7;
const ORBIT_TRIGGER_TOP_RATIO = 0.62;
const ORBIT_TRIGGER_BOTTOM_RATIO = 0.28;
const ORBIT_CURVE_PRESETS = [
  { bend: -160, lift: -82 },
  { bend: -180, lift: 72 },
  { bend: 160, lift: -82 },
  { bend: 180, lift: 72 },
] as const;

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function buildBezierPath(start: Point, c1: Point, c2: Point, end: Point) {
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function bezierPoint(track: OrbitTrack, t: number): Point {
  const u = 1 - t;
  return {
    x: u * u * u * track.start.x + 3 * u * u * t * track.c1.x + 3 * u * t * t * track.c2.x + t * t * t * track.end.x,
    y: u * u * u * track.start.y + 3 * u * u * t * track.c1.y + 3 * u * t * t * track.c2.y + t * t * t * track.end.y,
  };
}

function deriveBezierControls(start: Point, end: Point, index: number) {
  const preset = ORBIT_CURVE_PRESETS[index] ?? ORBIT_CURVE_PRESETS[0];
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dist = Math.max(Math.hypot(dx, dy), 1);
  const nx = dx / dist;
  const ny = dy / dist;
  const px = -ny;
  const py = nx;

  return {
    c1: {
      x: start.x + dx * 0.26 + px * preset.bend * 0.62,
      y: start.y + dy * 0.22 + py * preset.bend * 0.42 + preset.lift,
    },
    c2: {
      x: start.x + dx * 0.74 + px * preset.bend * 0.2,
      y: start.y + dy * 0.82 + py * preset.bend * 0.2 + preset.lift * 0.52,
    },
  };
}

function attachMediaListener(query: MediaQueryList, listener: () => void) {
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }

  query.addListener(listener);
  return () => query.removeListener(listener);
}

function setCirclePosition(el: SVGCircleElement | null, point: Point) {
  if (!el) return;
  el.setAttribute('cx', point.x.toFixed(2));
  el.setAttribute('cy', point.y.toFixed(2));
}

function ShieldItem({ title, subtitle, icon, side, className, style }: ShieldItemProps) {
  const isLeft = side === 'left';

  return (
    <div
      className={className}
      style={{
        padding: '0',
        minHeight: 0,
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexDirection: isLeft ? 'row-reverse' : 'row',
          transition: 'transform .35s cubic-bezier(.32,.72,0,1)',
          transform: 'translate3d(0,0,0)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = isLeft ? 'translate3d(-5px,0,0)' : 'translate3d(5px,0,0)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translate3d(0,0,0)';
        }}
      >
        <svg
          viewBox="0 0 50 50"
          fill="none"
          style={{
            width: 64,
            height: 64,
            flexShrink: 0,
            filter: 'drop-shadow(0 6px 14px rgba(9,20,16,0.2))',
          }}
        >
          <path
            d="M25 4L8 11V23C8 34.5 15.5 43.5 25 46C34.5 43.5 42 34.5 42 23V11L25 4Z"
            fill="#CDDDCB"
            fillOpacity="0.12"
            stroke="#CDDDCB"
            strokeWidth="1.5"
            style={{ animation: 'slimedo-shield-shimmer 3.5s ease-in-out infinite' }}
          />
          <g style={{ animation: 'slimedo-shield-shimmer 3.5s ease-in-out 0.65s infinite' }}>{icon}</g>
        </svg>

        <div
          style={{
            padding: isLeft ? '0 8px 0 0' : '0 0 0 8px',
            textAlign: isLeft ? 'right' : 'left',
            minWidth: 0,
          }}
        >
          <h4
            style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: 17,
              lineHeight: 1.2,
              fontWeight: 600,
              color: '#FAF5EA',
              marginBottom: 5,
            }}
          >
            {title}
          </h4>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(205,221,203,0.6)',
              lineHeight: 1.45,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function MobilePrivacyCard({
  title,
  subtitle,
  icon,
  className,
  style,
}: Omit<ShieldItemProps, 'side'> & { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={className}
      style={{
        borderRadius: 26,
        border: '1px solid rgba(205,221,203,0.22)',
        background:
          'linear-gradient(160deg, rgba(250,245,234,0.12) 0%, rgba(205,221,203,0.08) 52%, rgba(30,58,46,0.16) 100%)',
        boxShadow: '0 14px 30px rgba(10,22,18,0.18), inset 0 1px 0 rgba(255,255,255,0.1)',
        backdropFilter: 'blur(9px)',
        WebkitBackdropFilter: 'blur(9px)',
        padding: '20px 14px 18px',
        minHeight: 230,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        ...style,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <svg
          viewBox="0 0 50 50"
          fill="none"
          style={{ width: 56, height: 56, filter: 'drop-shadow(0 5px 12px rgba(9,20,16,0.16))' }}
        >
          <path
            d="M25 4L8 11V23C8 34.5 15.5 43.5 25 46C34.5 43.5 42 34.5 42 23V11L25 4Z"
            fill="#CDDDCB"
            fillOpacity="0.1"
            stroke="#CDDDCB"
            strokeWidth="1.5"
          />
          {icon}
        </svg>
      </div>

      <div
        style={{
          minHeight: 122,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <h4
          style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: 'clamp(17px, 2.1vw, 19px)',
            lineHeight: 1.17,
            fontWeight: 600,
            color: '#FAF5EA',
            marginBottom: 11,
            wordBreak: 'normal',
            overflowWrap: 'break-word',
            hyphens: 'none',
          }}
        >
          {title}
        </h4>

        <p
          style={{
            fontSize: 'clamp(12.5px, 1.85vw, 14px)',
            lineHeight: 1.35,
            color: 'rgba(205,221,203,0.68)',
            fontFamily: '"Inter", sans-serif',
            wordBreak: 'normal',
            overflowWrap: 'break-word',
            hyphens: 'none',
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function CentralShield({ size = 200 }: { size?: number }) {
  const logoSize = Math.round(size * 0.48);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        width={size}
        height={size}
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
          width: logoSize,
          height: logoSize,
          objectFit: 'contain',
          opacity: 0.86,
          pointerEvents: 'none',
        }}
      />
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
        <line x1="18.5" y1="30" x2="22.5" y2="30" stroke="#CDDDCB" strokeWidth="1.5" strokeLinecap="round" />
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
        <line x1="14" y1="36" x2="36" y2="14" stroke="#CDDDCB" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
];

export default function PrivacySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const orbitalStageRef = useRef<HTMLDivElement | null>(null);
  const centerShieldRef = useRef<HTMLDivElement | null>(null);
  const trailSvgRef = useRef<SVGSVGElement | null>(null);

  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const trailPathRefs = useRef<Array<SVGPathElement | null>>([]);
  const trailDotRefs = useRef<Array<SVGCircleElement | null>>([]);

  const tracksRef = useRef<OrbitTrack[]>([]);
  const trailLengthsRef = useRef<number[]>([]);

  const rafRef = useRef<number | null>(null);
  const hasOrbitalStartedRef = useRef(false);
  const hasOrbitalFinishedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animTargets = section.querySelectorAll<HTMLElement>('.slimedo-anim, .priv-mobile-pop');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('played');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -18% 0px' }
    );

    animTargets.forEach((el) => {
      const styles = window.getComputedStyle(el);
      const hiddenByLayout = styles.display === 'none' || styles.visibility === 'hidden';
      if (hiddenByLayout) {
        observer.observe(el);
        return;
      }

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * REVEAL_TRIGGER_VIEWPORT_RATIO) {
        el.classList.add('played');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = orbitalStageRef.current;
    const centerShield = centerShieldRef.current;

    if (!section || !stage || !centerShield) return;

    const mobileQuery = window.matchMedia('(max-width: 639px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const isOrbitalDisabled = () => mobileQuery.matches || reducedMotionQuery.matches;

    const setTrailVisibility = (index: number, visible: boolean) => {
      const path = trailPathRefs.current[index];
      const dot = trailDotRefs.current[index];

      if (path) {
        path.style.opacity = visible ? '0.72' : '0';
      }

      if (dot) {
        dot.style.opacity = visible ? '0.9' : '0';
      }
    };

    const setFinalState = () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.transform = 'translate3d(0,0,0) scale(1)';
        card.style.opacity = '1';
        card.style.willChange = 'auto';
      });

      ORBIT_STAGGERS_MS.forEach((_, index) => setTrailVisibility(index, false));
    };

    const prepareTracks = () => {
      const cards = cardRefs.current;
      const hasMissingCard = cards.some((card) => !card);
      if (hasMissingCard || !orbitalStageRef.current || !centerShieldRef.current) return false;

      const stageRect = orbitalStageRef.current.getBoundingClientRect();
      trailSvgRef.current?.setAttribute('viewBox', `0 0 ${stageRect.width} ${stageRect.height}`);
      const centerRect = centerShieldRef.current.getBoundingClientRect();

      const start: Point = {
        x: centerRect.left + centerRect.width / 2 - stageRect.left,
        y: centerRect.top + centerRect.height / 2 - stageRect.top,
      };

      const nextTracks: OrbitTrack[] = cards.map((card, index) => {
        const rect = (card as HTMLDivElement).getBoundingClientRect();
        const icon = (card as HTMLDivElement).querySelector<SVGSVGElement>('svg');
        const targetRect = icon?.getBoundingClientRect() ?? rect;
        const end: Point = {
          x: targetRect.left + targetRect.width / 2 - stageRect.left,
          y: targetRect.top + targetRect.height / 2 - stageRect.top,
        };

        const { c1, c2 } = deriveBezierControls(start, end, index);

        return {
          start,
          c1,
          c2,
          end,
          delay: ORBIT_STAGGERS_MS[index] ?? 0,
        };
      });

      tracksRef.current = nextTracks;

      nextTracks.forEach((track, index) => {
        const card = cards[index];
        if (!card) return;

        const startPoint = bezierPoint(track, 0);
        card.style.transform = `translate3d(${(startPoint.x - track.end.x).toFixed(2)}px, ${(startPoint.y - track.end.y).toFixed(2)}px, 0) scale(0.96)`;
        card.style.opacity = '0.98';
        card.style.willChange = 'transform';

        const path = trailPathRefs.current[index];
        if (path) {
          path.setAttribute('d', buildBezierPath(track.start, track.c1, track.c2, track.end));
          path.style.strokeDasharray = '0';
          path.style.strokeDashoffset = '0';
          const len = path.getTotalLength();
          trailLengthsRef.current[index] = len;
          path.style.strokeDasharray = `${len}`;
          path.style.strokeDashoffset = `${len}`;
          path.style.opacity = '0';
        }

        setCirclePosition(trailDotRefs.current[index], startPoint);
        setTrailVisibility(index, false);
      });

      return true;
    };

    const runOrbitalAnimation = () => {
      if (hasOrbitalStartedRef.current || hasOrbitalFinishedRef.current) return;
      if (isOrbitalDisabled()) {
        setFinalState();
        hasOrbitalFinishedRef.current = true;
        return;
      }
      if (!prepareTracks()) return;

      hasOrbitalStartedRef.current = true;

      const startTime = performance.now();
      const totalWindow = ORBIT_DURATION_MS + ORBIT_STAGGERS_MS[ORBIT_STAGGERS_MS.length - 1];

      const step = (now: number) => {
        const elapsed = now - startTime;
        let activeFlights = 0;

        tracksRef.current.forEach((track, index) => {
          const card = cardRefs.current[index];
          const path = trailPathRefs.current[index];
          const dot = trailDotRefs.current[index];

          if (!card) return;

          const localElapsed = elapsed - track.delay;
          if (localElapsed <= 0) {
            const p = bezierPoint(track, 0);
            card.style.transform = `translate3d(${(p.x - track.end.x).toFixed(2)}px, ${(p.y - track.end.y).toFixed(2)}px, 0) scale(0.96)`;
            setCirclePosition(dot, p);
            setTrailVisibility(index, false);
            activeFlights += 1;
            return;
          }

          if (localElapsed < ORBIT_DURATION_MS) {
            const normalized = localElapsed / ORBIT_DURATION_MS;
            const eased = easeInOutSine(Math.min(Math.max(normalized, 0), 1));
            const point = bezierPoint(track, eased);

            card.style.transform = `translate3d(${(point.x - track.end.x).toFixed(2)}px, ${(point.y - track.end.y).toFixed(2)}px, 0) scale(${(0.96 + eased * 0.04).toFixed(3)})`;
            setCirclePosition(dot, point);

            if (path) {
              const length = trailLengthsRef.current[index] ?? path.getTotalLength();
              path.style.strokeDashoffset = `${Math.max(length * (1 - eased), 0)}`;
              path.style.opacity = `${(0.74 - eased * 0.22).toFixed(3)}`;
            }

            setTrailVisibility(index, true);
            activeFlights += 1;
            return;
          }

          card.style.transform = 'translate3d(0,0,0) scale(1)';
          setTrailVisibility(index, false);
        });

        if (elapsed < totalWindow + 180 && activeFlights > 0) {
          rafRef.current = requestAnimationFrame(step);
          return;
        }

        setFinalState();
        hasOrbitalStartedRef.current = false;
        hasOrbitalFinishedRef.current = true;
        rafRef.current = null;
      };

      rafRef.current = requestAnimationFrame(step);
    };

    const orbitalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runOrbitalAnimation();
            if (hasOrbitalFinishedRef.current || hasOrbitalStartedRef.current) {
              orbitalObserver.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    const stageRect = stage.getBoundingClientRect();
    if (stageRect.top < window.innerHeight * ORBIT_TRIGGER_TOP_RATIO && stageRect.bottom > window.innerHeight * ORBIT_TRIGGER_BOTTOM_RATIO) {
      runOrbitalAnimation();
    }

    if (!hasOrbitalFinishedRef.current) {
      if (!isOrbitalDisabled()) {
        requestAnimationFrame(() => {
          if (!hasOrbitalStartedRef.current && !hasOrbitalFinishedRef.current) {
            prepareTracks();
          }
        });
      } else {
        setFinalState();
        hasOrbitalFinishedRef.current = true;
      }

      orbitalObserver.observe(stage);
    }

    const handleResize = () => {
      if (hasOrbitalFinishedRef.current || hasOrbitalStartedRef.current || isOrbitalDisabled()) return;
      requestAnimationFrame(() => {
        prepareTracks();
      });
    };

    const handleMediaChange = () => {
      if (!isOrbitalDisabled()) return;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      hasOrbitalStartedRef.current = false;
      setFinalState();
      hasOrbitalFinishedRef.current = true;
    };

    window.addEventListener('resize', handleResize);
    const detachMobileListener = attachMediaListener(mobileQuery, handleMediaChange);
    const detachReducedListener = attachMediaListener(reducedMotionQuery, handleMediaChange);

    return () => {
      orbitalObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      detachMobileListener();
      detachReducedListener();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <section
      className="priv-section"
      ref={sectionRef}
      id="datenschutz"
      style={{
        background: 'linear-gradient(145deg,#1E3A2E 0%,#234035 38%,#3D6B50 66%,#FAF5EA 100%)',
        padding: 'clamp(72px, 6vw, 130px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="priv-inner" style={{ maxWidth: 1800, margin: '0 auto', padding: '0 40px' }}>
        <header className="priv-header" style={{ marginBottom: 56, textAlign: 'center' }}>
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
              fontSize: 'clamp(48px, 3.75vw, 100px)',
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: '-.01em',
              color: '#FAF5EA',
              marginBottom: 16,
            }}
          >
            Deine Gesundheit
            <br />
            bleibt <em style={{ color: '#CDDDCB', fontStyle: 'italic' }}>deine Sache.</em>
          </h2>
          <p
            className="slimedo-anim slimedo-d2 priv-sub-resp"
            style={{
              fontSize: 16,
              color: 'rgba(205,221,203,.65)',
              maxWidth: 560,
              margin: '0 auto',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            <strong style={{ color: 'rgba(205,221,203,.9)', fontWeight: 500 }}>Vertraulich.</strong> Ärztlich geschützt.{' '}
            <strong style={{ color: 'rgba(205,221,203,.9)', fontWeight: 500 }}>Niemals weitergegeben.</strong>
          </p>
        </header>

        <div
          ref={orbitalStageRef}
          className="priv-desktop-stage"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'minmax(260px, 1fr) 260px minmax(260px, 1fr)',
            alignItems: 'center',
          }}
        >
          <svg
            ref={trailSvgRef}
            aria-hidden="true"
            viewBox="0 0 1060 560"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              overflow: 'visible',
            }}
          >
            <defs>
              <linearGradient id="privacy-orbit-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(205,221,203,0.08)" />
                <stop offset="55%" stopColor="rgba(205,221,203,0.72)" />
                <stop offset="100%" stopColor="rgba(250,245,234,0.24)" />
              </linearGradient>
              <filter id="privacy-orbit-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {ORBIT_STAGGERS_MS.map((_, index) => (
              <path
                key={`path-${index}`}
                ref={(el) => {
                  trailPathRefs.current[index] = el;
                }}
                d=""
                fill="none"
                stroke="url(#privacy-orbit-stroke)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#privacy-orbit-glow)"
                opacity="0"
              />
            ))}

            {ORBIT_STAGGERS_MS.map((_, index) => (
              <circle
                key={`dot-${index}`}
                ref={(el) => {
                  trailDotRefs.current[index] = el;
                }}
                r="3.8"
                fill="rgba(250,245,234,0.92)"
                opacity="0"
                filter="url(#privacy-orbit-glow)"
              />
            ))}
          </svg>

          <div className="priv-col-left" style={{ display: 'flex', flexDirection: 'column', gap: 56, alignItems: 'flex-end', paddingRight: 88 }}>
            <div
              ref={(el) => {
                cardRefs.current[0] = el;
              }}
              style={{ width: '100%', maxWidth: 360, opacity: 0 }}
            >
              <ShieldItem {...leftItems[0]} side="left" />
            </div>
            <div
              ref={(el) => {
                cardRefs.current[1] = el;
              }}
              style={{ width: '100%', maxWidth: 360, opacity: 0 }}
            >
              <ShieldItem {...leftItems[1]} side="left" />
            </div>
          </div>

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
            <div ref={centerShieldRef}>
              <CentralShield size={240} />
            </div>
          </div>

          <div className="priv-col-right" style={{ display: 'flex', flexDirection: 'column', gap: 56, alignItems: 'flex-start', paddingLeft: 88 }}>
            <div
              ref={(el) => {
                cardRefs.current[2] = el;
              }}
              style={{ width: '100%', maxWidth: 360, opacity: 0 }}
            >
              <ShieldItem {...rightItems[0]} side="right" />
            </div>
            <div
              ref={(el) => {
                cardRefs.current[3] = el;
              }}
              style={{ width: '100%', maxWidth: 360, opacity: 0 }}
            >
              <ShieldItem {...rightItems[1]} side="right" />
            </div>
          </div>
        </div>

        <div className="priv-mobile-stage">
          <div
            className="priv-mobile-shield-wrap"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 44,
            }}
          >
            <CentralShield size={240} />
          </div>

          <div className="priv-mobile-grid">
            <MobilePrivacyCard
              {...leftItems[0]}
              className="priv-mobile-pop"
              style={{ '--priv-pop-delay': '0ms' } as CSSProperties}
            />
            <MobilePrivacyCard
              {...leftItems[1]}
              className="priv-mobile-pop"
              style={{ '--priv-pop-delay': '95ms' } as CSSProperties}
            />
            <MobilePrivacyCard
              {...rightItems[0]}
              className="priv-mobile-pop"
              style={{ '--priv-pop-delay': '190ms' } as CSSProperties}
            />
            <MobilePrivacyCard
              {...rightItems[1]}
              className="priv-mobile-pop"
              style={{ '--priv-pop-delay': '285ms' } as CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* ── Weicher Nebelübergang nach unten ─────────────────────
          Löst den harten Abschluss des 145°-Diagonalgradienten auf
          und überführt die Section sanft in das Sand-Beige
          der nachfolgenden LifestyleSection.
          pointer-events: none → keine Interaktionsblockade.
      ─────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 72,
          background:
            'linear-gradient(to bottom,' +
            'rgba(250,245,234,0) 0%,' +
            'rgba(250,245,234,0.18) 42%,' +
            'rgba(250,245,234,0.62) 70%,' +
            'rgba(250,245,234,0.90) 88%,' +
            '#FAF5EA 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <style>{`
        /* faster reveals within this section */
        .priv-section .slimedo-anim.played {
          animation-duration: 0.45s !important;
        }

        .priv-mobile-stage {
          display: none;
        }

        .priv-mobile-shield-wrap {
          opacity: 1;
          transform: none;
        }

        .priv-mobile-pop {
          opacity: 0;
          transform: translate3d(0, 18px, 0) scale(0.95);
        }

        .priv-mobile-pop.played {
          animation: priv-mobile-pop .62s cubic-bezier(.32,.72,0,1) both;
          animation-delay: var(--priv-pop-delay, 0ms);
        }

        @keyframes priv-mobile-pop {
          0% {
            opacity: 0;
            transform: translate3d(0, 20px, 0) scale(0.93);
            filter: saturate(.92);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
            filter: saturate(1);
          }
        }

        /* MacBook 14" (~1280–1520px) */
        @media (min-width: 1280px) and (max-width: 1520px) {
          .priv-section { padding-top: 52px !important; padding-bottom: 52px !important; }
          .priv-header { margin-bottom: 36px !important; }
          .priv-hl-resp { font-size: 44px !important; }
          .priv-desktop-stage {
            grid-template-columns: minmax(220px, 1fr) 200px minmax(220px, 1fr) !important;
          }
          .priv-col-left { padding-right: 48px !important; gap: 36px !important; }
          .priv-col-right { padding-left: 48px !important; gap: 36px !important; }
        }

        /* MacBook 16" (~1600–1800px) */
        @media (min-width: 1600px) and (max-width: 1800px) {
          .priv-section { padding-top: 60px !important; padding-bottom: 60px !important; }
          .priv-header { margin-bottom: 44px !important; }
          .priv-hl-resp { font-size: 52px !important; }
          .priv-col-left { padding-right: 68px !important; gap: 44px !important; }
          .priv-col-right { padding-left: 68px !important; gap: 44px !important; }
        }

        @media (max-width: 1120px) {
          .priv-desktop-stage {
            grid-template-columns: minmax(230px, 1fr) 230px minmax(230px, 1fr) !important;
          }

          .priv-col-left {
            padding-right: 56px !important;
          }

          .priv-col-right {
            padding-left: 56px !important;
          }

          .priv-hl-resp {
            font-size: 48px !important;
          }
        }

        @media (max-width: 860px) {
          .priv-desktop-stage {
            grid-template-columns: minmax(214px, 1fr) 180px minmax(214px, 1fr) !important;
          }

          .priv-col-left {
            padding-right: 36px !important;
            gap: 40px !important;
          }

          .priv-col-right {
            padding-left: 36px !important;
            gap: 40px !important;
          }
        }

        @media (max-width: 639px) {
          .priv-section {
            padding: 80px 0 92px !important;
          }

          .priv-inner {
            padding: 0 18px !important;
          }

          .priv-header {
            text-align: center;
            margin-bottom: 44px !important;
          }

          .priv-hl-resp {
            font-size: 66px !important;
            line-height: 1.04 !important;
            margin-bottom: 18px !important;
          }

          .priv-sub-resp {
            font-size: 17px !important;
            line-height: 1.5 !important;
            max-width: 31ch !important;
            margin: 0 auto;
            color: rgba(205,221,203,.72) !important;
          }

          .priv-desktop-stage {
            display: none !important;
          }

          .priv-mobile-stage {
            display: block;
            margin-top: 6px;
          }

          .priv-mobile-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }
        }

        @media (max-width: 460px) {
          .priv-section {
            padding: 72px 0 82px !important;
          }

          .priv-inner {
            padding: 0 14px !important;
          }

          .priv-hl-resp {
            font-size: 46px !important;
          }

          .priv-sub-resp {
            font-size: 14.5px !important;
          }

          .priv-mobile-grid {
            gap: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .priv-mobile-pop,
          .priv-mobile-pop.played {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
