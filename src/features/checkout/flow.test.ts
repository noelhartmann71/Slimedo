import { describe, expect, it } from "vitest";
import {
  buildOrderPayload,
  clearCheckoutFlow,
  getCheckoutFlow,
  getDisplayMedicationPrice,
  getDisplayProductName,
  isFollowUpFlow,
  setCheckoutFlow,
  type CheckoutFlowContext,
} from "./flow";

const FOLLOW_UP_CTX: CheckoutFlowContext = {
  kind: "follow-up",
  followUpRequestId: "req-1",
  display: {
    medicationName: "Wegovy®",
    dosage: "0.5 mg",
    medicationPrice: 171.96,
  },
};

describe("checkout flow context", () => {
  it("defaults to the initial flow when nothing is stored", () => {
    expect(getCheckoutFlow()).toEqual({ kind: "initial" });
    expect(isFollowUpFlow()).toBe(false);
  });

  it("persists and reads a follow-up context", () => {
    setCheckoutFlow(FOLLOW_UP_CTX);
    expect(getCheckoutFlow()).toEqual(FOLLOW_UP_CTX);
    expect(isFollowUpFlow()).toBe(true);
  });

  it("clears the context", () => {
    setCheckoutFlow(FOLLOW_UP_CTX);
    clearCheckoutFlow();
    expect(getCheckoutFlow()).toEqual({ kind: "initial" });
  });

  it("falls back to the initial flow on corrupt storage", () => {
    sessionStorage.setItem("checkout_flow", "{not json");
    expect(getCheckoutFlow()).toEqual({ kind: "initial" });

    sessionStorage.setItem("checkout_flow", JSON.stringify({ kind: "weird" }));
    expect(getCheckoutFlow()).toEqual({ kind: "initial" });
  });
});

describe("display helpers", () => {
  it("uses backend display values in the follow-up flow", () => {
    localStorage.setItem("medication_price", "999");
    sessionStorage.setItem("product_name", "Stale Product");

    expect(getDisplayMedicationPrice(FOLLOW_UP_CTX)).toBe(171.96);
    expect(getDisplayProductName(FOLLOW_UP_CTX)).toBe("Wegovy® 0.5 mg");
  });

  it("uses legacy storage values in the initial flow", () => {
    localStorage.setItem("medication_price", "206.02");
    sessionStorage.setItem("product_name", "Mounjaro®");

    const ctx: CheckoutFlowContext = { kind: "initial" };
    expect(getDisplayMedicationPrice(ctx)).toBe(206.02);
    expect(getDisplayProductName(ctx)).toBe("Mounjaro®");
  });
});

describe("buildOrderPayload", () => {
  const draft = {
    pharmacyId: "ph-1",
    shipping: 1,
    pharmacyType: "Partner",
    couponId: "c-1",
  };

  it("sends the legacy payload in the initial flow", () => {
    localStorage.setItem("product_id", "prod-1");
    localStorage.setItem("medication_price", "171.96");

    const payload = buildOrderPayload({ kind: "initial" }, draft);
    expect(payload).toEqual({
      pharmacy_id: "ph-1",
      shipping: 1,
      pharmacy_type: "Partner",
      coupon_id: "c-1",
      product_id: "prod-1",
      medication_price: 171.96,
    });
  });

  it("sends a follow-up reference and no client-trusted product data", () => {
    // Reste aus einem früheren Erst-Flow dürfen nicht in den Payload gelangen
    localStorage.setItem("product_id", "stale-prod");
    localStorage.setItem("medication_price", "999");

    const payload = buildOrderPayload(FOLLOW_UP_CTX, draft);
    expect(payload).toEqual({
      pharmacy_id: "ph-1",
      shipping: 1,
      pharmacy_type: "Partner",
      coupon_id: "c-1",
      follow_up_request_id: "req-1",
    });
    expect(payload).not.toHaveProperty("product_id");
    expect(payload).not.toHaveProperty("medication_price");
  });
});
