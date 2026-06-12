import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import QuestionnaireHeader from "@/components/questionnaire-shell/QuestionnaireHeader";
import CompletedRow from "@/components/questionnaire-shell/CompletedRow";
import { setCheckoutFlow } from "@/features/checkout/flow";
import useFollowUpEligibility from "../hooks/useFollowUpEligibility";
import useFollowUpQuestionnaire from "../hooks/useFollowUpQuestionnaire";
import DynamicQuestionPage from "../components/DynamicQuestionPage";
import { submitFollowUpRequest } from "../api";

export default function FollowUpQuestionnairePage() {
  const navigate = useNavigate();
  const { eligibility, isLoading: isEligibilityLoading } =
    useFollowUpEligibility();

  const {
    isLoading: isSchemaLoading,
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
  } = useFollowUpQuestionnaire();

  // Guard: ohne Folgerezept-Berechtigung zurück zum Dashboard.
  const redirectedRef = useRef(false);
  useEffect(() => {
    if (isEligibilityLoading || redirectedRef.current) return;
    if (!eligibility || eligibility.state !== "request-follow-up") {
      redirectedRef.current = true;
      toast.error(
        eligibility?.state === "follow-up-pending"
          ? "Ihre Anfrage ist bereits in Prüfung."
          : "Ein Folgerezept ist nur mit einem bereits ausgestellten Rezept möglich.",
      );
      navigate("/patient/profile/overview", { replace: true });
    }
  }, [eligibility, isEligibilityLoading, navigate]);

  const submitMutation = useMutation({
    mutationFn: () =>
      submitFollowUpRequest({
        answers,
        latestPrescriptionId: eligibility?.latestPrescription?.id,
        displayMedicationName: eligibility?.latestPrescription?.medicationName,
      }),
    onSuccess: (result) => {
      // Flow-Kontext für den Checkout setzen: ab hier wissen
      // ReviewAccountPage & DeliveryMethodSelectionPage, dass es ein
      // Folgerezept ist (Preis/Anzeige vom Backend, kein product_id-Versand).
      setCheckoutFlow({
        kind: "follow-up",
        followUpRequestId: result.followUpRequestId,
        display: {
          medicationName: result.medicationName,
          dosage: result.dosage,
          medicationPrice: result.medicationPrice,
        },
      });
      clearStoredAnswers();
      navigate("/auth/review");
    },
    onError: () => {
      toast.error("Anfrage konnte nicht gesendet werden");
    },
  });

  function handleFurther() {
    if (!canProceed || submitMutation.isPending) return;
    if (isLastPage) {
      submitMutation.mutate();
      return;
    }
    goNext();
  }

  function handleBack() {
    if (!goBack()) {
      navigate("/patient/profile/overview");
    }
  }

  const isLoading = isEligibilityLoading || isSchemaLoading;
  const latest = eligibility?.latestPrescription;

  return (
    <div className="min-h-screen bg-[#f0f0ec] flex flex-col font-inter">
      <QuestionnaireHeader
        stepLabel="Folgerezept"
        onBack={handleBack}
        onClose={() => navigate("/patient/profile/overview")}
      />

      <main className="flex-1 flex flex-col items-center py-8 px-4 font-inter">
        <div className="w-full max-w-xl flex flex-col gap-3">
          {/* Titelkarte */}
          <div className="bg-white rounded-card-sm p-8">
            <h1 className="text-[24px] font-semibold text-black mb-2">
              Folgerezept beantragen
            </h1>
            <p className="text-[16px] text-neutral-500 leading-relaxed">
              Bitte beantworten Sie die folgenden Fragen wahrheitsgemäß. Ihre
              Angaben werden ausschließlich von den behandelnden Ärztinnen und
              Ärzten geprüft.
            </p>
          </div>

          {/* Medikament — nur Anzeige, nicht änderbar (Regel: gleiches
              Medikament, gleiche Dosierung wie das letzte Rezept) */}
          <div className="bg-white rounded-card-sm p-8">
            <p className="text-[14px] text-neutral-500 mb-2">Ihr Medikament</p>
            {isEligibilityLoading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
              </div>
            ) : (
              <>
                <p className="text-[18px] font-semibold text-black">
                  {latest?.medicationName || "—"}
                  {latest?.dosage ? ` · ${latest.dosage}` : ""}
                </p>
                <p className="text-[13px] text-neutral-500 mt-2 leading-relaxed">
                  Medikament und Dosierung entsprechen Ihrem zuletzt
                  ausgestellten Rezept und können im Folgerezept nicht geändert
                  werden.
                </p>
              </>
            )}
          </div>

          {/* Abgeschlossene Seiten */}
          {pages.slice(0, pageIndex).map((page) => (
            <CompletedRow key={page.id} label={page.title} value="Beantwortet" />
          ))}

          {/* Aktive Seite */}
          <div className="bg-white rounded-card-sm p-8">
            {isLoading || !currentPage ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
              </div>
            ) : (
              <DynamicQuestionPage
                page={currentPage}
                pageNumber={pageIndex + 1}
                pageCount={pages.length}
                answers={answers}
                onAnswer={setAnswer}
              />
            )}
          </div>

          {/* Hinweis bei disqualifizierender Antwort */}
          {isNotEligible && (
            <div className="bg-[#FEF2F2] border border-red-200 rounded-card-sm p-6">
              <p className="text-[14px] text-neutral-600 leading-relaxed">
                Auf Basis Ihrer Angaben können wir das Folgerezept nicht ohne
                ärztliche Rücksprache ausstellen. Bitte buchen Sie eine
                Beratung oder kontaktieren Sie unser Team über Ihr Dashboard.
              </p>
            </div>
          )}

          {/* Weiter / Absenden */}
          <button
            onClick={handleFurther}
            disabled={!canProceed || submitMutation.isPending || isLoading}
            className="w-full bg-sage hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl py-4 text-[18px] font-medium transition cursor-pointer"
          >
            {submitMutation.isPending
              ? "Wird gesendet..."
              : isLastPage
                ? "Anfrage absenden"
                : "Weiter"}
          </button>
        </div>
      </main>
    </div>
  );
}
