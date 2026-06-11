import { useState, type CSSProperties, type ReactNode } from 'react';

const SAGE = '#4F6B5A';
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
    <svg viewBox="0 0 260 155" fill="none" style={{ width: '100%', height: 'clamp(170px, 13vw, 270px)', marginBottom: 16 }}>
      <rect x="128" y="8" width="11" height="138" rx="5.5" fill={MIST} />
      <circle cx="133" cy="77" r="12" fill={SAGE} />
      <text x="133" y="81" fontSize="13" fill="#fff" textAnchor="middle" fontFamily="Poppins" fontWeight="600">R</text>
      <circle cx="56" cy="77" r="8" fill={SAGE} opacity=".5" className="slimedo-therapie-ion" />
      <path d="M68 77 H114" stroke={SAGE} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <text x="56" y="60" fontSize="11" fill={STONE} textAnchor="middle" fontFamily="Poppins">GLP-1</text>
      <path d="M147 77 H196" stroke={SAGE} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <path d="M196 77 l-6-3 v6 z" fill={SAGE} />
      <text x="210" y="74" fontSize="11" fill={SAGE} fontFamily="Poppins" fontWeight="600">Sättigung</text>
      <text x="225" y="88" fontSize="16" fill={SAGE} textAnchor="middle">↑</text>
      <text x="133" y="130" fontSize="10" fill={STONE} textAnchor="middle" fontFamily="Poppins">Zellmembran</text>
    </svg>
  );
}

function DualDiagram() {
  return (
    <svg viewBox="0 0 260 155" fill="none" style={{ width: '100%', height: 'clamp(170px, 13vw, 270px)', marginBottom: 16 }}>
      <rect x="128" y="8" width="11" height="138" rx="5.5" fill={MIST} />
      <circle cx="133" cy="56" r="11" fill={SAGE} />
      <text x="133" y="60" fontSize="11" fill="#fff" textAnchor="middle" fontFamily="Poppins" fontWeight="600">R1</text>
      <circle cx="133" cy="100" r="11" fill={CLAY} />
      <text x="133" y="104" fontSize="11" fill="#fff" textAnchor="middle" fontFamily="Poppins" fontWeight="600">R2</text>
      <circle cx="56" cy="56" r="7" fill={SAGE} opacity=".5" className="slimedo-therapie-ion" />
      <path d="M67 56 H115" stroke={SAGE} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <text x="54" y="41" fontSize="11" fill={STONE} textAnchor="middle" fontFamily="Poppins">GLP-1</text>
      <circle cx="56" cy="100" r="7" fill={CLAY} opacity=".5" className="slimedo-therapie-ion slimedo-therapie-ion-b" />
      <path d="M67 100 H115" stroke={CLAY} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <text x="54" y="122" fontSize="11" fill={STONE} textAnchor="middle" fontFamily="Poppins">GIP</text>
      <path d="M147 56 q30 0 30 22 H196" stroke={SAGE} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <path d="M147 100 q30 0 30 -22 H196" stroke={CLAY} strokeWidth="1.8" className="slimedo-therapie-flow" />
      <path d="M196 78 l-6-3 v6 z" fill="#8a6f54" />
      <text x="204" y="72" fontSize="11" fill="#8a6f54" fontFamily="Poppins" fontWeight="600">Sättigung</text>
      <text x="204" y="82" fontSize="11" fill="#8a6f54" fontFamily="Poppins" fontWeight="600">verstärkt</text>
      <text x="218" y="96" fontSize="16" fill="#8a6f54" textAnchor="middle">↑</text>
    </svg>
  );
}

