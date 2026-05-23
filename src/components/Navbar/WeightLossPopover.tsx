import { Link } from "react-router";
import MounjaroImg from "../../../public/images/home/mounjaro-Img.png";
import WegovyImg from "../../../public/images/home/wegovy-img.png";

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z"
      fill="#00B67A"
    />
  </svg>
);

const TrustpilotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="2" fill="#00B67A" />
    <path
      d="M12 2l2.545 5.16L20 8.09l-4 3.9.944 5.51L12 14.77l-4.944 2.73L9 12l-4-3.91 5.455-.93L12 2z"
      fill="white"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// This is the
const MounjaroIllustration = () => (
  <div className="relative w-full h-62.5 overflow-hidden rounded-b-2xl">
    <img
      src={MounjaroImg}
      alt="Mounjaro"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
    />
  </div>
);
const WegovyIllustration = () => (
  <div className="relative w-full h-62.5 overflow-hidden rounded-b-2xl">
    <img
      src={WegovyImg}
      alt="Wegovy"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
    />
  </div>
);

export default function WeightLossPopover() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-screen overflow-hidden bg-white shadow-md p-5 sm:p-10">
        {/* LEFT PANEL */}
        <div className="flex min-w-50 flex-col justify-between bg-white">
          <div>
            <h2 className="mb-2.5 text-3xl sm:text-[40px] font-bold leading-tight tracking-tight text-black font-inter">
              Abnehm-
              <br />
              Programme
            </h2>
            <p className="mb-5 text-base leading-relaxed text-[#6B7280] max-w-90">
              Egal, was Du brauchst – wir finden das ideale Programm für Dich.
            </p>
            <button className="cursor-pointer whitespace-nowrap rounded-xl bg-[#166534] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 font-inter">
              Alle Programme sehen
            </button>
          </div>

          {/* Trustpilot */}
          <div className="mt-6">
            <div className="mb-1 flex items-center gap-1.5">
              <TrustpilotIcon />
              <span className="text-lg font-semibold text-black font-inter">
                Trustpilot
              </span>
              <div className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} />
                ))}
              </div>
            </div>
            <p className="text-sm text-[#4A5565] font-inter">
              Bewertet mit 4,7/5
            </p>
          </div>
        </div>

        {/* MOUNJARO CARD */}
        <div className="relative m-2.5 ml-2.5 mr-1.5 flex sm:min-w-100 flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl shadow-sm transition-shadow duration-200 hover:shadow-lg bg-transparent">
          {/* Top overlay (heading + arrow) */}
          <div className="absolute left-0 right-0 top-0 z-20 flex flex-row items-start justify-between gap-4 rounded-t-2xl bg-[rgba(255_255_255_0.24)] backdrop-blur-[31px] p-5">
            <div>
              <h3 className="mb-1 text-xl lg:text-2xl font-bold tracking-tight text-gray-900">
                Mounjaro
              </h3>
              <p className="text-[12px] text-gray-400">
                Verliere bis zu 22,5% Deines Körpergewichts
              </p>
            </div>
            <Link to={"/product/select"} className="group">
              <div className="ml-4 flex items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d5a3d] transition-colors duration-200 group-hover:bg-[#041610c0]">
                  <ArrowIcon />
                </div>
              </div>
            </Link>
          </div>

          {/* Image area (push down so overlay sits above) */}
          <div className="pt-20 bg-[linear-gradient(180deg,rgba(255_255_255_0.0)_0%,rgba(255_255_255_0.0)_100%)]">
            <MounjaroIllustration />
          </div>
        </div>

        {/* WEGOVY CARD */}
        <div className="relative m-2.5 ml-2.5 mr-1.5 flex sm:min-w-100 flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl shadow-sm transition-shadow duration-200 hover:shadow-lg bg-transparent">
          {/* Top overlay (heading + arrow) */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-4 rounded-t-2xl bg-[rgba(255_255_255_0.24)] backdrop-blur-[31px] p-5">
            <div>
              <h3 className="mb-1 text-xl lg:text-2xl font-bold tracking-tight text-gray-900">
                Wegovy
              </h3>
              <p className="text-[12px] text-gray-400">
                Verliere bis zu 22,5% Deines Körpergewichts
              </p>
            </div>
            <Link to={"/product/select"} className="group">
              <div className="ml-4 flex items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d5a3d] transition-colors duration-200 group-hover:bg-[#041610c0]">
                  <ArrowIcon />
                </div>
              </div>
            </Link>
          </div>

          {/* Image area (push down so overlay sits above) */}
          <div className="pt-20 bg-[linear-gradient(180deg,rgba(255_255_255_0.0)_0%,rgba(255_255_255_0.0)_100%)]">
            <WegovyIllustration />
          </div>
        </div>
      </div>
    </div>
  );
}
