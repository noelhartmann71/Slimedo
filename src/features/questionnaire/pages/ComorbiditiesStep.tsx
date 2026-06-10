import { axiosPublic } from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import React from "react";

const SUBSTANCES = [
  "Type-2 Diabetes",
  "Arterial Hypertension",
  "Dyslipidemia / Hypercholesterolemia",
  "Sleep Apnea (OSAS)",
  "Metabolic Syndrome",
  "PCOS",
  "Non-alcoholic fatty liver disease (NAFLD)",
  "Prediabetes",
  "Cardiovascular disease",
  "Coronary heart disease",
  "Heart attack",
  "Heart failure",
];

interface ComorbiditiesStepProps {
  handleFurther: () => void;
  canProceed: boolean;
  hasComorbidities: "yes" | "no" | null;
  setHasComorbidities: (value: "yes" | "no" | null) => void;
  selectedSubstances: string[];
  setSelectedSubstances: React.Dispatch<React.SetStateAction<string[]>>;
  additionalNote: string;
  setAdditionalNote: (value: string) => void;
}

export default function ComorbiditiesStep({
  handleFurther,
  canProceed,
  hasComorbidities,
  setHasComorbidities,
  selectedSubstances,
  setSelectedSubstances,
  additionalNote,
  setAdditionalNote,
}: ComorbiditiesStepProps) {
  function toggleSubstance(name: string) {
    setSelectedSubstances((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name],
    );
  }

  useEffect(() => {
    if (hasComorbidities === "no") {
      localStorage.setItem("comorbidities", "No");
      return;
    }

    if (hasComorbidities === "yes") {
      localStorage.setItem("comorbidities", JSON.stringify(selectedSubstances));
    }
  }, [hasComorbidities, selectedSubstances]);

  const { data: comorbidities = [], isLoading } = useQuery({
    queryKey: ["comorbidities"],
    queryFn: async () => {
      const response = await axiosPublic.get(
        "/questionary?search=comorbidities",
      );
      return response?.data?.data;
    },
  });

  return (
    <>
      <div className="mb-6">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-8"></div>
          </div>
        ) : (
          <>
            <p className="text-[14px] font-medium text-[#111827] mb-1.5">
              {comorbidities?.question ||
                "Do you have any known comorbidities?"}
            </p>
            <p className="text-[14px] text-[#6B7280] mb-8">
              {comorbidities?.description ||
                "Info: Ab BMI 27 eine Verschreibung nur mit Begleiterkrankung möglich."}
            </p>
          </>
        )}
        {/* This is the yes or no */}
        <div className="flex gap-4 w-full overflow-hidden">
          <button
            onClick={() => {
              setHasComorbidities("no");
            }}
            className={`flex-1 py-3 text-[15px] font-medium transition-all duration-200 ${
              hasComorbidities === "no"
                ? "bg-sage text-white border border-gray-200 rounded-md"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-md"
            }`}
          >
            No
          </button>
          <button
            onClick={() => {
              setHasComorbidities("yes");
            }}
            className={`flex-1 py-3 text-[15px] font-medium border-l border-gray-200 transition-all duration-200 ${
              hasComorbidities === "yes"
                ? "bg-sage text-white border border-gray-200 rounded-md"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-md"
            }`}
          >
            Yes
          </button>
        </div>
      </div>
      {/* Comorbidities */}
      {hasComorbidities === "no" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
          <p className="text-red-600 text-[14px] font-medium text-center">
            Du bist leider nicht für diese Therapie geeignet.
          </p>
        </div>
      )}

      {hasComorbidities === "yes" && (
        <>
          <div className="mb-4">
            <p className="text-[14px] font-medium text-[#111827] mb-3">
              Bitte wählen Sie mindestens eine Begleiterkrankung aus.
            </p>
            <div className="flex flex-col gap-3">
              {isLoading
                ? // Skeleton items
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-3.5 rounded-md border border-[#96A9A5] bg-white animate-pulse"
                    >
                      <div className="w-4.5 h-4.5 rounded border border-gray-200 bg-gray-100 shrink-0" />
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                    </div>
                  ))
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (comorbidities?.data || SUBSTANCES).map((item: any) => {
                    let name = "Unknown";
                    if (typeof item === "object" && item !== null) {
                      const val = item.option || item.label || item.name;
                      name = Array.isArray(val) ? val[0] : val || "Unknown";
                    } else if (typeof item === "string") {
                      name = item;
                    }

                    const checked = selectedSubstances.includes(name);
                    return (
                      <div
                        key={name}
                        onClick={() => toggleSubstance(name)}
                        className={`flex items-center gap-3 px-3 py-3.5 cursor-pointer transition-colors rounded-md border ${
                          checked
                            ? "bg-[#E8ECEB] border-[#96A9A5]"
                            : "bg-white hover:bg-gray-50 border-[#96A9A5]"
                        }`}
                      >
                        <span
                          className={`w-4.5 h-4.5 rounded border shrink-0 flex items-center justify-center transition-colors ${
                            checked
                              ? "bg-sage border-sage"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {checked && (
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </span>
                        <span className="text-[14px] text-gray-700">
                          {name}
                        </span>
                      </div>
                    );
                  })}
            </div>
          </div>
          <textarea
            value={additionalNote}
            onChange={(e) => setAdditionalNote(e.target.value)}
            placeholder="Writing..."
            rows={3}
            className="w-full border border-[#96A9A5] rounded-lg px-3 py-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none mb-6"
          />

          <button
            onClick={handleFurther}
            disabled={!canProceed}
            className="w-full bg-sage hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl py-3.5 text-[14px] font-medium transition cursor-pointer"
          >
            further
          </button>
        </>
      )}
    </>
  );
}
