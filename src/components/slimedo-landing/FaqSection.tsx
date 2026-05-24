import { useState, useRef, useEffect } from 'react';

const categories = ['Alle', 'Ablauf & Behandlung', 'Kosten & Zahlung', 'Versand', 'Medikamente', 'Nebenwirkungen', 'Datenschutz'];

const faqs = [
  {
    q: 'Was ist Slimedo und wie funktioniert der Service?',
    a: 'Slimedo ist eine Telemedizin-Plattform für ärztlich begleitete Gewichtsreduktion mittels GLP-1-Therapie. Du füllst einen medizinischen Fragebogen aus, ein approbierter Arzt mit Praxissitz in Deutschland prüft deine Angaben und stellt bei Eignung ein Rezept aus. Das Medikament wird diskret zu dir nach Hause geliefert.',
    cat: 'Ablauf & Behandlung',
  },
  {
    q: 'Was ist die GLP-1-Therapie — und ist das die „Abnehmspritze"?',
    a: 'GLP-1 ist ein natürliches Hormon im Körper, das nach dem Essen Hunger reduziert und den Blutzucker reguliert. Die Therapie setzt Wirkstoffe ein, die dieses Hormon nachahmen — bekannt als „Abnehmspritze". Die Injektion erfolgt einmal wöchentlich und ist nur nach ärztlicher Prüfung verschreibbar.',
    cat: 'Medikamente',
  },
  {
    q: 'Für wen ist die Therapie geeignet?',
    a: 'Die Therapie richtet sich an Erwachsene ab 18 Jahren mit einem BMI ≥ 30 oder einem BMI ≥ 27 mit gewichtsbedingten Begleiterkrankungen. Die endgültige Eignung wird durch den Arzt geprüft.',
    cat: 'Ablauf & Behandlung',
  },
  {
    q: 'Wie viel kostet die Behandlung?',
    a: 'Kein Abo, keine versteckten Gebühren. Du zahlst nur das Medikament zum Apothekenpreis. Die Lieferung ist kostenlos.',
    cat: 'Kosten & Zahlung',
  },
  {
    q: 'Sind meine Daten sicher?',
    a: 'Alle Daten werden DSGVO-konform verarbeitet und niemals an Dritte weitergegeben. Zahlungen laufen über Stripe (PCI DSS Level 1).',
    cat: 'Datenschutz',
  },
];

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filtered = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'Alle' || faq.cat === activeCategory;
    const matchesSearch =
      !searchQuery ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section
      ref={ref}
      id="faq"
      style={{ background: '#FFFDF7', padding: '56px 0' }}
    >
      {/* Header */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px', textAlign: 'center', marginBottom: 0 }}>
        <span
          style={{
            display: 'inline-block',
            background: '#CDDDCB',
            color: '#1E3A2E',
            fontSize: 12,
            fontWeight: 600,
            padding: '5px 16px',
            borderRadius: 999,
            letterSpacing: '.04em',
            marginBottom: 18,
            fontFamily: '"Inter", sans-serif',
          }}
        >
          FAQ
        </span>
        <h2
          className="slimedo-anim faq-hl-resp"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 52,
            fontWeight: 400,
            letterSpacing: '-.01em',
            marginBottom: 14,
            color: '#1A1A1A',
          }}
        >
          Häufige Fragen
        </h2>
        <p
          className="slimedo-anim slimedo-d2"
          style={{
            fontSize: 15,
            color: '#768064',
            marginBottom: 40,
            fontFamily: '"Inter", sans-serif',
          }}
        >
          Alles über unseren Telemedizin-Service.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px' }}>
        {/* Search */}
        <div
          className="slimedo-anim"
          style={{ position: 'relative', marginBottom: 24 }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            style={{
              position: 'absolute',
              left: 18,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6E6A60',
            }}
          >
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <line
              x1="12.5"
              y1="12.5"
              x2="16"
              y2="16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Frage suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 18px 15px 48px',
              border: '1.5px solid #E5D9BD',
              borderRadius: 14,
              fontSize: 15,
              color: '#1A1A1A',
              background: '#FAF5EA',
              outline: 'none',
              transition: 'border-color .2s',
              fontFamily: '"Inter", sans-serif',
              boxSizing: 'border-box',
            }}
            onFocus={(e) =>
              ((e.target as HTMLInputElement).style.borderColor = '#3D5C4A')
            }
            onBlur={(e) =>
              ((e.target as HTMLInputElement).style.borderColor = '#E5D9BD')
            }
          />
        </div>

        {/* Category filters */}
        <div
          className="slimedo-anim"
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                border: activeCategory === cat ? 'none' : '1px solid #E5D9BD',
                background: activeCategory === cat ? '#3D5C4A' : '#F5EEDB',
                color: activeCategory === cat ? '#FAF5EA' : '#1A1A1A',
                transition: 'background .2s,color .2s',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="slimedo-anim" style={{ marginBottom: 40 }}>
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderBottom: '1px solid #E5D9BD',
                  borderTop: i === 0 ? '1px solid #E5D9BD' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '22px 0',
                    cursor: 'pointer',
                    gap: 24,
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Instrument Serif", Georgia, serif',
                      fontSize: 19,
                      fontWeight: 400,
                      color: '#1A1A1A',
                      lineHeight: 1.3,
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      flexShrink: 0,
                      borderRadius: '50%',
                      border: `1.5px solid ${isOpen ? '#3D5C4A' : '#E5D9BD'}`,
                      background: isOpen ? '#3D5C4A' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background .2s,border-color .2s',
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke={isOpen ? '#FAF5EA' : '#1A1A1A'}
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      {isOpen ? (
                        <line x1="2" y1="7" x2="12" y2="7" />
                      ) : (
                        <>
                          <line x1="7" y1="2" x2="7" y2="12" />
                          <line x1="2" y1="7" x2="12" y2="7" />
                        </>
                      )}
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <p
                    style={{
                      fontSize: 15,
                      color: '#768064',
                      lineHeight: 1.65,
                      padding: '0 40px 22px 0',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p
              style={{
                fontSize: 15,
                color: '#768064',
                padding: '24px 0',
                textAlign: 'center',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Keine Ergebnisse gefunden.
            </p>
          )}
        </div>

        {/* Show more */}
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#1E3A2E',
              color: '#FAF5EA',
              fontSize: 15,
              fontWeight: 500,
              padding: '16px 36px',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              transition: 'background .2s',
              fontFamily: '"Inter", sans-serif',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = '#3D5C4A')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = '#1E3A2E')
            }
          >
            Mehr anzeigen{' '}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3v10M4 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .faq-hl-resp { font-size: 36px !important; }
        }
      `}</style>
    </section>
  );
}
