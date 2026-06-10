import {
  Search,
  ChevronDown,
  Users,
  ShieldCheck,
  Briefcase,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const patients = [
  {
    name: "Max Mustermann",
    sub: "Max Mustermann",
    dob: "12.04.1985",
    caseStatus: "Active",
    caseType: "active",
    idVerification: "Verified",
    idType: "verified",
    lastConsultation: "12.04.1985",
  },
  {
    name: "Max Mustermann",
    sub: "Max Mustermann",
    dob: "12.04.1985",
    caseStatus: "Active",
    caseType: "active",
    idVerification: "Verified",
    idType: "verified",
    lastConsultation: "12.04.1985",
  },
  {
    name: "Max Mustermann",
    sub: "Max Mustermann",
    dob: "12.04.1985",
    caseStatus: "Completed",
    caseType: "completed",
    idVerification: "Verified",
    idType: "verified",
    lastConsultation: "12.04.1985",
  },
  {
    name: "Max Mustermann",
    sub: "Max Mustermann",
    dob: "12.04.1985",
    caseStatus: "Completed",
    caseType: "completed",
    idVerification: "Verified",
    idType: "verified",
    lastConsultation: "12.04.1985",
  },
  {
    name: "Max Mustermann",
    sub: "Max Mustermann",
    dob: "12.04.1985",
    caseStatus: "Blocked",
    caseType: "blocked",
    idVerification: "Failed",
    idType: "failed",
    lastConsultation: "12.04.1985",
  },
];

const CaseStatusBadge = ({ type, label }: { type: string; label: string }) => {
  if (type === "active")
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-200">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
        {label}
      </span>
    );
  if (type === "completed")
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium border border-gray-200">
        <Clock className="w-3 h-3" />
        {label}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium border border-red-200">
      <AlertTriangle className="w-3 h-3" />
      {label}
    </span>
  );
};

const IDVerificationBadge = ({
  type,
  label,
}: {
  type: string;
  label: string;
}) => {
  if (type === "verified")
    return (
      <span className="inline-flex items-center gap-1 text-green-600 text-sm">
        <CheckCircle className="w-4 h-4" />
        {label}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-red-400 text-sm">
      <XCircle className="w-4 h-4" />
      {label}
    </span>
  );
};

export default function AdminPatientsPage() {
  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#101928] mb-1">
        Good Morning, Jorina joru
      </h1>
      <p className="text-sm text-[#667185]">
        Welcome back, Dr. Sarah Weber. Here's your practice summary for today.
      </p>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        {[
          {
            icon: <Users className="w-5 h-5 text-[#667185]" />,
            value: 3,
            label: "Total Patients",
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#667185]" />,
            value: 2,
            label: "Verified Identities",
          },
          {
            icon: <Briefcase className="w-5 h-5 text-[#667185]" />,
            value: 1,
            label: "Active Cases",
          },
          {
            icon: <Clock className="w-5 h-5 text-[#667185]" />,
            value: 0,
            label: "Pending Verification",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[#E5E9EB] px-5 py-4"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-[#101928]">{stat.value}</p>
            <p className="text-xs text-[#667185] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Legal Notice */}
      <div className="mt-4 bg-[#f4f9f7] border border-[#d4e9e0] rounded-xl px-5 py-4">
        <p className="text-sm font-semibold text-[#101928] mb-1">
          Legal Archiving & Data Protection Notice
        </p>
        <p className="text-xs text-[#667185] leading-relaxed">
          All patient records are stored in compliance with Ärztekammer
          guidelines, GDPR Article 9, and German medical data retention
          requirements. Records cannot be deleted and are accessible only to
          authorized medical personnel.
        </p>
      </div>

      {/* Table Card */}
      <div className="mt-4 bg-white rounded-xl border border-[#E5E9EB] overflow-hidden">
        {/* Filters */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E5E9EB]">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
            <input
              type="text"
              placeholder="Search by name, ID, or insurance number..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-[#E5E9EB] rounded-lg text-[#667185] placeholder:text-[#98A2B3] focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <button className="flex items-center gap-2 border border-[#E5E9EB] rounded-lg px-3 py-2 text-sm text-[#667185] bg-white hover:bg-gray-50">
            Case Status <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 border border-[#E5E9EB] rounded-lg px-3 py-2 text-sm text-[#667185] bg-white hover:bg-gray-50">
            All Verification <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E9EB]">
              <th className="w-8 px-4 py-3"></th>
              <th className="text-left text-xs font-medium text-[#667185] px-4 py-3">
                Patient Information
              </th>
              <th className="text-left text-xs font-medium text-[#667185] px-4 py-3">
                Date of Birth
              </th>
              <th className="text-left text-xs font-medium text-[#667185] px-4 py-3">
                Case Status
              </th>
              <th className="text-left text-xs font-medium text-[#667185] px-4 py-3">
                ID Verification
              </th>
              <th className="text-left text-xs font-medium text-[#667185] px-4 py-3">
                Last Consultation
              </th>
              <th className="text-left text-xs font-medium text-[#667185] px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[#E5E9EB] last:border-0 hover:bg-gray-50"
              >
                <td className="px-4 py-4">
                  <input
                    type="radio"
                    name="patient"
                    className="accent-teal-700"
                  />
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-[#101928]">
                    {row.name}
                  </p>
                  <p className="text-xs text-[#98A2B3]">{row.sub}</p>
                </td>
                <td className="px-4 py-4 text-sm text-[#101928]">{row.dob}</td>
                <td className="px-4 py-4">
                  <CaseStatusBadge type={row.caseType} label={row.caseStatus} />
                </td>
                <td className="px-4 py-4">
                  <IDVerificationBadge
                    type={row.idType}
                    label={row.idVerification}
                  />
                </td>
                <td className="px-4 py-4 text-sm text-[#101928]">
                  {row.lastConsultation}
                </td>
                <td className="px-4 py-4">
                  <button className="bg-sage text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#0f2a2a] transition-colors whitespace-nowrap">
                    View File
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E5E9EB]">
          <button className="px-4 py-2 text-sm text-[#667185] border border-[#E5E9EB] rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 text-sm text-white bg-sage rounded-lg hover:bg-[#0f2a2a] transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
