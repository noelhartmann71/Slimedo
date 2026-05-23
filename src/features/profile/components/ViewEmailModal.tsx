import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type ViewEmailModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ViewEmailModal({
  isOpen,
  onClose,
}: ViewEmailModalProps) {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["emailHistory"],
    queryFn: async () => {
      const res = await axiosSecure.get("/email-history");
      return res?.data?.data?.data || [];
    },
    enabled: false,
  });

  useEffect(() => {
    if (isOpen) refetch();
  }, [isOpen, refetch]);

  const email = Array.isArray(data) && data.length > 0 ? data[0] : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-4 text-xl font-semibold text-[#111827]">
          View Email
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-5 w-24" />
          </div>
        ) : email ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-[#374151]">Subject</h3>
              <p className="text-[#111827]">{email.subject}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#374151]">Message</h3>
              <div className="prose max-w-none text-[#111827]">
                {email.body}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#374151]">Status</h3>
              <span className="inline-block rounded-full bg-[#F3F4F6] px-3 py-1 text-sm font-semibold text-[#374151]">
                {email.status}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-[#6B7280]">No emails found.</div>
        )}
      </div>
    </div>
  );
}
