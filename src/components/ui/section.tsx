import * as React from "react";
import { cn } from "@/lib/utils";

// Vertical-rhythm wrapper for page sections. Background is intentionally NOT
// baked in — the landing controls section backgrounds + gradient bridges
// itself; callers pass a `bg-*` token when needed.
const paddings = {
  sm: "py-12 sm:py-16",
  default: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-28 lg:py-32",
  none: "",
} as const;

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: keyof typeof paddings;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding = "default", ...props }, ref) => (
    <section ref={ref} className={cn(paddings[padding], className)} {...props} />
  ),
);
Section.displayName = "Section";

export { Section };
