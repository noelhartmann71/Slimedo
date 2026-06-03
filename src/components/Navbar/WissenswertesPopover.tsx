import { Link } from "react-router";

interface Props {
  onClose?: () => void;
}

export default function WissenswertesPopover({ onClose }: Props) {
  return (
    <div className="flex flex-col lg:flex-row w-full overflow-hidden rounded-none border-none shadow-md p-6 sm:p-8 lg:p-10 gap-8 lg:gap-12 bg-[#F9F7F2]">
      {/* LEFT PANEL */}
      <div className="flex flex-col w-full lg:w-1/2">
        <h2 className="mb-5 text-[18px] lg:text-[22px] font-bold tracking-tight text-[#62e49c] font-inter">
          Alles über Cannabis
        </h2>
        <ul className="flex flex-col gap-3 lg:gap-5">
          {[
            "Symptome & Therapie",
            "Kosten und Kostendeckung",
            "Der Cannabis-Blog",
            "Arzneimittelsicherheit",
            "Terpene",
            "Stämme",
            "Empfehle einen Freund weiter und sichere dir deine Prämie!",
            "Häufig gestellte Fragen",
          ].map((item, idx) => (
            <li key={idx}>
              <Link
                to="#"
                onClick={onClose}
                className="group flex items-center gap-2 text-[#227C31] hover:text-gray-500 transition-colors font-bold text-[14px] lg:text-[16px]"
              >
                <span className="text-lg">&rarr;</span>
                <span>{item}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col justify-between w-full lg:w-1/2">
        <h2 className="mb-5 text-[18px] lg:text-[22px] font-bold tracking-tight text-[#62e49c] font-inter">
          Unsere Blogartikel
        </h2>

        <div className="flex flex-col gap-5 lg:gap-8 mb-6 lg:mb-8 flex-1">
          {/* Article 1 */}
          <Link
            to="/blog"
            onClick={onClose}
            className="flex items-center gap-4 lg:gap-5 group cursor-pointer"
          >
            <div className="w-24 h-18 lg:w-32 lg:h-24 shrink-0 rounded-[12px] lg:rounded-[14px] overflow-hidden bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9"
                alt="Blog 1"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[#62e49c] text-[13px] lg:text-[15px] font-medium mb-1">
                Forschung
              </span>
              <h3 className="text-[#227C31] font-bold leading-[1.3] text-[14px] lg:text-[16px] group-hover:text-gray-500 transition-colors">
                Erste Forschungsergebnisse aus Deutschland zu Patienten mit
                chronischer Depression
              </h3>
            </div>
          </Link>

          {/* Article 2 */}
          <Link
            to="/blog"
            onClick={onClose}
            className="flex items-center gap-4 lg:gap-5 group cursor-pointer"
          >
            <div className="w-24 h-18 lg:w-32 lg:h-24 shrink-0 rounded-[12px] lg:rounded-[14px] overflow-hidden bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9"
                alt="Blog 2"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[#62e49c] text-[13px] lg:text-[15px] font-medium mb-1">
                Effekt
              </span>
              <h3 className="text-[#227C31] font-bold leading-[1.3] text-[14px] lg:text-[16px] group-hover:text-gray-500 transition-colors">
                Welche Beiträge Cannabis zu gesundheitlicher Schlafverbesserung
                leisten kann
              </h3>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to="/blog"
            onClick={onClose}
            className="group inline-flex items-center gap-2 text-[#62e49c] font-bold hover:text-[#4cc982] transition-colors text-[14px] lg:text-[16px]"
          >
            <span>Alle Blogbeiträge ansehen</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:scale-110"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16l4-4-4-4M8 12h8" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
