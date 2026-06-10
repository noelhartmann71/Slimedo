import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CalenderIcon } from "../svg-container/SvgContainer";
import toast from "react-hot-toast";
import BookingConfirmationModal from "./BookingConfirmationModal";

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const generateSlots = (range: string): string[] => {
  const [start, end] = range.split("-");
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  const slots: string[] = [];
  let h = startH,
    m = startM;
  while (h * 60 + m < endH * 60 + endM) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += 30;
    if (m >= 60) {
      h++;
      m -= 60;
    }
  }
  return slots;
};

const getUpcomingDates = (schedule: Record<string, string[]>) => {
  const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const germanDayNames: Record<string, string> = {
    sunday: "Sonntag",
    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samstag",
  };
  const today = new Date();
  const scheduledDays = Object.keys(schedule);

  return scheduledDays.map((dayKey) => {
    const targetDayIndex = dayNames.indexOf(dayKey);
    const todayIndex = today.getDay();
    let daysAhead = targetDayIndex - todayIndex;
    if (daysAhead < 0) daysAhead += 7;

    const d = new Date(today);
    d.setDate(today.getDate() + daysAhead);

    return {
      day: germanDayNames[dayKey] || dayKey.charAt(0).toUpperCase() + dayKey.slice(1),
      date: d.toISOString().split("T")[0],
      displayDate: d.toLocaleDateString("de-DE", {
        month: "short",
        day: "numeric",
      }),
      dayKey,
    };
  });
};

const BookConsultationModal: React.FC<BookConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const axiosSecure = useAxiosSecure();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number>(-1);
  const [selectedTime, setSelectedTime] = useState<number>(-1);
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [schedule, setSchedule] = useState<Record<string, string[]>>({});
  const [scheduleLoading, setScheduleLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetchSchedule = async () => {
      setScheduleLoading(true);
      try {
        const res = await axiosSecure.get("/schedule");
        setSchedule(res.data?.data || {});
      } catch {
        toast.error("Verfügbare Termine konnten nicht geladen werden.");
      } finally {
        setScheduleLoading(false);
      }
    };
    fetchSchedule();
  }, [axiosSecure, isOpen]);

  //
  const dates = getUpcomingDates(schedule);
  const times: string[] =
    selectedDate !== -1
      ? (schedule[dates[selectedDate].dayKey] || []).flatMap(generateSlots)
      : [];

  const handleDateSelect = (i: number) => {
    setSelectedDate(i);
    setSelectedTime(-1);
  };

  const handleConfirmBooking = async () => {
    if (selectedDate !== -1 && selectedTime !== -1) {
      setLoading(true);
      try {
        const payload = {
          date: dates[selectedDate].date,
          start_time: `${times[selectedTime]}:00`,
        };

        const res = await axiosSecure.post("/appointment/create", payload);
        const data = res?.data || {};

        // If API returns a checkout URL, redirect user there for payment
        if (data.checkout_url) {
          // persist booking preview locally in case user returns
          const booking = {
            date: `${dates[selectedDate].day} ${dates[selectedDate].displayDate}`,
            time: times[selectedTime],
          };
          localStorage.setItem(
            "doctorConsultationBooking",
            JSON.stringify(booking),
          );
          // redirect to the external checkout
          window.location.href = data.checkout_url;
          return;
        }

        // Otherwise proceed with confirmation modal flow
        if (data.status === false) {
          toast.error(data.message || "Fehler beim Erstellen des Termins.");
        }

        const booking = {
          date: `${dates[selectedDate].day} ${dates[selectedDate].displayDate}`,
          time: times[selectedTime],
        };

        localStorage.setItem(
          "doctorConsultationBooking",
          JSON.stringify(booking),
        );
        toast.success(data.message || "Beratung erfolgreich gebucht!");
        setConfirmedBooking(booking);
        setShowConfirmationModal(true);
        setSelectedDate(-1);
        setSelectedTime(-1);
      } catch {
        toast.error("Fehler beim Erstellen des Termins. Bitte versuchen Sie es erneut.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen && !showConfirmationModal) return null;

  return (
    <>
      {isOpen && !showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative w-full max-w-xl transform overflow-hidden rounded-card bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all cursor-pointer z-10"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <CalenderIcon />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Beratung buchen
                </h2>
              </div>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                Wählen Sie Ihr bevorzugtes Datum und Ihre Uhrzeit für eine telemedizinische
                Beratung mit unserem Ärzteteam.
              </p>
            </div>

            {scheduleLoading ? (
              <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
                Verfügbare Termine werden geladen...
              </div>
            ) : (
              <>
                {/* Select Date */}
                <div className="mb-8">
                  <label className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">
                    Datum wählen
                  </label>
                  {dates.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      Keine verfügbaren Daten gefunden.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {dates.map((d, i) => (
                        <button
                          key={i}
                          onClick={() => handleDateSelect(i)}
                          className={`group relative flex flex-col items-center justify-center rounded-card-sm border p-4 transition-all duration-200 cursor-pointer ${
                            selectedDate === i
                              ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                              : "border-gray-100 bg-white hover:border-primary/50 hover:bg-gray-50"
                          }`}
                        >
                          <span
                            className={`text-sm font-bold ${selectedDate === i ? "text-primary" : "text-gray-900"}`}
                          >
                            {d.day}
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            {d.displayDate}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Select Time — only appears after date picked */}
                {selectedDate !== -1 && (
                  <div className="mb-10">
                    <label className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">
                      Uhrzeit wählen
                    </label>
                    {times.length === 0 ? (
                      <p className="text-sm text-gray-400">
                        Für diesen Tag sind keine Termine verfügbar.
                      </p>
                    ) : (
                      <div className="grid grid-cols-4 gap-2">
                        {times.map((t, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedTime(i)}
                            className={`flex items-center justify-center rounded-xl border py-3 px-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                              selectedTime === i
                                ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                                : "border-gray-100 bg-white hover:border-primary/50 text-gray-700"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Footer */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="flex-1 py-4 px-6 rounded-card-sm text-[15px] font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer"
              >
                Vielleicht später
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={selectedDate === -1 || selectedTime === -1 || loading}
                className={`flex-1 py-4 px-6 rounded-card-sm text-[15px] font-bold shadow-lg transition-all cursor-pointer ${
                  selectedDate !== -1 && selectedTime !== -1 && !loading
                    ? "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                }`}
              >
                {loading ? "Wird bestätigt..." : "Buchung bestätigen"}
              </button>
            </div>
          </div>
        </div>
      )}

      <BookingConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => {
          setShowConfirmationModal(false);
          onClose();
        }}
        confirmedBooking={confirmedBooking}
      />
    </>
  );
};

export default BookConsultationModal;
