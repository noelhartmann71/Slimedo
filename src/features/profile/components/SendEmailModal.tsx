import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { X } from "lucide-react";

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
  initialBody?: string;
}

export default function SendEmailModal({
  isOpen,
  onClose,
  initialSubject = "",
  initialBody = "",
}: SendEmailModalProps) {
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const axiosSecure = useAxiosSecure();

  const { mutate: sendEmail, isPending } = useMutation({
    mutationFn: async (payload: { subject: string; body: string }) => {
      const response = await axiosSecure.post("/send-email", payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Email sent successfully!");
      setSubject(initialSubject);
      setBody(initialBody);
      onClose();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to send email");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    sendEmail({ subject, body });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <h2 className="mb-4 text-xl font-semibold text-[#111827]">
          Send Email
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="subject"
              className="text-sm font-medium text-[#374151]"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
              className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:border-[#4A645D] focus:outline-none focus:ring-2 focus:ring-[#4A645D]/10"
            />
          </div>

          {/* Body Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="body"
              className="text-sm font-medium text-[#374151]"
            >
              Message
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter email message"
              rows={4}
              className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:border-[#4A645D] focus:outline-none focus:ring-2 focus:ring-[#4A645D]/10 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-[#E5E7EB] bg-white py-2.5 text-sm font-semibold text-[#374151] transition-colors hover:bg-[#F9FAFB] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-lg bg-[#4A645D] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3d524c] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "Sending..." : "Send Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
