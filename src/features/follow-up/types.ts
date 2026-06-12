// Typen für den Folgerezept-Flow.
// Das Fragebogen-Schema ist bewusst generisch (dynamische Seiten/Fragen/Antworten),
// damit beim Eintreffen des echten Backend-Vertrags nur die Mapping-Schicht in
// api.ts angepasst werden muss.

export type QuestionType =
  | "single_choice"
  | "multi_choice"
  | "text"
  | "number"
  | "boolean";

export interface AnswerOption {
  id: string;
  label: string;
  /** Antwort führt dazu, dass kein Folgerezept ohne ärztliche Rücksprache möglich ist. */
  disqualifying?: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  description?: string;
  required: boolean;
  options?: AnswerOption[];
  placeholder?: string;
}

export interface QuestionnairePage {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface QuestionnaireSchema {
  pages: QuestionnairePage[];
}

export type AnswerValue = string | string[] | number | boolean;
export type AnswerMap = Record<string, AnswerValue>;

// ─── Eligibility / Dashboard-CTA ─────────────────────────────────────────────

export type FollowUpCtaState =
  | "request-initial" // noch kein Rezept → „Rezept anfragen" → Erst-Flow
  | "request-follow-up" // ausgestelltes Rezept vorhanden → „Folgerezept beantragen"
  | "follow-up-pending"; // Anfrage in Prüfung → Button deaktiviert

export interface DashboardPrescription {
  id: number | string;
  status: string;
  product: {
    name: string;
    category: string;
  } | null;
}

export interface LatestPrescriptionInfo {
  id: number | string;
  medicationName: string;
  category?: string;
  /** Dosierung des letzten Rezepts — nur zur Anzeige, kommt vom Backend. */
  dosage?: string;
}

export interface FollowUpEligibility {
  state: FollowUpCtaState;
  latestPrescription?: LatestPrescriptionInfo;
  pendingRequestId?: number | string;
}

// ─── Submit ──────────────────────────────────────────────────────────────────

export interface FollowUpRequestResult {
  followUpRequestId: string;
  /** Vom Backend aus dem letzten ausgestellten Rezept übernommen — nur Anzeige. */
  medicationName: string;
  dosage: string;
  medicationPrice: number;
}

// ─── Liefermethoden-Prefill aus der letzten Bestellung ───────────────────────

export interface LatestOrderInfo {
  shipping: boolean;
  pharmacyType: string;
}
