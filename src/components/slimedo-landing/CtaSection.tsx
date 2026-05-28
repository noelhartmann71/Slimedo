import {useEffect, useRef} from 'react';

export default function CtaSection() {
    const ref = useRef<HTMLElement | null>(null);

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
            {threshold: 0.07, rootMargin: '0px 0px -20px 0px'}
        );
        anims.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            id="start"
            style={{
                background: '#FFFDF7',
                padding: '52px 0 72px',
                position: 'relative',
            }}
        >
            <div
                className="cta-shell-resp"
                style={{maxWidth: 2720, margin: '0 auto', padding: '0 56px'}}
            >
                <div
                    className="cta-card-resp"
                    style={{
                        background: '#1E3A2E',
                        minHeight: 600,
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 70,
                    }}
                >
                    <div className="slimedoReplicaPageBg" aria-hidden>
                        <div className="slimedoBanner">
                            <svg viewBox="0 0 2048 602" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
                        <defs>
                            <linearGradient id="topShadowGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#082924" stopOpacity="0.24"/>
                                <stop offset="58%" stopColor="#082924" stopOpacity="0.08"/>
                                <stop offset="100%" stopColor="#082924" stopOpacity="0"/>
                            </linearGradient>

                            <linearGradient id="midShadowGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#082723" stopOpacity="0"/>
                                <stop offset="35%" stopColor="#082723" stopOpacity="0.1"/>
                                <stop offset="56%" stopColor="#082723" stopOpacity="0.22"/>
                                <stop offset="80%" stopColor="#082723" stopOpacity="0.12"/>
                                <stop offset="100%" stopColor="#082723" stopOpacity="0"/>
                            </linearGradient>

                            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#71847f"/>
                                <stop offset="48%" stopColor="#637670"/>
                                <stop offset="100%" stopColor="#768984"/>
                            </linearGradient>

                            <linearGradient id="edgeMaskGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="black"/>
                                <stop offset="6%" stopColor="white"/>
                                <stop offset="94%" stopColor="white"/>
                                <stop offset="100%" stopColor="black"/>
                            </linearGradient>

                            <mask id="edgeFadeMask">
                                <rect width="2048" height="602" fill="url(#edgeMaskGradient)"/>
                            </mask>
                        </defs>

                        <rect width="2048" height="602" fill="transparent"/>

                        <path
                            d="M-140 -26
               C150 -10 402 48 648 128
               C888 206 1092 274 1300 276
               C1492 278 1688 214 1860 128
               C1972 72 2062 34 2188 4
               L2188 -26
               Z"
                            fill="url(#topShadowGradient)"
                        />

                        <path
                            d="M-170 362
               C134 296 402 250 678 252
               C950 254 1118 312 1292 398
               C1470 486 1640 548 1886 566
               C2008 574 2094 570 2188 554
               L2188 0
               C1998 12 1888 78 1768 146
               C1624 226 1490 278 1288 276
               C1068 274 874 206 652 126
               C436 48 184 -10 -170 -30
               Z"
                            fill="url(#midShadowGradient)"
                        />

                                <g mask="url(#edgeFadeMask)">
                                    {wavePaths.map((path, index) => (
                                        <path
                                            key={index}
                                            className="waveLine"
                                            opacity={path.opacity}
                                            d={path.d}
                                        />
                                    ))}
                                </g>

                            </svg>
                            <div className="slimedoWordmarkFade">Slimedo</div>
                        </div>
                    </div>

            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    background:
                        'radial-gradient(ellipse at 15% 50%, rgba(61,92,74,.3) 0%, transparent 60%), radial-gradient(ellipse at 85% 50%, rgba(61,92,74,.2) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }}
            />

            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    maxWidth: 980,
                    margin: '0 auto',
                    padding: '0 24px',
                }}
            >
                <div
                    className="slimedo-anim played"
                    style={{
                        width: 80,
                        height: 80,
                        background: '#FAF5EA',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 36px',
                        boxShadow: '0 4px 24px rgba(0,0,0,.15)',
                    }}
                >
                    <img
                        src="/images/logo/cta-banner.png"
                        alt="Slimedo Logo"
                        style={{objectFit: 'contain', flexShrink: 0}}
                    />
                </div>

                <h2
                    className="slimedo-anim played slimedo-d1 cta-hl-resp"
                    style={{
                        fontFamily: '"Instrument Serif", Georgia, serif',
                        fontSize: 68,
                        lineHeight: 1.02,
                        fontWeight: 400,
                        letterSpacing: '-.01em',
                        color: '#FAF5EA',
                        marginBottom: 20,
                    }}
                >
                    Bereit für deinen{' '}
                    <em style={{color: '#CDDDCB', fontStyle: 'italic'}}>Neuanfang?</em>
                </h2>

                <p
                    className="slimedo-anim played slimedo-d2"
                    style={{
                        fontSize: 17,
                        color: 'rgba(205,221,203,.7)',
                        marginBottom: 40,
                        fontFamily: '"Inter", sans-serif',
                    }}
                >
                    Starte jetzt deine ärztlich begleitete Behandlung.
                    <br/>
                    Diskret · ärztlich geprüft · direkt nach Hause.
                </p>

                <a
                    href="#"
                    className="slimedo-anim played slimedo-d3 ctaButton"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        background: '#FAF5EA',
                        color: '#1E3A2E',
                        fontSize: 16,
                        fontWeight: 600,
                        padding: '18px 44px',
                        borderRadius: 999,
                        cursor: 'pointer',
                        textDecoration: 'none',
                        boxShadow: '0 4px 24px rgba(0,0,0,.2)',
                        transition: 'background .2s,transform .15s',
                        fontFamily: '"Inter", sans-serif',
                    }}
                >
                    Rezeptanfrage machen
                    <span
                        style={{
                            width: 32,
                            height: 32,
                            background: '#1E3A2E',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M2 7h10M8 3l4 4-4 4"
                                stroke="#FAF5EA"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </a>
                    </div>
                </div>
            </div>

            <style>{`
        .slimedoReplicaPageBg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .cta-card-resp {
          --cta-top-cut: 22px; /* Feinjustierung: höherer Wert = oben stärker gekürzt */
          clip-path: inset(var(--cta-top-cut) 0 0 0 round 70px);
          -webkit-clip-path: inset(var(--cta-top-cut) 0 0 0 round 70px);
        }

        .slimedoBanner {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 0;
          background: #1E3A2E;
          transform: translateY(80px);

        }

        .slimedoBanner svg {
          width: 100%;
          height: 100%;
          display: block;
          transform: translateY(-10px);
        }

        .slimedoWordmarkFade {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          font-family: Inter, Poppins, Arial, sans-serif;
          font-weight: 740;
          font-size: clamp(110px, 18vw, 330px);
          line-height: 0.9;
          letter-spacing: 5px;
          padding-inline: 0.06em;
          white-space: nowrap;
          user-select: none;
          color: rgba(188, 200, 195, 0.92);
          -webkit-mask-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.4) 30%,
            rgba(0, 0, 0, 0.1) 48%,
            rgba(0, 0, 0, 0) 62%
          );
          mask-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.4) 30%,
            rgba(0, 0, 0, 0.1) 48%,
            rgba(0, 0, 0, 0) 62%
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }

        .waveLine {
          fill: none;
          stroke: url(#waveGradient);
          stroke-width: 1.35;
          stroke-linecap: round;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;
        }

        .ctaButton:hover {
          background: #CDDDCB !important;
          transform: translateY(-1px);
        }

        @media (max-width: 1200px) {
          .cta-shell-resp { padding-left: 32px !important; padding-right: 32px !important; }
        }

        @media (max-width: 900px) {
          .cta-card-resp {
            border-radius: 30px !important;
            clip-path: inset(var(--cta-top-cut) 0 0 0 round 30px);
            -webkit-clip-path: inset(var(--cta-top-cut) 0 0 0 round 30px);
          }
        }

        @media (max-width: 640px) {
          .cta-shell-resp { padding-left: 16px !important; padding-right: 16px !important; }
          .cta-card-resp {
            border-radius: 22px !important;
            min-height: 700px !important;
            clip-path: inset(var(--cta-top-cut) 0 0 0 round 22px);
            -webkit-clip-path: inset(var(--cta-top-cut) 0 0 0 round 22px);
          }
          .cta-hl-resp { font-size: 40px !important; }
        }
      `}</style>
        </section>
    );
}

