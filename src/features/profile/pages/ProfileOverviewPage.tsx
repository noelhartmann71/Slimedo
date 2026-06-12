import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ProfileDashboardLayout from "../components/ProfileDashboardLayout";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import { Skeleton } from "@/components/ui/skeleton";
import SendEmailModal from "../components/SendEmailModal";
import ViewEmailModal from "../components/ViewEmailModal";
import ViewOrderModal from "../components/ViewOrderModal";
import BookConsultationModal from "../../../components/svg-container/BookConsultationModal";
import FollowUpCtaCard from "../components/FollowUpCtaCard";
import { deriveEligibility } from "@/features/follow-up/api";

interface prescriptionData {
  id: number;
  status: string;
  product: {
    name: string;
    category: string;
  } | null;
  photo_id?: string | null;
}

export default function ProfileOverviewPage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isViewEmailOpen, setIsViewEmailOpen] = useState(false);
  const [isBookConsultOpen, setIsBookConsultOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [loadingOrderId, setLoadingOrderId] = useState<number | null>(null);
  const [emailModalKey, setEmailModalKey] = useState(0);
  const [emailPreset, setEmailPreset] = useState<{
    subject: string;
    body: string;
  } | null>(null);

  const { data: patientDashboardData, isLoading } = useQuery({
    queryKey: ["patientDashboardData"],
    queryFn: async () => {
      const response = await axiosSecure.get("/patient/dashboard");
      return response?.data?.data;
    },
  });

  const handleView = async (id: number) => {
    setLoadingOrderId(id);
    try {
      const res = await axiosSecure.get(`/view/order/${id}`);
      setSelectedOrderDetails(res?.data?.data);
      setIsOrderModalOpen(true);
    } catch {
      toast.error("Rezeptdetails konnten nicht geladen werden");
    } finally {
      setLoadingOrderId(null);
    }
  };

  const prescriptions = patientDashboardData?.allPrescription || [];

  // Fallback-Ableitung aus den Dashboard-Daten; nach Backend-Sync liefert
  // der Eligibility-Endpunkt diesen Zustand direkt (siehe follow-up/api.ts).
  const followUpEligibility = deriveEligibility(prescriptions);

  return (
    <ProfileDashboardLayout activeSection="overview" showActions={false}>
      <div className="space-y-8">
        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Latest Prescription Card */}
          <div className="rounded-card-sm bg-sage p-6 text-white overflow-hidden relative shadow-lg">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-24 bg-white/20" />
                <Skeleton className="h-8 w-48 bg-white/20" />
                <Skeleton className="h-4 w-32 bg-white/20 mt-4" />
              </div>
            ) : (
              <>
                <div className="absolute right-0 top-0 opacity-10">
                  <img
                    src={
                      prescriptions[0]?.photo_id ||
                      "/images/home/trust-hero.png"
                    }
                    alt=""
                    className="w-32 h-32 object-cover rounded-bl-3xl"
                  />
                </div>
                <div className="mb-8 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M9 13h6" />
                      <path d="M9 17h3" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium opacity-90">
                    Latest Prescription
                  </span>
                </div>
                <div className="space-y-1 relative z-10">
                  <p className="text-sm opacity-80">Medication</p>
                  <h3 className="text-2xl font-bold truncate">
                    {prescriptions[0]?.product?.name ||
                      "No active prescription"}
                  </h3>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                      {prescriptions[0]?.product?.category || "---"}
                    </span>
                    <span className="text-xs opacity-80">
                      ID: #{prescriptions[0]?.id || "000"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Status Card */}
          <div className="rounded-card-sm border border-neutral-200 bg-white p-6 shadow-sm">
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
            ) : (
              <>
                <div className="mb-8 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF7ED]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-neutral-500">
                    Current Status
                  </span>
                </div>
                <div className="space-y-1">
                  <h3
                    className={`text-3xl font-semibold ${
                      prescriptions[0]?.status === "Pending"
                        ? "text-[#F59E0B]"
                        : "text-[#10B981]"
                    }`}
                  >
                    {prescriptions[0]?.status || "No Status"}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {prescriptions[0]?.status === "Pending"
                      ? "Awaiting medical review"
                      : "Prescription is active"}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Total Prescriptions Card */}
          <div className="rounded-card-sm border border-neutral-200 bg-white p-6 shadow-sm">
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-10 w-12" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-neutral-500">
                    Total Requests
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-semibold text-neutral-900">
                    {prescriptions.length}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Total found in records
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Banners */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Rezept-/Folgerezept-CTA */}
          <FollowUpCtaCard
            eligibility={followUpEligibility}
            isLoading={isLoading}
          />

          {/* Need Help Banner */}
          <div className="rounded-card-sm border border-neutral-200 bg-white p-6">
            <div className="mb-2 flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1E3A2E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h4 className="text-lg font-semibold text-neutral-900">
                Need Help?
              </h4>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-neutral-500">
              If you have any questions about your prescription or treatment,
              please contact our support team.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsBookConsultOpen(true)}
                className="flex-1 rounded-xl bg-sage py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sage cursor-pointer"
              >
                Book Consultation
              </button>
              <button
                onClick={() => {
                  setEmailPreset(null);
                  setEmailModalKey((current) => current + 1);
                  setIsEmailModalOpen(true);
                }}
                className="flex-1 rounded-xl bg-[#F3F4F6] py-3.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 cursor-pointer"
              >
                Send Email
              </button>
              <button
                onClick={() => setIsViewEmailOpen(true)}
                className="flex-1 rounded-xl bg-[#F3F4F6] py-3.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 cursor-pointer"
              >
                View Email
              </button>
            </div>
          </div>
        </div>
        {/* Prescription Details Table */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="text-lg font-semibold text-neutral-900">
              Prescription Details
            </h4>
            <p className="text-sm text-neutral-500">
              View complete information about your current prescription
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-neutral-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F9FAFB] text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Medication</th>
                  <th className="px-6 py-4 font-medium text-center">
                    Category
                  </th>
                  <th className="px-6 py-4 font-medium text-center">Status</th>
                  <th className="px-6 py-4 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-6">
                        <Skeleton className="h-4 w-40" />
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="flex justify-center">
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="flex justify-center">
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="flex justify-center">
                          <Skeleton className="h-8 w-24 rounded-full" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : prescriptions.length > 0 ? (
                  prescriptions.map((prescription: prescriptionData) => (
                    <tr key={prescription.id}>
                      <td className="px-6 py-6 text-neutral-900 font-medium">
                        {prescription?.product?.name}
                      </td>
                      <td className="px-6 py-6 text-neutral-500 text-center">
                        {prescription?.product?.category}
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="flex justify-center">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                              prescription.status === "Pending"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                prescription.status === "Pending"
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                              }`}
                            />
                            {prescription.status}
                          </span>
                        </div>
                      </td>
                      <td
                        onClick={() => handleView(prescription.id)}
                        className="px-6 py-6 text-center"
                      >
                        <button
                          disabled={loadingOrderId === prescription.id}
                          className="flex items-center justify-center gap-2 rounded-full bg-sage px-6 py-2 text-xs font-semibold text-white transition-colors hover:bg-sage disabled:opacity-70 disabled:cursor-not-allowed min-w-20 mx-auto cursor-pointer"
                        >
                          {loadingOrderId === prescription.id ? (
                            <svg
                              className="h-4 w-4 animate-spin text-white"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          ) : (
                            "View"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-neutral-500"
                    >
                      No prescriptions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Send Email Modal */}
      <SendEmailModal
        key={emailModalKey}
        isOpen={isEmailModalOpen}
        onClose={() => {
          setIsEmailModalOpen(false);
          setEmailPreset(null);
        }}
        initialSubject={emailPreset?.subject}
        initialBody={emailPreset?.body}
      />
      {/* View Email Modal */}
      <ViewEmailModal
        isOpen={isViewEmailOpen}
        onClose={() => setIsViewEmailOpen(false)}
      />
      {/* Book Consultation Modal */}
      <BookConsultationModal
        isOpen={isBookConsultOpen}
        onClose={() => setIsBookConsultOpen(false)}
      />
      {/* View Order Modal */}
      <ViewOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        orderDetails={selectedOrderDetails}
      />
    </ProfileDashboardLayout>
  );
}
