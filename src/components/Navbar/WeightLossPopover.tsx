import { Link } from "react-router";
import MounjaroImg from "../../../public/images/home/mounjaro-Img.png";
import WegovyImg from "../../../public/images/home/wegovy-img.png";

interface Props {
  onClose?: () => void;
}

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z"
      fill="#00B67A"
    />
  </svg>
);

const TrustpilotIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="2" fill="#00B67A" />
    <path
      d="M12 2l2.545 5.16L20 8.09l-4 3.9.944 5.51L12 14.77l-4.944 2.73L9 12l-4-3.91 5.455-.93L12 2z"
      fill="white"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function WeightLossPopover({ onClose }: Props) {
  return (
    /*
     * Three flex siblings: [left-panel] [mounjaro-card] [wegovy-card]
     * Cards use flex-1 min-w-0 so they always share the available space equally
     * and can never overflow the container.
     */
    <div className="flex flex-col sm:flex-row w-full bg-white p-5 sm:p-8 lg:p-10 gap-4 lg:gap-6">

      {/* LEFT PANEL */}
      <div className="shrink-0 flex flex-row sm:flex-col justify-between sm:justify-start gap-4 sm:gap-0 w-full sm:w-48 lg:w-64">
        <div>
          <h2 className="mb-2 text-2xl lg:text-[38px] font-bold leading-tight tracking-tight text-black font-inter">
            Abnehm-
            <br className="hidden sm:block" />
            Programme
          </h2>
          <p className="mb-4 text-sm lg:text-base leading-relaxed text-[#6B7280] hidden sm:block">
            Egal, was Du brauchst – wir finden das ideale Programm für Dich.
          </p>
          <button
            onClick={onClose}
            className="cursor-pointer whitespace-nowrap rounded-xl bg-[#166534] px-3 py-2 text-[12px] lg:text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Alle Programme sehen
          </button>
        </div>

        {/* Trustpilot — only on sm+ */}
        <div className="hidden sm:block sm:mt-6 lg:mt-auto">
          <div className="mb-1 flex items-center gap-1.5 flex-wrap">
            <TrustpilotIcon />
            <span className="text-sm lg:text-base font-semibold text-black">Trustpilot</span>
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>
          <p className="text-xs text-[#4A5565]">Bewertet mit 4,7/5</p>
        </div>
      </div>

      {/* MOUNJARO CARD — flex-1 min-w-0 ensures it never overflows */}
      <div className="relative flex-1 min-w-0 flex flex-col overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        {/* header overlay */}
        <div className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-3 rounded-t-2xl bg-[rgba(255_255_255_0.24)] backdrop-blur-[31px] p-3 lg:p-5">
          <div className="min-w-0">
            <h3 className="mb-0.5 text-base lg:text-2xl font-bold tracking-tight text-gray-900">
              Mounjaro
            </h3>
            <p className="text-[10px] lg:text-[12px] text-gray-400 leading-snug">
              Verliere bis zu 22,5% Deines Körpergewichts
            </p>
          </div>
          <Link to="/product/select" onClick={onClose} className="group shrink-0">
            <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#2d5a3d] hover:bg-[#041610c0] transition-colors duration-200">
              <ArrowIcon />
            </div>
          </Link>
        </div>

        {/* image — fills remaining space, fixed height keeps cards aligned */}
        <div className="pt-14 lg:pt-20 flex-1">
          <div className="relative w-full h-44 sm:h-52 lg:h-64 2xl:h-72 overflow-hidden rounded-b-2xl">
            <img
              src={MounjaroImg}
              alt="Mounjaro"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* WEGOVY CARD — flex-1 min-w-0 ensures it never overflows */}
      <div className="relative flex-1 min-w-0 flex flex-col overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        {/* header overlay */}
        <div className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-3 rounded-t-2xl bg-[rgba(255_255_255_0.24)] backdrop-blur-[31px] p-3 lg:p-5">
          <div className="min-w-0">
            <h3 className="mb-0.5 text-base lg:text-2xl font-bold tracking-tight text-gray-900">
              Wegovy
            </h3>
            <p className="text-[10px] lg:text-[12px] text-gray-400 leading-snug">
              Verliere bis zu 22,5% Deines Körpergewichts
            </p>
          </div>
          <Link to="/product/select" onClick={onClose} className="group shrink-0">
            <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#2d5a3d] hover:bg-[#041610c0] transition-colors duration-200">
              <ArrowIcon />
            </div>
          </Link>
        </div>

        {/* image */}
        <div className="pt-14 lg:pt-20 flex-1">
          <div className="relative w-full h-44 sm:h-52 lg:h-64 2xl:h-72 overflow-hidden rounded-b-2xl">
            <img
              src={WegovyImg}
              alt="Wegovy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
