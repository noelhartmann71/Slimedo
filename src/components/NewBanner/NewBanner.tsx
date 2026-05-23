import React, { useState, useEffect } from "react";
import BannerImage from "../../../public/images/slimedo/hero-design.png";

interface NewBannerProps {
  giftCode?: string;
}

// ── Icon components lifted outside to avoid re-creation on every render ──

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8" stroke="#2ecc71" strokeWidth="1.4" />
    <path
      d="M5.5 9L7.8 11.5L12.5 6"
      stroke="#2ecc71"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TruckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M1 4h10v9H1z"
      stroke="#2ecc71"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M11 7h3.5l2.5 3v3h-6V7z"
      stroke="#2ecc71"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <circle cx="4" cy="13.5" r="1.5" stroke="#2ecc71" strokeWidth="1.2" />
    <circle cx="13.5" cy="13.5" r="1.5" stroke="#2ecc71" strokeWidth="1.2" />
  </svg>
);

const PillIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect
      x="2"
      y="7"
      width="14"
      height="4"
      rx="2"
      stroke="#2ecc71"
      strokeWidth="1.3"
    />
    <path d="M9 7v4" stroke="#2ecc71" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M9 2l1.8 5h5.2l-4.2 3 1.6 5L9 12 4.6 15l1.6-5L2 7h5.2z"
      stroke="#2ecc71"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Badge definitions — single source of truth, used for both desktop and mobile ──

interface Badge {
  id: number;
  icon: React.ReactNode;
  title: string;
  sub?: string;
  pill?: string;
  posClass: string;
  floatClass: string;
}

const BADGES: Badge[] = [
  {
    id: 0,
    icon: <CheckIcon />,
    title: "Bestellung online in weniger als 5 Minuten",
    posClass: "nb2-tl",
    floatClass: "nb2-float-1",
  },
  {
    id: 1,
    icon: <TruckIcon />,
    title: "Diskrete & schnelle Lieferung in ganz Deutschland",
    pill: "GoExpress",
    posClass: "nb2-tr",
    floatClass: "nb2-float-2",
  },
  {
    id: 2,
    icon: <PillIcon />,
    title: "Alle Abnehmspritzen verfügbar",
    posClass: "nb2-bl",
    floatClass: "nb2-float-3",
  },
  {
    id: 3,
    icon: <StarIcon />,
    title: "Rezept für 29,99€",
    sub: "Kein versteckter Aufpreis",
    posClass: "nb2-br",
    floatClass: "nb2-float-4",
  },
];

// ── Component ──

