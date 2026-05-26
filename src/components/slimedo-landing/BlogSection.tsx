import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosPublic } from '@/hooks/useAxiosPublic';

type BlogPost = {
  id: number;
  title: string;
  description: string;
  image?: string;
  category?: string[] | string;
  tags?: string[] | string;
};

const POSTS_PER_PAGE = 3;
const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg,#CDDDCB,#A8C5A0)',
  'linear-gradient(135deg,#EDD89A,#D4B86A)',
  'linear-gradient(135deg,#E8D5C0,#C8A888)',
] as const;

const CATEGORY_LABEL_MAP: Record<string, string> = {
  Telemedicine: 'Telemedizin',
  'Patient Education': 'Patientenaufklärung',
  'Mental Health': 'Psychische Gesundheit',
  'Tips & Guide': 'Tipps & Ratgeber',
};

function normalizeLabels(value?: string[] | string): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value];
}

function mapLabel(label: string): string {
  return CATEGORY_LABEL_MAP[label] ?? label;
}

function getPaginationPages(current: number, total: number): Array<number | '...'> {
  const pages: Array<number | '...'> = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i += 1) pages.push(i);
    return pages;
  }

  pages.push(1);
  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i += 1) pages.push(i);

  if (current < total - 2) pages.push('...');
  pages.push(total);

  return pages;
}

