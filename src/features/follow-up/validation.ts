// Reine Validierungslogik des dynamischen Fragebogens (UX-Validierung;
// die fachliche Validierung übernimmt das Backend).

import type {
  AnswerMap,
  AnswerValue,
  Question,
  QuestionnairePage,
} from "./types";

export function isQuestionAnswered(
  question: Question,
  value: AnswerValue | undefined,
): boolean {
  switch (question.type) {
    case "single_choice":
      return typeof value === "string" && value !== "";
    case "multi_choice":
      return Array.isArray(value) && value.length > 0;
    case "text":
      return typeof value === "string" && value.trim() !== "";
    case "number":
      return typeof value === "number" && !Number.isNaN(value) && value > 0;
    case "boolean":
      // Bestätigungsfragen: nur "Ja" zählt als beantwortet.
      return value === true;
    default:
      return false;
  }
}

export function isPageValid(
  page: QuestionnairePage,
  answers: AnswerMap,
): boolean {
  return page.questions.every(
    (q) => !q.required || isQuestionAnswered(q, answers[q.id]),
  );
}

/** Liefert true, wenn auf der Seite eine als `disqualifying` markierte Option gewählt wurde. */
export function hasDisqualifyingAnswer(
  page: QuestionnairePage,
  answers: AnswerMap,
): boolean {
  return page.questions.some((question) => {
    if (!question.options) return false;
    const value = answers[question.id];
    const selectedIds = Array.isArray(value)
      ? value
      : typeof value === "string"
        ? [value]
        : [];
    return question.options.some(
      (option) => option.disqualifying && selectedIds.includes(option.id),
    );
  });
}
