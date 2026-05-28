const items = [
  'Diskret',
  'Deutschlandweit verfügbar',
  'Telemedizinisch begleitet',
  'Moderne Adipositas-Therapie',
  'Medizinisch verantwortet',
  'DSGVO-konform',
  'Approbierte Ärzte',
];

export default function SlimedoTicker() {
  // Duplicate for seamless loop
  const all = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 210,
        background: '#1E3A2E',
        height: 36,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'slimedo-ticker 32s linear infinite',
        }}
      >
        {all.map((text, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 10,
              fontWeight: 400,
              color: 'rgba(205,221,203,.80)',
              padding: '0 28px',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              textShadow: '0 0 12px rgba(205,221,203,.32)',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: 'rgba(205,221,203,.45)',
                flexShrink: 0,
              }}
            />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
