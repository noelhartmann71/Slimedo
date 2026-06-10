import { useState } from "react";
import { CalendarIcon } from "../components/ProfileIcons";
import ProfileDashboardLayout from "../components/ProfileDashboardLayout";
import { ProfileIdentityHeader } from "../components/ProfileWidgets";

export default function ProfileQuestionnairePage() {
  const [formData, setFormData] = useState({
    currentWeight: "180 lbs",
    targetWeight: "160 lbs",
    dietTypePreference: "Balanced",
    exerciseFrequency: "3-4 times per week",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ProfileDashboardLayout activeSection="questionnaire">
      <div className="flex flex-col gap-6">
        <ProfileIdentityHeader />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-accent-foreground">
              Latest Questionnaire
            </p>
            <p className="flex items-center gap-2 text-[16px] font-normal leading-6 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" stroke="#6B7280" />
              February 02, 2026
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-2">
            {/* Current Weight Input */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                  Current Weight
                </span>
              </div>
              <input
                type="number"
                value={formData.currentWeight}
                onChange={(e) => handleChange("currentWeight", e.target.value)}
                className="z-1 -mb-2.75 rounded-[10px] border border-neutral-200 bg-white px-5 h-14 text-[16px] font-medium leading-6 text-accent-foreground placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            {/* Target Weight Input */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                  Target Weight
                </span>
              </div>
              <input
                type="number"
                value={formData.targetWeight}
                onChange={(e) => handleChange("targetWeight", e.target.value)}
                className="z-1 -mb-2.75 rounded-[10px] border border-neutral-200 bg-white px-5 h-14 text-[16px] font-medium leading-6 text-accent-foreground placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            {/* Diet Type Preference Textarea */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                  Diet Type Preference
                </span>
              </div>
              <textarea
                value={formData.dietTypePreference}
                onChange={(e) =>
                  handleChange("dietTypePreference", e.target.value)
                }
                className="z-1 -mb-2.75 rounded-[10px] border border-neutral-200 bg-white px-5 py-4 min-h-29 text-[16px] font-medium leading-6 text-accent-foreground placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
            {/* Exercise Frequency Textarea */}
            <div className="flex min-w-0 flex-1 flex-col pb-2.75">
              <div className="z-2 -mb-2.75 px-3">
                <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-neutral-400">
                  Exercise Frequency
                </span>
              </div>
              <textarea
                value={formData.exerciseFrequency}
                onChange={(e) =>
                  handleChange("exerciseFrequency", e.target.value)
                }
                className="z-1 -mb-2.75 rounded-[10px] border border-neutral-200 bg-white px-5 py-4 min-h-29 text-[16px] font-medium leading-6 text-accent-foreground placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </ProfileDashboardLayout>
  );
}
