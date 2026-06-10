import { useState } from "react";
import ProfileDashboardLayout from "../components/ProfileDashboardLayout";
import {
  ProfileIdentityHeader,
  ProfileSectionTitle,
} from "../components/ProfileWidgets";

export default function ProfileAddressPage() {
  const [formData, setFormData] = useState({
    streetName: "Rajshahi",
    houseNumber: "101",
    additionalAddress: "Apartment 4B",
    city: "Natore",
    postalCode: "0000",
    country: "Bangladesh",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const countries = [
    { label: "Bangladesh", value: "Bangladesh" },
    { label: "United States", value: "United States" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "Canada", value: "Canada" },
    { label: "Australia", value: "Australia" },
    { label: "Germany", value: "Germany" },
    { label: "France", value: "France" },
  ];

  return (
    <ProfileDashboardLayout activeSection="address">
      <div className="flex flex-col gap-6">
        <ProfileIdentityHeader />

        <div className="flex flex-col gap-5">
          <ProfileSectionTitle title="Address" />
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-2">
            {/* Street Name Input */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                  Street name
                </span>
              </div>
              <input
                type="text"
                value={formData.streetName}
                onChange={(e) => handleChange("streetName", e.target.value)}
                className="z-1 -mb-2.75 rounded-[10px] border border-neutral-200 bg-white px-5 h-14 text-[16px] font-medium leading-6 text-accent-foreground placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* House Number Input */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                  House number
                </span>
              </div>
              <input
                type="text"
                value={formData.houseNumber}
                onChange={(e) => handleChange("houseNumber", e.target.value)}
                className="z-1 -mb-2.75 rounded-[10px] border border-neutral-200 bg-white px-5 h-14 text-[16px] font-medium leading-6 text-accent-foreground placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Additional Address Input */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                  Additional address (optional)
                </span>
              </div>
              <input
                type="text"
                value={formData.additionalAddress}
                onChange={(e) =>
                  handleChange("additionalAddress", e.target.value)
                }
                className="z-1 -mb-2.75 rounded-[10px] border border-neutral-200 bg-white px-5 h-14 text-[16px] font-medium leading-6 text-accent-foreground placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* City Input */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                  City
                </span>
              </div>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="z-1 -mb-2.75 rounded-[10px] border border-neutral-200 bg-white px-5 h-14 text-[16px] font-medium leading-6 text-accent-foreground placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Postal Code Input */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                  Postal code
                </span>
              </div>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                className="z-1 -mb-2.75 rounded-[10px] border border-neutral-200 bg-white px-5 h-14 text-[16px] font-medium leading-6 text-accent-foreground placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Country Select */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                  Country
                </span>
              </div>
              <select
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="z-1 -mb-2.75 rounded-[10px] border border-neutral-200 bg-white px-5 h-14 text-[16px] font-medium leading-6 text-accent-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%231a1c1e' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 20px center",
                  paddingRight: "40px",
                }}
              >
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </ProfileDashboardLayout>
  );
}
