import { useCallback, useEffect, useRef, useState } from 'react';

const imageCards = [
  {
    img: '/images/how-it-work/badge6.1-t.png',
    title: 'Vorbereitung',
    subtitle: 'Dosis einstellen',
    gradient: 'linear-gradient(180deg, #F5EEDB 0%, #E5D9BD 100%)',
    backgroundSize: 'cover, cover',
  },
    {img: '/images/how-it-work/badge6.2-t.png',
        title: 'Injektion',
        subtitle: 'In das Bauchfett',
        gradient: 'linear-gradient(180deg, #E8E0CE 0%, #D5C9AF 100%)',
        backgroundSize: 'cover, cover',
    },
    {
        img: '/images/how-it-work/badge_6.3-t.png',
        title: 'Intervall',
        subtitle: 'Ein Mal die Woche',
        gradient: 'linear-gradient(180deg, #DDD6C6 0%, #C8BFA8 100%)',
        backgroundSize: 'cover, contain',
    },
];

export default function AnwendungSection() {
    const ref = useRef<HTMLElement | null>(null);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const updateActiveIndex = useCallback(() => {
        const container = carouselRef.current;
        if (!container) return;

        const cards = Array.from(container.children) as HTMLElement[];
        if (!cards.length) return;

        const containerCenter = container.scrollLeft + container.clientWidth / 2;
        let closestIndex = 0;
        let smallestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + card.clientWidth / 2;
            const distance = Math.abs(containerCenter - cardCenter);
            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestIndex = index;
            }
        });

        setActiveIndex(closestIndex);
    }, []);

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

    useEffect(() => {
        const container = carouselRef.current;
        if (!container) return;

        updateActiveIndex();
        container.addEventListener('scroll', updateActiveIndex, { passive: true });
        window.addEventListener('resize', updateActiveIndex);

        return () => {
            container.removeEventListener('scroll', updateActiveIndex);
            window.removeEventListener('resize', updateActiveIndex);
        };
    }, [updateActiveIndex]);

    const scrollToCard = (targetIndex: number) => {
        const container = carouselRef.current;
        if (!container) return;

        const cards = Array.from(container.children) as HTMLElement[];
        if (!cards.length) return;

        const boundedIndex = Math.max(0, Math.min(targetIndex, cards.length - 1));
        cards[boundedIndex]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
            block: 'nearest',
        });
        setActiveIndex(boundedIndex);
    };

    return (
        <section
            ref={ref}
            id="anwendung"
            style={{
                background: 'radial-gradient(ellipse at 15% 20%, rgba(205,221,203,0.45) 0%, transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(237,216,154,0.3) 0%, transparent 55%), #FAF5EA',
                padding: 'clamp(72px, 5.88vw, 130px) 0 clamp(78px, 6.38vw, 143px)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div style={{ maxWidth: 1800, margin: '0 auto', padding: '0 40px' }}>
                {/* Header */}
                <header
                    style={{
                        marginBottom: 56,
                        position: 'relative',
                        zIndex: 2,
                        maxWidth: 900,
                    }}
                >
                    <p
                        className="slimedo-anim"
                        style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 12,
                            color: '#3D5C4A',
                            margin: '0 0 16px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.16em',
                            fontWeight: 500,
                        }}
                    >
                        Anwendung
                    </p>
                    <h2
                        className="slimedo-anim slimedo-d1 anw-hl-resp"
                        style={{
                            fontFamily: '"Instrument Serif", Georgia, serif',
                            fontSize: 'clamp(48px, 3.75vw, 100px)',
                            margin: 0,
                            color: '#1A1A1A',
                            lineHeight: 1.02,
                            fontWeight: 400,
                            letterSpacing: '-0.01em',
                        }}
                    >
                        Einfach in deinen{' '}
                        <em style={{ color: '#3D5C4A', fontStyle: 'italic' }}>Alltag</em> integriert
                    </h2>
                    <p
                        className="slimedo-anim slimedo-d2"
                        style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 19,
                            fontWeight: 600,
                            color: '#1A1A1A',
                            margin: '32px 0 12px',
                            letterSpacing: '-0.005em',
                            lineHeight: 1.35,
                        }}
                    >
                        Eine wöchentliche Injektion — alltagstauglich
                    </p>
                    <p
                        className="slimedo-anim slimedo-d3"
                        style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: '#768064',
                            margin: 0,
                            lineHeight: 1.6,
                            maxWidth: 640,
                        }}
                    >
                        Eine etablierte, klinisch geprüfte Therapie. Weltweit eingesetzt und ärztlich
                        verschrieben.
                    </p>
                </header>

                {/* Image grid */}
                <div
                    ref={carouselRef}
                    className="anw-grid-resp"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 20,
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    {imageCards.map((card, i) => (
                        <div
                            key={i}
                            className={`slimedo-anim slimedo-d${i + 1} anw-card-resp`}
                            style={{
                                height: 'clamp(480px, 40vw, 720px)',
                                background: card.gradient,
                                border: '1px solid rgba(61,92,74,0.22)',
                                borderRadius: 24,
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow:
                                    '0 1px 0 rgba(255,253,247,0.72) inset, 0 0 0 1px rgba(255,253,247,0.28) inset, 0 18px 44px rgba(61,92,74,0.14), 0 6px 18px rgba(15,31,26,0.10)',
                            }}
                        >
                            {/* Tinted image layer: keeps checkerboard-like backgrounds from standing out */}
                            <div
                                aria-hidden
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: `linear-gradient(165deg, rgba(246,239,222,0.84) 0%, rgba(212,221,204,0.62) 100%), url(${card.img})`,
                                    backgroundBlendMode: 'multiply',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: card.backgroundSize,
                                    filter: 'saturate(0.95) contrast(0.96)',
                                    zIndex: 1,
                                }}
                            />
                            {/* Soft section-tint to align image area with palette */}
                            <div
                                aria-hidden
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background:
                                        'linear-gradient(175deg, rgba(255,253,247,0.18) 0%, rgba(61,92,74,0.16) 100%)',
                                    zIndex: 2,
                                    pointerEvents: 'none',
                                }}
                            />

                            {/* Label overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    padding: '28px 24px 24px',
                                    background:
                                        'linear-gradient(180deg, rgba(30,58,46,0) 0%, rgba(30,58,46,0.85) 100%)',
                                    textAlign: 'center',
                                    zIndex: 3,
                                }}
                            >
                                <h3
                                    style={{
                                        fontFamily: '"Manrope", sans-serif',
                                        fontSize: 20,
                                        fontWeight: 600,
                                        margin: '0 0 4px',
                                        color: '#FFFDF7',
                                        letterSpacing: '-0.005em',
                                    }}
                                >
                                    {card.title}
                                </h3>
                                <p
                                    style={{
                                        fontFamily: '"Inter", sans-serif',
                                        fontSize: 13.5,
                                        color: '#E5DDC8',
                                        margin: 0,
                                        fontWeight: 400,
                                    }}
                                >
                                    {card.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="anw-carousel-controls">
                    <button
                        type="button"
                        aria-label="Vorheriges Bild"
                        className="anw-carousel-button anw-carousel-button--prev"
                        onClick={() => scrollToCard(activeIndex - 1)}
                    >
                        <svg viewBox="0 0 18 16" height="16" width="18" aria-hidden="true">
                            <path
                                d="M3 8h11M10 2l6 6-6 6"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            />
                        </svg>
                    </button>

                    <div className="anw-carousel-indicators" aria-label="Anwendungsbilder">
                        {imageCards.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Bild ${index + 1} anzeigen`}
                                aria-current={activeIndex === index ? 'true' : undefined}
                                className={`anw-carousel-dot${activeIndex === index ? ' anw-carousel-dot--active' : ''}`}
                                onClick={() => scrollToCard(index)}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        aria-label="Naechstes Bild"
                        className="anw-carousel-button"
                        onClick={() => scrollToCard(activeIndex + 1)}
                    >
                        <svg viewBox="0 0 18 16" height="16" width="18" aria-hidden="true">
                            <path
                                d="M3 8h11M10 2l6 6-6 6"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <style>{`
        .anw-carousel-controls {
          display: none;
        }

        .anw-carousel-button {
          align-items: center;
          background: #fff;
          border: 0;
          border-radius: 999px;
          box-shadow: 0px 12px 18px 0px rgba(206,208,216,0.7), 0px -12px 16px 0px rgba(255,255,255,0.82);
          color: #1A1A1A;
          cursor: pointer;
          display: inline-flex;
          height: 56px;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
          width: 56px;
        }

        .anw-carousel-button:active {
          transform: scale(0.95);
        }

        .anw-carousel-button:focus-visible,
        .anw-carousel-dot:focus-visible {
          outline: 2px solid #3D5C4A;
          outline-offset: 4px;
        }

        .anw-carousel-button svg {
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .anw-carousel-button--prev svg {
          transform: translate(-50%, -50%) scaleX(-1);
        }

        .anw-carousel-indicators {
          align-items: center;
          display: flex;
          gap: 19px;
        }

        .anw-carousel-dot {
          background: #D9D5CA;
          border: 0;
          border-radius: 999px;
          cursor: pointer;
          height: 12px;
          padding: 0;
          transition: background-color 0.3s ease;
          width: 12px;
        }

        .anw-carousel-dot--active {
          background: #3D5C4A;
        }

        .anw-grid-resp {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .anw-grid-resp::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 1024px) {
          .anw-hl-resp { font-size: 48px !important; }
        }
        @media (max-width: 640px) {
          .anw-grid-resp {
            gap: 27px !important;
            grid-template-columns: 88% 88% 88% !important;
            margin-left: -18px;
            margin-right: -18px;
            overflow-x: auto;
            padding: 20px 18px;
            scroll-behavior: smooth;
            scroll-snap-type: x mandatory;
          }
          .anw-card-resp {
            height: clamp(300px, 82vw, 360px) !important;
            min-height: 0;
            scroll-snap-align: center;
            width: 100%;
          }
          .anw-carousel-controls {
            align-items: center;
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
          }
          .anw-hl-resp { font-size: 32px !important; }
        }

        /* MacBook 14" (~1280–1520px) */
        @media (min-width: 1280px) and (max-width: 1520px) {
          .anw-card-resp { height: 510px !important; }
          .anw-grid-resp { gap: 4px !important; }
        }

        /* MacBook 16" (~1600–1800px) */
        @media (min-width: 1600px) and (max-width: 1800px) {
          .anw-card-resp { height: 580px !important; }
          .anw-grid-resp { gap: 6px !important; }
        }
      `}</style>
        </section>
    );
}
