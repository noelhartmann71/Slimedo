# Design-System-Migration · Fortschritt & Restplan

> Handoff-Dokument. Branch: **`align-rest`**. Quelle der Wahrheit = **Landing-Page**.
> Ziel: Inline-Styles → Tailwind-v4-Tokens/Utilities, Rest der Website an die Landing-Palette angleichen — **ohne visuelle Regression auf der Landing** (0-Diff-Pflicht).

---

## ✅ Erledigt (committet)

**Phase 1** — `DESIGN-INVENTORY.md` (Farb-/Token-Mapping, 300+ Hex kategorisiert) + Visual-Regression-Toolchain.
**Phase 2** — Token-Fundament in `src/index.css` `@theme`: `--color-primary` `#1b433b`→`#1E3A2E` korrigiert, Neutral-Skala, Status-Tokens (`success/error/warning/info`), Radius- (`field/card-sm/card/pill`) und Shadow-Tokens (`card/dropdown/cta`).
**Phase 3** — Kern-UI-Komponenten: `ui/button.tsx` (slate→Marke, Varianten `default/primary/cta/outline/secondary/ghost/link/destructive`, Pill), `ui/container.tsx`, `ui/section.tsx`, `ui/card.tsx`, `ui/badge.tsx`.
**Phase 4 (8/n)** — Landing-Sektionen konvertiert (jede committet + screenshot-verifiziert):

| Section | Inline-Styles | Status |
|---|---|---|
| Navbar | 18 → 1 | voll ✓ |
| SlimedoHero | 2 → 0 (FloatingStatCard extrahiert) | voll ✓ |
| TherapieSection | 50 → 32 (TherapieCard extrahiert) | voll ✓ |
| BmiCalculatorSection | 50 → 5 | voll ✓ |
| WarumWirSection | 47 → 37 | nur statische Chrome (Rest dynamisch) |
| BlogSection | 39 → 6 | voll ✓ |
| PrivacySection | 43 → 34 | nur statische Chrome (Rest Animation) |
| CtaSection | 12 → 2 | voll ✓ |

**Phase 5 (5/n) — Rest der Website** (committet, `Design system phase 5 (n/n): …`):

