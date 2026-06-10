import { useState } from "react";
import BMIImg from "../../../public/images/BmiCalculater/women-bmi.png";
import CtaBanner from "../../../public/images/logo/cta-banner.png";
import { Link } from "react-router";
export default function WeightCalculator() {
  const [weight, setWeight] = useState(95);
  const minWeight = 60;
  const maxWeight = 160;
  const loss = Math.round((weight - minWeight) * 0.29 + 8);
  const pct = ((weight - minWeight) / (maxWeight - minWeight)) * 100;

  return (
    <section className="bg-[#E9E6DA] flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between min-h-120 px-5 lg:px-10 xl:px-15 2xl:px-50 py-10 lg:py-20">
      {/* Left panel */}
      <div className="flex flex-col justify-center gap-8">
        {/* Heading */}
        <h2 className="font-serif text-left text-3xl xl:text-[46px] font-bold text-sage">
          So viel Gewicht verlieren Patienten, die mit Slimedo behandelt werden,
          im Durchschnitt. Patienten verlieren im Durchschnitt
        </h2>

        {/* Stat badge */}
        <div className="flex items-center gap-3 bg-white border border-white/10 rounded-[9999px] px-4 pb-2 self-start">
          <div className="w-12 md:w-24 h-12 md:h-24 bg-white rounded-full flex items-center justify-center">
            <img
              src={CtaBanner}
              alt="Slimedo Logo"
              className="w-12 md:w-24 h-12 md:h-24 object-contain -mb-2"
            />
          </div>
          <div>
            <span className="text-deep font-serif font-bold text-3xl xl:text-[48px] leading-tight block">
              20.7 %
            </span>
            <p className="text-[#2B4230] text-sm">
              Körpergewicht in 10 Monaten
            </p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-12 px-5 py-5 xl:px-12 xl:py-8 bg-white rounded-3xl w-full max-w-191.25 shadow-2xl min-h-142.75">
        <div className="flex items-end justify-center gap-8 h-40 sm:h-96.75 sm:w-54.75">
          <img
            src={BMIImg}
            alt="Silhouette"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="">
          {/* Silhouettes */}
          <p className="text-center text-xl xl:text-2xl font-semibold text-deep font-inter mb-5 leading-snug">
            Prüfen Sie, wie viel Gewicht Sie abnehmen könnten.
          </p>
          {/* Weight display */}
          <div className="flex flex-col gap-1 items-center justify-between mb-2">
            <span className="text-sm font-inter text-deep">
              Ausgangsgewicht:
            </span>
            <span className="bg-[#F4F1E7] font-inter text-deep text-2xl font-normal px-6 py-2 rounded-full">
              {weight} kg
            </span>
          </div>
          {/* Slider */}
          <div className="mb-5">
            <style>{`
              .wslider{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:4px;outline:none;cursor:pointer;background:linear-gradient(to right,#e07b39 ${pct}%,#e5e7eb ${pct}%)}
              .wslider::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#1E3A2E;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25);cursor:pointer}
              .wslider::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#1E3A2E;border:2px solid white;cursor:pointer}
            `}</style>
            <input
              type="range"
              min={minWeight}
              max={maxWeight}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="wslider"
            />
          </div>
          {/* Result */}
          <div className="flex flex-col items-center justify-between mb-5">
            <span className="text-xs text-deep">
              Ihr Ergebnis könnte sein:
            </span>
            <span className="text-deep font-bold text-[52px]">
              -{loss} kg
            </span>
          </div>

          <Link to={"/product/select"}>
            <button className="w-full font-inter bg-[#166534] text-white text-sm font-medium rounded-full py-3 hover:bg-[#142926] transition-colors mb-3 mt-3 cursor-pointer">
              Prüfen Sie jetzt Ihren BMI.
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