const NewBanner: React.FC<NewBannerProps> = ({ giftCode }) => {
  const [activeBadge, setActiveBadge] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBadge((prev) => (prev + 1) % BADGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Outfit:wght@400;500;600;700&display=swap');

        .nb2 *, .nb2 *::before, .nb2 *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nb2 {
          font-family: 'Outfit', sans-serif;
          background: #f7f4ef;
          color: #1a2116;
          width: 100%;
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .nb2-hero {
          background: #fefcf8;
          position: relative;
          overflow: hidden;
          padding: 60px 48px 110px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .nb2-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .nb2-blob-1 {
          width: 620px; height: 620px;
          top: -140px; left: 50%; transform: translateX(-50%);
          background: radial-gradient(circle, rgba(46,204,113,0.14) 0%, transparent 68%);
        }
        .nb2-blob-2 {
          width: 320px; height: 320px;
          top: 20px; right: -80px;
          background: radial-gradient(circle, rgba(46,204,113,0.07) 0%, transparent 70%);
        }
        .nb2-blob-3 {
          width: 260px; height: 260px;
          bottom: 60px; left: -60px;
          background: radial-gradient(circle, rgba(237,233,224,0.95) 0%, transparent 70%);
        }

        .nb2-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1080px;
        }

        /* Trustpilot */
        .nb2-tp {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 20px;
          animation: nb2FadeUp .55s ease both;
        }
        .nb2-stars { display: flex; gap: 3px; }
        .nb2-star {
          width: 22px; height: 22px;
          background: #00b67a;
          clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
        }
        .nb2-tp-lbl { font-size: 13px; color: #8a9e85; font-weight: 500; }

        /* Headline */
        .nb2-h1 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(26px, 4.2vw, 52px);
          font-weight: 800;
          text-align: center;
          line-height: 1.1;
          color: #1a2116;
          max-width: 680px;
          margin-bottom: 30px;
          letter-spacing: -0.4px;
          animation: nb2FadeUp .55s .1s ease both;
        }
        .nb2-h1-g { color: #227C31; }

        /* CTA area */
        .nb2-cta-wrap {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          margin-bottom: 50px;
          animation: nb2FadeUp .55s .18s ease both;
        }
        .nb2-btn {
          background: #166534;
          border: none;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 16px; font-weight: 700;
          cursor: pointer;
          padding: 15px 38px;
          border-radius: 50px;
          letter-spacing: .2px;
          box-shadow: 0 4px 22px rgba(46,204,113,.28);
          transition: background .2s, transform .15s, box-shadow .2s;
          white-space: nowrap;
        }
        .nb2-btn:hover { background: #1da956; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(46,204,113,.32); }
        .nb2-btn:active { transform: translateY(0); }

        /* Gift code */
        .nb2-gift {
          display: flex; align-items: center; gap: 8px;
          background: #fff;
          border: 1.5px solid #2ecc71;
          color: #1da956;
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 600;
          cursor: pointer;
          padding: 8px 20px;
          border-radius: 50px;
          transition: background .2s;
        }
        .nb2-gift:hover { background: #e8faf0; }
        .nb2-gift-code {
          background: #2ecc71; color: #fff;
          padding: 2px 10px; border-radius: 20px;
          font-size: 12px; font-weight: 700; letter-spacing: .5px;
        }

        /* ── STAGE ── */
        .nb2-stage {
          position: relative;
          width: 100%; max-width: 660px;
          min-height: 400px;
          display: flex; align-items: flex-end; justify-content: center;
          animation: nb2FadeUp .55s .26s ease both;
        }

        .nb2-circle {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 345px; height: 365px;
          border-radius: 50%;
          background: #227C31;
          z-index: 1;
        }

        .nb2-person {
          position: relative; z-index: 2;
          width: 340px; height: 400px;
          object-fit: cover;
        }

        /* ── BADGES ── */
        .nb2-card {
          position: absolute;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(46,204,113,.22);
          border-radius: 14px;
          padding: 11px 14px;
          display: flex; align-items: flex-start; gap: 10px;
          box-shadow: 0 4px 22px rgba(26,33,22,.07);
          z-index: 4;
          min-width: 165px; max-width: 208px;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(.34,1.56,.64,1);
          animation-duration: .65s;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .nb2-card:hover { box-shadow: 0 12px 32px rgba(26,33,22,.12), 0 0 0 1.5px rgba(46,204,113,.3); }
        .nb2-card-ico {
          width: 34px; height: 34px;
          background: #e8faf0; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; border: 1px solid #d0f5e3;
        }
        .nb2-card-ttl { font-size: 12.5px; font-weight: 600; color: #1a2116; line-height: 1.35; }
        .nb2-card-sub { font-size: 11px; color: #8a9e85; margin-top: 2px; }
        .nb2-card-pill {
          display: inline-block; background: #2ecc71; color: #fff;
          font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; margin-top: 4px;
        }

        .nb2-tl { left: 0; top: 55px; animation-name: nb2SlideL; animation-delay: .38s; }
        .nb2-tr { right: 0; top: 20px; animation-name: nb2SlideR; animation-delay: .52s; }
        .nb2-bl { left: 28px; bottom: 65px; animation-name: nb2SlideL; animation-delay: .66s; }
        .nb2-br { right: 0; bottom: 65px; animation-name: nb2SlideR; animation-delay: .80s; }

        .nb2-float-1 { animation: nb2f1 4s ease-in-out infinite; }
        .nb2-float-2 { animation: nb2f2 4.6s ease-in-out .5s infinite; }
        .nb2-float-3 { animation: nb2f3 5s ease-in-out 1s infinite; }
        .nb2-float-4 { animation: nb2f4 4.8s ease-in-out .3s infinite; }

        /* ── STATS BAR ── */
        .nb2-stats {
          position: absolute;
          bottom: -10px; left: 50%; transform: translateX(-50%);
          background: #fff;
          border: 1px solid rgba(46,204,113,.18);
          border-radius: 16px 16px 0 0;
          display: flex; align-items: center;
          z-index: 5;
          box-shadow: 0 -4px 18px rgba(26,33,22,.05);
          min-width: 510px;
          overflow: hidden;
        }
        .nb2-stat {
          display: flex; align-items: center; gap: 9px;
          padding: 13px 28px;
          border-right: 1px solid rgba(46,204,113,.14);
          font-size: 13px; font-weight: 600; color: #1a2116;
          white-space: nowrap;
        }
        .nb2-stat:last-child { border-right: none; }
        .nb2-stat-lbl { font-size: 11px; color: #8a9e85; font-weight: 400; display: block; }
        .nb2-stat-ico {
          width: 28px; height: 28px; background: #e8faf0;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* ── KEYFRAMES ── */
        @keyframes nb2FadeUp { from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)} }
        @keyframes nb2SlideL { from{opacity:0;transform:translateX(-28px) scale(.92)}to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes nb2SlideR { from{opacity:0;transform:translateX(28px) scale(.92)}to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes nb2f1 { 0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(0)} }
        @keyframes nb2f2 { 0%,100%{transform:translateY(0) rotate(1deg)}50%{transform:translateY(-10px) rotate(.5deg)} }
        @keyframes nb2f3 { 0%,100%{transform:translateY(0) rotate(.5deg)}50%{transform:translateY(-7px) rotate(-.5deg)} }
        @keyframes nb2f4 { 0%,100%{transform:translateY(0) rotate(-.5deg)}50%{transform:translateY(-9px) rotate(1deg)} }
        @keyframes nb2Pop { from{opacity:0;transform:scale(.86) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)} }

        /* ── MOBILE ── */
        @media (max-width: 700px) {
          .nb2-hero { padding: 36px 20px 96px; }
          .nb2-h1 { font-size: 26px; }
          .nb2-stage { min-height: 300px; flex-direction: column; align-items: center; }
          .nb2-circle { width: 400px; height: 400px; }
          .nb2-person { width: 200px; height: 200px; }

          /* hide all positioned badges; only the active one shows as inline card */
          .nb2-tl, .nb2-tr, .nb2-bl, .nb2-br { display: none !important; }
          .nb2-card-mobile {
            display: flex !important;
            position: relative !important;
            left: auto !important; right: auto !important;
            top: auto !important; bottom: auto !important;
            width: 88%; max-width: 290px;
            margin: 14px auto 0;
            animation: nb2Pop .4s cubic-bezier(.34,1.56,.64,1) both !important;
          }

          /* stats bar: hide middle stat on mobile */
          .nb2-stats { min-width: unset; width: calc(100% - 32px); }
          .nb2-stat-hide { display: none; }
          .nb2-stat { padding: 11px 18px; font-size: 12px; }
        }
      `}</style>

      <div className="nb2">
        <section className="nb2-hero">
          <div className="nb2-blob nb2-blob-1" />
          <div className="nb2-blob nb2-blob-2" />
          <div className="nb2-blob nb2-blob-3" />

          <div className="nb2-inner">
            {/* Trustpilot */}
            <div className="nb2-tp">
              <div className="nb2-stars">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="nb2-star" />
                ))}
              </div>
              <span className="nb2-tp-lbl">Trustpilot</span>
            </div>

            {/* Headline */}
            <h1 className="nb2-h1">
              Abnehmen auf Rezept bequem &amp;{" "}
              <span className="nb2-h1-g">günstig online bestellen</span>
            </h1>

            {/* CTA */}
            <div className="nb2-cta-wrap">
              <button className="nb2-btn">Jetzt Rezept erhalten →</button>
              {giftCode && (
                <button className="nb2-gift">
                  🎁 Geschenkcode einlösen
                  <span className="nb2-gift-code">{giftCode}</span>
                </button>
              )}
            </div>

            {/* Stage */}
            <div className="nb2-stage">
              <div className="nb2-circle" />

              {/* Person illustration */}
              <div className="nb2-person">
                <img
                  src={BannerImage}
                  alt="Slimedo Hero"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Badges — rendered from the single BADGES array */}
              {BADGES.map((badge) => (
                <div
                  key={badge.id}
                  className={[
                    "nb2-card",
                    badge.posClass,
                    badge.floatClass,
                    activeBadge === badge.id ? "nb2-card-mobile" : "",
                  ]
                    .join(" ")
                    .trim()}
                >
                  <div className="nb2-card-ico">{badge.icon}</div>
                  <div>
                    <div className="nb2-card-ttl">{badge.title}</div>
                    {badge.sub && (
                      <div className="nb2-card-sub">{badge.sub}</div>
                    )}
                    {badge.pill && (
                      <span className="nb2-card-pill">{badge.pill}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Stats bar */}
              <div className="nb2-stats">
                <div className="nb2-stat">
                  <div className="nb2-stat-ico">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1.5C7 1.5 2 4 2 8a5 5 0 0010 0c0-4-5-6.5-5-6.5z"
                        stroke="#1da956"
                        strokeWidth="1.3"
                      />
                      <path
                        d="M4.5 8L6 9.5L9.5 6"
                        stroke="#1da956"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    +50.000 Kunden
                    <span className="nb2-stat-lbl">Vertrauen uns</span>
                  </div>
                </div>

                {/* Hidden on mobile */}
                <div className="nb2-stat nb2-stat-hide">
                  <div className="nb2-stat-ico">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle
                        cx="7"
                        cy="7"
                        r="5.5"
                        stroke="#1da956"
                        strokeWidth="1.3"
                      />
                      <path
                        d="M4.5 7L6 8.5L9.5 5"
                        stroke="#1da956"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    Deutsche ÄrztInnen
                    <span className="nb2-stat-lbl">
                      Zertifiziert &amp; geprüft
                    </span>
                  </div>
                </div>

                <div className="nb2-stat">
                  <div className="nb2-stat-ico">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect
                        x="2.5"
                        y="4.5"
                        width="9"
                        height="8"
                        rx="1.5"
                        stroke="#1da956"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M5 4.5V3.5a2 2 0 014 0v1"
                        stroke="#1da956"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <circle cx="7" cy="9" r="1" fill="#1da956" />
                    </svg>
                  </div>
                  <div>
                    100% sicher
                    <span className="nb2-stat-lbl">DSGVO-konform</span>
                  </div>
                </div>
              </div>
            </div>
            {/* /stage */}
          </div>
          {/* /inner */}
        </section>
      </div>
    </>
  );
};

export default NewBanner;
