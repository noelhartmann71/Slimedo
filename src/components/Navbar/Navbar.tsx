import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosPublic } from '@/hooks/useAxiosPublic';

type DropdownKey = 'abnehmspritzen' | 'wissenswertes';

type NavLink = {
  label: string;
  href?: string;
  to?: string;
  dropdown?: DropdownKey;
};

type BlogPost = {
  id: number;
  title: string;
  description: string;
  image?: string;
  category?: string[] | string;
  tags?: string[] | string;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
};

type WissenswertesArticle = {
  id: number;
  category: string;
  title: string;
  href: string;
  image?: string;
};

const links: NavLink[] = [
  { label: "So funktioniert's", href: '/#how-it-works-section' },
  { label: 'Abnehmspritzen', href: '/#intro', dropdown: 'abnehmspritzen' },
  { label: 'Wissenswertes', href: '/#wirk', dropdown: 'wissenswertes' },
  { label: 'Unser Team', to: '/team' },
];

const programs = [
  {
    title: 'Mounjaro',
    description: 'Verliere bis zu 22,5% Deines Körpergewichts',
    href: '/product/select',
    image: '/images/home/mounjaro-Img.png',
  },
  {
    title: 'Wegovy',
    description: 'Verliere bis zu 22,5% Deines Körpergewichts',
    href: '/product/select',
    image: '/images/home/wegovy-img.png',
  },
];

const wissenswertesLinks = [
  { label: 'Therapie', href: '#intro' },
  { label: 'Wirkungsweise', href: '#wirk' },
  { label: 'Blog', href: '#blog' },
  { label: 'Potenzial', href: '#potenzial' },
  { label: 'Anwendung', href: '#anwendung' },
  { label: 'Patientenerfahrungen', href: '#bewertungen' },
  { label: 'Häufig gestellte Fragen', href: '#faq' },
];

const closeDelayMs = 120;

// Keep the dropdown aligned below the slightly taller sticky nav.
const DROPDOWN_TOP = 56;

