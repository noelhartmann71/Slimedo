# Security & DSGVO/GDPR Readiness Report — Slimedo (Frontend)

**Date:** 2026-06-12 · **Branch:** `feature/follow-up-prescription` (clean) · **Type:** Read-only analysis. No files were modified.

---

## 1. Executive Summary

**Overall risk level: HIGH** (not launch-ready from a security/DSGVO perspective)

This repository is a **frontend-only** React 19 + Vite SPA (no backend code present). It talks to a REST backend at `VITE_BASE_URL` (`https://noelha.thewarriors.team/api`). The most important conclusion of this review: **almost all security-critical enforcement (authorization, role separation, price integrity, file access) must happen in the backend, which is not in this repository and could not be verified.** What *can* be verified in the frontend shows several patterns that are either risky themselves or strongly suggest backend weaknesses.

**Launch blockers found: 6** (F-01, F-02, F-03, F-04, P-01, P-02 below)

**Most important risks:**
1. **No route guards on patient, pharmacy, or admin areas** — only `/questionnaire/follow-up` has `RequireAuth`; everything else relies entirely on backend 401s, and several pages render without any auth check.
2. **Special-category health data (BMI, comorbidities, allergies, medication exclusions, side effects) stored unencrypted in `localStorage`** and partly retained after the flow ends.
3. **Auth token (Bearer JWT) in `localStorage`** with the full user object — XSS-stealable, no expiry handling, no 401 interceptor.
4. **Client-supplied `medication_price` sent to `/order/create`** — if the backend trusts it, this is a payment-integrity vulnerability.
5. **Apparent real personal data (name + full home address) hard-coded into the public `/prescriptions` route.**
6. **No consent/notice before the medical questionnaire**, the registration "consent" text is a non-interactive paragraph, and the CMP (Usercentrics) is integrated but **not configured** (no settings ID in env).

**For a lawyer/DPO to check:** Datenschutzerklärung adequacy for Art. 9 health data (explicit consent vs. § 22 BDSG/Art. 9(2)(h)), AV-Verträge (DPAs) with the backend host (`thewarriors.team`), Vercel, Google (Maps), Usercentrics, the payment provider (Stripe-like checkout), and the e-mail sender; Impressum (currently links to `/terms`); retention schedule; TOMs documentation for the backend.

---

## 2. Scope Analyzed

**Inspected:** all of `src/` (107 TS/TSX files): routing (`src/App.tsx`), API clients (`src/hooks/useAxiosPublic.tsx`, `useAxiosSecure.tsx`), auth pages (`src/features/auth/pages/*`), questionnaire (`src/features/questionnaire/*`), follow-up flow (`src/features/follow-up/*`), checkout (`src/features/checkout/flow.ts`, `DeliveryMethodSelectionPage.tsx`), payment modals (`src/components/svg-container/*PaymentModal.tsx`), patient profile (`src/features/profile/*`), pharmacy dashboard pages, admin dashboard (`src/features/admin-dashboard/*`), consent tooling (`src/lib/usercentrics.ts`, `src/components/Usercentrics/`), maps (`src/features/auth/components/PharmacyMap.tsx`), config (`package.json`, `vite.config.ts`, `vercel.json`, `.env.local`, `.gitignore`, `index.html`), `dev-output.log`, git tracking status, `npm audit`.

**Not available / not inspectable from this repo:** the entire backend (auth validation, role enforcement, password hashing, payment provider integration, e-mail templates/SMTP, file storage for ID uploads & prescription PDFs, logging, retention/deletion). The real Datenschutzerklärung content beyond the template text in `PrivacyPolicyPage.tsx`. Vercel project settings (headers, env vars). The Usercentrics configuration (service list).

---

## 3. Data Inventory

