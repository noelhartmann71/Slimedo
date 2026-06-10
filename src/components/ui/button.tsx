import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Slimedo brand buttons — pill shape, brand greens, cream text.
// Variant names match the prior shadcn set so existing call sites keep working;
// only the skin changed (slate → brand tokens).
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-sage text-cream hover:bg-deep",
        primary: "bg-sage text-cream hover:bg-deep",
        cta: "bg-primary text-cream shadow-cta hover:bg-primary-hover",
        destructive: "bg-error text-white hover:bg-error/90",
        outline:
          "border border-sage/65 bg-transparent text-sage hover:border-sage hover:bg-sage/10 hover:text-deep",
        secondary: "bg-sand text-deep hover:bg-sand2",
        ghost: "bg-transparent text-sage hover:bg-sage/10 hover:text-deep",
        link: "text-sage underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
