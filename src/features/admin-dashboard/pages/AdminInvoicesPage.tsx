import {
  Download,
  ChevronDown,
  Calendar,
  Filter,
  FileText,
} from "lucide-react";

const invoices = [
  {
    no: "01",
    invoiceNumber: "SLM-2026-02-002",
    date: "17 Feb 2026",
    prescriptions: "35 prescriptions",
    amount: "€2,450.00",
    status: "Paid",
    statusType: "paid",
  },
  {
    no: "02",
    invoiceNumber: "SLM-2026-02-002",
    date: "17 Feb 2026",
    prescriptions: "27 prescriptions",
    amount: "€2,450.00",
    status: "Pending",
    statusType: "pending",
  },
  {
    no: "03",
    invoiceNumber: "SLM-2026-02-002",
    date: "17 Feb 2026",
    prescriptions: "45 prescriptions",
    amount: "€2,450.00",
    status: "Paid",
    statusType: "paid",
  },
  {
    no: "04",
    invoiceNumber: "SLM-2026-02-002",
    date: "17 Feb 2026",
    prescriptions: "30 prescriptions",
    amount: "€2,450.00",
    status: "Paid",
    statusType: "paid",
  },
  {
    no: "05",
    invoiceNumber: "SLM-2026-02-002",
    date: "17 Feb 2026",
    prescriptions: "25 prescriptions",
    amount: "€2,450.00",
    status: "Paid",
    statusType: "paid",
  },
  {
    no: "06",
    invoiceNumber: "SLM-2026-02-002",
    date: "17 Feb 2026",
    prescriptions: "40 prescriptions",
    amount: "€2,450.00",
    status: "Paid",
    statusType: "paid",
  },
  {
    no: "07",
    invoiceNumber: "SLM-2026-02-002",
    date: "17 Feb 2026",
    prescriptions: "40 prescriptions",
    amount: "€2,450.00",
    status: "Paid",
    statusType: "paid",
  },
  {
    no: "08",
    invoiceNumber: "SLM-2026-02-002",
    date: "17 Feb 2026",
    prescriptions: "40 prescriptions",
    amount: "€2,450.00",
    status: "Paid",
    statusType: "paid",
  },
  {
    no: "09",
    invoiceNumber: "SLM-2026-02-002",
    date: "17 Feb 2026",
    prescriptions: "40 prescriptions",
    amount: "€2,450.00",
    status: "Paid",
    statusType: "paid",
  },
  {
    no: "10",
    invoiceNumber: "SLM-2026-02-002",
    date: "17 Feb 2026",
    prescriptions: "40 prescriptions",
    amount: "€2,450.00",
    status: "Paid",
    statusType: "paid",
  },
];

const StatusBadge = ({ type, label }: { type: string; label: string }) => {
  if (type === "paid")
    return (
      <span className="px-4 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-medium border border-teal-200">
        {label}
      </span>
    );
  return (
    <span className="px-4 py-1 rounded-full bg-yellow-50 text-yellow-600 text-xs font-medium border border-yellow-200">
      {label}
    </span>
  );
};

export default function AdminInvoicesPage() {
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
        <div className="bg-sage rounded-xl px-6 py-4 w-full">
          <p className="text-xs text-gray-300">Total Revenue</p>
          <p className="text-3xl font-bold text-white mt-2">€14,140,00</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 px-6 py-4 w-full">
          <p className="text-xs text-neutral-500">Paid</p>
          <p className="text-3xl font-bold text-neutral-900 mt-2">€12,040,00</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 px-6 py-4 w-full">
          <p className="text-xs text-neutral-500">Pending</p>
          <p className="text-3xl font-bold text-neutral-900 mt-2">€2,100,00</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 px-6 py-4 w-full">
          <p className="text-xs text-neutral-500">Total Invoices</p>
          <p className="text-3xl font-bold text-neutral-900 mt-2">6</p>
        </div>
      </div>

      {/* Filters + Actions Row */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {/* Left Filters */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-500 bg-white hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            All Months
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-500 bg-white hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            All Statuses
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-sage text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#0f2a2a] transition-colors whitespace-nowrap">
            <Download className="w-4 h-4" />
            Download Monthly Summary
          </button>
          <button className="flex items-center gap-2 border border-neutral-200 bg-sage text-sm text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-50 whitespace-nowrap">
            Monthly
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                No
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                Invoice Number
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                Date
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                Prescriptions
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                Amount
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                Actions
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">
                <span className="flex items-center gap-1">
                  Actions <ChevronDown className="w-3 h-3" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((row) => (
              <tr
                key={row.no}
                className="border-b border-neutral-200 last:border-0 hover:bg-gray-50"
              >
                <td className="px-4 py-4 text-sm text-neutral-500">{row.no}</td>
                <td className="px-4 py-4 text-sm text-neutral-900">
                  {row.invoiceNumber}
                </td>
                <td className="px-4 py-4 text-sm text-neutral-900">{row.date}</td>
                <td className="px-4 py-4 text-sm text-neutral-900">
                  {row.prescriptions}
                </td>
                <td className="px-4 py-4 text-sm text-neutral-900">
                  {row.amount}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge type={row.statusType} label={row.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-sm text-neutral-900 font-medium hover:text-teal-700 transition-colors">
                      <FileText className="w-4 h-4 text-neutral-500" />
                      DOWNLOAD
                    </button>
                    <button className="text-neutral-500 hover:text-neutral-900 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
