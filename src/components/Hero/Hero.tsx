import CtaBanner from "../../../public/images/logo/cta-banner.png";
export default function Hero() {
  return (
    <section className="bg-[#F9F7F2] flex flex-col items-center justify-center px-6 pt-12 lg:pt-32 text-center">
      <div className=" flex flex-col items-center gap-4 sm:gap-8">
        <h1 className="font-serif font-semibold text-[#1a3330] leading-[1.05] tracking-tight m-0 text-[40px] sm:text-5xl xl:text-[84px]">
          Medizinisch geprüfte <br /> Online-Rezepte
        </h1>
        <p className="text-sm sm:text-[17px] text-[#1a3330]/60 font-normal max-w-md m-0 leading-relaxed">
          von deutschen Ärzten, Abnehmspritze, online &amp; sicher
        </p>
        <a
          href="/product/select"
          className="inline-flex items-center justify-center px-10 sm:px-10 py-2 h-16 sm:h-full sm:py-4 bg-[#1a3330] text-white text-[14px] sm:text-base font-normal sm:font-semibold rounded-full hover:bg-[#142926] transition-colors mt-2"
        >
          Prüfen lassen &amp; Rezept erhalten
        </a>
        {/* Patient badge */}
        <div className="flex items-center gap-4 xl:mt-6 rounded-2xl px-5 py-4">
          {/* Logo icon */}
          <div className="sm:w-20 w-14 sm:h-20 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img
              src={CtaBanner}
              alt="Slimedo Logo"
              className="w-21.5 h-14 object-contain -mb-1"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="text-sm sm:text-2xl font-bold text-[#29574E] leading-none tracking-tight">
              50.000+
            </span>
            <span className="text-xs sm:text-base text-[#29574E] text-start font-normal leading-tight">
              Diesen Monat behandelte <br /> Patient*innen
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
