import { useQuery } from "@tanstack/react-query";
import ComorbiditiesStep from "../pages/ComorbiditiesStep";
import { axiosPublic } from "@/hooks/useAxiosPublic";
import { Skeleton } from "@/components/ui/skeleton";

interface Step2Props {
  showComorbiditiesInStep2: boolean;
  hasComorbidities: "yes" | "no" | null;
  setHasComorbidities: (v: "yes" | "no" | null) => void;
  selectedSubstances: string[];
  setSelectedSubstances: React.Dispatch<React.SetStateAction<string[]>>;
  additionalNote: string;
  setAdditionalNote: (v: string) => void;
  hasAllergies: "Yes" | "No" | null;
  setHasAllergies: (v: "Yes" | "No" | null) => void;
}

export const Step2 = ({
  showComorbiditiesInStep2,
  hasComorbidities,
  setHasComorbidities,
  selectedSubstances,
  setSelectedSubstances,
  additionalNote,
  setAdditionalNote,
  hasAllergies,
  setHasAllergies,
}: Step2Props) => {
  localStorage.setItem("allergies", hasAllergies || "null");
  // This is the allergies
  const { data: allergies = [], isLoading } = useQuery({
    queryKey: ["allergies"],
    queryFn: async () => {
      const response = await axiosPublic.get("/questionary?search=allergies");
      return response?.data?.data;
    },
  });

  console.log("Allergies data:", allergies);
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-[12px] font-semibold text-gray-600">
          2\4
        </span>
        <span className="text-[15px] font-semibold text-gray-900">
          {showComorbiditiesInStep2 ? "Comorbidities" : "Allergies"}
        </span>
      </div>

      {showComorbiditiesInStep2 ? (
        <ComorbiditiesStep
          hasComorbidities={hasComorbidities}
          setHasComorbidities={setHasComorbidities}
          selectedSubstances={selectedSubstances}
          setSelectedSubstances={setSelectedSubstances}
          additionalNote={additionalNote}
          setAdditionalNote={setAdditionalNote}
          handleFurther={function (): void {
            throw new Error("Function not implemented.");
          }}
          canProceed={false}
        />
      ) : isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-5 w-3/4 mb-1.5" />
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex gap-4 mb-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>
      ) : (
        <>
          <p className="text-[14px] font-medium text-[#111827] mb-1.5">
            {allergies?.question}
          </p>
          <p className="text-[14px] text-[#6B7280] mb-4">
            {allergies?.description}
          </p>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setHasAllergies("No")}
              className={`flex-1 py-3 text-[15px] font-medium transition-all duration-200 ${
                hasAllergies === "No"
                  ? "bg-[#227C31] text-white border border-gray-200 rounded-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-md"
              }`}
            >
              No
            </button>
            <button
              onClick={() => setHasAllergies("Yes")}
              className={`flex-1 py-3 text-[15px] font-medium transition-all duration-200 ${
                hasAllergies === "Yes"
                  ? "bg-[#227C31] text-white border border-gray-200 rounded-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-md"
              }`}
            >
              Yes
            </button>
          </div>
          {hasAllergies === "Yes" && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
              <p className="text-red-600 text-[14px] font-medium text-center">
                Du bist leider nicht für diese Therapie geeignet.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};
