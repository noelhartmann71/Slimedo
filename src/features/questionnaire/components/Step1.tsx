import { useEffect } from "react";
import ComorbiditiesStep from "../pages/ComorbiditiesStep";

interface Step1Props {
  handleFurther: () => void;
  canProceed: boolean;
  showComorbidities: boolean;
  hasComorbidities: "yes" | "no" | null;
  setHasComorbidities: (v: "yes" | "no" | null) => void;
  selectedSubstances: string[];
  setSelectedSubstances: React.Dispatch<React.SetStateAction<string[]>>;
  additionalNote: string;
  setAdditionalNote: (v: string) => void;
  heightInput: string;
  setHeightInput: (v: string) => void;
  weightInput: string;
  setWeightInput: (v: string) => void;
  unitSystem: "metric" | "imperial";
  setUnitSystem: (v: "metric" | "imperial") => void;
  calculatedBmi: number | null;
  setCalculatedBmi: (v: number | null) => void;
  bmiMessage: string | null;
  setBmiMessage: (v: string | null) => void;
  setShowComorbidities: (v: boolean) => void;
  SPECIAL_HEIGHT_PATTERN: string;
  computeBmi: (
    unit: "metric" | "imperial",
    weight: string,
    height: string,
  ) => number | null;
}

export const Step1 = ({
  handleFurther,
  canProceed,
  showComorbidities,
  hasComorbidities,
  setHasComorbidities,
  selectedSubstances,
  setSelectedSubstances,
  additionalNote,
  setAdditionalNote,
  heightInput,
  setHeightInput,
  weightInput,
  setWeightInput,
  unitSystem,
  setUnitSystem,
  calculatedBmi,
  setCalculatedBmi,
  bmiMessage,
  setBmiMessage,
  setShowComorbidities,
  SPECIAL_HEIGHT_PATTERN,
  computeBmi,
}: Step1Props) => {
  localStorage.setItem("bmi", calculatedBmi?.toFixed(1) || "0");

  useEffect(() => {
    if (!heightInput || !weightInput) {
      setCalculatedBmi(null);
      setBmiMessage(null);
      return;
    }

    if (heightInput.trim() === SPECIAL_HEIGHT_PATTERN) {
      setShowComorbidities(true);
      setCalculatedBmi(null);
      setBmiMessage(null);
      return;
    }

    const value = computeBmi(unitSystem, weightInput, heightInput);
    if (value === null) {
      setCalculatedBmi(null);
      return;
    }

    setCalculatedBmi(value);

    if (value >= 27 && value < 30) {
      setBmiMessage(
        "Ihr BMI liegt zwischen 27 und 30. Eine Behandlung ist nur bei zusätzlichen gewichtsbedingten Begleiterkrankungen möglich. Bitte bestätigen Sie dies im nächsten Schritt.",
      );
    } else if (value >= 30) {
      setShowComorbidities(false);
      setBmiMessage(
        "Du bist für diese Behandlung geeignet. Unsere Medikamente zur Gewichtskontrolle werden Patient:innen mit einem BMI von 27 oder höher verschrieben.",
      );
    } else {
      setShowComorbidities(false);
      setBmiMessage(
        "Aufgrund Ihres BMI sind Sie für diese Behandlung nicht geeignet.",
      );
    }
  }, [
    heightInput,
    weightInput,
    unitSystem,
    computeBmi,
    SPECIAL_HEIGHT_PATTERN,
    setCalculatedBmi,
    setBmiMessage,
    setShowComorbidities,
  ]);

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 text-[16px] font-semibold text-black">
          1\4
        </span>
        <span className="text-[18px] font-medium text-black">
          {showComorbidities ? "Comorbidities" : "BMI calculator"}
        </span>
      </div>
      {showComorbidities ? (
        <ComorbiditiesStep
          handleFurther={handleFurther}
          canProceed={canProceed}
          hasComorbidities={hasComorbidities}
          setHasComorbidities={setHasComorbidities}
          selectedSubstances={selectedSubstances}
          setSelectedSubstances={setSelectedSubstances}
          additionalNote={additionalNote}
          setAdditionalNote={setAdditionalNote}
        />
      ) : (
        <>
          <p className="text-[14px] text-gray-600 mb-4">
            Enter your height and weight to find out if you are a suitable
            candidate for treatment.
          </p>

          <div className="mb-6">
            <p className="text-[13px] text-gray-500 mb-3">Unit System</p>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => {
                  setUnitSystem("metric");
                  setCalculatedBmi(null);
                  setBmiMessage(null);
                }}
                className={`flex-1 py-3 text-[15px] font-medium rounded-md transition ${
                  unitSystem === "metric"
                    ? "bg-neutral-200 text-deep border border-[#96A9A5]"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                Metric (cm, kg)
              </button>
              <button
                onClick={() => {
                  setUnitSystem("imperial");
                  setCalculatedBmi(null);
                  setBmiMessage(null);
                }}
                className={`flex-1 py-3 text-[15px] font-medium rounded-md transition ${
                  unitSystem === "imperial"
                    ? "bg-neutral-200 text-deep border border-[#96A9A5]"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                Imperial (in, lbs)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={heightInput}
                onChange={(e) => {
                  const v = e.target.value;
                  setHeightInput(v);
                  setCalculatedBmi(null);
                  setBmiMessage(null);
                  if (
                    showComorbidities &&
                    v.trim() !== SPECIAL_HEIGHT_PATTERN
                  ) {
                    setShowComorbidities(false);
                  }
                }}
                placeholder={
                  unitSystem === "metric" ? "Height (cm)" : "Height (in)"
                }
                className="w-full border border-[#96A9A5] focus:border-deep focus:ring-1 focus:ring-deep rounded-md px-3 py-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none transition-all"
              />
              <input
                type="text"
                value={weightInput}
                onChange={(e) => {
                  setWeightInput(e.target.value);
                  setCalculatedBmi(null);
                  setBmiMessage(null);
                }}
                placeholder={
                  unitSystem === "metric" ? "Weight (kg)" : "Weight (lbs)"
                }
                className="w-full border border- focus:border-deep focus:ring-1 focus:ring-deep rounded-md px-3 py-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none transition-all"
              />
            </div>

            {calculatedBmi !== null && !showComorbidities && (
              <div className="mb-0">
                <div className="inline-block bg-[#F5EFCF] text-deep rounded-md p-3 text-[13px] font-medium mb-2">
                  Your BMI: {calculatedBmi.toFixed(1)}
                </div>
                <div className="bg-[#F5EFCF] text-gray-700 rounded-md p-4 text-[13px] mb-4">
                  {bmiMessage}
                </div>
                {/* Single Further Button specifically for BMI result */}
                <button
                  onClick={handleFurther}
                  disabled={!canProceed}
                  className="w-full bg-sage hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl py-3.5 text-[14px] font-medium transition cursor-pointer"
                >
                  further
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
