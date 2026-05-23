import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalenderIcon,
  ClockIcon,
  MedizinischerFragebogenIcon,
  NavbarIcon,
  PaymentSuccfullIcon,
} from "../../../components/svg-container/SvgContainer";

export default function PharmacySelectionSuccessPage() {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number>(-1);
  const [selectedTime, setSelectedTime] = useState<number>(-1);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    date: string;
    time: string;
  } | null>(null);

  const dates = [
    { day: "Thursday", date: "Oct 3" },
    { day: "Thursday", date: "Oct 4" },
    { day: "Thursday", date: "Oct 5" },
    { day: "Thursday", date: "Oct 6" },
  ];

  const times = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
  ];

  const handleConfirmBooking = () => {
    if (selectedDate !== -1 && selectedTime !== -1) {
      const booking = {
        date: `${dates[selectedDate].day} ${dates[selectedDate].date}`,
        time: times[selectedTime],
      };
      localStorage.setItem(
        "doctorConsultationBooking",
        JSON.stringify(booking),
      );
      setConfirmedBooking(booking);
      setShowBookingModal(false);
      setShowConfirmationModal(true);
      setSelectedDate(-1);
      setSelectedTime(-1);
    }
  };

  return (
    <div className="bg-[#f7f8f6] min-h-screen font-inter">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-[#e5e7eb] px-3 sm:px-6 py-4 flex items-center justify-between z-50">
        <button className="text-[#1B433B] text-base font-medium">
          <div className="flex items-center gap-0 sm:gap-3">
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
      <div className="flex items-center justify-center pt-22.5 sm:pt-25 px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-8 max-w-xl w-full">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-[#CBFBF1] rounded-full p-4 w-16 h-16 flex items-center justify-center">
              <PaymentSuccfullIcon />
            </div>
          </div>

          {/* Success Title */}
          <h1 className="text-center text-2xl font-semibold text-black mb-3">
            Payment Successful!
          </h1>

          {/* Success Description */}
          <p className="text-center text-base text-[#6B7280] mb-8">
            Your order has been confirmed and your payment has been processed
            successfully.
          </p>

          {/* What happens next section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-black mb-4">
              What happens next?
            </h2>
            <p className="text-[14px] text-[#6B7280] mb-4">
              I confirm that I do not suffer from any of the following diseases:
            </p>
            <ul className="text-[14px] text-[#6B7280] space-y-3">
              <li className="flex gap-3">
                <span>•</span>
                <span>
                  You will receive a confirmation email with your order details
                  shortly.
                </span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>
                  A doctor will review your medical questionnaire within 24
                  hours.
                </span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>
                  Once approved, your medication will be prepared and shipped to
                  your address.
                </span>
              </li>
            </ul>
          </div>

          {/* Doctor consultation info box */}
          <div className="bg-[#E8ECEB] rounded-lg p-4 mb-8 border border-[#E5E7EB] text-center">
            <h3 className="text-lg font-medium text-black mb-3">
              Need to speak with a doctor?
            </h3>
            <p className="text-base text-[#6B7280]">
              Book a telemedical consultation to discuss your treatment plan,
              ask questions, or get personalized advice from our medical team.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-[#FEF2F2] hover:bg-[#E5E7EB] text-black rounded-lg py-3 text-[16px] font-medium transition cursor-pointer"
            >
              Go to Home
            </button>
            <button
              onClick={() => setShowBookingModal(true)}
              className="flex-1 bg-[#1B433B] hover:bg-[#16302b] text-white rounded-lg py-3 text-[18px] font-medium transition cursor-pointer"
            >
              Book Doctor Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Book Doctor Consultation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-8">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl">
            {/* Header */}
            <div className="flex justify-between items-start mb-1">
              <h2 className="text-lg sm:text-2xl font-medium text-black">
                Book Doctor Consultation
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors ml-2 mt-0.5"
              >
                ✕
              </button>
            </div>
            <p className="text-base sm:text-lg text-[#4A5565] mb-5 leading-relaxed">
              Select your preferred date and time for a telemedical consultation
              with our medical team.
            </p>

            {/* Select Date */}
            <p className="text-lg font-semibold text-[#4A5565] mb-2">
              Select Date
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
              {dates.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(i)}
                  className={`relative rounded-xl border py-5 px-5 text-center transition-all duration-150 ${
                    selectedDate === i
                      ? "bg-[#E8ECEB] border-primary"
                      : "bg-white border-gray-200 hover:border-primary hover:bg-[#f7f8f6]"
                  }`}
                >
                  <div className="flex gap-3 items-center">
                    <div className="flex justify-center mb-1">
                      <CalenderIcon />
                    </div>
                    <div>
                      <span className="block text-base font-semibold text-[#1B433B]">
                        {d.day}
                      </span>
                      <span className="block text-sm text-[#4B5563] mt-0.5">
                        {d.date}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Time */}
            <p className="text-lg font-semibold text-[#4A5565] mb-2">Time</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {times.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(i)}
                  className={`flex items-center justify-center rounded-xl border p-4 text-center transition-all duration-150 ${
                    selectedTime === i
                      ? "bg-[#E8ECEB] border-primary"
                      : "bg-white border-gray-200 hover:border-primary hover:bg-[#f7f8f6]"
                  }`}
                >
                  <div className="flex gap-3 items-center">
                    <ClockIcon />
                    <span className="text-base font-medium text-[#1B433B]">
                      {t}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 py-4 px-5 rounded-md border border-gray-200 text-base font-medium text-[#4B5563] bg-[#FEF2F2] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={selectedDate === -1 || selectedTime === -1}
                className={`flex-1 py-4 px-5 rounded-md text-base font-medium transition-colors ${
                  selectedDate !== -1 && selectedTime !== -1
                    ? "bg-primary text-[#FFFFFF] hover:bg-[#16302b]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showConfirmationModal && confirmedBooking && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#CBFBF1] rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center text-2xl font-semibold text-black mb-2">
              Booking Confirmed!
            </h2>

            {/* Description */}
            <p className="text-center text-[14px] text-[#6B7280] mb-6">
              Your consultation has been successfully scheduled.
            </p>

            {/* Booking Details Box */}
            <div className="border border-[#E5E7EB] rounded-lg p-4 mb-6 bg-[#F9FAFB]">
              <div className="flex items-center gap-3 mb-4">
                <CalenderIcon />
                <div>
                  <p className="text-[14px] font-medium text-black">
                    {confirmedBooking.date.split(" ")[0]}
                  </p>
                  <p className="text-[14px] text-[#6B7280]">
                    {confirmedBooking.date.split(" ").slice(1).join(" ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon />
                <p className="text-[14px] font-medium text-black">
                  {confirmedBooking.time}
                </p>
              </div>
            </div>

            {/* What to expect */}
            <div className="bg-[#F3F4F6] rounded-lg p-4 mb-6">
              <h3 className="text-[14px] font-semibold text-black mb-3">
                What to expect:
              </h3>
              <ul className="space-y-2 text-[14px] text-[#6B7280]">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    You will receive a confirmation email with a video call link
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    The consultation will last approximately 15-20 minutes
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Please have your medical questionnaire ready</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmationModal(false);
                  navigate("/");
                }}
                className="flex-1 bg-[#FEF2F2] hover:bg-[#FAE5E5] text-black rounded-lg py-3 text-[14px] font-medium transition cursor-pointer"
              >
                Go to Home
              </button>
              <button
                onClick={() => {
                  setShowConfirmationModal(false);
                  navigate("/dashboard");
                }}
                className="flex-1 bg-primary hover:bg-[#16302b] text-white rounded-lg py-3 text-[14px] font-medium transition cursor-pointer"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
