import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowUpQuestionnaire } from "../api";
import type { AnswerMap, AnswerValue } from "../types";
import {
  hasDisqualifyingAnswer,
  isPageValid,
} from "../validation";

// Antworten werden NICHT in localStorage gehalten (dort liegen die Keys des
// Erst-Flows). Ein namespaced sessionStorage-Mirror macht den Fragebogen
// Refresh-resistent, ohne den Erst-Flow zu kontaminieren.
const ANSWERS_STORAGE_KEY = "followup_answers";

function readStoredAnswers(): AnswerMap {
  try {
    const raw = sessionStorage.getItem(ANSWERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AnswerMap) : {};
  } catch {
    return {};
  }
}

export default function useFollowUpQuestionnaire() {
  const { data: schema, isLoading } = useQuery({
    queryKey: ["follow-up-questionnaire"],
    queryFn: fetchFollowUpQuestionnaire,
  });

  const pages = useMemo(() => schema?.pages ?? [], [schema]);

  const [pageIndex, setPageIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>(readStoredAnswers);

  useEffect(() => {
    sessionStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const setAnswer = useCallback((questionId: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const currentPage = pages[pageIndex];
  const isLastPage = pages.length > 0 && pageIndex === pages.length - 1;

  const isNotEligible = currentPage
    ? hasDisqualifyingAnswer(currentPage, answers)
    : false;

  const canProceed = currentPage
    ? isPageValid(currentPage, answers) && !isNotEligible
    : false;

  /** Geht eine Seite weiter; liefert false auf der letzten Seite (→ Submit). */
  const goNext = useCallback((): boolean => {
    if (pageIndex < pages.length - 1) {
      setPageIndex((i) => i + 1);
      return true;
    }
    return false;
  }, [pageIndex, pages.length]);

  /** Geht eine Seite zurück; liefert false auf der ersten Seite. */
  const goBack = useCallback((): boolean => {
    if (pageIndex > 0) {
      setPageIndex((i) => i - 1);
      return true;
    }
    return false;
  }, [pageIndex]);

  const clearStoredAnswers = useCallback(() => {
    sessionStorage.removeItem(ANSWERS_STORAGE_KEY);
  }, []);

  return {
    isLoading,
    pages,
    pageIndex,
    currentPage,
    isLastPage,
    answers,
    setAnswer,
    canProceed,
    isNotEligible,
    goNext,
    goBack,
    clearStoredAnswers,
  };
}
