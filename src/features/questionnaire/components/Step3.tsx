import { axiosPublic } from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

interface Step3Props {
  exclusion: "yes" | "no" | null;
  setExclusion: (v: "yes" | "no" | null) => void;
  otherMedications: string;
  setOtherMedications: (v: string) => void;
}

export const Step3 = ({
  exclusion,
  setExclusion,
  otherMedications,
  setOtherMedications,
}: Step3Props) => {
  localStorage.setItem("exclusion_criteria_note", otherMedications || "null");
  // This is the Exclusion criteria
  const { data: exclusionCriteria = [], isLoading } = useQuery({
    queryKey: ["exclusion_criteria"],
    queryFn: async () => {
      const response = await axiosPublic.get(
        "/questionary?search=exclusion_criteria",
      );
      return response?.data?.data;
    },
  });

  console.log("Exclusion criteria data:", exclusionCriteria?.data);
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-[12px] font-semibold text-gray-600">
          3\4
        </span>
        <span className="text-[15px] font-semibold text-gray-900">
          Exclusion criteria
        </span>
      </div>
      <p className="text-[13px] text-gray-500 mb-4">
        I confirm that I do not suffer from any of the following diseases:
      </p>
      {/* This is the list of exclusion criteria */}
      <ul className="flex flex-col gap-2 mb-6">
        {isLoading
          ? // Skeleton items
            Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="flex items-start gap-2 animate-pulse">
                <span className="mt-1.25 w-1 h-1 rounded-full bg-gray-200 shrink-0" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </li>
            ))
          : exclusionCriteria?.data?.map(
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
            setExclusion("no");
            localStorage.setItem("exclusion_criteria", "0");
          }}
          className={`flex-1 py-3 rounded-xl border text-[13px] font-medium cursor-pointer transition-colors ${
            exclusion === "no"
              ? "border-red-300 bg-red-50 text-red-600"
              : "border-red-200 bg-red-50/60 text-red-500 hover:bg-red-50"
          }`}
        >
          No, that's not the case
        </button>
        <button
          onClick={() => {
            setExclusion("yes");
            localStorage.setItem("exclusion_criteria", "1");
          }}
          className={`flex-1 py-3 rounded-xl text-[13px] font-medium cursor-pointer transition-colors ${
            exclusion === "yes"
              ? "bg-[#227C31] text-white"
              : "bg-[#227C31]/80 text-white hover:bg-[#227C31]"
          }`}
        >
          Yes, that's correct.
        </button>
      </div>
      {exclusion === "no" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-[14px] font-medium text-center">
            Du bist leider nicht für diese Therapie geeignet.
          </p>
        </div>
      )}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mt-3">
        <div className="flex items-start gap-4">
          <textarea
            value={otherMedications}
            onChange={(e) => setOtherMedications(e.target.value)}
            placeholder="Take any other medicament"
            rows={4}
            className="flex-1 min-h-20 resize-none bg-transparent outline-none text-[15px] text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>
    </>
  );
};