export default function BlogSection() {
  const ref = useRef<HTMLElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const anims = section.querySelectorAll<HTMLElement>('.slimedo-anim');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('played');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -20px 0px' },
    );

    anims.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const { data: blogData = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['blog'],
    queryFn: async () => {
      const response = await axiosPublic.get('/blog');
      const apiData = response?.data?.data;
      return Array.isArray(apiData) ? apiData : [];
    },
  });

  const totalPages = Math.max(1, Math.ceil(blogData.length / POSTS_PER_PAGE));
  const effectiveCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPosts = useMemo(
    () =>
      blogData.slice(
        (effectiveCurrentPage - 1) * POSTS_PER_PAGE,
        effectiveCurrentPage * POSTS_PER_PAGE,
      ),
    [blogData, effectiveCurrentPage],
  );

  const pages = getPaginationPages(effectiveCurrentPage, totalPages);

  return (
    <section ref={ref} id="blog" style={{ background: '#FAF5EA', padding: '80px 0' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 40px' }}>
        <div
          className="blog-hdr-resp"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 48,
            gap: 24,
          }}
        >
          <div>
            <p
              className="slimedo-anim"
              style={{
                fontSize: 12,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '.16em',
                color: '#3D5C4A',
                marginBottom: 8,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Blog
            </p>
            <h2
              className="slimedo-anim slimedo-d1 blog-hl-resp"
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: 48,
                fontWeight: 400,
                letterSpacing: '-.01em',
                lineHeight: 1.05,
                color: '#1A1A1A',
              }}
            >
              Aktuelle Gesundheits-Tipps
            </h2>
            <p
              className="slimedo-anim slimedo-d2"
              style={{
                fontSize: 15,
                color: '#768064',
                marginTop: 10,
                maxWidth: 400,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Medizinisch fundierte Ratschläge rund um die GLP-1-Therapie.
            </p>
          </div>
          <Link
            to="/blog"
            className="slimedo-anim"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#3D5C4A',
              color: '#FAF5EA',
              fontSize: 14,
              fontWeight: 500,
              padding: '12px 22px',
              borderRadius: 999,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'background .2s',
              fontFamily: '"Inter", sans-serif',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#1E3A2E';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#3D5C4A';
            }}
          >
            Alle anzeigen →
          </Link>
        </div>

        <div
          className="blog-grid-resp"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}
        >
          {isLoading ? (
            [...Array(POSTS_PER_PAGE)].map((_, idx) => (
              <article
                key={`blog-skeleton-${idx}`}
                className="slimedo-anim"
                style={{
                  background: '#FFFDF7',
                  borderRadius: 18,
                  overflow: 'hidden',
                  border: '1px solid #E5D9BD',
                }}
              >
                <div style={{ aspectRatio: '16/10', background: '#E8E2D1' }} />
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 72,
                        height: 24,
                        borderRadius: 999,
                        background: '#D9E6D7',
                      }}
                    />
                    <span
                      style={{
                        display: 'inline-block',
                        width: 92,
                        height: 24,
                        borderRadius: 999,
                        background: '#D9E6D7',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: 18,
                      borderRadius: 6,
                      background: '#E8E2D1',
                      marginBottom: 8,
                    }}
                  />
                  <div
                    style={{
                      width: '72%',
                      height: 18,
                      borderRadius: 6,
                      background: '#E8E2D1',
                      marginBottom: 12,
                    }}
                  />
                  <div
                    style={{
                      width: '100%',
                      height: 14,
                      borderRadius: 6,
                      background: '#ECE6D7',
                      marginBottom: 6,
                    }}
                  />
                  <div
                    style={{
                      width: '82%',
                      height: 14,
                      borderRadius: 6,
                      background: '#ECE6D7',
                      marginBottom: 16,
                    }}
                  />
                  <div
                    style={{
                      width: 108,
                      height: 20,
                      borderRadius: 8,
                      background: '#D9E6D7',
                    }}
                  />
                </div>
              </article>
            ))
          ) : paginatedPosts.length > 0 ? (
            paginatedPosts.map((post, idx) => {
              const badges = normalizeLabels(post.category).length
                ? normalizeLabels(post.category)
                : normalizeLabels(post.tags);
              const gradient = FALLBACK_GRADIENTS[idx % FALLBACK_GRADIENTS.length];

              return (
                <article
                  key={post.id ?? idx}
                  className={`slimedo-anim slimedo-d${(idx % 3) + 1}`}
                  style={{
                    background: '#FFFDF7',
                    borderRadius: 18,
                    overflow: 'hidden',
                    border: '1px solid #E5D9BD',
                    transition: 'transform .2s,box-shadow .2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = '0 8px 32px rgba(15,31,26,.1)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      aspectRatio: '16/10',
                      background: post.image ? undefined : gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <span
                        style={{
                          fontFamily: '"Manrope", sans-serif',
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '.1em',
                          opacity: 0.4,
                          color: '#1A1A1A',
                        }}
                      >
                        Bild folgt
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '20px 22px 24px' }}>
                    <div style={{ marginBottom: 12 }}>
                      {badges.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            display: 'inline-block',
                            background: '#CDDDCB',
                            color: '#1E3A2E',
                            fontSize: 11,
                            fontWeight: 500,
                            padding: '3px 10px',
                            borderRadius: 999,
                            marginRight: 5,
                            marginBottom: 5,
                            fontFamily: '"Inter", sans-serif',
                          }}
                        >
                          {mapLabel(tag)}
                        </span>
                      ))}
                    </div>
                    <h3
                      style={{
                        fontFamily: '"Manrope", sans-serif',
                        fontSize: 17,
                        fontWeight: 600,
                        color: '#1A1A1A',
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13.5,
                        color: '#768064',
                        lineHeight: 1.5,
                        marginBottom: 16,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {post.description}
                    </p>
                    <Link
                      to={`/blog/${post.id}`}
                      style={{
                        fontSize: 13.5,
                        fontWeight: 500,
                        color: '#3D5C4A',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        transition: 'gap .15s',
                        fontFamily: '"Inter", sans-serif',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.gap = '8px';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.gap = '4px';
                      }}
                    >
                      Weiterlesen →
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                border: '1px solid #E5D9BD',
                borderRadius: 18,
                padding: '24px 28px',
                background: '#FFFDF7',
                color: '#768064',
                fontFamily: '"Inter", sans-serif',
                fontSize: 14,
              }}
            >
              Keine Artikel verfügbar.
            </div>
          )}
        </div>

        {!isLoading && totalPages > 1 && (
          <div
            style={{
              marginTop: 24,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, Math.min(p, totalPages) - 1))}
              disabled={effectiveCurrentPage === 1}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: '1px solid #E5D9BD',
                background: '#FFFDF7',
                color: '#6E6A60',
                cursor: effectiveCurrentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: effectiveCurrentPage === 1 ? 0.45 : 1,
              }}
            >
              ←
            </button>
            {pages.map((page, idx) =>
              page === '...' ? (
                <span key={`dots-${idx}`} style={{ color: '#768064', fontFamily: '"Inter", sans-serif' }}>
                  …
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  style={{
                    minWidth: 36,
                    height: 36,
                    padding: '0 10px',
                    borderRadius: 999,
                    border: effectiveCurrentPage === page ? '1px solid #3D5C4A' : '1px solid #E5D9BD',
                    background: effectiveCurrentPage === page ? '#3D5C4A' : '#FFFDF7',
                    color: effectiveCurrentPage === page ? '#FAF5EA' : '#6E6A60',
                    cursor: 'pointer',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {page}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, Math.min(p, totalPages) + 1))}
              disabled={effectiveCurrentPage === totalPages}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: '1px solid #E5D9BD',
                background: '#FFFDF7',
                color: '#6E6A60',
                cursor: effectiveCurrentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: effectiveCurrentPage === totalPages ? 0.45 : 1,
              }}
            >
              →
            </button>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .blog-grid-resp { grid-template-columns: 1fr !important; }
          .blog-hl-resp { font-size: 36px !important; }
        }
        @media (max-width: 640px) {
          .blog-hdr-resp { flex-direction: column !important; align-items: flex-start !important; }
          .blog-hl-resp { font-size: 28px !important; }
        }
      `}</style>
    </section>
  );
}
