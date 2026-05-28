import { useEffect, useRef } from 'react';

const leftPoints = [
  'Ärztlich verschriebenes Rezept — von approbierten Ärzt:innen in Deutschland',
  'Diskreter Versand direkt zu dir nach Hause — ohne Arztbesuch',
  'Laufende ärztliche Begleitung mit individueller Dosisanpassung',
  'Klinisch geprüfte Wirkstoffe — verschreibungspflichtig und reguliert',
];

const offerPoints = [
  {
    title: 'Digitales E-Rezept',
    text: 'QES-signiert von approbierten Ärzt:innen in Deutschland',
  },
  {
    title: 'Expressversand inklusive',
    text: 'direkt über Versandapotheke, 1–2 Werktage, neutrale Verpackung',
  },
  {
    title: 'Ärztliche Begleitung',
    text: 'laufende Betreuung und individuelle Dosisanpassung',
  },
];

function CheckIcon({ strokeWidth = 2 }: { strokeWidth?: number }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      stroke="#3D5C4A"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="2,6.5 5,9 10,3.5" />
    </svg>
  );
}

export default function GlpIntroSection() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const anims = section.querySelectorAll<HTMLElement>('.slimedo-anim');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('played');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -20px 0px' }
    );

    anims.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="intro" className="gi-sec-intro">
      <div className="gi-wrap">
        <div className="gi-layout">
          <div className="gi-left">
            <p className="gi-eyebrow slimedo-anim">Die Therapie</p>
            <h2 className="gi-title slimedo-anim slimedo-d1">
              Was ist die
              <br />
              GLP-1-<em>Therapie?</em>
            </h2>

            <p className="gi-lead slimedo-anim slimedo-d2">
              Semaglutid und Tirzepatid ahmen das körpereigene Sättigungshormon GLP-1 nach — sie
              reduzieren den Appetit und unterstützen so eine ärztlich begleitete
              Gewichtsreduktion.
            </p>

            <ul className="gi-points slimedo-anim slimedo-d3">
              {leftPoints.map((point) => (
                <li key={point}>
                  <span className="gi-ip-check">
                    <CheckIcon />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="gi-badge slimedo-anim slimedo-d3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.5" stroke="#3D5C4A" strokeWidth="1.3" />
                <line
                  x1="7"
                  y1="4.5"
                  x2="7"
                  y2="7.5"
                  stroke="#3D5C4A"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <circle cx="7" cy="9.5" r="0.8" fill="#3D5C4A" />
              </svg>
              Bekannt als die <strong>„Abnehmspritze"</strong>
            </div>

            <a href="#start" className="gi-cta slimedo-anim slimedo-d4">
              Rezept anfragen →
            </a>
          </div>

          <div className="gi-right">
            <div className="gi-tariff-card slimedo-anim slimedo-d1">
              <div className="gi-tc-badge">Unser Angebot</div>

              <div className="gi-tc-header">
                <div className="gi-tc-eyebrow">Rezeptgebühr</div>
                <div className="gi-tc-price-main">
                  <span className="gi-tc-price-num">29,90</span>
                  <span className="gi-tc-price-eur">€</span>
                </div>
                <div className="gi-tc-price-sub">einmalig pro Rezept</div>
              </div>

              <div className="gi-tc-divider" />

              <ul className="gi-tc-list">
                {offerPoints.map((point) => (
                  <li key={point.title}>
                    <span className="gi-tc-check">
                      <CheckIcon strokeWidth={2.2} />
                    </span>
                    <div>
                      <strong>{point.title}</strong> — {point.text}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="gi-tc-footer">
                <div className="gi-tc-med-row">
                  <span className="gi-tc-med-label">Medikament</span>
                  <span className="gi-tc-med-price">ab 161,96 €</span>
                </div>
                <p className="gi-tc-med-note">
                  Der Medikamentenpreis variiert je nach Wirkstoff und Dosierung — direkt über die
                  Versandapotheke abgerechnet, nicht in der Rezeptgebühr enthalten.
                </p>
              </div>

              <div className="gi-tc-addon">
                <div className="gi-tc-addon-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="13" height="12" rx="2" stroke="#B0832B" strokeWidth="1.6" />
                    <path d="M16 10l5-3v10l-5-3z" stroke="#B0832B" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="gi-tc-addon-text">
                  <div className="gi-tc-addon-title">Premium Add-on · Videosprechstunde</div>
                  <div className="gi-tc-addon-desc">
                    Persönliches Gespräch mit Arzt:in · <strong>139 €</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .gi-sec-intro {
          background: #faf5ea;
          padding: 80px 0;
        }

        .gi-wrap {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .gi-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        .gi-eyebrow {
          font-family: "Inter", sans-serif;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #3d5c4a;
          margin-bottom: 14px;
        }

        .gi-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: 48px;
          line-height: 1.06;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: #1a1a1a;
          margin-bottom: 20px;
        }

        .gi-title em {
          color: #3d5c4a;
          font-style: italic;
        }

        .gi-lead {
          font-family: "Inter", sans-serif;
          font-size: 16.5px;
          color: #6e6a60;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        .gi-points {
          list-style: none;
          padding: 0;
          margin: 6px 0 22px;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .gi-points li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          color: #1a1a1a;
          line-height: 1.5;
        }

        .gi-ip-check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(61, 92, 74, 0.08);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .gi-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(61, 92, 74, 0.08);
          border: 1px solid rgba(61, 92, 74, 0.15);
          padding: 8px 16px;
          border-radius: 999px;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          color: #3d5c4a;
          margin-bottom: 28px;
          margin-right: 20px;
        }

        .gi-badge strong {
          color: #3d5c4a;
          font-weight: 600;
        }

        .gi-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #3d5c4a;
          color: #faf5ea;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 14px 28px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
        }

        .gi-cta:hover {
          background: #1e3a2e;
        }

        .gi-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-top: 0;
        }

        .gi-tariff-card {
          background: linear-gradient(180deg, #fffdf7 0%, #fffdf7 100%);
          border-radius: 24px;
          padding: 32px 32px 24px;
          border: 1px solid #e5d9bd;
          position: relative;
          box-shadow: 0 2px 12px rgba(15, 31, 26, 0.04), 0 12px 36px rgba(15, 31, 26, 0.08);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .gi-tariff-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 18px rgba(15, 31, 26, 0.06), 0 24px 56px rgba(15, 31, 26, 0.12);
        }

        .gi-tc-badge {
          position: absolute;
          top: -12px;
          left: 32px;
          background: #3d5c4a;
          color: #faf5ea;
          font-family: "Inter", sans-serif;
          font-size: 11px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 999px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 2px 10px rgba(61, 92, 74, 0.22);
        }

        .gi-tc-header {
          text-align: left;
          margin-bottom: 20px;
        }

        .gi-tc-eyebrow {
          font-family: "Inter", sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          color: #768064;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 6px;
        }

        .gi-tc-price-main {
          display: flex;
          align-items: baseline;
          gap: 6px;
          line-height: 1;
        }

        .gi-tc-price-num {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: 56px;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 1;
          letter-spacing: -0.015em;
        }

        .gi-tc-price-eur {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: 32px;
          color: #6e6a60;
          font-weight: 400;
        }

        .gi-tc-price-sub {
          font-family: "Inter", sans-serif;
          font-size: 13px;
          color: #6e6a60;
          margin-top: 4px;
        }

        .gi-tc-divider {
          height: 1px;
          background: linear-gradient(to right, transparent 0%, rgba(61, 92, 74, 0.18) 50%, transparent 100%);
          margin: 0 0 22px;
        }

        .gi-tc-list {
          list-style: none;
          padding: 0;
          margin: 0 0 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .gi-tc-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          color: #1a1a1a;
          line-height: 1.5;
        }

        .gi-tc-list li strong {
          font-weight: 600;
          color: #1a1a1a;
        }

        .gi-tc-list li > div {
          flex: 1;
        }

        .gi-tc-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(61, 92, 74, 0.1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .gi-tc-footer {
          background: rgba(61, 92, 74, 0.04);
          border: 1px solid rgba(61, 92, 74, 0.1);
          border-radius: 14px;
          padding: 16px 18px;
          margin-bottom: 14px;
        }

        .gi-tc-med-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 6px;
        }

        .gi-tc-med-label {
          font-family: "Inter", sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .gi-tc-med-price {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: 22px;
          color: #1a1a1a;
          font-weight: 400;
          letter-spacing: -0.005em;
        }

        .gi-tc-med-note {
          font-family: "Inter", sans-serif;
          font-size: 11.5px;
          color: #6e6a60;
          line-height: 1.5;
          margin: 0;
        }

        .gi-tc-addon {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, rgba(237, 216, 154, 0.18) 0%, rgba(237, 216, 154, 0.08) 100%);
          border: 1px solid rgba(176, 131, 43, 0.2);
          border-radius: 12px;
          padding: 12px 16px;
        }

        .gi-tc-addon-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(176, 131, 43, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .gi-tc-addon-text {
          flex: 1;
        }

        .gi-tc-addon-title {
          font-family: "Inter", sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #7a5a1b;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 2px;
        }

        .gi-tc-addon-desc {
          font-family: "Inter", sans-serif;
          font-size: 13px;
          color: #1a1a1a;
        }

        .gi-tc-addon-desc strong {
          font-weight: 600;
          color: #7a5a1b;
        }

        @media (max-width: 1024px) {
          .gi-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .gi-right {
            padding-top: 0;
          }
        }

        @media (max-width: 640px) {
          .gi-wrap {
            padding: 0 20px;
          }
        }
      `}</style>
    </section>
  );
}





