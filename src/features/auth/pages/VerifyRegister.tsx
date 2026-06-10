import Logo from "../../../../public/images/logo/noelha.png";
import AuthBgImage from "../../../../public/images/auth/auth-image.png";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "../../../components/svg-container/SvgContainer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import type { AxiosError } from "axios";

const CODE_LENGTH = 6;
const TIMER_START = 120; // 2 minutes

export default function VerifyRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const email =
    location.state?.email || localStorage.getItem("user_email") || "your email";

  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState(TIMER_START);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const mutation = useMutation({
    mutationFn: async (otp: string) => {
      const response = await axiosPublic.post("/verify_otp", {
        email,
        otp,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "OTP verified successfully!");
      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
      }
      navigate("/auth/create-patient", { state: { email } });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again.",
      );
    },
  });

  const handleVerify = () => {
    const otp = digits.join("");
    mutation.mutate(otp);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return;

    const newDigits = [...digits];
    const pasteChars = pastedData.slice(0, CODE_LENGTH).split("");

    pasteChars.forEach((char, i) => {
      if (i < CODE_LENGTH) {
        newDigits[i] = char;
      }
    });

    setDigits(newDigits);

    // Focus the last filled input or the first empty one
    const nextIndex = Math.min(pasteChars.length, CODE_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  const isComplete = digits.every((d) => d !== "");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#E2E8F0] md:h-screen p-6 font-inter">
      <div className="w-full bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-white">
        {/* Sidebar Section */}
        <div className="w-full md:w-120 bg-deep p-7 flex flex-col items-center justify-between text-white sticky top-0">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="relative w-9.5 h-11.5">
                <img src={Logo} alt="Slimedo Logo" className="object-contain" />
              </div>
              <Link to="/">
                <span className="text-[28px] font-semibold tracking-tight text-[#FFF]">
                  Slimedo
                </span>
              </Link>
            </div>
            <div className="space-y-4">
              <h1 className="text-[32px] font-medium leading-tight">
                Ärztlich überprüfte Online-Rezepte Slimedo hilft Patie
              </h1>
              <p className="text-base leading-relaxed opacity-90">
                Slimedo helps patients and doctors connect seamlessly. Book
                visits, track records, and improve your health journey.
              </p>
            </div>
          </div>

          {/* Doctor Card with Speech Bubble */}
          <div className="relative mt-auto pt-10 w-full group">
            <div className="relative inline-block">
              {/* Image Container */}
              <div className="p-1">
                <div className="w-50 h-64 relative bg-[#F1F5F9] rounded-xl overflow-hidden">
                  <img
                    src={AuthBgImage}
                    alt="Doctor Illustration"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Speech Bubble */}
              <div className="absolute left-[82%] top-8 z-20">
                <div className="bg-[#EE42D7] text-white text-[16px] font-semibold px-4 py-2.5 rounded-tl-[95px] rounded-tr-[100px] rounded-br-[100px] rounded-bl-0 shadow-[0_8px_15px_-3px_rgba(238,66,215,0.3)] whitespace-nowrap">
                  Good to see you!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-1 flex flex-col items-center relative pt-12 overflow-y-auto">
          <div className="flex-1 flex items-center justify-center w-full pb-8">
            <div className="w-full max-w-130 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0]">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-medium text-[#020817] mb-2">
                  Enter Your Code
                </h2>
                <p className="text-[#64748B] text-base font-normal">
                  We've sent a verification code to{" "}
                  <span className="text-[#4a90d9]">{email}</span>.
                </p>
              </div>

              {/* OTP boxes */}
              <div className="flex gap-3 justify-center mb-6">
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onPaste={handlePaste}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-full h-14 text-center text-lg font-semibold border rounded-xl outline-none transition
                      ${d ? "border-deep bg-white ring-1 ring-deep" : "border-[#E2E8F0] bg-white"}
                      focus:border-deep focus:ring-1 focus:ring-deep`}
                  />
                ))}
              </div>

              <div className="text-center mb-8">
                <p className="text-sm text-[#94A3B8]">
                  Wait for&nbsp;
                  <span className="text-[#64748B] font-medium">
                    {pad(Math.floor(timer / 60))}:{pad(timer % 60)}
                  </span>
                </p>
              </div>

              <Button
                onClick={handleVerify}
                disabled={!isComplete || mutation.isPending}
                className={`w-full h-14 font-bold text-base rounded-2xl shadow-none transition-all duration-300 ${
                  isComplete && !mutation.isPending
                    ? "cursor-pointer"
                    : "bg-neutral-50 text-neutral-300 border border-neutral-100 cursor-not-allowed"
                }`}
              >
                {mutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  "Verify"
                )}
              </Button>

              <button
                className="w-full text-center text-sm text-[#64748B] hover:text-deep font-medium py-4 cursor-pointer bg-transparent border-none mt-2 transition-colors"
                onClick={() => {
                  setTimer(TIMER_START);
                  setDigits(Array(CODE_LENGTH).fill(""));
                  inputRefs.current[0]?.focus();
                }}
                type="button"
                disabled={timer > 0 && digits.some((d) => d !== "")}
              >
                Resend the Code
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-[#E2E8F0]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-[#94A3B8] font-medium">
                    Or
                  </span>
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <Button
                  variant="outline"
                  type="button"
                  className="w-14 h-14 p-0 rounded-xl border-neutral-200 hover:bg-neutral-50 flex items-center justify-center shadow-sm bg-white!"
                >
                  <GoogleIcon />
                </Button>
              </div>

              <div className="text-center">
                <p className="text-base text-[#64748B] font-medium">
                  Need to fix it?{" "}
                  <Link
                    to="/auth/create-patient"
                    className="text-deep font-bold hover:underline ml-1"
                  >
                    Update Email
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full border-t border-slate-200/60">
            <p className="text-[#94A3B8] text-base px-7 py-6 text-center md:text-left">
              © 2026 Slimedo Online Prescriptions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
