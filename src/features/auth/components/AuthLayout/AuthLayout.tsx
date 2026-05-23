interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-[#f0f0ec]">
      {/* Sidebar */}
      <aside className="w-120 min-w-120 bg-[#1d3a35] flex flex-col px-7 py-6 relative">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#e07b39" fillOpacity="0.2" />
            <text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="18"
              fill="#e07b39"
            >
              ⚕
            </text>
          </svg>
          <span className="text-white font-semibold text-[17px]">Slimedo</span>
        </div>

        {/* Heading */}
        <div className="flex-1">
          <h2 className="text-white font-bold text-[22px] leading-tight mb-3">
            Medically reviewed Online Prescriptions
          </h2>
          <p className="text-white/70 text-[13px] leading-relaxed">
            Slimedo helps patients and doctors connect seamlessly. Book visits,
            track records, and improve your health journey.
          </p>
        </div>

        {/* Doctor card */}
        <div className="flex items-end gap-3 mb-6">
          <div className="w-22.5 h-27.5 rounded-xl overflow-hidden shrink-0 bg-white/10">
            <img
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=240&fit=crop&crop=face"
              alt="Doctor"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white text-gray-800 text-[12px] font-medium px-3 py-2 rounded-xl shadow-sm mb-4">
            Good to see you!
          </div>
        </div>

        {/* Footer */}
        <p className="text-white/40 text-[11px]">
          © 2026 Slimedo Online Prescriptions. All rights reserved.
        </p>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-85">{children}</div>
        <footer className="mt-auto pt-8 text-[11px] text-gray-400">
          © 2026 Slimedo Online Prescriptions. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
