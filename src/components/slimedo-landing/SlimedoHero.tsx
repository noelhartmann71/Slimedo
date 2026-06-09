import { useEffect, useRef, useState } from 'react';

const heroVideoPoster = '/images/slimedo/slimedohero-poster.webp';
const heroVideoSources = [
  { src: '/images/slimedo/slimedohero.webm', type: 'video/webm' },
  { src: '/images/slimedo/slimedohero-optimized.mp4', type: 'video/mp4' },
];

const bullets = [
  'Ärztliche Prüfung',
  'Zugelassene Medikamente',
  'Diskret nach Hause geliefert',
];

const trustItems = [
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="9" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 5V3.5C4 2.1 5 1 6.5 1C8 1 9 2.1 9 3.5V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="6.5" cy="8.2" r="0.85" fill="currentColor" />
      </svg>
    ),
    label: 'DSGVO-konform',
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <rect x="1" y="2" width="11" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4.5 12h4M6.5 9v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M5.5 5h2M6.5 4v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    label: 'Telemedizin-Plattform',
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 4v5.4a4.75 4.75 0 0 0 9.5 0V4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 4H7M16.5 4H18" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M11.75 14.2v1.35A4.45 4.45 0 0 0 16.2 20H17" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="19" cy="19" r="2.25" stroke="currentColor" strokeWidth="2.1" />
      </svg>
    ),
    label: 'Approbierte Ärzt:innen',
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M6.5 1L2 3.5V6.5C2 9.5 4 12 6.5 13C9 12 11 9.5 11 6.5V3.5L6.5 1Z" stroke="currentColor" strokeWidth="1.2" />
        <polyline points="3.5,6.5 5.5,8.5 9.5,4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: '100 % diskret & vertraulich',
  },
];

