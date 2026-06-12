// Zentrale API-Schicht des Folgerezept-Flows.
//
// Das Backend für den Folgerezept-Flow existiert noch nicht. Alle Aufrufe
// laufen deshalb über MOCK_FOLLOW_UP_API. Sobald der echte Vertrag geliefert
// wird, muss NUR diese Datei angepasst werden (Flag auf false, Endpunkte und
// Mapping prüfen) — Hooks, Komponenten und Seiten bleiben unverändert.

import { axiosSecure } from "@/hooks/useAxiosSecure";
import type {
  AnswerMap,
  DashboardPrescription,
  FollowUpEligibility,
  FollowUpRequestResult,
  LatestOrderInfo,
  QuestionnaireSchema,
} from "./types";

/** TODO(follow-up API): auf false stellen, sobald das Backend die Endpunkte liefert. */
export const MOCK_FOLLOW_UP_API = true;

/** Vorgeschlagene Endpunkte (siehe Implementierungsplan §8) — mit Backend abstimmen. */
const ENDPOINTS = {
  eligibility: "/follow-up/eligibility",
  questionnaire: "/follow-up/questionary",
  submit: "/follow-up/request",
};

// ─── Eligibility ─────────────────────────────────────────────────────────────

export function isPendingStatus(status: string | undefined): boolean {
  return (status ?? "").trim().toLowerCase() === "pending";
}

/**
 * Fallback-Ableitung aus /patient/dashboard, solange es keinen
 * Eligibility-Endpunkt gibt.
 *
 * ANNAHMEN (mit Backend bestätigen):
 *  - allPrescription ist absteigend sortiert (neueste zuerst).
 *  - Jeder Status außer "Pending" gilt als ausgestelltes Rezept.
 */
export function deriveEligibility(
  prescriptions: DashboardPrescription[],
): FollowUpEligibility {
  if (!prescriptions || prescriptions.length === 0) {
    return { state: "request-initial" };
  }

  const newest = prescriptions[0];

  if (isPendingStatus(newest.status)) {
    // Eine Anfrage (Erst- oder Folgerezept) ist bereits in Prüfung —
    // keine Duplikate zulassen.
    return { state: "follow-up-pending", pendingRequestId: newest.id };
  }

  return {
    state: "request-follow-up",
    latestPrescription: {
      id: newest.id,
      medicationName: newest.product?.name ?? "",
      category: newest.product?.category,
    },
  };
}

export async function fetchPatientDashboard(): Promise<{
  allPrescription: DashboardPrescription[];
}> {
  const response = await axiosSecure.get("/patient/dashboard");
  return response?.data?.data;
}

export async function fetchFollowUpEligibility(): Promise<FollowUpEligibility> {
  if (MOCK_FOLLOW_UP_API) {
    const dashboard = await fetchPatientDashboard();
    return deriveEligibility(dashboard?.allPrescription ?? []);
  }
  const response = await axiosSecure.get(ENDPOINTS.eligibility);
  // TODO(follow-up API): Response-Mapping an den echten Vertrag anpassen.
  return response?.data?.data;
}

// ─── Fragebogen ──────────────────────────────────────────────────────────────

/**
 * PLATZHALTER-Schema. Wird durch GET /follow-up/questionary ersetzt, sobald
 * das Backend liefert. Die Fragen hier sind fachlich UNVERBINDLICH und dürfen
 * nicht ohne medizinische Freigabe live gehen.
 */
