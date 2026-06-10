import { useEffect, useRef } from 'react';

function CheckIcon({ color = '#3D5C4A' }: { color?: string }) {
  return (
    <svg viewBox="0 0 11 11" fill="none" width="11" height="11" aria-hidden="true">
      <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricesSection() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            card.classList.add('ps-visible');
            card.querySelectorAll<HTMLElement>('.ps-feature').forEach((li) =>
              li.classList.add('ps-feat-vis')
            );
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.45 }
    );

    section.querySelectorAll<HTMLElement>('.ps-card').forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="preise" ref={ref} className="ps-section">
      <div className="ps-wrap">
        <span className="ps-eyebrow">Kosten &amp; Preise</span>
        <h2 className="ps-heading">
          Transparente Preise, <em>keine versteckten Kosten.</em>
        </h2>
        <p className="ps-sub">Kein Abo-Modell. Keine Mindestlaufzeit.</p>

        <div className="ps-grid">

          {/* ── Karte 1: Rezept ── */}
          <div className="ps-card ps-card-rezept">
            <div className="ps-corner-tag ps-tag-digital">
              Digital <span className="ps-sparkle" aria-hidden="true">✦</span>
            </div>
            <div className="ps-price-area ps-price-area-rezept">
              <div className="ps-card-label">Ärztliche Prüfung</div>
              <div className="ps-card-title">Rezept für<br />Abnehmspritze</div>
              <div className="ps-price-block">
                <div className="ps-price">
                  <span className="ps-eur">€</span>29<span className="ps-asterisk">*</span>
                </div>
                <span className="ps-price-sub">Rezept- &amp; Behandlungsgebühr</span>
              </div>
              {/* Mobile-only syringe overlay */}
              <div className="ps-mobile-stage" aria-hidden="true">
                <div style={{
                  position: 'absolute',
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(201,236,217,.55) 0%, rgba(223,244,234,.22) 45%, transparent 70%)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }} />
                <svg viewBox="0 0 60 160" fill="none" width="38" height="105" style={{ filter: 'drop-shadow(0 6px 16px rgba(61,92,74,.18))', animation: 'ps-float 4s ease-in-out infinite' }}>
                  <rect x="22" y="4" width="16" height="22" rx="5" fill="#C9ECD9" opacity=".7" />
                  <rect x="24" y="24" width="12" height="90" rx="4" fill="white" stroke="#DFF4EA" strokeWidth="1.5" />
                  <rect x="26" y="34" width="8" height="38" rx="2" fill="#f0faf4" stroke="#C9ECD9" strokeWidth="1" />
                  <rect x="27" y="42" width="6" height="26" rx="1.5" fill="#C9ECD9" opacity=".6" />
                  <rect x="26" y="76" width="8" height="7" rx="1.5" fill="#e8f5ef" stroke="#C9ECD9" strokeWidth=".8" />
                  <rect x="27" y="114" width="6" height="24" rx="3" fill="#C9ECD9" opacity=".7" />
                  <rect x="29" y="136" width="2" height="18" rx="1" fill="#a8d8bc" opacity=".6" />
                </svg>
                <div className="ps-stat-badge ps-stat-badge-sm">
                  <span className="ps-stat-icon" style={{ fontSize: '0.85rem' }}>↑</span>
                  <div>
                    <div className="ps-stat-value" style={{ fontSize: '0.8rem' }}>Bis zu 20 %</div>
                    <div className="ps-stat-label">Gewichtsverlust*</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ps-divider" />
            <ul className="ps-features">
              <li className="ps-feature"><span className="ps-check"><CheckIcon /></span>Deutsche approbierte Ärzt:innen</li>
              <li className="ps-feature"><span className="ps-check"><CheckIcon /></span>Online per Fragebogen</li>
              <li className="ps-feature"><span className="ps-check"><CheckIcon /></span>100% diskret & vertraulich</li>
            </ul>
          </div>

          {/* ── Karte 2: Medikament ── */}
          <div className="ps-card ps-card-med">
            <div className="ps-corner-tag ps-tag-express">
              Express <span className="ps-sparkle" style={{ animationDelay: '0.6s' }} aria-hidden="true">✦</span>
            </div>
            <div className="ps-price-area ps-price-area-med">
              <div className="ps-card-label">Abnehmmedikament</div>
              <div className="ps-card-title">Medikamenten&shy;kosten</div>
              <div className="ps-price-block">
                <div className="ps-price">
                  <span className="ps-ab">ab</span><span className="ps-eur">€</span>170
                </div>
                <span className="ps-price-sub">Je nach Dosierung / Monat</span>
              </div>
            </div>
            <div className="ps-divider" />
            <ul className="ps-features">
              <li className="ps-feature"><span className="ps-check ps-check-clay"><CheckIcon color="#C8856B" /></span>Abrechnung über die Apotheke</li>
              <li className="ps-feature"><span className="ps-check ps-check-clay"><CheckIcon color="#C8856B" /></span>Abholung oder Expressversand</li>
              <li className="ps-feature"><span className="ps-check ps-check-clay"><CheckIcon color="#C8856B" /></span>Alle Dosierungen verfügbar</li>
            </ul>
          </div>

          {/* ── Spalte 3: Visual + Videosprechstunde ── */}
          <div className="ps-col3">
            <div className="ps-stage">
              <div className="ps-stage-glow" />
              <div className="ps-stage-inner">
                <div className="ps-syringe" aria-hidden="true">
                  <svg viewBox="0 0 60 160" fill="none" width="52" height="140">
                    <rect x="22" y="4" width="16" height="22" rx="5" fill="#C9ECD9" opacity=".7" />
                    <rect x="24" y="24" width="12" height="90" rx="4" fill="white" stroke="#DFF4EA" strokeWidth="1.5" />
                    <rect x="26" y="34" width="8" height="38" rx="2" fill="#f0faf4" stroke="#C9ECD9" strokeWidth="1" />
                    <rect x="27" y="42" width="6" height="26" rx="1.5" fill="#C9ECD9" opacity=".6" />
                    <rect x="26" y="76" width="8" height="7" rx="1.5" fill="#e8f5ef" stroke="#C9ECD9" strokeWidth=".8" />
                    <rect x="27" y="114" width="6" height="24" rx="3" fill="#C9ECD9" opacity=".7" />
                    <rect x="29" y="136" width="2" height="18" rx="1" fill="#a8d8bc" opacity=".6" />
                  </svg>
                </div>
                <div className="ps-stat-badge">
                  <span className="ps-stat-icon">↑</span>
                  <div>
                    <div className="ps-stat-value">Bis zu 20 %</div>
                    <div className="ps-stat-label">Gewichtsverlust*</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ps-card ps-card-video">
              <div className="ps-badge">Optional</div>
              <div className="ps-card-label">Zusatzleistung</div>
              <div className="ps-card-title ps-card-title-sm">Videosprechstunde</div>
              <div className="ps-price-block">
                <div className="ps-price ps-price-sm"><span className="ps-eur">€</span>99</div>
                <span className="ps-price-sub">Pro Termin · ohne Rezept</span>
              </div>
              <ul className="ps-features">
                <li className="ps-feature"><span className="ps-check"><CheckIcon /></span>Persönliches Arztgespräch</li>
              </ul>
            </div>
          </div>

        </div>

        <p className="ps-footnote">
          * Die Rezeptgebühr wird nach GOÄ abgerechnet. Ob eine Behandlung mit einem Abnehmmedikament medizinisch geeignet ist, entscheidet ausschließlich der behandelnde Arzt bzw. die behandelnde Ärztin nach individueller Prüfung.
        </p>
      </div>

      <style>{`
        .ps-section {
          background: #FAFBF9;
          padding: clamp(72px, 6vw, 96px) 0;
          position: relative;
          overflow: hidden;
        }
        .ps-section::before {
          content: "";
          position: absolute;
          top: -120px;
          left: -80px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(223,244,234,.5) 0%, transparent 70%);
          pointer-events: none;
        }

        .ps-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 clamp(20px, 6vw, 48px);
          position: relative;
        }

        .ps-eyebrow {
          display: block;
          font-family: "Inter", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: #3D5C4A;
          margin-bottom: 16px;
        }

        .ps-heading {
          font-family: "Lora", Georgia, serif;
          font-weight: 500;
          font-size: clamp(1.9rem, 3vw, 2.6rem);
          line-height: 1.1;
          letter-spacing: -.02em;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .ps-heading em {
          font-style: italic;
          color: #3D5C4A;
        }

        .ps-sub {
          font-family: "Inter", sans-serif;
          font-size: .95rem;
          color: #6e6a60;
          margin-bottom: 40px;
          letter-spacing: .01em;
        }

        /* ── Grid ── */
        .ps-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 0.85fr;
          gap: 20px;
          margin-bottom: 40px;
        }

        /* ── Cards ── */
        .ps-card {
          background: #ffffff;
          border: 1px solid #D4E8DC;
          border-radius: 28px;
          padding: 44px 38px 40px;
          position: relative;
          box-shadow: 0 2px 12px rgba(31,41,55,.06);
          transition: transform 250ms ease, box-shadow 250ms ease;
          opacity: 0;
          transform: translateY(20px);
        }
        .ps-card.ps-visible {
          animation: ps-fadeUp 500ms ease forwards;
        }
        .ps-card:nth-child(2) { animation-delay: 100ms; }
        @keyframes ps-fadeUp { to { opacity: 1; transform: translateY(0); } }
        .ps-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(31,41,55,.14); }

        .ps-card-rezept {
          background: linear-gradient(160deg, #f0faf4 0%, #ffffff 60%);
          display: flex;
          flex-direction: column;
        }
        .ps-card-med {
          background: linear-gradient(160deg, #e8f7f0 0%, #f4faf7 60%);
          border-color: #C9ECD9;
          box-shadow: 0 4px 24px rgba(61,92,74,.10), 0 2px 12px rgba(31,41,55,.06);
          display: flex;
          flex-direction: column;
        }
        .ps-card-video {
          padding: 22px 22px 20px;
          opacity: .9;
        }

        /* ── Corner tags ── */
        .ps-corner-tag {
          position: absolute;
          top: 16px;
          right: 16px;
          font-family: "Inter", sans-serif;
          font-size: .55rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: 999px;
          pointer-events: none;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }
        .ps-tag-digital {
          background: #EEF7F0;
          color: #0B3D32;
          border: 1px solid #DCEADF;
          box-shadow: 0 0 0 3px rgba(61,92,74,.06), 0 2px 8px rgba(61,92,74,.08);
        }
        .ps-tag-express {
          background: #063D32;
          color: #fff;
          border: 1px solid rgba(223,244,234,.16);
          box-shadow: 0 0 0 3px rgba(6,61,50,.12), 0 2px 8px rgba(6,61,50,.22);
        }
        .ps-sparkle {
          display: inline-block;
          font-size: .6rem;
          color: currentColor;
          animation: ps-sparkle 3s ease-in-out infinite;
          transform-origin: center;
        }
        .ps-tag-express .ps-sparkle {
          color: #DFF4EA;
        }
        @keyframes ps-sparkle {
          0%,100%  { transform: rotate(0deg) scale(1); opacity: 1; }
          25%      { transform: rotate(20deg) scale(1.2); opacity: .8; }
          50%      { transform: rotate(0deg) scale(1); opacity: 1; }
          75%      { transform: rotate(-20deg) scale(1.2); opacity: .8; }
        }

        /* ── Optional badge ── */
        .ps-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #3D5C4A;
          color: #fff;
          font-family: "Inter", sans-serif;
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 999px;
          margin-bottom: 20px;
          box-shadow: 0 0 0 3px rgba(61,92,74,.12), 0 2px 8px rgba(61,92,74,.2);
        }
        .ps-badge::before {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #fff;
          opacity: .7;
        }

        /* ── Price area ── */
        .ps-price-area {
          background: rgba(255,255,255,.65);
          border: 1px solid rgba(220,235,225,.8);
          border-radius: 16px;
          padding: 20px 20px 16px;
          margin-bottom: 20px;
          box-shadow: inset 0 1px 3px rgba(255,255,255,.9), 0 2px 8px rgba(61,92,74,.05);
          height: 234px;
          padding: 22px 22px 18px;
          margin: 0 0 22px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          flex-shrink: 0;
        }
        .ps-price-area-med {
          background: rgba(232,247,240,.5);
          border-color: rgba(201,236,217,.7);
        }

        .ps-card-label {
          font-family: "Inter", sans-serif;
          font-size: .68rem;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #6e6a60;
          height: 20px;
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .ps-card-title {
          font-family: "Lora", Georgia, serif;
          font-weight: 500;
          font-size: 1.2rem;
          color: #1a1a1a;
          line-height: 1.25;
          height: 62px;
          margin: 0 0 14px;
          display: flex;
          align-items: flex-start;
          flex-shrink: 0;
        }
        .ps-card-title-sm {
          font-size: 1rem;
          height: auto;
          min-height: auto;
          margin-bottom: 12px;
        }

        .ps-price-block {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          flex-shrink: 0;
        }
        .ps-price {
          font-family: "Lora", Georgia, serif;
          font-weight: 600;
          font-size: 3.2rem;
          line-height: 1;
          color: #1a1a1a;
          letter-spacing: -.03em;
          display: inline-flex;
          align-items: flex-end;
        }
        .ps-eur {
          font-family: "Lora", Georgia, serif;
          font-size: 1.4rem;
          font-weight: 500;
          line-height: 1;
          margin-right: 1px;
          align-self: flex-start;
        }
        .ps-asterisk {
          font-size: .9rem;
          color: #6e6a60;
          align-self: flex-start;
          line-height: 1;
        }
        .ps-ab {
          font-size: 1.1rem;
          font-weight: 400;
          opacity: .7;
          margin-right: 2px;
          font-family: "Inter", sans-serif;
        }
        .ps-price-sm {
          font-size: 2.2rem;
        }
        .ps-price-sub {
          font-family: "Inter", sans-serif;
          font-size: .72rem;
          color: #6e6a60;
          margin-top: 12px;
          display: block;
          letter-spacing: .02em;
        }

        /* ── Divider ── */
        .ps-divider {
          height: 1px;
          background: #D4E8DC;
          margin: 0 0 22px;
          flex-shrink: 0;
        }

        /* ── Features ── */
        .ps-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
          flex: 1;
        }
        .ps-feature {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: "Inter", sans-serif;
          font-size: .85rem;
          color: #1a1a1a;
          line-height: 1.5;
          opacity: 0;
          transform: translateY(14px);
          min-height: 22px;
        }
        .ps-feature.ps-feat-vis {
          animation: ps-item-pop 0.75s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
        .ps-feature:nth-child(1).ps-feat-vis { animation-delay: 350ms; }
        .ps-feature:nth-child(2).ps-feat-vis { animation-delay: 580ms; }
        .ps-feature:nth-child(3).ps-feat-vis { animation-delay: 810ms; }
        @keyframes ps-item-pop {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ps-check {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #DFF4EA;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }
        .ps-check-clay {
          background: #f5e6e0;
        }

        /* ── Col 3 ── */
        .ps-col3 {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ps-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          min-height: 240px;
        }
        .ps-stage-glow {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,236,217,.45) 0%, rgba(223,244,234,.2) 45%, transparent 70%);
          pointer-events: none;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .ps-stage-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }
        .ps-syringe {
          filter: drop-shadow(0 8px 24px rgba(61,92,74,.18));
          animation: ps-float 4s ease-in-out infinite;
        }
        @keyframes ps-float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        .ps-stat-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: white;
          border: 1px solid #C9ECD9;
          border-radius: 14px;
          padding: 10px 18px;
          box-shadow: 0 4px 16px rgba(61,92,74,.10);
        }
        .ps-stat-icon {
          font-size: 1.1rem;
          color: #3D5C4A;
          font-weight: 700;
        }
        .ps-stat-value {
          font-family: "Lora", Georgia, serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.1;
        }
        .ps-stat-label {
          font-family: "Inter", sans-serif;
          font-size: .7rem;
          color: #6e6a60;
          margin-top: 2px;
        }

        /* ── Footnote ── */
        .ps-footnote {
          font-family: "Inter", sans-serif;
          font-size: .72rem;
          color: #6e6a60;
          line-height: 1.65;
          border-top: 1px solid #D4E8DC;
          padding-top: 20px;
          max-width: 780px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ps-grid {
            grid-template-columns: 1fr 1fr;
          }
          .ps-col3 {
            grid-column: 1 / -1;
            flex-direction: row;
          }
          .ps-stage {
            min-height: 200px;
            flex: 1;
          }
        }
        .ps-mobile-stage { display: none; }

        @media (max-width: 640px) {
          .ps-section { padding: 44px 0 !important; }
        }
        @media (max-width: 560px) {
          .ps-section { overflow: visible !important; }
          .ps-wrap { padding: 0 16px !important; }
          .ps-grid { grid-template-columns: 1fr; }
          .ps-col3 { flex-direction: column !important; }
          .ps-card {
            padding: 28px 20px 24px !important;
            border-radius: 20px !important;
          }
          .ps-price-area {
            height: auto !important;
            min-height: unset !important;
          }
          .ps-stage { display: none !important; }
          .ps-price { font-size: 2.6rem; }

          .ps-corner-tag { z-index: 10 !important; }

          .ps-card-video {
            display: grid !important;
            grid-template-columns: minmax(164px, .6fr) minmax(118px, .4fr);
            grid-template-rows: auto auto auto auto;
            column-gap: clamp(14px, 4vw, 22px);
            row-gap: 7px;
            align-items: center;
            min-height: 184px;
            padding: 24px 20px !important;
          }
          .ps-card-video .ps-badge,
          .ps-card-video .ps-card-label,
          .ps-card-video .ps-card-title {
            grid-column: 1;
          }
          .ps-card-video .ps-price-block {
            display: contents;
          }
          .ps-card-video .ps-badge {
            grid-row: 1;
            width: max-content;
            margin-bottom: 10px;
          }
          .ps-card-video .ps-card-label {
            grid-row: 2;
            height: auto;
            margin-bottom: 4px;
          }
          .ps-card-video .ps-card-title {
            grid-row: 3;
            height: auto;
            margin-bottom: 8px;
            line-height: 1.18;
            white-space: nowrap;
          }
          .ps-card-video .ps-price {
            grid-column: 1;
            grid-row: 4;
          }
          .ps-card-video .ps-price-sub {
            grid-column: 2;
            grid-row: 3;
            align-self: start;
            margin: 2px 0 0;
            font-size: clamp(.76rem, 2.85vw, .86rem);
            line-height: 1.25;
          }
          .ps-card-video .ps-features {
            grid-column: 2;
            grid-row: 4;
            align-self: start;
            justify-content: flex-end;
            flex: none;
            padding-top: 8px;
          }
          .ps-card-video .ps-feature {
            align-items: center;
            gap: 9px;
            min-height: auto;
            font-size: clamp(.82rem, 3.35vw, .95rem);
            line-height: 1.28;
          }
          .ps-card-video .ps-check {
            width: 28px;
            height: 28px;
          }

          /* Mobile syringe overlay inside rezept price-area */
          .ps-price-area-rezept {
            position: relative !important;
            overflow: hidden !important;
            min-height: 190px !important;
          }
          .ps-price-area-rezept .ps-card-label,
          .ps-price-area-rezept .ps-card-title,
          .ps-price-area-rezept .ps-price-block { max-width: 55% !important; }
          .ps-mobile-stage {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 46%;
          }
          .ps-stat-badge-sm {
            padding: 7px 10px !important;
            font-size: 0.65rem !important;
            gap: 7px !important;
            border-radius: 10px !important;
          }
        }
        @media (max-width: 380px) {
          .ps-card-video {
            grid-template-columns: minmax(156px, .58fr) minmax(112px, .42fr);
            column-gap: 12px;
            padding: 22px 18px !important;
          }
          .ps-card-video .ps-card-title {
            font-size: .9rem;
          }
          .ps-card-video .ps-price-sub {
            font-size: .74rem;
          }
          .ps-card-video .ps-feature {
            font-size: .78rem;
          }
        }
      `}</style>
    </section>
  );
}
