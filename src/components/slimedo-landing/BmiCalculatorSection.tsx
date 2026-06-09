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
        padding: 'clamp(72px, 5.88vw, 130px) 0 clamp(60px, 4.88vw, 110px)',
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
          maxWidth: 1800,
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
              fontSize: 'clamp(48px, 3.75vw, 100px)',
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
                fontSize: 'clamp(12px, 0.8vw, 16px)',
                color: '#B0832B',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                fontWeight: 500,
                margin: '0 0 20px',
              }}
            >
              Klinische Studien
            </p>
            <p
              className="bmi-stat-num-resp"
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: 'clamp(80px, 7.81vw, 185px)',
                color: '#1E3A2E',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                margin: 0,
                fontWeight: 400,
              }}
            >
              15
              <span style={{ fontSize: 'clamp(48px, 4.38vw, 105px)', color: '#1E3A2E' }}>-</span>
              20
              <span style={{ fontSize: 'clamp(48px, 4.38vw, 105px)', color: '#1E3A2E' }}>%</span>
            </p>
            {/* Honey underline */}
            <span
              style={{
                display: 'block',
                width: 72,
                height: 3,
                background: '#EDD89A',
                borderRadius: 999,
                margin: '28px auto 0',
              }}
            />
            <div style={{ marginTop: 20 }}>
              <p
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: 'clamp(18px, 1.4vw, 28px)',
                  fontWeight: 600,
                  color: '#1A1A1A',
                  margin: '0 0 10px',
                  lineHeight: 1.25,
                }}
              >
                Durchschnittliche
                <br />
                Körpergewichtsreduktion
              </p>
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 'clamp(14px, 0.9vw, 18px)',
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
              padding: '40px 36px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow:
                '0 1px 2px rgba(15,31,26,0.03),0 8px 24px rgba(15,31,26,0.06),0 24px 48px rgba(15,31,26,0.04)',
            }}
          >
            <div
              className="bmi-card-photo-resp"
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'clamp(250px, 34%, 390px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            >
              <img
                src="/images/BmiCalculater/BmiBackground.jpeg"
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, #FFFDF7 0%, rgba(255,253,247,0.78) 18%, rgba(255,253,247,0.12) 52%, rgba(61,92,74,0.10) 100%)',
                }}
              />
            </div>

            <div
              className="bmi-card-content-resp"
              style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: 'calc(66% - 18px)',
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
                  background: '#1E3A2E',
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

            <div
              className="bmi-result-layout-resp"
              style={{
                display: 'grid',
                gridTemplateColumns: '170px minmax(0, 1fr)',
                gap: 22,
                alignItems: 'end',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  alignSelf: 'stretch',
                }}
              >
                <img
                  className="bmi-slider-image-resp"
                  src="/images/BmiCalculater/women-bmi.png"
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: 155,
                    maxWidth: '100%',
                    height: 'auto',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                />
              </div>

              {/* Mobile-only: BmiBackground photo next to silhouette */}
              <div className="bmi-bg-photo-mobile-cell" aria-hidden="true">
                <img
                  src="/images/BmiCalculater/BmiBackground.jpeg"
                  alt=""
                  className="bmi-bg-photo-mobile"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                />
              </div>

              <div className="bmi-result-text-resp">
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
                  fontSize: 'clamp(36px, 3.44vw, 80px)',
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
            </div>
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
          SURMOUNT-Programme). Individuelle Ergebnisse können abweichen. Eine medikamentöse
            Therapie ersetzt keine ärztliche Beratung.
        </p>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .bmi-grid-resp { grid-template-columns: 1fr !important; }
          .bmi-hl-resp { font-size: 48px !important; }
          .bmi-stat-num-resp { font-size: 80px !important; }
          .bmi-card-content-resp { max-width: calc(68% - 18px) !important; }
        }
        .bmi-bg-photo-mobile-cell { display: none; }

        @media (max-width: 640px) {
          .bmi-hl-resp { font-size: 32px !important; }
          .bmi-stat-num-resp { font-size: 52px !important; }
          .bmi-slider-card-resp { padding: 32px 24px !important; }
          .bmi-card-photo-resp { display: none !important; }
          .bmi-card-content-resp { max-width: none !important; }

          /* Result grid: 2 images side by side, text below spanning full width */
          .bmi-result-layout-resp {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
            align-items: end !important;
          }
          .bmi-result-text-resp {
            grid-column: 1 / -1 !important;
          }

          /* Silhouette: contain so no crop, aligned to bottom */
          .bmi-slider-image-resp {
            width: 100% !important;
            height: 200px !important;
            object-fit: contain !important;
            object-position: bottom center !important;
          }

          /* Background photo: cover, show upper body */
          .bmi-bg-photo-mobile-cell {
            display: flex !important;
            align-items: flex-end;
          }
          .bmi-bg-photo-mobile {
            width: 100% !important;
            height: 200px !important;
            object-fit: cover !important;
            object-position: top center !important;
            border-radius: 14px !important;
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}



