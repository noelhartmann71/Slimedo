// Checkout-Flow-Kontext: unterscheidet den Erst-Flow ("initial") vom
// Folgerezept-Flow ("follow-up"). Wird in sessionStorage gehalten, damit die
// Checkout-Seiten (ReviewAccountPage, DeliveryMethodSelectionPage) wissen,
// in welchem Flow sie laufen, ohne die localStorage-Keys des Erst-Flows zu lesen.

export type FlowKind = "initial" | "follow-up";

export interface CheckoutFlowDisplay {
  /** Nur zur Anzeige — vom Backend geliefert, niemals als vertrauenswürdige Daten zurücksenden. */
  medicationName: string;
  dosage: string;
  medicationPrice: number;
}

export interface CheckoutFlowContext {
  kind: FlowKind;
  followUpRequestId?: string;
  display?: CheckoutFlowDisplay;
}

const STORAGE_KEY = "checkout_flow";

const INITIAL_FLOW: CheckoutFlowContext = { kind: "initial" };

export function getCheckoutFlow(): CheckoutFlowContext {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_FLOW;
    const parsed = JSON.parse(raw) as CheckoutFlowContext;
    if (parsed?.kind === "follow-up" || parsed?.kind === "initial") {
      return parsed;
    }
    return INITIAL_FLOW;
  } catch {
    return INITIAL_FLOW;
  }
}

export function setCheckoutFlow(ctx: CheckoutFlowContext): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ctx));
}

export function clearCheckoutFlow(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function isFollowUpFlow(
  ctx: CheckoutFlowContext = getCheckoutFlow(),
): boolean {
  return ctx.kind === "follow-up";
}

/** Medikamentenpreis für die Bestellübersicht: im Follow-up-Flow aus dem
 *  Backend-Kontext, sonst wie bisher aus localStorage. */
export function getDisplayMedicationPrice(
  ctx: CheckoutFlowContext = getCheckoutFlow(),
): number {
  if (ctx.kind === "follow-up" && ctx.display) {
    return ctx.display.medicationPrice;
  }
  return Number(localStorage.getItem("medication_price") || 0);
}

/** Produktname für die Bestellübersicht. */
export function getDisplayProductName(
  ctx: CheckoutFlowContext = getCheckoutFlow(),
): string {
  if (ctx.kind === "follow-up" && ctx.display) {
    return `${ctx.display.medicationName} ${ctx.display.dosage}`.trim();
  }
  return sessionStorage.getItem("product_name") || "Product Name";
}

export interface OrderDraft {
  pharmacyId?: string | null;
  shipping: number;
  pharmacyType: string;
  couponId?: string | null;
}

/**
 * Baut den Payload für POST /order/create.
 *
 * Im Follow-up-Flow werden product_id und medication_price bewusst NICHT
 * mitgesendet: das Backend ermittelt Medikament, Dosierung und Preis selbst
 * aus dem letzten ausgestellten Rezept (Source of Truth).
 *
 * TODO(follow-up API): finalen Vertrag mit dem Backend abstimmen
 * (Feldname `follow_up_request_id` ist ein Vorschlag).
 */
export function buildOrderPayload(
  ctx: CheckoutFlowContext,
  draft: OrderDraft,
): Record<string, unknown> {
  const base = {
    pharmacy_id: draft.pharmacyId ?? null,
    shipping: draft.shipping,
    pharmacy_type: draft.pharmacyType,
    coupon_id: draft.couponId ?? null,
  };

  if (ctx.kind === "follow-up") {
    return {
      ...base,
      follow_up_request_id: ctx.followUpRequestId ?? null,
    };
  }

  return {
    ...base,
    product_id: localStorage.getItem("product_id") || "",
    medication_price: Number(localStorage.getItem("medication_price") || 0),
  };
}
