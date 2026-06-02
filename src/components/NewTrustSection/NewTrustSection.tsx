import { useCallback, useEffect, useRef, useState } from "react";

import StepOneImg from "../../../public/images/how-it-work/badge5.2.png";
import StepTwoImg from "../../../public/images/how-it-work/badge5.png";
import StepThreeImg from "../../../public/images/how-it-work/badge5.1.png";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/useAxiosPublic";
import { Check, Copy } from "lucide-react";

const CARD_TRANSITION = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const FONT_INTER = '"Inter", sans-serif';
const FONT_INSTRUMENT_SERIF = '"Instrument Serif", Georgia, serif';
const FONT_MANROPE = '"Manrope", sans-serif';

type CouponData = {
  code?: string;
} | null;

const NewTrustSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCouponPopover, setShowCouponPopover] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
    const container = carouselRef.current;
    if (!container) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateActiveIndex();
    container.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      container.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCouponPopover(true);
        } else {
          setShowCouponPopover(false);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToStep = (targetIndex: number) => {
    const container = carouselRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;

    const boundedIndex = Math.max(0, Math.min(targetIndex, cards.length - 1));
    cards[boundedIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    setActiveIndex(boundedIndex);
  };

  const cardWrapperStyle = (index: number): React.CSSProperties => ({
    transform: hoveredCard === index ? "translateY(-12px)" : "translateY(0px)",
    transition: CARD_TRANSITION,
    willChange: "transform",
  });

  const { data: couponData, isLoading } = useQuery<CouponData>({
    queryKey: ["coupons"],
    queryFn: async () => {
      const response = await axiosPublic.get("/coupon");
      return response?.data?.data;
    },
  });

  const couponCode = Array.isArray(couponData)
    ? couponData[0]?.code
    : couponData?.code;

  const handleCopyCouponCode = async () => {
    if (!couponCode) return;

    try {
      await navigator.clipboard.writeText(couponCode);
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 1800);
    } catch {
      setCopiedCode(false);
    }
  };

  return (
    <>
      <section
        id="how-it-works-section"
        ref={sectionRef}
        className="w-full overflow-hidden relative bg-[#EEF4EE] lg:bg-center lg:bg-cover lg:bg-no-repeat lg:bg-surface-green lg:px-0 max-[640px]:bg-[linear-gradient(180deg,#F0EDDF_0%,#EEF4EE_45%,#F5F5F0_100%)] max-[640px]:max-w-360 max-[640px]:mx-auto max-[640px]:pb-6 max-[640px]:rounded-[15px] md:pt-12 pb-30 px-4 rounded-xl"
      >
        <div className="hidden lg:block">
          <div className="w-full h-full pointer-events-none absolute left-0 top-0">
            <img
              aria-hidden="true"
              src="/images/how-it-work/gradient-line-green.svg"
              alt=""
              className="w-full h-full object-cover"
              style={{ pointerEvents: "none", position: "relative" }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="mx-auto relative select-none" style={{ fontFamily: FONT_INTER }}>
          <p
            className="text-center mb-3"
            style={{
              fontFamily: FONT_INTER,
              fontSize: 12,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "#3D5C4A",
            }}
          >
            So einfach geht es
          </p>

          <h2
            className="text-center font-normal text-[#1A1A1A] text-[28px] lg:text-[52px] max-[640px]:mb-4 mb-6"
            style={{
              fontFamily: FONT_INSTRUMENT_SERIF,
              fontSize: "clamp(28px, 5vw, 62px)",
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            In drei Schritten zur{" "}
            <span
              className="[-webkit-text-fill-color:transparent] bg-clip-text bg-[linear-gradient(90deg,#4A6E58_0%,#3D5C4A_100%)] text-transparent"
              style={{ fontStyle: "italic" }}
            >
              Behandlung
            </span>
          </h2>

          <p
            className="text-center mb-10"
            style={{
              fontFamily: FONT_INTER,
              fontSize: 15,
              color: "#6E6A60",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <span>100% diskret</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>online</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>ärztlich begleitet</span>
          </p>

          <div
            id="how-it-works-carousel"
            ref={carouselRef}
            className="grid relative grid-cols-3 max-[640px]:-mx-4 max-[640px]:[-ms-overflow-style:none] max-[640px]:scroll-smooth max-[640px]:[scroll-snap-type:x_mandatory] max-[640px]:[scrollbar-width:none] max-[640px]:gap-6.75 max-[640px]:grid-cols-[80%_80%_80%] max-[640px]:overflow-x-auto max-[640px]:px-4.5 max-[640px]:py-5 max-w-300 mx-auto [&::-webkit-scrollbar]:hidden"
          >
            <div
              className="self-end cursor-pointer group lg:z-12 lg:rotate-[-11deg] origin-top-right"
              style={cardWrapperStyle(0)}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                id="how-it-works-step"
                data-step="0"
                className="lg:shadow-[0px_4px_16.9px_0px_rgba(0,0,0,0.25),0px_14.079px_276.301px_0px_rgba(0,193,19,0.13)] bg-white max-[640px]:px-4 max-[640px]:rounded-[27.967px] max-[640px]:snap-center pt-8 relative rounded-3xl shadow-[0px_4px_16.9px_0px_rgba(0,0,0,0.25)] max-[640px]:shadow-[0px_2.649px_11.19px_0px_rgba(0,0,0,0.25)] px-7.5 w-90 max-[640px]:w-full"
              >
                <div
                  className="flex items-center justify-center absolute rounded-full -top-5.25 -translate-x-1/2 bg-[#3D5C4A] font-bold h-10.75 leading-[1.4] left-1/2 max-[640px]:-top-4.5 max-[640px]:h-9 max-[640px]:text-[22.605px] max-[640px]:w-9 max-[640px]:z-101 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] text-[27px] text-white w-10.75 z-100"
                  style={{ fontFamily: FONT_MANROPE }}
                >
                  1
                </div>
                <div className="flex flex-col overflow-hidden max-[640px]:h-80 max-[640px]:justify-between h-105">
                  <div className="mb-2 relative shrink-0 max-[640px]:mb-4 text-center z-10">
                    <h3
                      className="text-[20px] font-semibold text-[#1A1A1A] leading-snug mb-0.75 sm:mb-2 select-none"
                      style={{ fontFamily: FONT_MANROPE }}
                    >
                      Fragebogen{" "}
                      <span className="[-webkit-text-fill-color:transparent] bg-clip-text bg-[linear-gradient(90deg,#4A6E58_0%,#3D5C4A_100%)] text-transparent">
                        ausfüllen
                      </span>
                    </h3>
                    <p
                        className="font-normal text-[#6E6A60] text-[16px]"
                        style={{fontFamily: FONT_INTER, lineHeight: 1.6}}
                    >
                      Starte die Online-Konsultation und <br/> beantworte die medizinischen Fragen.
                    </p>
                  </div>
                  <div className="flex justify-center flex-1 items-end min-h-0 pt-3">
                    <div className="h-full w-full">
                      <img
                        alt=""
                        src={StepOneImg}
                        className="h-full w-full object-contain max-[640px]:max-h-40"
                        style={{
                          transform: hoveredCard === 0 ? "scale(1.1)" : "scale(1)",
                          transition: CARD_TRANSITION,
                        }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="self-end cursor-pointer group lg:z-13 lg:pt-2.5"
              style={cardWrapperStyle(1)}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                id="how-it-works-step"
                data-step="1"
                className="flex flex-col relative rounded-3xl bg-white lg:shadow-[0px_4px_16.9px_0px_rgba(0,0,0,0.25),0px_14.079px_276.301px_0px_rgba(0,193,19,0.13)] max-[640px]:px-4 max-[640px]:rounded-[27.967px] max-[640px]:snap-center pt-8 shadow-[0px_4px_16.9px_0px_rgba(0,0,0,0.25)] px-6.25 w-90 max-[640px]:w-full"
              >
                <div
                  className="flex items-center justify-center absolute rounded-full -top-5.25 -translate-x-1/2 bg-[#3D5C4A] font-bold h-10.75 leading-[1.4] left-1/2 max-[640px]:-top-4.5 max-[640px]:h-9 max-[640px]:text-[22.605px] max-[640px]:w-9 max-[640px]:z-101 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] text-[27px] text-white w-10.75 z-100"
                  style={{ fontFamily: FONT_MANROPE }}
                >
                  2
                </div>
                <div className="flex flex-col overflow-hidden max-[640px]:h-80 max-[640px]:justify-between h-105">
                  <div className="mb-2 relative shrink-0 max-[640px]:mb-4 text-center z-10">
                    <h3
                      className="text-[20px] font-semibold text-[#1A1A1A] leading-snug mb-0.75 sm:mb-2"
                      style={{ fontFamily: FONT_MANROPE }}
                    >
                      Arzt prüft &{" "}
                      <span className="[-webkit-text-fill-color:transparent] bg-clip-text bg-[linear-gradient(90deg,#4A6E58_0%,#3D5C4A_100%)] text-transparent">
                        verschreibt
                      </span>
                    </h3>
                    <p
                      className="font-normal text-[#6E6A60] text-[16px]"
                      style={{ fontFamily: FONT_INTER, lineHeight: 1.6 }}
                    >
                      Approbierte Ärzte prüfen deine Angaben und stellen bei Bedarf ein Rezept aus.
                    </p>
                  </div>
                  <div className="flex justify-center flex-1 items-end min-h-0 pt-3">
                    <div className="h-full w-full flex justify-center">
                      <img
                        alt=""
                        src={StepTwoImg}
                        className="object-contain max-[640px]:max-h-40 max-h-75 max-w-full"
                        style={{
                          transform: hoveredCard === 1 ? "scale(1.1)" : "scale(1)",
                          transition: CARD_TRANSITION,
                        }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="self-end cursor-pointer group lg:z-12 lg:rotate-11 origin-top-left"
              style={cardWrapperStyle(2)}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                id="how-it-works-step"
                data-step="2"
                className="flex flex-col relative rounded-3xl bg-white lg:shadow-[0px_4px_16.9px_0px_rgba(0,0,0,0.25),0px_14.079px_276.301px_0px_rgba(0,193,19,0.13)] max-[640px]:px-4 max-[640px]:rounded-[27.967px] max-[640px]:snap-center pt-8 shadow-[0px_4px_16.9px_0px_rgba(0,0,0,0.25)] max-[640px]:shrink-0 max-[640px]:shadow-[0px_2.649px_11.19px_0px_rgba(0,0,0,0.25)] px-7.5 w-90 max-[640px]:w-full"
              >

                <div
                  className="flex items-center justify-center absolute rounded-full -top-5.25 -translate-x-1/2 bg-[#3D5C4A] font-bold h-10.75 leading-[1.4] left-1/2 max-[640px]:-top-4.5 max-[640px]:h-9 max-[640px]:text-[22.605px] max-[640px]:w-9 max-[640px]:z-101 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] text-[27px] text-white w-10.75 z-100"
                  style={{ fontFamily: FONT_MANROPE }}
                >
                  3
                </div>
                <div className="flex flex-col overflow-hidden max-[640px]:h-80 max-[640px]:justify-between h-105">
                  <div className="mb-2 relative shrink-0 max-[640px]:mb-4 text-center z-10">
                    <h3
                      className="text-[20px] font-semibold text-[#1A1A1A] leading-snug mb-0.75 sm:mb-2"
                      style={{ fontFamily: FONT_MANROPE }}
                    >
                      Lieferung in{" "}
                      <span className="[-webkit-text-fill-color:transparent] bg-clip-text bg-[linear-gradient(90deg,#4A6E58_0%,#3D5C4A_100%)] text-transparent">
                        1–2 Werktagen
                      </span>
                    </h3>
                    <p
                      className="font-normal text-[#6E6A60] text-[16px]"
                      style={{ fontFamily: FONT_INTER, lineHeight: 1.6 }}
                    >
                      Diskreter Versand deiner Medikamente direkt zu dir nach Hause.
                    </p>
                  </div>
                  <div className="flex justify-center flex-1 items-end min-h-0 pt-3">
                    <div className="h-full w-full">
                      <img
                        alt=""
                        src={StepThreeImg}
                        className="h-full w-full object-contain max-[640px]:max-h-40"
                        style={{
                          transform: hoveredCard === 2 ? "scale(1.1)" : "scale(1)",
                          transition: CARD_TRANSITION,
                        }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-10 gap-3">
            <a
              href="#start"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "linear-gradient(160deg,#4A6E58 0%,#3D5C4A 55%,#324E3F 100%)",
                color: "#FAF5EA",
                fontFamily: FONT_INTER,
                fontSize: 15,
                fontWeight: 500,
                padding: "16px 36px",
                borderRadius: 14,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(30,58,46,.22)",
                transition: "box-shadow .25s,transform .2s",
                letterSpacing: "0.005em",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 8px 28px rgba(30,58,46,.32)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 4px 16px rgba(30,58,46,.22)";
                el.style.transform = "translateY(0)";
              }}
            >
              Fragebogen starten
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M2 6.5h9M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <p style={{ fontFamily: FONT_INTER, fontSize: 13, color: "#6E6A60" }}>
              Dauert nur 2–3 Minuten
            </p>
          </div>

          <div className="items-center max-[640px]:flex hidden justify-between mt-2">
            <button
              type="button"
              aria-label="Previous step"
              id="how-it-works-prev"
              onClick={() => scrollToStep(activeIndex - 1)}
              className="bg-white relative [transition:all_0.3s_ease] active:scale-95 border-0 h-14 rounded-full shadow-[0px_12px_18px_0px_rgba(206,208,216,0.7),0px_-12px_16px_0px_rgba(255,255,255,0.82)] text-[#1A1A1A] w-14"
            >
              <svg
                viewBox="0 0 18 16"
                height="16"
                width="18"
                className="scale-x-[-1] -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2"
                aria-hidden="true"
              >
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

            <div className="flex items-center gap-4.75">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  data-indicator={index}
                  className={`transition-colors duration-300 rounded-full h-3 w-3 ${
                    activeIndex === index ? "bg-[#3D5C4A]" : "bg-[#D9D5CA]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next step"
              id="how-it-works-next"
              onClick={() => scrollToStep(activeIndex + 1)}
              className="bg-white relative [transition:all_0.3s_ease] active:scale-95 border-0 h-14 rounded-full shadow-[0px_12px_18px_0px_rgba(206,208,216,0.7),0px_-12px_16px_0px_rgba(255,255,255,0.82)] text-[#1A1A1A] w-14"
            >
              <svg
                viewBox="0 0 18 16"
                height="16"
                width="18"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              >
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
      </section>

      {/* ── Floating Coupon Popover ── */}
      <div
        className={`fixed bottom-6 left-1/2 z-999 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm transition-all duration-500 ease-out ${
          showCouponPopover
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0px_16px_40px_rgba(31,41,55,0.18)] backdrop-blur-sm sm:px-5 sm:py-4">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.9)_45%,rgba(237,216,154,0.8)_100%)]" />

          <button
            type="button"
            onClick={() => setShowCouponPopover(false)}
            className="absolute top-2.5 right-2.5 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition"
            aria-label="Close coupon"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1 1l8 8M9 1L1 9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="relative flex items-center justify-between gap-3 pr-4">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#29574E]">
                🎟 Gutscheincode
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="rounded-xl border border-[#29574E]/10 bg-white px-3 py-2 text-[14px] font-extrabold tracking-[0.2em] text-[#1f2937] shadow-sm flex-1 truncate">
                  {isLoading ? "Wird geladen..." : couponCode || "Nicht verfügbar"}
                </span>
              </div>
              <span className="text-[11px] text-[#6B7280] mt-1 block">
                Klicken Sie auf „Kopieren“, um den Code an der Kasse anzuzeigen.
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCouponCode}
              disabled={!couponCode || isLoading}
              className={`shrink-0 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                couponCode && !isLoading
                  ? "bg-[#29574E] text-white hover:bg-[#1f423c] active:scale-95"
                  : "cursor-not-allowed bg-white/70 text-[#9CA3AF]"
              }`}
            >
              {copiedCode ? <Check size={16} /> : <Copy size={16} />}
              <span className="text-[13px]">
                {copiedCode ? "Kopiert!" : "Kopieren"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTrustSection;
