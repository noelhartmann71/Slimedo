import { useState, useRef, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosPublic } from '@/hooks/useAxiosPublic';

type ApiFaqItem = {
  id?: number | string;
  question?: string;
  answer?: string;
  category?: string;
};

type FaqItem = {
  id: string;
  q: string;
  a: string;
  cat: string;
};

const INITIAL_VISIBLE = 5;
const CATEGORY_ORDER = [
  'Ablauf & Behandlung',
  'Kosten & Zahlung',
  'Versand',
  'Medikamente',
  'Nebenwirkungen',
  'Datenschutz',
] as const;

const CATEGORY_MAP: Record<string, string> = {
  ablauf: 'Ablauf & Behandlung',
  'ablauf & behandlung': 'Ablauf & Behandlung',
  kosten: 'Kosten & Zahlung',
  'kosten & zahlung': 'Kosten & Zahlung',
  versand: 'Versand',
  'versand & apotheke': 'Versand',
  medikamente: 'Medikamente',
  nebenwirkungen: 'Nebenwirkungen',
  datenschutz: 'Datenschutz',
  sicherheit: 'Datenschutz',
  'sicherheit & datenschutz': 'Datenschutz',
};

function normalizeCategory(value?: string): string {
  if (!value) return 'Allgemein';
  const trimmed = value.trim();
  const mapped = CATEGORY_MAP[trimmed.toLowerCase()];
  return mapped ?? trimmed;
}

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const { data: faqData = [], isLoading } = useQuery<ApiFaqItem[]>({
    queryKey: ['faq'],
    queryFn: async () => {
      const response = await axiosPublic.get('/faq');
      const apiData = response?.data?.data;
      return Array.isArray(apiData) ? apiData : [];
    },
  });

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
      { threshold: 0.07, rootMargin: '0px 0px -20px 0px' },
    );
    anims.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const faqs = useMemo<FaqItem[]>(
    () =>
      faqData
        .map((faq, index) => ({
          id: String(faq.id ?? `faq-${index}`),
          q: String(faq.question ?? '').trim(),
          a: String(faq.answer ?? '').trim(),
          cat: normalizeCategory(typeof faq.category === 'string' ? faq.category : ''),
        }))
        .filter((faq) => faq.q.length > 0 && faq.a.length > 0),
    [faqData],
  );

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(faqs.map((faq) => faq.cat).filter(Boolean)),
    );
    const ordered = CATEGORY_ORDER.filter((category) =>
      uniqueCategories.includes(category),
    );
    const extra = uniqueCategories.filter(
      (category) => !CATEGORY_ORDER.includes(category as (typeof CATEGORY_ORDER)[number]),
    );
    return ['Alle', ...ordered, ...extra];
  }, [faqs]);

  const effectiveCategory = categories.includes(activeCategory)
    ? activeCategory
    : 'Alle';

  const filtered = useMemo(
    () =>
      faqs.filter((faq) => {
        const matchesCat =
          effectiveCategory === 'Alle' || faq.cat === effectiveCategory;
        const search = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !search ||
          faq.q.toLowerCase().includes(search) ||
          faq.a.toLowerCase().includes(search);
        return matchesCat && matchesSearch;
      }),
    [faqs, effectiveCategory, searchQuery],
  );

  const visibleFaqs = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE && !showAll;

  return (
    <section
      ref={ref}
      id="faq"
      style={{ background: '#FFFDF7', padding: 'clamp(48px, 5vw, 100px) 0' }}
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
            fontSize: 'clamp(40px, 3.19vw, 80px)',
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowAll(false);
              setOpenId(null);
            }}
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
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
                setOpenId(null);
              }}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                border: effectiveCategory === cat ? 'none' : '1px solid #E5D9BD',
                background: effectiveCategory === cat ? '#3D5C4A' : '#F5EEDB',
                color: effectiveCategory === cat ? '#FAF5EA' : '#1A1A1A',
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
          {isLoading &&
            Array.from({ length: INITIAL_VISIBLE }).map((_, i) => (
              <div
                key={`faq-loading-${i}`}
                style={{
                  borderBottom: '1px solid #E5D9BD',
                  borderTop: i === 0 ? '1px solid #E5D9BD' : 'none',
                  padding: '22px 0',
                }}
              >
                <div
                  style={{
                    height: 22,
                    width: '78%',
                    borderRadius: 8,
                    background: '#EDE6D4',
                    marginBottom: 14,
                  }}
                />
                <div
                  style={{
                    height: 14,
                    width: '92%',
                    borderRadius: 8,
                    background: '#F4EEDD',
                  }}
                />
              </div>
            ))}
          {!isLoading &&
            visibleFaqs.map((faq, i) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  style={{
                    borderBottom: '1px solid #E5D9BD',
                    borderTop: i === 0 ? '1px solid #E5D9BD' : 'none',
                  }}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
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
          {!isLoading && filtered.length === 0 && (
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
        {hasMore && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setShowAll(true)}
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
        )}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .faq-hl-resp { font-size: 32px !important; }
        }
      `}</style>
    </section>
  );
}
