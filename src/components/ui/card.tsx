import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Card surface extracted from the landing (warm off-white, soft border,
// green-tinted elevation). Uses the radius + shadow tokens from @theme.
const cardVariants = cva(
  "border border-sand-shadow/50 bg-surf text-ink",
  {
    variants: {
      radius: {
        default: "rounded-card",
        sm: "rounded-card-sm",
      },
      elevation: {
        flat: "",
        raised: "shadow-card",
        interactive:
          "shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-dropdown",
      },
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      radius: "default",
      elevation: "raised",
      padding: "default",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, radius, elevation, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ radius, elevation, padding }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export { Card, cardVariants };
