import { useState } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

export default function FormInput({
  label,
  icon,
  isPassword = false,
  type,
  ...rest
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[13px] font-medium text-gray-700">{label}</label>
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-gray-400 flex items-center pointer-events-none">
            {icon}
          </span>
        )}
        <input
          type={inputType}
          className={`w-full border border-gray-200 rounded-lg bg-white text-[13.5px] text-gray-800 placeholder-gray-400 py-2.25 pr-9 outline-none focus:border-[#1d3a35] focus:ring-1 focus:ring-[#1d3a35] transition ${icon ? "pl-9" : "pl-3"}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 text-gray-400 hover:text-gray-600 flex items-center"
            onClick={() => setShowPassword((p) => !p)}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
