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
        className="w-full border border-gray-300 rounded-lg py-2.5 text-[13.5px] font-medium text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer"
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
      className="w-full bg-[#1d3a35] hover:bg-[#16302b] text-white rounded-lg py-2.5 text-[13.5px] font-medium transition cursor-pointer disabled:opacity-50"
    >
      {children}
    </button>
  );
}
