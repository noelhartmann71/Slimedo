import { Search, ChevronDown } from "lucide-react";
import DashboardIconLogo from "../../../../public/images/logo/dashboard-navbar-icon.png";

export default function AdminTopbar() {
  return (
    <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-10 sticky top-0 z-10 w-full">
      <div className="flex-1 max-w-md relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search anything here"
          className="w-full h-11 bg-[#F9FAFB] rounded-lg border border-[#F0F2F5] pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/5"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full hover:bg-[#F9FAFB] cursor-pointer transition-colors">
          <img
            src={DashboardIconLogo}
            alt="Alexandro"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-semibold text-neutral-900">
            Alexandro
          </span>
          <ChevronDown size={14} className="text-neutral-500" />
        </div>
      </div>
    </header>
  );
}
