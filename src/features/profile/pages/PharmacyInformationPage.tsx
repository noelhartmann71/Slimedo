import { useEffect, useId, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";

type PharmacyProfile = {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  street: string;
  house: string;
  city: string;
  postal: string;
  country: string;
  longitude: string;
  latitude: string;
  type?: string;
};

type ProfileFormState = {
  name: string;
  email: string;
  phone: string;
  category: string;
  street: string;
  house: string;
  city: string;
  postal: string;
  country: string;
  longitude: string;
  latitude: string;
  password: string;
  confirmPassword: string;
};

function createEmptyFormState(): ProfileFormState {
  return {
    name: "",
    email: "",
    phone: "",
    category: "",
    street: "",
    house: "",
    city: "",
    postal: "",
    country: "Bangladesh",
    longitude: "",
    latitude: "",
    password: "",
    confirmPassword: "",
  };
}

function createFormState(profile?: PharmacyProfile | null): ProfileFormState {
  return {
    name: profile?.name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    category: profile?.category ?? "",
    street: profile?.street ?? "",
    house: profile?.house ?? "",
    city: profile?.city ?? "",
    postal: profile?.postal ?? "",
    country: profile?.country ?? "Bangladesh",
    longitude: profile?.longitude ?? "",
    latitude: profile?.latitude ?? "",
    password: "",
    confirmPassword: "",
  };
}

type ProfileFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  inputMode?:
    | "text"
    | "none"
    | "search"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal";
};

