import {
  NavLink,
  Outlet,
  ScrollRestoration,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

type PharmacyNavItem = {
  key: "overview" | "order-list" | "information" | "logout" | "sold-per-month";
  label: string;
  path?: string;
};

const PHARMACY_NAV_ITEMS: PharmacyNavItem[] = [
  { key: "overview", label: "Overview", path: "/pharmacy-dashboard/overview" },

  {
    key: "information",
    label: "Information",
    path: "/pharmacy-dashboard/information",
  },
  {
    key: "sold-per-month",
    label: "Sold Per Month",
    path: "/pharmacy-dashboard/sold-per-month",
  },
  {
    key: "logout",
    label: "Logout",
  },
];

function joinClassNames(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function SideIcon({
  kind,
  active,
}: {
  kind: PharmacyNavItem["key"];
  active: boolean;
}) {
  const stroke = active ? "#1B433B" : "#6B7280";

  if (kind === "overview") {
    return (
      <svg
        className="h-4.5 w-4.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }

  if (kind === "order-list") {
    return (
      <svg
        className="h-4.5 w-4.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 7h10" />
        <path d="M9 12h10" />
        <path d="M9 17h10" />
        <circle cx="5" cy="7" r="1" />
        <circle cx="5" cy="12" r="1" />
        <circle cx="5" cy="17" r="1" />
      </svg>
    );
  }

  if (kind === "sold-per-month") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <g clip-path="url(#clip0_6271_3735)">
          <path
            d="M15.012 1.5C14.177 1.5 13.5 3.51472 13.5 6H15.012C15.7407 6 16.105 6 16.3306 5.74841C16.5562 5.49682 16.5169 5.1655 16.4384 4.50286C16.2311 2.75357 15.6707 1.5 15.012 1.5Z"
            stroke="#6B7280"
            strokeWidth="1.125"
          />
          <path
            d="M13.5 6.0407V13.9843C13.5 15.1181 13.5 15.685 13.1535 15.9081C12.5873 16.2728 11.7121 15.5081 11.2718 15.2305C10.9081 15.0011 10.7263 14.8864 10.5244 14.8798C10.3063 14.8726 10.1212 14.9826 9.72817 15.2305L8.295 16.1343C7.90838 16.378 7.7151 16.5 7.5 16.5C7.28491 16.5 7.09159 16.378 6.705 16.1343L5.27185 15.2305C4.90811 15.0011 4.72624 14.8864 4.5244 14.8798C4.30629 14.8726 4.1212 14.9826 3.72815 15.2305C3.28796 15.5081 2.41265 16.2728 1.84646 15.9081C1.5 15.685 1.5 15.1181 1.5 13.9843V6.0407C1.5 3.90019 1.5 2.82994 2.15901 2.16497C2.81802 1.5 3.87868 1.5 6 1.5H15"
            stroke="#6B7280"
            stroke-width="1.125"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.5 4.5H10.5"
            stroke="#6B7280"
            strokeWidth="1.125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 7.5H4.5"
            stroke="#6B7280"
            strokeWidth="1.125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.375 8.15625C8.7537 8.15625 8.25 8.59695 8.25 9.14062C8.25 9.6843 8.7537 10.125 9.375 10.125C9.9963 10.125 10.5 10.5657 10.5 11.1094C10.5 11.6531 9.9963 12.0938 9.375 12.0938M9.375 8.15625C9.86483 8.15625 10.2815 8.43015 10.436 8.8125M9.375 8.15625V7.5M9.375 12.0938C8.88517 12.0938 8.46847 11.8199 8.31405 11.4375M9.375 12.0938V12.75"
            stroke="#6B7280"
            strokeWidth="1.125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_6271_3735">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  if (kind === "logout") {
    return (
      <svg
        className="h-4.5 w-4.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    );
  }

  return (
    <svg
      className="h-4.5 w-4.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <circle cx="12" cy="7" r="0.8" fill={stroke} stroke="none" />
    </svg>
  );
}

export default function UserDashboardLayout() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  // This is the handle logout function
  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await axiosSecure.post("/pharmacy/logout");
      clearSessionStorage();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      clearSessionStorage();
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  //
  const { data: pharmacyProfile } = useQuery({
    queryKey: ["pharmacyProfileData"],
    queryFn: async () => {
      const response = await axiosSecure.get("/pharmacy/profile");
      return response?.data?.data;
    },
  });

  console.log("Pharmacy profile data in UserDashboardLayout:", pharmacyProfile);

  return (
    <div className="min-h-screen bg-[#F7F8F6]">
      <ScrollRestoration />
      {/* <Navbar /> */}

      <main className="px-4 py-10 md:px-0 md:py-14 lg:py-14">
        <div className="mx-auto flex w-full max-w-364.25 flex-col gap-6.5 font-['Inter',sans-serif]">
          <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-0.5">
              <h1 className="text-[24px] font-bold text-black">
                Hello {pharmacyProfile?.name || "User"}
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
                  {PHARMACY_NAV_ITEMS.map((item) => {
                    if (item.key === "logout") {
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="flex h-11 min-w-max items-center gap-3 px-5 py-3 text-[14px] font-medium leading-5 transition-colors lg:w-53.75 text-muted-foreground hover:bg-[#f5f7f6] hover:text-red-500 cursor-pointer"
                        >
                          {isLoggingOut ? (
                            <span
                              className="h-4.5 w-4.5 rounded-full border-2 border-current border-t-transparent animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <SideIcon kind={item.key} active={false} />
                          )}
                          <span>
                            {isLoggingOut ? "Logging out..." : item.label}
                          </span>
                        </button>
                      );
                    }

                    return (
                      <NavLink
                        key={item.key}
                        to={item.path ?? "/pharmacy-dashboard/overview"}
                        className={({ isActive }) =>
                          joinClassNames(
                            "flex h-11 min-w-max items-center gap-3 px-5 py-3 text-[14px] font-medium leading-5 transition-colors lg:w-53.75",
                            isActive
                              ? "bg-[#e8eceb] text-primary lg:border-r-[3px] lg:border-primary"
                              : "text-muted-foreground hover:bg-[#f5f7f6]",
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <SideIcon kind={item.key} active={isActive} />
                            <span>{item.label}</span>
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </nav>
              </aside>

              <div className="min-w-0 flex-1">
                <Outlet />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