| Unit | Umfang | Status |
|---|---|---|
| 1. Footer | `components/Footer/Footer.tsx`: Inline-Styles → Utilities, JS-Hover → CSS `hover:`. Footer rendert auf der Landing-Fullpage → **0-Diff verifiziert** (Footer-Region clean). | ✓ |
| 2. Buttons | `AuthButton` (#1d3a35/#16302b→deep/primary-hover, grays→neutral; Form-Shape behalten¹), `CTABanner` (#13302A→deep, #227C31→sage), `BankPaymentModal` (Override raus → brand default), 8 Auth-Form-Pages (Submit-Override `#29574E`+PayPal-Blau-Hover `#003569` raus → brand variant; Disabled+Google-Button → neutral). | ✓ |
| 3. Auth-Greens | Alle `auth/pages`: #227C31→sage, #29574E→sage, #1B433B/#1D3A35/#1E4039/#1A3330→deep, #16302B→primary-hover, #0B1C19→dark, #01478F-Links→sage, SVG-stroke #1d3a35→#1E3A2E. Sidebars jetzt sage, Links sage statt blau (screenshot-verifiziert: login, account-ready). | ✓ |
| 4. Greens (Rest) | 40 Non-Landing-Dateien (profile, admin, questionnaire, product, svg-container-Modals, auth-components, Blog/FAQ/Testimonials/WeightCalculator-Komponenten, standalone Pages): §2a→deep, §2b→sage, #16302B→primary-hover, #0B1C19→dark. Bracket `[#hex]`→Token-Utility, Roh-Hex (inline/SVG)→Token-Hex. **Success-Greens (#22C55E/#16A34A/#10B981) bewusst behalten.** (verifiziert: product/select) | ✓ |
| 5. Slate→Neutral | 59 Non-Landing-Dateien: #6B7280/#64748B/#667185/…→neutral-500, #4B5563→600, #374151→700, #101928/#111827→900, #ACB5BB/#94A3B8/#9CA3AF→400, #D1D5DB/#CBD5E1→300, #E5E7EB/#E2E8F0/#E8ECEB/#DCE4E8→200, #020817→ink. **Helle BG-Grays (F-Serie) + shared `ui/*` bewusst ausgelassen** (Card-Flächen-Shift + Landing-Risiko); Status/Brand-Farben behalten. (verifiziert: /privacy, /auth/login) | ✓ |
| 6. Mobile | Audit @390px über alle erreichbaren migrierten Routen (auth/product/privacy/terms/blog): **kein horizontaler Overflow** (`scrollW==clientW`) — die reinen Farb-Edits haben kein Layout angefasst. Fix: Deko-Sprechblase „Schön dich zu sehen!" (`absolute left-[82%]`) ragte auf schmalen Auth-Panels raus → responsive `left-1/2 md:left-[82%]` auf allen 8 Auth-Sidebars (Desktop unverändert). Tooling: `capture-route.mjs` hat jetzt optionales Viewport-Width-Arg; neu `scripts/overflow-check.mjs`. | ✓ |
| 7. Cards | Radien/Shadows auf Tokens: `rounded-3xl`→`rounded-card`, `rounded-2xl`→`rounded-card-sm` (wertgleich, 28+89×). Auth-Außenpanels `rounded-[40px]` + neutraler Bespoke-Shadow → `rounded-card` + `shadow-dropdown` (brand-grün getönt, 8 Seiten, verifiziert login Desktop+Mobile). Sprechblasen-Shadow Magenta `rgba(238,66,215,.3)` → deep-getönt `rgba(30,58,46,.25)`. **Belassen:** `rounded-xl/lg/md/[10px]/4xl` (kein passender Token) + brand-grüne Hero-Glows (gewollte negative spread). `vite build` ✓. | ✓ |

¹ **Deviation vom Inventory §6:** `AuthButton` wurde *nicht* auf `ui/button.tsx` umgestellt — die Pill-Form + fixe Höhe von `ui/button` passt nicht zu Full-Width-`rounded-lg`-Form-Submits. Stattdessen nur die Farben auf Brand-Tokens gemappt (gleiches Brand-Ergebnis, bessere Form-UX). Gilt analog für die Auth-Submit-`<Button>`s: Shape-Klassen (w-full/h-14/rounded-2xl) bleiben, nur Farb-Override entfernt → brand `default`-Variante greift.

**QA-Stand nach Phase 5:** `tsc -b` ✓ · `vite build` ✓ (alle neuen Token-Utilities lösen auf). `eslint` hat **8 vorbestehende Errors** (`no-explicit-any`, `react-refresh/only-export-components`, `react-hooks/set-state-in-effect`) — **nicht** aus dieser Arbeit (u.a. in `BookConsultationModal.tsx`, nie angefasst); reine className/Hex-Swaps können diese nicht erzeugen. Vor PR separat adressieren oder bewusst akzeptieren.

---

## 🔧 Workflow (so wird verifiziert)

```powershell
# pnpm fehlt lokal; vite direkt starten (npm/node vorhanden):
node node_modules/vite/bin/vite.js --port 5173 --strictPort   # Hintergrund
$env:BASE_URL='http://localhost:5173'
node scripts/visual-baseline.mjs current   # erfasst desktop+mobile, fullpage + 9 Section-Anker
node scripts/visual-diff.mjs               # vergleicht visual-baseline ↔ visual-current, schreibt magenta *.diff.png
```
- **Baseline** (`visual-baseline/`, gitignored, lokal 20 PNGs vorhanden) = Referenz-Stand der Landing. Da jede Migration als 0-Diff verifiziert wurde, ist die **aktuelle committete Landing visuell identisch** zum Original. **Bei Verlust einfach neu aufnehmen** vom aktuellen Stand: `node scripts/visual-baseline.mjs baseline` (das ist sicher — die Landing ist verifiziert unverändert). Künftige Änderungen müssen dann 0-Diff gegen diese Baseline bleiben.
- Capture friert Animationen ein; Diff hat AA-/Cluster-Filter (Rauschen gefiltert).
- **Bekanntes Rauschen (ignorieren):** dekorative Kurve in `how-it-works` (Desktop) + Testimonials-Karussell in `bewertungen` (Mobile). Beide schwanken zwischen Läufen.
- Section-Anker für Capture: `how-it-works-section, therapie, preise, wirk, potenzial, anwendung, bewertungen, blog, faq`. Sektionen **ohne** diese id (WarumWir, Privacy=`datenschutz`, Cta=`start`, Lifestyle) nur via **Fullpage**-Diff prüfbar.

---

## ⚠️ Gelernte Regeln (Pixel-Genauigkeit — unbedingt beachten)

1. **`{' '}` exakt beibehalten** bei zentriertem Text. Ein literales Leerzeichen rendert unter `text-align:center` sub-pixel anders als der JSX-`{' '}`-Ausdruck. (Bmi-Headline kostete eine lange Jagd.)
2. **`<a>`/`<Link>`-`font-family` explizit lassen** (`style={{ fontFamily: '"Inter", sans-serif' }}`). Ein Anchor, der Inter *erbt* statt es zu *setzen*, rendert sub-pixel anders.
3. **`font-["Manrope",sans-serif]` mit Quotes bricht den Build** (Vite-Overlay). Ohne Quotes: `font-[Manrope,sans-serif]`. Generell exakten Original-Font-Stack als Arbitrary nutzen, nicht den Token, wenn der Token einen anderen Fallback hat (z. B. `--font-manrope` hat `system-ui`, Original nicht).
4. **`calc()` in Arbitrary:** Spaces um Operatoren als Unterstriche: `max-w-[calc(66%_-_18px)]`.
5. **Dynamische/state-getriebene Inline-Styles NICHT erzwingen** (`hovered ? a : b`, JS-gemessene Breiten, conditional opacity/filter, Prop-Backgrounds). Tailwind kann keine Runtime-Werte. Inline lassen ist hier korrekt und lesbarer. Nur **statische** Styles konvertieren.
6. **Alpha-Farben** als Arbitrary `[rgba(...)]` (nicht `token/XX`-Opacity) wenn exakte Gleichheit nötig — `bg-cream/92` nutzt color-mix(oklab) ≠ `rgba(...)`.
7. **JS-Hover (`onMouseEnter/Leave`) → CSS `hover:`** wo möglich (Default-State bleibt 0-Diff; Hover separat per Hover-Screenshot prüfen, `scripts/capture-navbar-states.mjs` als Muster).
8. Nach Edits, die Konstanten/Props ungenutzt machen: **entfernen** (sonst bricht `tsc -b` via noUnusedLocals).

**Token-Map (Brand):** `#1E3A2E`=deep/primary · `#3D5C4A`=sage · `#0F1F1A`=dark · `#162B20`=card-dark · `#FAF5EA`=cream · `#FFFDF7`=surf · `#F5EEDB`=sand · `#E5D9BD`=sand2 · `#C8BC9E`=sand-shadow · `#CDDDCB`=mint · `#B0832B`=honig · `#EDD89A`=honig2 · `#B5654B`=terra · `#1A1A1A`=ink · `#6E6A60`=stein · `#768064`=olive.

---

## 📋 Restplan

### Phase 4 — restliche Landing-Sektionen
Reihenfolge nach Aufwand (überwiegend statisch → sollten glatt laufen):

1. **PricesSection** (5 inline) — fast fertig, schnell.
2. **WirkungsweiseSection** (13), **CtaSection** done.
3. **AnwendungSection** (15)
4. **ThreeStepsSection** (18) / **NewTrustSection** (22, `how-it-works`)
5. **FaqSection** (23) — Eyebrow `Badge`-Komponente adoptierbar.
6. **TestimonialsSection** (23) — Karussell dynamisch, nur statische Chrome.
7. **LifestyleSection**, **TrustStrip** (4), **SlimedoTicker** — klein.

Pro Section: lesen → statische Inline-Styles → Tokens/Utilities (dynamische lassen) → build → `visual-diff` (0 erwartet) → commit `Design system phase 4 (n/n): …`.

### Phase 5 — Rest der Website (der große Konsistenz-Hebel)
Reihenfolge: **Footer → Buttons → Farben/Grüns → Cards → Mobile.**
✅ **Phase 5 vollständig** (Footer, Buttons, Grüns auth + non-landing, Slate→Neutral, Mobile, Cards — siehe Erledigt-Block oben).

**Optionaler Rest / vor dem PR prüfen:**
- **Mobile-Rest (nur falls Session möglich):** profile/admin sind auth-gated → nicht per `capture-route.mjs` prüfbar; bei vorhandener Test-Session @390px gegen-checken (Overflow-Tool: `node scripts/overflow-check.mjs <route…>`).
- **Bewusst ausgelassen (optional nachziehen):**
  - Helle BG-Grays **F-Serie** (`#F3F4F6` = bereits `--color-accent/-muted`-Tokenwert, `#F8FAF9`, `#FAFBFC`, `#F1F5F9`, `#EDF2F7`…) → ggf. `neutral-50/100` oder `surf/cream`. Übersprungen, um Card-Flächen-Shift zu vermeiden.
  - Shared `ui/*` (input, card, calendar-Rest, skeleton) → werden auch von der Landing genutzt; bei Änderung **Landing-Full-Diff** prüfen.
  - `#01478F`/`#1D62EC`/Blau-Töne in **svg-container** (Zahlart-Brand?) — vor Mapping gegen Inventory §4 prüfen (nicht blind → info/sage).
- **Kein 0-Diff-Zwang** hier (Änderungen sind *gewollt*). Auth-gated Dashboards (profile/admin) sind per `capture-route.mjs` **nicht** ohne Session screenshotbar → Verifikation dort via `tsc -b` + `vite build` + Token-Mapping-Review.
- **Greens-/Neutral-Sweep-Muster** (für Wiederholung in neuen Dateien): `perl -i -pe` Zwei-Pass — erst `s/\[#HEX\]/token/gi` (Tailwind-Arbitrary→Utility), dann `s/#HEX\b/#TOKENHEX/gi` (inline/SVG). Datei-Liste vorher per `grep -ril` bauen und **Landing-Dateien ausschließen** (`slimedo-landing/`, `NewTrustSection`, `Navbar`, `SlimedoTicker`, `Footer`).
- Hotspots (optionale Zerlegung): `SvgContainer.tsx` (1640), `PharmacyOverviewPage` (1090), `DeliveryMethodSelectionPage` (991).

### Phase 6 — QA
`npm run build` ✓ (grün nach Phase 5) · `npm run lint` hat **8 vorbestehende Errors** (nicht aus der Migration — vor PR separat klären) · responsive Checkliste (offen) · Landing-Full-Diff = nur bekanntes Rauschen (Phase-5-Edits betrafen keine Landing-Dateien) · keine neuen Dependencies ✓ · PR von `align-rest` → `master`.

---

## 🚀 Fortsetzen in frischer Session
1. Repo lesen: dieses Dokument + `DESIGN-INVENTORY.md`.
2. Branch `align-rest` ist aktuell; `git log --oneline` zeigt Stand.
3. Sagen: *„mach Phase 4 weiter mit PricesSection"* (Landing-Sektionen, 0-Diff — restliche Sektionen siehe Phase-4-Liste). **Phase 5 ist durch** → sonst *„öffne den PR `align-rest` → `master`"* bzw. die vorbestehenden eslint-Errors vorher klären (siehe QA-Stand).
