import { Send, Globe } from "lucide-react";

const prescriptions = [
  {
    no: "01",
    requestId: "REQ101",
    patientId: "PAT101",
    name: "Anna Mueller",
    initials: "AM",
    color: "bg-orange-400",
    medication: "Semaglutide 2.4mg",
    date: "17 Feb 2026",
    status: "APPROVED",
    statusType: "approved",
  },
  {
    no: "02",
    requestId: "REQ102",
    patientId: "PAT102",
    name: "Thomas Schmidt",
    initials: "TS",
    color: "bg-gray-500",
    medication: "Semaglutide 1.7mg",
    date: "17 Feb 2026",
    status: "Pending",
    statusType: "pending",
  },
  {
    no: "03",
    requestId: "REQ103",
    patientId: "PAT103",
    name: "Maria Weber",
    initials: "MW",
    color: "bg-teal-500",
    medication: "Semaglutide 2.4mg",
    date: "17 Feb 2026",
    status: "Progress",
    statusType: "progress",
  },
  {
    no: "04",
    requestId: "REQ104",
    patientId: "PAT104",
    name: "Afroza",
    initials: "AF",
    color: "bg-green-500",
    medication: "Semaglutide 1.0mg",
    date: "17 Feb 2026",
    status: "Progress",
    statusType: "progress",
  },
  {
    no: "05",
    requestId: "REQ105",
    patientId: "PAT105",
    name: "Sultana",
    initials: "SU",
    color: "bg-green-400",
    medication: "Semaglutide 2.4mg",
    date: "17 Feb 2026",
    status: "Progress",
    statusType: "progress",
  },
  {
    no: "06",
    requestId: "REQ106",
    patientId: "PAT105",
    name: "Muniya",
    initials: "MU",
    color: "bg-orange-500",
    medication: "Semaglutide 2.4mg",
    date: "17 Feb 2026",
    status: "Progress",
    statusType: "progress",
  },
  {
    no: "07",
    requestId: "REQ107",
    patientId: "PAT105",
    name: "Julia Wagner",
    initials: "JW",
    color: "bg-blue-400",
    medication: "Semaglutide 2.4mg",
    date: "17 Feb 2026",
    status: "Progress",
    statusType: "progress",
  },
  {
    no: "08",
    requestId: "REQ108",
    patientId: "PAT105",
    name: "Betty Kuricov",
    initials: "BK",
    color: "bg-red-400",
    medication: "Semaglutide 2.4mg",
    date: "17 Feb 2026",
    status: "Progress",
    statusType: "progress",
  },
  {
    no: "09",
    requestId: "REQ109",
    patientId: "PAT105",
    name: "Romanov Ely",
    initials: "RE",
    color: "bg-purple-400",
    medication: "Semaglutide 2.4mg",
    date: "17 Feb 2026",
    status: "Progress",
    statusType: "progress",
  },
  {
    no: "10",
    requestId: "REQ110",
    patientId: "PAT105",
    name: "Jhon Lennon",
    initials: "JL",
    color: "bg-gray-600",
    medication: "Semaglutide 2.4mg",
    date: "17 Feb 2026",
    status: "Progress",
    statusType: "progress",
  },
];

const StatusBadge = ({ type, label }: { type: string; label: string }) => {
  if (type === "approved")
    return (
      <span className="text-sm font-semibold text-teal-600">APPROVED</span>
    );
  if (type === "pending")
    return (
      <span className="px-3 py-1 rounded-md bg-yellow-100 text-yellow-600 text-xs font-medium border border-yellow-200">
        {label}
      </span>
    );
  return (
    <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-500 text-xs font-medium border border-blue-200">
      {label}
    </span>
  );
};

export default function AdminBatchPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">
        Batch Processing
      </h1>
      <p className="text-sm text-neutral-500">
        Select approved prescriptions and send them for digital signature in
        batches
      </p>

      {/* Stats Row */}
      <div className="mt-6 flex items-stretch gap-4">
        {/* Selected Prescriptions */}
        <div className="bg-sage rounded-xl p-4.5 min-w-109.5">
          <p className="text-sm text-[#F9FAFB]">Selected Prescriptions</p>
          <p className="text-4xl font-bold text-white mt-2">0</p>
        </div>

        {/* Total Approved */}
        <div className="bg-white rounded-xl border border-neutral-200 p-4.5 min-w-109.5">
          <p className="text-sm text-neutral-500">Total Approved</p>
          <p className="text-4xl font-bold text-neutral-900 mt-2">8</p>
        </div>

        {/* Batch Limit */}
        <div className="bg-white rounded-xl border border-neutral-200 p-4.5 min-w-109.5">
          <p className="text-sm text-neutral-500">Batch Limit</p>
          <p className="text-4xl font-bold text-neutral-900 mt-2">50</p>
        </div>

        {/* Send for Signature button aligned right */}
        <div className="ml-auto flex items-center">
          <button className="flex items-center gap-2 bg-sage text-white text-sm font-medium px-5 py-3 rounded-xl hover:bg-[#1a3a3a] transition-colors whitespace-nowrap">
            <Send className="w-4 h-4" />
            Send for Signature (0)
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 bg-[#f0f9f6] border border-[#c8e6de] rounded-xl px-5 py-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-teal-700" />
          <p className="text-sm font-semibold text-neutral-900">
            How Batch Processing Works
          </p>
        </div>
        <ul className="text-sm text-neutral-500 space-y-1 ml-1">
          <li>• Select approved prescriptions from the list below</li>
          <li>• You can select up to 50 prescriptions per batch</li>
          <li>• Click "Send for Signature" to process the batch</li>
          <li>
            • All selected prescriptions will be sent for digital signature
          </li>
        </ul>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {/* Table Header Row */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <p className="text-base font-semibold text-neutral-900">
            Approved Prescriptions
          </p>
          <button className="text-sm text-neutral-500 hover:text-neutral-900">
            Select All
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 bg-white">
              <th className="px-6 py-3 w-10">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-2 py-3">
                No
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                Request ID
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                Patient ID
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                Patient Name ↑
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                Medication
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                Approval Date ↕
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                Status ↕
              </th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((row) => (
              <tr
                key={row.no}
                className="border-b border-neutral-200 last:border-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-2 py-4 text-sm text-neutral-500">{row.no}</td>
                <td className="px-4 py-4 text-sm text-neutral-900">
                  {row.requestId}
                </td>
                <td className="px-4 py-4 text-sm text-neutral-900">
                  {row.patientId}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full ${row.color} flex items-center justify-center text-white text-xs font-medium shrink-0`}
                    >
                      {row.initials}
                    </div>
                    <span className="text-sm text-neutral-900">{row.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-neutral-900">
                  {row.medication}
                </td>
                <td className="px-4 py-4 text-sm text-neutral-900">{row.date}</td>
                <td className="px-4 py-4">
                  <StatusBadge type={row.statusType} label={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
