import {
  BackArrowIconSvg,
  SlimedoIconSvg,
} from "@/components/svg-container/SvgContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLogo from "../../../../public/images/logo/dashboard-logo.png";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/useAxiosPublic";

const CheckIcon = ({
  size = 10,
  color = "white",
}: {
  size?: number;
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
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function AccountReadyPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState<"yes" | "no" | null>(null);

  // This is the Effect information
  const { data: telemedicalTreatmentInfo = [], isLoading } = useQuery({
    queryKey: ["telemedical_treatment_info"],
    queryFn: async () => {
      const response = await axiosPublic.get(
        "/questionary?search=telemedical_treatment",
      );
      return response?.data?.data;
    },
  });

  console.log(
    "Telemedical treatment info data:",
    telemedicalTreatmentInfo?.data,
  );

  return (
    <div className="min-h-screen bg-[#f0f0ec] flex flex-col">
      {/* ── Top bar ── */}
      <header className="bg-white border-b border-gray-200 md:px-5 py-8 flex items-center justify-between relative">
        <div className="hidden md:flex items-center gap-1.5 lg:gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[13px] text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <BackArrowIconSvg />
            <span className="text-[#227C31] font-medium text-xs lg:text-base">
              Zurück
            </span>
          </button>

          <div className="flex items-center gap-0.5 ml-1">
            {/* Step 1 – completed */}
            <div className="flex items-center gap-0.5">
              <div
                onClick={() => navigate("/product/select")}
                className="w-8 h-8 rounded-full bg-[#227C31] text-white text-[10px] font-bold flex items-center justify-center cursor-pointer"
              >
                <CheckIcon size={14} />
              </div>
              <span className="text-[11px] text-gray-400 mx-1.5">›</span>
            </div>

            {/* Step 2 – completed */}
            <div className="flex items-center gap-0.5">
              <div
                onClick={() => navigate("/questionnaire/medical")}
                className="w-8 h-8 rounded-full bg-[#227C31] text-white text-[10px] font-bold flex items-center justify-center cursor-pointer"
              >
                <CheckIcon size={14} />
              </div>
              <span className="text-[11px] text-gray-400 mx-1.5">›</span>
            </div>

            {/* Step 3 – active */}
            <div className="flex items-center gap-0.5">
              <div className="w-8 h-8 rounded-full bg-[#227C31] text-white text-[14px] font-bold flex items-center justify-center">
                3
              </div>
              <span className="text-[16px] font-medium text-[#227C31] ml-1">
                Wichtige Informationen
              </span>
            </div>
          </div>
        </div>

        <span className="absolute flex flex-row items-center left-1/2 -translate-x-1/2 gap-2 text-[15px] font-semibold text-gray-800">
          <img
            src={DashboardLogo}
            alt="Logo"
            className="w-8 h-8 inline-block"
          />
          <SlimedoIconSvg />
        </span>

        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-gray-700 cursor-pointer hidden md:block"
        >
          <svg
            width="17"
            height="17"
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
      <main className="flex-1 flex flex-col items-center py-8 px-4 font-inter">
        <div className="w-full max-w-xl flex flex-col gap-4">
          {/* Title card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            {isLoading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-7 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
              </div>
            ) : (
              <>
                <h1 className="text-[24px] font-medium text-black mb-2">
                  {telemedicalTreatmentInfo?.question}
                </h1>
                <p className="text-[16px] text-[#6B7280] leading-relaxed">
                  {telemedicalTreatmentInfo?.description}
                </p>
              </>
            )}
          </div>

          {/* Consent card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="mb-5">
              <p className="bg-[#E8ECEB] text-[13px] font-semibold text-gray-900 mb-3 p-3 rounded-lg">
                Ich bestätige
              </p>
              <ul className="flex flex-col gap-3">
                {isLoading ? (
                  <div className="animate-pulse space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-gray-200 shrink-0"></div>
                        <div
                          className={`h-3 bg-gray-100 rounded ${
                            i % 2 === 0 ? "w-full" : "w-[90%]"
                          }`}
                        ></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  telemedicalTreatmentInfo?.data?.map(
                    (item: { option?: string }, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-[12px] text-gray-600 leading-relaxed"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                        {item?.option}
                      </li>
                    ),
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Agreement radio buttons */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <p className="text-[11.5px] text-gray-500 mb-4 leading-relaxed">
              Ich stimme der telemedizinischen Behandlung und – vorbehaltlich
              der ärztlichen Eignungsprüfung – der Verschreibung des
              entsprechenden Medikaments zu.
            </p>
            <div className="flex gap-3">
              <label
                className={`flex-1 flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                  agreed === "no"
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:bg-gray-50 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="agreement"
                  value="no"
                  checked={agreed === "no"}
                  onChange={() => {
                    setAgreed("no");
                    localStorage.setItem("treatment_is_agree", "0");
                  }}
                  className="w-5 h-5 cursor-pointer accent-red-500"
                />
                <span
                  className={`text-[12px] font-medium ${
                    agreed === "no" ? "text-red-700" : "text-gray-700"
                  }`}
                >
                  Ich stimme nicht zu
                </span>
              </label>

              <label
                className={`flex-1 flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                  agreed === "yes"
                    ? "border-[#1d3a35] bg-[#E8ECEB]"
                    : "border-gray-200 hover:bg-gray-50 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="agreement"
                  value="yes"
                  checked={agreed === "yes"}
                  onChange={() => {
                    setAgreed("yes");
                    localStorage.setItem("treatment_is_agree", "1");
                  }}
                  className="w-5 h-5 cursor-pointer accent-[#1d3a35]"
                />
                <span
                  className={`text-[12px] font-medium ${
                    agreed === "yes" ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  Ich stimme zu
                </span>
              </label>
            </div>
          </div>

          {/* Continue button */}
          <button
            onClick={() => navigate("/auth/register")}
            disabled={agreed !== "yes"}
            className="w-full bg-[#227C31] hover:bg-[#16302b] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl py-3.5 text-[14px] font-medium transition cursor-pointer"
          >
            Weiter
          </button>
        </div>
      </main>
    </div>
  );
}
