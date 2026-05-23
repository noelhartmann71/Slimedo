import {
  DataSafetyIconSvg,
  JederzeitIconSvg,
  KostenloseIconSvg,
  LaufendeIconSvg,
} from "../svg-container/SvgContainer";

const items = [
  {
    icon: <KostenloseIconSvg />,
    text: "Kostenlose Lieferung in 1-2 Werktagen",
  },
  { icon: <DataSafetyIconSvg />, text: "Ihre Gesundheit und Daten sind sicher" },
  { icon: <JederzeitIconSvg />, text: "Jederzeit kündbar" },
  { icon: <LaufendeIconSvg />, text: "Laufende ärztliche Betreuung" },
  { icon: <KostenloseIconSvg />, text: "100.000 Menschen vertrauen Slimedo" },
];

export default function Ticker() {
  const allItems = [...items, ...items];
  return (
    <div className="overflow-hidden pt-5 sm:pt-10 pb-5 sm:pb-10 xl:pt-18.75 xl:pb-18.75 select-none bg-[#F9F7F2]">
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ticker-track { animation: ticker 28s linear infinite; }
      `}</style>
      <div className="ticker-track flex whitespace-nowrap w-max">
        {allItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-6 font-inter">
            <span className="text-sm">{item.icon}</span>
            <span className="text-base font-normal text-black tracking-wide">
              {item.text}
            </span>
            <span className="text-white/40 ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
