// Gemeinsame Kopfzeile für Fragebogen-Seiten (Zurück-Button, Schritt-Label,
// Logo, Schließen). Extrahiert aus den bestehenden Fragebogen-Seiten, die
// diese Leiste bisher jeweils kopieren; sie bleiben unangetastet.

import { SlimedoIconSvg } from "@/components/svg-container/SvgContainer";
import DashboardLogo from "../../../public/images/logo/dashboard-logo.png";

interface QuestionnaireHeaderProps {
  /** Label neben der Schrittanzeige, z. B. „Folgerezept". */
  stepLabel: string;
  onBack: () => void;
  onClose: () => void;
}

export default function QuestionnaireHeader({
  stepLabel,
  onBack,
  onClose,
}: QuestionnaireHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-3.5 md:px-5 py-8 flex items-center justify-between relative">
      {/* Links: Zurück + Schritt-Label */}
      <div className="hidden sm:flex items-center gap-1.5 lg:gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-sage font-medium text-xs lg:text-base">
            Zurück
          </span>
        </button>
        <span className="text-[14px] lg:text-[16px] font-medium text-sage ml-1">
          {stepLabel}
        </span>
      </div>

      {/* Mitte: Logo */}
      <span className="absolute flex flex-row items-center left-1/2 sm:left-2/3 lg:left-1/2 -translate-x-1/2 gap-2 text-[15px] font-semibold text-gray-800">
        <img src={DashboardLogo} alt="Logo" className="w-8 h-8 inline-block" />
        <SlimedoIconSvg />
      </span>

      {/* Rechts: Schließen */}
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-700 cursor-pointer hidden sm:block"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </header>
  );
}