| # | Data category | Example fields | Collected at | Sent to | Stored (client-side) | Access | Third parties | Sensitivity |
|---|---|---|---|---|---|---|---|---|
| 1 | Identity/account | first/last name, email, phone, DOB, gender, password | `CreateAccountPage`, `CreatePatient`, `LoginPage` | `POST /register`, `/login` (own backend) | full `user` object + `email` in `localStorage` | patient, backend, admin (planned) | Backend host | Medium–High |
| 2 | **Health questionnaire** | BMI, comorbidities list, allergies, exclusion criteria + free-text note, incompatible medication, side-effect answers | `MedicalQuestionnairePage`, Steps 1–4, `ComorbiditiesStep` | `POST /patient/create` after registration | `localStorage` keys: `bmi`, `comorbidities`, `allergies`, `exclusion_criteria`, `exclusion_criteria_note`, `incompitable_medication`, `side_effect`, `treatment_is_agree` | patient, backend, doctor/admin (server-side) | Backend host | **Special category (Art. 9)** |
| 3 | **Follow-up questionnaire** | health changes, tolerance, side effects, current weight | `FollowUpQuestionnairePage` | `POST /follow-up/request` (currently **mocked**, `MOCK_FOLLOW_UP_API = true` in `src/features/follow-up/api.ts:19`) | `sessionStorage` (namespaced, cleared on submit) | patient, backend | Backend host | **Special category** |
| 4 | Medication/product | `product_id`, `dosage`, `medication_price`, product name | `ProductSelectionPage`, `RecommendationPage` | `/order/create` | `localStorage` + `sessionStorage` | patient, backend, pharmacy | Backend host | High (implies health condition) |
| 5 | Address/delivery | street, house no., city, postal, country, delivery method | `ReviewAccountPage`, `DeliveryMethodSelectionPage` | `POST /profile/update`, `/order/create` | `deliveryAddress` JSON in `localStorage` | patient, backend, pharmacy | Backend host | Medium |
| 6 | Order/prescription status | order id, status, payment status, BMI + dosage + exclusion note in order view | `/patient/dashboard`, `/view/order/{id}` | from backend | `order_id` in `localStorage` | patient; pharmacy sees orders incl. patient BMI/notes (`ViewOrderModal.tsx:9-27`) | Backend host | **Special category** |
| 7 | **Bank data** | counterpart name, **IBAN**, **BIC**, bank name | `BankPaymentModal.tsx:23-30` | `POST /payment/bank` (own backend) | not persisted | patient, backend, pharmacy(?) | Backend host, banking provider (unknown) | High |
| 8 | Card payment | none collected in frontend; redirect via `checkout_url` / `session_id` | `PharmacyPaymentModal`, `/order/checkout/{id}` | external checkout (Stripe-like) | `session_id` only in URL | payment provider | **Payment provider (undisclosed in code)** | High |
| 9 | Identity document | photo ID (driver's license/passport) — **UI stub, no actual upload wired** (`VerifyIdentityPage.tsx:41-48,196-200`) | `/auth/verify-identity` | nowhere (currently) | — | — | — | High (when implemented) |
| 10 | Profile photo | avatar file | `ProfilePersonalInformationPage.tsx:67-96` | `POST /profile/update` (multipart) | object URL only | patient, backend | Backend host | Low–Medium |
| 11 | Appointment | date + time slot of doctor consultation | `BookConsultationModal` | `POST /appointment/create` | `doctorConsultationBooking` in `localStorage` | patient, backend, doctor | Backend host | High (medical context) |
| 12 | Location (approx.) | map center for pharmacy search | `PharmacyMap` | Google Maps/Places JS API (consent-gated) | — | Google | **Google LLC** | Medium |
| 13 | Pharmacy business data | pharmacy profile, order list incl. patient orders, CSV export | pharmacy dashboard pages | `/pharmacy/*` endpoints | — | pharmacy role | Backend host | High (contains patient data) |
| 14 | E-mails | subject/body composed by patient (`SendEmailModal`), e-mail history | `/send-email`, `/email-history` | backend → SMTP (unknown) | — | patient, backend | unknown e-mail provider | Medium |
| 15 | Consent state | Usercentrics service consents | CMP (when configured) | Usercentrics | CMP-managed cookies | — | **Usercentrics GmbH** | Low |

**No analytics/tracking found**: no GTM, GA, Meta pixel, Hotjar, Sentry, etc. anywhere in `src/` or `index.html` (verified by grep). Footer social icons are static SVGs, not embedded widgets.

---

## 4. Role and Access Model

Roles implied by the code: **Patient**, **Pharmacy**, **Admin**. (Doctor appears only as a concept in copy and admin mock pages; no doctor login area exists in this repo.)

| Area | Routes | Guard observed | Notes |
|---|---|---|---|
| Patient profile | `/patient/profile/*` | **None** — pages render for anyone; data calls fail with 401 but no redirect | `App.tsx:178-204` |
| Follow-up questionnaire | `/questionnaire/follow-up` | `RequireAuth` (token-existence check only, `RequireAuth.tsx:10-14`) | the only guarded route |
| Pharmacy dashboard | `/pharmacy-dashboard/*` | **None** (`App.tsx:206-215`); layout calls `/pharmacy/profile` and renders regardless | |
| Admin dashboard | `/admin-dashboard/*` | **None** (`App.tsx:217-232`); `AdminDashboardLayout.tsx` has no auth code at all | currently 100% static mock data — no API calls in any admin page (verified by grep) |
| Token model | — | Single shared `localStorage` key `token` for patient *and* pharmacy logins (`LoginPage.tsx:67`, `PharmacyDashboardLogin.tsx:64`) | No client-side role concept whatsoever; role separation is entirely a backend question |

**Potential authorization gaps (backend must answer):**
- `/view/order/{id}` is called with sequential-looking numeric IDs (`ProfileOverviewPage.tsx:48`, `follow-up/api.ts:244`). If the backend doesn't verify ownership → **IDOR** on prescriptions/orders.
- `/pharmacy/order/update-status/{orderId}` and `/pharmacy/orders/{id}/confirm-*` (`PharmacyOverviewPage.tsx:267-337`) — same IDOR question for pharmacies and cross-pharmacy access.
- Patient token vs. pharmacy token: can a patient token call `/pharmacy/dashboard` or `/pharmacy/export`? Nothing in the frontend prevents it.

---

## 5. GDPR/DSGVO Readiness Checklist

| Principle | Status | Evidence | Recommendation |
|---|---|---|---|
| 1. Lawfulness, fairness, transparency | **Risk** | Medical questionnaire (`/questionnaire/medical`) collects Art. 9 health data **before** account creation with **no privacy notice or consent UI** (grep for datenschutz/consent in `src/features/questionnaire` = 0 hits). Registration "consent" is a static `<p>`, not a checkbox, and the highlighted terms are `<span>`s, not links (`CreateAccountPage.tsx:450-452`). Privacy policy page exists but is generic template text mentioning undisclosed "Analysen"-Anbieter (`PrivacyPolicyPage.tsx:36`). | Add an explicit, logged consent step (checkbox + links to `/privacy`) before questionnaire start and at registration; have DPO finalize the Datenschutzerklärung; distinguish Art. 9(2)(a) consent from Art. 9(2)(h) treatment basis. |
| 2. Purpose limitation | **Good (technically)** | No analytics/tracking found anywhere; data flows only to own backend + payment redirect + (consented) Google Maps. Health data not reused for marketing in the code. | Maintain; ensure backend doesn't repurpose. |
| 3. Data minimization | **Partial/Risk** | Full `user` object cached in `localStorage` (`LoginPage.tsx:66`), then re-read into forms. Health answers persisted as individual `localStorage` keys and **only cleared on logout** (`UserDashboardLayout.tsx:188-217`) — an abandoned flow leaves BMI/comorbidities/allergies on the device indefinitely. `medication_price` sent from client. | Stop persisting full user object; move questionnaire state to `sessionStorage` (as the follow-up flow already does — `useFollowUpQuestionnaire.ts:10-11`); clear keys on flow completion, not just logout; don't send price from client. |
| 4. Accuracy & updateability | **Good** | Patients can edit personal info (`ProfilePersonalInformationPage`), address (`ProfileAddressPage`), payment methods, questionnaire (`ProfileQuestionnairePage`). | — |
| 5. Storage limitation | **Risk / Unknown** | No client-side retention logic except logout cleanup. Hard-coded country default `"Bangladesh"` suggests test scaffolding (`ProfilePersonalInformationPage.tsx:31`). PDF/ID retention is backend-only and unknown. Abandoned questionnaires leave data in `localStorage`. | Define retention/deletion (backend + client); auto-expire client storage; confirm PDF/upload lifecycle with backend. |
| 6. Integrity & confidentiality | **Risk** | Token + user object in `localStorage` (XSS-exposed). No route guards on sensitive areas. Possible IDOR via numeric order IDs. Google Maps API key shipped to client (expected for JS API, but key restriction must be verified). No security headers configurable in `vercel.json` (`vercel.json` only has SPA rewrites). | See findings F-01…F-05. |
| 7. Accountability / auditability | **Unknown** | No audit logging visible (frontend can't do this). E-mail send, status changes, admin actions all backend. | Confirm backend audit trail for prescription status changes, pharmacy completion, admin actions, e-mail sending. |
| 8. Data-subject-rights readiness | **Partial** | Self-service edit exists (right to rectification). **No deletion/anonymization, no data export/access UI, no consent-withdrawal flow** other than the (unconfigured) cookie CMP. Privacy text says "Beantragen Sie ggf. … Löschung" but no mechanism. | Add account deletion + data export (or documented manual DSAR process); wire up the CMP for consent withdrawal. |

---

## 6. Security Findings

### F-01 — No route guards on patient/pharmacy/admin areas — **High** · Security · Launch blocker: **YES**
**Affected:** `src/App.tsx:170-232`, `src/components/RequireAuth.tsx`, `AdminDashboardLayout.tsx`, `UserDashboardLayout.tsx`
**Evidence:** Only `/questionnaire/follow-up` is wrapped in `<RequireAuth>`. `/patient/profile/*`, `/pharmacy-dashboard/*`, `/admin-dashboard/*` have no guard. `RequireAuth` itself only checks `localStorage.getItem("token")` exists (`RequireAuth.tsx:10`) — it does not validate role or token validity.
**Risk:** Unauthenticated users reach dashboard shells; there is no client enforcement of patient-vs-pharmacy-vs-admin boundaries. The actual data protection depends entirely on the unseen backend. If any admin/pharmacy endpoint lacks server-side role checks, this is a direct breach path.
**Recommendation:** Add role-aware guards on all three areas (defense-in-depth), and **confirm backend enforces role + ownership on every endpoint**. Fixable: both (frontend guard + backend enforcement; backend is the security boundary).

### F-02 — JWT and full user object stored in `localStorage` — **High** · Security · Launch blocker: **YES**
**Affected:** `useAxiosSecure.tsx:12`, `LoginPage.tsx:66-67`, `CreateAccountPage.tsx:95-97`, `CreatePatient.tsx:65-66`, `PharmacyDashboardLogin.tsx:63-64`
**Evidence:** `localStorage.setItem("token", …)` and `localStorage.setItem("user", JSON.stringify(...))`; token read in the axios interceptor and attached as `Bearer`.
**Risk:** Any XSS (or malicious dependency) can exfiltrate the session token *and* the cached PII (name, email, phone). No `HttpOnly` protection. There is also **no 401 response interceptor** — expired/invalid tokens don't trigger logout/redirect, so stale sessions linger.
**Recommendation:** Prefer `HttpOnly`, `Secure`, `SameSite` cookies for the session (requires backend + CSRF handling). At minimum, stop caching the full user object, and add a response interceptor that clears storage and redirects on 401. Fixable: both.

### F-03 — Client-supplied medication price sent to order creation — **High** · Security · Launch blocker: **YES**
**Affected:** `src/features/checkout/flow.ts:109-113`, `DeliveryMethodSelectionPage.tsx:141-156`
**Evidence:** In the initial flow, `buildOrderPayload` sends `medication_price: Number(localStorage.getItem("medication_price") || 0)` and `product_id` from `localStorage` to `POST /order/create`.
**Risk:** `localStorage` is fully attacker-controlled. If the backend trusts the submitted price (instead of looking it up from `product_id` server-side), a user can pay an arbitrary amount — a payment-integrity bypass. (Note: the follow-up flow was deliberately designed *not* to send price — `flow.ts:102-107` — which is the correct pattern; the initial flow should match.)
**Recommendation:** Backend must derive price from `product_id` and ignore any client price. Fixable: backend (primary); frontend can stop sending it.

### F-04 — Apparent real personal data hard-coded in public `/prescriptions` route — **High** · Privacy/Security · Launch blocker: **YES**
**Affected:** `src/pages/Prescription.tsx:16-29,62`, `App.tsx:93` (public route, no guard)
**Evidence:** Static markup contains `Karakoc, Anil`, `Eschensiepen 36`, `42287 Wuppertal`, DOB `24.01.1991` on a publicly routable page.
**Risk:** If this is real patient data (it reads as a real German name + address, not the "Max Mustermann" placeholder used in admin mocks), it's a personal-data disclosure on a public URL. Even as a template it leaks a real-looking identity.
**Recommendation:** Confirm whether real; remove/replace with obvious dummy data and ensure the route is not publicly exposed in production. Fixable: frontend.

### F-05 — No security headers / CSP — **Medium** · Security · Launch blocker: no (strongly recommended)
**Affected:** `vercel.json` (only SPA rewrites), `index.html`
**Evidence:** No `Content-Security-Policy`, `X-Frame-Options`/frame-ancestors, `Referrer-Policy`, `Strict-Transport-Security`, `Permissions-Policy` configured.
**Risk:** No clickjacking protection on dashboards; no CSP to blunt XSS (which matters given F-02). Referrer could leak URLs to third parties.
**Recommendation:** Add a `headers` block in `vercel.json` with CSP (allow self + Google Maps + Usercentrics + API origin), `frame-ancestors 'none'`, HSTS, `Referrer-Policy: strict-origin-when-cross-origin`. Fixable: config/frontend.

### F-06 — Google Maps API key shipped to client — **Low/Info** · Security · Launch blocker: no
**Affected:** `.env.local:2` (`VITE_GOOGLE_MAPS_API_KEY=AIza…REDACTED`), `PharmacyMap.tsx:95`, `vite-env.d.ts:6`
**Evidence:** Key is a `VITE_`-prefixed var, so it is bundled into client JS by design (Maps JS API requires this). `.env.local` is **not** tracked by git (confirmed: `git ls-files` shows no env files; `.gitignore` has `*.local`).
**Risk:** Low *if* the key is locked down. An unrestricted key can be abused (quota theft → billing).
**Recommendation:** In Google Cloud Console, restrict the key by HTTP referrer (your domains) and to Maps JS + Places APIs only. Rotate it since it has appeared in plaintext on disk. Verify it is **not** also used for any server-side/secret purpose. *(Key redacted in this report.)* Fixable: external config.

### F-07 — `dev-output.log` present in working tree — **Low** · Operational · Launch blocker: no
**Affected:** `dev-output.log` (root)
**Evidence:** File exists; `.gitignore` excludes `*.log`, and `git ls-files` does not list it, so it is **not tracked** — good. It contains only Vite build warnings and a Babel parser stack trace, **no personal data** (grep for password/email/token matched only stack-trace file paths).
**Risk:** Low; mainly clutter. Confirm it never gets force-added.
**Recommendation:** Delete locally; keep ignored.

### F-08 — `console.warn`/`console.log` in production — **Low/Info** · Security · Launch blocker: no
**Affected:** `usercentrics.ts:115`, `UsercentricsLoader.tsx:7-14`, `useUsercentricsConsent.ts:57`, `PharmacyMap.tsx:68`, `Footer.tsx:255`, `BlogCard.tsx:325`
**Evidence:** Only CMP-configuration warnings; `BlogCard.tsx:325` logs public blog content only. No PII logged.
**Risk:** Negligible (no sensitive data). Noise in production console.
**Recommendation:** Strip non-essential `console.*` in production builds. Fixable: frontend/build.

---

## 7. Privacy / Data Protection Findings

### P-01 — Special-category health data persisted in `localStorage` and retained until logout — **High** · Privacy/DSGVO · Launch blocker: **YES**
**Affected:** `Step1.tsx:57` (bmi), `Step2.tsx:29` (allergies), `Step3.tsx:17,69,82` (exclusion criteria + free-text note), `Step4.tsx:71,84` (incompatible medication), `ComorbiditiesStep.tsx:50-55`, `ImportantInformationPage.tsx:289-302` (side_effect); cleared only in `UserDashboardLayout.tsx:188-217`.
**Evidence:** Health answers are written to `localStorage` keys and read back at registration (`CreateAccountPage.tsx:103-117`). They are removed only on an explicit logout; a user who abandons the funnel (never logs in/out) leaves Art. 9 data on a possibly shared device indefinitely.
**Risk:** Persistent unencrypted special-category data on the client; violates data-minimization/storage-limitation; high impact on a shared/public computer.
**Recommendation:** Use `sessionStorage` (auto-cleared on tab close) for questionnaire state — the follow-up feature already does this correctly (`useFollowUpQuestionnaire.ts:10-11,73`); clear keys on flow completion regardless of login. Fixable: frontend.

### P-02 — No consent/notice before collecting medical data — **High** · DSGVO · Launch blocker: **YES**
**Affected:** `src/features/questionnaire/*` (no consent UI — grep = 0), `CreateAccountPage.tsx:450-452` (non-interactive consent text, terms are `<span>` not links).
**Evidence:** The medical questionnaire is reachable and fully fillable before any consent step; the registration agreement is a paragraph with no checkbox and no working links to `/privacy` or `/terms`.
**Risk:** Art. 9 health data processed without a demonstrable lawful basis/consent record; transparency failure.
**Recommendation:** Add an explicit consent gate (checkbox, timestamped, links to Datenschutz/AGB) before the questionnaire and at registration; record consent server-side. DPO to confirm legal basis. Fixable: both.

### P-03 — Patient health data exposed to pharmacy role — **Medium** · Privacy · Launch blocker: no (confirm necessity)
**Affected:** `ViewOrderModal.tsx:9-27,57-104` (BMI, dosage, status, exclusion-criteria note shown to pharmacy/order viewer), `PharmacyOverviewPage`, `/pharmacy/export` CSV (`PharmacyOverviewPage.tsx:352-376`).
**Evidence:** Order detail modal renders `patient.bmi`, `patient.dosage`, and free-text `exclusion_criteria_note` to the dashboard viewing the order; pharmacy can export orders to CSV.
**Risk:** Possible over-sharing of health data with pharmacies beyond what's needed to dispense; CSV export of patient data is a download-and-retain risk.
**Recommendation:** With DPO, confirm pharmacies need BMI/exclusion notes; minimize fields; restrict/justify CSV export and log it. Fixable: both.

### P-04 — Cookie CMP integrated but not configured — **Medium** · DSGVO · Launch blocker: no (but needed before public launch)
**Affected:** `usercentrics.ts:39-56`, `UsercentricsLoader.tsx:5-11`, Footer "Cookie-Einstellungen" link
**Evidence:** `isUsercentricsConfigured()` returns false unless `VITE_USERCENTRICS_SETTINGS_ID` is set; it is **not** in `.env.local`. The loader logs a warning and does nothing; the cookie-settings footer link will fail until configured. Google Maps is correctly consent-gated and won't load without consent (`PharmacyMap.tsx:50-76`) — good design, but inert without the CMP ID.
**Risk:** No functioning consent management in current config; the consent-withdrawal path (data-subject right) is non-functional.
**Recommendation:** Set the Usercentrics settings ID for production and verify the service list (Google Maps, payment provider, e-mail) is declared. Fixable: config.

### P-05 — Undisclosed third parties in privacy text — **Medium** · DSGVO · Launch blocker: no
**Affected:** `PrivacyPolicyPage.tsx:36` ("Anbieter, die … Analysen … unterstützen")
**Evidence:** Privacy text references analytics providers, but no analytics exist in code; the payment provider and e-mail provider are not named anywhere.
**Risk:** Inaccurate/incomplete processor disclosure.
**Recommendation:** Align the Datenschutzerklärung with actual processors (backend host, Vercel, Google Maps, Usercentrics, payment provider, e-mail provider); remove the analytics claim or implement+disclose it. Legal/DPO.

---

## 8. Third-Party Services & Data Processors

| Service | Purpose | Data likely shared | Risk / notes | Documentation needed |
|---|---|---|---|---|
| Backend API `noelha.thewarriors.team` | All app data | All categories in §3 | Core processor; **not in this repo** | AV-Vertrag (DPA), TOMs, hosting location/sub-processors |
| Vercel | SPA hosting (`vercel.json`) | Request metadata, IPs | Edge/CDN; US company | DPA, EU data-region config, header config |
| Google Maps/Places (`@react-google-maps/api`) | Pharmacy search | Approx. location, IP | Consent-gated in code ✅; key needs restriction | Google DPA, key referrer restriction |
| Usercentrics | Consent management | Consent choices, identifiers | Integrated, **not configured** | DPA, service declaration, settings ID |
| Payment provider (Stripe-like) | Card checkout via `checkout_url`/`session_id` | Payment + order ref | Not named in code; redirect-based | DPA, confirm no health data in metadata |
| Banking rails (for `/payment/bank`) | Bank transfer | Name, IBAN, BIC | Handled by backend | Processor identity, DPA |
| E-mail/SMTP provider | Patient/pharmacy/admin e-mails | Name, email, order info | Backend `/send-email` | Provider identity, DPA, template review |

**Action:** Confirm none of the payment metadata sent to the external checkout includes medication/health details (verify in backend `/order/checkout/{id}` and `/payment/card`).

---

## 9. Logging, Storage, and Retention Risks

- **Browser `localStorage`** (persists indefinitely until logout): `token`, `user` (full PII), `email`, `bmi`, `comorbidities`, `allergies`, `exclusion_criteria`, `exclusion_criteria_note`, `incompitable_medication`, `side_effect`, `treatment_is_agree`, `deliveryAddress`, `product_id`, `dosage`, `medication_price`, `order_id`, `coupon_id`, `doctorConsultationBooking`, `reset_token`, `user_email`. → **Special-category + auth data unencrypted on device.** Cleared only by `UserDashboardLayout.clearSessionStorage` on logout (`:188-217`).
- **`sessionStorage`** (cleared on tab close — better): `checkout_flow`, follow-up answers, `product_name`, `product_dosage`, `pharmacy_price`. The follow-up feature's choice to use `sessionStorage` is the model the rest of the app should follow.
- **Client logs:** only CMP warnings and one public-blog `console.log`; no PII. `dev-output.log` is untracked and PII-free.
- **Files/PDFs:** prescription PDF rendering (`/prescriptions`) is static; real PDF/ID-upload storage is backend-only and **unverifiable here**. The `VerifyIdentityPage` upload is a non-functional UI stub (no network call).
- **Retention/deletion gaps:** no client expiry; abandoned-flow data lingers; no deletion/export UI for data-subject rights.

---

## 10. Recommended Remediation Plan

**Before launch (blockers):**
1. Enforce role + ownership on **every** backend endpoint; add client route guards on patient/pharmacy/admin areas (F-01).
2. Add a 401 interceptor (logout+redirect); stop caching the full `user` object; evaluate `HttpOnly` cookie sessions (F-02).
3. Make the backend authoritative for price; stop sending `medication_price` from the client in the initial flow (F-03).
4. Remove/replace the real-looking personal data on `/prescriptions` and confirm the route's production exposure (F-04).
5. Move questionnaire health data to `sessionStorage`; clear on flow completion (P-01).
6. Add an explicit, recorded consent step before the questionnaire and at registration with working policy links (P-02).

**Shortly after launch:**
7. Configure Usercentrics (settings ID) and verify service declarations (P-04).
8. Add security headers/CSP in `vercel.json` (F-05).
9. Restrict + rotate the Google Maps key (F-06).
10. Implement data export + account deletion / DSAR workflow (Checklist §8).

**Nice-to-have hardening:**
11. Strip `console.*` in production (F-08); delete `dev-output.log`.
12. Replace placeholder defaults (`country: "Bangladesh"`, demo emails) with neutral values.
13. Minimize patient fields shown to pharmacies; log/justify CSV export (P-03).

**Legal/DPO clarification needed:**
14. Lawful basis for Art. 9 data (consent vs. treatment); finalize Datenschutzerklärung + Impressum (currently `/terms`); DPAs for all processors; retention schedule; documented TOMs for the backend.

---

## 11. Questions for Backend/Team/Client

1. Does the backend validate **role** (patient/pharmacy/admin) and **resource ownership** on every endpoint, especially `/view/order/{id}`, `/pharmacy/*`, and any admin APIs?
2. Are order IDs (numeric, sequential-looking) authorization-checked, or is IDOR possible?
3. On `/order/create`, does the backend **ignore** the client-sent `medication_price` and recompute from `product_id`?
4. Is the JWT short-lived with refresh, and is there server-side revocation/logout?
5. Where and how long are **prescription PDFs and ID uploads** stored? Are file URLs signed/expiring, or guessable/public?
6. Which **payment provider** is used, and does its metadata ever contain medication/health data?
7. Which **e-mail/SMTP provider** is used; can you share the patient/pharmacy/admin e-mail templates for data-minimization review?
8. Is there an **audit trail** for prescription status changes, pharmacy completion, admin actions, doctor approvals, and e-mail sends?
9. Is the data **hosted in the EU/EEA**, and which sub-processors does `thewarriors.team` use?
10. Is the **admin dashboard** wired to real APIs in production (it's static mock data in this repo), and how is admin auth/role enforced?
11. Is the **`/auth/verify-identity` upload** implemented server-side, and what's its retention?
12. Are passwords hashed (bcrypt/argon2) and is rate-limiting in place on `/login`, `/verify_otp`, `/resend_otp`, `/reset-password`?

---

**Bottom line:** No secrets are committed to git, there are no vulnerable npm dependencies (`npm audit`: 0), no analytics/tracking, and the consent-gating of Google Maps plus the follow-up flow's `sessionStorage` design are genuinely good patterns. But the frontend stores special-category health data and the session token in `localStorage`, lacks route guards, trusts a client-side price, ships real-looking patient data on a public page, and has no functioning consent gate — and the security-critical backend that would mitigate most of this **cannot be verified from this repository.** Treat the six blockers above plus a backend security/DSGVO review as prerequisites to launch.
