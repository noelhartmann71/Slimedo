import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Popover from "@radix-ui/react-popover";
import {
  DropdownIcon,
  MedizinischerFragebogenIcon,
  NavbarIcon,
  WarnIcon,
} from "../../../components/svg-container/SvgContainer";
import MastercardImg from "../../../../public/images/logo/payment.png";
import ApplePayImg from "../../../../public/images/payment-method/ApplePay.png";
import PaymentsImg from "../../../../public/images/payment-method/Payments.png";
import PaypalImg from "../../../../public/images/payment-method/PayPal.png";
import StripeImg from "../../../../public/images/payment-method/Stripe.png";
import VisaImg from "../../../../public/images/payment-method/Visa.png";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import useSystemSetting from "@/hooks/useSystemSetting";
import toast from "react-hot-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  phone: string;
  streetName: string;
  houseNumber: string;
  additionalAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

interface payloadData {
  street: string;
  house: string;
  additional_address: string;
  city: string;
  postal: string;
  country: string;
}

export default function ReviewAccountPage() {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [openCountry, setOpenCountry] = useState(false);
  const { settings } = useSystemSetting();
  const [showDetails, setShowDetails] = useState(true);

  const medicationPrice = Number(localStorage.getItem("medication_price") || 0);
  const prescriptionFee = Number(settings?.prescription_fee || 0);
  const totalPrice = medicationPrice + prescriptionFee;

  const [formData, setFormData] = useState<FormData>(() => {
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;

    const defaultData: FormData = {
      firstName: userData?.first_name || "",
      lastName: userData?.last_name || "",
      email: userData?.email || "demo1mail@gmail.com",
      phone: userData?.phone || "",
      streetName: "",
      houseNumber: "",
      additionalAddress: "",
      city: "",
      postalCode: "",
      country: "",
      birthday: "",
    };

    return defaultData;
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (payload: payloadData) => {
      const response = await axiosSecure.post("/profile/update", payload);
      return response.data;
    },
    onSuccess: () => {
      localStorage.setItem("deliveryAddress", JSON.stringify(formData));
      navigate("/auth/delivery-method-selection");
    },
    onError: () => {
      toast.error("Profil konnte nicht aktualisiert werden");
    },
  });

  const countries = ["Bangladesh", "India", "Pakistan", "Germany", "USA"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      street: formData.streetName,
      house: formData.houseNumber,
      additional_address: formData.additionalAddress,
      city: formData.city,
      postal: formData.postalCode,
      country: formData.country,
    };
    updateProfileMutation.mutate(payload);
  };

  return (
    <div className="bg-[#f7f8f6] min-h-screen flex font-inter">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 px-3 sm:px-6 py-4 flex items-center justify-between z-50">
        <button
          onClick={() => navigate(-1)}
          className="text-deep text-xs sm:text-base font-medium cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <MedizinischerFragebogenIcon />
            Medizinischer Fragebogen
          </div>
        </button>
        <NavbarIcon />
        <button
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-gray-900 text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row items-start justify-center pt-22.5 md:pt-20 lg:pt-25 px-4 sm:px-8 gap-7 lg:gap-14">
        {/* Left side - Review form */}
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-card-sm p-6 lg:p-8 shadow-sm">
            {/* Patient data section */}
            <div className="mb-8 pb-8 border-b border-neutral-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-black">Patient data</h2>
                <button className="text-[14px] text-primary font-semibold hover:underline cursor-pointer">
                  Change
                </button>
              </div>
              <div className="text-[14px] text-muted-foreground flex flex-row justify-between">
                <div className="flex flex-col justify-between gap-3">
                  <p className="text-neutral-500">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p>{formData.birthday}</p>
                </div>
                <div className="flex flex-col justify-between gap-3">
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                </div>
              </div>
            </div>

            {/* Delivery address section */}
            <div className="">
              <h2 className="text-xl font-medium text-black mb-6">
                Delivery address
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Street name & House number */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-[14px] text-muted-foreground block mb-2">
                      Street name
                    </label>
                    <input
                      type="text"
                      name="streetName"
                      value={formData.streetName}
                      onChange={handleInputChange}
                      placeholder="Rajshahi"
                      className="w-full px-5 py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[14px] text-muted-foreground block mb-2">
                      House number
                    </label>
                    <input
                      type="text"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 101"
                      className="w-full px-5 py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
                    />
                  </div>
                </div>

                {/* Additional address */}
                <div>
                  <label className="text-[14px] text-muted-foreground block mb-2">
                    Additional address (optional)
                  </label>
                  <input
                    type="text"
                    name="additionalAddress"
                    value={formData.additionalAddress}
                    onChange={handleInputChange}
                    placeholder="Apartment 4B"
                    className="w-full px-5 py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
                  />
                </div>

                {/* City & Postal code */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-[14px] text-muted-foreground block mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Natore"
                      className="w-full px-5 py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[14px] text-muted-foreground block mb-2">
                      Postal code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="1011"
                      className="w-full px-5 py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="text-[14px] text-muted-foreground block mb-2">
                    Country
                  </label>
                  <Popover.Root
                    open={openCountry}
                    onOpenChange={setOpenCountry}
                  >
                    <Popover.Trigger asChild>
                      <button
                        type="button"
                        className="w-full px-5 py-4 border border-neutral-200 rounded-md text-[16px] text-neutral-600 focus:outline-none focus:border-primary bg-white hover:border-neutral-300 flex items-center justify-between transition-colors"
                      >
                        <span>{formData.country}</span>
                        <svg
                          className={`w-4 h-4 text-muted-foreground transition-transform ${
                            openCountry ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <DropdownIcon />
                        </svg>
                      </button>
                    </Popover.Trigger>
                    <Popover.Content className="w-(--radix-popover-trigger-width) rounded-md border border-neutral-200 bg-white shadow-md p-1 z-50">
                      <div className="flex flex-col">
                        {countries.map((country) => (
                          <button
                            key={country}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                country: country,
                              }));
                              setOpenCountry(false);
                            }}
                            className={`px-4 py-2 text-left text-[16px] rounded transition-colors ${
                              formData.country === country
                                ? "bg-primary text-white"
                                : "text-neutral-600 hover:bg-[#f3f4f6]"
                            }`}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    </Popover.Content>
                  </Popover.Root>
                </div>

                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="w-full bg-sage text-white rounded-lg py-4 text-[16px] font-medium transition cursor-pointer mt-6"
                >
                  {updateProfileMutation.isPending
                    ? "Updating..."
                    : "Create account"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right side - Order overview */}
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-card-sm p-6 lg:p-8 shadow-sm">
            {/* Header - always visible */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium text-[#000000]">
                Order overview
              </h2>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-base text-sage font-semibold hover:underline cursor-pointer"
              >
                {showDetails ? "Hide details" : "Show details"}
              </button>
            </div>

            {/* These sections hide when showDetails is false */}
            {showDetails && (
              <>
                {/* Product */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <p className="text-[14px] text-neutral-500 mb-2">
                      {sessionStorage.getItem("product_name") || "Product Name"}
                    </p>
                    <span className="text-[16px] font-medium text-sage">
                      €{localStorage.getItem("medication_price") || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[14px] text-neutral-500 mb-2">
                      Shipping costs
                    </p>
                    <span className="text-base text-sage font-semibold">
                      Pending
                    </span>
                  </div>
                </div>

                {/* Info box */}
                <div className="bg-neutral-200 rounded-lg p-4 mb-6 flex gap-3">
                  <WarnIcon />
                  <p className="text-[14px] text-muted-foreground">
                    The pharmacy will contact you within a few hours with
                    payment and shipping information.
                  </p>
                </div>

                {/* Prescription Fee */}
                <div className="mb-6 pb-6 border-b border-neutral-200 flex justify-between items-center">
                  <p className="text-[14px] text-muted-foreground">
                    Prescription Fee
                  </p>
                  <span className="text-[16px] font-medium text-sage">
                    €{settings?.prescription_fee || "0.00"}
                  </span>
                </div>
              </>
            )}

            {/* In total - always visible */}
            <div className="mb-6 pb-6">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-sage mb-2">
                  In total
                </p>
                <p className="text-[20px] font-semibold text-sage mb-4">
                  €{totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="space-y-2 text-[14px] text-muted-foreground">
                <div className="flex justify-between">
                  <span>Due now</span>
                  <span className="text-sage font-medium">
                    €{settings?.prescription_fee || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment at the pharmacy</span>
                  <span className="text-sage font-medium">
                    €{medicationPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment methods - always visible */}
            <div className="bg-[#F3F4F6] p-4 rounded-lg">
              <p className="text-base text-neutral-500 mb-3 border-b border-neutral-200 pb-3">
                Payment methods
              </p>
              <div className="flex items-center gap-1.5">
                <img
                  src={MastercardImg}
                  alt="Mastercard"
                  className="w-8.5 h-6"
                />
                <img src={ApplePayImg} alt="Apple Pay" className="w-8.5 h-6" />
                <img src={PaymentsImg} alt="Payments" className="w-8.5 h-6" />
                <img src={PaypalImg} alt="PayPal" className="w-8.5 h-6" />
                <img src={StripeImg} alt="Stripe" className="w-8.5 h-6" />
                <img src={VisaImg} alt="Visa" className="w-8.5 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
