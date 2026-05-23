import { useState } from "react";
import Logo from "../../../../public/images/logo/noelha.png";
import AuthBgImage from "../../../../public/images/auth/auth-image.png";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "../../../components/svg-container/SvgContainer";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosPublic } from "@/hooks/useAxiosPublic";
import { AxiosError } from "axios";

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Das Passwort muss mindestens 6 Zeichen lang sein" }),
    password_confirmation: z
      .string()
      .min(6, { message: "Das Passwort muss mindestens 6 Zeichen lang sein" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwörter stimmen nicht überein",
    path: ["password_confirmation"],
  });

type LoginFormValues = z.infer<typeof formSchema>;

const ChangePasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const passwordValue = useWatch({
    control: form.control,
    name: "password",
  });
  const confirmPasswordValue = useWatch({
    control: form.control,
    name: "password_confirmation",
  });
  const isFormFilled = !!(passwordValue && confirmPasswordValue);

  // This is the change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async (userData: LoginFormValues) => {
      const token = localStorage.getItem("token");
      const response = await axiosPublic.post("/reset-password", {
        ...userData,
        token,
      });
      return response;
    },
    onSuccess: (response) => {
      const data = response.data;
      console.log("Password changed successfully:", data);
      localStorage.removeItem("reset_token");
      localStorage.removeItem("user_email");
      toast.success(data.message || "Passwort erfolgreich geändert");
      form.reset();
      navigate("/auth/login");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error?.response?.data?.message || (error as Error).message;
      console.error("Reset failed:", errorMessage);
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form Data:", data);
    changePasswordMutation.mutate(data);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#E2E8F0] md:h-screen p-6 font-inter">
      <div className="w-full bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-white">
        {/* Sidebar Section */}
        <div className="w-full md:w-120 bg-[#227C31] p-7 flex flex-col items-center justify-between text-white sticky top-0">
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
                Ärztlich geprüfte Online-Rezepte
              </h1>
              <p className="text-base leading-relaxed opacity-90">
                Slimedo hilft Patienten und Ärzten, nahtlos miteinander in
                Kontakt zu treten. Buchen Sie Termine, verfolgen Sie Berichte
                und verbessern Sie Ihre Gesundheitsreise.
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
                  {/* Expand icon in bottom left */}
                  <div className="absolute bottom-4 left-4 opacity-70">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h6v6" />
                      <path d="M9 21H3v-6" />
                      <path d="M21 3l-7 7" />
                      <path d="M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Speech Bubble - Absolutely positioned */}
              <div className="absolute left-[82%] top-8 z-20">
                <div className="bg-[#EE42D7] text-white text-[16px] font-semibold px-4 py-2.5 rounded-tl-[95px] rounded-tr-[100px] rounded-br-[100px] rounded-bl-0 shadow-[0_8px_15px_-3px_rgba(238,66,215,0.3)] whitespace-nowrap">
                  Schön dich zu sehen!
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Section */}
        <div className="flex-1 flex flex-col items-center relative pt-12 overflow-y-auto">
          <div className="flex-1 flex items-center justify-center w-full pb-8">
            <div className="w-full max-w-130 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0]">
              <div className="mb-6">
                <h2 className="text-2xl font-medium text-[#020817] mb-2">
                  Neues Passwort erstellen
                </h2>
                <p className="text-[#64748B] text-base font-normal">
                  Bitte geben Sie ein starkes neues Passwort ein, um Ihr Konto
                  zu sichern.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-[#020817]">
                          Passwort
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Passwort eingeben"
                              className="pl-12 pr-12 h-14 rounded-xl border-[#E2E8F0] focus:border-[#01478F] focus-visible:ring-0 text-base placeholder:text-[#94A3B8] bg-white!"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#020817] transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-[#020817]">
                          Passwort bestätigen
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Passwort bestätigen"
                              className="pl-12 pr-12 h-14 rounded-xl border-[#E2E8F0] focus:border-[#01478F] focus-visible:ring-0 text-base placeholder:text-[#94A3B8] bg-white!"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#020817] transition-colors"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-end justify-end">
                    <Link
                      to="/auth/forgot-password"
                      className="text-xs font-medium text-[#01478F] hover:underline select-none"
                    >
                      Passwort vergessen?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={changePasswordMutation.isPending}
                    className={`w-full mt-6 h-14 font-bold text-base rounded-2xl shadow-none transition-all duration-300 ${
                      isFormFilled
                        ? "bg-[#29574E]! text-white! hover:bg-[#003569] cursor-pointer"
                        : "bg-[#F8FAFC] text-[#CBD5E1] border border-[#F1F5F9] cursor-not-allowed"
                    }`}
                  >
                    {changePasswordMutation.isPending
                      ? "Passwort wird aktualisiert..."
                      : "Passwort aktualisieren"}
                  </Button>
                </form>
              </Form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-[#E2E8F0]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-[#94A3B8] font-medium">
                    Oder
                  </span>
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <Button
                  variant="outline"
                  type="button"
                  className="w-14 h-14 p-0 rounded-xl border-[#E2E8F0] hover:bg-slate-50 flex items-center justify-center shadow-sm"
                >
                  <GoogleIcon />
                </Button>
              </div>

              <div className="text-center">
                <p className="text-base text-[#64748B] font-medium">
                  Sie haben noch kein Konto?{" "}
                  <Link
                    to="/auth/create-patient"
                    className="text-[#01478F] font-bold hover:underline ml-1"
                  >
                    Konto erstellen
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full border-t border-slate-200/60">
            <p className="text-[#94A3B8] text-base px-7 py-6 text-center md:text-left">
              © 2026 Slimedo Online-Rezepte. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
