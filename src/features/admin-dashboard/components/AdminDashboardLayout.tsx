import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-['Inter',sans-serif] text-[#1D2739]">
      {/* Sidebar - fixed width */}
      <AdminSidebar />

      {/* Main content - flexible width */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden overflow-y-auto">
        <AdminTopbar />
        <main className="flex-1 p-10 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
