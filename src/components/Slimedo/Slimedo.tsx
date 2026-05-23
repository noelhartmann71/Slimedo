import React from "react";

import img1 from "../../../public/images/slimedo/slimedo-img.png";
import img2 from "../../../public/images/slimedo/slimedo-img-two.png";
import img3 from "../../../public/images/slimedo/slimedo-img-three.png";
import SlimedoTicker from "../SlimedoTicker/SlimedoTicker";

const Slimedo: React.FC = () => {
  return (
    <section className="w-full bg-[#FFF] pt-20 overflow-hidden">
      {/* ── Three-column photo grid ─────────────────────────────────────── */}
      <div className="mx-auto px-5 lg:px-10 xl:px-15 2xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* Card 1 – product box */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={img1}
              alt="Slimedo Produktbox"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Card 2 – lifestyle shot (taller, visually dominant) */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={img2}
              alt="Person auf Yogamatte bei Sonnenuntergang"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Card 3 – app screenshot */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={img3}
              alt="Slimedo App zeigt –12,4 kg in 10 Wochen"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      <SlimedoTicker />
    </section>
  );
};

export default Slimedo;
