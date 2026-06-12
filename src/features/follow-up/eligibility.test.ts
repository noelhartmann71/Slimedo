import { describe, expect, it } from "vitest";
import { deriveEligibility, isPendingStatus } from "./api";
import type { DashboardPrescription } from "./types";

function prescription(
  id: number,
  status: string,
  name = "Wegovy®",
): DashboardPrescription {
  return { id, status, product: { name, category: "GLP-1" } };
}

describe("isPendingStatus", () => {
  it("matches Pending case-insensitively", () => {
    expect(isPendingStatus("Pending")).toBe(true);
    expect(isPendingStatus("pending")).toBe(true);
    expect(isPendingStatus(" PENDING ")).toBe(true);
  });

  it("treats other statuses and missing values as not pending", () => {
    expect(isPendingStatus("Approved")).toBe(false);
    expect(isPendingStatus(undefined)).toBe(false);
    expect(isPendingStatus("")).toBe(false);
  });
});

describe("deriveEligibility", () => {
  it("returns request-initial when there are no prescriptions", () => {
    expect(deriveEligibility([])).toEqual({ state: "request-initial" });
  });

  it("returns follow-up-pending when the newest request is pending (first request)", () => {
    const result = deriveEligibility([prescription(1, "Pending")]);
    expect(result.state).toBe("follow-up-pending");
    expect(result.pendingRequestId).toBe(1);
  });

  it("returns follow-up-pending when a follow-up is awaiting review on top of an issued prescription", () => {
    const result = deriveEligibility([
      prescription(2, "Pending"),
      prescription(1, "Approved"),
    ]);
    expect(result.state).toBe("follow-up-pending");
    expect(result.pendingRequestId).toBe(2);
  });

  it("returns request-follow-up with the latest prescription when issued", () => {
    const result = deriveEligibility([
      prescription(2, "Approved", "Mounjaro®"),
      prescription(1, "Approved", "Wegovy®"),
    ]);
    expect(result.state).toBe("request-follow-up");
    expect(result.latestPrescription).toMatchObject({
      id: 2,
      medicationName: "Mounjaro®",
    });
  });

  it("handles prescriptions without a product", () => {
    const result = deriveEligibility([
      { id: 1, status: "Approved", product: null },
    ]);
    expect(result.state).toBe("request-follow-up");
    expect(result.latestPrescription?.medicationName).toBe("");
  });
});
