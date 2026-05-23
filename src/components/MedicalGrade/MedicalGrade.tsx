import PrescriptionProcessImg from "../../../public/images/home/prescription-process-img.png";

const checkItems = [
  "Umfassender medizinischer Fragebogen zur Beurteilung Ihres Gesundheitszustands und Ihrer Eignung",
  "Überprüfung Ihrer Krankengeschichte, aktuellen Gesundheit und Medikamente durch einen zugelassenen Arzt",
  "Individuelle medizinische Entscheidung basierend auf klinischer Beurteilung und Sicherheitsprotokollen",
  "Personalisierter Behandlungsplan mit klarer medizinischer Anleitung und Dosierungsanweisungen",
  "Kontinuierliche medizinische Unterstützung und Nachsorge durch unser Ärzteteam",
];

export default function MedicalGrade() {
  return (
    <section className="bg-[#FFFFFE] py-10 lg:py-20">
      <div className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-50 flex flex-col lg:flex-row items-center gap-12">
        {/* Image */}
        <div className="flex-1">
          <div className="rounded-xl sm:rounded-3xl overflow-hidden w-full 2xl:w-229 2xl:h-163.5">
            <img
              src={PrescriptionProcessImg}
              alt="Abnehmspritze Pen"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-5">
          <span className="inline-block self-start px-3.5 py-2 bg-[#E8ECEB] text-[#29574E] text-sm sm:text-base font-normal rounded-full">
            Rezeptprozess
          </span>
          <h2 className="font-serif text-3xl xl:text-[46px] font-semibold text-[#29574E] leading-tight">
            Medizinische Lösungen,
            <br />
            denen Sie vertrauen können
          </h2>
          <p className="text-[#6B7280] text-base xl:mb-4">
            Unsere Behandlungen werden von führenden medizinischen Experten entwickelt und durch
            klinische Forschung gestützt. Jedes Produkt ist sorgfältig darauf ausgelegt,
            echte Ergebnisse zu liefern.
          </p>
          <ul className="flex flex-col gap-3">
            {checkItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 space-y-4 text-sm text-[#1d2d2a]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="shrink-0 mt-0.5"
                >
                  <circle cx="9" cy="9" r="9" fill="#1d3a35" />
                  <path
                    d="M5.5 9l2.5 2.5 5-5"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[#6B7280] text-sm xl:text-lg -mt-1">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
