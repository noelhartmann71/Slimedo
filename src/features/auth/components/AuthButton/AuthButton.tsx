interface AuthButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "outline";
  disabled?: boolean;
}

export default function AuthButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}: AuthButtonProps) {
  if (variant === "outline") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="w-full border border-neutral-300 rounded-lg py-2.5 text-[13.5px] font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition cursor-pointer"
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-deep hover:bg-primary-hover text-cream rounded-lg py-2.5 text-[13.5px] font-medium transition cursor-pointer disabled:opacity-50"
    >
      {children}
    </button>
  );
}
