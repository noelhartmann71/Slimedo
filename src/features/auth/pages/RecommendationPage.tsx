import { TruckIconSvg } from "@/components/svg-container/SvgContainer";
import { useNavigate } from "react-router-dom";
import SuitableImg from "../../../../public/images/home/suitable-img.png";
import MedicationImg from "../../../../public/images/home/medication-img.png";
import InjectionImg from "../../../../public/images/home/injection-img.png";
import MedicineImg from "../../../../public/images/home/medicine-img.png";
import WeightLossOneImg from "../../../../public/images/home/weight-loss.png";
import WeightLossTwoImg from "../../../../public/images/home/weight-loss-two.png";
import WeightLossThreeImg from "../../../../public/images/home/weight-loss-three.png";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/useAxiosPublic";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id?: string | number;
  _id?: string | number;
  name: string;
  price: string | number;
  category?: string;
  details?: string;
  dosage?: {
    quantity: string;
    price: string | number;
  }[];
}

export default function RecommendationPage() {
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosPublic.get("/product");
      return response?.data?.data;
    },
  });

  // Fetch details for the first two products for comparison
  const productId1 = products[0]?.id || products[0]?._id;
  const productId2 = products[1]?.id || products[1]?._id;

  const { data: product1Details, isLoading: isLoading1 } = useQuery({
    queryKey: ["product-details", productId1],
    queryFn: async () => {
      const response = await axiosPublic.get(`/product/show/${productId1}`);
      return response?.data?.data;
    },
    enabled: !!productId1,
  });

  const { data: product2Details, isLoading: isLoading2 } = useQuery({
    queryKey: ["product-details", productId2],
    queryFn: async () => {
      const response = await axiosPublic.get(`/product/show/${productId2}`);
      return response?.data?.data;
    },
    enabled: !!productId2,
  });

  const selectedProductId = localStorage.getItem("product_id");

  const { data: selectedProductDetails, isLoading: isLoadingSelected } =
    useQuery({
      queryKey: ["product-details", selectedProductId],
      queryFn: async () => {
        const response = await axiosPublic.get(
          `/product/show/${selectedProductId}`,
        );
        return response?.data?.data;
      },
      enabled: !!selectedProductId,
    });

  const comparedProducts = [
    {
      name: product1Details?.name || "Mounjaro",
      price: product1Details?.price ? `€${product1Details.price}` : "€206",
      details:
        product1Details?.details ||
        "Which treatment is best for you depends on your individual needs.",
      info: "Average weight loss\n22.5%\nInjection frequency\nWeekly\nFurther advantages\nHighest efficacy",
    },
    {
      name: product2Details?.name || "Wegovy",
      price: product2Details?.price ? `€${product2Details.price}` : "€171",
      details:
        product2Details?.details ||
        "Which treatment is best for you depends on your individual needs.",
      info: "Average weight loss\n15.6%\nInjection frequency\nWeekly\nFurther advantages\nHighest efficacy",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0F0EC] py-5 md:py-10 px-4 font-inter">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* RECOMMENDED PROGRAM CARD */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          <div className="p-8 flex flex-col items-center text-center">
            <span className="text-[12px] font-normal text-[#6B7280] uppercase tracking-wider mb-2">
              Our Recommendation
            </span>
            <h1 className="text-[32px] font-semibold text-black leading-tight">
              Weight loss program
            </h1>
            <p className="text-2xl text-[#6B7280] font-medium flex items-center justify-center gap-1.5 mt-1">
              with Wegovy®
            </p>
          </div>
          <div className="h-px bg-gray-100 w-full" />
          <div className="p-8">
            <h3 className="text-2xl font-medium text-black mb-4">
              This is included
            </h3>
            <ul className="space-y-3">
              {[
                "Including unlimited medical care",
                "Monthly cancellable at any time",
                "100-day money-back guarantee",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-base text-[#6B7280]"
                >
                  <span className="w-1.5 h-1.5 bg-deep rounded-full shrink-0" />
                  {text}
                </li>
              ))}
            </ul>

            {/* Price section */}
            <div className="mt-8 bg-[#E8ECEB] rounded-2xl p-6">
              <div className="grid grid-cols-3 text-center border-b border-gray-200/60 pb-4 mb-4">
                <div>
                  <p className="text-[12px] text-[#6B7280] font-medium">
                    Medication
                  </p>
                  <p className="text-base font-bold text-black">
                    {sessionStorage.getItem("product_name") || "Wegovy®"}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-[#6B7280] font-medium">
                    Frequency
                  </p>
                  <p className="text-base font-bold text-black">Monthly</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#6B7280] font-medium">
                    Dosage
                  </p>
                  <p className="text-base font-bold text-black">
                    {sessionStorage.getItem("product_dosage") || "0.25 mg"}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-base text-[#6B7280] mb-1">
                  <span className="text-[32px] text-black font-semibold mr-0.5">
                    €{localStorage.getItem("medication_price") || "€246"}
                  </span>
                  in the first month
                </p>
                <p className="text-xs text-[#6B7280]">
                  The current monthly price varies depending on the dosage.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/auth/register")}
              className="w-full bg-sage text-white rounded-xl py-4 font-medium text-[15px] mt-6 hover:bg-primary-hover transition shadow-lg"
            >
              To checkout
            </button>
            <p className="text-center text-sm text-[#6B7280] mt-3 flex items-center justify-center gap-1.5">
              <TruckIconSvg /> Fast delivery in 1-2 working days
            </p>
          </div>
        </div>

        {/* SUITABLE ALTERNATIVES CARD */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6 font-medium text-black text-lg">
            <span className="w-7 h-7 bg-sage rounded-full flex items-center justify-center text-white">
              ✓
            </span>
            You are also suitable for
          </div>
          <div className="space-y-3">
            {isLoading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-[#E8ECEB] rounded-2xl border border-transparent"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </div>
                ))
              : products.length > 0
                ? products
                    .slice(0, 2)
                    .map((product: Product, index: number) => (
                      <div
                        key={(product.id || product._id || index).toString()}
                        className="flex items-center justify-between p-4 bg-[#E8ECEB] rounded-2xl border border-transparent hover:border-gray-200 cursor-pointer group transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12">
                            <img src={SuitableImg} alt={product.name} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-base font-bold text-black">
                                {product.name}{" "}
                                {product.dosage?.[0]?.quantity &&
                                  product.dosage[0].quantity}
                              </p>
                              {index === 0 && (
                                <span className="px-2 py-1 bg-sage text-white text-[9px] font-medium rounded-xl">
                                  Best price
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#6B7280] mt-0.5">
                              €{product.price || "0"}-€
                              {product.dosage?.[0]?.price || "0"}
                            </p>
                          </div>
                        </div>
                        <span className="text-black group-hover:text-gray-500 transition">
                          ›
                        </span>
                      </div>
                    ))
                : null}
          </div>
        </div>

        {/* COMPARISON CARD */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <p className="text-[12px] font-normal text-[#6B7280] mb-2">
            MEDICATIONS COMPARED
          </p>
          <h2 className="text-[24px] font-medium text-accent-foreground mb-2 leading-tight">
            {comparedProducts[0].name} vs. {comparedProducts[1].name}
          </h2>
          <p className="text-base text-[#6B7280] mb-8 leading-relaxed">
            Which treatment is best for you depends on your individual needs.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {isLoading1 || isLoading2
              ? Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#E8ECEB] rounded-xl p-5 flex flex-col"
                  >
                    <Skeleton className="w-full h-20 rounded-lg mb-4" />
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ))
              : comparedProducts.map((prod, i) => (
                  <div
                    key={i}
                    className="bg-[#E8ECEB] rounded-xl p-5 flex flex-col"
                  >
                    <div className="w-full h-20 bg-white p-2">
                      <img
                        src={MedicationImg}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[12px] text-[#6B7280] font-medium mt-6 mb-1">
                      First month price
                    </p>
                    <p className="text-[16px] font-bold text-black mb-3">
                      {prod.name} ({prod.price})
                    </p>
                    <div className="space-y-4">
                      {prod.info.split("\n").map((line, idx) => (
                        <div key={idx}>
                          <p
                            className={`leading-none ${idx % 2 === 0 ? "text-[10px] text-gray-400" : "text-[13px] font-bold text-accent-foreground mt-1"}`}
                          >
                            {line}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-6">
                      <p className="text-[#6B7280] text-xs">
                        Further advantages:
                      </p>
                      <p className="text-[#111827] text-xs">Highest efficacy</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* YOUR MEDICATION DETAIL CARD */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 w-full text-left">
            Your Medication
          </p>
          <div className="w-full text-left">
            {isLoadingSelected ? (
              <Skeleton className="h-8 w-48 mb-2" />
            ) : (
              <h2 className="text-[24px] font-bold text-accent-foreground mb-2 leading-tight">
                {`${selectedProductDetails?.name || "Wegovy®"} Injections`}
              </h2>
            )}
          </div>

          {isLoadingSelected ? (
            <Skeleton className="h-4 w-64 mb-6" />
          ) : (
            <p className="text-[14px] text-gray-500 mb-6 leading-relaxed w-full text-left">
              {selectedProductDetails?.details ||
                "Which treatment is best for you depends on your individual needs."}
            </p>
          )}

          <div className="w-full bg-[#E8ECEB] rounded-xl p-3 mb-8 relative">
            <span className="absolute top-8 right-6 text-[20px] font-bold text-accent-foreground">
              -20.7%
            </span>
            <div className="h-42 w-full bg-white p-2">
              <img
                src={InjectionImg}
                alt={selectedProductDetails?.name || "Injection"}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-[12px] text-[#6B7280] mt-6">
              Verliere im Durchschnitt 20.7 % Deines Körpergewichts
            </p>
            <p className="text-center text-[12px] font-normal text-black mt-1 tracking-wider">
              Highest efficacy
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-10 w-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-28">
                <img
                  src={MedicineImg}
                  alt={`Medicine ${i}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>

          <div className="w-full space-y-6">
            <div>
              <h3 className="text-2xl font-medium text-black mb-2">
                What is {selectedProductDetails?.name || "Wegovy®"}?
              </h3>
              <p className="text-[18px] text-[#6B7280] leading-relaxed">
                {selectedProductDetails?.name || "Wegovy®"} is a weekly
                injection containing{" "}
                {selectedProductDetails?.category || "tirzepatide"}, which has
                been clinically proven to help with weight loss.
              </p>
            </div>
            <div>
              <p className="text-[18px] text-[#6B7280] leading-relaxed italic">
                In preventing the most often occurring weight gain problems and
                shows better results than preparations like Ozempic or{" "}
                {selectedProductDetails?.name || "Wegovy®"}. In clinical trials,
                participants in the Vy program lost an average of 15.6% of their
                body weight with {selectedProductDetails?.name || "Wegovy®"}.
              </p>
            </div>
          </div>
        </div>

        {/* PERSONALIZED PLAN CARD */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-[24px] font-medium text-black mb-8 leading-tight">
            Your personalized plan for sustainable weight loss
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "GLP-1 drugs",
                desc: "Reduce cravings and food urges with clinically proven weight loss medications.",
                img: WeightLossOneImg,
              },
              {
                title: "Medical support",
                desc: "Unlimited access to experienced doctors - for advice on dosage, side effects and more.",
                img: WeightLossTwoImg,
              },
              {
                title: "Slimedo progress tracking",
                desc: "Log your weight, track your progress, improve your diet - all in your account.",
                img: WeightLossThreeImg,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-[#E8ECEB] rounded-xl transition hover:bg-white hover:border-gray-100 border border-transparent"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-50 shrink-0 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[16px] font-bold text-black mb-1">
                    {item.title}
                  </p>
                  <p className="text-[16px] text-[#6B7280] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/auth/register")}
            className="w-full bg-deep text-white rounded-xl py-4 font-bold text-[15px] mt-8 hover:bg-primary-hover transition shadow-lg"
          >
            To checkout
          </button>
        </div>
      </div>
    </div>
  );
}
