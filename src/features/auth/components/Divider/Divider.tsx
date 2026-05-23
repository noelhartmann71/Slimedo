export default function Divider({ label = 'Or' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <span className="flex-1 h-px bg-gray-200" />
      <span className="text-[12px] text-gray-400">{label}</span>
      <span className="flex-1 h-px bg-gray-200" />
    </div>
  );
}
