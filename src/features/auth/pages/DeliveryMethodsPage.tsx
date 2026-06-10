import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LocationIcon,
  MedizinischerFragebogenIcon,
  NavbarIcon,
  WarnIcon,
} from "../../../components/svg-container/SvgContainer";
import MastercardImg from "../../../../public/images/logo/payment.png";

export default function DeliveryMethodsPage() {
  const navigate = useNavigate();

  // Initialize formData with localStorage data
  const [formData] = useState(() => {
    const savedAddress = localStorage.getItem("deliveryAddress");
    if (savedAddress) {
      return JSON.parse(savedAddress);
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      birthday: "",
      phone: "",
      streetName: "",
      houseNumber: "",
      additionalAddress: "",
      city: "",
      postalCode: "",
      country: "",
    };
  });

  const handleSubmit = () => {
    navigate("/auth/delivery-method-selection");
  };

  return (
    <div className="bg-[#f7f8f6] min-h-screen flex font-inter">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 px-3 sm:px-6 py-4 flex items-center justify-between z-50">
        <button className="text-deep text-base font-medium">
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
      <div className="flex-1 flex items-start justify-center pt-25 px-8 gap-14">
        {/* Left side - Delivery methods */}
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            {/* Patient data section */}
            <div className="mb-8 pb-8 border-b border-neutral-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-black">Patientendaten</h2>
                <button
                  onClick={() => navigate("/auth/register")}
                  className="text-[14px] text-primary font-semibold hover:underline cursor-pointer"
                >
                  Ändern
                </button>
              </div>
              <div className="text-[14px] text-muted-foreground flex flex-row justify-between">
                <div className="flex flex-col gap-3">
                  <p className="text-neutral-500">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p>{formData.birthday}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                </div>
              </div>
            </div>

            {/* Delivery address section */}
            <div className="mb-8 pb-8 border-b border-neutral-200">
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
              <div className="text-[14px] text-muted-foreground flex flex-col gap-1">
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

            {/* Delivery methods section */}
            <div>
              <h2 className="text-xl font-medium text-black mb-6">
                Liefermethoden
              </h2>

              <div className="border border-neutral-200 rounded-lg p-4 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <LocationIcon />
                    <div>
                      <label
                        htmlFor="collection"
                        className="text-[16px] font-medium text-black block mb-1 cursor-pointer"
                      >
                        Abholung
                      </label>
                      <p className="text-[14px] text-muted-foreground">
                        Wählen Sie die Apotheke, in der Sie Ihre Medikamente abholen möchten.
                      </p>
                    </div>
                  </div>
                  <span className="text-[16px] font-medium text-black ml-4">
                    €14.95
                  </span>
                </div>
              </div>
              {/* Consent text */}
              <p className="text-[14px] text-muted-foreground mb-6">
                Zustimmung zu den{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Allgemeinen Geschäftsbedingungen
                </a>{" "}
                und Anerkennung der{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Informationen
                </a>
                ,{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Datenschutzbestimmungen
                </a>{" "}
                sowie{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Stornierungsbedingungen
                </a>
                .
              </p>
              {/* Order button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary-hover text-white rounded-lg py-4 text-[16px] font-medium transition cursor-pointer"
              >
                Bestellen und bezahlen €19,00
              </button>
            </div>
          </div>
        </div>
        {/* Right side - Order overview */}
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium text-[#000000]">
                Bestellübersicht
              </h2>
              <button className="text-base text-deep font-semibold hover:underline cursor-pointer">
                Details ausblenden
              </button>
            </div>
            {/* Product */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <p className="text-[14px] text-neutral-500 mb-2">
                  Flexi Touch Injektionslösung, vorgefüllter Stift
                </p>
                <span className="text-[16px] font-medium text-[#000000]">
                  €171,96
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[14px] text-neutral-500 mb-2">
                  Versandkosten
                </p>
                <span className="text-base text-deep font-semibold">
                  Ausstehend
                </span>
              </div>
            </div>
            {/* Info box */}
            <div className="bg-neutral-200 rounded-lg p-4 mb-6 flex gap-3">
              <WarnIcon />
              <p className="text-[14px] text-muted-foreground">
                Die Apotheke wird Sie innerhalb weniger Stunden mit Zahlungs- und Versandinformationen kontaktieren.
              </p>
            </div>
            {/* Recipe cost */}
            <div className="mb-6 pb-6 border-b border-neutral-200 flex justify-between items-center">
              <p className="text-[14px] text-muted-foreground">
                Rezept (Online-Dienst)
              </p>
              <span className="text-[16px] font-medium text-black">€19.00</span>
            </div>
            {/* Total */}
            <div className="mb-6 pb-6 ">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-black mb-2">Insgesamt</p>
                <p className="text-[20px] font-semibold text-black mb-4">
                  €190.96
                </p>
              </div>
              <div className="space-y-2 text-[14px] text-muted-foreground">
                <div className="flex justify-between">
                  <span>Jetzt fällig</span>
                  <span className="text-black font-medium">€19.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Bezahlung in der Apotheke</span>
                  <span className="text-black font-medium">171.96 €</span>
                </div>
              </div>
            </div>
            {/* Payment methods */}
            <div className="bg-[#F3F4F6] p-4 rounded-lg">
              <p className="text-base text-neutral-500 mb-3 border-b border-neutral-200 pb-3">
                Zahlungsmethoden
              </p>
              <img src={MastercardImg} alt="Mastercard" className="w-8.5 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
