import { SlimedoIconSvg } from "@/components/svg-container/SvgContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLogo from "../../../../public/images/logo/dashboard-logo.png";
import { Step1 } from "../components/Step1";
import { Step2 } from "../components/Step2";
import { Step3 } from "../components/Step3";
import { Step4 } from "../components/Step4";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import { axiosPublic } from "@/hooks/useAxiosPublic";

// ─── Icons ───────────────────────────────────────────────────────────────────

const CheckIcon = ({
  size,
  className,
  color = "white",
}: {
  size?: number;
  className?: string;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Completed sub-step collapsed row ────────────────────────────────────────

function CompletedRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-4">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-sage flex items-center justify-center shrink-0">
          <CheckIcon size={14} />
        </span>
        <span className="text-[16px] font-medium text-black">{label}</span>
      </div>
      <span className="text-[16px] text-neutral-400">{value}</span>
    </div>
  );
}

export default function MedicalQuestionnairePage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 – BMI (inputs and computed state)
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [heightInput, setHeightInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [calculatedBmi, setCalculatedBmi] = useState<number | null>(null);
  const [bmiMessage, setBmiMessage] = useState<string | null>(null);

  // If height input matches this special pattern, show the original Comorbidities UI
  const SPECIAL_HEIGHT_PATTERN = "27-99,9";

  // Whether to show the comorbidities UI (set only after Calculate is clicked)
  const [showComorbidities, setShowComorbidities] = useState(false);

  // Original comorbidities/substances state (used when special pattern is present)
  const [hasComorbidities, setHasComorbidities] = useState<"yes" | "no" | null>(
    null,
  );

  const [selectedSubstances, setSelectedSubstances] = useState<string[]>([]);
  const [additionalNote, setAdditionalNote] = useState("");

  // Step 2 – Suitability + Allergies
  const [hasAllergies, setHasAllergies] = useState<"Yes" | "No" | null>(null);
  const [showComorbiditiesInStep2, setShowComorbiditiesInStep2] =
    useState(false);

  // Step 3 – Exclusion criteria
  const [exclusion, setExclusion] = useState<"yes" | "no" | null>(null);

  // Step 4 – Incompatible medications
  const [medications, setMedications] = useState<"yes" | "no" | null>(null);
  const [otherMedications, setOtherMedications] = useState("");

  // BMI calculation helper (call from Calculate button)
  function computeBmi(
    unit: "metric" | "imperial",
    weightStr: string,
    heightStr: string,
  ) {
    const w = parseFloat(weightStr.replace(",", "."));
    const h = parseFloat(heightStr.replace(",", "."));
    if (Number.isNaN(w) || Number.isNaN(h) || w <= 0 || h <= 0) return null;
    if (unit === "metric") {
      const m = h / 100;
      return w / (m * m);
    }
    // imperial: BMI = 703 * lbs / in^2
    return (703 * w) / (h * h);
  }

  const isBmiInComorbidityRange =
    calculatedBmi !== null && calculatedBmi >= 27 && calculatedBmi < 30;

  const isNotEligible =
    (step === 1 &&
      (showComorbidities
        ? hasComorbidities === "no"
        : calculatedBmi !== null && calculatedBmi < 27)) ||
    (step === 2 &&
      (showComorbiditiesInStep2
        ? hasComorbidities === "no"
        : hasAllergies === "Yes")) ||
    (step === 3 && exclusion === "no") ||
    (step === 4 && medications === "no");

  const canProceed =
    !isNotEligible &&
    ((step === 1 &&
      (showComorbidities
        ? hasComorbidities === "yes" &&
          (selectedSubstances.length > 0 || additionalNote.trim() !== "")
        : calculatedBmi !== null &&
          (calculatedBmi >= 30 ||
            (calculatedBmi >= 27 && calculatedBmi < 30)))) ||
      (step === 2 &&
        (showComorbiditiesInStep2
          ? hasComorbidities === "yes" &&
            (selectedSubstances.length > 0 || additionalNote.trim() !== "")
          : hasAllergies === "No")) ||
      (step === 3 && exclusion === "yes") ||
      (step === 4 && medications === "yes"));

  function goForward() {
    // From step 1 we may need to go to step 2 with comorbidities or allergies
    if (step === 1) {
      // If the special comorbidities flow is active, go to step 2
      if (showComorbidities) {
        setShowComorbiditiesInStep2(false);
        setStep(2);
        return;
      }

      setShowComorbiditiesInStep2(isBmiInComorbidityRange);
      setStep(2);
      return;
    }

    if (step < 4) {
      setStep((s) => (s + 1) as 1 | 2 | 3 | 4);
    } else {
      navigate("/questionnaire/info");
    }
  }

  function goBack() {
    if (step === 1 && showComorbidities) {
      setShowComorbidities(false);
      return;
    }

    if (step > 1) {
      setStep((s) => (s - 1) as 1 | 2 | 3 | 4);
    } else {
      navigate(-1);
    }
  }

  // Temporary thank-you panel state shown after confirming comorbidities

  function handleFurther() {
    if (
      step === 1 &&
      !showComorbidities &&
      calculatedBmi !== null &&
      calculatedBmi >= 27 &&
      calculatedBmi < 30
    ) {
      setShowComorbidities(true);
      return;
    }

    // Advance to the next step immediately
    goForward();
  }

  // This is the Medical questionnaire
  const { data: questionaryData, isLoading } = useQuery({
    queryKey: ["questionary", "bmi"],
    queryFn: async () => {
      const response = await axiosPublic.get("/questionary?search=bmi");
      return response?.data?.data;
    },
  });

  return (
    <div className="min-h-screen bg-[#f0f0ec] flex flex-col font-inter">
      {/* ── Top bar ── */}
      <header className="bg-white border-b border-gray-200 px-3.5 md:px-5 py-8 flex items-center justify-between relative">
        {/* Left: back + steps */}
        <div className="hidden sm:flex items-center gap-1.5 lg:gap-3">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-[13px] text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-sage font-medium text-xs lg:text-base">
              Back
            </span>
          </button>

          <div className="flex items-center gap-0.5 ml-1">
            {/* Step 1 – completed (checkmark) */}
            <div className="flex items-center gap-0.5">
              <div
                onClick={() => navigate("/product/select")}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-sage text-white text-[12px] md:text-[14px] font-bold flex items-center justify-center cursor-pointer"
              >
                <CheckIcon className="w-3 h-3 md:w-4 md:h-4" />
              </div>
              <span className="text-[10px] md:text-[11px] text-gray-400 mx-1 md:mx-1.5">
                ›
              </span>
            </div>

            {/* Step 2 – active */}
            <div className="flex items-center gap-0.5">
              <div
                onClick={() => {
                  if (step > 2) {
                    setStep(2);
                  }
                }}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full bg-sage text-white text-[12px] md:text-[14px] font-bold flex items-center justify-center ${step > 2 ? "cursor-pointer" : ""}`}
              >
                {step > 2 ? <CheckIcon className="w-3 h-3 md:w-4 md:h-4" /> : 2}
              </div>
              <span className="text-[14px] lg:text-[16px] font-medium text-sage ml-1">
                Medical questionnaire
              </span>
              <span className="text-[10px] md:text-[11px] text-gray-400 mx-1 md:mx-1.5">
                ›
              </span>
            </div>

            {/* Step 3 – inactive */}
            <div className="flex items-center gap-0.5">
              <div
                onClick={() => {
                  if (step > 3) {
                    setStep(3);
                  }
                }}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full text-[12px] md:text-[14px] font-bold flex items-center justify-center ${step >= 3 ? "bg-sage text-white" : "bg-gray-200 text-gray-500"} ${step > 3 ? "cursor-pointer" : ""}`}
              >
                {step > 3 ? <CheckIcon className="w-3 h-3 md:w-4 md:h-4" /> : 3}
              </div>
            </div>
          </div>
        </div>
        {/* Centre: logo */}
        <span className="absolute flex flex-row items-center left-1/2 sm:left-2/3 lg:left-1/2 -translate-x-1/2 gap-2 text-[15px] font-semibold text-gray-800">
          <img
            src={DashboardLogo}
            alt="Logo"
            className="w-8 h-8 inline-block"
          />
          <SlimedoIconSvg />
        </span>
        {/* Right: close */}
        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-gray-700 cursor-pointer hidden sm:block"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </header>
      {/* ── Body ── */}
      <main className="flex-1 flex flex-col items-center py-8 font-inter">
        <div className="w-full max-w-xl flex flex-col gap-3">
          {/* Completed sub-steps */}
          {(step > 1 || showComorbidities) && (
            <CompletedRow
              label="BMI calculator"
              value={calculatedBmi ? `BMI: ${calculatedBmi.toFixed(1)}` : ""}
            />
          )}
          {/* Step 1 intro text - only show on step 1 */}
          {step === 1 && !showComorbidities && (
            <div className="bg-white rounded-card-sm p-8 font-inter">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
                </div>
              ) : (
                <>
                  <h1 className="text-[24px] font-semibold text-black mb-2">
                    {questionaryData?.question || "Medical questionnaire"}
                  </h1>
                  <p className="text-[16px] text-neutral-500 leading-relaxed">
                    {questionaryData?.description ||
                      "Please fill out your medical information truthfully. It will only be accessible to the relevant doctors. Your data is safe, protected, and will not be shared with any third parties."}
                  </p>
                </>
              )}
            </div>
          )}
          {/* {step > 2 && (
            <CompletedRow
              label="Suitability check"
              value={
                hasAllergies === "No"
                  ? "Yes, that's correct."
                  : "No, that's not the case"
              }
            />
          )} */}
          {step > 3 && (
            <CompletedRow
              label="Exclusion criteria"
              value={
                exclusion === "yes"
                  ? "Yes, that's correct."
                  : "No, that's not the case"
              }
            />
          )}

          {/* Active step card */}
          <div className="bg-white rounded-card-sm p-8">
            {step === 1 && (
              <Step1
                handleFurther={handleFurther}
                canProceed={canProceed}
                showComorbidities={showComorbidities}
                hasComorbidities={hasComorbidities}
                setHasComorbidities={setHasComorbidities}
                selectedSubstances={selectedSubstances}
                setSelectedSubstances={setSelectedSubstances}
                additionalNote={additionalNote}
                setAdditionalNote={setAdditionalNote}
                heightInput={heightInput}
                setHeightInput={setHeightInput}
                weightInput={weightInput}
                setWeightInput={setWeightInput}
                unitSystem={unitSystem}
                setUnitSystem={setUnitSystem}
                calculatedBmi={calculatedBmi}
                setCalculatedBmi={setCalculatedBmi}
                bmiMessage={bmiMessage}
                setBmiMessage={setBmiMessage}
                setShowComorbidities={setShowComorbidities}
                SPECIAL_HEIGHT_PATTERN={SPECIAL_HEIGHT_PATTERN}
                computeBmi={computeBmi}
              />
            )}

            {step === 2 && (
              <Step2
                showComorbiditiesInStep2={showComorbiditiesInStep2}
                hasComorbidities={hasComorbidities}
                setHasComorbidities={setHasComorbidities}
                selectedSubstances={selectedSubstances}
                setSelectedSubstances={setSelectedSubstances}
                additionalNote={additionalNote}
                setAdditionalNote={setAdditionalNote}
                hasAllergies={hasAllergies}
                setHasAllergies={setHasAllergies}
              />
            )}

            {step === 3 && (
              <Step3
                exclusion={exclusion}
                setExclusion={setExclusion}
                otherMedications={otherMedications}
                setOtherMedications={setOtherMedications}
              />
            )}

            {step === 4 && (
              <Step4
                medications={medications}
                setMedications={setMedications}
              />
            )}
          </div>

          {/* Further button: hide on Step 1 when the BMI UI (non-comorbidities) is shown */}
          {step !== 1 && (
            <button
              onClick={handleFurther}
              disabled={!canProceed}
              className="w-full bg-sage hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl py-4 text-[18px] font-medium transition cursor-pointer"
            >
              Further
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
