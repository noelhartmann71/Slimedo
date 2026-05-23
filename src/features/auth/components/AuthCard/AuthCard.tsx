interface AuthCardProps {
  title: string;
  subtitle?: string;
  subtitleColor?: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, subtitle, subtitleColor, children }: AuthCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-7 w-full shadow-sm">
      <div className="mb-5">
        <h1 className="text-[22px] font-semibold text-gray-900 mb-1">{title}</h1>
        {subtitle && (
          <p className="text-[13px] leading-snug" style={subtitleColor ? { color: subtitleColor } : { color: '#6b7280' }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
