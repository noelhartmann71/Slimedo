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
      className="bmi-section-resp"
      style={{
        background: '#F5EEDB',
        padding: 'clamp(72px, 5.88vw, 130px) 0 clamp(60px, 4.88vw, 110px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Honey glow */}
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] z-0 h-[60%] w-[50%] bg-[radial-gradient(ellipse_at_center,rgba(237,216,154,0.25)_0%,transparent_60%)]" />

      <div className="relative z-[2] mx-auto max-w-[1800px] px-10">
        {/* Header */}
        <header className="mx-auto mb-16 max-w-[720px] text-center">
          <p className="mb-4 text-[12px] font-medium tracking-[0.16em] uppercase text-sage">
            Potenzial
          </p>
          <h2 className="bmi-hl-resp m-0 font-instrument text-[clamp(48px,3.75vw,100px)] font-normal leading-[1.02] tracking-[-0.01em] text-ink">
            Berechne dein{' '}
            <em className="italic text-sage">Potenzial</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[540px] text-[16px] leading-[1.55] text-olive">
            Stelle dein Startgewicht ein und sieh, wie viel du laut Studien durchschnittlich
            abnehmen könntest.
          </p>
        </header>

        {/* Two-column grid */}
        <div className="bmi-grid-resp grid grid-cols-[1fr_1.6fr] items-stretch gap-8">
          {/* Stat card */}
          <div className="bmi-stat-card-resp flex flex-col items-center justify-center rounded-[28px] bg-surf px-12 py-14 text-center shadow-[0_1px_2px_rgba(15,31,26,0.03),0_8px_24px_rgba(15,31,26,0.06),0_24px_48px_rgba(15,31,26,0.04)]">
            <p className="bmi-stat-label-resp mb-5 text-[clamp(12px,0.8vw,16px)] font-medium tracking-[0.16em] uppercase text-honig">
              Klinische Studien
            </p>
            <p className="bmi-stat-num-resp m-0 font-instrument text-[clamp(80px,7.81vw,185px)] font-normal leading-[0.95] tracking-[-0.03em] text-deep">
              15
              <span className="text-[clamp(48px,4.38vw,105px)] text-deep">-</span>
              20
              <span className="text-[clamp(48px,4.38vw,105px)] text-deep">%</span>
            </p>
            {/* Honey underline */}
            <span className="bmi-stat-rule-resp mx-auto mt-7 block h-[3px] w-[72px] rounded-full bg-honig2" />
            <div className="bmi-stat-copy-resp mt-5">
              <p className="bmi-stat-copy-title-resp mb-2.5 font-[Manrope,sans-serif] text-[clamp(18px,1.4vw,28px)] font-semibold leading-[1.25] text-ink">
                Durchschnittliche
                <br />
                Körpergewichtsreduktion
              </p>
              <p className="m-0 text-[clamp(14px,0.9vw,18px)] leading-[1.45] text-olive">
                Nach 12 Monaten Therapie
                <sup className="font-semibold text-honig">*</sup>
              </p>
            </div>
          </div>

          {/* Slider card */}
          <div className="bmi-slider-card-resp relative overflow-hidden rounded-[28px] bg-surf px-9 py-10 shadow-[0_1px_2px_rgba(15,31,26,0.03),0_8px_24px_rgba(15,31,26,0.06),0_24px_48px_rgba(15,31,26,0.04)]">
            <div
              className="bmi-card-photo-resp pointer-events-none absolute top-0 right-0 bottom-0 z-0 w-[clamp(250px,34%,390px)]"
              aria-hidden="true"
            >
              <img
                src="/images/BmiCalculater/BmiBackground.jpeg"
                alt=""
                className="block h-full w-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, #FFFDF7 0%, rgba(255,253,247,0.78) 18%, rgba(255,253,247,0.12) 52%, rgba(61,92,74,0.10) 100%)',
                }}
              />
            </div>

            <div className="bmi-card-content-resp relative z-[1] max-w-[calc(66%_-_18px)]">
            <p className="mb-2 text-[11.5px] font-medium tracking-[0.16em] uppercase text-sage">
              Dein Rechner
            </p>
            <h3 className="bmi-slider-question-resp mb-7 font-[Manrope,sans-serif] text-[22px] font-semibold tracking-[-0.01em] text-ink">
              Wie viel könntest du abnehmen?
            </h3>

            {/* Weight display */}
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-[13.5px] font-medium text-olive">
                Mein aktuelles Gewicht
              </span>
              <span className="rounded-full bg-sand px-[18px] py-1.5 font-[Manrope,sans-serif] text-[22px] font-semibold text-ink">
                {weight}
                <span className="ml-0.5 text-[14px] font-normal text-olive">
                  {' '}
                  kg
                </span>
              </span>
            </div>

            {/* Slider track */}
            <div className="relative mt-6 mb-4 h-2 cursor-pointer rounded-full bg-sand2">
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-deep"
                style={{ width: `${sliderPct}%` }}
              />
              <div
                className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-surf bg-deep shadow-[0_2px_8px_rgba(30,58,46,0.3)]"
                style={{ left: `${sliderPct}%` }}
              />
              <input
                type="range"
                min={MIN_KG}
                max={MAX_KG}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Gewicht in kg"
              />
            </div>
            <div className="mb-8 flex justify-between text-[11.5px] text-olive">
              <span>{MIN_KG} kg</span>
              <span>{MAX_KG} kg</span>
            </div>

            {/* Divider */}
            <div className="bmi-slider-divider-resp mb-7 h-px bg-sand2" />

            <div className="bmi-result-layout-resp grid grid-cols-[170px_minmax(0,1fr)] items-end gap-[22px]">
              <div className="flex items-end justify-center self-stretch">
                <img
                  className="bmi-slider-image-resp pointer-events-none h-auto w-[155px] max-w-full select-none"
                  src="/images/BmiCalculater/women-bmi.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>

              {/* Mobile-only: BmiBackground photo next to silhouette */}
              <div className="bmi-bg-photo-mobile-cell" aria-hidden="true">
                <img
                  src="/images/BmiCalculater/BmiBackground.jpeg"
                  alt=""
                  className="bmi-bg-photo-mobile pointer-events-none select-none"
                />
              </div>

              <div className="bmi-result-text-resp">
            {/* Result */}
            <span className="mb-3.5 inline-block rounded-full bg-mint px-3 py-[5px] text-[11.5px] font-medium tracking-[0.01em] text-deep">
              Mögliche Abnahme
            </span>
            <p className="mb-3 text-[13.5px] text-olive">
              Nach 12 Monaten Therapie:
            </p>
            <div className="mb-1.5 flex items-baseline gap-3">
              <span className="font-instrument text-[clamp(36px,3.44vw,80px)] font-normal italic leading-none tracking-[-0.02em] text-sage">
                -{lossLow} bis -{lossHigh}
              </span>
              <span className="font-[Manrope,sans-serif] text-[20px] font-semibold text-ink">
                kg
              </span>
            </div>
            <p className="mb-7 text-[12.5px] leading-[1.4] text-olive">
              Basierend auf 15-20 % durchschnittlicher Reduktion in klinischen Studien.
            </p>

            <a
              href="/product/select"
              className="inline-flex items-center gap-2.5 rounded-full bg-sage px-7 py-4 text-[15px] font-medium text-cream no-underline transition-colors hover:bg-deep"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Behandlung starten <span style={{ fontSize: 16 }}>→</span>
            </a>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mx-auto mt-12 max-w-[640px] text-center text-[11.5px] leading-[1.5] text-stein">
          <sup className="font-semibold text-honig">*</sup>
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
          .bmi-section-resp { padding: 44px 0 !important; }
          .bmi-hl-resp { font-size: 32px !important; }
          .bmi-stat-num-resp { font-size: 52px !important; }
          .bmi-stat-card-resp {
            width: auto !important;
            max-width: none !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            padding: 24px 18px !important;
            display: grid !important;
            grid-template-columns: minmax(94px, .36fr) 3px minmax(0, .64fr);
            column-gap: 10px;
            row-gap: 8px;
            align-items: center !important;
            text-align: left !important;
            position: relative;
          }
          .bmi-stat-label-resp {
            grid-column: 1;
            grid-row: 1;
            margin: 0 0 4px !important;
            font-size: 9px !important;
            letter-spacing: .1em !important;
          }
          .bmi-stat-num-resp {
            grid-column: 1;
            grid-row: 2;
            font-size: 43px !important;
            margin: 0 !important;
            white-space: nowrap;
          }
          .bmi-stat-num-resp span {
            font-size: 27px !important;
          }
          .bmi-stat-rule-resp {
            grid-column: 2;
            grid-row: 1 / 4;
            align-self: center;
            justify-self: center;
            width: 3px !important;
            height: 46px !important;
            min-height: 0;
            margin: 0 !important;
          }
          .bmi-stat-copy-resp {
            grid-column: 3;
            grid-row: 1 / 4;
            margin: 0 !important;
            align-self: center;
          }
          .bmi-stat-copy-title-resp {
            font-size: clamp(13px, 3.45vw, 15px) !important;
            line-height: 1.22 !important;
            margin-bottom: 6px !important;
          }
          .bmi-stat-copy-resp p:last-child {
            font-size: clamp(11px, 3vw, 13px) !important;
            line-height: 1.32 !important;
          }
          .bmi-slider-card-resp {
            padding: 22px 18px !important;
            border-radius: 22px !important;
          }
          .bmi-slider-question-resp {
            margin-bottom: 18px !important;
            font-size: clamp(15.5px, 4.15vw, 18px) !important;
            line-height: 1.12 !important;
            white-space: nowrap !important;
            letter-spacing: -0.02em !important;
          }
          .bmi-slider-divider-resp {
            display: none !important;
          }
          .bmi-slider-card-resp .mb-8 {
            margin-bottom: 18px !important;
          }
          .bmi-card-photo-resp { display: none !important; }
          .bmi-card-content-resp { max-width: none !important; }

          /* Result grid: 2 images side by side, text below spanning full width */
          .bmi-result-layout-resp {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            align-items: end !important;
          }
          .bmi-result-text-resp {
            grid-column: 1 / -1 !important;
          }

          /* Silhouette: contain so no crop, aligned to bottom */
          .bmi-slider-image-resp {
            width: 100% !important;
            height: 158px !important;
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
            height: 158px !important;
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



