# Bearbeitete Dateien

Ab dem 11.06.2026 müssen alle Dateien, die im Projekt bearbeitet, erstellt oder gelöscht werden, hier vermerkt werden.

Jede Datei wird nur einmal aufgeführt. Wenn eine bereits gelistete Datei erneut geändert wird, wird der bestehende Eintrag bei Bedarf aktualisiert.

## Dateien

- `src/components/NewTrustSection/NewTrustSection.tsx` - Trust-Kartenbilder, mobile Card-Texte, mobilen Badge-Clip-Bereich, mobiles Long-Asset, mobile Bildgröße/Position/Rundung und Wellen-Hintergrund der drei Trust-Cards: polygon-basierten clipPath durch absolut positioniertes SVG mit Bézier-Kurven und linearGradient ersetzt; Bild der zweiten Card auf Mobile von scale-115 auf scale-100 verkleinert.
- `AGENTS.md` - ChatGPT/Codex-Instructions zum Bearbeitungsprotokoll angelegt und auf eindeutige Dateiliste angepasst.
- `CLAUDE.md` - Claude-Instructions zum Bearbeitungsprotokoll angelegt und auf eindeutige Dateiliste angepasst.
- `EDITED_FILES.md` - Bearbeitungsprotokoll angelegt und auf eindeutige Dateiliste umgestellt.
- `src/components/slimedo-landing/LifestyleSection.tsx` - Mobile Lifestyle-Badges ohne weiße Cards direkt auf dem Bild dargestellt; Badge-Design nach Referenz überarbeitet: deutlich größeres und fett gesetztes Anführungszeichen im Kreis mit klassischer Serif-Schrift, zweizeiliger Serif-Titel, längerer Divider und einzeilige olivfarbene Pill mit Checkmark-Icon.
- `src/components/slimedo-landing/SlimedoHero.tsx` - Mobile Hero-Bildposition auf Eyebrow-Hoehe, oberer Bild-Fade, Mobile-Badges, Hero-Typografie, Abstand zwischen CTA und Trust-Badges, Stichpunkt-Eingangsanimation, Eyebrow-Position sowie mobiles Medikament-Badge-Bild angepasst und verlangsamt.
- `src/components/slimedo-landing/AnwendungSection.tsx` - Mobile Carousel-Buttons verkleinert und zentriert, vertikales Scrollen des Carousels gesperrt, horizontales Wischen wiederhergestellt.
- `src/components/slimedo-landing/TestimonialsSection.tsx` - Zitat-Text verkleinert, Card-Abstand reduziert, kg-Zahl verkleinert.
- `src/components/slimedo-landing/BmiCalculatorSection.tsx` - Gap zwischen Überschrift und Card verringert.
- `src/components/slimedo-landing/TherapieSection.tsx` - Beispieltexte `Bsp. Wegovy®` und `Bsp. Mounjaro®` in den Therapiekarten responsiv weiter vergrößert.
- `src/features/checkout/flow.ts` - Neu: Checkout-Flow-Kontext (Erst- vs. Folgerezept-Flow) in sessionStorage, Anzeige-Helfer für Preis/Produktname und Order-Payload-Builder (Folgerezept ohne product_id/medication_price).
- `src/features/checkout/flow.test.ts` - Neu: Tests für Flow-Kontext, Anzeige-Helfer und Order-Payload-Builder.
- `src/features/follow-up/types.ts` - Neu: Typen für dynamisches Fragebogen-Schema, Eligibility/CTA-Zustände und Folgerezept-Anfrage.
- `src/features/follow-up/api.ts` - Neu: API-Schicht des Folgerezept-Flows mit MOCK_FOLLOW_UP_API-Flag, Eligibility-Ableitung aus /patient/dashboard, Platzhalter-Fragebogen-Schema, Submit-Stub und Liefermethoden-Prefill aus der letzten Bestellung.
- `src/features/follow-up/validation.ts` - Neu: Reine Validierungslogik des dynamischen Fragebogens (required, disqualifying-Antworten).
- `src/features/follow-up/validation.test.ts` - Neu: Tests für die Fragebogen-Validierung.
- `src/features/follow-up/eligibility.test.ts` - Neu: Tests für die Eligibility-Ableitung (kein Rezept / ausgestellt / Anfrage in Prüfung).
- `src/features/follow-up/hooks/useFollowUpEligibility.ts` - Neu: Hook zum Laden der Folgerezept-Eligibility.
- `src/features/follow-up/hooks/useFollowUpQuestionnaire.ts` - Neu: Hook für Schema-Laden, Antwort-State (sessionStorage-Mirror), Seitennavigation und Validierung.
- `src/features/follow-up/components/DynamicQuestion.tsx` - Neu: Schema-getriebener Renderer für eine Frage (single/multi choice, text, number, boolean).
- `src/features/follow-up/components/DynamicQuestionPage.tsx` - Neu: Renderer für eine Fragebogen-Seite.
- `src/features/follow-up/pages/FollowUpQuestionnairePage.tsx` - Neu: Folgerezept-Fragebogen-Seite mit Eligibility-Guard, schreibgeschützter Medikamenten-Anzeige, dynamischen Seiten und Submit → Checkout-Weiterleitung.
- `src/features/profile/components/FollowUpCtaCard.tsx` - Neu: Dashboard-CTA-Karte mit drei Zuständen („Rezept anfragen" / „Folgerezept beantragen" / „Anfrage in Prüfung").
- `src/features/profile/components/FollowUpCtaCard.test.tsx` - Neu: Komponententests für die CTA-Karte.
- `src/components/questionnaire-shell/QuestionnaireHeader.tsx` - Neu: Gemeinsame Fragebogen-Kopfzeile (extrahiert; bestehende Seiten unverändert).
- `src/components/questionnaire-shell/CompletedRow.tsx` - Neu: Eingeklappte Zeile für abgeschlossene Fragebogen-Schritte (extrahiert).
- `src/components/RequireAuth.tsx` - Neu: Auth-Guard für geschützte Routen (Redirect zu /auth/login ohne Token).
- `src/test/setup.ts` - Neu: Vitest-Setup (jest-dom-Matcher, Cleanup, Storage-Reset).
- `src/App.tsx` - Route /questionnaire/follow-up (lazy, mit RequireAuth) registriert.
- `src/features/profile/pages/ProfileOverviewPage.tsx` - Follow-Up-E-Mail-Banner durch FollowUpCtaCard mit Eligibility-Ableitung ersetzt.
- `src/features/auth/pages/ReviewAccountPage.tsx` - Lieferadresse/Patientendaten aus /user-detail vorbefüllt (Basis + Edit-Overlay statt setState-im-Effect); Preis/Produktname und Button-Label flow-abhängig.
- `src/features/auth/pages/DeliveryMethodSelectionPage.tsx` - Liefermethoden-State auf abgeleitetes Auswahlmodell umgestellt, Folgerezept-Prefill aus letzter Bestellung, Order-Payload über buildOrderPayload, Preisanzeige aus Flow-Kontext, „Ändern"-Ziel flow-abhängig.
- `src/features/product/pages/ProductSelectionPage.tsx` - Beim Einstieg in den Erst-Flow wird ein evtl. übriger Folgerezept-Kontext entfernt.
- `src/pages/PaymentSuccessPage.tsx` - Checkout-Flow-Kontext nach erfolgreicher Zahlung zurückgesetzt.
- `vite.config.ts` - Vitest-Konfiguration ergänzt (jsdom, Setup-Datei, Test-Glob).
- `package.json` - Test-Script ergänzt; Dev-Dependencies vitest, jsdom, @testing-library/* hinzugefügt.
- `package-lock.json` - Lockfile durch Installation der Test-Dependencies aktualisiert.
- `scripts/smoke-follow-up.mjs` - Neu: Playwright-Smoke-Test für die Folgerezept-Route (Auth-Guard, Rendering).
