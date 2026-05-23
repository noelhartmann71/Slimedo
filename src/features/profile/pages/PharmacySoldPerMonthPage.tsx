import { axiosSecure } from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface PharmacySoldData {
  product_id: number;
  product_name: string;
  dosages: string;
  total_amount: string;
  total_sold: number;
}

const PharmacySoldPerMonthPage = () => {
  const { data: pharmacySoldPerMonthData = [], isLoading } = useQuery<
    PharmacySoldData[]
  >({
    queryKey: ["pharmacySoldPerMonth"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        "/pharmacy/dashboard/soldpermonth",
      );
      return response?.data?.data;
    },
  });

  const formatAmount = (val: string | number) => {
    const numeric = typeof val === "string" ? parseFloat(val) : val;
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(numeric || 0);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Sold per month
          </h2>
        </div>
        <div className="overflow-x-auto text-nowrap">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F8F9FA]">
                {["#", "Name", "Dosage", "Total"].map((h) => (
                  <th
                    key={h}
                    className="whitespace-nowrap px-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-4" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                  </tr>
                ))
              ) : pharmacySoldPerMonthData.length > 0 ? (
                pharmacySoldPerMonthData.map((item, index) => (
                  <tr
                    key={item.product_id}
                    className="transition-colors duration-100 hover:bg-[#FAFBFC]"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {item.product_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.dosages || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {formatAmount(item.total_amount)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-gray-400"
                  >
                    Data not found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PharmacySoldPerMonthPage;
