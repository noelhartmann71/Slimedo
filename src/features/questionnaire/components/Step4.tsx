import { axiosPublic } from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

interface Step4Props {
  medications: "yes" | "no" | null;
  setMedications: (v: "yes" | "no" | null) => void;
}

export const Step4 = ({ medications, setMedications }: Step4Props) => {
  // This is the Incompatible medications
  const { data: incompatibleMedications = [], isLoading } = useQuery({
    queryKey: ["incompitable_medications"],
    queryFn: async () => {
      const response = await axiosPublic.get(
        "/questionary?search=incompitable_medications",
      );
      return response?.data?.data;
    },
  });

  console.log("Incompatible medications data:", incompatibleMedications?.data);

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-[12px] font-semibold text-gray-600">
          4/4
        </span>
        <span className="text-[15px] font-semibold text-gray-900">
          {isLoading ? (
            <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
          ) : (
            incompatibleMedications?.question || "Incompatible medications"
          )}
        </span>
      </div>
      <div className="text-[13px] text-gray-500 mb-4">
        {isLoading ? (
          <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
        ) : (
          incompatibleMedications?.description ||
          "I confirm that I am not taking any of the following medications:"
        )}
      </div>

      {/* This is the list of incompatible medications */}
      <ul className="flex flex-col gap-2 mb-6">
        {isLoading
          ? // Skeleton items
            Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="flex items-start gap-2 animate-pulse">
                <span className="mt-1.25 w-1 h-1 rounded-full bg-gray-200 shrink-0" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </li>
            ))
          : incompatibleMedications?.data?.map(
              (item: { id: string; option: string }) => (
                <li
                  key={item?.id}
                  className="flex items-start gap-2 text-[13px] text-gray-600"
                >
                  <span className="mt-1.25 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                  {item?.option}
                </li>
              ),
            )}
      </ul>

      <div className="flex gap-3">
        <button
          onClick={() => {
            setMedications("no");
            localStorage.setItem("incompitable_medication", "0");
          }}
          className={`flex-1 py-3 rounded-xl border text-[13px] font-medium cursor-pointer transition-colors ${
            medications === "no"
              ? "border-red-300 bg-red-50 text-red-600"
              : "border-red-200 bg-red-50/60 text-red-500 hover:bg-red-50"
          }`}
        >
          No, I'm taking medication
        </button>
        <button
          onClick={() => {
            setMedications("yes");
            localStorage.setItem("incompitable_medication", "1");
          }}
          className={`flex-1 py-3 rounded-xl text-[13px] font-medium cursor-pointer transition-colors ${
            medications === "yes"
              ? "bg-[#227C31] text-white"
              : "bg-[#227C31]/80 text-white hover:bg-[#227C31]"
          }`}
        >
          Yes, I confirm
        </button>
      </div>

      {medications === "no" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-[14px] font-medium text-center">
            Du bist leider nicht für diese Therapie geeignet.
          </p>
        </div>
      )}
    </>
  );
};
