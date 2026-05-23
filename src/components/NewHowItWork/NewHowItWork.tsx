import HowItWorKImg from "../../../public/images/how-it-work/how-it-work.png";
import HowItWorKImgTwo from "../../../public/images/how-it-work/how-it-work-2.png";
import HowItWorKImgThree from "../../../public/images/how-it-work/how-it-work-3.png";

const steps = [
  {
    id: 1,
    label: "Vorbereitung",
    sublabel: "Dosis einstellen",
    imageSrc: HowItWorKImg,
    alt: "Vorbereitung – Dosis einstellen",
  },
  {
    id: 2,
    label: "Injektion",
    sublabel: "In das Bauchfett",
    imageSrc: HowItWorKImgTwo,
    alt: "Injektion – In das Bauchfett",
  },
  {
    id: 3,
    label: "Intervall",
    sublabel: "Ein Mal die Woche",
    imageSrc: HowItWorKImgThree,
    alt: "Intervall – Ein Mal die Woche",
  },
];

const NewHowItWork = () => {
  return (
    <section id="how-it-works" className="bg-white w-full py-20 scroll-mt-24">
      <div className="mx-50">
        {/* Section label */}
        <p className="text-[#2d6a4f] text-[15px] font-semibold mb-2 tracking-wide">
          Anwendung
        </p>
        {/* Heading */}
        <h2 className="font-serif text-3xl lg:text-[46px] font-semibold text-[#227C31] mb-2">
          So funktioniert deine Behandlung
        </h2>
        {/* Sub-heading */}
        <p className="text-2xl font-bold text-[#111] mb-1.5">
          Mit der Abnehmspritze zum Wunschgewicht
        </p>
        {/* Description */}
        <p className="text-[14px] text-[#444] mb-8 max-w-3xl leading-[1.6]">
          Über 17 Millionen Menschen weltweit haben die Abnehmspritze in ihren
          Alltag integriert und damit abgenommen. Eine Injektion ins Bauchfett
          pro Woche reicht aus.
        </p>
        {/* Three image cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative rounded-[14px] overflow-hidden h-60 md:h-100.5"
            >
              {/* z-0 — Fallback gradient (hidden behind image when image loads) */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background:
                    "linear-gradient(160deg,#d4e4d4 0%,#8fb48f 35%,#3d7a55 70%,#1e4d33 100%)",
                }}
              />

              {/* z-[1] — Photo */}
              <img
                src={step.imageSrc}
                alt={step.alt}
                className="absolute inset-0 z-1 w-full h-full object-cover object-top"
              />

              {/* z-[2] — Bottom dark-to-transparent overlay for text legibility */}
              <div
                className="absolute inset-0 z-2"
                style={{
                  background:
                    "linear-gradient(to top,rgba(15,40,25,0.88) 0%,rgba(15,40,25,0.30) 42%,transparent 72%)",
                }}
              />

              {/* z-[3] — Label text */}
              <div className="absolute bottom-0 left-0 right-0 z-3 px-4.5 py-3.5 text-center">
                <p className="text-white font-bold text-[15px] leading-snug">
                  {step.label}
                </p>
                <p className="text-[#b8cfc0] text-[12px] mt-0.5 font-normal">
                  {step.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewHowItWork;
