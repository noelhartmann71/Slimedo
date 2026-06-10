import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SlimedoIconSvg } from "@/components/svg-container/SvgContainer";
import DashboardLogo from "../../../../public/images/logo/dashboard-logo.png";

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

export default function VerifyIdentityPage() {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0ec] flex flex-col font-inter">
      {/* ── Top bar ── */}
      <header className="bg-white border-b border-gray-200 px-5 py-8 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
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
            <span>Back</span>
          </button>

          <div className="flex items-center gap-0.5 ml-1">
            {/* Step 1 – completed */}
            <div className="flex items-center gap-0.5">
              <div className="w-4.5 h-4.5 rounded-full bg-deep text-white text-[10px] font-bold flex items-center justify-center">
                <CheckIcon size={8} />
              </div>
              <span className="text-[11px] text-gray-400 mx-1.5">›</span>
            </div>

            {/* Step 2 – active */}
            <div className="flex items-center gap-0.5">
              <div className="w-4.5 h-4.5 rounded-full bg-deep text-white text-[10px] font-bold flex items-center justify-center">
                4
              </div>
              <span className="text-[12px] font-medium text-gray-800 ml-1">
                Verify Identity
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
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-xl flex flex-col gap-4">
          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <h1 className="text-[20px] font-bold text-gray-900 mb-3">
              Verify Your Identity
            </h1>
            <p className="text-[14px] text-gray-400 leading-relaxed max-w-70 mx-auto">
              To comply with medical regulations, we need to verify your
              identity before prescribing medication.
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-5">
            <div className="bg-[#E8ECEB] rounded-xl p-4 flex items-center gap-4">
              <div className="p-2.5 bg-white rounded-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1E3A2E"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <polyline points="17 11 19 13 23 9" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-gray-900">
                  Upload Photo ID
                </p>
                <p className="text-[12px] text-gray-400 mt-0.5">
                  Please upload a clear photo of your driver's license or
                  passport.
                </p>
              </div>
            </div>

            {/* Dropzone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative h-55 rounded-2xl border-2 border-dashed transition-colors flex flex-col items-center justify-center p-6 ${
                dragActive
                  ? "border-deep bg-[#f8faf9]"
                  : "border-[#E5E7EB]"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#f8faf9] border border-gray-100 flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1E3A2E"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className="text-[14px] font-semibold text-gray-900 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-[12px] text-gray-400 font-medium">
                Format is JPG, PNG or PDF and max 10 MB.
              </p>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </div>
          </div>

          {/* FAQ Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-6">
            <div>
              <h2 className="text-[16px] font-bold text-gray-900 mb-3">
                Why do we need this?
              </h2>
              <p className="text-[13px] text-gray-400 leading-relaxed">
                Identity verification ensures that the person requesting the
                prescription is who they say they are, preventing fraud and
                ensuring patient safety.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3.5 border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/auth/recommendation")}
                className="flex-1 px-6 py-3.5 bg-deep text-white rounded-xl text-[14px] font-semibold hover:bg-primary-hover transition cursor-pointer"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