function ProfileField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
}: ProfileFieldProps) {
  const inputId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const isPasswordField = type === "password";
  const resolvedType = isPasswordField
    ? isVisible
      ? "text"
      : "password"
    : type;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-medium text-[#4B5563]">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={resolvedType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={`h-12 w-full rounded-xl border border-[#DDE3E7] bg-[#FCFCFD] px-4 text-sm font-medium text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#1B433B] focus:ring-2 focus:ring-[#1B433B]/10 ${
            isPasswordField ? "pr-12" : ""
          }`}
        />
        {isPasswordField ? (
          <button
            type="button"
            onClick={() => setIsVisible((current) => !current)}
            className="absolute inset-y-0 right-3 flex items-center text-[#6B7280] transition-colors hover:text-[#1B433B]"
            aria-label={isVisible ? `Hide ${label}` : `Show ${label}`}
          >
            {isVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <span className="text-sm text-white/70">{label}</span>
      <span className="text-right text-sm font-medium text-white">
        {value || "-"}
      </span>
    </div>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90">
      {children}
    </span>
  );
}

export default function PharmacyInformationPage() {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState<ProfileFormState>(
    createEmptyFormState(),
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: pharmacyProfile,
    isLoading,
    isError,
    refetch,
  } = useQuery<PharmacyProfile | null>({
    queryKey: ["pharmacyProfileData"],
    queryFn: async () => {
      const response = await axiosSecure.get("/pharmacy/profile");
      return (response?.data?.data ??
        response?.data ??
        null) as PharmacyProfile | null;
    },
  });

  useEffect(() => {
    if (pharmacyProfile) {
      setFormData(createFormState(pharmacyProfile));
    }
  }, [pharmacyProfile]);

  const handleFieldChange = (field: keyof ProfileFormState, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUpdating(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        category: formData.category.trim(),
        street: formData.street.trim(),
        house: formData.house.trim(),
        city: formData.city.trim(),
        postal: formData.postal.trim(),
        country: formData.country.trim(),
        longitude: formData.longitude.trim(),
        latitude: formData.latitude.trim(),
      };

      const password = formData.password.trim();
      const passwordConfirmation = formData.confirmPassword.trim();

      if (password || passwordConfirmation) {
        if (!password || !passwordConfirmation) {
          toast.error("Please fill both password fields");
          return;
        }

        if (password !== passwordConfirmation) {
          toast.error("Passwords do not match");
          return;
        }

        Object.assign(payload, {
          password,
          password_confirmation: passwordConfirmation,
        });
      }

      const { data } = await axiosSecure.post(
        "/pharmacy/profile/update",
        payload,
      );

      if (data?.status === "error" || data?.success === false) {
        toast.error(data?.message || "Failed to update pharmacy profile");
        return;
      }

      toast.success(data?.message || "Pharmacy profile updated successfully");
      setFormData((current) => ({
        ...current,
        password: "",
        confirmPassword: "",
      }));
      refetch();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update pharmacy profile",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-3xl border border-[#E5E7EB] bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#1B433B] border-t-transparent" />
      </div>
    );
  }

  if (isError || !pharmacyProfile) {
    return (
      <div className="rounded-3xl border border-[#F1D7D7] bg-[#FFF8F8] p-6 text-[#B42318] shadow-sm">
        Failed to load pharmacy profile information.
      </div>
    );
  }

  const address = [
    pharmacyProfile.street,
    pharmacyProfile.house,
    pharmacyProfile.city,
    pharmacyProfile.postal,
    pharmacyProfile.country,
  ]
    .filter(Boolean)
    .join(", ");

  const coordinates = `${pharmacyProfile.latitude}, ${pharmacyProfile.longitude}`;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-linear-to-r from-[#12493c] via-[#155446] to-[#1b6b5a] text-white shadow-[0_20px_50px_-24px_rgba(27,67,59,0.7)]">
        <div className="flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">
              Pharmacy Profile
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              {pharmacyProfile.name}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>{pharmacyProfile.type ?? "Pharmacy"}</Badge>
              <Badge>{pharmacyProfile.category}</Badge>
              <Badge>{`ID #${pharmacyProfile.id}`}</Badge>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm">
            <p className="text-sm font-medium text-white/85">
              {pharmacyProfile.email}
            </p>
            <p className="mt-1 text-sm text-white/70">
              {pharmacyProfile.phone}
            </p>
            <p className="mt-1 text-xs text-white/60">{coordinates}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm md:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6B7280]">
                Edit profile
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#111827]">
                Update pharmacy information
              </h2>
              <p className="mt-1 text-sm text-[#6B7280]">
                Keep the contact and location details up to date.
              </p>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1B433B] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#14352e] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUpdating ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : null}
              {isUpdating ? "Saving..." : "Save changes"}
            </button>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <ProfileField
              label="Name"
              value={formData.name}
              onChange={(value) => handleFieldChange("name", value)}
              placeholder="Pharmacy name"
              autoComplete="organization"
            />
            <ProfileField
              label="Email"
              value={formData.email}
              onChange={(value) => handleFieldChange("email", value)}
              placeholder="pharmacy@example.com"
              type="email"
              autoComplete="email"
            />
            <ProfileField
              label="Phone"
              value={formData.phone}
              onChange={(value) => handleFieldChange("phone", value)}
              placeholder="01700000091"
              type="tel"
              autoComplete="tel"
            />
            <ProfileField
              label="Category"
              value={formData.category}
              onChange={(value) => handleFieldChange("category", value)}
              placeholder="Retail"
              autoComplete="off"
            />
            <ProfileField
              label="Street"
              value={formData.street}
              onChange={(value) => handleFieldChange("street", value)}
              placeholder="Street address"
              autoComplete="street-address"
            />
            <ProfileField
              label="House"
              value={formData.house}
              onChange={(value) => handleFieldChange("house", value)}
              placeholder="House 47"
              autoComplete="address-line2"
            />
            <ProfileField
              label="City"
              value={formData.city}
              onChange={(value) => handleFieldChange("city", value)}
              placeholder="Dhaka"
              autoComplete="address-level2"
            />
            <ProfileField
              label="Postal"
              value={formData.postal}
              onChange={(value) => handleFieldChange("postal", value)}
              placeholder="1203"
              autoComplete="postal-code"
            />
            <ProfileField
              label="Country"
              value={formData.country}
              onChange={(value) => handleFieldChange("country", value)}
              placeholder="Bangladesh"
              autoComplete="country"
            />
            <ProfileField
              label="Latitude"
              value={formData.latitude}
              onChange={(value) => handleFieldChange("latitude", value)}
              placeholder="23.509495"
              inputMode="decimal"
            />
            <ProfileField
              label="Longitude"
              value={formData.longitude}
              onChange={(value) => handleFieldChange("longitude", value)}
              placeholder="90.77312"
              inputMode="decimal"
            />
            <div className="md:col-span-2">
              <ProfileField
                label="Password"
                value={formData.password}
                onChange={(value) => handleFieldChange("password", value)}
                placeholder="Leave blank to keep current password"
                type="password"
                autoComplete="new-password"
              />
            </div>
            <div className="md:col-span-2">
              <ProfileField
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={(value) =>
                  handleFieldChange("confirmPassword", value)
                }
                placeholder="Leave blank to keep current password"
                type="password"
                autoComplete="new-password"
              />
            </div>
          </div>
        </form>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-[#E5E7EB] bg-[#0F5132] p-6 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
              Current profile
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              {pharmacyProfile.name}
            </h3>
            <p className="mt-1 text-sm text-white/70">
              {pharmacyProfile.email}
            </p>

            <div className="mt-6 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-sm">
              <InfoRow label="Phone" value={pharmacyProfile.phone} />
              <InfoRow label="Category" value={pharmacyProfile.category} />
              <InfoRow label="Type" value={pharmacyProfile.type ?? "N/A"} />
              <InfoRow label="Address" value={address} />
              <InfoRow label="Coordinates" value={coordinates} />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
