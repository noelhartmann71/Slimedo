import Logo from "../../../../public/images/logo/noelha.png";
import AuthBgImage from "../../../../public/images/auth/auth-image.png";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Loader2 } from "lucide-react";
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
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
});

export default function CreateRegister() {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await axiosPublic.post("/resend_otp", { email });
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Save email to localStorage for use in OTP page
      localStorage.setItem("email", variables);

      toast.success(
        data.message ||
          "Bestätigungscode erfolgreich gesendet! Bitte überprüfen Sie Ihre E-Mails.",
      );
      navigate("/auth/verify-register", { state: { email: variables } });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message ||
          "Beim Senden des Bestätigungscodes ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      );
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values.email);
  };

  const emailValue = useWatch({
    control: form.control,
    name: "email",
  });

  const isFormFilled = !!emailValue;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#E2E8F0] md:h-screen p-6 font-inter">
      <div className="w-full bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-white">
        {/* Sidebar Section */}
        <div className="w-full md:w-120 bg-sage p-7 flex flex-col items-center justify-between text-white sticky top-0">
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
                <div className="bg-[#F4F1E7] text-dark text-[16px] font-semibold px-4 py-2.5 rounded-tl-[95px] rounded-tr-[100px] rounded-br-[100px] rounded-bl-0 shadow-[0_8px_15px_-3px_rgba(238,66,215,0.3)] whitespace-nowrap">
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
                  Konto erstellen
                </h2>
                <p className="text-[#64748B] text-base font-normal">
                  Geben Sie Ihre persönlichen Daten ein, um ein neues
                  Patientenkonto zu erstellen.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-[#020817]">
                          E-Mail
                        </FormLabel>
                        <FormControl>
                          <div className="relative mt-2">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <Input
                              placeholder="E-Mail-Adresse eingeben"
                              className="pl-12 h-14 rounded-xl border-[#E2E8F0] focus:border-sage focus-visible:ring-0 text-base placeholder:text-[#94A3B8] bg-white!"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={!isFormFilled || mutation.isPending}
                    className={`w-full mt-6 h-14 font-bold text-base rounded-2xl shadow-none transition-all duration-300 ${
                      isFormFilled && !mutation.isPending
                        ? "cursor-pointer"
                        : "bg-neutral-50 text-neutral-300 border border-neutral-100 cursor-not-allowed"
                    }`}
                  >
                    {mutation.isPending ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      "Bestätigungscode senden"
                    )}
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
                  className="w-14 h-14 p-0 rounded-xl border-neutral-200 hover:bg-neutral-50 flex items-center justify-center shadow-sm bg-white!"
                >
                  <GoogleIcon />
                </Button>
              </div>

              <div className="text-center">
                <p className="text-base text-[#64748B] font-medium">
                  Haben Sie noch kein Konto?{" "}
                  <Link
                    to="/auth/create-patient"
                    className="text-sage font-bold hover:underline ml-1"
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
}
