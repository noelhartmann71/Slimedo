import { useRef, useEffect } from 'react';

const posts = [
  {
    tags: ['GLP-1 Therapie', 'Wirkung'],
    title: 'Wie wirkt die GLP-1-Therapie auf den Stoffwechsel?',
    desc: 'Die Wirkstoffe ahmen ein körpereigenes Sättigungshormon nach und wirken an mehreren Stellen im Körper.',
    gradient: 'linear-gradient(135deg,#CDDDCB,#A8C5A0)',
  },
  {
    tags: ['Ernährung'],
    title: 'Ernährung während der Therapie: Was du wissen solltest',
    desc: 'Die richtigen Lebensmittel unterstützen die Wirkung der GLP-1-Therapie und helfen, Nebenwirkungen zu reduzieren.',
    gradient: 'linear-gradient(135deg,#EDD89A,#D4B86A)',
  },
  {
    tags: ['Lifestyle'],
    title: 'Die wöchentliche Injektion einfach integrieren',
    desc: 'Kleine Routinen, die die Anwendung zur Gewohnheit machen.',
    gradient: 'linear-gradient(135deg,#E8D5C0,#C8A888)',
  },
];

export default function BlogSection() {
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
      id="blog"
      style={{ background: '#FAF5EA', padding: '80px 0' }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
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
          <a
            href="#"
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
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = '#1E3A2E')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = '#3D5C4A')
            }
          >
            Alle anzeigen →
          </a>
        </div>

        {/* Cards */}
        <div
          className="blog-grid-resp"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}
        >
          {posts.map((post, i) => (
            <article
              key={i}
              className={`slimedo-anim slimedo-d${i + 1}`}
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
              {/* Image area */}
              <div
                style={{
                  aspectRatio: '16/10',
                  background: post.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
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
              </div>

              {/* Body */}
              <div style={{ padding: '20px 22px 24px' }}>
                <div style={{ marginBottom: 12 }}>
                  {post.tags.map((tag) => (
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
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {tag}
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
                  {post.desc}
                </p>
                <a
                  href="#"
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
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.gap = '8px')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.gap = '4px')
                  }
                >
                  Weiterlesen →
                </a>
              </div>
            </article>
          ))}
        </div>
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
