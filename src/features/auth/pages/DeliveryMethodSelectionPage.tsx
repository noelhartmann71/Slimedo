import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Check, X, Loader2 } from "lucide-react";
import PharmacyMap, {
  type Pharmacy as GooglePharmacy,
} from "../components/PharmacyMap";
import {
  HandshakeIconSvg,
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
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/useAxiosPublic";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useSystemSetting from "@/hooks/useSystemSetting";

export default function DeliveryMethodSelectionPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("partner");
  const [shipping, setShipping] = useState(1);
  const [partnerDeliveryMode, setPartnerDeliveryMode] = useState<
    "shipping" | "pickup"
  >("shipping");
  const [pharmacyType, setPharmacyType] = useState("Partner");
  const [showPharmacyModal, setShowPharmacyModal] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [pharmacyName, setPharmacyName] = useState("");
  const [pharmacyEmail, setPharmacyEmail] = useState("");
  const [consentTransfer, setConsentTransfer] = useState(false);
  const [consentEmailVerified, setConsentEmailVerified] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);
  const [mapCenter] = useState({ lat: 23.8103, lng: 90.4125 });
  const [nearbyPharmacies, setNearbyPharmacies] = useState<GooglePharmacy[]>(
    [],
  );
  const [activePharmacyId, setActivePharmacyId] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [isCreatingPharmacy, setIsCreatingPharmacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(
    Number(localStorage.getItem("coupon_amount") || 0),
  );

  const { settings } = useSystemSetting();

  const handlePartnerClick = () => {
    setSelectedMethod("partner");
    const shippingValue = partnerDeliveryMode === "shipping" ? 1 : 0;
    setShipping(shippingValue);
    setPharmacyType("Partner");
  };

  const handlePartnerDeliveryModeChange = (mode: "shipping" | "pickup") => {
    const shippingValue = mode === "shipping" ? 1 : 0;
    setPartnerDeliveryMode(mode);
    setSelectedMethod("partner");
    setPharmacyType("Partner");
    setShipping(shippingValue);
  };

  const handleOtherClick = () => {
    setSelectedMethod("other");
    setShipping(0);
    setPharmacyType("Local");
  };

  // Initialize formData with localStorage data
  const [formData] = useState(() => {
    const savedAddress = localStorage.getItem("deliveryAddress");
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;

    const initialData = savedAddress ? JSON.parse(savedAddress) : {};

    return {
      firstName: userData?.first_name || initialData.firstName || "",
      lastName: userData?.last_name || initialData.lastName || "",
      email: userData?.email || initialData.email || "",
      birthday: initialData.birthday || "2002",
      phone: userData?.phone || initialData.phone || "",
      streetName: initialData.streetName || "",
      houseNumber: initialData.houseNumber || "",
      additionalAddress: initialData.additionalAddress || "",
      city: initialData.city || "",
      postalCode: initialData.postalCode || "",
      country: initialData.country || "",
    };
  });

  const handleConfirm = async () => {
    const savedProductId = localStorage.getItem("product_id");
    const medicationPrice = localStorage.getItem("medication_price");

    const payload = {
      pharmacy_id:
        selectedMethod === "partner"
          ? pharmacyData?.partner?.id
          : selectedPharmacy?.id,
      product_id: savedProductId || "",
      medication_price: medicationPrice ? parseFloat(medicationPrice) : 0,
      shipping,
      pharmacy_type: pharmacyType,
      coupon_id: localStorage.getItem("coupon_id") || null,
    };

    setIsConfirming(true);
    try {
      const response = await axiosSecure.post("/order/create", payload);
      if (response.data) {
        const orderId = response.data?.order?._id || response.data?.order?.id;
        localStorage.setItem("order_id", orderId);
        setCreatedOrderId(orderId);
        toast.success("Bestellung bestätigt");
        setIsConfirmed(true);
      }
    } catch {
      toast.error("Fehler beim Erstellen der Bestellung");
    } finally {
      setIsConfirming(false);
    }
  };

  const handleSubmit = async () => {
    // Save selected delivery method
    setIsSubmitting(true);
    localStorage.setItem("selectedDeliveryMethod", selectedMethod);

    if (selectedMethod === "other") {
      try {
        if (createdOrderId) {
          const checkoutResponse = await axiosSecure.post(
            `/order/checkout/${createdOrderId}`,
          );
          if (checkoutResponse.data?.checkout_url) {
            window.location.href = checkoutResponse.data.checkout_url;
            return;
          }
        }
      } catch {
        toast.error("Fehler beim Checkout");
      } finally {
        setIsSubmitting(false);
      }
    } else if (selectedMethod === "partner") {
      try {
        if (createdOrderId) {
          const checkoutResponse = await axiosSecure.post(
            `/order/checkout/${createdOrderId}`,
          );
          if (checkoutResponse.data?.checkout_url) {
            window.location.href = checkoutResponse.data.checkout_url;
            return;
          }
        }
      } catch {
        toast.error("Fehler beim Checkout");
      } finally {
        setIsSubmitting(false);
      }
    }

    // navigate("/dashboard");
  };

  // This is the partner data
  const { data: pharmacyData = [] } = useQuery({
    queryKey: ["pharmacy"],
    queryFn: async () => {
      const response = await axiosPublic.get("/pharmacy");
      return response?.data?.data;
    },
  });

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponLoading(true);
    setCouponMessage(null);
    try {
      const response = await axiosPublic.post(
        `/coupon/${encodeURIComponent(couponCode)}`,
      );
      const appliedDiscountAmount = Number(response.data?.data?.amount || 0);
      localStorage.setItem("coupon_id", response.data?.data?.id);
      setDiscountAmount(appliedDiscountAmount);
      const msg = response?.data?.message || "Coupon applied";
      setCouponApplied(true);
      setCouponMessage(msg);
      toast.success(msg);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || error?.message || "Invalid coupon";
      setCouponApplied(false);
      setDiscountAmount(0);
      localStorage.removeItem("coupon_amount");
      setCouponMessage(msg);
      toast.error(msg);
    } finally {
      setCouponLoading(false);
    }
  };

  const medicationPrice = Number(localStorage.getItem("medication_price") || 0);
  const prescriptionFee = Number(settings?.prescription_fee || 0);
  const shippingFee =
    partnerDeliveryMode === "shipping" && selectedMethod === "partner"
      ? Number(settings?.shipping_fee || 0)
      : 0;
  const totalPrice = Math.max(
    0,
    medicationPrice + prescriptionFee + shippingFee - discountAmount,
  );

  const pharmacyPrice = medicationPrice + shippingFee;
  sessionStorage.setItem("pharmacy_price", pharmacyPrice.toString());

  return (
    <div className="bg-[#f7f8f6] min-h-screen flex font-inter">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between z-50">
        <button
          onClick={() => navigate(-1)}
          className="text-deep text-xs sm:text-base font-medium cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <MedizinischerFragebogenIcon />
            Medizinischer Fragebogen
          </div>
        </button>
        <NavbarIcon />
        <button
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-gray-900 text-2xl"
        >
          ✕
        </button>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row items-start justify-center pt-22.5 md:pt-20 lg:pt-25 pb-10 px-4 sm:px-8 gap-7 lg:gap-14">
        {/* Left side - Delivery methods selection */}
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {/* Patient data section */}
            <div className="mb-4 pb-4 border-b border-neutral-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-black">
                  Patientendaten
                </h2>
                <button
                  onClick={() => navigate("/auth/register")}
                  className="text-[14px] text-primary font-semibold hover:underline cursor-pointer"
                >
                  Ändern
                </button>
              </div>
              <div className="text-[14px] text-muted-foreground flex flex-row justify-between">
                <div className="flex flex-col gap-3">
                  <p className="text-neutral-500 font-medium">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p>{formData.birthday}</p>
                </div>
                <div className="flex flex-col gap-3 text-right">
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                </div>
              </div>
            </div>
            {/* Delivery address section */}
            <div className="mb-4 pb-4 border-b border-neutral-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-black">
                  Lieferadresse
                </h2>
                <button
                  onClick={() => navigate("/auth/review")}
                  className="text-[14px] text-primary font-semibold hover:underline cursor-pointer"
                >
                  Ändern
                </button>
              </div>
              <div className="text-[14px] text-muted-foregroundeground flex flex-col gap-1">
                <p>
                  {formData.streetName}
                  {formData.houseNumber && ` ${formData.houseNumber}`}
                </p>
                {formData.additionalAddress && (
                  <p>{formData.additionalAddress}</p>
                )}
                <p>
                  {formData.city}, {formData.postalCode}
                </p>
                <p>{formData.country}</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-medium text-black mb-6">
                Rezeptideinlösung & Apotheke
              </h2>
              <div className="space-y-4">
                {/* 1. Partner Apotheke */}
                <div
                  onClick={handlePartnerClick}
                  className={`relative flex cursor-pointer gap-4 rounded-xl border p-4 transition-all duration-200 ${
                    selectedMethod === "partner"
                      ? "border-[#B8C5C2] bg-neutral-200"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <div className="shrink-0 pt-1">
                    <div
                      className={`flex h-3 w-3 items-center justify-center rounded-full border ${
                        selectedMethod === "partner"
                          ? "border-sage bg-sage"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {selectedMethod === "partner" && (
                        <div className="h-1 w-1 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  {/* This is the partner pharmacy option */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 text-sage">
                        <HandshakeIconSvg />
                        <span className="text-base font-medium tracking-tight">
                          Partnerapotheke
                        </span>
                      </div>
                      <span className="rounded-full bg-sage px-4 py-2 text-xs font-medium text-white shadow-sm">
                        Empfohlen
                      </span>
                    </div>

                    <div className="space-y-1.5 px-0 sm:px-9">
                      <p className="text-[14px] font-medium text-neutral-600">
                        {pharmacyData?.partner?.name || "Stadt Apotheke Berlin"}
                      </p>
                      <p className="text-[12px] text-neutral-600">
                        {pharmacyData?.partner?.city ||
                          "Plauener Str. 163-165, 13053 Berlin"}
                      </p>
                      <div className="flex items-center gap-2 pt-2 text-sage">
                        <Check size={18} strokeWidth={2.5} />
                        <span className="text-[12px] font-medium text-sage">
                          Schnelle & sichere Übermittlung
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-2 text-sage">
                        <Check size={18} strokeWidth={2.5} />
                        <span className="text-[12px] font-medium text-sage">
                          Versand oder Abholung
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-2 text-sage">
                        <Check size={18} strokeWidth={2.5} />
                        <span className="text-[12px] font-medium text-sage">
                          Lieferung in 48 Stunden (Mo.-Fr.)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {selectedMethod === "partner" && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-1">
                    <p className="text-[12px] font-medium text-neutral-600">
                      Was möchten Sie tun?
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePartnerDeliveryModeChange("shipping");
                      }}
                      className={`rounded-lg border px-3 py-4 text-left text-[12px] font-medium transition ${
                        partnerDeliveryMode === "shipping"
                          ? "border-sage bg-neutral-200 text-sage"
                          : "border-gray-200 bg-white text-neutral-600 hover:border-[#B8C5C2]"
                      }`}
                    >
                      Versand
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePartnerDeliveryModeChange("pickup");
                      }}
                      className={`rounded-lg border px-3 py-4 text-left text-[12px] font-medium transition ${
                        partnerDeliveryMode === "pickup"
                          ? "border-sage bg-neutral-200 text-sage"
                          : "border-gray-200 bg-white text-neutral-600 hover:border-[#B8C5C2]"
                      }`}
                    >
                      Abholung
                    </button>
                  </div>
                )}

                {/* 2. Andere Apotheke */}
                <div
                  onClick={handleOtherClick}
                  className={`relative flex flex-col gap-4 rounded-xl border p-4 transition-all duration-200 ${
                    selectedMethod === "other"
                      ? "border-[#B8C5C2] bg-[#F9FAFB]"
                      : "border-gray-200 bg-neutral-200 hover:bg-gray-100/50 cursor-pointer"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="shrink-0 pt-1">
                      <div
                        className={`flex h-3 w-3 items-center justify-center rounded-full border ${
                          selectedMethod === "other"
                            ? "border-sage bg-sage"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {selectedMethod === "other" && (
                          <div className="h-1 w-1 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <span className="font-medium text-base text-sage">
                          Andere Apotheke
                        </span>
                        {selectedMethod !== "other" && (
                          <p className="text-sm text-neutral-500">
                            Selbstabholung bei einer Apotheke in Ihrer Nähe.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {selectedMethod === "other" && (
                    <div className="space-y-4 px-9 pb-2">
                      <p className="text-sm font-medium text-neutral-600">
                        Wählen Sie eine Apotheke Ihrer Wahl
                      </p>
                      <div className="grid gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-neutral-600">
                            Name der Apotheke
                          </label>
                          <input
                            type="text"
                            placeholder="z.B. Stadt Apotheke Berlin"
                            value={pharmacyName}
                            onChange={(e) => setPharmacyName(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white/50 p-3 text-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage/20"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm text-neutral-500">
                            E-Mail-Adresse der Apotheke
                          </label>
                          <input
                            type="email"
                            placeholder="apotheke@beispiel.de"
                            value={pharmacyEmail}
                            onChange={(e) => setPharmacyEmail(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white/50 p-3 text-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage/20"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowPharmacyModal(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-sage/30 bg-white/50 py-3 text-sm font-medium text-sage transition hover:bg-white"
                      >
                        <Search size={16} />
                        Finde Apotheken in der Nähe
                      </button>

                      <div className="mt-4 space-y-3 border-t border-gray-200/50 pt-4">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={consentTransfer}
                            onChange={(e) =>
                              setConsentTransfer(e.target.checked)
                            }
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-sage focus:ring-sage"
                          />
                          <p className="text-[11px] leading-relaxed text-neutral-500">
                            Ich willige ein, dass mein Rezept an die von mir
                            ausgewählte Apotheke übermittelt wird.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={consentEmailVerified}
                            onChange={(e) =>
                              setConsentEmailVerified(e.target.checked)
                            }
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-sage focus:ring-sage"
                          />
                          <p className="text-[11px] leading-relaxed text-neutral-500">
                            Ich bestätige, dass ich die E-Mail-Adresse der
                            ausgewählten Apotheke selbst geprüft und korrekt
                            eingetragen habe.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* 3. Freie Einlösung */}
                {/* <div
                  onClick={handleFreeClick}
                  className={`relative flex flex-col gap-4 rounded-xl border p-4 transition-all duration-200 ${
                    selectedMethod === "free"
                      ? "border-[#B8C5C2] bg-[#E8F3F1]/30"
                      : "border-gray-200 bg-neutral-200 hover:bg-gray-100/50 cursor-pointer"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="shrink-0 pt-1">
                      <div
                        className={`flex h-3 w-3 items-center justify-center rounded-full border ${
                          selectedMethod === "free"
                            ? "border-sage bg-sage"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {selectedMethod === "free" && (
                          <div className="h-1 w-1 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <span className="font-medium text-base text-sage">
                          Freie Einlösung
                        </span>
                        <p className="text-sm text-neutral-600">
                          Rezept selbst in einer beliebigen Apotheke einlösen
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedMethod === "free" && (
                    <div className="mt-2 px-9 pb-2">
                      <div className="rounded-lg bg-white px-3 py-4 shadow-sm border border-[#F3F4F6]">
                        <div className="flex gap-3">
                          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                          <div className="space-y-4 text-sm text-neutral-500 leading-relaxed">
                            <p>
                              <span className="font-bold text-neutral-900">
                                Hinweis:
                              </span>{" "}
                              Du kannst dein Rezept auch in einer beliebigen
                              Apotheke deiner Wahl einlösen. Dafür kannst du das
                              Rezept digital auf deinem Smartphone vorzeigen
                              oder als Datei weiterleiten.
                            </p>
                            <p>
                              Für eine sichere und schnelle Einlösung empfehlen
                              wir, das Rezept digital vorzulegen, zum Beispiel
                              per E-Mail oder direkt auf dem Smartphone in der
                              Apotheke.
                            </p>
                            <p>
                              Ein Ausdruck ist ebenfalls möglich, kann jedoch in
                              Einzelfällen zu Rückfragen führen.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div> */}
                {/* Consent Checkbox */}
                <div className="mt-6 flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-sage focus:ring-sage cursor-pointer"
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs leading-relaxed text-gray-600 cursor-pointer"
                  >
                    Ich stimme der Übermittlung meines Rezepts an die gewählte
                    Apotheke zu und bestätige, dass ich die{" "}
                    <a href="/terms" className="text-[#009689] hover:underline">
                      AGB
                    </a>{" "}
                    und{" "}
                    <a href="/privacy" className="text-[#009689] hover:underline">
                      Datenschutzbestimmungen
                    </a>{" "}
                    gelesen habe.
                  </label>
                </div>
              </div>
              {/* Conditional Buttons */}
              {!isConfirmed ? (
                <button
                  onClick={handleConfirm}
                  disabled={
                    isConfirming ||
                    !agreed ||
                    (selectedMethod === "other" &&
                      (!pharmacyName ||
                        !pharmacyEmail ||
                        !consentTransfer ||
                        !consentEmailVerified))
                  }
                  className={`w-full mt-8 rounded-lg py-4 text-[16px] font-medium transition text-white flex items-center justify-center gap-2 ${
                    !isConfirming &&
                    agreed &&
                    (selectedMethod !== "other" ||
                      (pharmacyName &&
                        pharmacyEmail &&
                        consentTransfer &&
                        consentEmailVerified))
                      ? "bg-sage hover:bg-primary-hover cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {isConfirming ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Wird bestätigt...
                    </>
                  ) : (
                    "Sind Sie sicher, dass Sie bestätigen möchten?"
                  )}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full mt-8 rounded-lg py-4 text-[16px] font-medium transition text-white bg-sage flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "cursor-not-allowed opacity-80"
                      : "cursor-pointer"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Wird verarbeitet...
                    </>
                  ) : (
                    "Kostenpflichtig bestellen"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Order overview */}
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {/* Header - always visible */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium text-[#000000]">
                Bestellübersicht
              </h2>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-base text-sage font-semibold hover:underline cursor-pointer"
              >
                {showDetails ? "Details ausblenden" : "Details anzeigen"}
              </button>
            </div>

            {/* These sections hide when showDetails is false */}
            {showDetails && (
              <>
                {/* Product */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <p className="text-[14px] text-neutral-500">
                      {sessionStorage.getItem("product_name") || "Product Name"}
                    </p>
                    <span className="text-[16px] font-medium text-sage">
                      €{localStorage.getItem("medication_price") || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[14px] text-neutral-500">Versandkosten</p>
                    <span className="text-base text-sage font-semibold">
                      {partnerDeliveryMode === "shipping" &&
                      selectedMethod === "partner"
                        ? `€${settings?.shipping_fee || "0.00"}`
                        : "€0"}
                    </span>
                  </div>
                  {/* Coupon code section */}
                  <div className="flex flex-col lg:flex-row justify-between lg:items-start">
                    <p className="text-[14px] text-neutral-500">Gutscheincode</p>
                    <div className="flex flex-col lg:flex-col lg:items-end lg:gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Code eingeben"
                          disabled={couponApplied}
                          className={`text-base text-deep font-semibold border rounded px-2 py-1 focus:outline-none focus:border-primary ${
                            couponApplied
                              ? "bg-gray-100 cursor-not-allowed"
                              : "border border-neutral-200"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={
                            couponLoading || !couponCode || couponApplied
                          }
                          className={`inline-flex items-center gap-2 rounded px-3 py-1 text-sm font-semibold transition ${
                            couponLoading
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : couponApplied
                                ? "bg-green-600 text-white"
                                : "bg-sage text-white hover:bg-primary-hover"
                          }`}
                        >
                          {couponLoading ? (
                            "Wird angewendet..."
                          ) : couponApplied ? (
                            <>
                              <Check size={14} /> Applied
                            </>
                          ) : (
                            "Einlösen"
                          )}
                        </button>
                      </div>
                      <div className="mt-2 lg:mt-0">
                        {couponMessage && (
                          <div
                            className={`text-sm font-medium ${
                              couponApplied
                                ? "text-[#065f46]"
                                : "text-[#b91c1c]"
                            }`}
                          >
                            {couponMessage}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info box */}
                <div className="bg-neutral-200 rounded-lg p-4 mb-6 flex gap-3">
                  <WarnIcon />
                  <p className="text-[14px] text-muted-foreground">
                    The pharmacy will contact you within a few hours with
                    payment and shipping information.
                  </p>
                </div>
              </>
            )}

            {/* Prescription Fee - always visible */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-[14px] text-muted-foreground">
                Prescription Fee
              </p>
              <span className="text-[16px] font-medium text-sage">
                €{settings?.prescription_fee || "0.00"}
              </span>
            </div>

            {/* Discount - always visible if applied */}
            {discountAmount > 0 && (
              <div className="mb-4 pb-4 border-b border-neutral-200 flex justify-between items-center">
                <p className="text-[14px] text-muted-foreground">Discount</p>
                <span className="text-[16px] font-medium text-sage">
                  €{discountAmount.toFixed(2)}
                </span>
              </div>
            )}

            {/* In total - always visible */}
            <div className="mb-6 pb-6">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-sage mb-2">
                  In total
                </p>
                <p className="text-[20px] font-semibold text-sage mb-4">
                  €{totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="space-y-2 text-[14px] text-muted-foreground">
                <div className="flex justify-between">
                  <span>Due now</span>
                  <span className="text-sage font-medium">
                    €{Math.max(0, prescriptionFee - discountAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment at the pharmacy</span>
                  <span className="text-sage font-medium">
                    €{(medicationPrice + shippingFee).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment methods - always visible */}
            <div className="bg-[#F3F4F6] p-4 rounded-lg">
              <p className="text-base text-neutral-500 mb-3 border-b border-neutral-200 pb-3">
                Payment methods
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
          </div>
        </div>
      </div>

      {/* Pharmacy Selection Modal */}
      {showPharmacyModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-237.5 overflow-hidden rounded-3xl bg-white p-6 shadow-2xl sm:p-10">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-deep">
                  Finde Apotheken in der Nähe
                </h2>
                <p className="mt-1 text-[15px] text-neutral-500">
                  Klicken Sie auf eine Apotheke, um Details anzuzeigen
                </p>
              </div>
              <button
                onClick={() => setShowPharmacyModal(false)}
                className="mt-1 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Map Section */}
              <div className="relative min-h-100 flex-1 overflow-hidden rounded-2xl bg-[#edf2f7]">
                <PharmacyMap
                  center={mapCenter}
                  onPharmaciesFound={setNearbyPharmacies}
                  onPharmacySelect={(p) =>
                    setActivePharmacyId(p?.place_id || null)
                  }
                  selectedPharmacyId={activePharmacyId}
                />
                {/* Simulated Pins */}
                <div className="absolute left-[30%] top-[40%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <div className="relative mb-1 rounded-lg border-2 border-white bg-white p-1 shadow-lg">
                    <img
                      src="https://api.placeholder.com/60/40"
                      className="rounded"
                    />
                  </div>
                  <div className="h-3 w-3 rounded-full border-2 border-white bg-sage"></div>
                </div>
              </div>

              {/* Sidebar List */}
              <div className="w-full space-y-3 overflow-y-auto pr-1 lg:max-h-125 lg:w-[320px]">
                {nearbyPharmacies.length > 0 ? (
                  nearbyPharmacies.map((pharmacy) => (
                    <div
                      key={pharmacy.place_id}
                      onClick={() => setActivePharmacyId(pharmacy.place_id)}
                      className={`rounded-xl border-2 p-4 transition-all cursor-pointer ${
                        activePharmacyId === pharmacy.place_id
                          ? "border-sage bg-[#E8F3F1]/30 ring-2 ring-sage/5"
                          : "border-gray-100 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-bold text-deep leading-tight">
                          {pharmacy.name}
                        </h3>
                      </div>
                      <div className="mt-2 text-[13px] leading-snug text-neutral-600">
                        <p>{pharmacy.vicinity}</p>
                      </div>
                      {pharmacy.rating && (
                        <div className="mt-2 flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-[12px] font-medium text-gray-600">
                            {pharmacy.rating} ({pharmacy.user_ratings_total})
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-gray-300">
                    <p className="text-sm text-gray-500">
                      Suche nach Apotheken...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 space-y-4">
              <div className="rounded-lg bg-gray-50 py-3 text-center">
                <p className="text-[12px] text-gray-500">
                  <span className="font-bold">Hinweis:</span> Besuchen Sie die
                  Website der Apotheke, um die korrekte E-Mail-Adresse zu finden
                  und zu überprüfen.
                </p>
              </div>
              <button
                disabled={isCreatingPharmacy}
                onClick={async () => {
                  if (activePharmacyId) {
                    const pharmacy = nearbyPharmacies.find(
                      (p) => p.place_id === activePharmacyId,
                    );
                    if (pharmacy) {
                      const payload = {
                        name: pharmacy.name,
                        email: pharmacyEmail,
                        phone: "",
                        category: "pharmacy",
                        street: pharmacy.vicinity,
                        house: "",
                        city: mapCenter.lat === 23.8103 ? "Dhaka" : "",
                        postal: "",
                        country: mapCenter.lat === 23.8103 ? "Bangladesh" : "",
                        longitude: pharmacy.geometry.location.lng(),
                        latitude: pharmacy.geometry.location.lat(),
                      };
                      setSelectedPharmacy(payload);
                      setPharmacyName(pharmacy.name);

                      setIsCreatingPharmacy(true);
                      try {
                        const response = await axiosSecure.post(
                          "/pharmacy/create",
                          payload,
                        );
                        if (response.data) {
                          const newPharmacy = response.data?.data;
                          setSelectedPharmacy(newPharmacy);
                          toast.success(
                            response.data.message ||
                              "Pharmacy created successfully",
                          );
                        }
                      } catch {
                        toast.error(
                          "Error creating pharmacy. Please try again.",
                        );
                      } finally {
                        setIsCreatingPharmacy(false);
                      }
                    } else {
                      alert(
                        "No pharmacy currently active. Please click one on the map or list first.",
                      );
                    }
                  } else {
                    alert("Please select a pharmacy first.");
                  }
                  setShowPharmacyModal(false);
                }}
                className={`w-full rounded-xl py-4 text-[16px] font-semibold text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                  isCreatingPharmacy
                    ? "bg-sage/70 cursor-not-allowed"
                    : "bg-sage hover:bg-deep"
                }`}
              >
                {isCreatingPharmacy ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Wird geladen...
                  </>
                ) : (
                  "Schließen"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
