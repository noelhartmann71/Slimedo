import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import BankPaymentModal from "./BankPaymentModal";
import {
  MasterCardIconSvg,
  PharmacyInformationIconSvg,
  PharmacyPaymentIconSvg,
  SelectPaymentMethodIconSvg,
  VisaSvg,
} from "./SvgContainer";

interface PharmacyPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount?: string;
}

const PharmacyPaymentModal: React.FC<PharmacyPaymentModalProps> = ({
  isOpen,
  onClose,
  amount = "25.00",
}) => {
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const orderId = localStorage.getItem("order_id") || "";
  const TotalAmount = sessionStorage.getItem("pharmacy_price") || amount;

  const { mutate: payWithCard, isPending: isProcessingCard } = useMutation({
    mutationFn: async () => {
      const orderId = localStorage.getItem("order_id");
      if (!orderId) {
        throw new Error("Order ID not found in local storage");
      }

      const response = await axiosSecure.post("/payment/card", {
        order_id: orderId,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.redirect_url) {
        window.location.href = data.redirect_url;
      } else if (data?.data?.url) {
        window.location.href = data.data.url;
      } else {
        toast.success(data?.message || "Zahlung erfolgreich initiiert");
        onClose();
      }
    },
    onError: (error) => {
      const axiosError = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        axiosError?.response?.data?.message ||
          axiosError?.message ||
          "Fehler bei der Verarbeitung der Kartenzahlung",
      );
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 font-inter">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-[#F8F9FA] p-4 shadow-2xl transition-all animate-in zoom-in-95 duration-300">
        {/* Section 1: Header Card */}
        <div className="mb-3 overflow-hidden rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F2F0]">
            <PharmacyPaymentIconSvg />
          </div>
          <h2 className="mb-2 text-2xl font-medium tracking-tight text-black">
            Apothekenzahlung
          </h2>
          <p className="text-base font-normal text-[#6B7280]">
            Schließen Sie Ihre Zahlung an die ausgewählte Apotheke ab
          </p>
        </div>

        {/* Section 2: Info & Amount Card */}
        <div className="mb-3 rounded-2xl bg-white p-5 shadow-sm">
          {/* Payment Info Alert */}
          <div className="mb-5 flex items-start gap-4 rounded-md border border-[#E0F5F1] bg-[#F0FDFA] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <PharmacyInformationIconSvg />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-medium text-[#227C31]">
                Zahlungsinformationen
              </h3>
              <p className="text-[14px] leading-normal text-[#4B5563]">
                Diese Zahlung geht direkt an Ihre ausgewählte Apotheke.
              </p>
              <p className="text-[14px] leading-normal text-[#227C31]">
                Die Zahlung ist absolut sicher und geschützt
              </p>
            </div>
          </div>

          {/* Amount Box */}
          <div className="flex items-center justify-between rounded-md border border-gray-100 bg-[#E8ECEB] px-5 py-4">
            <span className="text-sm font-medium text-black">Gesamtbetrag</span>
            <span className="text-sm font-medium text-black">
              {TotalAmount} €
            </span>
          </div>
        </div>

        {/* Section 3: Payment Methods Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-2xl font-medium text-black">
            Zahlungsmethode auswählen
          </h3>

          <div className="space-y-3">
            {/* Pay with Card */}
            <button
              onClick={() => payWithCard()}
              disabled={isProcessingCard}
              className="group flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3.5 transition-all hover:border-[#2D6B61] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F9FA] group-hover:bg-[#E9F2F0]">
                {isProcessingCard ? (
                  <Loader2 className="h-6 w-6 animate-spin text-[#2D6B61]" />
                ) : (
                  <SelectPaymentMethodIconSvg />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-[#111827]">
                  Mit Karte bezahlen
                </p>
                <p className="text-[14px] text-[#6B7280]">
                  {isProcessingCard
                    ? "Verarbeitung..."
                    : "Verwenden Sie Ihre Kredit- oder Debitkarte"}
                </p>
              </div>
              <div className="flex items-center gap-1.5 opacity-60">
                <VisaSvg />
                <MasterCardIconSvg />
              </div>
            </button>

            {/* Pay with Bank */}
            <button
              onClick={() => setIsBankModalOpen(true)}
              className="group flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3.5 transition-all hover:border-[#2D6B61] hover:shadow-md active:scale-[0.98]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F9FA] group-hover:bg-[#E9F2F0]">
                <SelectPaymentMethodIconSvg />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-[#111827]">
                  Mit Banküberweisung bezahlen
                </p>
                <p className="text-[14px] text-[#6B7280]">
                  Online-Banking oder Mobile-Banking
                </p>
              </div>
              <div className="flex items-center gap-1.5 opacity-60">
                <VisaSvg />
                <MasterCardIconSvg />
              </div>
            </button>
          </div>
        </div>

        {/* Bank Payment Modal */}
        <BankPaymentModal
          isOpen={isBankModalOpen}
          onClose={() => {
            setIsBankModalOpen(false);
          }}
          orderId={orderId}
        />

        {/* Close Button Top Right (Optional but helpful) */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default PharmacyPaymentModal;
