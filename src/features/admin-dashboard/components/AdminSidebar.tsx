import { NavLink } from "react-router-dom";
import DashboardLogo from "../../../../public/images/logo/admin-dashboard-logo.png";
import {
  LayoutDashboard,
  Inbox,
  Layers,
  FileText,
  Users,
  UserRound,
  Settings,
} from "lucide-react";

const NAVIGATION_ITEMS = [
  {
    label: "Overview",
    path: "/admin-dashboard/overview",
    icon: LayoutDashboard,
  },
  {
    label: "Incoming Requests",
    path: "/admin-dashboard/requests",
    icon: Inbox,
  },
  { label: "Batch Processing", path: "/admin-dashboard/batch", icon: Layers },
  { label: "Invoices", path: "/admin-dashboard/invoices", icon: FileText },
  { label: "Patients", path: "/admin-dashboard/patients", icon: Users },
  { label: "Doctors", path: "/admin-dashboard/doctors", icon: UserRound },
  {
    label: "Profile & Settings",
    path: "/admin-dashboard/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col h-screen sticky top-0 font-inter">
      <div className="p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img
            src={DashboardLogo}
            alt="Slimedo"
            className="h-8.5 w-7 object-cover"
          />
          <div>
            <h1 className="text-lg font-inter font-bold text-deep">
              Slimedo
            </h1>
          </div>
        </div>
        <p className="text-center text-neutral-500 text-[10px] font-inter">
          Medical Admin Dashboard
        </p>
        <nav className="space-y-2 mt-10">
          <p className="text-[12px] font-medium text-neutral-500 mb-4">
            Main Menu
          </p>
          {NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-neutral-200 text-sage border-r-4 border-sage rounded-r-none"
                    : "text-neutral-500 hover:bg-neutral-200"
                }
              `}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
