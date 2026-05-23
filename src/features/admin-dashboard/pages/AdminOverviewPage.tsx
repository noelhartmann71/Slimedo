import {
  FileText,
  Ban,
  CheckCircle,
  XCircle,
  Share,
  ChevronDown,
  Calendar,
} from "lucide-react";

const AdminOverviewPage = () => {
  const stats = [
    {
      label: "Pending Requests",
      value: "1,247",
      trend: "+12%",
      trendLabel: "Vs.Letzter Monat",
      icon: FileText,
    },
    {
      label: "Verified Requests",
      value: "5.715",
      trend: "+5,715",
      trendLabel: "verified requests (All Time)",
      icon: FileText,
    },
    {
      label: "Blocked (Verification Missing)",
      value: "523",
      trend: "10.2% to 15.7%",
      trendLabel: "Visitor data obtained for the last 7 days from",
      icon: Ban,
    },
    {
      label: "Approved Today",
      value: "221",
      icon: CheckCircle,
    },
    {
      label: "Declined Today",
      value: "221",
      icon: XCircle,
    },
  ];

  const revenues = [
    {
      label: "Revenue Today",
      amount: "€210.00",
      subtext: "From 3 approved prescriptions",
      icon: "💎",
    },
    {
      label: "Revenue This Month",
      amount: "€8440.00",
      subtext: "February 2026",
      icon: "💰",
    },
  ];

  const requests = [
    {
      id: "PAT001",
      medication: "Semaglutide 2.4mg",
      date: "17 Feb 2026",
      availability: "Verified",
      statusType: "normal",
    },
    {
      id: "PAT002",
      medication: "Semaglutide 1.7mg",
      date: "17 Feb 2026",
      availability: "Verified",
      statusType: "normal",
    },
    {
      id: "PAT003",
      medication: "Semaglutide 2.4mg",
      date: "17 Feb 2026",
      availability: "Pending",
      statusType: "normal",
    },
    {
      id: "PAT004",
      medication: "Semaglutide 1.0mg",
      date: "17 Feb 2026",
      availability: "Pending",
      statusType: "normal",
    },
    {
      id: "PAT005",
      medication: "Semaglutide 2.4mg",
      date: "17 Feb 2026",
      availability: "Pre-screened: Eligible",
      statusType: "BLOCKED",
    },
    {
      id: "PAT006",
      medication: "General Surgeon",
      date: "17 Feb 2026",
      availability: "Verified",
      statusType: "normal",
    },
    {
      id: "PAT007",
      medication: "Endocrinologist",
      date: "17 Feb 2026",
      availability: "Pre-screened: Not Eligible",
      statusType: "normal",
    },
  ];

  const getAvailabilityStyle = (availability: string) => {
    switch (availability) {
      case "Verified":
        return "bg-[#E7F6EC] text-[#036B26]";
      case "Pending":
        return "bg-[#FFFAEB] text-[#B54708]";
      case "Pre-screened: Eligible":
        return "bg-[#FEF3F2] text-[#B42318]";
      case "Pre-screened: Not Eligible":
        return "bg-[#FEF3F2] text-[#B42318]";
      default:
        return "bg-[#F0F2F5] text-[#1D2739]";
    }
  };

  return (
    <div className="space-y-8 bg-[#F9FAFB] min-h-screen">
      {/* ── Header ── */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#101928] mb-1">
            Welcome back, Rahim
          </h1>
          <p className="text-sm text-[#667185]">
            there is the latest update for the last 7 days. check now
          </p>
        </div>
        <div className="flex gap-3">
          <button className="h-11 px-5 border border-[#E5E9EB] rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 bg-white text-[#101928]">
            Today <ChevronDown size={16} />
          </button>
          <button className="h-11 px-5 bg-[#29574E] text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#101928]">
            <Share size={16} /> Export
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl border border-[#E5E9EB] shadow-sm flex flex-col justify-between min-h-40 ${
              idx === 0 ? "bg-[#29574E] text-white" : "bg-white text-[#101928]"
            }`}
          >
            <div className="flex items-start gap-2">
              <stat.icon
                size={16}
                className={`mt-0.5 shrink-0 ${
                  idx === 0 ? "text-white/70" : "text-[#667185]"
                }`}
              />
              <span
                className={`text-[12px] font-semibold leading-tight ${
                  idx === 0 ? "text-white/90" : "text-[#667185]"
                }`}
              >
                {stat.label}
              </span>
            </div>

            <div>
              <div className="text-3xl font-bold leading-none mb-2">
                {stat.value}
              </div>
              {stat.trend && (
                <div className="flex items-center gap-1 flex-wrap">
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      idx === 0
                        ? "bg-white/10 text-white"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {stat.trend}
                  </span>
                  <span
                    className={`text-[10px] leading-tight ${
                      idx === 0 ? "text-white/60" : "text-[#667185]"
                    }`}
                  >
                    {stat.trendLabel}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Revenue Cards ── */}
      <div className="grid grid-cols-2 gap-4">
        {revenues.map((rev, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl border border-[#E5E9EB] shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">{rev.icon}</span>
              <span className="text-[12px] font-semibold text-[#667185]">
                {rev.label}
              </span>
            </div>
            <div className="text-3xl font-bold text-[#29574E]">
              {rev.amount}
            </div>
            <div className="text-[12px] text-[#667185] mt-1">{rev.subtext}</div>
          </div>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl border border-[#E5E9EB] shadow-sm">
        <div className="p-6 border-b border-[#E5E9EB]">
          <h2 className="text-lg font-bold text-[#101928]">
            Incoming Prescription Requests
          </h2>
          <p className="text-sm text-[#667185]">
            Review and process prescription requests from patients
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F9FAFB] text-[11px] uppercase tracking-wider text-[#667185]">
                <th className="px-6 py-4 font-semibold">Patient ID</th>
                <th className="px-6 py-4 font-semibold">Call Request</th>
                <th className="px-6 py-4 font-semibold">
                  Requested Medication
                </th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Availability</th>
                <th className="px-6 py-4 font-semibold text-center">
                  Eligibility Result
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {requests.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-t border-[#F0F2F5] transition-colors ${
                    row.statusType === "BLOCKED"
                      ? "bg-[#FEF3F2] hover:bg-[#fde8e7]"
                      : "hover:bg-[#F9FAFB]"
                  }`}
                >
                  {/* Patient ID */}
                  <td className="px-6 py-5 font-semibold text-[#101928]">
                    {row.id}
                  </td>

                  {/* Call Request */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#667185] shrink-0" />
                      <div className="text-[13px] leading-snug">
                        <span className="font-semibold text-[#101928]">
                          Thursday
                        </span>{" "}
                        <span className="text-[#667185]">Mar 5</span>
                        <br />
                        <span className="text-[#667185]">09am</span>
                      </div>
                    </div>
                  </td>

                  {/* Medication */}
                  <td className="px-6 py-5 font-semibold text-[#101928]">
                    {row.medication}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-[#667185] text-[16px]">
                    {row.date}
                  </td>

                  {/* Availability Badge */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[14px] font-bold whitespace-nowrap ${getAvailabilityStyle(
                        row.availability,
                      )}`}
                    >
                      {row.availability}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td className="px-6 py-5 text-center">
                    <button
                      className={`h-9 px-24.5 rounded-[100px] text-[14px] font-semibold transition-colors ${
                        row.statusType === "BLOCKED"
                          ? "bg-[#EF4444] text-white hover:bg-[#D92D20]"
                          : "bg-[#29574E] text-white hover:bg-[#101928]"
                      }`}
                    >
                      {row.statusType === "BLOCKED" ? "BLOCKED" : "Review"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="p-6 border-t border-[#E5E9EB]">
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 rounded-full border border-[#E5E9EB] flex items-center justify-center hover:bg-gray-50 bg-white">
              <ChevronDown size={13} className="rotate-90 text-[#667185]" />
            </button>
            {[1, 2].map((n) => (
              <button
                key={n}
                className={`h-8 w-8 rounded-full text-[13px] font-medium ${
                  n === 1
                    ? "bg-[#1D2739] text-white font-bold"
                    : "text-[#667185] hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="text-[#667185] px-1">...</span>
            {[10, 11].map((n) => (
              <button
                key={n}
                className="h-8 w-8 rounded-full text-[#667185] text-[13px] font-medium hover:bg-gray-50"
              >
                {n}
              </button>
            ))}
            <button className="h-8 w-8 rounded-full border border-[#E5E9EB] flex items-center justify-center hover:bg-gray-50 bg-white">
              <ChevronDown size={13} className="-rotate-90 text-[#667185]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
