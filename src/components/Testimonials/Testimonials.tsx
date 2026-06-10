import { useState } from "react";

interface Testimonial {
  id: number;
  kg: number;
  period: string;
  quote: string;
  beforeImg: string;
  afterImg: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    kg: 21,
    period: "Gewichtsverlust in 6 Monaten",
    quote:
      '"Dieses Mal war es nicht nur eine weitere Diät. Mit Slimedo habe ich 21 kg abgenommen, angefangen ins Fitnessstudio zu gehen und endlich begonnen, die Frau im Spiegel zu lieben."',
    beforeImg:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=380&h=420&fit=crop",
    afterImg:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=380&h=420&fit=crop",
  },
  {
    id: 3,
    kg: 18,
    period: "Gewichtsverlust in 5 Monaten",
    quote:
      '"Der medizinische Ansatz von Slimedo machte den ganzen Unterschied. 18 kg abzunehmen veränderte nicht nur meinen Körper, sondern meine gesamte Sicht auf Gesundheit."',
    beforeImg:
      "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=380&h=420&fit=crop",
    afterImg:
      "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=380&h=420&fit=crop",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="bg-[#FFFFFE] py-10 2xl:py-20">
      <div className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-50">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl lg:text-[46px] font-semibold text-sage mb-2">
              Slimedo verändert Leben
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[#00B67A] text-lg">
                    ★
                  </span>
                ))}
              </div>
              {/* THis is the trustpilot rating */}
              <div className="flex flex-row gap-2 items-center">
                <span className="text-base text-deep font-medium">
                  4,7 auf Trustpilot
                </span>
                <span className="text-xs text-deep">
                  10353 Bewertungen
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-5 2xl:gap-16">
          {/* Text card */}
          <div className="bg-[#F4F1E780] rounded-2xl p-8 flex flex-col justify-between gap-6 lg:w-[50%] 2xl:w-248.75 shrink-0">
            <div>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-serif text-6xl font-bold text-[#1d2d2a]">
                  {t.kg}
                </span>
                <span className="text-xl font-semibold text-[#1d2d2a] mb-2">
                  kg
                </span>
              </div>
              <p className="text-lg text-[#092530] font-normal mb-4">
                {t.period}
              </p>
              <p className="text-lg md:text-2xl text-[#374151] leading-relaxed italic mt-10 xl:mt-27.75">
                {t.quote}
              </p>
            </div>
          </div>

          {/* Images */}
          <div className="flex gap-4 flex-1">
            {[{ src: t.beforeImg, label: "1 Monat" }].map(({ src, label }) => (
              <div
                key={label}
                className="relative flex-1 rounded-2xl overflow-hidden w-[50%] 2xl:w-full h-109.5"
              >
                <img
                  src={src}
                  alt={label}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-white/90 text-[#1d2d2a] text-xs font-semibold px-3 py-1 rounded-full">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
