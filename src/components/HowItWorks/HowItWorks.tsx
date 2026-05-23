import {
  HowItWorksIconFourSvg,
  HowItWorksIconOneSvg,
  HowItWorksIconThreeSvg,
  HowItWorksIconTwoSvg,
} from "../svg-container/SvgContainer";

const steps = [
  {
    number: "1",
    icon: <HowItWorksIconOneSvg />,
    title: "Eignungsprüfung",
    description:
      "Füllen Sie einen kurzen medizinischen Fragebogen aus, um zu prüfen, ob unsere Behandlung für Sie geeignet ist.",
  },
  {
    number: "2",
    icon: <HowItWorksIconTwoSvg />,
    title: "Medizinischer Fragebogen",
    description:
      "Geben Sie detaillierte Gesundheitsinformationen an, damit unsere Ärzte Ihren Fall gründlich prüfen können.",
  },
  {
    number: "3",
    icon: <HowItWorksIconThreeSvg />,
    title: "Medizinische Überprüfung",
    description:
      "Zugelassene Ärzte prüfen Ihre Angaben und genehmigen bei Eignung Ihr Rezept.",
  },
  {
    number: "4",
    icon: <HowItWorksIconFourSvg />,
    title: "Apotheke & Lieferung",
    description:
      "Wählen Sie Ihre Wunschapotheke und erhalten Sie Ihr Rezept schnell und diskret.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#1a3330] py-10 lg:py-20">
      <div className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-50">
        {/* Label pill */}
        <div className="flex justify-center mb-5">
          <span className="inline-block px-3.5 py-2 bg-[#f0ede6] text-[#29574E] text-sm sm:text-base font-medium rounded-xl">
            So funktioniert es
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-7 lg:mb-14">
          <h2 className="font-serif text-3xl lg:text-[46px] font-bold text-white mb-4">
            So funktioniert es
          </h2>
          <p className="text-[#E5E7EB] text-lg mx-auto leading-relaxed">
            Nutzen Sie die Kraft der KI, um potenzielle Gesundheitsprobleme vorherzusagen.
            <br />
            Erhalten Sie proaktive Empfehlungen für die Gesundheitsvorsorge basierend auf Datenanalysen.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#FFFFFF05] border border-[#FFFFFF1A] rounded-2xl p-4 xl:p-8 flex flex-col gap-5 relative overflow-hidden"
            >
              {/* Big faded step number */}
              <span className="absolute top-3 right-4 text-5xl font-bold leading-none select-none bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,#18342E_79.89%)] bg-clip-text text-transparent">
                {step.number}
              </span>

              {/* Icon circle */}
              <div className="w-16 h-16 bg-[#FFF] rounded-full flex items-center justify-center z-10">
                {step.icon}
              </div>

              <h3 className="text-[#F9FAFB] font-normal text-2xl z-10 font-inter">
                {step.title}
              </h3>
              <p className="text-[#9CA3AF] text-base leading-relaxed z-10 font-inter">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