export default function SlimedoHero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const badge1Ref = useRef<HTMLDivElement | null>(null);
  const badge2Ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);
  const [connector, setConnector] = useState<{
    path: string;
    sx: number; sy: number;
    ex: number; ey: number;
  } | null>(null);

  useEffect(() => {
    const calc = () => {
      const section = containerRef.current;
      const b1 = badge1Ref.current;
      const b2 = badge2Ref.current;
      if (!section || !b1 || !b2) return;
      if (window.getComputedStyle(b1).display === 'none') { setConnector(null); return; }
      const sr = section.getBoundingClientRect();
      const r1 = b1.getBoundingClientRect();
      const r2 = b2.getBoundingClientRect();
      const sx = r1.left + r1.width / 2 - sr.left;
      const sy = r1.bottom - sr.top;
      const ex = r2.left + r2.width / 2 - sr.left;
      const ey = r2.top - sr.top;
      const dx = ex - sx;
      const dy = ey - sy;
      setConnector({
        path: `M ${sx} ${sy} C ${sx + dx * 0.15} ${sy + dy * 0.45}, ${sx + dx * 0.85} ${sy + dy * 0.55}, ${ex} ${ey}`,
        sx, sy, ex, ey,
      });
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.querySelectorAll<HTMLElement>('.slimedo-anim').forEach((el) => {
      setTimeout(() => el.classList.add('played'), 100);
    });

    const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (connection.connection?.saveData || prefersReducedMotion.matches) return;

    const idleWindow = window as Window & typeof globalThis & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };

    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;
    const load = () => setShouldLoadHeroVideo(true);

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(load, { timeout: 1200 });
    } else {
      timeoutHandle = window.setTimeout(load, 700);
    }

    return () => {
      if (idleHandle !== undefined && idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(idleHandle);
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
      className="
        relative grid overflow-hidden bg-sand
        grid-cols-[50%_50%] grid-rows-[1fr_auto]
        min-h-[clamp(800px,92vh,1100px)]
        max-sm:grid-cols-1 max-sm:min-h-[100svh]
      "
    >
      {/* Subtle radial tint overlays */}
      <div className="hero-overlay-1 absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
      <div className="hero-overlay-2 absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      {/* ── Left column ── */}
      <div className="
        flex flex-col justify-center relative z-[2]
        pl-20 pr-14 py-[120px]
        max-lg:pl-12 max-lg:pr-10 max-lg:py-[80px]
        max-sm:pl-5 max-sm:pr-5 max-sm:pt-9 max-sm:pb-7 max-sm:justify-between
      ">

        {/* Pill badge */}
        <span className="
          slimedo-anim slimedo-d1
          inline-flex items-center gap-2 w-fit
          bg-sage/10 border border-sage/20 rounded-full
          px-5 py-[10px]
          text-[15px] font-medium text-sage tracking-[.08em] mb-10
          max-sm:text-xs max-sm:px-3 max-sm:py-[6px] max-sm:mb-3
        ">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <polyline
              points="2,6 4.5,8.5 10,3.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Einfach · Sicher · Digital
        </span>

        {/* H1 */}
        <h1 className="
          slimedo-anim slimedo-d2
          font-instrument font-normal text-ink leading-[1.07] tracking-[.005em]
          text-[clamp(46px,4vw,88px)]
          mb-12
          max-sm:text-[38px] max-sm:mb-3.5 max-sm:max-w-[80%]
        ">
          Mit der <em className="text-sage italic">Abnehmspritze</em><br />
          zu einem gesünderen<br />
          Körpergefühl
        </h1>

        {/* Bullet list */}
        <ul className="
          slimedo-anim slimedo-d3
          list-none p-0 m-0 mb-14
          flex flex-col gap-[22px]
          max-sm:gap-[9px] max-sm:mb-4 max-sm:max-w-[60%]
        ">
          {bullets.map((text, i) => (
            <li
              key={i}
              className="flex items-center gap-4 text-[21px] text-[#3A3730] max-sm:text-[15px] max-sm:gap-[9px]"
            >
              <span className="
                inline-flex items-center justify-center shrink-0
                w-[26px] h-[26px] rounded-full border border-sage/35
              ">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <polyline
                    points="2,6 4.5,8.5 10,3.5"
                    stroke="#3D5C4A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {text}
            </li>
          ))}
        </ul>

        {/* CTA row */}
        <div className="
          slimedo-anim slimedo-d4
          flex items-center gap-4 flex-wrap
          max-sm:gap-3
        ">
          <a
            href="/product/select"
            className="
              hero-cta
              inline-flex items-center gap-3 no-underline
              text-cream text-[19px] font-medium tracking-[.005em]
              pl-12 pr-11 py-[24px] rounded-full
              max-sm:text-[15px] max-sm:pl-[26px] max-sm:pr-6 max-sm:py-3.5 max-sm:rounded-full
            "
          >
            Rezept anfragen
            <span className="flex items-center opacity-85">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
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
        </div>
      </div>

      {/* ── Right column — video ── */}
      <div className="
        hero-video-col relative overflow-hidden
        max-sm:absolute max-sm:right-0 max-sm:top-0 max-sm:bottom-0
        max-sm:w-[70%] max-sm:h-full max-sm:z-[1]
      ">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload={shouldLoadHeroVideo ? 'metadata' : 'none'}
          poster={heroVideoPoster}
          aria-hidden="true"
          tabIndex={-1}
          className="
            hero-video
            absolute inset-0 w-[116%] h-full
            object-cover object-[80%_top]
            max-sm:object-[65%_top]
          "
        >
          {shouldLoadHeroVideo
            ? heroVideoSources.map((s) => <source key={s.src} src={s.src} type={s.type} />)
            : null}
        </video>
      </div>

      {/* ── Dynamic connector SVG — path calculated from actual badge positions ── */}
      {connector && (
        <svg
          className="absolute inset-0 w-full h-full z-[4] pointer-events-none overflow-visible"
          aria-hidden="true"
          fill="none"
        >
          <path d={connector.path} stroke="#C8BC9E" strokeWidth="1.5" strokeDasharray="4 5" strokeLinecap="round"/>
        </svg>
      )}

      {/* ── Floating badge 1 — Rezeptgebühr (upper, further right) ── */}
      <div
        ref={badge1Ref}
        className="
          hero-badge-1
          absolute left-[37%] max-2xl:left-[48%] max-xl:left-[45%] max-lg:left-[41%] top-[30%] z-[5]
          flex items-center gap-4
          bg-white rounded-2xl p-4 pr-6 min-w-[240px]
          shadow-[0_8px_32px_rgba(0,0,0,.11),_0_1px_4px_rgba(0,0,0,.04)]
          max-md:hidden
        "
        aria-hidden="true"
      >
        <span className="
          inline-flex items-center justify-center shrink-0
          w-[60px] h-[60px] rounded-xl bg-[#F5F3EE]
        ">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <rect x="4" y="2" width="14" height="18" rx="2" stroke="#3D5C4A" strokeWidth="1.5" />
            <path d="M8 7h6M8 11h6M8 15h4" stroke="#3D5C4A" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
        <div>
          <p className="m-0 p-0 text-[14px] text-[#888888] leading-[1.3]">Rezeptgebühr</p>
          <p className="m-0 p-0 text-[23px] font-bold text-ink leading-[1.2] tracking-[-0.02em]">29 €</p>
        </div>
      </div>

      {/* ── Floating badge 2 — Medikament (lower, further left) ── */}
      <div
        ref={badge2Ref}
        className="
          hero-badge-2
          absolute left-[27%] max-2xl:left-[40%] max-xl:left-[39%] max-lg:left-[35%] top-[54%] z-[5]
          flex items-center gap-4
          bg-white rounded-2xl p-4 pr-6 min-w-[240px]
          shadow-[0_8px_32px_rgba(0,0,0,.11),_0_1px_4px_rgba(0,0,0,.04)]
          max-md:hidden
        "
        aria-hidden="true"
      >
        <span className="
          inline-flex items-center justify-center shrink-0 overflow-hidden
          w-[60px] h-[60px] rounded-xl bg-[#F5F3EE]
        ">
          <img
            src="/images/therapie/injection2t.png"
            alt=""
            className="w-9 h-9 object-contain"
          />
        </span>
        <div>
          <p className="m-0 p-0 text-[14px] text-[#888888] leading-[1.3]">Medikament</p>
          <p className="m-0 p-0 text-[23px] font-bold text-ink leading-[1.2] tracking-[-0.02em]">ab 171,96 €</p>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-sand pointer-events-none z-[2]"
        aria-hidden="true"
      />

      {/* ── Full-width trust bar ── */}
      <div className="
        slimedo-anim slimedo-d5
        hero-trust-bar
        col-span-full flex items-center flex-nowrap
        bg-transparent
        px-20 pt-12 pb-9 -mt-24 z-[8] relative overflow-visible
        max-lg:px-12 max-lg:-mt-20
        max-sm:px-5 max-sm:pt-9 max-sm:pb-6 max-sm:-mt-14
      ">
        {trustItems.map((item, i) => (
          <span
            key={item.label}
            className={`
              hero-trust-item
              ${i < trustItems.length - 1 ? 'hero-trust-item--divided' : ''}
              flex items-center gap-4
              text-[17px] text-olive whitespace-nowrap cursor-default font-[450]
              max-sm:text-[13px] max-sm:mb-1.5
            `}
          >
            <span className="hero-trust-icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </span>
        ))}
      </div>

      {/* ─────────────────────────────────────────────
          CSS-only styles: mask-image, gradients, keyframes
          — things Tailwind cannot express
          ───────────────────────────────────────────── */}
      <style>{`
        /* Radial tint overlays */
        .hero-overlay-1 {
          background: radial-gradient(ellipse at 75% 40%, rgba(61,92,74,.10) 0%, rgba(61,92,74,.04) 35%, transparent 65%);
        }
        .hero-overlay-2 {
          background: radial-gradient(ellipse at 20% 50%, rgba(237,216,154,.13) 0%, rgba(237,216,154,.04) 40%, transparent 65%);
        }

        /* Video column left-edge fade */
        .hero-video-col {
          mask-image: linear-gradient(to right, transparent 0%, black 38%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 38%);
        }
        @media (max-width: 640px) {
          .hero-video-col {
            mask-image: linear-gradient(to right, transparent 0%, black 68%) !important;
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 68%) !important;
          }
        }

        /* CTA primary button */
        .hero-cta {
          background: linear-gradient(160deg, #4A6E58 0%, #3D5C4A 55%, #324E3F 100%);
          box-shadow: 0 4px 16px rgba(30,58,46,.22), 0 1px 0 rgba(255,255,255,.06) inset;
          transition: box-shadow .25s, transform .2s;
        }
        .hero-cta:hover {
          box-shadow: 0 8px 28px rgba(30,58,46,.32), 0 1px 0 rgba(255,255,255,.06) inset;
          transform: translateY(-2px);
        }

        /* Secondary link gap animation */
        .hero-secondary-link {
          gap: 5px;
          transition: gap .15s;
        }
        .hero-secondary-link:hover { gap: 9px; }

        /* Trust badges: flat row with top rule and separators, matching the reference */
        .hero-trust-bar {
          overflow: visible;
          flex-wrap: nowrap;
        }
        .hero-trust-bar::before {
          content: "";
          position: absolute;
          top: 0;
          left: 80px;
          right: 80px;
          height: 1px;
          background: linear-gradient(
            to right,
            #E5D9BD 0%,
            #E5D9BD 48%,
            rgba(229,217,189,.62) 58%,
            rgba(229,217,189,0) 72%
          );
          pointer-events: none;
        }
        .hero-trust-item {
          position: relative;
          z-index: 9;
          flex: 0 0 auto;
          padding: 0;
          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;
          transition: color .2s, transform .2s;
        }
        .hero-trust-item--divided {
          padding-right: clamp(22px, 3vw, 46px);
          margin-right: clamp(22px, 3vw, 46px);
        }
        .hero-trust-item--divided::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          width: 1px;
          height: 34px;
          background: #E5D9BD;
          transform: translateY(-50%);
        }
        .hero-trust-icon {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          background: rgba(61,92,74,.08);
        }
        .hero-trust-icon svg {
          width: 22px;
          height: 22px;
        }
        .hero-trust-item:hover {
          color: #3D5C4A;
          transform: translateY(-1px);
        }
        @media (max-width: 1440px) {
          .hero-trust-bar {
            width: 70%;
            max-width: 70%;
            padding-left: clamp(40px, 5vw, 72px);
            padding-right: 0;
          }
          .hero-trust-bar::before {
            left: clamp(40px, 5vw, 72px);
            right: 0;
          }
          .hero-trust-item {
            gap: clamp(7px, .75vw, 11px);
            font-size: clamp(11px, .98vw, 14px);
          }
          .hero-trust-item--divided {
            padding-right: clamp(10px, 1.35vw, 18px);
            margin-right: clamp(10px, 1.35vw, 18px);
          }
          .hero-trust-item--divided::after {
            height: clamp(24px, 2.3vw, 30px);
          }
          .hero-trust-icon {
            width: clamp(30px, 2.8vw, 40px);
            height: clamp(30px, 2.8vw, 40px);
          }
          .hero-trust-icon svg {
            width: clamp(15px, 1.45vw, 19px);
            height: clamp(15px, 1.45vw, 19px);
          }
        }
        @media (max-width: 1024px) {
          .hero-trust-bar {
            width: 70%;
            max-width: 70%;
            padding-left: 48px;
            padding-right: 0;
          }
          .hero-trust-bar::before {
            left: 48px;
            right: 0;
          }
          .hero-trust-item {
            gap: 7px;
            font-size: 10.5px;
          }
          .hero-trust-item--divided {
            padding-right: 10px;
            margin-right: 10px;
          }
          .hero-trust-icon {
            width: 30px;
            height: 30px;
          }
          .hero-trust-icon svg {
            width: 15px;
            height: 15px;
          }
        }
        @media (max-width: 640px) {
          .hero-trust-bar {
            width: 70%;
            max-width: 70%;
            padding-left: 20px;
            padding-right: 0;
            overflow: hidden;
          }
          .hero-trust-bar::before {
            left: 20px;
            right: 0;
          }
          .hero-trust-item {
            gap: 5px;
            font-size: 8px;
          }
          .hero-trust-item--divided {
            padding-right: 6px;
            margin-right: 6px;
          }
          .hero-trust-item--divided::after {
            height: 22px;
          }
          .hero-trust-icon {
            width: 22px;
            height: 22px;
          }
          .hero-trust-icon svg {
            width: 12px;
            height: 12px;
          }
        }

        /* Floating badge keyframes */
        @keyframes hero-float-a {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes hero-float-b {
          0%, 100% { transform: translateY(-4px); }
          50%       { transform: translateY(-13px); }
        }
        .hero-badge-1 { animation: hero-float-a 5.5s ease-in-out 0.4s infinite; }
        .hero-badge-2 { animation: hero-float-b 6.5s ease-in-out 1.1s infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hero-badge-1, .hero-badge-2 { animation: none; }
        }
      `}</style>
    </section>
  );
}
