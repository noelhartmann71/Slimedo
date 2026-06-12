import { describe, expect, it } from "vitest";
import {
  hasDisqualifyingAnswer,
  isPageValid,
  isQuestionAnswered,
} from "./validation";
import type { Question, QuestionnairePage } from "./types";

const single: Question = {
  id: "q1",
  type: "single_choice",
  label: "Frage 1",
  required: true,
  options: [
    { id: "a", label: "A" },
    { id: "b", label: "B", disqualifying: true },
  ],
};

const multi: Question = {
  id: "q2",
  type: "multi_choice",
  label: "Frage 2",
  required: true,
  options: [
    { id: "none", label: "Keine" },
    { id: "x", label: "X", disqualifying: true },
  ],
};

const text: Question = {
  id: "q3",
  type: "text",
  label: "Frage 3",
  required: false,
};

const number: Question = {
  id: "q4",
  type: "number",
  label: "Frage 4",
  required: true,
};

const confirm: Question = {
  id: "q5",
  type: "boolean",
  label: "Bestätigung",
  required: true,
};

describe("isQuestionAnswered", () => {
  it("validates single_choice", () => {
    expect(isQuestionAnswered(single, "a")).toBe(true);
    expect(isQuestionAnswered(single, "")).toBe(false);
    expect(isQuestionAnswered(single, undefined)).toBe(false);
  });

  it("validates multi_choice", () => {
    expect(isQuestionAnswered(multi, ["none"])).toBe(true);
    expect(isQuestionAnswered(multi, [])).toBe(false);
  });

  it("validates text", () => {
    expect(isQuestionAnswered(text, "hello")).toBe(true);
    expect(isQuestionAnswered(text, "   ")).toBe(false);
  });

  it("validates number", () => {
    expect(isQuestionAnswered(number, 92)).toBe(true);
    expect(isQuestionAnswered(number, 0)).toBe(false);
    expect(isQuestionAnswered(number, Number.NaN)).toBe(false);
  });

  it("validates boolean confirmations", () => {
    expect(isQuestionAnswered(confirm, true)).toBe(true);
    expect(isQuestionAnswered(confirm, false)).toBe(false);
  });
});

describe("isPageValid", () => {
  const page: QuestionnairePage = {
    id: "p1",
    title: "Seite",
    questions: [single, text],
  };

  it("requires answers only for required questions", () => {
    expect(isPageValid(page, {})).toBe(false);
    expect(isPageValid(page, { q1: "a" })).toBe(true);
  });
});

describe("hasDisqualifyingAnswer", () => {
  const page: QuestionnairePage = {
    id: "p1",
    title: "Seite",
    questions: [single, multi],
  };

  it("detects a disqualifying single-choice answer", () => {
    expect(hasDisqualifyingAnswer(page, { q1: "b" })).toBe(true);
    expect(hasDisqualifyingAnswer(page, { q1: "a" })).toBe(false);
  });

  it("detects a disqualifying multi-choice answer", () => {
    expect(hasDisqualifyingAnswer(page, { q2: ["none", "x"] })).toBe(true);
    expect(hasDisqualifyingAnswer(page, { q2: ["none"] })).toBe(false);
  });

  it("returns false when nothing is answered", () => {
    expect(hasDisqualifyingAnswer(page, {})).toBe(false);
  });
});
