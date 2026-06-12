import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import FollowUpCtaCard from "./FollowUpCtaCard";
import type { FollowUpEligibility } from "@/features/follow-up/types";

function renderCard(
  eligibility: FollowUpEligibility | undefined,
  isLoading = false,
) {
  return render(
    <MemoryRouter initialEntries={["/patient/profile/overview"]}>
      <Routes>
        <Route
          path="/patient/profile/overview"
          element={
            <FollowUpCtaCard eligibility={eligibility} isLoading={isLoading} />
          }
        />
        <Route path="/product/select" element={<div>Produktauswahl</div>} />
        <Route
          path="/questionnaire/follow-up"
          element={<div>Folgerezept-Fragebogen</div>}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe("FollowUpCtaCard", () => {
  it("shows 'Rezept anfragen' and routes to the initial flow without a prescription", async () => {
    const user = userEvent.setup();
    renderCard({ state: "request-initial" });

    const button = screen.getByRole("button", { name: "Rezept anfragen" });
    await user.click(button);

    expect(screen.getByText("Produktauswahl")).toBeInTheDocument();
  });

  it("shows 'Folgerezept beantragen' and routes to the follow-up questionnaire", async () => {
    const user = userEvent.setup();
    renderCard({
      state: "request-follow-up",
      latestPrescription: { id: 1, medicationName: "Wegovy®" },
    });

    const button = screen.getByRole("button", {
      name: "Folgerezept beantragen",
    });
    await user.click(button);

    expect(screen.getByText("Folgerezept-Fragebogen")).toBeInTheDocument();
  });

  it("disables the button while a request is pending", () => {
    renderCard({ state: "follow-up-pending", pendingRequestId: 7 });

    const button = screen.getByRole("button", { name: "Anfrage in Prüfung" });
    expect(button).toBeDisabled();
  });

  it("renders a loading state without any CTA", () => {
    renderCard(undefined, true);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
