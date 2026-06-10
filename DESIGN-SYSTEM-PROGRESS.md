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

---

## 🔧 Workflow (so wird verifiziert)

```powershell
# pnpm fehlt lokal; vite direkt starten (npm/node vorhanden):
node node_modules/vite/bin/vite.js --port 5173 --strictPort   # Hintergrund
$env:BASE_URL='http://localhost:5173'
node scripts/visual-baseline.mjs current   # erfasst desktop+mobile, fullpage + 9 Section-Anker
node scripts/visual-diff.mjs               # vergleicht visual-baseline ↔ visual-current, schreibt magenta *.diff.png
```
- **Baseline** (`visual-baseline/`) = Pre-Migration-Stand. **Nicht** neu aufnehmen, sonst geht die Referenz verloren. (gitignored, lokal vorhanden; bei Verlust: vor der jeweiligen Änderung `git stash` + `node scripts/visual-baseline.mjs baseline` + `git stash pop`.)
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
- **Grün-Konsolidierung** (aus `DESIGN-INVENTORY.md`): `#29574E`(114×)→sage, `#227C31`(106× CTA/Success)→sage/deep bzw. success-Token, `#1B433B`(62×)→deep, `#1D3A35`/`#16302B`→deep, AuthButton-Grüns. **Status-/Zahlart-/Social-Farben NICHT brand-mappen** (siehe Inventory §4).
- **Button-Overrides entfernen:** Auth-Seiten überschreiben `ui/button.tsx` lokal mit `bg-[#29574E]!` etc. — diese Overrides raus, damit die Marken-Varianten greifen. Auch `AuthButton.tsx` und `CTABanner.tsx` auf `ui/button.tsx` umstellen.
- **Slate/Gray-Welt** (`#6B7280`, `#667185`, `#101928`, `#E5E7EB`…) → Neutral-Skala/`ink`/`stein` (v. a. Admin).
- Betroffen: `features/auth/*`, `features/profile/*`, `features/admin-dashboard/*`, `components/CTABanner`, `components/Footer`, `pages/*`.
- **Kein 0-Diff-Zwang** hier (Änderungen sind *gewollt*) — pro Seite Vorher/Nachher-Screenshot via `scripts/capture-route.mjs <route> <name>` dokumentieren.
- Hotspots (Zerlegung): `SvgContainer.tsx` (1640), `PharmacyOverviewPage` (1090), `DeliveryMethodSelectionPage` (991).

### Phase 6 — QA
`npm run build` + `npm run lint` grün · responsive Checkliste · Landing-Full-Diff = nur bekanntes Rauschen · keine neuen Dependencies · PR von `align-rest` → `master`.

---

## 🚀 Fortsetzen in frischer Session
1. Repo lesen: dieses Dokument + `DESIGN-INVENTORY.md`.
2. Branch `align-rest` ist aktuell; `git log --oneline` zeigt Stand.
3. Sagen: *„mach Phase 4 weiter mit PricesSection"* oder *„starte Phase 5 mit den Auth-Buttons"*.