// One of the two mechanism cards (GLP-1 / GLP-1+GIP). The accent colour is
// dynamic per card, so it is passed as a CSS variable (--accent) — Tailwind
// arbitrary classes can read it via text-[var(--accent)] but cannot be
// generated from a runtime value directly.
function TherapieCard({
  accent,
  label,
  titleEm,
  desc,
  example,
  image,
  imageAlt,
  diagram,
  checkIcon,
  items,
}: {
  accent: string;
  label: string;
  titleEm: string;
  desc: string;
  example: string;
  image: string;
  imageAlt: string;
  diagram: ReactNode;
  checkIcon: ReactNode;
  items: string[];
}) {
  return (
    <div
      className="slimedo-therapie-card relative overflow-hidden rounded-[22px] border border-[#E8DFD0] bg-[#FFFCF6] px-[clamp(18px,1.72vw,28px)] py-[clamp(22px,2vw,33px)] shadow-[0_2px_20px_rgba(46,38,32,0.07)]"
      style={{ ['--accent']: accent } as CSSProperties}
    >
      <img
        src={image}
        alt={imageAlt}
        className="absolute top-2.5 right-2.5 h-[clamp(100px,6vw,145px)] w-[clamp(100px,6vw,145px)] origin-center rotate-[-38deg] object-contain"
      />
      <div className="therapie-card-label mb-2 pr-[clamp(84px,6.25vw,125px)] text-[clamp(11px,0.65vw,16px)] font-semibold tracking-[0.14em] uppercase text-[var(--accent)]">
        {label}
      </div>
      <h3 className="therapie-card-title mb-1 pr-[clamp(67px,5vw,100px)] font-[Lora,Georgia,serif] text-[clamp(19px,1.25vw,32px)] font-medium leading-[1.2] text-[#2E2620]">
        Das <em className="italic text-[var(--accent)]">{titleEm}</em>-Prinzip
      </h3>
      <p className="therapie-card-desc mb-4 text-[clamp(13px,0.75vw,18px)] text-[#7A6F62]">
        {desc}
        <br />
        <span className="therapie-card-example text-[clamp(14px,0.95vw,18px)] font-semibold text-[var(--accent)]">{example}</span>
      </p>
      {diagram}
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {items.map((text) => (
          <li
            key={text}
            className="therapie-card-item flex items-start gap-[9px] text-[clamp(12px,0.75vw,18px)] leading-[1.45] text-[#2E2620]"
          >
            {checkIcon}
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

const pipelineItems = [
  {
    statusColor: '#9c7223',
    status: 'Bald verfügbar',
    title: 'Semaglutid als Tablette',
    subtitle: 'Oraltherapie · kein Stich mehr nötig',
    desc: 'EU-Zulassungsempfehlung liegt vor · Marktstart DE: 2026–27',
  },
  {
    statusColor: '#9c7223',
    status: 'Bald verfügbar',
    title: 'Höhere Dosisstufe',
    subtitle: 'Hochdosis-Semaglutid (Injektion)',
    desc: 'EU-zugelassen · Verfügbarkeit 2. Halbjahr 2026',
  },
  {
    statusColor: '#566f86',
    status: 'In Forschung',
    title: 'Nächste Wirkstoffgeneration',
    subtitle: 'Triple-Agonist (GLP-1 / GIP / Glukagon)',
    desc: 'Spricht drei Rezeptoren gleichzeitig an · Phase III · stärkster bisher gemessener Gewichtsverlust in klinischen Studien',
  },
];

export default function TherapieSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section
      id="therapie"
      className="slimedo-therapie-section-bg"
      style={{
        position: 'relative',
        padding: 'clamp(40px, 4vw, 80px) 6vw',
        backgroundImage: 'url(/images/therapie/doctorBackground.jpeg)',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'var(--slimedo-therapie-bg-x, -300px) center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <style>{`
        .slimedo-therapie-section-bg {
          --slimedo-therapie-bg-x: -300px;
        }
        @media (max-width: 1440px) {
          .slimedo-therapie-section-bg {
            --slimedo-therapie-bg-x: clamp(-620px, calc(32vw - 761px), -300px);
          }
        }
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

        /* Accordion chevron — only visible on mobile */
        .pipeline-chevron { display: none; }
        .pipeline-accordion-btn { cursor: default !important; }

        @media (max-width: 640px) {
          .pipeline-chevron { display: block; }
          .pipeline-accordion-btn { cursor: pointer !important; }
          .pipeline-sub { display: none; }
          .pipeline-sub--open { display: block; }
          .pipeline-chevron { transition: transform .25s; }
          .pipeline-chevron--open { transform: rotate(180deg); }
        }

        /* ── Mobile ≤ 640px ── */
        @media (max-width: 640px) {
          .slimedo-therapie-section-bg {
            background-position: center top !important;
            background-size: cover !important;
          }
          .slimedo-therapie-overlay {
            background: linear-gradient(
              to bottom,
              rgba(250,246,238,0.72) 0%,
              rgba(250,246,238,0.62) 35%,
              rgba(250,246,238,0.72) 100%
            ) !important;
          }
          .therapie-main-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .therapie-btn-col {
            order: 2;
            align-items: flex-start !important;
          }
          .therapie-cards-grid {
            grid-template-columns: 1fr !important;
            order: 1;
          }
          .therapie-pipeline-box {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .therapie-pipeline-label {
            border-right: none !important;
            border-bottom: 1px solid #E8DFD0 !important;
            padding-right: 0 !important;
            min-width: 0 !important;
            padding-bottom: 16px;
          }
          .therapie-pipeline-items {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .therapie-card-label { font-size: 13px !important; }
          .therapie-card-title { font-size: 22px !important; }
          .therapie-card-desc  { font-size: 15px !important; }
          .therapie-card-item  { font-size: 15px !important; }
        }

        /* ── MacBook 14" (~1280–1520px) ── */
        @media (min-width: 1280px) and (max-width: 1520px) {
          .therapie-card-label { font-size: 12px !important; }
          .therapie-card-title { font-size: 22px !important; }
          .therapie-card-desc  { font-size: 14px !important; }
          .therapie-card-item  { font-size: 14px !important; }
        }

        /* ── MacBook 16" (~1600–1800px) ── */
        @media (min-width: 1600px) and (max-width: 1800px) {
          .therapie-card-label { font-size: 14px !important; }
          .therapie-card-title { font-size: 26px !important; }
          .therapie-card-desc  { font-size: 16px !important; }
          .therapie-card-item  { font-size: 16px !important; }
        }

        /* ── Tablet 641px–1024px ── */
        @media (min-width: 641px) and (max-width: 1024px) {
          .slimedo-therapie-overlay {
            background:
              linear-gradient(to right, rgba(250,246,238,0.50) 0%, rgba(250,246,238,0.94) 52%, #FAF6EE 65%),
              linear-gradient(to bottom, rgba(250,246,238,0.85) 0%, rgba(250,246,238,0) 20%, rgba(250,246,238,0) 80%, rgba(250,246,238,0.85) 100%)
            !important;
          }
          .therapie-main-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .therapie-btn-col {
            order: 2;
            align-items: flex-start !important;
          }
          .therapie-cards-grid {
            order: 1;
          }
          .therapie-pipeline-items {
            grid-template-columns: 1fr 1fr !important;
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
            fontSize: 'clamp(15px, 0.9vw, 22px)', color: TEXT,
            textShadow: '0 1px 16px rgba(250,246,238,0.9)',
          }}>
            Im Alltag oft als „Abnehmspritze" bekannt
          </p>
        </div>

        {/* Main grid: left CTA + right cards */}
        <div className="therapie-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(220px, 26vw, 425px) 1fr',
          gap: 'clamp(44px, 4vw, 65px)',
          alignItems: 'stretch',
          marginBottom: 'clamp(18px, 1.7vw, 28px)',
        }}>
          {/* Left: button pinned to bottom */}
          <div className="therapie-btn-col" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <a
              href="/product/select"
              className="inline-flex items-center gap-2 rounded-full bg-[#4F6B5A] px-[clamp(18px,1.72vw,28px)] py-[clamp(10px,0.94vw,15px)] text-[clamp(13px,0.7vw,18px)] font-medium text-white no-underline shadow-[0_4px_18px_rgba(79,107,90,0.28)] transition-colors hover:bg-[#3F5848]"
            >
              Behandlung anfragen
              <svg viewBox="0 0 16 16" fill="none" width={15} height={15}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Right: two cards */}
          <div className="therapie-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(14px, 1.25vw, 20px)' }}>

            {/* Card: GLP-1 */}
            <TherapieCard
              accent={SAGE}
              label="Einfaches Prinzip"
              titleEm="GLP-1"
              desc="Wirkt gezielt an einem Rezeptor"
              example="Bsp. Wegovy®"
              image="/images/therapie/injection1t.png"
              imageAlt="Wegovy Injektionspen"
              diagram={<GlpDiagram />}
              checkIcon={<CheckSage />}
              items={[
                'Verstärkt das natürliche Sättigungsgefühl',
                'Verlangsamt die Magenentleerung',
                'Kann Heißhunger reduzieren',
              ]}
            />

            {/* Card: GLP-1 + GIP */}
            <TherapieCard
              accent={CLAY}
              label="Duales Prinzip"
              titleEm="GLP-1 + GIP"
              desc="Wirkt gleichzeitig an zwei Rezeptoren"
              example="Bsp. Mounjaro®"
              image="/images/therapie/injection2t.png"
              imageAlt="Mounjaro Injektionspen"
              diagram={<DualDiagram />}
              checkIcon={<CheckClay />}
              items={[
                'Kombiniert zwei Sättigungssignale',
                'Unterstützt den Zucker- & Fettstoffwechsel',
                'Kann das Sättigungsgefühl zusätzlich verstärken',
              ]}
            />

          </div>
        </div>

        {/* Pipeline box */}
        <div className="therapie-pipeline-box" style={{
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
          <div className="therapie-pipeline-label" style={{
            display: 'flex', flexDirection: 'column', gap: 4,
            borderRight: `1px solid ${BORDER}`,
            paddingRight: 'clamp(26px, 2.5vw, 40px)',
            minWidth: 'clamp(140px, 10vw, 200px)',
          }}>
            <span style={{ fontSize: 'clamp(11px, 0.65vw, 15px)', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: STONE, marginBottom: 4 }}>
              Ausblick
            </span>
            <h4 style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 500, fontSize: 'clamp(16px, 1vw, 24px)', lineHeight: 1.25, color: TEXT }}>
              Was als Nächstes<br />kommt
            </h4>
          </div>

          {/* Pipeline items */}
          <div className="therapie-pipeline-items" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(16px, 1.6vw, 25px)' }}>
            {pipelineItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 'clamp(11px, 0.62vw, 14px)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4, color: item.statusColor }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: item.statusColor, flexShrink: 0 }} />
                    {item.status}
                  </span>
                  <button
                    className="pipeline-accordion-btn"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    style={{ all: 'unset', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, cursor: 'pointer' }}
                  >
                    <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(15px, 0.9vw, 22px)', fontWeight: 500, color: TEXT }}>{item.title}</span>
                    <svg className={`pipeline-chevron${isOpen ? ' pipeline-chevron--open' : ''}`} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5l4 4 4-4" stroke={STONE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className={`pipeline-sub${isOpen ? ' pipeline-sub--open' : ''}`}>
                    <span style={{ display: 'block', fontSize: 'clamp(12px, 0.68vw, 16px)', color: STONE, lineHeight: 1.35, fontWeight: 500, marginTop: 4 }}>{item.subtitle}</span>
                    <span style={{ display: 'block', fontSize: 'clamp(12px, 0.67vw, 15px)', color: STONE, marginTop: 3, fontStyle: 'italic', lineHeight: 1.4 }}>{item.desc}</span>
                  </div>
                </div>
              );
            })}
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
