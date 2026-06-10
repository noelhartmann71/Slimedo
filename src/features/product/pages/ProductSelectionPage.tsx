import {
  BackArrowIconSvg,
  SlimedoIconSvg,
} from "@/components/svg-container/SvgContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLogo from "../../../../public/images/logo/dashboard-logo.png";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/useAxiosPublic";
import { Skeleton } from "@/components/ui/skeleton";

interface dosageData {
  id: string;
  dose: string;
  price: string;
  quantity: string;
  _id?: string;
}

const MANUFACTURERS = [
  { id: "wegovy", name: "Wegovy®", price: "€171.96" },
  { id: "mounjaro", name: "Mounjaro®", price: "€206.02" },
  { id: "saxenda", name: "Saxenda®", price: "€179.21" },
  { id: "orlistat", name: "Orlistat 1A Pharma®", price: "€50.52" },
];

const DOSAGES: Record<string, { id: string; dose: string; price: string }[]> = {
  wegovy: [
    { id: "d1", dose: "0.25 mg", price: "€171.96" },
    { id: "d2", dose: "0.5 mg", price: "€171.96" },
    { id: "d3", dose: "1 mg", price: "€171.96" },
    { id: "d4", dose: "1.7 mg", price: "€236.37" },
    { id: "d5", dose: "2.4 mg", price: "€276.83" },
    { id: "d6", dose: "0.5 mg", price: "€171.96" },
  ],
  mounjaro: [
    { id: "d1", dose: "2.5 mg", price: "€206.02" },
    { id: "d2", dose: "5 mg", price: "€206.02" },
    { id: "d3", dose: "7.5 mg", price: "€236.37" },
    { id: "d4", dose: "10 mg", price: "€256.83" },
  ],
  saxenda: [
    { id: "d1", dose: "0.6 mg", price: "€179.21" },
    { id: "d2", dose: "1.2 mg", price: "€179.21" },
    { id: "d3", dose: "1.8 mg", price: "€179.21" },
    { id: "d4", dose: "2.4 mg", price: "€179.21" },
    { id: "d5", dose: "3.0 mg", price: "€179.21" },
  ],
  orlistat: [
    { id: "d1", dose: "60 mg", price: "€50.52" },
    { id: "d2", dose: "120 mg", price: "€62.30" },
  ],
};

// ─── Icons ───────────────────────────────────────────────────────────────────

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

const ChevronRight = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── Completed step collapsed row ────────────────────────────────────────────

function CompletedRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-5 py-4">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-sage flex items-center justify-center shrink-0">
          <CheckIcon size={9} />
        </span>
        <span className="text-[16px] font-medium text-black">{label}</span>
      </div>
      <span className="text-[16px] text-[#9CA3AF]">{value}</span>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProductSelectionPage() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosPublic.get("/product");
      return response?.data?.data;
    },
  });

  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMfr, setSelectedMfr] = useState<string | null>(() => {
    return localStorage.getItem("selectedMfr");
  });
  const [selectedDosage, setSelectedDosage] = useState<string | null>(() => {
    const saved = localStorage.getItem("dosage_info");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.id || null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [confirmed, setConfirmed] = useState(false);

  const mfr =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products.find((p: any) => (p._id || p.id) === selectedMfr) ||
    MANUFACTURERS.find((m) => m.id === selectedMfr);

  // Get dosages from the API product if available, otherwise fallback to DOSAGES map
  const dosages = mfr?.dosage
    ? (Array.isArray(mfr.dosage) ? mfr.dosage : [mfr.dosage]).map(
        (d: dosageData, index: number) => ({
          id: d._id || d.id || `dose-${index}`,
          dose: d.quantity || d.dose || mfr.quantity || mfr.dosage,
          price: d.price
            ? d.price.toString().includes("€")
              ? d.price
              : `€${d.price}`
            : mfr.price?.toString().includes("€")
              ? mfr.price
              : `€${mfr.price}`,
        }),
      )
    : selectedMfr
      ? (DOSAGES[selectedMfr] ?? [])
      : [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dosageIndex = dosages.findIndex((d: any) => d.id === selectedDosage);
  const needsConfirm = dosageIndex >= 1;

  const canProceed =
    (step === 1 && selectedMfr !== null) ||
    (step === 2 && selectedDosage !== null && (!needsConfirm || confirmed));

  function goForward() {
    if (step === 1) {
      setStep(2);
      setSelectedDosage(null);
      setConfirmed(false);
    } else if (step === 2) {
      navigate("/questionnaire/medical");
    }
  }

  function goBack() {
    if (step > 1) setStep((s) => (s - 1) as 1 | 2);
    else navigate(-1);
  }

  return (
    <div className="min-h-screen bg-[#f0f0ec] flex flex-col">
      {/* ── Top bar ── */}
      <header className="bg-white border-b border-gray-200 px-3.5 md:px-5 py-8 flex flex-row items-center justify-between relative">
        {/* Left: back + steps */}
        <div className="hidden sm:flex items-center gap-1.5 md:gap-3">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-[13px] text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <BackArrowIconSvg />
            <span className="text-sage font-inter text-xs md:text-base">
              Zurück
            </span>
          </button>
          <div className="flex items-center gap-0.5 ml-1">
            <div className="flex items-center gap-0.5">
              <div
                onClick={() => setStep(1)}
                className={`w-8 h-8 rounded-full text-[14px] font-bold flex items-center justify-center transition-colors ${
                  step >= 1
                    ? "bg-sage text-white"
                    : "bg-gray-200 text-gray-500"
                } ${step > 1 ? "cursor-pointer" : ""}`}
              >
                {step > 1 ? <CheckIcon size={14} /> : 1}
              </div>
              <span
                className={`text-xs md:text-[16px] font-medium ml-1 text-sage`}
              >
                Produktauswahl
              </span>
              <span className="text-gray-300 mx-1.5 text-[11px]">›</span>
            </div>
          </div>
        </div>
        {/* Centre: logo */}
        <span className="absolute flex flex-row items-center left-1/2 -translate-x-1/2 gap-2 text-[15px] font-semibold text-gray-800">
          <img
            src={DashboardLogo}
            alt="Logo"
            className="md:w-8 w-7 md:h-8 h-7 inline-block"
          />
          <SlimedoIconSvg />
        </span>
        {/* Right: close */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-700 cursor-pointer hidden sm:block"
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
      <main className="flex-1 flex flex-col items-center py-4 sm:py-8 px-4 font-inter">
        <div className="w-full max-w-xl flex flex-col gap-3">
          {/* Info card — always shown */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h1 className="text-2xl font-semibold text-black mb-6">
              Produktauswahl
            </h1>
            <div className="bg-[#F3F4F6] rounded-lg p-6">
              <p className="text-base text-[#4B5563] mb-2">
                Wählen Sie das Produkt, das am besten zu Ihren Bedürfnissen passt.
              </p>
              <ul className="flex flex-col gap-1.5">
                {[
                  "Rezept online beantragen — 19 €, Zahlung nur bei Ausstellung",
                  "Lieferung oder Abholung möglich",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2 text-sm text-[#4B5563]"
                  >
                    <svg
                      className="mt-px shrink-0"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Completed step 1 */}
          {step > 1 && mfr && (
            <CompletedRow label="Select manufacturer" value={mfr.name} />
          )}
          {/* Active step card */}
          <div className="bg-white rounded-2xl p-8">
            {/* ── Step 1 ── */}
            {step === 1 && (
              <>
                <p className="text-[18px] font-semibold text-black tracking-wider mb-8">
                  <span className="bg-[#F3F4F6] p-2.5 rounded-full text-base">
                    1/2
                  </span>{" "}
                  &nbsp; Hersteller auswählen
                </p>
                {/* Product options */}
                <div className="flex flex-col gap-4 max-h-100 overflow-y-auto pr-2 scrollbar-hide">
                  {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="px-5 py-3 rounded-lg border border-[#E8ECEB] flex items-center justify-between"
                        >
                          <div className="flex flex-col gap-4">
                            <Skeleton className="h-5 w-35" />
                            <Skeleton className="h-4.5 w-22.5" />
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Skeleton className="h-5 w-15" />
                          </div>
                        </div>
                      ))
                    : products.length > 0
                      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        products.map((product: any) => {
                          const sel =
                            selectedMfr === product.id ||
                            selectedMfr === product._id;
                          return (
                            <div
                              key={product._id || product.id}
                              onClick={() => {
                                setSelectedMfr(product._id || product.id);
                                localStorage.setItem(
                                  "product_id",
                                  product._id || product.id,
                                );
                                sessionStorage.setItem(
                                  "product_name",
                                  product.name,
                                );
                                sessionStorage.setItem(
                                  "product_price",
                                  product.price.toString(),
                                );
                              }}
                              className={`px-5 py-3 rounded-lg border cursor-pointer transition-colors ${
                                sel
                                  ? "bg-[#E8ECEB] border-[#96A9A5]"
                                  : "border-[#E8ECEB] hover:bg-gray-50/60"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-[16px] font-medium text-[#4B5563]">
                                    {product.name}
                                  </span>
                                  <button className="flex items-center gap-0.5 text-[14px] text-sage hover:text-gray-600 mt-4 cursor-pointer">
                                    Mehr erfahren <ChevronRight />
                                  </button>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <span className="text-[16px] font-medium text-[#4B5563]">
                                    ab €{product.price}
                                  </span>
                                  {sel && (
                                    <span className="w-4.5 h-4.5 rounded bg-sage flex items-center justify-center shrink-0">
                                      <CheckIcon size={9} />
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : MANUFACTURERS.map((product) => {
                          const sel = selectedMfr === product.id;
                          return (
                            <div
                              key={product.id}
                              onClick={() => {
                                setSelectedMfr(product.id);
                                localStorage.setItem("selectedMfr", product.id);
                                sessionStorage.setItem(
                                  "product_name",
                                  product.name,
                                );
                                sessionStorage.setItem(
                                  "product_price",
                                  product.price.toString(),
                                );
                              }}
                              className={`px-5 py-3 rounded-lg border cursor-pointer transition-colors ${
                                sel
                                  ? "bg-[#E8ECEB] border-[#96A9A5]"
                                  : "border-[#E8ECEB] hover:bg-gray-50/60"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-[16px] font-medium text-[#4B5563]">
                                    {product.name}
                                  </span>
                                  <button className="flex items-center gap-0.5 text-[14px] text-deep hover:text-gray-600 mt-4 cursor-pointer">
                                    Mehr erfahren <ChevronRight />
                                  </button>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <span className="text-[16px] font-medium text-[#4B5563]">
                                    ab {product.price}
                                  </span>
                                  {sel && (
                                    <span className="w-4.5 h-4.5 rounded bg-deep flex items-center justify-center shrink-0">
                                      <CheckIcon size={9} />
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                </div>
              </>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <>
                <p className="text-[18px] font-semibold text-black tracking-wider mb-8">
                  <span className="bg-[#F3F4F6] p-2.5 rounded-full text-base">
                    2/2
                  </span>{" "}
                  &nbsp; Wählen Sie Ihre Dosierung
                </p>
                <p className="text-[14px] text-[#6B7280] mb-3">
                  Wählen Sie die Dosierung für einen Abnehmspritzen-Pen.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-5 py-4 rounded-lg border border-gray-100"
                        >
                          <Skeleton className="h-5 w-20" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      ))
                    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      dosages.map((d: any) => {
                        const sel = selectedDosage === d.id;
                        return (
                          <div
                            key={d.id}
                            onClick={() => {
                              setSelectedDosage(d.id);
                              localStorage.setItem(
                                "medication_price",
                                d.price.replace("€", ""),
                              );
                              sessionStorage.setItem("product_dosage", d.dose);
                              localStorage.setItem("dosage", d.dose);
                              setConfirmed(false);
                            }}
                            className={`flex items-center justify-between px-5 py-4 rounded-lg border cursor-pointer transition-colors ${
                              sel
                                ? "border-[#96A9A5] bg-[#E8ECEB]"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span className="text-base font-medium text-[#4B5563]">
                              {d.dose}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[16px] text-[#6B7280]">
                                {d.price}
                              </span>
                              {sel && (
                                <span className="w-4 h-4 rounded bg-sage flex items-center justify-center shrink-0">
                                  <CheckIcon size={8} />
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                </div>
                {selectedDosage && needsConfirm && (
                  <label
                    onClick={() => setConfirmed((c) => !c)}
                    className="flex items-start gap-3 mt-8 p-4 bg-[#E8ECEB] rounded-xl cursor-pointer select-none"
                  >
                    <span
                      className={`mt-0.5 w-5 h-5 rounded border shrink-0 flex items-center justify-center transition-colors ${
                        confirmed
                          ? "bg-sage border-sage"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {confirmed && <CheckIcon size={14} />}
                    </span>
                    <span className="text-[14px] text-sage leading-relaxed font-inter">
                      Ich bestätige, dass ich dieses Medikament bereits angewendet, die erforderliche Dosissteigerung durchgeführt und von einem Arzt Informationen über die Anwendung und mögliche Nebenwirkungen erhalten habe.
                    </span>
                  </label>
                )}
              </>
            )}
          </div>

          {/* Further button */}
          <button
            onClick={goForward}
            disabled={!canProceed}
            className="w-full bg-sage hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl p-4 text-[18px] font-medium transition cursor-pointer"
          >
            Weiter
          </button>
        </div>
      </main>
    </div>
  );
}
