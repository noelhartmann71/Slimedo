import type { ReactNode } from "react";
import { PROFILE_USER } from "../constants";
import { ChevronDownIcon } from "./ProfileIcons";
import useUser from "@/hooks/useUser";

type ProfileIdentityHeaderProps = {
  name?: string;
  email?: string;
  initials?: string;
};

type ProfileFieldProps = {
  label: string;
  value: string;
  multiline?: boolean;
  dropdown?: boolean;
  leading?: ReactNode;
  borderColor?: string;
  leadingDivider?: boolean;
};

export function ProfileIdentityHeader({
  name = PROFILE_USER.name,
  email = PROFILE_USER.email,
  initials = PROFILE_USER.initials,
}: ProfileIdentityHeaderProps) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-[#e5e7eb] animate-pulse" />
        <div className="min-w-0 flex-1">
          <div className="h-6 w-40 mb-2 rounded bg-[#e5e7eb] animate-pulse" />
          <div className="h-4 w-56 rounded bg-[#e5e7eb] animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#d1d5db] text-[14px] font-semibold text-primary">
        {user?.first_name?.charAt(0) + user?.last_name?.charAt(0) || initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[24px] font-medium leading-8 tracking-[-0.48px] text-black">
          {user?.first_name + " " + user?.last_name || name}
        </p>
        <p className="truncate text-[16px] font-normal leading-6 text-muted-foreground">
          {user?.email || email}
        </p>
      </div>
    </div>
  );
}

export function ProfileSectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-[20px] font-semibold leading-7 tracking-[-0.4px] text-black">
      {title}
    </h2>
  );
}

export function ProfileDivider() {
  return <div className="h-px w-full bg-[#dce4e8]" />;
}

export function ProfileField({
  label,
  value,
  multiline = false,
  dropdown = false,
  leading,
  borderColor = "#dce4e8",
  leadingDivider = false,
}: ProfileFieldProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col pb-2.75">
      <div className="z-2 -mb-2.75 px-3">
        <span className="inline-flex h-5.25 items-center justify-center rounded-full bg-white px-1.75 text-[12px] font-normal leading-5 text-[#acb5bb]">
          {label}
        </span>
      </div>
      <div
        className={`z-1 -mb-2.75 flex rounded-[10px] border bg-white px-5 ${
          multiline ? "min-h-29 items-start py-6" : "h-14 items-center"
        }`}
        style={{ borderColor }}
      >
        <div
          className={`flex min-w-0 flex-1 gap-3 ${multiline ? "items-start" : "items-center"}`}
        >
          {leading}
          {leadingDivider && (
            <span
              className="h-4 w-px shrink-0 bg-[#d1d5db]"
              aria-hidden="true"
            />
          )}
          <p className="truncate text-[16px] font-medium leading-6 text-accent-foreground">
            {value}
          </p>
        </div>
        {dropdown && (
          <span className={multiline ? "pt-0.5" : ""}>
            <ChevronDownIcon className="h-6 w-6" stroke="#1a1c1e" />
          </span>
        )}
      </div>
    </div>
  );
}