const CATEGORY_LABEL_MAP: Record<string, string> = {
  Telemedicine: 'Telemedizin',
  'Patient Education': 'Patientenaufklaerung',
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

function getSortValue(post: BlogPost): number {
  const dateCandidates = [post.created_at, post.published_at, post.updated_at];
  for (const value of dateCandidates) {
    if (!value) continue;
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return typeof post.id === 'number' ? post.id : 0;
}

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z"
      fill="#00B67A"
    />
  </svg>
);

const ChevronDown = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 16 16"
    fill="none"
    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    aria-hidden="true"
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/*
 * Three direct flex siblings: [left panel shrink-0] [mounjaro flex-1 min-w-0] [wegovy flex-1 min-w-0]
 * flex-1 min-w-0 lets each card shrink freely — no minmax constraint that could overflow.
 */
function WeightLossDropdown() {
  return (
    <div className="flex gap-3 rounded-[24px] border border-[#e1dacb] bg-[#fffdf7] p-3 xl:p-4 mx-4 shadow-[0_18px_44px_rgba(30,58,46,0.18)]">

      {/* Left panel — fixed width, never shrinks */}
      <div className="shrink-0 w-56 xl:w-[clamp(280px,20vw,420px)] min-h-[300px] xl:min-h-[340px] flex flex-col justify-between rounded-[16px] bg-[#f7f1e4] px-5 xl:px-7 py-5 xl:py-6 text-[#1E3A2E]">
        <div>
          <p className="mb-2 text-[22px] xl:text-[29px] leading-[1.05] font-semibold tracking-[-0.03em]">
            Abnehm-
            <br />
            Programme
          </p>
          <p className="mb-4 text-[12px] xl:text-[13px] leading-relaxed text-[#4B6457]">
            Egal, was Du brauchst, wir finden das ideale Programm für Dich.
          </p>
          <a
            href="#intro"
            className="inline-flex items-center rounded-full bg-[#3D5C4A] px-5 py-2.5 text-[13px] font-semibold text-[#FAF5EA] transition-colors hover:bg-[#1E3A2E] xl:px-6 xl:py-3 xl:text-[14px]"
          >
            Jetzt Eignung prüfen
          </a>
        </div>
        <div className="mt-6">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-sm font-semibold text-[#1E3A2E]">Trustpilot</span>
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>
          <p className="text-xs text-[#4B6457]">Bewertet mit 4,9/5</p>
        </div>
      </div>

      {/* Program cards — flex-1 min-w-0 so they share remaining space equally, never overflow */}
      {programs.map((program) => (
        <a
          key={program.title}
          href={program.href}
          className="group relative flex-1 min-w-0 h-[400px] xl:h-[clamp(430px,20vw,510px)] overflow-hidden rounded-[16px] border border-[#ded7c8]/80 bg-[#f6f2ea] shadow-[0_4px_14px_rgba(30,58,46,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#cfc5b2] hover:shadow-[0_16px_30px_rgba(30,58,46,0.16)]"
        >
          <div className="absolute inset-x-0 top-0 z-10 flex h-[76px] xl:h-[82px] items-start justify-between gap-3 border-b border-[#e8e1d2]/70 bg-[#fffaf0]/90 px-4 xl:px-5 pb-3 pt-4 backdrop-blur-sm">
            <div className="min-w-0">
              <p className="text-[18px] xl:text-[22px] font-semibold tracking-[-0.02em] text-[#1E3A2E] truncate">
                {program.title}
              </p>
              <p className="mt-1 text-[10px] xl:text-[11px] leading-snug text-[#3D5C4A] line-clamp-2">
                {program.description}
              </p>
            </div>
            <span className="shrink-0 mt-0.5 inline-flex h-8 w-8 xl:h-9 xl:w-9 items-center justify-center rounded-full bg-[#3D5C4A] text-[#FAF5EA] transition-colors group-hover:bg-[#1E3A2E]">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 top-[76px] xl:top-[82px]">
            <img
              src={program.image}
              alt={program.title}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
            />
          </div>
        </a>
      ))}
    </div>
  );
}

function WissenswertesDropdown({
  articles,
  isLoading,
}: {
  articles: WissenswertesArticle[];
  isLoading: boolean;
}) {
  return (
    <div className="w-full rounded-[24px] border border-[#d9d2c2] bg-[#fffdf7] p-6 shadow-[0_22px_55px_rgba(30,58,46,0.24)]">
      <div className="grid grid-cols-[minmax(320px,0.95fr)_1px_minmax(560px,1.05fr)] items-start gap-0">
        <div className="pr-6">
          <p className="mb-5 text-[22px] font-semibold tracking-[-0.02em] text-[#1E3A2E]">
            Alles was du wissen musst
          </p>
          <ul className="space-y-2.5">
            {wissenswertesLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-[14px] font-medium text-[#3D5C4A] transition-colors hover:text-[#1E3A2E]"
                >
                  <span className="text-[18px] leading-none text-[#7d9a88] transition-colors group-hover:text-[#3D5C4A]">
                    &rarr;
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="h-full min-h-[320px] w-px justify-self-center bg-[#d9d2c2]"
          aria-hidden="true"
        />

        <div className="pl-6">
          <p className="mb-5 text-[22px] font-semibold tracking-[-0.02em] text-[#1E3A2E]">
            Unsere Blogartikel
          </p>
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={`blog-skeleton-${idx}`}
                  className="flex items-center gap-4 rounded-xl border border-[#e6e0d1] bg-[#fbf8ef] p-3 animate-pulse"
                >
                  <div className="h-20 w-28 shrink-0 rounded-xl bg-[#e7dfcc]" />
                  <div className="h-14 w-px bg-[#d9d2c2]" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 h-3 w-20 rounded bg-[#e7dfcc]" />
                    <div className="mb-1.5 h-3.5 w-full rounded bg-[#e7dfcc]" />
                    <div className="h-3.5 w-4/5 rounded bg-[#e7dfcc]" />
                  </div>
                </div>
              ))
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <Link
                  key={article.id}
                  to={article.href}
                  className="group flex items-center gap-4"
                >
                  <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-[#ddd6c5] bg-[#eae4d3]">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#ebe3d0] text-xs font-semibold uppercase tracking-[0.08em] text-[#7a8f84]">
                        Blog
                      </div>
                    )}
                  </div>
                  <div className="h-14 w-px bg-[#d9d2c2]" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.04em] text-[#7a8f84]">
                      {article.category}
                    </p>
                    <p className="text-[13px] leading-snug font-medium text-[#2f4a3b] transition-colors group-hover:text-[#1E3A2E]">
                      {article.title}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-xl border border-[#e6e0d1] bg-[#fbf8ef] px-4 py-5 text-[13px] text-[#6b7d73]">
                Aktuell sind keine Blogartikel verfuegbar.
              </div>
            )}
          </div>
          <Link
            to="/blog"
            className="group mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#cfc7b3] bg-[#f7f2e6] px-4 py-2 text-[12px] font-semibold text-[#3D5C4A] transition-colors hover:border-[#b8af98] hover:text-[#1E3A2E]"
          >
            Alle Blogbeitraege ansehen
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current text-[11px] transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const { data: blogData = [], isLoading: isBlogLoading } = useQuery<BlogPost[]>({
    queryKey: ['blog'],
    queryFn: async () => {
      const response = await axiosPublic.get('/blog', {
        params: { _ts: Date.now() },
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });
      const apiData = response?.data?.data;
      return Array.isArray(apiData) ? apiData : [];
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const latestBlogArticles = useMemo<WissenswertesArticle[]>(() => {
    return blogData
      .slice()
      .sort((a, b) => getSortValue(b) - getSortValue(a))
      .slice(0, 2)
      .map((post) => {
        const labels = normalizeLabels(post.category);
        const fallbackLabels = normalizeLabels(post.tags);
        const categoryLabel = labels[0] ?? fallbackLabels[0] ?? 'Blog';

        return {
          id: post.id,
          category: mapLabel(categoryLabel),
          title: post.title,
          href: `/blog/${post.id}`,
          image: post.image,
        };
      });
  }, [blogData]);

  const clearCloseTimer = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openMenu = (menu: DropdownKey) => {
    clearCloseTimer();
    setOpenDropdown(menu);
  };

  const closeMenuWithDelay = () => {
    clearCloseTimer();
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
    }, closeDelayMs);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 36,
        zIndex: 200,
        background: 'rgba(250,245,234,.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(30,58,46,.08)',
      }}
    >
      {/*
       * Responsive strategy:
       * - Below xl (< 1280px): logo centered, hamburger for nav
       * - xl+ (>= 1280px):     logo left, all nav links, CTA, no hamburger
       */}
      <div
        className="relative gap-3 xl:gap-6"
        style={{
          width: '100%',
          padding: '0 clamp(18px, 1.4vw, 28px) 0 clamp(14px, 1.1vw, 22px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Spacer — balances centered logo against right-side buttons on mobile */}
        <div className="w-10 xl:hidden shrink-0" aria-hidden="true" />

        {/* Logo — centered on mobile/tablet, left-aligned on xl+ */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 shrink-0 justify-center xl:static xl:left-auto xl:translate-x-0 xl:justify-start"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'clamp(8px, 0.55vw, 12px)',
            minWidth: 120,
            textDecoration: 'none',
          }}
        >
          <img
            src="/images/logo/cta-banner.png"
            alt=""
            style={{ width: 'clamp(36px, 1.95vw, 50px)', height: 'clamp(36px, 1.95vw, 50px)', objectFit: 'contain', flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 1.56vw, 32px)',
              fontWeight: 600,
              color: '#1E3A2E',
              letterSpacing: '-0.01em',
            }}
          >
            Slimedo
          </span>
        </Link>

        {/* Desktop nav links - shown from xl upward */}
        <div
          className="hidden xl:flex"
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center', minWidth: 0 }}
        >
          <ul
            style={{
              alignItems: 'center',
              gap: 'clamp(28px, 1.95vw, 50px)',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
            }}
          >
            {links.map((link) => {
              const isDropdown = Boolean(link.dropdown);
              const isOpen = isDropdown && openDropdown === link.dropdown;

              return (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && openMenu(link.dropdown)}
                  onMouseLeave={closeMenuWithDelay}
                >
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="inline-flex items-center gap-1.5 py-2 text-[clamp(14px,0.7vw,18px)] font-medium text-[#3D5C4A] transition-colors hover:text-[#1E3A2E] focus-visible:outline-none focus-visible:text-[#1E3A2E]"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1.5 py-2 text-[clamp(14px,0.7vw,18px)] font-medium text-[#3D5C4A] transition-colors hover:text-[#1E3A2E] focus-visible:outline-none focus-visible:text-[#1E3A2E]"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                      onFocus={() => link.dropdown && openMenu(link.dropdown)}
                    >
                      {link.label}
                      {link.dropdown ? <ChevronDown isOpen={Boolean(isOpen)} /> : null}
                    </a>
                  )}

                  {link.dropdown ? (
                    <div
                      className={`${
                        link.dropdown === 'abnehmspritzen'
                          ? 'fixed left-0 right-0'
                          : 'fixed left-1/2 -translate-x-1/2 w-[min(1240px,calc(100vw-32px))]'
                      } z-[220] pt-3 transition-all duration-200 ${
                        isOpen
                          ? 'pointer-events-auto translate-y-0 opacity-100'
                          : 'pointer-events-none -translate-y-1 opacity-0'
                      }`}
                      style={{ top: DROPDOWN_TOP }}
                      onMouseEnter={() => openMenu(link.dropdown!)}
                      onMouseLeave={closeMenuWithDelay}
                    >
                      {link.dropdown === 'abnehmspritzen' ? (
                        <WeightLossDropdown />
                      ) : (
                        <WissenswertesDropdown
                          articles={latestBlogArticles}
                          isLoading={isBlogLoading}
                        />
                      )}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right-side: CTA visible from xl, hamburger visible below xl */}
        <div className="flex items-center gap-2 xl:gap-3 shrink-0">
          <div
            className="hidden xl:flex shrink-0"
            style={{ alignItems: 'center', gap: 10 }}
          >
            <Link
              to="/auth/login"
              style={{
                background: 'transparent',
                color: '#3D5C4A',
                padding: 'clamp(10px, 0.62vw, 13px) clamp(20px, 1.25vw, 26px)',
                borderRadius: 999,
                fontSize: 'clamp(13px, 0.63vw, 16px)',
                fontWeight: 500,
                textDecoration: 'none',
                fontFamily: '"Inter", sans-serif',
                border: '1px solid rgba(61,92,74,.65)',
                transition: 'background .2s,color .2s,border-color .2s',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(61,92,74,.08)';
                el.style.borderColor = '#3D5C4A';
                el.style.color = '#1E3A2E';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'transparent';
                el.style.borderColor = 'rgba(61,92,74,.65)';
                el.style.color = '#3D5C4A';
              }}
            >
              Login
            </Link>
            <Link
              to="/product/select"
              style={{
                background: '#3D5C4A',
                color: '#FAF5EA',
                padding: 'clamp(10px, 0.62vw, 13px) clamp(20px, 1.25vw, 26px)',
                borderRadius: 999,
                fontSize: 'clamp(13px, 0.63vw, 16px)',
                fontWeight: 500,
                textDecoration: 'none',
                fontFamily: '"Inter", sans-serif',
                transition: 'background .2s',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#1E3A2E')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#3D5C4A')
              }
            >
              Fragebogen starten -&gt;
            </Link>
          </div>

          {/* Hamburger - visible below xl */}
          <button
            className="flex xl:hidden shrink-0"
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#1E3A2E',
              padding: 4,
            }}
            aria-label="Menü"
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6l-12 12"
                  stroke="#1E3A2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="#1E3A2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu - shown below xl */}
      {mobileOpen && (
        <div
          className="xl:hidden flex flex-col gap-3"
          style={{
            background: 'rgba(250,245,234,.97)',
            borderTop: '1px solid rgba(30,58,46,.08)',
            padding: '16px 24px',
          }}
        >
          {links.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#3D5C4A',
                  textDecoration: 'none',
                  fontFamily: '"Inter", sans-serif',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(30,58,46,.06)',
                }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#3D5C4A',
                  textDecoration: 'none',
                  fontFamily: '"Inter", sans-serif',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(30,58,46,.06)',
                }}
              >
                {link.label}
              </a>
            )
          )}
          <Link
            to="/product/select"
            style={{
              background: '#3D5C4A',
              color: '#FAF5EA',
              padding: '12px 20px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              textAlign: 'center',
              marginTop: 8,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Fragebogen starten -&gt;
          </Link>
        </div>
      )}
    </nav>
  );
}
