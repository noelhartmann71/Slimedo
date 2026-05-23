import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import WeightLossPopover from "./WeightLossPopover";
import WissenswertesPopover from "./WissenswertesPopover";
import useUser from "@/hooks/useUser";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import useSystemSetting from "@/hooks/useSystemSetting";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [mobileActivePopover, setMobileActivePopover] = useState<string | null>(
    null,
  );

  const navLinks = [
    { label: "Gewichtsabnahmeprogramme", dropdown: "weight_loss", to: "#" },
    {
      label: "So funktioniert es",
      to: "/#how-it-works",
      onClick: (e: React.MouseEvent) => {
        if (window.location.pathname === "/") {
          e.preventDefault();
          document
            .getElementById("how-it-works")
            ?.scrollIntoView({ behavior: "smooth" });
        }
        setSidebarOpen(false);
      },
    },
    { label: "Blog", to: "/blog" },
    {
      label: "Häufig gestellte Fragen",
      to: "/#faq",
      onClick: (e: React.MouseEvent) => {
        if (window.location.pathname === "/") {
          e.preventDefault();
          document
            .getElementById("faq")
            ?.scrollIntoView({ behavior: "smooth" });
        }
        setSidebarOpen(false);
      },
    },
    {
      label: "Wissenswertes",
      dropdown: "wissenswertes",
      to: "#",
    },
    {
      label: "Warum wir",
      dropdown: "warum_wir",
      to: "#",
    },
  ];

  const { user, isLoading: isUserLoading } = useUser();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  console.log("User in Navbar:", user);
  const navigate = useNavigate();
  const { settings, isLoading: isSettingsLoading } = useSystemSetting();
  console.log("System settings in Navbar:", settings);

  const clearSessionStorage = () => {
    const keysToRemove = [
      "token",
      "user",
      "email",
      "allergies",
      "bmi",
      "coupon_id",
      "deliveryAddress",
      "dosage",
      "final_confirmation",
      "exclusion_criteria",
      "exclusion_criteria_note",
      "incompitable_medication",
      "medication_price",
      "order_id",
      "product_id",
      "selectedDeliveryMethod",
      "side_effect",
      "treatment_is_agree",
      "comorbidities",
      "questionnaire-step",
      "questionnaireData",
      "questionnaire-agreement",
      "final-confirmation",
      "incompatible-medication-note",
      "reset_token",
      "user_email",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  };

  // This is the login mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.post("/logout");
    },
    onSuccess: async () => {
      clearSessionStorage();
      await queryClient.clear();
      toast.success("Erfolgreich abgemeldet");
      navigate("/", { replace: true });
    },
    onError: async (error: AxiosError) => {
      console.error("Logout failed:", error);
      clearSessionStorage();
      await queryClient.clear();
      navigate("/auth/login", { replace: true });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#E9E6DA]">
        <nav className="relative mx-5 lg:mx-10 xl:mx-15 2xl:mx-30 h-16 lg:h-27.5 flex items-center justify-between gap-8">
          <div className="w-10 lg:hidden shrink-0" aria-hidden="true" />
          <Link
            to="/"
            className="font-serif text-[26px] font-bold text-[#166534] tracking-tight shrink-0 absolute left-1/2 -translate-x-1/2 lg:static lg:left-auto lg:translate-x-0 min-w-30 flex items-center justify-center lg:justify-start"
          >
            {isSettingsLoading ? (
              <Skeleton className="h-8 w-32 bg-[#1a3330]/10" />
            ) : (
              settings?.system_name || "Slimedo"
            )}
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-0 flex-1 justify-center list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.dropdown ? (
                  <Popover
                    open={activePopover === link.dropdown}
                    onOpenChange={(open) =>
                      setActivePopover(open ? (link.dropdown as string) : null)
                    }
                  >
                    <PopoverTrigger asChild>
                      <button className="flex items-center gap-1.5 px-2.5 xl:px-5 py-2 text-[15px] font-normal text-[#1a3330]/70 hover:text-[#1a3330] transition-colors outline-none cursor-pointer">
                        {link.label}
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 16 16"
                          fill="none"
                          className={`mt-0.5 transition-transform duration-200 ${
                            activePopover === link.dropdown ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M4 6l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      sideOffset={20}
                      className="w-auto p-0 border-none bg-transparent shadow-none"
                      align="center"
                    >
                      {link.dropdown === "weight_loss" && <WeightLossPopover />}
                      {(link.dropdown === "wissenswertes" ||
                        link.dropdown === "warum_wir") && (
                        <WissenswertesPopover />
                      )}
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Link
                    to={link.to}
                    onClick={link.onClick}
                    className="flex items-center gap-1.5 px-2.5 xl:px-5 py-2 text-[15px] font-normal text-[#1a3330]/70 hover:text-[#1a3330] transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA buttons */}
          {isUserLoading ? (
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <Skeleton className="w-11 h-11 rounded-full bg-[#1a3330]/10" />
              <Skeleton className="w-32 h-10 rounded-full bg-[#1a3330]/10" />
            </div>
          ) : user ? (
            <div className="hidden lg:flex items-center gap-0 shrink-0">
              <div className="hidden lg:flex items-center gap-4 shrink-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 px-4 py-2 text-[15px] font-medium text-[#1a3330] rounded-full transition-all outline-none cursor-pointer">
                      <div className="w-11 h-11 rounded-full bg-[#166534]! flex items-center justify-center text-white">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    sideOffset={10}
                    align="end"
                    className="w-64 p-2 bg-white! rounded-2xl border border-[#E2E8F0]! shadow-xl"
                  >
                    <div className="px-3 py-3 mb-1">
                      <p className="text-sm font-semibold text-[#1a3330]">
                        {user.name}
                      </p>
                      <p className="text-xs text-[#64748B] truncate">
                        {user.email}
                      </p>
                      <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F1F5F9] text-[#1a3330] uppercase tracking-wider">
                        {user.role}
                      </div>
                    </div>
                    <Separator className="my-1 bg-[#F1F5F9]!" />
                    <div className="flex flex-col gap-0.5">
                      <Link
                        to={
                          user.role === "admin"
                            ? "/admin-dashboard/overview"
                            : "/dashboard"
                        }
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#1a3330] hover:bg-[#F8FAFC] rounded-lg transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#64748B]" />
                        Dashboard
                      </Link>
                      <Separator className="my-1 bg-[#F1F5F9]!" />
                      <button
                        onClick={handleLogout}
                        disabled={logoutMutation.isPending}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left cursor-pointer disabled:opacity-50"
                      >
                        <LogOut className="w-4 h-4" />
                        {logoutMutation.isPending
                          ? "Wird abgemeldet..."
                          : "Abmelden"}
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Link
                to="/product/select"
                className="px-6 py-2.5 text-[14.5px] font-semibold text-white bg-[#166534] rounded-full hover:bg-[#142926] transition-colors"
              >
                Eignung prüfen
              </Link>
            </div>
          ) : (
            <>
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                <Link
                  to="/auth/login"
                  className="px-6 py-2.5 text-[14.5px] font-semibold text-white bg-[#166534] rounded-full hover:bg-[#142926] transition-colors"
                >
                  Einloggen
                </Link>
                <Link
                  to="/product/select"
                  className="px-6 py-2.5 text-[14.5px] font-semibold text-white bg-[#166534] rounded-full hover:bg-[#142926] transition-colors"
                >
                  Eignung prüfen
                </Link>
              </div>
            </>
          )}

          {/* Hamburger button — visible only below lg */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 shrink-0"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-6 h-0.5 bg-[#1a3330] rounded-full transition-all" />
            <span className="w-6 h-0.5 bg-[#1a3330] rounded-full transition-all" />
            <span className="w-6 h-0.5 bg-[#1a3330] rounded-full transition-all" />
          </button>
        </nav>
      </header>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#E9E6DA] shadow-2xl flex flex-col px-7 py-8 gap-8 transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="font-serif text-[22px] font-bold text-[#1a3330] tracking-tight"
          >
            {isSettingsLoading ? (
              <Skeleton className="h-8 w-24 bg-[#1a3330]/10" />
            ) : (
              settings?.system_name || "Slimedo"
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#1a3330]/10 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 2l14 14M16 2L2 16"
                stroke="#1a3330"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col gap-1 list-none m-0 p-0 flex-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.dropdown ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSidebarOpen(false);
                    setMobileActivePopover(link.dropdown as string);
                  }}
                  className="w-full text-left flex items-center justify-between px-3 py-3 text-[15px] font-medium text-[#1a3330]/75 hover:text-[#1a3330] hover:bg-[#1a3330]/5 rounded-xl transition-colors"
                >
                  {link.label}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="opacity-40"
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <Link
                  to={link.to}
                  onClick={(e) => {
                    link.onClick?.(e);
                    setSidebarOpen(false);
                  }}
                  className="flex items-center justify-between px-3 py-3 text-[15px] font-medium text-[#1a3330]/75 hover:text-[#1a3330] hover:bg-[#1a3330]/5 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3">
          {user ? (
            <div className="flex flex-col gap-2 p-1 bg-[#1a3330]/5 rounded-2xl">
              <div className="px-4 py-3 flex flex-col gap-0.5 border-b border-[#1a3330]/10">
                <span className="text-sm font-bold text-[#1a3330]">
                  {user.name}
                </span>
                <span className="text-xs text-[#1a3330]/60 truncate">
                  {user.email}
                </span>
              </div>
              <Link
                to={
                  user.role === "admin"
                    ? "/admin-dashboard/overview"
                    : "/dashboard"
                }
                onClick={() => setSidebarOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-3 text-[14.5px] font-semibold text-[#1a3330] hover:bg-[#1a3330]/5 rounded-xl transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 opacity-75" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="w-full flex items-center gap-2 px-4 py-3 text-[14.5px] font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                {logoutMutation.isPending ? "Wird abgemeldet..." : "Abmelden"}
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                onClick={() => setSidebarOpen(false)}
                className="w-full text-center px-6 py-3 text-[14.5px] font-semibold text-[#1a3330] border-2 border-[#1a3330] rounded-full hover:bg-[#1a3330]/5 transition-colors"
              >
                Einloggen
              </Link>
              <Link
                to="/product/select"
                onClick={() => setSidebarOpen(false)}
                className="w-full text-center px-6 py-3 text-[14.5px] font-semibold text-white bg-[#1a3330] rounded-full hover:bg-[#142926] transition-colors"
              >
                Eignung prüfen
              </Link>
            </>
          )}
        </div>
      </aside>

      {/* Mobile full-screen popover for Weight loss programs */}
      {mobileActivePopover === "weight_loss" && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-start justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileActivePopover(null)}
          />

          <div className="relative w-full max-w-3xl h-full overflow-auto bg-transparent">
            <div className="flex justify-end p-4">
              <button
                aria-label="Close programs"
                onClick={() => setMobileActivePopover(null)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M2 2l14 14M16 2L2 16"
                    stroke="#1a3330"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mx-4 mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
              <WeightLossPopover />
            </div>
          </div>
        </div>
      )}

      {/* Mobile full-screen popover for Wissenswertes / Warum wir */}
      {(mobileActivePopover === "wissenswertes" ||
        mobileActivePopover === "warum_wir") && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-start justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileActivePopover(null)}
          />

          <div className="relative w-full max-w-3xl h-full overflow-auto bg-transparent">
            <div className="flex justify-end p-4">
              <button
                aria-label="Close menu"
                onClick={() => setMobileActivePopover(null)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M2 2l14 14M16 2L2 16"
                    stroke="#1a3330"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mx-4 mb-8 bg-[#0a0a0a] rounded-lg shadow-lg overflow-hidden">
              <WissenswertesPopover />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
