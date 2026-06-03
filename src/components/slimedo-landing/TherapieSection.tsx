const SAGE = '#4F6B5A';
const SAGE_DEEP = '#3F5848';
const CLAY = '#C8856B';
const STONE = '#7A6F62';
const TEXT = '#2E2620';
const CREAM = '#FFFCF6';
const BORDER = '#E8DFD0';
const MIST = '#DCE5DC';

function CheckSage() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={16} height={16} style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="12" cy="12" r="11" fill={MIST} />
      <path d="M7 12.5l3 3 7-7" stroke={SAGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckClay() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={16} height={16} style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="12" cy="12" r="11" fill="#E9D9CC" />
      <path d="M7 12.5l3 3 7-7" stroke={CLAY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlpDiagram() {
  return (
    <svg viewBox="0 0 260 155" fill="none" style={{ width: '100%', height: 'clamp(130px, 7.6vw, 194px)', marginBottom: 16 }}>
      <rect x="128" y="8" width="11" height="138" rx="5.5" fill={MIST} />
      <circle cx="133" cy="77" r="12" fill={SAGE} />
      <text x="133" y="81" fontSize="10" fill="#fff" textAnchor="middle" fontFamily="Poppins" fontWeight="600">R</text>
      <circle cx="56" cy="77" r="8" fill={SAGE} opacity=".5" className="slimedo-therapie-ion" />
      <path d="M68 77 H114" stroke={SAGE} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <text x="56" y="60" fontSize="8.5" fill={STONE} textAnchor="middle" fontFamily="Poppins">GLP-1</text>
      <path d="M147 77 H196" stroke={SAGE} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <path d="M196 77 l-6-3 v6 z" fill={SAGE} />
      <text x="210" y="74" fontSize="8.5" fill={SAGE} fontFamily="Poppins" fontWeight="600">Sättigung</text>
      <text x="225" y="88" fontSize="13" fill={SAGE} textAnchor="middle">↑</text>
      <text x="133" y="130" fontSize="7.5" fill={STONE} textAnchor="middle" fontFamily="Poppins">Zellmembran</text>
    </svg>
  );
}

function DualDiagram() {
  return (
    <svg viewBox="0 0 260 155" fill="none" style={{ width: '100%', height: 'clamp(130px, 7.6vw, 194px)', marginBottom: 16 }}>
      <rect x="128" y="8" width="11" height="138" rx="5.5" fill={MIST} />
      <circle cx="133" cy="56" r="11" fill={SAGE} />
      <text x="133" y="60" fontSize="8" fill="#fff" textAnchor="middle" fontFamily="Poppins" fontWeight="600">R1</text>
      <circle cx="133" cy="100" r="11" fill={CLAY} />
      <text x="133" y="104" fontSize="8" fill="#fff" textAnchor="middle" fontFamily="Poppins" fontWeight="600">R2</text>
      <circle cx="56" cy="56" r="7" fill={SAGE} opacity=".5" className="slimedo-therapie-ion" />
      <path d="M67 56 H115" stroke={SAGE} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <text x="54" y="41" fontSize="8.5" fill={STONE} textAnchor="middle" fontFamily="Poppins">GLP-1</text>
      <circle cx="56" cy="100" r="7" fill={CLAY} opacity=".5" className="slimedo-therapie-ion slimedo-therapie-ion-b" />
      <path d="M67 100 H115" stroke={CLAY} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <text x="54" y="122" fontSize="8.5" fill={STONE} textAnchor="middle" fontFamily="Poppins">GIP</text>
      <path d="M147 56 q30 0 30 22 H196" stroke={SAGE} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <path d="M147 100 q30 0 30 -22 H196" stroke={CLAY} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <path d="M196 78 l-6-3 v6 z" fill="#8a6f54" />
      <text x="204" y="72" fontSize="8" fill="#8a6f54" fontFamily="Poppins" fontWeight="600">Sättigung</text>
      <text x="204" y="82" fontSize="8" fill="#8a6f54" fontFamily="Poppins" fontWeight="600">verstärkt</text>
      <text x="218" y="96" fontSize="13" fill="#8a6f54" textAnchor="middle">↑</text>
    </svg>
  );
}

export default function TherapieSection() {
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(72px, 5.88vw, 130px) 6vw',
        backgroundImage: 'url(/images/therapie/doctorBackground.jpeg)',
        backgroundSize: 'auto 85%',
        backgroundPosition: '-100px center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <style>{`
        @keyframes slimedo-therapie-dash {
          to { stroke-dashoffset: -90; }
        }
        @keyframes slimedo-therapie-pulse {
          0%, 100% { opacity: .3; }
          50%       { opacity: .9; }
        }
        .slimedo-therapie-flow {
          stroke-dasharray: 4 5;
          animation: slimedo-therapie-dash 3s linear infinite;
        }
        .slimedo-therapie-ion {
          animation: slimedo-therapie-pulse 2.4s ease-in-out infinite;
        }
        .slimedo-therapie-ion-b {
          animation-delay: .8s;
        }
        .slimedo-therapie-card {
          transition: transform .3s, box-shadow .3s;
        }
        .slimedo-therapie-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 44px -24px rgba(46,38,32,.22);
        }
        @media (max-width: 600px) {
          .slimedo-therapie-overlay {
            background: linear-gradient(
              to bottom,
              rgba(250,246,238,0.94) 0%,
              rgba(250,246,238,0.88) 100%
            ) !important;
          }
        }
        @media (min-width: 601px) and (max-width: 1024px) {
          .slimedo-therapie-overlay {
            background:
              linear-gradient(to right, rgba(250,246,238,0.50) 0%, rgba(250,246,238,0.94) 52%, #FAF6EE 65%),
              linear-gradient(to bottom, rgba(250,246,238,0.85) 0%, rgba(250,246,238,0) 20%, rgba(250,246,238,0) 80%, rgba(250,246,238,0.85) 100%)
            !important;
          }
        }
      `}</style>

      {/* Overlay */}
      <div
        className="slimedo-therapie-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to right,  rgba(250,246,238,0.42) 0%, rgba(250,246,238,0.92) 44%, #FAF6EE 58%),
            linear-gradient(to bottom, rgba(250,246,238,0.80) 0%, rgba(250,246,238,0) 18%, rgba(250,246,238,0) 80%, rgba(250,246,238,0.80) 100%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content wrapper */}
      <div style={{ maxWidth: 1800, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Headline */}
        <div style={{ marginBottom: 'clamp(40px, 3.75vw, 60px)' }}>
          <span style={{
            display: 'block', fontSize: 'clamp(10px, 0.55vw, 14px)', fontWeight: 500,
            letterSpacing: '.2em', textTransform: 'uppercase',
            color: STONE, marginBottom: 16,
          }}>
            DIE THERAPIE
          </span>
          <h2 style={{
            fontFamily: "'Lora', Georgia, serif", fontWeight: 500,
            fontSize: 'clamp(2rem, 3.2vw, 4rem)', lineHeight: 1.1,
            letterSpacing: '-.02em', marginBottom: 12, color: TEXT,
            textShadow: '0 2px 24px rgba(250,246,238,0.7)',
          }}>
            Zwei moderne Wirkmechanismen{' '}
            <em style={{ fontStyle: 'italic', color: SAGE }}>zum Abnehmen.</em>
          </h2>
          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic',
            fontSize: 'clamp(14px, 0.78vw, 20px)', color: STONE,
            textShadow: '0 1px 12px rgba(250,246,238,0.6)',
          }}>
            Im Alltag oft als „Abnehmspritze" bekannt
          </p>
        </div>

        {/* Main grid: left CTA + right cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(220px, 26vw, 425px) 1fr',
          gap: 'clamp(44px, 4vw, 65px)',
          alignItems: 'stretch',
          marginBottom: 'clamp(18px, 1.7vw, 28px)',
        }}>
          {/* Left: button pinned to bottom */}
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <a
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: SAGE, color: '#fff',
                padding: 'clamp(10px, 0.94vw, 15px) clamp(18px, 1.72vw, 28px)',
                borderRadius: 999, fontSize: 'clamp(13px, 0.7vw, 18px)', fontWeight: 500,
                cursor: 'pointer', textDecoration: 'none',
                transition: 'background .2s',
                boxShadow: '0 4px 18px rgba(79,107,90,0.28)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = SAGE_DEEP)}
              onMouseLeave={e => (e.currentTarget.style.background = SAGE)}
            >
              Behandlung anfragen
              <svg viewBox="0 0 16 16" fill="none" width={15} height={15}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Right: two cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(14px, 1.25vw, 20px)' }}>

            {/* Card: GLP-1 */}
            <div
              className="slimedo-therapie-card"
              style={{
                background: CREAM,
                border: `1px solid ${BORDER}`,
                borderRadius: 22, padding: 'clamp(22px, 2vw, 33px) clamp(18px, 1.72vw, 28px)',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 2px 20px rgba(46,38,32,0.07)',
              }}
            >
              <img
                src="/images/therapie/injection1.png"
                alt="Wegovy Injektionspen"
                style={{
                  position: 'absolute', top: 14, right: 14,
                  width: 'clamp(70px, 4vw, 100px)', height: 'clamp(70px, 4vw, 100px)',
                  objectFit: 'contain',
                }}
              />
              <div style={{
                fontSize: 'clamp(10px, 0.53vw, 14px)', fontWeight: 600, letterSpacing: '.14em',
                textTransform: 'uppercase', marginBottom: 8,
                paddingRight: 'clamp(84px, 6.25vw, 125px)', color: SAGE,
              }}>
                Einfaches Prinzip
              </div>
              <h3 style={{
                fontFamily: "'Lora', Georgia, serif", fontWeight: 500,
                fontSize: 'clamp(17px, 1.02vw, 26px)', lineHeight: 1.2, marginBottom: 4,
                paddingRight: 'clamp(67px, 5vw, 100px)', color: TEXT,
              }}>
                Das <em style={{ fontStyle: 'italic', color: SAGE }}>GLP-1</em>-Prinzip
              </h3>
              <p style={{ fontSize: 'clamp(11px, 0.61vw, 16px)', color: STONE, marginBottom: 16 }}>
                Wirkt gezielt an einem Rezeptor<br />
                <span style={{ fontSize: 'clamp(10px, 0.53vw, 14px)', fontWeight: 600, color: SAGE }}>Bsp. Wegovy®</span>
              </p>
              <GlpDiagram />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, padding: 0, margin: 0 }}>
                {[
                  'Verstärkt das natürliche Sättigungsgefühl',
                  'Verlangsamt die Magenentleerung',
                  'Kann Heißhunger reduzieren',
                ].map(text => (
                  <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 'clamp(11px, 0.63vw, 16px)', color: TEXT, lineHeight: 1.45 }}>
                    <CheckSage />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card: GLP-1 + GIP */}
            <div
              className="slimedo-therapie-card"
              style={{
                background: CREAM,
                border: `1px solid ${BORDER}`,
                borderRadius: 22, padding: 'clamp(22px, 2vw, 33px) clamp(18px, 1.72vw, 28px)',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 2px 20px rgba(46,38,32,0.07)',
              }}
            >
              <img
                src="/images/therapie/injection2.png"
                alt="Mounjaro Injektionspen"
                style={{
                  position: 'absolute', top: 14, right: 14,
                  width: 'clamp(70px, 4vw, 100px)', height: 'clamp(70px, 4vw, 100px)',
                  objectFit: 'contain',
                }}
              />
              <div style={{
                fontSize: 'clamp(10px, 0.53vw, 14px)', fontWeight: 600, letterSpacing: '.14em',
                textTransform: 'uppercase', marginBottom: 8,
                paddingRight: 'clamp(84px, 6.25vw, 125px)', color: CLAY,
              }}>
                Duales Prinzip
              </div>
              <h3 style={{
                fontFamily: "'Lora', Georgia, serif", fontWeight: 500,
                fontSize: 'clamp(17px, 1.02vw, 26px)', lineHeight: 1.2, marginBottom: 4,
                paddingRight: 'clamp(67px, 5vw, 100px)', color: TEXT,
              }}>
                Das <em style={{ fontStyle: 'italic', color: CLAY }}>GLP-1 + GIP</em>-Prinzip
              </h3>
              <p style={{ fontSize: 'clamp(11px, 0.61vw, 16px)', color: STONE, marginBottom: 16 }}>
                Wirkt gleichzeitig an zwei Rezeptoren<br />
                <span style={{ fontSize: 'clamp(10px, 0.53vw, 14px)', fontWeight: 600, color: CLAY }}>Bsp. Mounjaro®</span>
              </p>
              <DualDiagram />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, padding: 0, margin: 0 }}>
                {[
                  'Kombiniert zwei Sättigungssignale',
                  'Unterstützt den Zucker- & Fettstoffwechsel',
                  'Kann das Sättigungsgefühl zusätzlich verstärken',
                ].map(text => (
                  <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 'clamp(11px, 0.63vw, 16px)', color: TEXT, lineHeight: 1.45 }}>
                    <CheckClay />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Pipeline box */}
        <div style={{
          background: CREAM,
          border: `1px solid ${BORDER}`,
          borderRadius: 20,
          padding: 'clamp(22px, 2vw, 33px) clamp(26px, 2.5vw, 40px)',
          overflow: 'hidden',
          display: 'grid', gridTemplateColumns: 'auto 1fr',
          gap: 'clamp(28px, 2.5vw, 40px)', alignItems: 'center', position: 'relative',
          boxShadow: '0 2px 20px rgba(46,38,32,0.07)',
        }}>
          {/* Corner badge */}
          <div style={{
            position: 'absolute', top: 14, right: 14,
            transform: 'rotate(6deg)',
            background: SAGE, color: '#fff', borderRadius: 999,
            padding: '8px 16px', textAlign: 'center',
            pointerEvents: 'none',
            boxShadow: '0 4px 14px rgba(79,107,90,.25)',
            lineHeight: 1.3, zIndex: 2,
          }}>
            <span style={{ display: 'block', fontSize: '.62rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', opacity: .8 }}>
              Peptide.
            </span>
            <span style={{ display: 'block', fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '.82rem', fontWeight: 500 }}>
              Retatrutid
            </span>
          </div>

          {/* Label */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 4,
            borderRight: `1px solid ${BORDER}`,
            paddingRight: 'clamp(26px, 2.5vw, 40px)',
            minWidth: 'clamp(140px, 10vw, 200px)',
          }}>
            <span style={{ fontSize: 'clamp(9px, 0.51vw, 13px)', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: STONE, marginBottom: 4 }}>
              Ausblick
            </span>
            <h4 style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 500, fontSize: 'clamp(14px, 0.82vw, 21px)', lineHeight: 1.25, color: TEXT }}>
              Was als Nächstes<br />kommt
            </h4>
          </div>

          {/* Pipeline items */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(16px, 1.6vw, 25px)' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 'clamp(9px, 0.5vw, 13px)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4, color: '#9c7223' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#9c7223', flexShrink: 0 }} />
                Bald verfügbar
              </span>
              <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(13px, 0.74vw, 19px)', fontWeight: 500, color: TEXT }}>Semaglutid als Tablette</span>
              <span style={{ fontSize: 'clamp(10px, 0.56vw, 14px)', color: STONE, lineHeight: 1.35, fontWeight: 500 }}>Oraltherapie · kein Stich mehr nötig</span>
              <span style={{ fontSize: 'clamp(10px, 0.55vw, 14px)', color: STONE, marginTop: 3, fontStyle: 'italic', lineHeight: 1.4 }}>EU-Zulassungsempfehlung liegt vor · Marktstart DE: 2026–27</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 'clamp(9px, 0.5vw, 13px)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4, color: '#9c7223' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#9c7223', flexShrink: 0 }} />
                Bald verfügbar
              </span>
              <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(13px, 0.74vw, 19px)', fontWeight: 500, color: TEXT }}>Höhere Dosisstufe</span>
              <span style={{ fontSize: 'clamp(10px, 0.56vw, 14px)', color: STONE, lineHeight: 1.35, fontWeight: 500 }}>Hochdosis-Semaglutid (Injektion)</span>
              <span style={{ fontSize: 'clamp(10px, 0.55vw, 14px)', color: STONE, marginTop: 3, fontStyle: 'italic', lineHeight: 1.4 }}>EU-zugelassen · Verfügbarkeit 2. Halbjahr 2026</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 'clamp(9px, 0.5vw, 13px)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4, color: '#566f86' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#566f86', flexShrink: 0 }} />
                In Forschung
              </span>
              <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(13px, 0.74vw, 19px)', fontWeight: 500, color: TEXT }}>Nächste Wirkstoffgeneration</span>
              <span style={{ fontSize: 'clamp(10px, 0.56vw, 14px)', color: STONE, lineHeight: 1.35, fontWeight: 500 }}>Triple-Agonist (GLP-1 / GIP / Glukagon)</span>
              <span style={{ fontSize: 'clamp(10px, 0.55vw, 14px)', color: STONE, marginTop: 3, fontStyle: 'italic', lineHeight: 1.4 }}>Spricht drei Rezeptoren gleichzeitig an · Phase III · stärkster bisher gemessener Gewichtsverlust in klinischen Studien</span>
            </div>

          </div>
        </div>

        {/* Disclaimer */}
        <p style={{
          marginTop: 'clamp(22px, 2.2vw, 35px)',
          fontSize: 'clamp(11px, 0.58vw, 15px)', color: STONE, lineHeight: 1.65,
          borderTop: `1px solid ${BORDER}`, paddingTop: 16,
        }}>
          Welches Wirkprinzip im Einzelfall geeignet ist, entscheidet allein die behandelnde Ärztin oder der behandelnde Arzt nach individueller medizinischer Prüfung. Diese Darstellung dient ausschließlich der allgemeinen Aufklärung und stellt keine Arzneimittelwerbung, kein Heilversprechen und keine Therapieempfehlung dar. Angaben zu Zulassung und Marktstart beruhen auf öffentlichen Quellen (Stand: Juni 2026).
        </p>

      </div>
    </section>
  );
}