const wavePaths = [
    {
        opacity: 0.32,
        d: `M -520 236.0
C -190 159.9, 160 128.7, 510 153.5
C 760 170.7, 960 224.8, 1138 316.8
C 1236 373.8, 1326 441.6, 1456 517.2
C 1594 605.9, 1718 661.4, 1832 650.5
C 1944 630.9, 2020 520.9, 2118 382.0
C 2228 216.5, 2350 103.0, 2520 48.6`,
    },
    {
        opacity: 0.31,
        d: `M -520 248.0
C -190 169.8, 160 136.2, 510 158.6
C 760 174.0, 960 226.5, 1138 317.4
C 1236 373.3, 1326 439.8, 1456 513.6
C 1594 599.6, 1718 652.3, 1832 639.4
C 1944 618.6, 2020 508.6, 2118 370.0
C 2228 205.4, 2350 92.9, 2520 39.7`,
    },
    {
        opacity: 0.3,
        d: `M -520 260.0
C -190 179.6, 160 143.6, 510 163.6
C 760 177.4, 960 228.2, 1138 318.0
C 1236 372.8, 1326 438.0, 1456 510.0
C 1594 593.4, 1718 643.2, 1832 628.4
C 1944 606.4, 2020 496.4, 2118 358.0
C 2228 194.4, 2350 82.8, 2520 30.8`,
    },
    {
        opacity: 0.3,
        d: `M -520 272.0
C -190 189.4, 160 151.0, 510 168.6
C 760 180.8, 960 229.9, 1138 318.6
C 1236 372.3, 1326 436.2, 1456 506.4
C 1594 587.2, 1718 634.1, 1832 617.4
C 1944 594.2, 2020 484.2, 2118 346.0
C 2228 183.4, 2350 72.7, 2520 21.9`,
    },
    {
        opacity: 0.29,
        d: `M -520 284.0
C -190 199.3, 160 158.5, 510 173.7
C 760 184.1, 960 231.6, 1138 319.2
C 1236 371.8, 1326 434.4, 1456 502.8
C 1594 580.9, 1718 625.0, 1832 606.3
C 1944 581.9, 2020 471.9, 2118 334.0
C 2228 172.3, 2350 62.6, 2520 13.0`,
    },
    {
        opacity: 0.28,
        d: `M -520 296.0
C -190 209.1, 160 165.9, 510 178.7
C 760 187.5, 960 233.2, 1138 319.8
C 1236 371.4, 1326 432.6, 1456 499.2
C 1594 574.7, 1718 615.8, 1832 595.3
C 1944 569.7, 2020 459.7, 2118 322.0
C 2228 161.3, 2350 52.6, 2520 4.2`,
    },
    {
        opacity: 0.27,
        d: `M -520 308.0
C -190 219.0, 160 173.4, 510 183.8
C 760 190.8, 960 234.9, 1138 320.4
C 1236 370.9, 1326 430.8, 1456 495.6
C 1594 568.4, 1718 606.7, 1832 584.2
C 1944 557.4, 2020 447.4, 2118 310.0
C 2228 150.2, 2350 42.5, 2520 -4.7`,
    },
    {
        opacity: 0.26,
        d: `M -520 320.0
C -190 228.8, 160 180.8, 510 188.8
C 760 194.2, 960 236.6, 1138 321.0
C 1236 370.4, 1326 429.0, 1456 492.0
C 1594 562.2, 1718 597.6, 1832 573.2
C 1944 545.2, 2020 435.2, 2118 298.0
C 2228 139.2, 2350 32.4, 2520 -13.6`,
    },
    {
        opacity: 0.25,
        d: `M -520 332.0
C -190 238.6, 160 188.2, 510 193.8
C 760 197.6, 960 238.3, 1138 321.6
C 1236 369.9, 1326 427.2, 1456 488.4
C 1594 556.0, 1718 588.5, 1832 562.2
C 1944 533.0, 2020 423.0, 2118 286.0
C 2228 128.2, 2350 22.3, 2520 -22.5`,
    },
    {
        opacity: 0.24,
        d: `M -520 344.0
C -190 248.5, 160 195.7, 510 198.9
C 760 200.9, 960 240.0, 1138 322.2
C 1236 369.4, 1326 425.4, 1456 484.8
C 1594 549.7, 1718 579.4, 1832 551.1
C 1944 520.7, 2020 410.7, 2118 274.0
C 2228 117.1, 2350 12.2, 2520 -31.4`,
    },
    {
        opacity: 0.23,
        d: `M -520 356.0
C -190 258.3, 160 203.1, 510 203.9
C 760 204.3, 960 241.6, 1138 322.8
C 1236 369.0, 1326 423.6, 1456 481.2
C 1594 543.5, 1718 570.2, 1832 540.1
C 1944 508.5, 2020 398.5, 2118 262.0
C 2228 106.1, 2350 2.2, 2520 -40.2`,
    },
    {
        opacity: 0.21,
        d: `M -520 368.0
C -190 268.2, 160 210.6, 510 209.0
C 760 207.6, 960 243.3, 1138 323.4
C 1236 368.5, 1326 421.8, 1456 477.6
C 1594 537.2, 1718 561.1, 1832 529.0
C 1944 496.2, 2020 386.2, 2118 250.0
C 2228 95.0, 2350 -7.9, 2520 -49.1`,
    },
    {
        opacity: 0.19,
        d: `M -520 380.0
C -190 278.0, 160 218.0, 510 214.0
C 760 211.0, 960 245.0, 1138 324.0
C 1236 368.0, 1326 420.0, 1456 474.0
C 1594 531.0, 1718 552.0, 1832 518.0
C 1944 484.0, 2020 374.0, 2118 238.0
C 2228 84.0, 2350 -18.0, 2520 -58.0`,
    },
    {
        opacity: 0.21,
        d: `M -520 392.0
C -190 287.8, 160 225.4, 510 219.0
C 760 214.4, 960 246.7, 1138 324.6
C 1236 367.5, 1326 418.2, 1456 470.4
C 1594 524.8, 1718 542.9, 1832 507.0
C 1944 471.8, 2020 361.8, 2118 226.0
C 2228 73.0, 2350 -28.1, 2520 -66.9`,
    },
    {
        opacity: 0.23,
        d: `M -520 404.0
C -190 297.7, 160 232.9, 510 224.1
C 760 217.7, 960 248.4, 1138 325.2
C 1236 367.0, 1326 416.4, 1456 466.8
C 1594 518.5, 1718 533.8, 1832 495.9
C 1944 459.5, 2020 349.5, 2118 214.0
C 2228 61.9, 2350 -38.2, 2520 -75.8`,
    },
    {
        opacity: 0.24,
        d: `M -520 416.0
C -190 307.5, 160 240.3, 510 229.1
C 760 221.1, 960 250.0, 1138 325.8
C 1236 366.6, 1326 414.6, 1456 463.2
C 1594 512.3, 1718 524.6, 1832 484.9
C 1944 447.3, 2020 337.3, 2118 202.0
C 2228 50.9, 2350 -48.2, 2520 -84.6`,
    },
    {
        opacity: 0.25,
        d: `M -520 428.0
C -190 317.4, 160 247.8, 510 234.2
C 760 224.4, 960 251.7, 1138 326.4
C 1236 366.1, 1326 412.8, 1456 459.6
C 1594 506.0, 1718 515.5, 1832 473.8
C 1944 435.0, 2020 325.0, 2118 190.0
C 2228 39.8, 2350 -58.3, 2520 -93.5`,
    },
    {
        opacity: 0.26,
        d: `M -520 440.0
C -190 327.2, 160 255.2, 510 239.2
C 760 227.8, 960 253.4, 1138 327.0
C 1236 365.6, 1326 411.0, 1456 456.0
C 1594 499.8, 1718 506.4, 1832 462.8
C 1944 422.8, 2020 312.8, 2118 178.0
C 2228 28.8, 2350 -68.4, 2520 -102.4`,
    },
    {
        opacity: 0.27,
        d: `M -520 452.0
C -190 337.0, 160 262.6, 510 244.2
C 760 231.2, 960 255.1, 1138 327.6
C 1236 365.1, 1326 409.2, 1456 452.4
C 1594 493.6, 1718 497.3, 1832 451.8
C 1944 410.6, 2020 300.6, 2118 166.0
C 2228 17.8, 2350 -78.5, 2520 -111.3`,
    },
    {
        opacity: 0.28,
        d: `M -520 464.0
C -190 346.9, 160 270.1, 510 249.3
C 760 234.5, 960 256.8, 1138 328.2
C 1236 364.6, 1326 407.4, 1456 448.8
C 1594 487.3, 1718 488.2, 1832 440.7
C 1944 398.3, 2020 288.3, 2118 154.0
C 2228 6.7, 2350 -88.6, 2520 -120.2`,
    },
    {
        opacity: 0.29,
        d: `M -520 476.0
C -190 356.7, 160 277.5, 510 254.3
C 760 237.9, 960 258.4, 1138 328.8
C 1236 364.2, 1326 405.6, 1456 445.2
C 1594 481.1, 1718 479.0, 1832 429.7
C 1944 386.1, 2020 276.1, 2118 142.0
C 2228 -4.3, 2350 -98.6, 2520 -129.0`,
    },
    {
        opacity: 0.3,
        d: `M -520 488.0
C -190 366.6, 160 285.0, 510 259.4
C 760 241.2, 960 260.1, 1138 329.4
C 1236 363.7, 1326 403.8, 1456 441.6
C 1594 474.8, 1718 469.9, 1832 418.6
C 1944 373.8, 2020 263.8, 2118 130.0
C 2228 -15.4, 2350 -108.7, 2520 -137.9`,
    },
    {
        opacity: 0.3,
        d: `M -520 500.0
C -190 376.4, 160 292.4, 510 264.4
C 760 244.6, 960 261.8, 1138 330.0
C 1236 363.2, 1326 402.0, 1456 438.0
C 1594 468.6, 1718 460.8, 1832 407.6
C 1944 361.6, 2020 251.6, 2118 118.0
C 2228 -26.4, 2350 -118.8, 2520 -146.8`,
    },
    {
        opacity: 0.31,
        d: `M -520 512.0
C -190 386.2, 160 299.8, 510 269.4
C 760 248.0, 960 263.5, 1138 330.6
C 1236 362.7, 1326 400.2, 1456 434.4
C 1594 462.4, 1718 451.7, 1832 396.6
C 1944 349.4, 2020 239.4, 2118 106.0
C 2228 -37.4, 2350 -128.9, 2520 -155.7`,
    },
    {
        opacity: 0.32,
        d: `M -520 524.0
C -190 396.1, 160 307.3, 510 274.5
C 760 251.3, 960 265.2, 1138 331.2
C 1236 362.2, 1326 398.4, 1456 430.8
C 1594 456.1, 1718 442.6, 1832 385.5
C 1944 337.1, 2020 227.1, 2118 94.0
C 2228 -48.5, 2350 -139.0, 2520 -164.6`,
    },
];
