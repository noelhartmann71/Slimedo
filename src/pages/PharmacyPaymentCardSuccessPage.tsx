import { useState, useEffect } from "react"; // ← added useEffect
import useAxiosSecure from "../hooks/useAxiosSecure"; // ← added (adjust path if needed)

import {
  BookingConfirmedIconSvg,
  CalenderIcon,
  ClockIcon,
} from "../components/svg-container/SvgContainer";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookConsultationModal from "../components/svg-container/BookConsultationModal";

const PharmacyPaymentCardSuccessPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return;

    axiosSecure
      .post("/payment/pharmacy/payment-success", { session_id: sessionId })
      .then((res) => {
        console.log("Payment success response:", res.data);
      })
      .catch((err) => {
        console.error("Payment success API error:", err);
      });
  }, [axiosSecure, searchParams]);

  const [confirmedBooking] = useState<{
    date: string;
    time: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem("doctorConsultationBooking");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const sessionId = searchParams.get("session_id");

  if (!confirmedBooking && !sessionId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => navigate("/")}
      />
      <div className="relative bg-white rounded-2xl p-8 w-full max-w-xl shadow-2xl text-center transform animate-in zoom-in-95 duration-300">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#CBFBF1] rounded-full w-16 h-16 flex items-center justify-center">
            <BookingConfirmedIconSvg />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {confirmedBooking ? "Buchung bestätigt!" : "Zahlung erfolgreich!"}
        </h2>

        {/* Description */}
        <p className="text-base text-gray-500 mb-8">
          {confirmedBooking
            ? "Ihre Konsultation wurde erfolgreich geplant."
            : "Ihre Zahlung wurde erfolgreich verarbeitet. Sie erhalten in Kürze eine Bestätigungs-E-Mail."}
        </p>

        {/* Booking Details Box - only show if confirmedBooking exists */}
        {confirmedBooking && (
          <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200/60">
              <div className="bg-white p-2.5 rounded-xl shadow-sm">
                <CalenderIcon />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider leading-none mb-1">
                  Datum
                </p>
                <p className="text-base font-bold text-gray-900 leading-none">
                  {confirmedBooking.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-xl shadow-sm">
                <ClockIcon />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider leading-none mb-1">
                  Uhrzeit
                </p>
                <p className="text-base font-bold text-gray-900 leading-none">
                  {confirmedBooking.time} Uhr
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment confirmation message - show if only sessionId exists */}
        {!confirmedBooking && sessionId && (
          <div className="bg-[#E8ECEB] rounded-2xl p-5 mb-8 border border-[#D1D9D4]">
            <p className="text-sm text-[#1B433B] font-medium mb-2">
              Sitzungs-ID:
            </p>
            <p className="text-xs text-[#6B7280] font-mono break-all">
              {sessionId}
            </p>
          </div>
        )}

        {/* Action Buttons (Pharmacy Payment moved to success page) */}
        {/* Buttons */}
        <div className="flex gap-2.5 mt-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 h-12 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Zur Startseite
          </button>
          {/* <button
            onClick={() => navigate("/patient/profile/overview")}
            className="flex-1 h-12 rounded-xl bg-[#2d6a5f] text-white text-sm font-semibold hover:bg-[#235248] transition-colors cursor-pointer"
          >
            Profil-Dashboard
          </button> */}
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 h-12 rounded-xl bg-[#2d6a5f] text-white text-sm font-semibold hover:bg-[#235248] transition-colors cursor-pointer"
          >
            Arztkonsultation buchen
          </button> */}
        </div>
        <BookConsultationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default PharmacyPaymentCardSuccessPage;
