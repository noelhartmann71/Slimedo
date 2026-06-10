import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import AuthCard from "../components/AuthCard/AuthCard";
import FormInput from "../components/FormInput/FormInput";
import AuthButton from "../components/AuthButton/AuthButton";

const USER_ICON = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LOCK_ICON = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const COUNTRY_CODES = [
  { flag: "🇺🇸", code: "+1", iso: "US" },
  { flag: "🇩🇪", code: "+49", iso: "DE" },
  { flag: "🇬🇧", code: "+44", iso: "GB" },
  { flag: "🇫🇷", code: "+33", iso: "FR" },
];

export default function RegisterDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email?: string })?.email ?? "";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email,
    phone: "",
    countryCode: "+1",
    password: "",
    confirmPassword: "",
  });
  const [ccOpen, setCcOpen] = useState(false);
  const selected =
    COUNTRY_CODES.find((c) => c.code === form.countryCode) ?? COUNTRY_CODES[0];

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/auth/account-ready");
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Konto erstellen"
        subtitle="Geben Sie Ihre persönlichen Daten ein, um ein neues Patientenkonto zu erstellen."
        subtitleColor="#4a90d9"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Row 1: First / Last */}
          <div className="flex flex-col md:flex-row gap-4">
            <FormInput
              label="Vorname"
              icon={USER_ICON}
              placeholder="Geben Sie Ihren Vornamen ein"
              value={form.firstName}
              onChange={set("firstName")}
            />
            <FormInput
              label="Nachname"
              icon={USER_ICON}
              placeholder="Geben Sie Ihren Nachnamen ein"
              value={form.lastName}
              onChange={set("lastName")}
            />
          </div>

          {/* Row 2: Email / Phone */}
          <div className="flex flex-col md:flex-row gap-4">
            <FormInput
              label="E-Mail"
              placeholder="dennymalik@gmail.com"
              type="email"
              value={form.email}
              onChange={set("email")}
            />

            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[14px] font-medium text-gray-700">
                Telefonnummer
              </label>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    type="button"
                    className="h-12 px-3 border border-gray-200 rounded-lg bg-gray-50 flex items-center gap-2 hover:bg-gray-100 transition-colors"
                    onClick={() => setCcOpen((o) => !o)}
                  >
                    <span className="text-[18px]">{selected.flag}</span>
                    <span className="text-[14px] text-gray-700">
                      {selected.code}
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {ccOpen && (
                    <div className="absolute top-[calc(100%+4px)] left-0 w-45 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-1">
                      {COUNTRY_CODES.map((c) => (
                        <button
                          key={c.iso}
                          type="button"
                          className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          onClick={() => {
                            setForm((f) => ({ ...f, countryCode: c.code }));
                            setCcOpen(false);
                          }}
                        >
                          <span className="text-[18px]">{c.flag}</span>
                          <span className="text-[14px] text-gray-700 min-w-8.75">
                            {c.code}
                          </span>
                          <span className="text-[12px] text-gray-400 ml-auto uppercase">
                            {c.iso}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  className="h-12 flex-1 px-4 border border-gray-200 rounded-lg text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-deep/10 focus:border-deep transition-all"
                  type="tel"
                  placeholder="Geben Sie Ihre Telefonnummer ein"
                  value={form.phone}
                  onChange={set("phone")}
                />
              </div>
            </div>
          </div>

          {/* Row 3: Password / Confirm */}
          <div className="flex flex-col md:flex-row gap-4">
            <FormInput
              label="Passwort"
              icon={LOCK_ICON}
              placeholder="Passwort eingeben"
              isPassword
              value={form.password}
              onChange={set("password")}
            />
            <FormInput
              label="Passwort bestätigen"
              icon={LOCK_ICON}
              placeholder="Passwort bestätigen"
              isPassword
              value={form.confirmPassword}
              onChange={set("confirmPassword")}
            />
          </div>

          <AuthButton type="submit">Anmelden</AuthButton>

          <p className="text-center text-[13px] text-gray-500 mt-2">
            Haben Sie bereits ein Konto?{" "}
            <Link
              to="/auth/login"
              className="text-deep font-semibold hover:underline"
            >
              Anmelden
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
