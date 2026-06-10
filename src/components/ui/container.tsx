import * as React from "react";
import { cn } from "@/lib/utils";

// Horizontal content wrapper — centers content and applies the responsive
// gutter used across the landing page (≈20px → 40px).
const widths = {
  prose: "max-w-[800px]", // narrow text columns (FAQ, legal, forms)
  default: "max-w-[1240px]", // standard sections / nav
  wide: "max-w-[1400px]",
  full: "max-w-none",
} as const;

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: keyof typeof widths;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, width = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", widths[width], className)}
      {...props}
    />
  ),
);
Container.displayName = "Container";

export { Container };
