import React from "react";
import {
  BookingConfirmedIconSvg,
  CalenderIcon,
  ClockIcon,
} from "./SvgContainer";

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmedBooking: {
    date: string;
    time: string;
  } | null;
}

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  confirmedBooking,
}) => {
  if (!isOpen || !confirmedBooking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-card-sm p-8 w-full max-w-xl shadow-2xl text-center transform animate-in zoom-in-95 duration-300">
        {/* ✅ X Close Button — only this block is new */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#CBFBF1] rounded-full w-16 h-16 flex items-center justify-center">
            <BookingConfirmedIconSvg />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Buchung bestätigt!
        </h2>

        {/* Description */}
        <p className="text-base text-gray-500 mb-8">
          Ihre Beratung wurde erfolgreich geplant.
        </p>

        {/* Booking Details Box */}
        <div className="bg-gray-50 rounded-card-sm p-5 mb-8 border border-gray-100">
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

        {/* What to expect */}
        <div className="text-left mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-4 px-1">
            Was Sie erwartet:
          </h3>
          <div className="space-y-3">
            {[
              "Bestätigungs-E-Mail mit einem Video-Call-Link",
              "Beratung dauert ca. 15-20 Minuten",
              "Bitte halten Sie Ihren Fragebogen bereit",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                <p className="text-sm text-gray-600 leading-tight">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        {/* <div className="flex gap-2.5 mt-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 h-12 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate("/patient/profile/overview")}
            className="flex-1 h-12 rounded-xl bg-sage text-white text-sm font-semibold hover:bg-sage transition-colors cursor-pointer"
          >
            Profile Dashboard
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
