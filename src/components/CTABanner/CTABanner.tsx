import { Link } from "react-router";
import CtaBanner from "../../../public/images/logo/cta-banner.png";
import CTAImg from "../../../public/images/home/CTA.png";

export default function CTABanner() {
  return (
    <div className="bg-[#FFFFFE] py-10 xl:py-20">
      <section className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-15 rounded-lg sm:rounded-3xl sm:px-10 items-center justify-center flex flex-col text-center relative overflow-hidden min-h-96 sm:min-h-132.5 bg-[#13302A]">
        {/* Background images: mobile (visible below md) and desktop (visible md and up) */}
        <figure className="absolute inset-0" aria-hidden>
          <img
            src={CTAImg}
            alt=""
            className="object-contain object-bottom h-full"
          />
        </figure>
        <div className="relative z-10 flex flex-col items-center gap-5">
          {/* Logo icon */}
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img
              src={CtaBanner}
              alt="Slimedo Logo"
              className="w-21.5 h-14 object-contain -mb-1"
            />
          </div>

          <h2 className="text-3xl md:text-[46px] font-bold text-[#F9FAFB] leading-tight font-serif">
            Bereit, Ihre Reise zu beginnen?
          </h2>
          <p className="text-[#FFF] text-sm sm:text-base md:text-lg leading-relaxed font-inter font-normal px-2.5 sm:px-0">
            Schließen Sie Ihre medizinische Beurteilung ab und erhalten Sie ein von zugelassenen Ärzten <br />{" "}
            geprüftes Rezept
          </p>

          {/* CTA button with arrow */}
          <Link
            to={"/product/select"}
            className="flex items-center gap-2 bg-white text-[#227C31] font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-colors mt-2"
          >
            Eignung prüfen
            <span className="w-7 h-7 bg-[#227C31] rounded-full flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
