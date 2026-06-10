export default function PharmacyOrderListPage() {
  const orders = [
    {
      id: "ORD-2026-002",
      medication: "Semaglutide 0.25mg",
      quantity: 1,
      clientName: "John Doe",
      clientEmail: "john.doe@example.com",
      date: "2026-03-02",
      status: "Pending",
    },
    {
      id: "ORD-2026-002",
      medication: "Semaglutide 0.25mg",
      quantity: 1,
      clientName: "John Doe",
      clientEmail: "john.doe@example.com",
      date: "2026-03-02",
      status: "Processing",
    },
    {
      id: "ORD-2026-002",
      medication: "Semaglutide 0.25mg",
      quantity: 1,
      clientName: "John Doe",
      clientEmail: "john.doe@example.com",
      date: "2026-03-02",
      status: "Completed",
    },
    {
      id: "ORD-2026-002",
      medication: "Semaglutide 0.25mg",
      quantity: 1,
      clientName: "John Doe",
      clientEmail: "john.doe@example.com",
      date: "2026-03-02",
      status: "Completed",
    },
    {
      id: "ORD-2026-002",
      medication: "Semaglutide 0.25mg",
      quantity: 1,
      clientName: "Name",
      clientEmail: "",
      date: "2026-03-02",
      status: "Processing",
    },
  ] as const;

  const getStatusClassName = (status: (typeof orders)[number]["status"]) => {
    if (status === "Pending") {
      return "bg-[#F59E0B]";
    }

    if (status === "Processing") {
      return "bg-[#2563EB]";
    }

    return "bg-[#22C55E]";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-black text-[22px]">
          Latest Order
        </h2>
        <p className="text-sm font-normal text-neutral-500">
          View the latest order list
        </p>
      </div>

      <div className="overflow-hidden overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full min-w-245 border-collapse text-left">
          <thead className="bg-[#D8DDDC]">
            <tr>
              <th className="px-5 py-3 text-center text-[14px] font-medium text-neutral-700">
                Order ID
              </th>
              <th className="px-5 py-3 text-center text-[14px] font-medium text-neutral-700">
                Medication
              </th>
              <th className="px-5 py-3 text-center text-[14px] font-medium text-neutral-700">
                Quantity
              </th>
              <th className="px-5 py-3 text-center text-[14px] font-medium text-neutral-700">
                Client Name
              </th>
              <th className="px-5 py-3 text-center text-[14px] font-medium text-neutral-700">
                Date
              </th>
              <th className="px-5 py-3 text-center text-[14px] font-medium text-neutral-700">
                Status
              </th>
              <th className="px-5 py-3 text-center text-[14px] font-medium text-neutral-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={`${order.id}-${index}`}
                className="border-b border-[#EEF1F3] last:border-b-0"
              >
                <td className="px-5 py-4 text-center text-[16px] font-normal text-neutral-500">
                  {order.id}
                </td>
                <td className="px-5 py-4 text-center text-[16px] font-normal text-neutral-500">
                  {order.medication}
                </td>
                <td className="px-5 py-4 text-center text-[16px] font-normal text-neutral-500">
                  {order.quantity}
                </td>
                <td className="px-5 py-4 text-center">
                  <p className="text-[16px] font-medium text-[#5A6472]">
                    {order.clientName}
                  </p>
                  {order.clientEmail ? (
                    <p className="mt-0.5 text-[11px] font-medium text-[#8A94A5]">
                      {order.clientEmail}
                    </p>
                  ) : null}
                </td>
                <td className="px-5 py-4 text-center text-[16px] font-normal text-neutral-500">
                  {order.date}
                </td>
                <td className="px-5 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold text-white ${getStatusClassName(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-2.5">
                    <button className="h-8 min-w-14 rounded-full bg-sage px-4 text-[11px] font-medium text-white transition-colors hover:bg-sage">
                      View
                    </button>
                    <button
                      className="text-neutral-500 transition-colors hover:text-deep"
                      aria-label="Download order"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
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
