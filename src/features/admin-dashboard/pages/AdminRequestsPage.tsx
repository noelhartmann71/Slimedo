import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const prescriptionRequests = [
  {
    id: "PAT001",
    callDay: "Thursday",
    callTime: "09am",
    callDate: "Mar 5",
    medication: "Semaglutide 2.4mg",
    date: "17 Feb 2026",
    availability: "Verified",
    availabilityType: "verified",
    action: "Review",
    actionType: "review",
  },
  {
    id: "PAT002",
    callDay: "Thursday",
    callTime: "09am",
    callDate: "Mar 5",
    medication: "Semaglutide 1.7mg",
    date: "17 Feb 2026",
    availability: "Verified",
    availabilityType: "verified",
    action: "Review",
    actionType: "review",
  },
  {
    id: "PAT003",
    callDay: "Thursday",
    callTime: "09am",
    callDate: "Mar 5",
    medication: "Semaglutide 2.4mg",
    date: "17 Feb 2026",
    availability: "Pending",
    availabilityType: "pending",
    action: "Review",
    actionType: "review",
  },
  {
    id: "PAT004",
    callDay: "Thursday",
    callTime: "09am",
    callDate: "Mar 5",
    medication: "Semaglutide 1.0mg",
    date: "17 Feb 2026",
    availability: "Pending",
    availabilityType: "pending",
    action: "Review",
    actionType: "review",
  },
  {
    id: "PAT005",
    callDay: "Thursday",
    callTime: "09am",
    callDate: "Mar 5",
    medication: "Semaglutide 2.4mg",
    date: "17 Feb 2026",
    availability: "Pre-screened: Eligible",
    availabilityType: "eligible",
    action: "BLOCKED",
    actionType: "blocked",
    highlight: true,
  },
  {
    id: "PAT006",
    callDay: "Thursday",
    callTime: "09am",
    callDate: "Mar 5",
    medication: "General Surgeon",
    date: "17 Feb 2026",
    availability: "Verified",
    availabilityType: "verified",
    action: "Review",
    actionType: "review",
  },
  {
    id: "PAT007",
    callDay: "Thursday",
    callTime: "09am",
    callDate: "Mar 5",
    medication: "Endocrinologist",
    date: "17 Feb 2026",
    availability: "Pre-screened: Not Eligible",
    availabilityType: "not-eligible",
    action: "Review",
    actionType: "review",
  },
];

const AvailabilityBadge = ({
  type,
  label,
}: {
  type: string;
  label: string;
}) => {
  const styles: Record<string, string> = {
    verified: "text-teal-500",
    pending: "text-yellow-500",
    eligible: "bg-pink-100 text-pink-500 px-3 py-1 rounded-full text-xs",
    "not-eligible": "text-teal-400 text-xs",
  };
  return <span className={styles[type]}>{label}</span>;
};

const ActionButton = ({ type, label }: { type: string; label: string }) => {
  if (type === "blocked") {
    return (
      <button className="w-full rounded-full bg-red-500 px-6 py-2 text-sm font-semibold text-white">
        {label}
      </button>
    );
  }
  return (
    <button className="w-full rounded-full bg-[#1a3a3a] px-6 py-2 text-sm font-medium text-white hover:bg-[#0f2a2a] transition-colors">
      {label}
    </button>
  );
};

export default function AdminRequestsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#101928] mb-1">
        Incoming Prescription Requests
      </h1>
      <p className="text-sm text-[#667185]">
        Review and process prescription requests from patients
      </p>

      <div className="mt-8 bg-white rounded-xl border border-[#E5E9EB] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E9EB]">
              <th className="text-left text-sm font-medium text-[#667185] px-6 py-4">
                Patient ID
              </th>
              <th className="text-left text-sm font-medium text-[#667185] px-6 py-4">
                Call Request
              </th>
              <th className="text-left text-sm font-medium text-[#667185] px-6 py-4">
                Requested Medication
              </th>
              <th className="text-left text-sm font-medium text-[#667185] px-6 py-4">
                Date
              </th>
              <th className="text-left text-sm font-medium text-[#667185] px-6 py-4">
                Availability
              </th>
              <th className="text-left text-sm font-medium text-[#667185] px-6 py-4">
                Eligibility Result
              </th>
            </tr>
          </thead>
          <tbody>
            {prescriptionRequests.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-[#E5E9EB] last:border-0 ${
                  row.highlight ? "bg-red-50" : ""
                }`}
              >
                {/* Patient ID */}
                <td className="px-6 py-5 text-sm font-medium text-[#101928]">
                  {row.id}
                </td>

                {/* Call Request */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#667185]" />
                    <div className="flex items-center gap-1">
                      <div>
                        <span className="text-sm text-[#101928]">
                          {row.callDay}
                        </span>
                        <br />
                        <span className="text-sm text-[#101928]">
                          {row.callTime}
                        </span>
                      </div>
                      <span className="ml-2 text-xs text-[#667185]">
                        {row.callDate}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Requested Medication */}
                <td className="px-6 py-5 text-sm text-[#101928]">
                  {row.medication}
                </td>

                {/* Date */}
                <td className="px-6 py-5 text-sm text-[#101928]">{row.date}</td>

                {/* Availability */}
                <td className="px-6 py-5 text-sm">
                  <AvailabilityBadge
                    type={row.availabilityType}
                    label={row.availability}
                  />
                </td>

                {/* Eligibility Result */}
                <td className="px-6 py-5">
                  <ActionButton type={row.actionType} label={row.action} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center gap-1 px-6 py-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E5E9EB] text-[#667185] hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#1a3a3a] text-white text-sm font-medium">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm text-[#667185] hover:bg-gray-50">
            2
          </button>
          <span className="w-8 h-8 flex items-center justify-center text-sm text-[#667185]">
            ...
          </span>
          <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm text-[#667185] hover:bg-gray-50">
            10
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm text-[#667185] hover:bg-gray-50">
            11
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E5E9EB] text-[#667185] hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
