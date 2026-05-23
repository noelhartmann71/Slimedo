import React, { useState, useEffect } from "react";
import BookConsultationModal from "../components/svg-container/BookConsultationModal";
import PharmacyPaymentModal from "../components/svg-container/PharmacyPaymentModal";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PaymentSuccessPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // ── NEW: grab session_id & call API ─────────────────────
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return;

    axiosSecure
      .post("/order/payment-success", { session_id: sessionId })
      .then((res) => {
        console.log("Payment success response:", res.data);
      })
      .catch((err) => {
        console.error("Payment success API error:", err);
      });
  }, [axiosSecure, searchParams]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center gap-6! px-4 font-sans">
      <div className="w-full max-w-125 flex-col gap-6! items-center">
        {/* Card 1 — Success */}
        <div className="bg-white rounded-2xl px-6 py-8 text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="w-15 h-15 rounded-full bg-[#e6f4f1] flex items-center justify-center">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M5 13.5l5.5 5.5 10.5-11"
                  stroke="#2d6a5f"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Zahlung erfolgreich!
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Ihre Bestellung wurde bestätigt und Ihre Zahlung wurde erfolgreich
            verarbeitet.
          </p>
        </div>
        {/* Card 2 — What happens next */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-4">
          <h2 className="text-base font-bold text-gray-900 mb-2">
            Wie geht es weiter?
          </h2>
          <p className="text-[13px] text-gray-500 mb-3 leading-relaxed">
            Ich bestätige, dass ich an keiner der folgenden Krankheiten leide:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li className="text-[13.5px] text-gray-700 leading-snug">
              Sie erhalten in Kürze eine Bestätigungs-E-Mail mit Ihren
              Bestelldetails.
            </li>
            <li className="text-[13.5px] text-gray-700 leading-snug">
              Ein Arzt wird Ihren medizinischen Fragebogen innerhalb von 24 Stunden überprüfen.
            </li>
            <li className="text-[13.5px] text-gray-700 leading-snug">
              Sobald genehmigt, wird Ihr Medikament vorbereitet und an
              Ihre Adresse versandt.
            </li>
          </ul>

          {/* Doctor card */}
          <div className="mt-5 bg-gray-100 rounded-xl px-5 py-4 text-center">
            <p className="text-[15px] font-bold text-gray-900 mb-2">
              Müssen Sie mit einem Arzt sprechen?
            </p>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Buchen Sie eine telemedizinische Beratung, um Ihren Behandlungsplan zu
              besprechen, Fragen zu stellen oder persönliche Beratung von unserem medizinischen Team zu erhalten.
            </p>
          </div>

          {/* Pharmacy Payment button (moved from BookingConfirmationModal) */}
          <div className="mt-4">
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full py-4 bg-[#2D6B61] text-white rounded-2xl text-base font-bold hover:bg-[#1B4F48] shadow-md shadow-[#2D6B61]/20 transition-all cursor-pointer"
            >
              Apotheken-Zahlung
            </button>
          </div>
        </div>
      </div>
      <BookConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <PharmacyPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </div>
  );
};

export default PaymentSuccessPage;
