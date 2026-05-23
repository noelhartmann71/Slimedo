import type { ProfileSectionKey } from "./types";

export type ProfileNavigationItem = {
  key: ProfileSectionKey;
  label: string;
  path: string;
};

export const PROFILE_USER = {
  initials: "AR",
  name: "Abdur Rahim",
  email: "demo!mail@gmail.com",
};

export const PROFILE_NAVIGATION_ITEMS: ProfileNavigationItem[] = [
  {
    key: "overview",
    label: "Overview",
    path: "/patient/profile/overview",
  },
  {
    key: "personal-information",
    label: "Information & Addresss",
    path: "/patient/profile/personal-information",
  },
  {
    key: "health-information",
    label: "Health Information",
    path: "/patient/profile/health-information",
  },
  // {
  //   key: "questionnaire",
  //   label: "Questionnaire",
  //   path: "/patient/profile/questionnaire",
  // },
  {
    key: "payment-methods",
    label: "Payment Methods",
    path: "/patient/profile/payment-methods",
  },
];
