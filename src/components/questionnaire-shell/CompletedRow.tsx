// Eingeklappte Zeile für einen abgeschlossenen Fragebogen-Schritt.
// Extrahiert aus MedicalQuestionnairePage/ProductSelectionPage (dort bisher kopiert);
// die bestehenden Seiten bleiben unangetastet und können später umgestellt werden.

const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function CompletedRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-4">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-sage flex items-center justify-center shrink-0">
          <CheckIcon size={14} />
        </span>
        <span className="text-[16px] font-medium text-black">{label}</span>
      </div>
      <span className="text-[16px] text-neutral-400">{value}</span>
    </div>
  );
}
