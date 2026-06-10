import ProfileDashboardLayout from "../components/ProfileDashboardLayout";
import {
  ProfileDivider,
  ProfileIdentityHeader,
  ProfileSectionTitle,
} from "../components/ProfileWidgets";
import useUser from "@/hooks/useUser";
import { Check } from "lucide-react";

const BooleanDisplay = ({
  label,
  value,
}: {
  label: string;
  value: boolean;
}) => (
  <div className="flex items-center justify-between rounded-[10px] border border-neutral-200 bg-white px-5 h-14">
    <span className="text-[16px] font-medium text-neutral-400">{label}</span>
    <div
      className={`flex h-6 w-6 items-center justify-center rounded-full ${
        value ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
      }`}
    >
      <Check className="h-4 w-4" />
    </div>
  </div>
);

const InfoField = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col">
      <div className="z-2 -mb-2.75 px-3">
        <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
          {label}
        </span>
      </div>
      <div className="z-1 flex h-14 items-center rounded-[10px] border border-neutral-200 bg-white px-5 text-[16px] font-medium leading-6 text-accent-foreground">
        {value}
      </div>
    </div>
  );
};

export default function ProfileHealthInformationPage() {
  const { user, isLoading } = useUser();

  const pd = user?.patient_data;
  const formData = {
    allergies: pd?.allergies || "No allergies reported",
    comorbidities: pd?.comorbidities || "No comorbidities reported",
    bmi: pd?.bmi || "N/A",
    dosage: pd?.dosage || "N/A",
    status: pd?.status || "N/A",
    productName: pd?.product?.name || "N/A",
    category: pd?.product?.category || "N/A",
    confirmation: pd?.confirmation || false,
    finalConfirmation: pd?.final_confirmation || false,
    suitabilityCheck: pd?.suitability_check || false,
    incompatibleMedication: pd?.incompitable_medication || false,
    sideEffect: pd?.side_effect || false,
    treatmentIsAgree: pd?.treatment_is_agree || false,
  };

  if (isLoading) {
    return (
      <ProfileDashboardLayout activeSection="health-information">
        <div className="flex items-center justify-center min-h-100">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </ProfileDashboardLayout>
    );
  }

  return (
    <ProfileDashboardLayout activeSection="health-information">
      <div className="flex flex-col gap-6">
        <ProfileIdentityHeader
          name={user?.name}
          email={user?.email}
          initials={user?.name?.slice(0, 2).toUpperCase()}
        />
        <ProfileDivider />

        <div className="flex flex-col gap-8 pb-20">
          {/* Section 1: Product & Treatment */}
          <div className="flex flex-col gap-5">
            <ProfileSectionTitle title="Current Treatment" />
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-2">
              <InfoField label="Product Name" value={formData.productName} />
              <InfoField label="Category" value={formData.category} />
              <InfoField label="Prescribed Dosage" value={formData.dosage} />
              <div className="flex flex-col">
                <div className="z-2 -mb-2.75 px-3">
                  <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                    Status
                  </span>
                </div>
                <div className="z-1 flex h-14 items-center rounded-[10px] border border-neutral-200 bg-white px-5">
                  <span
                    className={`rounded-full px-3 py-1 text-[14px] font-bold ${
                      formData.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {formData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Health Metrics */}
          <div className="flex flex-col gap-5">
            <ProfileSectionTitle title="Health Metrics" />
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-2">
              <InfoField label="BMI Score" value={formData.bmi} />
              <div className="hidden xl:block"></div>
              <div className="flex flex-col">
                <div className="z-2 -mb-2.75 px-3">
                  <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                    Allergies
                  </span>
                </div>
                <div className="z-1 min-h-24 rounded-[10px] border border-neutral-200 bg-white px-5 py-4 text-[16px] font-medium leading-6 text-accent-foreground">
                  {formData.allergies}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="z-2 -mb-2.75 px-3">
                  <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                    Comorbidities
                  </span>
                </div>
                <div className="z-1 min-h-24 rounded-[10px] border border-neutral-200 bg-white px-5 py-4 text-[16px] font-medium leading-6 text-accent-foreground">
                  {formData.comorbidities}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Confirmations & Checks */}
          <div className="flex flex-col gap-5">
            <ProfileSectionTitle title="Confirmations & Safety Checks" />
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-2">
              <BooleanDisplay
                label="Initial Confirmation"
                value={formData.confirmation}
              />
              <BooleanDisplay
                label="Final Confirmation"
                value={formData.finalConfirmation}
              />
              <BooleanDisplay
                label="Suitability Check"
                value={formData.suitabilityCheck}
              />
              <BooleanDisplay
                label="Incompatible Medication Check"
                value={formData.incompatibleMedication}
              />
              <BooleanDisplay
                label="Side Effect Awareness"
                value={formData.sideEffect}
              />
              <BooleanDisplay
                label="Treatment Agreement"
                value={formData.treatmentIsAgree}
              />
            </div>
          </div>
        </div>
      </div>
    </ProfileDashboardLayout>
  );
}
