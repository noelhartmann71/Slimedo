import { useQuery } from "@tanstack/react-query";
import { fetchFollowUpEligibility } from "../api";

/**
 * Lädt die Folgerezept-Eligibility. Aktuell aus /patient/dashboard abgeleitet
 * (siehe api.ts); nach Backend-Sync zeigt fetchFollowUpEligibility auf den
 * echten Endpunkt — dieser Hook bleibt unverändert.
 */
export default function useFollowUpEligibility() {
  const {
    data: eligibility,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["follow-up-eligibility"],
    queryFn: fetchFollowUpEligibility,
    enabled: !!localStorage.getItem("token"),
  });

  return { eligibility, isLoading, isError };
}