const MOCK_SCHEMA: QuestionnaireSchema = {
  pages: [
    {
      id: "health-status",
      title: "Gesundheitszustand",
      description:
        "Bitte beantworten Sie die folgenden Fragen zu Ihrem aktuellen Gesundheitszustand seit dem letzten Rezept.",
      questions: [
        {
          id: "health-changed",
          type: "single_choice",
          label:
            "Hat sich Ihr Gesundheitszustand seit dem letzten Rezept verändert?",
          required: true,
          options: [
            { id: "no", label: "Nein, keine Veränderungen" },
            {
              id: "yes",
              label: "Ja, es gab Veränderungen",
              disqualifying: true,
            },
          ],
        },
        {
          id: "health-changed-note",
          type: "text",
          label: "Anmerkungen (optional)",
          required: false,
          placeholder: "z. B. neue Diagnosen oder Beschwerden",
        },
      ],
    },
    {
      id: "tolerance",
      title: "Verträglichkeit",
      questions: [
        {
          id: "tolerated-well",
          type: "single_choice",
          label: "Haben Sie das Medikament gut vertragen?",
          required: true,
          options: [
            { id: "yes", label: "Ja, gut vertragen" },
            {
              id: "no",
              label: "Nein, es gab Probleme",
              disqualifying: true,
            },
          ],
        },
        {
          id: "side-effects",
          type: "multi_choice",
          label: "Sind Nebenwirkungen aufgetreten?",
          description: "Mehrfachauswahl möglich.",
          required: true,
          options: [
            { id: "none", label: "Keine" },
            { id: "nausea", label: "Übelkeit" },
            { id: "vomiting", label: "Erbrechen" },
            { id: "diarrhea", label: "Durchfall" },
            { id: "other", label: "Andere" },
          ],
        },
      ],
    },
    {
      id: "current-weight",
      title: "Aktuelles Gewicht",
      questions: [
        {
          id: "weight-kg",
          type: "number",
          label: "Ihr aktuelles Gewicht (kg)",
          required: true,
          placeholder: "z. B. 92",
        },
      ],
    },
    {
      id: "confirmation",
      title: "Bestätigung",
      questions: [
        {
          id: "truthful",
          type: "boolean",
          label:
            "Ich bestätige, dass ich alle Angaben wahrheitsgemäß gemacht habe.",
          required: true,
        },
      ],
    },
  ],
};

export async function fetchFollowUpQuestionnaire(): Promise<QuestionnaireSchema> {
  if (MOCK_FOLLOW_UP_API) {
    return MOCK_SCHEMA;
  }
  const response = await axiosSecure.get(ENDPOINTS.questionnaire);
  // TODO(follow-up API): Mapping vom echten Response-Format auf
  // QuestionnaireSchema hier implementieren.
  return response?.data?.data;
}

// ─── Submit ──────────────────────────────────────────────────────────────────

/**
 * Sendet die Fragebogen-Antworten + Referenz auf das letzte Rezept.
 * Das Backend ermittelt Medikament/Dosierung/Preis selbst (Source of Truth);
 * latest_prescription_id ist nur ein Hinweis, keine vertrauenswürdige Angabe.
 */
export async function submitFollowUpRequest(payload: {
  answers: AnswerMap;
  latestPrescriptionId?: number | string;
  /** Nur für den Mock: Anzeige-Daten aus der Eligibility. */
  displayMedicationName?: string;
}): Promise<FollowUpRequestResult> {
  if (MOCK_FOLLOW_UP_API) {
    // TODO(follow-up API): Mock — kein echter Request, Preis/Dosierung unbekannt.
    return {
      followUpRequestId: `mock-${Date.now()}`,
      medicationName: payload.displayMedicationName ?? "",
      dosage: "",
      medicationPrice: 0,
    };
  }
  const response = await axiosSecure.post(ENDPOINTS.submit, {
    answers: payload.answers,
    latest_prescription_id: payload.latestPrescriptionId,
  });
  // TODO(follow-up API): Response-Mapping an den echten Vertrag anpassen.
  const data = response?.data?.data;
  return {
    followUpRequestId: data?.follow_up_request_id,
    medicationName: data?.medication_name ?? "",
    dosage: data?.dosage ?? "",
    medicationPrice: Number(data?.medication_price ?? 0),
  };
}

// ─── Liefermethoden-Prefill ──────────────────────────────────────────────────

/**
 * Ermittelt Versandart/Apothekentyp der letzten Bestellung für das Prefill
 * der Liefermethode. Solange es keinen "latest order"-Endpunkt gibt:
 * /patient/dashboard → neuestes Rezept → /view/order/{id}.
 */
export async function fetchLatestOrderInfo(): Promise<LatestOrderInfo | null> {
  const dashboard = await fetchPatientDashboard();
  const newest = dashboard?.allPrescription?.[0];
  if (!newest) return null;

  const response = await axiosSecure.get(`/view/order/${newest.id}`);
  const latestOrder = response?.data?.data?.latest_order;
  if (!latestOrder) return null;

  return {
    shipping: Boolean(latestOrder.shipping),
    pharmacyType: latestOrder.pharmacy_type ?? "Partner",
  };
}
