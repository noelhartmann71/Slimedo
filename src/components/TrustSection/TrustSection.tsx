import {
  YourIconFourSvg,
  YourIconOneSvg,
  YourIconThreeSvg,
  YourIconTwoSvg,
} from "../svg-container/SvgContainer";

const cards = [
  {
    icon: <YourIconOneSvg />,
    title: "Lizenzierte Medizinische Fachkräfte",
    description:
      "Alle Rezepte werden von zertifizierten Ärzten geprüft und genehmigt.",
  },
  {
    icon: <YourIconTwoSvg />,
    title: "DSGVO-konforme Datensicherheit",
    description:
      "Ihre persönlichen und medizinischen Daten werden verschlüsselt und sicher gespeichert.",
  },
  {
    icon: <YourIconThreeSvg />,
    title: "Rechtsgültig Signierte Rezepte",
    description:
      "Jedes genehmigte Rezept ist digital signiert und rechtsgültig.",
  },
  {
    icon: <YourIconFourSvg />,
    title: "Persönliche Gesundheitsbewertung",
    description:
      "Umfassende Körperchecks, Labortests und kontinuierliche Gesundheitsüberwachung.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-white py-10 lg:py-20 font-serif">
      <div className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-50 flex flex-col items-center">
        {/* Heading */}
        <div className="text-center mb-10 lg:mb-20">
          <h2 className="text-3xl lg:text-[46px] font-semibold text-[#1a3330] mb-2 lg:mb-5 leading-[1.1] m-0">
            Ihre Gesundheit <span className="font-sans text-[#1a3330]">&</span> Daten
            sind bei uns sicher
          </h2>
          <p className="text-[#1a3330]/55 text-[16px] leading-relaxed m-0">
            Wir befolgen strenge medizinische und Datenschutzstandards, um Ihre <br />
            Sicherheit und Privatsphäre zu gewährleisten.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-[#F7F8F6] rounded-2xl p-4 xl:p-7.5 flex flex-col gap-5 font-inter items-center text-center"
            >
              {/* Icon circle */}
              <div className="w-18 h-18 bg-[#E8ECEB66] rounded-full flex items-center justify-center shrink-0">
                {card.icon}
              </div>

              {/* Title pill */}
              <div className="bg-[#E8ECEB80] rounded-xl px-2 py-3">
                <h3 className="text-base xl:text-lg font-medium text-[#29574E] leading-snug m-0 text-center">
                  {card.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[13.5px] text-[#1a3330]/50 leading-relaxed m-0 text-center">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
