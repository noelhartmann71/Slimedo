import type { AnswerValue, Question } from "../types";

const CheckIcon = ({ size = 9 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface DynamicQuestionProps {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
}

/** Rendert eine einzelne Frage anhand ihres Typs — komplett schema-getrieben. */
export default function DynamicQuestion({
  question,
  value,
  onChange,
}: DynamicQuestionProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* boolean-Fragen zeigen ihr Label als Checkbox-Text, nicht als Überschrift */}
      {question.type !== "boolean" && (
        <div>
          <p className="text-[16px] font-medium text-black">
            {question.label}
            {!question.required && (
              <span className="text-neutral-400 font-normal"> (optional)</span>
            )}
          </p>
          {question.description && (
            <p className="text-[14px] text-neutral-500 mt-1">
              {question.description}
            </p>
          )}
        </div>
      )}

      {question.type === "single_choice" && (
        <div className="flex flex-col gap-2">
          {(question.options ?? []).map((option) => {
            const selected = value === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onChange(option.id)}
                className={`flex items-center justify-between px-5 py-4 rounded-lg border text-left text-[15px] font-medium text-neutral-600 cursor-pointer transition-colors ${
                  selected
                    ? "bg-neutral-200 border-[#96A9A5]"
                    : "border-neutral-200 hover:bg-gray-50/60"
                }`}
              >
                <span>{option.label}</span>
                {selected && (
                  <span className="w-4.5 h-4.5 rounded bg-sage flex items-center justify-center shrink-0">
                    <CheckIcon />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "multi_choice" && (
        <div className="flex flex-col gap-2">
          {(question.options ?? []).map((option) => {
            const selectedIds = Array.isArray(value) ? value : [];
            const selected = selectedIds.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  const next = selected
                    ? selectedIds.filter((id) => id !== option.id)
                    : [...selectedIds, option.id];
                  onChange(next);
                }}
                className={`flex items-center gap-3 px-5 py-4 rounded-lg border text-left text-[15px] font-medium text-neutral-600 cursor-pointer transition-colors ${
                  selected
                    ? "bg-neutral-200 border-[#96A9A5]"
                    : "border-neutral-200 hover:bg-gray-50/60"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded border shrink-0 flex items-center justify-center transition-colors ${
                    selected ? "bg-sage border-sage" : "border-gray-300 bg-white"
                  }`}
                >
                  {selected && <CheckIcon size={12} />}
                </span>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.type === "text" && (
        <textarea
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={3}
          className="w-full px-5 py-4 border border-neutral-200 rounded-lg text-[15px] text-neutral-600 focus:outline-none focus:border-primary bg-white resize-none"
        />
      )}

      {question.type === "number" && (
        <input
          type="number"
          inputMode="decimal"
          min={0}
          value={typeof value === "number" && !Number.isNaN(value) ? value : ""}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value.replace(",", "."));
            onChange(Number.isNaN(parsed) ? Number.NaN : parsed);
          }}
          placeholder={question.placeholder}
          className="w-full px-5 py-4 border border-neutral-200 rounded-lg text-[15px] text-neutral-600 focus:outline-none focus:border-primary bg-white"
        />
      )}

      {question.type === "boolean" && (
        <label className="flex items-start gap-3 p-4 bg-neutral-200 rounded-xl cursor-pointer select-none">
          <input
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
          />
          <span
            className={`mt-0.5 w-5 h-5 rounded border shrink-0 flex items-center justify-center transition-colors ${
              value === true ? "bg-sage border-sage" : "border-gray-300 bg-white"
            }`}
          >
            {value === true && <CheckIcon size={14} />}
          </span>
          <span className="text-[14px] text-sage leading-relaxed">
            {question.label}
          </span>
        </label>
      )}
    </div>
  );
}
