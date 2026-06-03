import { useEffect, useRef, useState } from "react";
import ProfileDashboardLayout from "../components/ProfileDashboardLayout";
import {
  ProfileDivider,
  ProfileIdentityHeader,
  ProfileSectionTitle,
} from "../components/ProfileWidgets";
import useUser from "@/hooks/useUser";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

export default function ProfilePersonalInformationPage() {
  const { user, isLoading, refetch } = useUser();
  const axiosSecure = useAxiosSecure();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "" as string | Date,
    email: "",
    streetName: "",
    houseNumber: "",
    additionalAddress: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        birthday: user.dob || "",
        email: user.email || "",
        streetName: user.street || "",
        houseNumber: user.house || "",
        additionalAddress: user.additional_address || "",
        city: user.city || "",
        postalCode: user.postal || "",
        country: user.country || "Bangladesh",
      });
    }
  }, [user]);

  const [isOpen, setIsOpen] = useState(false);

  const countries = [
    { name: "Bangladesh", flag: "BD" },
    { name: "United States", flag: "US" },
    { name: "United Kingdom", flag: "GB" },
    { name: "Germany", flag: "DE" },
  ];

  const handleChange = (field: string, value: string | Date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);

    const formDataUpload = new FormData();
    formDataUpload.append("avatar", file);

    setIsUploading(true);
    try {
      const { data } = await axiosSecure.post(
        "/profile/update",
        formDataUpload,
      );
      if (data.status === 200 || data.status === "success") {
        toast.success("Profile image updated successfully");
        setPreviewImage(null);
        refetch();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setPreviewImage(null);
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const formattedDate =
        formData.birthday instanceof Date
          ? format(formData.birthday, "yyyy-MM-dd")
          : formData.birthday;

      const updateData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: formattedDate,
        street: formData.streetName,
        house: formData.houseNumber,
        additional_address: formData.additionalAddress,
        city: formData.city,
        postal: formData.postalCode,
        country: formData.country,
      };

      const { data } = await axiosSecure.post("/profile/update", updateData);

      if (data.status === 200 || data.status === "success") {
        toast.success(data.message || "Profile updated successfully");
        refetch();
      } else {
        toast.error(data.message || "Something went wrong");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <ProfileDashboardLayout activeSection="personal-information">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </ProfileDashboardLayout>
    );
  }

  return (
    <ProfileDashboardLayout activeSection="personal-information">
      <div className="flex flex-col gap-6">
        <ProfileIdentityHeader
          name={user?.name}
          email={user?.email}
          initials={user?.name?.slice(0, 2).toUpperCase()}
        />
        <ProfileDivider />

        <div className="flex flex-col gap-5">
          <ProfileSectionTitle title="Personal Information" />

          <div className="flex flex-wrap items-center gap-5">
            {previewImage || user?.avatar ? (
              <img
                src={previewImage || user.avatar}
                alt="Avatar"
                className="h-14 w-14 rounded-full border border-[#dce4e8] object-cover"
              />
            ) : (
              <div className="h-14 w-14 rounded-full border border-dashed border-[#9ca3af] bg-[#d1d5db]" />
            )}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="h-12 w-37 rounded-[10px] bg-primary text-[16px] font-medium leading-6 text-white transition-colors hover:bg-[#163730] disabled:opacity-70"
              >
                {isUploading ? "Uploading..." : "Upload new"}
              </button>
              <button
                type="button"
                className="h-12 w-37 rounded-[10px] border border-[#dce4e8] bg-white text-[16px] font-medium leading-6 text-primary transition-colors hover:bg-[#f8faf9]"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-2">
            {/* First Name Input */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-[#acb5bb]">
                  First Name
                </span>
              </div>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="z-1 -mb-2.75 rounded-[10px] border border-[#dce4e8] bg-white px-5 h-14 text-[16px] font-medium leading-6 text-accent-foreground placeholder-[#acb5bb] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Last Name Input */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-[#acb5bb]">
                  Last Name
                </span>
              </div>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="z-1 -mb-2.75 rounded-[10px] border border-[#dce4e8] bg-white px-5 h-14 text-[16px] font-medium leading-6 text-accent-foreground placeholder-[#acb5bb] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Birthday Input */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-[#acb5bb]">
                  Birthday
                </span>
              </div>
              <input
                type="date"
                value={
                  formData.birthday
                    ? format(new Date(formData.birthday), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) => handleChange("birthday", e.target.value)}
                className="z-1 -mb-2.75 rounded-[10px] border border-[#dce4e8] bg-white px-5 h-14 text-[16px] font-medium leading-6 text-accent-foreground placeholder-[#acb5bb] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>

            {/* Email Input */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-[#acb5bb]">
                  E-mail
                </span>
              </div>
              <input
                type="email"
                value={formData.email}
                readOnly
                disabled
                className="z-1 -mb-2.75 rounded-[10px] border border-[#dce4e8] bg-[#f9fafb] px-5 h-14 text-[16px] font-medium leading-6 text-[#9ca3af] cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-6 pb-25">
            <h3 className="text-[20px] font-bold text-black">Address</h3>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-2">
              {/* Street name */}
              <div className="flex min-w-0 flex-1 flex-col pb-2.75">
                <div className="z-2 -mb-2.75 px-3">
                  <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-[#acb5bb]">
                    Street name
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.streetName}
                  onChange={(e) => handleChange("streetName", e.target.value)}
                  placeholder="Street name"
                  className="z-1 -mb-2.75 h-14 rounded-[10px] border border-[#dce4e8] bg-white px-5 text-[16px] font-medium leading-6 text-accent-foreground placeholder-[#acb5bb] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* House number */}
              <div className="flex min-w-0 flex-1 flex-col pb-2.75">
                <div className="z-2 -mb-2.75 px-3">
                  <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-[#acb5bb]">
                    House number
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.houseNumber}
                  onChange={(e) => handleChange("houseNumber", e.target.value)}
                  placeholder="e.g. 101"
                  className="z-1 -mb-2.75 h-14 rounded-[10px] border border-[#dce4e8] bg-white px-5 text-[16px] font-medium leading-6 text-accent-foreground placeholder-[#acb5bb] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Additional address */}
              <div className="flex min-w-0 flex-1 flex-col pb-2.75">
                <div className="z-2 -mb-2.75 px-3">
                  <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-[#acb5bb]">
                    Additional address (optional)
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.additionalAddress}
                  onChange={(e) =>
                    handleChange("additionalAddress", e.target.value)
                  }
                  placeholder="Apartment, suite, etc."
                  className="z-1 -mb-2.75 h-14 rounded-[10px] border border-[#dce4e8] bg-white px-5 text-[16px] font-medium leading-6 text-accent-foreground placeholder-[#acb5bb] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* City */}
              <div className="flex min-w-0 flex-1 flex-col pb-2.75">
                <div className="z-2 -mb-2.75 px-3">
                  <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-[#acb5bb]">
                    City
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="City"
                  className="z-1 -mb-2.75 h-14 rounded-[10px] border border-[#dce4e8] bg-white px-5 text-[16px] font-medium leading-6 text-accent-foreground placeholder-[#acb5bb] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Postal code */}
              <div className="flex min-w-0 flex-1 flex-col pb-2.75">
                <div className="z-2 -mb-2.75 px-3">
                  <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-[#acb5bb]">
                    Postal code
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  placeholder="0000"
                  className="z-1 -mb-2.75 h-14 rounded-[10px] border border-[#dce4e8] bg-white px-5 text-[16px] font-medium leading-6 text-accent-foreground placeholder-[#acb5bb] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Country dropdown */}
              <div
                className={`relative flex min-w-0 flex-1 flex-col pb-2.75 ${isOpen ? "z-60" : "z-10"}`}
              >
                <div className="z-10 -mb-2.75 px-3">
                  <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-[#acb5bb]">
                    Country
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="z-1 -mb-2.75 flex h-14 items-center justify-between rounded-[10px] border border-[#dce4e8] bg-white px-5 text-[16px] font-medium leading-6 text-accent-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-bold text-accent-foreground">
                      {countries.find((c) => c.name === formData.country)
                        ?.flag || "🏳️"}
                    </span>
                    <span className="text-[16px] font-medium text-accent-foreground">
                      {formData.country || "Select Country"}
                    </span>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute top-[calc(100%-8px)] left-0 z-999 w-full overflow-hidden rounded-[10px] border border-[#dce4e8] bg-white shadow-lg">
                    {countries.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => {
                          handleChange("country", c.name);
                          setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-[#f8faf9] transition-colors"
                      >
                        <span className="text-[14px] font-bold text-accent-foreground">
                          {c.flag}
                        </span>
                        <span className="text-[16px] font-medium text-accent-foreground">
                          {c.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleUpdate}
                disabled={isUpdating}
                className="h-12 w-48 rounded-[10px] bg-primary text-[16px] font-medium leading-6 text-white transition-all hover:bg-[#163730] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProfileDashboardLayout>
  );
}
