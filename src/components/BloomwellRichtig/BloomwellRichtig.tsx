import { Link } from "react-router";
import CtaBanner from "../../../public/images/logo/cta-banner.png";

const bloomwellFeatures = [
  "Ausschließlich Deutsche ÄrztInnen",
  "100% anonym und diskret",
  "Keine versteckten Kosten & Aktions-Rezept",
  "E-Rezept von D-Trust (deutsche Bundesdruckerei)",
  "+30 Partnerapotheken & 200 Lieferanten",
  "+65 erfahrene Cannabis-Ärzte",
  "Telefonhotline und E-Mail Support",
];

const othersFeatures = [
  "Ausländische ÄrztInnen aus dem Ausland, nicht erreichbar",
  "Versteckte Gebühren Kein datensicheres",
  "E- Rezept Unzureichender",
  "Kundensupport Wenig Erfahrung",
];

const CheckIcon = () => (
  <span className="shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
    <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
      <path
        d="M1 4L4 7L10 1"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const CrossIcon = () => (
  <span className="shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M2 2L8 8M8 2L2 8"
        stroke="#ef4444"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

const SadFaceIcon = () => (
  <div className="w-10 h-10 mb-4">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke="#22c55e" strokeWidth="2" />
      <circle cx="14" cy="16" r="2" fill="#22c55e" />
      <circle cx="26" cy="16" r="2" fill="#22c55e" />
      <path
        d="M13 27c1.5-3 12.5-3 14 0"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const BloomwellRichtig = () => {
  return (
    <section className="bg-[#f4f4f0] py-16 px-4 font-inter">
      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <span className="inline-block bg-green-200 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
          Lasst die Fakten sprechen
        </span>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Warum du bei Slimedo richtig bist
        </h2>

        {/* Subtitle */}
        <p className="text-[15px] text-gray-500 max-w-4xl mx-auto leading-relaxed mb-10">
          Viele Menschen suchen Online nach einem Anbieter zum Erhalt der
          Abnehmspritze – wichtig ist dabei einen seriösen Anbieter zu finden,
          der eine 100 Prozent sichere und gesetzeskonforme Betreeung anbieten.
          Wir zeichnen uns dadurch aus, das hinter jeder Behandlung dein
          Arzt/Ärztin des Vertrauens steht und dich unsere Rezepte sicher &
          diskret erreichen.
        </p>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Bloomwell Card — Dark */}
          <div className="bg-[#F9F7F2] border border-gray-200 rounded-2xl p-8 text-left text-black">
            <img
              className="w-10 h-10 object-cover"
              src={CtaBanner}
              alt="Slimedo Logo"
            />
            <h3 className="text-xl font-extrabold mb-4">Slimedo</h3>
            <hr className="border-gray-700 mb-5" />

            <ul className="space-y-3 mb-7">
              {bloomwellFeatures.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-[black]"
                >
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Patient count */}
            <div className="inline-flex items-center gap-3 bg-[#1e1e1e] rounded-xl px-4 py-2.5">
              <div className="flex">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#111] bg-[#FFF]"
                    style={{ marginLeft: i !== 0 ? "-8px" : "0" }}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-white underline underline-offset-2">
                500.000+ zufriedene Patient*innen
              </span>
            </div>
          </div>

          {/* Andere Card — Light */}
          <div className="bg-white rounded-2xl p-8 text-left border border-gray-100">
            <SadFaceIcon />
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">
              Andere
            </h3>
            <hr className="border-gray-100 mb-5" />

            <ul className="space-y-3">
              {othersFeatures.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-black"
                >
                  <CrossIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <p className="text-[15px] font-semibold text-gray-900 leading-relaxed mb-5">
          Überzeug dich selbst und starte jetzt deinen sicheren und einfachen
          <br />
          Weg zum Rezept.
        </p>
        <Link to={"/product/select"}>
          <button className="bg-[#166534] hover:bg-[#142926] transition-colors text-white font-bold text-[15px] px-8 py-3.5 rounded-full cursor-pointer">
            Jetzt starten
          </button>
        </Link>
      </div>
    </section>
  );
};

export default BloomwellRichtig;
