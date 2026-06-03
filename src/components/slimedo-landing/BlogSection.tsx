import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

const CAROUSEL_GAP = 20;
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

function getCardsPerView(width: number): number {
  if (width <= 640) return 1;
  if (width <= 1024) return 2;
  return 3;
}

export default function BlogSection() {
  const ref = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const [cardsPerView, setCardsPerView] = useState(3);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const { data: blogData = [], isLoading, isError, refetch } = useQuery<BlogPost[]>({
    queryKey: ['blog', 'landing-preview'],
    queryFn: async () => {
      const response = await axiosPublic.get('/blog');
      const apiData = response?.data?.data;
      return Array.isArray(apiData) ? apiData : [];
    },
    refetchOnMount: 'always',
    retry: 2,
  });

  const totalSteps = Math.max(1, blogData.length - cardsPerView + 1);
  const pages = getPaginationPages(currentStep, totalSteps);

  const cardWidthPx = useMemo(() => {
    if (!containerWidth) return 0;
    const rawWidth = (containerWidth - (cardsPerView - 1) * CAROUSEL_GAP) / cardsPerView;
    return Math.max(0, rawWidth);
  }, [containerWidth, cardsPerView]);

  const syncCurrentStepFromScroll = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;

    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
    if (maxScroll <= 0 || totalSteps <= 1) {
      setCurrentStep(1);
      return;
    }

    const ratio = container.scrollLeft / maxScroll;
    const step = Math.round(ratio * (totalSteps - 1)) + 1;
    setCurrentStep(Math.max(1, Math.min(totalSteps, step)));
  }, [totalSteps]);

  const scrollToStep = (step: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const clamped = Math.max(1, Math.min(step, totalSteps));

    if (totalSteps <= 1) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
    const targetLeft = ((clamped - 1) / (totalSteps - 1)) * maxScroll;
    container.scrollTo({ left: targetLeft, behavior: 'smooth' });
  };

  useEffect(() => {
    const updateCardsPerView = () => setCardsPerView(getCardsPerView(window.innerWidth));
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const updateMetrics = () => {
      setContainerWidth(container.clientWidth);
      const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
      if (container.scrollLeft > maxScroll) {
        container.scrollLeft = maxScroll;
      }
      syncCurrentStepFromScroll();
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [blogData.length, cardsPerView, isLoading, totalSteps, syncCurrentStepFromScroll]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const onScroll = () => syncCurrentStepFromScroll();
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [totalSteps, syncCurrentStepFromScroll]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const onWheel = (event: WheelEvent) => {
      const canScrollHorizontally = container.scrollWidth > container.clientWidth + 1;
      if (!canScrollHorizontally) return;

      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [blogData.length, cardsPerView]);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

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

    const anims = section.querySelectorAll<HTMLElement>('.slimedo-anim:not(.played)');
    anims.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoading, blogData.length, currentStep, cardsPerView]);

  return (
    <section ref={ref} id="blog" style={{ background: '#FAF5EA', padding: 'clamp(60px, 4.88vw, 110px) 0' }}>
      <div style={{ maxWidth: 1800, margin: '0 auto', padding: '0 40px' }}>
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
                fontSize: 'clamp(38px, 2.94vw, 72px)',
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

        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cardsPerView},minmax(0,1fr))`, gap: CAROUSEL_GAP }}>
            {Array.from({ length: cardsPerView }).map((_, idx) => (
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
                    <span style={{ display: 'inline-block', width: 72, height: 24, borderRadius: 999, background: '#D9E6D7' }} />
                    <span style={{ display: 'inline-block', width: 92, height: 24, borderRadius: 999, background: '#D9E6D7' }} />
                  </div>
                  <div style={{ width: '100%', height: 18, borderRadius: 6, background: '#E8E2D1', marginBottom: 8 }} />
                  <div style={{ width: '72%', height: 18, borderRadius: 6, background: '#E8E2D1', marginBottom: 12 }} />
                  <div style={{ width: '100%', height: 14, borderRadius: 6, background: '#ECE6D7', marginBottom: 6 }} />
                  <div style={{ width: '82%', height: 14, borderRadius: 6, background: '#ECE6D7', marginBottom: 16 }} />
                  <div style={{ width: 108, height: 20, borderRadius: 8, background: '#D9E6D7' }} />
                </div>
              </article>
            ))}
          </div>
        ) : isError ? (
          <div
            style={{
              border: '1px solid #E5D9BD',
              borderRadius: 18,
              padding: '24px 28px',
              background: '#FFFDF7',
              color: '#768064',
              fontFamily: '"Inter", sans-serif',
              fontSize: 14,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span>Artikel konnten nicht geladen werden.</span>
            <button
              type="button"
              onClick={() => refetch()}
              style={{
                border: '1px solid #E5D9BD',
                background: '#F5EEDB',
                color: '#1A1A1A',
                borderRadius: 999,
                padding: '8px 16px',
                cursor: 'pointer',
                fontFamily: '"Inter", sans-serif',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Erneut versuchen
            </button>
          </div>
        ) : blogData.length > 0 ? (
          <>
            <div
              ref={carouselRef}
              style={{
                overflowX: 'auto',
                overflowY: 'hidden',
                touchAction: 'pan-x pan-y',
                cursor: isDragging ? 'grabbing' : 'grab',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              className="blog-carousel-scroll"
              onPointerDown={(e) => {
                if (e.pointerType !== 'mouse' || !carouselRef.current) return;
                dragRef.current.pointerId = e.pointerId;
                dragRef.current.startX = e.clientX;
                dragRef.current.startScrollLeft = carouselRef.current.scrollLeft;
                dragRef.current.moved = false;
                setIsDragging(true);
                carouselRef.current.setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!carouselRef.current || dragRef.current.pointerId !== e.pointerId) return;
                const deltaX = e.clientX - dragRef.current.startX;
                if (Math.abs(deltaX) > 3) dragRef.current.moved = true;
                carouselRef.current.scrollLeft = dragRef.current.startScrollLeft - deltaX;
              }}
              onPointerUp={(e) => {
                if (!carouselRef.current || dragRef.current.pointerId !== e.pointerId) return;
                if (carouselRef.current.hasPointerCapture(e.pointerId)) {
                  carouselRef.current.releasePointerCapture(e.pointerId);
                }
                dragRef.current.pointerId = -1;
                setIsDragging(false);
              }}
              onPointerCancel={(e) => {
                if (!carouselRef.current || dragRef.current.pointerId !== e.pointerId) return;
                if (carouselRef.current.hasPointerCapture(e.pointerId)) {
                  carouselRef.current.releasePointerCapture(e.pointerId);
                }
                dragRef.current.pointerId = -1;
                setIsDragging(false);
              }}
              onClickCapture={(e) => {
                if (dragRef.current.moved) {
                  e.preventDefault();
                  e.stopPropagation();
                  dragRef.current.moved = false;
                }
              }}
            >
              <div style={{ display: 'flex', gap: CAROUSEL_GAP, width: 'max-content' }}>
                {blogData.map((post, idx) => {
                  const badges = normalizeLabels(post.category).length
                    ? normalizeLabels(post.category)
                    : normalizeLabels(post.tags);
                  const gradient = FALLBACK_GRADIENTS[idx % FALLBACK_GRADIENTS.length];

                  return (
                    <article
                      key={post.id ?? idx}
                      className={`slimedo-anim slimedo-d${(idx % 3) + 1}`}
                      data-carousel-card="true"
                      style={{
                        flex: `0 0 ${cardWidthPx || 320}px`,
                        width: cardWidthPx || 320,
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
                })}
              </div>
            </div>

            {totalSteps > 1 && (
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
                  onClick={() => scrollToStep(currentStep - 1)}
                  disabled={currentStep === 1}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    border: '1px solid #E5D9BD',
                    background: '#FFFDF7',
                    color: '#6E6A60',
                    cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentStep === 1 ? 0.45 : 1,
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
                      onClick={() => scrollToStep(page)}
                      style={{
                        minWidth: 36,
                        height: 36,
                        padding: '0 10px',
                        borderRadius: 999,
                        border: currentStep === page ? '1px solid #3D5C4A' : '1px solid #E5D9BD',
                        background: currentStep === page ? '#3D5C4A' : '#FFFDF7',
                        color: currentStep === page ? '#FAF5EA' : '#6E6A60',
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
                  onClick={() => scrollToStep(currentStep + 1)}
                  disabled={currentStep === totalSteps}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    border: '1px solid #E5D9BD',
                    background: '#FFFDF7',
                    color: '#6E6A60',
                    cursor: currentStep === totalSteps ? 'not-allowed' : 'pointer',
                    opacity: currentStep === totalSteps ? 0.45 : 1,
                  }}
                >
                  →
                </button>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
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

      <style>{`
        .blog-carousel-scroll::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 640px) {
          .blog-hdr-resp { flex-direction: column !important; align-items: flex-start !important; }
          .blog-hl-resp { font-size: 28px !important; }
        }
      `}</style>
    </section>
  );
}
