import type { ProfileSectionKey } from "../types";

type IconBaseProps = {
  className?: string;
  stroke?: string;
};

function iconClassName(className?: string): string {
  return className ?? "h-[18px] w-[18px]";
}

export function ProfileNavIcon({
  section,
  active,
  className,
}: {
  section: ProfileSectionKey;
  active: boolean;
  className?: string;
}) {
  const stroke = active ? "#1B433B" : "#6B7280";

  switch (section) {
    case "overview":
      return (
        <svg
          className={iconClassName(className)}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "address":
      return (
        <svg
          className={iconClassName(className)}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      );
    case "health-information":
      return (
        <svg
          className={iconClassName(className)}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3 5 6v5c0 5.2 3.3 9 7 10 3.7-1 7-4.8 7-10V6l-7-3Z" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </svg>
      );
    case "questionnaire":
      return (
        <svg
          className={iconClassName(className)}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      );
    case "payment-methods":
      return (
        <svg
          className={iconClassName(className)}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M10.5 8.5h2.2a1.9 1.9 0 0 1 0 3.8h-2.2V16" />
          <path d="M9 9h5" />
          <path d="M9 16h5" />
        </svg>
      );
    default:
      return (
        <svg
          className={iconClassName(className)}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      );
  }
}

export function PlusIcon({
  className,
  stroke = "currentColor",
}: IconBaseProps) {
  return (
    <svg
      className={iconClassName(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function EditIcon({
  className,
  stroke = "currentColor",
}: IconBaseProps) {
  return (
    <svg
      className={iconClassName(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4 20 4.2-1 9.1-9.1a2.3 2.3 0 1 0-3.2-3.2L5 15.8 4 20Z" />
      <path d="m13.5 7.5 3 3" />
    </svg>
  );
}

export function TrashIcon({
  className,
  stroke = "currentColor",
}: IconBaseProps) {
  return (
    <svg
      className={iconClassName(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 12h10l1-12" />
      <path d="M9 7V5h6v2" />
    </svg>
  );
}

export function CalendarIcon({
  className,
  stroke = "currentColor",
}: IconBaseProps) {
  return (
    <svg
      className={iconClassName(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
    </svg>
  );
}

export function ChevronDownIcon({
  className,
  stroke = "currentColor",
}: IconBaseProps) {
  return (
    <svg
      className={iconClassName(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function BangladeshFlag({ className }: { className?: string }) {
  return (
    <span
      className={
        className ??
        "relative inline-flex h-4 w-6 items-center justify-center overflow-hidden rounded-xs border border-[#9CA3AF] bg-[#0B8A4A]"
      }
      aria-hidden="true"
    >
      <span className="h-1.75 w-1.75 rounded-full bg-[#EF4444]" />
    </span>
  );
}

export function MastercardMark({ className }: { className?: string }) {
  return (
    <span
      className={className ?? "relative inline-flex h-5 w-8"}
      aria-hidden="true"
    >
      <span className="absolute left-0 top-0 h-5 w-5 rounded-full bg-[#EB001B]" />
      <span className="absolute right-0 top-0 h-5 w-5 rounded-full bg-[#F79E1B]" />
      <span className="absolute left-1.75 top-0 h-5 w-2.5 bg-[#FF5F00]/80" />
    </span>
  );
}
