import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import type { FollowUpEligibility } from "@/features/follow-up/types";

interface FollowUpCtaCardProps {
  eligibility: FollowUpEligibility | undefined;
  isLoading: boolean;
}

/**
 * Dashboard-CTA für Rezeptanfragen:
 *  - kein Rezept vorhanden        → „Rezept anfragen" → Erst-Flow (/product/select)
 *  - ausgestelltes Rezept vorhanden → „Folgerezept beantragen" → Folgerezept-Fragebogen
 *  - Anfrage in Prüfung            → Status anzeigen, Button deaktiviert
 */
export default function FollowUpCtaCard({
  eligibility,
  isLoading,
}: FollowUpCtaCardProps) {
  const navigate = useNavigate();

  const state = eligibility?.state;

  return (
    <div className="rounded-card-sm border border-neutral-200 bg-white p-6">
      <div className="mb-2 flex items-center gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1E3A2E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h4 className="text-lg font-semibold text-neutral-900">
          {state === "request-initial" ? "Rezept anfragen" : "Folgerezept"}
        </h4>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      ) : state === "request-initial" ? (
        <>
          <p className="mb-6 text-sm leading-relaxed text-neutral-500">
            Sie haben noch kein Rezept. Starten Sie hier Ihre erste
            Rezeptanfrage — genau wie über unsere Startseite.
          </p>
          <button
            onClick={() => navigate("/product/select")}
            className="w-full rounded-xl bg-sage py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover cursor-pointer"
          >
            Rezept anfragen
          </button>
        </>
      ) : state === "follow-up-pending" ? (
        <>
          <p className="mb-6 text-sm leading-relaxed text-neutral-500">
            Ihre Anfrage befindet sich derzeit in ärztlicher Prüfung. Eine neue
            Anfrage ist erst möglich, sobald die Prüfung abgeschlossen ist.
          </p>
          <button
            disabled
            className="w-full rounded-xl bg-neutral-200 py-3.5 text-sm font-semibold text-neutral-500 cursor-not-allowed"
          >
            Anfrage in Prüfung
          </button>
        </>
      ) : (
        <>
          <p className="mb-6 text-sm leading-relaxed text-neutral-500">
            Beantragen Sie ein Folgerezept mit demselben Medikament und
            derselben Dosierung wie Ihr zuletzt ausgestelltes Rezept.
          </p>
          <button
            onClick={() => navigate("/questionnaire/follow-up")}
            className="w-full rounded-xl bg-sage py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover cursor-pointer"
          >
            Folgerezept beantragen
          </button>
        </>
      )}
    </div>
  );
}
