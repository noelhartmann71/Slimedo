import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { PROFILE_NAVIGATION_ITEMS } from "../constants";
import { ProfileNavIcon } from "./ProfileIcons";
import type { ProfileSectionKey } from "../types";
import Navbar from "../../../components/Navbar/Navbar";
import useUser from "@/hooks/useUser";

type ProfileDashboardLayoutProps = {
  activeSection: ProfileSectionKey;
  children: ReactNode;
  showActions?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
};

function joinClassNames(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export default function ProfileDashboardLayout({
  activeSection,
  children,
}: ProfileDashboardLayoutProps) {
  const { user } = useUser();
  // console.log("User data in ProfileDashboardLayout:", user);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F7F8F6] px-4 py-10 md:px-0 md:py-14 lg:py-14">
        <div className="mx-auto flex w-full max-w-364.25 flex-col gap-6.5 font-['Inter',sans-serif]">
          <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-0.5">
              <h1 className="text-[24px] font-bold text-black">
                Hello {user?.first_name} {user?.last_name || "User"}
              </h1>
              <p className="text-[14px] font-normal leading-5 text-[#6C7278]">
                Welcome back. Here you can see the current status of your
                prescriptions and medical requests.
              </p>
            </div>
          </header>

          <section className="overflow-hidden rounded-xl bg-white p-6 lg:min-h-108.5">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
              <aside className="lg:h-96.5 lg:w-59.75 lg:shrink-0 lg:border-r lg:border-[#dce4e8] lg:pr-6">
                <nav className="flex gap-2.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                  {PROFILE_NAVIGATION_ITEMS.map((item) => {
                    const isActive = item.key === activeSection;
                    return (
                      <NavLink
                        key={item.key}
                        to={item.path}
                        className={joinClassNames(
                          "flex h-11 min-w-max items-center gap-3 px-5 py-3 text-[14px] font-medium leading-5 transition-colors lg:w-53.75",
                          isActive
                            ? "bg-[#e8eceb] text-primary lg:border-r-[3px] lg:border-primary"
                            : "text-muted-foreground hover:bg-[#f5f7f6]",
                        )}
                      >
                        <ProfileNavIcon section={item.key} active={isActive} />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </nav>
              </aside>
              <main className="min-w-0 flex-1">{children}</main>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
