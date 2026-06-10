import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import {
  MedizinischerFragebogenIcon,
  NavbarIcon,
  WarnIcon,
} from "../../../components/svg-container/SvgContainer";
import MastercardImg from "../../../../public/images/logo/payment.png";
import ApplePayImg from "../../../../public/images/payment-method/ApplePay.png";
import PaymentsImg from "../../../../public/images/payment-method/Payments.png";
import PaypalImg from "../../../../public/images/payment-method/PayPal.png";
import StripeImg from "../../../../public/images/payment-method/Stripe.png";
import VisaImg from "../../../../public/images/payment-method/Visa.png";
import useUser from "@/hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";

import DashboardLogo from "../../../../public/images/logo/dashboard-logo.png";
import toast from "react-hot-toast";
import useSystemSetting from "@/hooks/useSystemSetting";

export default function CreateAccountPage() {
  const { user } = useUser();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDetails, setShowDetails] = useState(true); // ← toggle state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: localStorage.getItem("email") || "",
    birthday: "",
    phone: "",
    password: "",
    password_confirmation: "",
    gender: "Male",
  });

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const { settings } = useSystemSetting();

  const medicationPrice = Number(localStorage.getItem("medication_price") || 0);
  const prescriptionFee = Number(settings?.prescription_fee || 0);
  const totalPrice = medicationPrice + prescriptionFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Mutations for OTP
  const resendOtpMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await axiosPublic.post("/resend_otp", { email });
      return response.data;
    },
    onSuccess: (_, email) => {
      localStorage.setItem("email", email);
      setIsVerificationSent(true);
      setIsOtpVerified(false);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      const response = await axiosPublic.post("/verify_otp", payload);
      return response.data;
    },
    onSuccess: () => {
      setIsOtpVerified(true);
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "OTP verification failed",
      );
    },
  });

  // This is the resgistration mutation
  const registerMutation = useMutation({
    mutationFn: async (payload: unknown) => {
      const response = await axiosPublic.post("/register", payload);
      return response.data;
    },
    onSuccess: async (data) => {
      localStorage.setItem("user", JSON.stringify(data?.data?.user));
      if (data?.data?.token) {
        localStorage.setItem("token", data?.data?.token);
      }

      // Second API call to /patient/create with questionnaire data
      try {
        const questionnairePayload = {
          product_id: localStorage.getItem("product_id"),
          dosage: localStorage.getItem("dosage"),
          bmi: localStorage.getItem("bmi"),
          comorbidities: localStorage.getItem("comorbidities"),
          allergies: localStorage.getItem("allergies"),
          final_confirmation: localStorage.getItem("final_confirmation"),
          exclusion_criteria: localStorage.getItem("exclusion_criteria"),
          exclusion_criteria_note: localStorage.getItem(
            "exclusion_criteria_note",
          ),
          incompitable_medication: localStorage.getItem(
            "incompitable_medication",
          ),
          side_effect: localStorage.getItem("side_effect"),
          treatment_is_agree: localStorage.getItem("treatment_is_agree"),
        };
        await axiosSecure.post("/patient/create", questionnairePayload);
        navigate("/auth/review");
      } catch {
        toast.error("Patient creation failed");
      }
    },
    onError: () => {
      toast.error("Registration failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      phone: formData.phone,
    };
    registerMutation.mutate(payload);
  };

  return (
    <div className="bg-[#f7f8f6] min-h-screen flex font-inter pb-5 xl:pb-0">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 px-3 sm:px-6 py-5 flex items-center justify-between z-50">
        <button
          onClick={() => navigate(-1)}
          className="text-deep text-xs sm:text-base font-medium cursor-pointer"
        >
          <div className="flex items-center gap-0 sm:gap-3">
            <MedizinischerFragebogenIcon />
            Medizinischer Fragebogen
          </div>
        </button>
        <div className="flex flex-row items-center gap-3">
          <img src={DashboardLogo} alt="Dashboard Logo" />
          <NavbarIcon />
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-gray-900 text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row items-start justify-center pt-22.5 md:pt-20 lg:pt-25 px-4 sm:px-8 gap-7 lg:gap-14">
        {user === null && (
          <>
            {/* Left side - Register form */}
            <div className="w-full max-w-xl">
              <div className="bg-white rounded-card-sm p-6 lg:p-8 shadow-sm">
                <div className="mb-8">
                  <h1 className="text-2xl font-medium text-black mb-4">
                    Registrieren
                  </h1>
                  <p className="text-[16px] text-neutral-500">
                    Haben Sie bereits ein Slimedo-Konto?{" "}
                    <button className="font-semibold text-primary hover:underline cursor-pointer">
                      Einloggen
                    </button>
                  </p>
                </div>

                {!isVerificationSent ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      resendOtpMutation.mutate(formData.email);
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <label className="text-[14px] text-muted-foreground block mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                        className="w-full px-5 py-3 lg:py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={resendOtpMutation.isPending}
                      className="w-full bg-sage text-white rounded-lg py-3 lg:py-4 text-[16px] font-medium transition cursor-pointer mt-4"
                    >
                      {resendOtpMutation.isPending
                        ? "Senden..."
                        : "Verifizierungscode senden"}
                    </button>
                  </form>
                ) : !isOtpVerified ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      verifyOtpMutation.mutate({
                        email: formData.email,
                        otp,
                      });
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <label className="text-[14px] text-muted-foreground block mb-4 text-center">
                        Verification Code
                      </label>
                      <div className="flex justify-center gap-2 sm:gap-4">
                        {[...Array(6)].map((_, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={otp[index] || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (/^[0-9]?$/.test(val)) {
                                const newOtp = otp.split("");
                                newOtp[index] = val;
                                const finalOtp = newOtp.join("");
                                setOtp(finalOtp);

                                // Auto focus next input
                                if (val && index < 5) {
                                  const nextInput = e.target
                                    .nextElementSibling as HTMLInputElement;
                                  if (nextInput) nextInput.focus();
                                }
                              }
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Backspace" &&
                                !otp[index] &&
                                index > 0
                              ) {
                                const prevInput = (e.target as HTMLInputElement)
                                  .previousElementSibling as HTMLInputElement;
                                if (prevInput) prevInput.focus();
                              }
                            }}
                            onPaste={(e) => {
                              e.preventDefault();
                              const pastedData = e.clipboardData
                                .getData("text")
                                .slice(0, 6);
                              if (/^\d+$/.test(pastedData)) {
                                setOtp(pastedData);
                                // Focus the last filled input or the 6th input
                                const inputs = (
                                  e.target as HTMLInputElement
                                ).parentElement?.querySelectorAll("input");
                                if (inputs) {
                                  const lastIndex = Math.min(
                                    pastedData.length,
                                    5,
                                  );
                                  (
                                    inputs[lastIndex] as HTMLInputElement
                                  ).focus();
                                }
                              }
                            }}
                            className="w-10 h-12 sm:w-12 sm:h-14 border border-neutral-200 rounded-lg text-center text-xl font-semibold text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-all shadow-sm"
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={verifyOtpMutation.isPending}
                      className="w-full bg-sage text-white rounded-lg py-3 lg:py-4 text-[16px] font-medium transition cursor-pointer mt-4"
                    >
                      {verifyOtpMutation.isPending
                        ? "Verifizieren..."
                        : "OTP verifizieren"}
                    </button>
                    <button
                      type="button"
                      onClick={() => resendOtpMutation.mutate(formData.email)}
                      className="text-muted-foreground text-[14px] hover:underline"
                    >
                      Code erneut senden
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* First name & Last name */}
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <label className="text-[14px] text-muted-foreground block mb-2">
                          Vorname
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Abdur"
                          className="w-full px-5 py-3 lg:py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-[14px] text-muted-foreground block mb-2">
                          Nachname
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Rahim"
                          className="w-full px-5 py-3 lg:py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[14px] text-muted-foreground block mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                        placeholder="demo1mail@gmail.com"
                        className="w-full px-5 py-3 lg:py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    {/*  Phone */}
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <label className="text-[14px] text-muted-foreground block mb-2">
                          Telefonnummer
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+49 1622 343333"
                          className="w-full px-5 py-3 lg:py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
                        />
                      </div>
                    </div>

                    {/* Password & Confirm Password */}
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <label className="text-[14px] text-muted-foreground block mb-2">
                          Passwort
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className="w-full px-5 py-3 lg:py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gray-900 transition-colors"
                          >
                            {showPassword ? (
                              <Eye size={20} />
                            ) : (
                              <EyeOff size={20} />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="text-[14px] text-muted-foreground block mb-2">
                          Passwort bestätigen
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className="w-full px-5 py-3 lg:py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gray-900 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <Eye size={20} />
                            ) : (
                              <EyeOff size={20} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={registerMutation.isPending}
                      className="w-full bg-sage text-white rounded-lg py-3 lg:py-4 text-[16px] font-medium transition cursor-pointer mt-4"
                    >
                      {registerMutation.isPending
                        ? "Konto wird erstellt..."
                        : "Konto erstellen"}
                    </button>
                    <p className="text-[14px] text-neutral-500 mt-2">
                      Das Passwort muss mindestens 8 Zeichen, 1 Zahl und 1 Sonderzeichen enthalten.
                      
                    </p>
                    <p className="text-[14px] text-neutral-500">
                      Ich stimme den <span className="font-semibold text-primary">Allgemeinen Geschäftsbedingungen</span>, den <span className="font-semibold text-primary">Informationen, der Datenschutzerklärung</span> und den <span className="font-semibold text-primary">Stornierungsbedingungen</span> zu.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </>
        )}

        {/* Right side - Order overview */}
        <div
          className={`w-full max-w-xl ${
            user === null && !isVerificationSent
              ? "opacity-50 pointer-events-none"
              : ""
          }`}
        >
          <div className="bg-white rounded-card-sm p-4 lg:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium text-[#000000]">
                Bestellübersicht
              </h2>
              {/* ── Toggle button ── */}
              <button
                onClick={() => setShowDetails((prev) => !prev)}
                className="text-base text-sage font-semibold hover:underline cursor-pointer"
              >
                {showDetails ? "Details ausblenden" : "Details anzeigen"}
              </button>
            </div>

            {/* ── Collapsible section ── */}
            {showDetails && (
              <>
                {/* Product */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <p className="text-[14px] text-neutral-500 mb-2">
                      {sessionStorage.getItem("product_name") || "Produktname"}
                    </p>
                    <span className="text-[16px] font-medium text-sage">
                      €{localStorage.getItem("medication_price") || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[14px] text-neutral-500 mb-2">
                      Versandkosten
                    </p>
                    <span className="text-base text-sage font-semibold">
                      Ausstehend
                    </span>
                  </div>
                </div>

                {/* Info box */}
                <div className="bg-neutral-200 rounded-lg p-4 mb-6 flex gap-3">
                  <WarnIcon />
                  <p className="text-[14px] text-muted-foreground">
                    Die Apotheke wird Sie innerhalb weniger Stunden mit
                    Zahlungs- und Versandinformationen kontaktieren.
                  </p>
                </div>

                {/* Recipe cost */}
                <div className="mb-6 pb-6 border-b border-neutral-200 flex justify-between items-center">
                  <p className="text-[14px] text-muted-foreground">
                    Rezeptgebühr
                  </p>
                  <span className="text-[16px] font-medium text-sage">
                    €{settings?.prescription_fee || "0.00"}
                  </span>
                </div>
              </>
            )}

            {/* Total — always visible */}
            <div className="mb-6 pb-6">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-sage mb-2">
                  Insgesamt
                </p>
                <p className="text-[20px] font-semibold text-sage mb-4">
                  €{totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="space-y-2 text-[14px] text-muted-foreground">
                <div className="flex justify-between">
                  <span>Jetzt fällig</span>
                  <span className="text-sage font-medium">
                    €{settings?.prescription_fee || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Zahlung in der Apotheke</span>
                  <span className="text-sage font-medium">
                    €{localStorage.getItem("medication_price") || "0.00"}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="bg-[#F3F4F6] p-4 rounded-lg">
              <p className="text-base text-neutral-500 mb-3 border-b border-neutral-200 pb-3">
                Zahlungsmethoden
              </p>
              <div className="flex items-center gap-1.5">
                <img
                  src={MastercardImg}
                  alt="Mastercard"
                  className="w-8.5 h-6"
                />
                <img src={ApplePayImg} alt="Apple Pay" className="w-8.5 h-6" />
                <img src={PaymentsImg} alt="Payments" className="w-8.5 h-6" />
                <img src={PaypalImg} alt="PayPal" className="w-8.5 h-6" />
                <img src={StripeImg} alt="Stripe" className="w-8.5 h-6" />
                <img src={VisaImg} alt="Visa" className="w-8.5 h-6" />
              </div>
            </div>

            {user && (
              <button
                onClick={() => navigate("/auth/review")}
                className="w-full bg-sage text-white rounded-lg py-3 lg:py-4 text-[16px] font-medium transition cursor-pointer mt-6"
              >
                Jetzt kaufen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
