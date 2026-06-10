import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Pill badge / section eyebrow extracted from the landing
// (e.g. the mint "FAQ" eyebrow: mint bg, deep text, 12px/600, 0.04em tracking).
const badgeVariants = cva(
  "inline-flex items-center rounded-pill px-4 py-1 text-xs font-semibold tracking-[0.04em]",
  {
    variants: {
      variant: {
        default: "bg-mint text-deep", // section eyebrow
        sage: "bg-sage text-cream",
        outline: "border border-sage/40 text-sage",
        success: "bg-success-subtle text-success",
        error: "bg-error-subtle text-error",
        warning: "bg-warning-subtle text-warning",
        info: "bg-info-subtle text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
