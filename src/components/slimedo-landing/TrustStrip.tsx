const items = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1L2 4V8C2 11.5 4.5 14.5 8 15.5C11.5 14.5 14 11.5 14 8V4L8 1Z"
          stroke="#1E3A2E"
          strokeWidth="1.2"
        />
        <polyline
          points="5,8 7,10 11,6"
          stroke="#1E3A2E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    text: 'Telemedizin-Plattform für Gewichtsreduktion',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="#1E3A2E" strokeWidth="1.2" />
        <polyline
          points="5,8.5 7,10.5 11,6"
          stroke="#1E3A2E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    text: '100% diskret und anonym',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1L2 4V8C2 11.5 4.5 14.5 8 15.5C11.5 14.5 14 11.5 14 8V4L8 1Z"
          stroke="#1E3A2E"
          strokeWidth="1.2"
        />
        <polyline
          points="5,8 7,10 11,6"
          stroke="#1E3A2E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    text: 'DSGVO-konform',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="4.5" r="3" stroke="#1E3A2E" strokeWidth="1.2" />
        <path
          d="M2 15C2 15 2 11 8 11C14 11 14 15 14 15"
          stroke="#1E3A2E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    text: 'Deutsche, approbierte ÄrztInnen',
  },
];

export default function TrustStrip() {
  return (
    <div
      style={{
        background:
          'linear-gradient(to bottom,#F5EEDB 0%,#DCE3CB 28px,#CDDDCB 64px,#CDDDCB 100%)',
        padding: '54px 32px 28px',
        position: 'relative',
      }}
    >
      {/* Top honey hairline */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          maxWidth: 600,
          height: 1,
          background:
            'linear-gradient(to right,transparent 0%,rgba(237,216,154,.35) 30%,rgba(237,216,154,.45) 50%,rgba(237,216,154,.35) 70%,transparent 100%)',
          opacity: 0.7,
        }}
      />
      <div
        className="tstrip-inner-resp"
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 15,
              color: '#1E3A2E',
              fontWeight: 500,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {item.icon}
            {item.text}
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .tstrip-inner-resp { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
        }
      `}</style>
    </div>
  );
}
