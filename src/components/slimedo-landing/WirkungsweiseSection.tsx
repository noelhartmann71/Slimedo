import { useRef, useEffect } from 'react';

const cards = [
  {
    label: 'Gehirn',
    title: 'Weniger Appetit',
    body: 'Kann Sättigung fördern und Heißhunger reduzieren.',
    icon: (
      <svg width="68" height="68" viewBox="0 0 48 48" fill="none" color="#3D5C4A">
        <path fillRule="evenodd" clipRule="evenodd" d="M38.8848 20.2587C38.859 22.0063 38.8362 23.5454 39.7146 25.3658C39.7146 25.3658 42.3113 27.7019 41.9689 29.5761C41.6265 31.4504 38.245 31.9665 38.245 31.9665C38.245 39.5393 31.0135 39.0572 27.4041 38.345C27.3311 38.3306 27.2595 38.3161 27.1896 38.3015C26.1095 38.0772 25.4041 37.8458 25.4041 37.8458V39.2689C25.4041 39.2689 25.3289 39.5073 25.097 39.8429C25.0354 39.9321 24.9627 40.0281 24.8774 40.1283C24.2002 40.9241 22.7289 41.9852 19.697 41.9852C17.4128 42.1661 13.5031 40.6709 12.4667 38.5626V32.1144C8.81421 29.3845 6 25.7069 6 20.9397C6 16.9775 7.65352 13.1775 10.5968 10.3758C13.5401 7.57402 17.532 6.00001 21.6945 6.00001C24.8731 5.99658 28.014 6.65481 30.8971 7.9286C33.1693 8.83941 35.1586 10.2889 36.6756 12.1389C38.0608 14.0823 38.8286 16.3645 38.8871 18.7124C38.8997 19.2519 38.8921 19.7638 38.8848 20.2587ZM27.4495 21.8803C27.2936 22.0547 27.2123 22.1457 26.7229 22.1457C25.95 22.1457 25.195 21.9188 24.5566 21.4947C24.1084 21.9569 23.5588 22.315 22.9489 22.5421C22.8712 22.5794 22.7998 22.619 22.7335 22.6611C22.3876 22.8805 22.1829 23.1639 21.9734 23.4979C21.9378 23.5548 21.902 23.6131 21.8653 23.6728C21.8129 23.7582 21.7585 23.8469 21.7005 23.9378C21.3176 24.5377 21.1151 25.2301 21.116 25.9363V29.9138H17C16.8964 29.0617 16.7018 28.243 16.2302 27.518C15.7587 26.7929 15.1261 26.1799 14.379 25.7242C13.7306 25.4529 13.1708 25.0143 12.7601 24.4558C12.3495 23.8973 12.1036 23.2401 12.0492 22.5554C11.3743 21.8601 10.9988 20.9396 11.0001 19.9832C10.9949 19.1586 11.273 18.3559 11.7903 17.7028C11.6951 17.3796 11.6492 17.0445 11.6541 16.7084C11.6528 15.9044 11.9169 15.1213 12.4074 14.4744L14.379 13.1153C14.6815 12.4535 15.1743 11.891 15.7981 11.4957C16.4218 11.1005 17.1498 10.8894 17.8941 10.8879C18.2016 10.8897 18.5078 10.9253 18.807 10.9939C19.4402 10.4198 20.2535 10.0697 21.116 10L25.305 10.2839C26.2294 10.5063 27.0375 11.0516 27.5759 11.816H27.8484L30.2686 12.6402C30.9551 13.1756 31.4328 13.9234 31.6224 14.7594C32.4529 15.1103 33.1345 15.7281 33.5529 16.5096C33.9713 17.291 34.1012 18.1886 33.9208 19.0521C33.7405 19.9155 33.2609 20.6926 32.5622 21.2531L30.0828 22.1311C29.3023 22.1399 28.5374 21.918 27.8892 21.4947C27.6551 21.6502 27.5398 21.7793 27.4495 21.8803ZM34 25.5C34 26.3284 33.3284 27 32.5 27C31.6716 27 31 26.3284 31 25.5C31 24.6716 31.6716 24 32.5 24C33.3284 24 34 24.6716 34 25.5ZM21 32V34H17V32H21ZM17 36V38H21V36H17Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Magen-Darm',
    title: 'Länger satt',
    body: 'Verlangsamt die Magenentleerung nach Mahlzeiten.',
    icon: (
      <svg width="68" height="68" viewBox="0 0 48 48" fill="none" color="#3D5C4A">
        <path fillRule="evenodd" clipRule="evenodd" d="M22.9092 6H16.0757C16.0757 6.15504 16.0754 6.30978 16.0751 6.46422C16.0705 9.1957 16.066 11.8294 17.5268 14.2842C18.5423 15.9905 20.053 17.1898 21.5767 18.3995C21.7998 18.5765 22.023 18.7538 22.2451 18.9329C25.2665 21.3699 23.3756 25.2268 20.1984 26.1331C19.2145 26.4138 18.2869 26.6205 17.4153 26.8147C13.9681 27.5828 11.3976 28.1556 9.68655 32.3378C9.23317 33.446 9 34.6285 9 35.8224V42H15.827V35.5539C15.827 33.785 17.8285 32.7045 19.3769 33.4669C23.4348 35.4651 28.2951 36.1013 32.6479 34.4134C35.5853 33.2743 37.5612 31.1218 39.1616 28.506C41.499 24.6855 41.5916 19.8049 39.397 15.9016C37.4738 12.4809 34.7986 9.12802 30.4682 9.12802C29.5955 9.12802 28.6576 9.46714 27.733 9.80141C26.1048 10.3901 24.5181 10.9638 23.4029 9.64336C22.7764 8.90155 22.8331 7.77693 22.8834 6.77772C22.8971 6.50578 22.9103 6.24312 22.9092 6Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Bauchspeicheldrüse',
    title: 'Stabiler Blutzucker',
    body: 'Unterstützt die Regulation von Insulin und Glukagon.',
    icon: (
      <svg width="68" height="68" viewBox="0 0 48 48" fill="none" color="#3D5C4A">
        <path fillRule="evenodd" clipRule="evenodd" d="M23.4677 8.4V6H21.1386C12.8811 6 6 12.6117 6 21C6 29.3883 12.8811 36 21.1386 36V42H23.4677V36C23.4677 34.6745 22.4249 33.6 21.1386 33.6C14.0641 33.6 8.32902 27.9588 8.32902 21C8.32902 14.8236 12.847 9.68507 18.8096 8.60776C19.5649 8.4713 22.6723 8.4 23.4677 8.4ZM25.0474 30.2399C26.9047 31.534 28.1257 33.7244 28.1257 36.2087V42H25.7967V36.2087C25.7967 36.1388 25.7952 36.0692 25.7924 36C25.6863 33.4459 23.6434 31.4087 21.1386 31.4087C15.2944 31.4087 10.5568 26.7486 10.5568 21C10.5568 17.8254 12.1738 14.655 14.9033 12.6333C15.3299 12.3173 15.7838 12.0678 16.2629 11.8743C17.6241 11.1868 19.16 10.8 20.7853 10.8C21.7205 10.8 22.6067 10.9402 23.4677 11.1593C24.5524 11.4353 25.5971 11.8366 26.6491 12.2408C28.3297 12.8864 30.0291 13.5392 31.9406 13.7001C33.0594 13.7943 34.2046 13.0758 35.3697 12.3448C37.1465 11.2301 38.9697 10.0862 40.8166 11.7508C41.7588 12.6 42.5696 14.411 41.4734 16.4883C39.2114 20.6016 36.5034 23.6408 31.9029 24.6736L30.0881 25.081C29.0631 27.4807 27.2186 29.2391 25.0474 30.2399Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Leber',
    title: 'Besserer Stoffwechsel',
    body: 'Kann den Fettstoffwechsel positiv beeinflussen.',
    icon: (
      <svg width="68" height="68" viewBox="0 0 48 48" fill="none" color="#3D5C4A">
        <path fillRule="evenodd" clipRule="evenodd" d="M38.9483 8C38.7559 8 38.3032 8.11228 37.5018 8.52857C36.7048 8.94262 35.9116 9.39874 35.1224 9.89721C34.2451 10.4513 33.2288 10.9488 32.0812 11.3945C30.8964 11.8545 29.7622 12.1034 28.6897 12.1034C28.2503 12.1034 27.9704 12.148 27.8095 12.1997C27.7859 12.2073 27.7697 12.2142 27.7593 12.2192C27.6842 12.3747 27.6663 12.4599 27.6631 12.4866C27.6487 12.6095 27.6379 12.825 27.6379 13.1552C27.6379 14.5036 27.8458 15.7904 28.2591 17.0203C28.6833 18.2827 29.1888 19.2727 29.7574 20.0184C30.366 20.8166 30.9681 21.4214 31.5577 21.8544C32.1635 22.2993 32.5641 22.4138 32.7931 22.4138C32.9037 22.4138 33.2364 22.334 33.8582 21.9028C34.4266 21.5086 35.0745 20.903 35.8 20.0548C36.5157 19.2183 37.1925 18.2581 37.8286 17.1705C38.4413 16.1231 38.9617 14.8727 39.3815 13.4085C39.7945 11.9683 40 10.5169 40 9.05172C40 8.6146 39.8795 8.39568 39.7422 8.26227C39.5893 8.11378 39.3603 8 38.9483 8ZM18.2845 15.3276C16.3883 15.3276 14.659 15.7506 13.0791 16.5893C11.492 17.4319 10.2561 18.5614 9.34921 19.9796C8.44728 21.3901 8 22.9183 8 24.5862C8 26.0215 8.26523 27.5245 8.81056 29.0999C9.36141 30.6912 10.0661 32.1123 10.9205 33.3689C11.8026 34.666 12.7329 35.8385 13.7106 36.8882C14.6847 37.9341 15.6023 38.7158 16.4608 39.256C16.9853 39.586 17.4035 39.7837 17.7271 39.8914C17.9576 39.1069 18.2986 38.2322 18.7648 37.1805C19.2585 36.0669 19.8673 35.0718 20.5955 34.2026L20.6042 34.1922C21.3089 33.3739 22.1976 32.51 23.2605 31.6005C24.3072 30.7049 25.2323 29.9536 26.0339 29.3496C26.771 28.7942 27.4084 28.2203 27.9502 27.6292C28.355 27.1876 28.4996 26.9001 28.5474 26.7483C28.5412 26.7408 28.5344 26.7329 28.527 26.7244C28.4887 26.6805 28.4379 26.6277 28.3721 26.566C28.0552 26.2689 27.6329 25.9069 27.0991 25.4778C26.5332 25.0229 26.0697 24.6007 25.7357 24.2153L25.7342 24.2136C24.732 23.0519 23.9296 21.7928 23.3322 20.4372C22.7301 19.0708 22.4138 17.7155 22.4138 16.3793C22.4138 16.2206 22.3788 16.1214 22.3352 16.0497C22.304 15.9985 22.2362 15.9197 22.0654 15.8372C21.7929 15.7057 21.5463 15.6081 21.3244 15.5398C21.153 15.4871 20.861 15.4353 20.4139 15.4055C19.9355 15.3736 19.5767 15.3529 19.3328 15.3427C19.0972 15.3329 18.7501 15.3276 18.2845 15.3276Z" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function WirkungsweiseSection() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const anims = section.querySelectorAll<HTMLElement>('.slimedo-anim');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('played');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -20px 0px' }
    );
    anims.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="wirk"
      className="wirk-section-resp"
      style={{
        background: '#FAF5EA',
        padding: 'clamp(72px, 5.88vw, 130px) 40px clamp(78px, 6.38vw, 143px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial center glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '55%',
          transform: 'translate(-50%,-50%)',
          width: '80%',
          height: '60%',
          background:
            'radial-gradient(ellipse at center,rgba(205,221,203,0.3) 0%,rgba(205,221,203,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Header */}
      <header
        style={{
          textAlign: 'center',
          marginBottom: 42,
          position: 'relative',
          zIndex: 2,
          maxWidth: 1800,
          margin: '0 auto 42px',
        }}
      >
        <p
          className="slimedo-anim"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 12,
            color: '#3D5C4A',
            textTransform: 'uppercase',
            letterSpacing: '.16em',
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          Wirkungsweise
        </p>
        <h2
          className="slimedo-anim slimedo-d1 wirk-hl-resp"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 'clamp(48px, 3.75vw, 100px)',
            color: '#1A1A1A',
            lineHeight: 1.02,
            fontWeight: 400,
            letterSpacing: '-.01em',
            margin: 0,
          }}
        >
          So wirkt die <em style={{ color: '#3D5C4A', fontStyle: 'italic' }}>Therapie</em>
        </h2>
        <p
          className="slimedo-anim slimedo-d2"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 16,
            color: '#768064',
            margin: '20px auto 0',
            maxWidth: 520,
            lineHeight: 1.55,
          }}
        >
          Die Therapie wirkt gezielt an vier Stellen in deinem Körper.
        </p>
      </header>

      {/* Cards grid */}
      <div
        className="wirk-grid-resp"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 20,
          position: 'relative',
          zIndex: 2,
          maxWidth: 1800,
          margin: '0 auto',
        }}
      >
        {cards.map((card, i) => (
          <article
            key={i}
            className={`slimedo-anim slimedo-d${i + 1} wirk-card-resp`}
            style={{
              background: '#FFFDF7',
              borderRadius: 18,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              boxShadow:
                '0 1px 2px rgba(15,31,26,.03),0 4px 12px rgba(15,31,26,.04),0 16px 32px rgba(15,31,26,.03)',
              minHeight: 'clamp(180px, 17.5vw, 300px)',
              transition: 'transform .25s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')
            }
          >
            <div
              className="wirk-card-icon"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                flexShrink: 0,
                color: '#3D5C4A',
              }}
            >
              {card.icon}
            </div>
            <div className="wirk-card-text">
              <span
                className="wirk-card-label-el"
                style={{
                  display: 'inline-block',
                  background: '#CDDDCB',
                  color: '#1E3A2E',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '5px 13px',
                  borderRadius: 999,
                  letterSpacing: '.01em',
                  marginBottom: 12,
                }}
              >
                {card.label}
              </span>
              <h3
                className="wirk-card-title-el"
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: 22,
                  fontWeight: 600,
                  margin: '0 0 10px',
                  color: '#141414',
                  lineHeight: 1.25,
                  letterSpacing: '-.005em',
                }}
              >
                {card.title}
              </h3>
              <p
                className="wirk-card-body-el"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 16,
                  color: '#768064',
                  lineHeight: 1.55,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {card.body}
              </p>
            </div>
          </article>
        ))}
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .wirk-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
          .wirk-hl-resp { font-size: 48px !important; }
        }
        @media (max-width: 640px) {
          .wirk-section-resp { padding: 44px 16px !important; }
          .wirk-grid-resp { grid-template-columns: 1fr !important; gap: 10px !important; }
          .wirk-hl-resp { font-size: 34px !important; }
          .wirk-card-resp {
            flex-direction: row !important;
            align-items: center !important;
            padding: 16px 18px !important;
            min-height: unset !important;
            gap: 16px !important;
          }
          .wirk-card-icon {
            margin-bottom: 0 !important;
            flex-shrink: 0 !important;
          }
          .wirk-card-icon svg { width: 42px !important; height: 42px !important; }
          .wirk-card-text { display: flex; flex-direction: column; gap: 2px; align-items: flex-start; }
          .wirk-card-label-el {
            font-size: 11px !important;
            padding: 3px 9px !important;
            margin-bottom: 5px !important;
          }
          .wirk-card-title-el { font-size: 17px !important; margin-bottom: 3px !important; }
          .wirk-card-body-el { font-size: 13px !important; }
        }
      `}</style>
    </section>
  );
}

