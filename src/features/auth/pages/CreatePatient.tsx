import { useState } from "react";
import AuthBgImage from "../../../../public/images/auth/auth-image.png";
import Logo from "../../../../public/images/logo/noelha.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Lock, CircleUserRound, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    first_name: z.string().min(2, { message: "Vorname ist erforderlich" }),
    last_name: z.string().optional(),
    email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
    phone: z.string().min(10, { message: "Ungültige Telefonnummer" }),
    password: z
      .string()
      .min(8, { message: "Das Passwort muss mindestens 8 Zeichen lang sein" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwörter stimmen nicht überein",
    path: ["password_confirmation"],
  });

const CreatePatient = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await axiosPublic.post("/register", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      if (data?.data) {
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.token);
      }
      form.reset();
      navigate("/patient/profile/overview");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message ||
          "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      );
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  const isFormValid = form.formState.isValid;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#E2E8F0] md:h-screen p-6 font-inter">
      <div className="w-full bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-white h-full">
        {/* Sidebar Section */}
        <div className="w-full md:w-120 bg-sage p-7 flex flex-col items-center justify-between text-white sticky top-0 h-full">
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
            <div className="w-full max-w-200 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0]">
              <div className="mb-10 text-left">
                <h2 className="text-2xl font-medium text-[#020817] mb-2">
                  Patientenkonto erstellen
                </h2>
                <p className="text-[#64748B] text-base font-normal">
                  Geben Sie Ihre persönlichen Daten ein, um ein neues
                  Patientenkonto zu erstellen.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-[#020817]">
                            Vorname
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CircleUserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                              <Input
                                placeholder="Vorname eingeben"
                                className="pl-12! h-14! rounded-xl! border-[#E2E8F0]! focus:border-sage! focus-visible:ring-0! text-base placeholder:text-[#94A3B8] bg-white!"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-[#020817]">
                            Nachname
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CircleUserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                              <Input
                                placeholder="Nachname eingeben"
                                className="pl-12! h-14! rounded-xl! border-[#E2E8F0]! focus:border-sage! bg-white! focus-visible:ring-0! text-base placeholder:text-[#94A3B8]"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-[#020817]">
                            E-Mail
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="E-Mail eingeben"
                              className="h-14! rounded-xl! border-[#E2E8F0]! focus:border-sage! focus-visible:ring-0! text-base bg-white! placeholder:text-[#94A3B8]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-2 text-left">
                      <FormLabel className="text-sm font-medium text-[#020817]">
                        Telefonnummer
                      </FormLabel>
                      <div className="flex gap-3">
                        {/* <FormField
                          control={form.control}
                          name="countryCode"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className="flex! items-center! justify-between! gap-2! px-4! border! border-[#E2E8F0]! rounded-xl! h-14! bg-white! cursor-pointer! min-w-32! w-auto! focus:ring-0! focus:ring-offset-0! focus:border-sage! shadow-none! hover:bg-white! hover:border-sage! "
                                    >
                                      <div className="flex items-center gap-2">
                                        {(() => {
                                          const country = countries.find(
                                            (c) =>
                                              c.iso === field.value ||
                                              c.code === field.value,
                                          );
                                          return (
                                            <>
                                              <img
                                                src={`https://flagcdn.com/${(
                                                  country?.iso || "US"
                                                ).toLowerCase()}.svg`}
                                                alt="flag"
                                                width={20}
                                                height={30}
                                                className="rounded-full w-5 h-5 object-cover"
                                              />
                                              <span className="text-base font-medium text-[#020817]">
                                                {country?.code || "+1"}
                                              </span>
                                            </>
                                          );
                                        })()}
                                      </div>
                                      <ChevronDown className="h-4 w-4 opacity-50 shrink-0 text-[#64748B]" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-75 p-0 bg-white! border-[#E2E8F0]! rounded-xl! shadow-xl!"
                                  align="start"
                                >
                                  <Command>
                                    <CommandInput
                                      placeholder="Search country..."
                                      className="h-12 border-none focus:ring-0!"
                                    />
                                    <CommandList className="max-h-72 overflow-y-auto">
                                      <CommandEmpty>
                                        No country found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {countries
                                          .sort((a, b) =>
                                            a.name.localeCompare(b.name),
                                          )
                                          .map((c) => (
                                            <CommandItem
                                              key={c.iso}
                                              value={c.name}
                                              onSelect={() => {
                                                form.setValue(
                                                  "countryCode",
                                                  c.iso,
                                                );
                                              }}
                                              className="flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-[#F8FAFC]!"
                                            >
                                              <img
                                                src={`https://flagcdn.com/${c.iso.toLowerCase()}.svg`}
                                                alt={c.name}
                                                width={20}
                                                height={15}
                                                className="rounded-sm object-cover shrink-0"
                                              />
                                              <span className="text-sm font-medium flex-1">
                                                {c.name}
                                              </span>
                                              <span className="text-sm text-[#64748B]">
                                                {c.code}
                                              </span>
                                              <Check
                                                className={cn(
                                                  "ml-auto h-4 w-4 text-sage",
                                                  field.value === c.iso
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        /> */}

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="flex-1 space-y-0 text-left">
                              <FormControl>
                                <Input
                                  placeholder="Telefonnummer eingeben"
                                  className="h-14! rounded-xl! border-[#E2E8F0]! focus:border-sage! focus-visible:ring-0! text-base placeholder:text-[#CBD5E1] bg-white!"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                className="pl-12! pr-12! h-14! rounded-xl! border-[#E2E8F0]! focus:border-sage! focus-visible:ring-0! text-base placeholder:text-[#94A3B8] bg-white!"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-sage"
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
                                className="pl-12! pr-12! h-14! rounded-xl! border-[#E2E8F0]! focus:border-sage! focus-visible:ring-0! text-base placeholder:text-[#94A3B8] bg-white!"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-sage"
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
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className={`w-full h-15 font-bold text-base rounded-2xl shadow-none transition-all duration-300 mt-4 flex items-center justify-center ${
                      isFormValid && !mutation.isPending
                        ? "cursor-pointer"
                        : "bg-neutral-50 text-neutral-300 border border-neutral-100 cursor-not-allowed"
                    }`}
                  >
                    {mutation.isPending ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      "Konto erstellen"
                    )}
                  </button>

                  <div className="text-center mt-6">
                    <p className="text-base text-[#64748B] font-medium">
                      Haben Sie bereits ein Konto?{" "}
                      <Link
                        to="/auth/login"
                        className="text-sage font-bold hover:underline ml-1"
                      >
                        Anmelden
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full border-t border-slate-200/60 mt-auto">
            <p className="text-[#94A3B8] text-base px-7 py-6 text-center md:text-left">
              © 2026 Slimedo Online-Rezepte. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePatient;
