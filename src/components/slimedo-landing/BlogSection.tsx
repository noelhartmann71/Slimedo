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
    <section ref={ref} id="blog" className="bg-cream py-[clamp(60px,4.88vw,110px)]">
      <div className="mx-auto max-w-[1800px] px-10">
        <div className="blog-hdr-resp mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="slimedo-anim mb-2 text-[12px] font-medium tracking-[0.16em] uppercase text-sage">
              Blog
            </p>
            <h2 className="slimedo-anim slimedo-d1 blog-hl-resp font-instrument text-[clamp(38px,2.94vw,72px)] font-normal leading-[1.05] tracking-[-0.01em] text-ink">
              Aktuelle Gesundheits-Tipps
            </h2>
            <p className="slimedo-anim slimedo-d2 mt-2.5 max-w-[400px] text-[15px] text-olive">
              Medizinisch fundierte Ratschläge rund um die GLP-1-Therapie.
            </p>
          </div>
          <Link
            to="/blog"
            className="slimedo-anim inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-sage px-[22px] py-3 text-[14px] font-medium text-cream no-underline transition-colors hover:bg-deep"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Alle anzeigen →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${cardsPerView},minmax(0,1fr))` }}>
            {Array.from({ length: cardsPerView }).map((_, idx) => (
              <article
                key={`blog-skeleton-${idx}`}
                className="slimedo-anim overflow-hidden rounded-[18px] border border-sand2 bg-surf"
              >
                <div className="aspect-[16/10] bg-[#E8E2D1]" />
                <div className="px-[22px] pt-5 pb-6">
                  <div className="mb-3 flex gap-1.5">
                    <span className="inline-block h-6 w-[72px] rounded-full bg-[#D9E6D7]" />
                    <span className="inline-block h-6 w-[92px] rounded-full bg-[#D9E6D7]" />
                  </div>
                  <div className="mb-2 h-[18px] w-full rounded-md bg-[#E8E2D1]" />
                  <div className="mb-3 h-[18px] w-[72%] rounded-md bg-[#E8E2D1]" />
                  <div className="mb-1.5 h-[14px] w-full rounded-md bg-[#ECE6D7]" />
                  <div className="mb-4 h-[14px] w-[82%] rounded-md bg-[#ECE6D7]" />
                  <div className="h-5 w-[108px] rounded-lg bg-[#D9E6D7]" />
                </div>
              </article>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center gap-3 rounded-[18px] border border-sand2 bg-surf px-7 py-6 text-[14px] text-olive">
            <span>Artikel konnten nicht geladen werden.</span>
            <button
              type="button"
              onClick={() => refetch()}
              className="cursor-pointer rounded-full border border-sand2 bg-sand px-4 py-2 text-[13px] font-medium text-ink"
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
              <div className="flex w-max gap-5">
                {blogData.map((post, idx) => {
                  const badges = normalizeLabels(post.category).length
                    ? normalizeLabels(post.category)
                    : normalizeLabels(post.tags);
                  const gradient = FALLBACK_GRADIENTS[idx % FALLBACK_GRADIENTS.length];

                  return (
                    <article
                      key={post.id ?? idx}
                      className={`slimedo-anim slimedo-d${(idx % 3) + 1} overflow-hidden rounded-[18px] border border-sand2 bg-surf transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(15,31,26,0.1)]`}
                      data-carousel-card="true"
                      style={{
                        flex: `0 0 ${cardWidthPx || 320}px`,
                        width: cardWidthPx || 320,
                      }}
                    >
                      <div
                        className="flex aspect-[16/10] items-center justify-center overflow-hidden"
                        style={{ background: post.image ? undefined : gradient }}
                      >
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="block h-full w-full object-cover"
                          />
                        ) : (
                          <span className="font-[Manrope,sans-serif] text-[11px] font-semibold tracking-[0.1em] uppercase text-ink opacity-40">
                            Bild folgt
                          </span>
                        )}
                      </div>

                      <div className="px-[22px] pt-5 pb-6">
                        <div className="mb-3">
                          {badges.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="mr-[5px] mb-[5px] inline-block rounded-full bg-mint px-2.5 py-[3px] text-[11px] font-medium text-deep"
                            >
                              {mapLabel(tag)}
                            </span>
                          ))}
                        </div>
                        <h3 className="mb-2 font-[Manrope,sans-serif] text-[17px] font-semibold leading-[1.3] text-ink">
                          {post.title}
                        </h3>
                        <p className="mb-4 text-[13.5px] leading-[1.5] text-olive">
                          {post.description}
                        </p>
                        <Link
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center gap-1 text-[13.5px] font-medium text-sage no-underline transition-[gap] duration-150 hover:gap-2"
                          style={{ fontFamily: '"Inter", sans-serif' }}
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
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToStep(currentStep - 1)}
                  disabled={currentStep === 1}
                  className="h-9 w-9 cursor-pointer rounded-full border border-sand2 bg-surf text-stein disabled:cursor-not-allowed disabled:opacity-[0.45]"
                >
                  ←
                </button>

                {pages.map((page, idx) =>
                  page === '...' ? (
                    <span key={`dots-${idx}`} className="text-olive">
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      onClick={() => scrollToStep(page)}
                      className={`h-9 min-w-9 cursor-pointer rounded-full border px-2.5 text-[13px] font-medium ${
                        currentStep === page
                          ? 'border-sage bg-sage text-cream'
                          : 'border-sand2 bg-surf text-stein'
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  onClick={() => scrollToStep(currentStep + 1)}
                  disabled={currentStep === totalSteps}
                  className="h-9 w-9 cursor-pointer rounded-full border border-sand2 bg-surf text-stein disabled:cursor-not-allowed disabled:opacity-[0.45]"
                >
                  →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-[18px] border border-sand2 bg-surf px-7 py-6 text-[14px] text-olive">
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
