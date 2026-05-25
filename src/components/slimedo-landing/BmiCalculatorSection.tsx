import { useState } from 'react';

const MIN_KG = 60;
const MAX_KG = 150;
const LOSS_LOW = 0.15;
const LOSS_HIGH = 0.2;

export default function BmiCalculatorSection() {
  const [weight, setWeight] = useState(95);

  const lossLow = Math.round(weight * LOSS_LOW);
  const lossHigh = Math.round(weight * LOSS_HIGH);
  const sliderPct = ((weight - MIN_KG) / (MAX_KG - MIN_KG)) * 100;

  return (
    <section
      id="potenzial"
      style={{
        background: '#F5EEDB',
        padding: '96px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Honey glow */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '-10%',
          width: '50%',
          height: '60%',
          background:
            'radial-gradient(ellipse at center, rgba(237,216,154,0.25) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: '0 40px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header */}
        <header
          style={{
            textAlign: 'center',
            marginBottom: 64,
            maxWidth: 720,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 12,
              color: '#3D5C4A',
              margin: '0 0 16px',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontWeight: 500,
            }}
          >
            Potenzial
          </p>
          <h2
            className="bmi-hl-resp"
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 62,
              margin: 0,
              color: '#1A1A1A',
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}
          >
            Berechne dein{' '}
            <em style={{ color: '#3D5C4A', fontStyle: 'italic' }}>Potenzial</em>
          </h2>
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 16,
              color: '#768064',
              margin: '20px auto 0',
              maxWidth: 540,
              lineHeight: 1.55,
            }}
          >
            Stelle dein Startgewicht ein und sieh, wie viel du laut Studien durchschnittlich
            abnehmen könntest.
          </p>
        </header>

        {/* Two-column grid */}
        <div
          className="bmi-grid-resp"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: 32,
            alignItems: 'stretch',
          }}
        >
          {/* Stat card */}
          <div
            style={{
              background: '#FFFDF7',
              borderRadius: 28,
              padding: '56px 48px',
              textAlign: 'center',
              boxShadow:
                '0 1px 2px rgba(15,31,26,0.03),0 8px 24px rgba(15,31,26,0.06),0 24px 48px rgba(15,31,26,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 11.5,
                color: '#B0832B',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                fontWeight: 500,
                margin: '0 0 16px',
              }}
            >
              Klinische Studien
            </p>
            <p
              className="bmi-stat-num-resp"
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: 128,
                color: '#3D5C4A',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                margin: 0,
                fontWeight: 400,
              }}
            >
              15
              <span style={{ fontSize: 72, color: '#3D5C4A' }}>-</span>
              20
              <span style={{ fontSize: 72, color: '#3D5C4A' }}>%</span>
            </p>
            {/* Honey underline */}
            <span
              style={{
                display: 'block',
                width: 64,
                height: 3,
                background: '#EDD89A',
                borderRadius: 999,
                margin: '24px auto 0',
              }}
            />
            <div style={{ marginTop: 16 }}>
              <p
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#1A1A1A',
                  margin: '0 0 8px',
                  lineHeight: 1.3,
                }}
              >
                Durchschnittliche
                <br />
                  Körpergewichtsreduktion
              </p>
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 13,
                  color: '#768064',
                  margin: 0,
                  lineHeight: 1.45,
                }}
              >
                Nach 12 Monaten Therapie
                <sup style={{ color: '#B0832B', fontWeight: 600 }}>*</sup>
              </p>
            </div>
          </div>

          {/* Slider card */}
          <div
            className="bmi-slider-card-resp"
            style={{
              background: '#FFFDF7',
              borderRadius: 28,
              padding: '40px 36px 40px 230px',
              boxShadow:
                '0 1px 2px rgba(15,31,26,0.03),0 8px 24px rgba(15,31,26,0.06),0 24px 48px rgba(15,31,26,0.04)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 11.5,
                color: '#3D5C4A',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                fontWeight: 500,
                margin: '0 0 8px',
              }}
            >
              Dein Rechner
            </p>
            <h3
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: 22,
                fontWeight: 600,
                color: '#1A1A1A',
                margin: '0 0 28px',
                letterSpacing: '-0.01em',
              }}
            >
              Wie viel könntest du abnehmen?
            </h3>

            <img
              className="bmi-slider-image-resp"
              src="/images/home/women-bmi.png"
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 18,
                bottom: 18,
                width: 190,
                maxWidth: '30%',
                height: 'auto',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />


            {/* Weight display */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 13.5,
                  color: '#768064',
                  fontWeight: 500,
                }}
              >
                Mein aktuelles Gewicht
              </span>
              <span
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: 22,
                  fontWeight: 600,
                  color: '#1A1A1A',
                  background: '#F5EEDB',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                {weight}
                <span
                  style={{
                    fontSize: 14,
                    color: '#768064',
                    marginLeft: 2,
                    fontWeight: 400,
                  }}
                >
                  {' '}
                  kg
                </span>
              </span>
            </div>

            {/* Slider track */}
            <div
              style={{
                position: 'relative',
                height: 8,
                background: '#E5D9BD',
                borderRadius: 999,
                margin: '24px 0 16px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${sliderPct}%`,
                  background: '#3D5C4A',
                  borderRadius: 999,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: `${sliderPct}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 24,
                  height: 24,
                  background: '#1E3A2E',
                  border: '4px solid #FFFDF7',
                  borderRadius: '50%',
                  boxShadow: '0 2px 8px rgba(30,58,46,0.3)',
                }}
              />
              <input
                type="range"
                min={MIN_KG}
                max={MAX_KG}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                  margin: 0,
                }}
                aria-label="Gewicht in kg"
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: '"Inter", sans-serif',
                fontSize: 11.5,
                color: '#768064',
                marginBottom: 32,
              }}
            >
              <span>{MIN_KG} kg</span>
              <span>{MAX_KG} kg</span>
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: '#E5D9BD',
                margin: '0 0 28px',
              }}
            />

            {/* Result */}
            <span
              style={{
                display: 'inline-block',
                background: '#CDDDCB',
                color: '#1E3A2E',
                fontFamily: '"Inter", sans-serif',
                fontSize: 11.5,
                fontWeight: 500,
                padding: '5px 12px',
                borderRadius: 999,
                marginBottom: 14,
                letterSpacing: '0.01em',
              }}
            >
              Mögliche Abnahme
            </span>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13.5,
                color: '#768064',
                margin: '0 0 12px',
              }}
            >
              Nach 12 Monaten Therapie:
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 12,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 56,
                  color: '#3D5C4A',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  fontWeight: 400,
                }}
              >
                -{lossLow} bis -{lossHigh}
              </span>
              <span
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: 20,
                  color: '#1A1A1A',
                  fontWeight: 600,
                }}
              >
                kg
              </span>
            </div>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 12.5,
                color: '#768064',
                margin: '0 0 28px',
                lineHeight: 1.4,
              }}
            >
              Basierend auf 15-20 % durchschnittlicher Reduktion in klinischen Studien.
            </p>

            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#3D5C4A',
                color: '#FAF5EA',
                fontFamily: '"Inter", sans-serif',
                fontSize: 15,
                fontWeight: 500,
                padding: '16px 28px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#1E3A2E')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#3D5C4A')
              }
            >
              Behandlung starten <span style={{ fontSize: 16 }}>→</span>
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <p
          style={{
            textAlign: 'center',
            marginTop: 48,
            fontFamily: '"Inter", sans-serif',
            fontSize: 11.5,
            color: '#6E6A60',
            maxWidth: 640,
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.5,
          }}
        >
          <sup style={{ color: '#B0832B', fontWeight: 600 }}>*</sup>
          Berechnungen basieren auf den Ergebnissen klinischer Studien (STEP- und
          SURMOUNT-Programme). Individuelle Ergebnisse können abweichen. Eine medikamentÃ¶se
          Therapie ersetzt keine ärztliche Beratung.
        </p>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .bmi-grid-resp { grid-template-columns: 1fr !important; }
          .bmi-hl-resp { font-size: 48px !important; }
          .bmi-stat-num-resp { font-size: 96px !important; }
          .bmi-slider-card-resp { padding: 40px 36px !important; }
          .bmi-slider-image-resp { display: none !important; }
        }
        @media (max-width: 640px) {
          .bmi-hl-resp { font-size: 28px !important; }
          .bmi-stat-num-resp { font-size: 44px !important; }
        }
      `}</style>
    </section>
  );
}

