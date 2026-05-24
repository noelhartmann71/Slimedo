export default function TestimonialsSection() {
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
          ⚠️ Platzhalter — echte Reviews folgen
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
          Slimedo{' '}
          <em style={{ color: '#3D5C4A', fontStyle: 'italic' }}>verändert Leben</em>
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
            marginBottom: 36,
            fontFamily: '"Inter", sans-serif',
          }}
        >
          4.7 auf Trustpilot · Bewertungen folgen nach Launch
        </p>

        <div
          style={{
            background: '#F5EEDB',
            borderRadius: 18,
            padding: 36,
            maxWidth: 680,
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
            — kg{' '}
            <span
              style={{
                fontSize: 18,
                fontWeight: 400,
                color: '#6E6A60',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Gewichtsverlust in — Monaten
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
            &ldquo;[Echtes Patientenzitat einsetzen — schriftliche Einwilligung
            erforderlich]&rdquo;
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
      </div>
    </section>
  );
}
