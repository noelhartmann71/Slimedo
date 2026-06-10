import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLogo from "../../../../public/images/logo/dashboard-logo.png";
import {
  BackArrowIconSvg,
  SlimedoIconSvg,
} from "@/components/svg-container/SvgContainer";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/useAxiosPublic";

interface dataListData {
  id: string;
  option: string;
  label?: string;
  value?: string;
}

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

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className={`transition-transform ${open ? "rotate-180" : ""}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function Accordion({
  title,
  children,
  dataList,
  isLoading,
}: {
  title: string;
  children: React.ReactNode;
  dataList?: dataListData[];
  isLoading?: boolean;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border bg-white border-gray-200 rounded-lg overflow-hidden p-5 font-inter">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-neutral-200 hover:bg-gray-100 transition-color rounded-lg cursor-pointer"
      >
        <span className="text-[16px] font-medium text-gray-800">{title}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="py-4 text-[14px] text-neutral-500 leading-relaxed flex flex-col gap-2">
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-200 shrink-0"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-200 shrink-0"></div>
                <div className="h-4 bg-gray-100 rounded w-[90%]"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-200 shrink-0"></div>
                <div className="h-4 bg-gray-100 rounded w-[85%]"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-200 shrink-0"></div>
                <div className="h-4 bg-gray-100 rounded w-[95%]"></div>
              </div>
            </div>
          ) : dataList && dataList.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {dataList.map((item: dataListData, idx: number) => {
                const text =
                  typeof item === "object"
                    ? item.option || item.label || item.value
                    : item;
                return (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                    {text}
                  </li>
                );
              })}
            </ul>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}

export default function ImportantInformationPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState<"yes" | "no" | null>(null);

  // This is the Effect information
  const { data: effectInfo, isLoading: isLoadingEffect } = useQuery({
    queryKey: ["effect_info"],
    queryFn: async () => {
      const response = await axiosPublic.get("/questionary?search=effect");
      return response?.data?.data;
    },
  });

  // This is the Side effect information
  const { data: sideEffectInfo, isLoading: isLoadingSideEffect } = useQuery({
    queryKey: ["side_effect_info"],
    queryFn: async () => {
      const response = await axiosPublic.get("/questionary?search=side_effect");
      return response?.data?.data;
    },
  });

  return (
    <div className="min-h-screen bg-[#f0f0ec] flex flex-col font-inter">
      {/* ── Top bar ── */}
      <header className="bg-white border-b border-gray-200 px-3.5 md:px-5 py-8 flex items-center justify-between relative">
        <div className="flex items-center gap-0 lg:gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[13px] text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <BackArrowIconSvg />
            <span className="text-sage text-base">Back</span>
          </button>

          <div className="flex items-center gap-0.5 ml-1">
            {/* Step 1 – completed */}
            <div className="flex items-center gap-0.5">
              <div
                onClick={() => navigate("/product/select")}
                className="w-8 h-8 rounded-full bg-sage text-white text-[10px] font-bold flex items-center justify-center cursor-pointer"
              >
                <CheckIcon size={14} />
              </div>
              <span className="text-[11px] text-gray-400 mx-1.5">›</span>
            </div>

            {/* Step 2 – completed */}
            <div className="flex items-center gap-0.5">
              <div
                onClick={() => navigate("/questionnaire/medical")}
                className="w-8 h-8 rounded-full bg-sage text-white text-[10px] font-bold flex items-center justify-center cursor-pointer"
              >
                <CheckIcon size={14} />
              </div>
              <span className="text-[11px] text-gray-400 mx-1.5">›</span>
            </div>

            {/* Step 3 – active */}
            <div className="flex items-center gap-0.5">
              <div className="w-8 h-8 rounded-full bg-sage text-white text-[10px] font-bold flex items-center justify-center">
                3
              </div>
              <span className="text-[16px] font-medium text-sage ml-1">
                Important information
              </span>
            </div>
          </div>
        </div>

        <span className="absolute flex flex-row items-center left-1/2 sm:left-2/3 lg:left-1/2 -translate-x-1/2 gap-2 text-[15px] font-semibold text-gray-800">
          <img
            src={DashboardLogo}
            alt="Logo"
            className="w-8 h-8 inline-block"
          />
          <SlimedoIconSvg />
        </span>

        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-gray-700 cursor-pointer"
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
      <main className="flex-1 flex flex-col items-center md:py-8 py-4 px-4 font-inter">
        <div className="w-full max-w-xl flex flex-col gap-3">
          {/* Title card */}
          <div className="bg-white rounded-card-sm p-8 font-inter">
            <h1 className="text-[24px] font-semibold text-black mb-2">
              Important information
            </h1>
            <p className="text-[16px] text-neutral-500 leading-relaxed">
              Please read the information on risks and side effects carefully
              and then confirm that you understand it.
            </p>
          </div>

          {/* Effect accordion */}
          <Accordion
            title="Effect"
            dataList={effectInfo?.data}
            isLoading={isLoadingEffect}
          >
            <p>
              The drug affects the body's own GLP-1 hormones, which are
              responsible for satiety, appetite and blood sugar.
            </p>
            <p>
              It helps to reduce hunger and regulate eating habits, which,
              especially when combined with a healthy diet and plenty of
              exercise, can lead to sustainable weight loss.
            </p>
            <p>
              Clinical studies show average weight losses of 10-20%, depending
              on dosage and preparation.
            </p>
          </Accordion>

          {/* Side effects accordion */}
          <Accordion
            title="Side effects"
            dataList={sideEffectInfo?.data}
            isLoading={isLoadingSideEffect}
          >
            <p>The following side effects may rarely occur:</p>
            <ul className="flex flex-col gap-1.5 ml-1">
              {[
                "Worsening of pre-existing diabetic retinopathy in cases of rapid blood glucose improvement",
                "Dehydration due to persistent vomiting or diarrhea, potentially leading to impaired kidney function",
                "Severe and persistent upper abdominal pain (possibly radiating to the back), nausea or vomiting (possible pancreatitis)",
                "Severe pain in the right upper abdomen, fever, or jaundice (possible gallbladder inflammation)",
                "Persistent vomiting or diarrhea accompanied by circulatory problems",
                "Severe allergic reactions (shortness of breath, swelling, rash)",
                "Newly occurring or worsening visual disturbances in patients with diabetes. If any of these symptoms occur, please seek medical attention immediately.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Accordion>

          {/* Agreement card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 font-inter">
            <p className="text-[14px] text-neutral-500 mb-8 leading-relaxed">
              Have you read and understood all the information above and do you
              agree to the treatment?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setAgreed("no");
                  localStorage.setItem("side_effect", "0");
                }}
                className={`flex-1 py-4 rounded-md border text-[16px] font-medium cursor-pointer transition-colors ${
                  agreed === "no"
                    ? "border-red-300 bg-[#FEF2F2] text-neutral-600"
                    : "border-red-200 bg-red-50/60 text-neutral-600 hover:bg-red-50"
                }`}
              >
                No
              </button>
              <button
                onClick={() => {
                  setAgreed("yes");
                  localStorage.setItem("side_effect", "1");
                }}
                className={`flex-1 py-4 rounded-md border text-[16px] font-medium cursor-pointer transition-colors ${
                  agreed === "yes"
                    ? "bg-sage text-white"
                    : "bg-sage text-white hover:bg-primary-hover"
                }`}
              >
                Yes
              </button>
            </div>
            <p className="text-[14px] text-neutral-500 mt-8 leading-relaxed">
              I understand that this treatment is provided within a telemedical
              care concept and that immediate in-person medical evaluation is
              required in the event of severe or newly occurring symptoms.
            </p>
          </div>

          {/* Further button */}
          <button
            onClick={() => navigate("/auth/account-ready")}
            disabled={agreed !== "yes"}
            className="w-full bg-sage hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-card-sm py-4 text-[18px] font-medium transition cursor-pointer font-inter"
          >
            Further
          </button>
        </div>
      </main>
    </div>
  );
}
