import type { AnswerMap, AnswerValue, QuestionnairePage } from "../types";
import DynamicQuestion from "./DynamicQuestion";

interface DynamicQuestionPageProps {
  page: QuestionnairePage;
  pageNumber: number;
  pageCount: number;
  answers: AnswerMap;
  onAnswer: (questionId: string, value: AnswerValue) => void;
}

/** Rendert eine Fragebogen-Seite mit allen Fragen. */
export default function DynamicQuestionPage({
  page,
  pageNumber,
  pageCount,
  answers,
  onAnswer,
}: DynamicQuestionPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[18px] font-semibold text-black tracking-wider mb-2">
          <span className="bg-[#F3F4F6] p-2.5 rounded-full text-base">
            {pageNumber}/{pageCount}
          </span>{" "}
          &nbsp; {page.title}
        </p>
        {page.description && (
          <p className="text-[14px] text-neutral-500 mt-3 leading-relaxed">
            {page.description}
          </p>
        )}
      </div>

      {/* Bestätigungsfragen (boolean) rendern ihr Label selbst als Checkbox-Text */}
      {page.questions.map((question) => (
        <DynamicQuestion
          key={question.id}
          question={question}
          value={answers[question.id]}
          onChange={(value) => onAnswer(question.id, value)}
        />
      ))}
    </div>
  );
}
