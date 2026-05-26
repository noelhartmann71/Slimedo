import { useState } from 'react';

type Testimonial = {
  id: number;
  kg: number;
  period: string;
  quote: string;
  beforeImg: string;
  afterImg: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    kg: 21,
    period: 'Gewichtsverlust in 6 Monaten',
    quote:
      'Dieses Mal war es nicht nur eine weitere Diät. Mit Slimedo habe ich 21 kg abgenommen, angefangen ins Fitnessstudio zu gehen und endlich begonnen, die Frau im Spiegel zu lieben.',
    beforeImg:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=380&h=420&fit=crop',
    afterImg:
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=380&h=420&fit=crop',
  },
  {
    id: 2,
    kg: 18,
    period: 'Gewichtsverlust in 5 Monaten',
    quote:
      'Der medizinische Ansatz von Slimedo machte den ganzen Unterschied. 18 kg abzunehmen veränderte nicht nur meinen Körper, sondern meine gesamte Sicht auf Gesundheit.',
    beforeImg:
      'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=380&h=420&fit=crop',
    afterImg:
      'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=380&h=420&fit=crop',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section
      id="bewertungen"
      style={{
        background: '#FFFDF7',
        padding: '72px 0',
        borderTop: '2px dashed #E5D9BD',
        borderBottom: '2px dashed #E5D9BD',
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 40px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#EDD89A',
            color: '#5A3F00',
            fontFamily: '"Manrope", sans-serif',
            fontSize: 12,
            fontWeight: 700,
            padding: '6px 16px',
            borderRadius: 999,
            marginBottom: 20,
            textTransform: 'uppercase',
            letterSpacing: '.08em',
          }}
        >
          Echte Patientenerfahrungen
        </div>

        <h2
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 48,
            fontWeight: 400,
            color: '#1A1A1A',
            marginBottom: 16,
          }}
        >
          Slimedo <em style={{ color: '#3D5C4A', fontStyle: 'italic' }}>verändert Leben</em>
        </h2>

        <div
          style={{
            color: '#EDD89A',
            fontSize: 22,
            letterSpacing: 2,
            marginBottom: 8,
          }}
        >
          ★★★★★
        </div>
        <p
          style={{
            fontSize: 14,
            color: '#6E6A60',
            marginBottom: 20,
            fontFamily: '"Inter", sans-serif',
          }}
        >
          4,7 auf Trustpilot · 10353 Bewertungen
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <button
            type="button"
            onClick={prev}
            aria-label="Vorheriges Testimonial"
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              border: '1px solid #E5D9BD',
              background: '#FFFDF7',
              color: '#6E6A60',
              cursor: 'pointer',
            }}
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Nächstes Testimonial"
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              border: '1px solid #E5D9BD',
              background: '#FFFDF7',
              color: '#6E6A60',
              cursor: 'pointer',
            }}
          >
            →
          </button>
        </div>

        <div
          className="testimonials-layout-resp"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 300px',
            gap: 16,
            alignItems: 'stretch',
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              background: '#F5EEDB',
              borderRadius: 18,
              padding: 36,
            }}
          >
            <div
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: 42,
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: 16,
              }}
            >
              {t.kg} kg{' '}
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: '#6E6A60',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {t.period}
              </span>
            </div>
            <p
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: 17,
                fontStyle: 'italic',
                color: '#6E6A60',
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              “{t.quote}”
            </p>
            <p
              style={{
                fontSize: 11,
                color: '#768064',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              *Individuelle Ergebnisse. STEP-1, NEJM 2021.
            </p>
          </div>

          <div
            className="testimonials-images-resp"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: 14,
                overflow: 'hidden',
                minHeight: 168,
              }}
            >
              <img
                src={t.beforeImg}
                alt="Vorher"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 10,
                  bottom: 10,
                  background: 'rgba(255,253,247,0.9)',
                  color: '#1A1A1A',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 11,
                  fontWeight: 500,
                  padding: '4px 10px',
                  borderRadius: 999,
                }}
              >
                Vorher
              </span>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: 14,
                overflow: 'hidden',
                minHeight: 168,
              }}
            >
              <img
                src={t.afterImg}
                alt="Nachher"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 10,
                  bottom: 10,
                  background: 'rgba(255,253,247,0.9)',
                  color: '#1A1A1A',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 11,
                  fontWeight: 500,
                  padding: '4px 10px',
                  borderRadius: 999,
                }}
              >
                Nachher
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-layout-resp { grid-template-columns: 1fr !important; }
          .testimonials-images-resp { grid-template-columns: 1fr 1fr !important; grid-template-rows: none !important; }
        }
      `}</style>
    </section>
  );
}
