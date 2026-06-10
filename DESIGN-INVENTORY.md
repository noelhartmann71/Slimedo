# Slimedo · Design-Inventory (Phase 1)

> Arbeitsgrundlage für die Token-Migration. **Quelle der Wahrheit = Landing-Page.**
> Werte = Ist-Zustand (Stand der Analyse). Ziel: jede Farbe einem `@theme`-Token zuordnen,
> ohne die Landing optisch zu verändern, und den Rest der Website auf die Landing-Palette angleichen.

Befund: **> 300 verschiedene Hex-Werte** im `src`-Baum, **437× `style={{…}}`** in 26 Dateien.
Der meistgenutzte Farbton ist `#29574E` (114×) — ein Grün, das **nicht** zur Landing-Palette gehört.

---

## 1. Landing-Palette = Tokens (BEHALTEN, bereits in `src/index.css @theme`)

| Token | Hex | Nutzung | Rolle |
|---|---|---|---|
| `deep` | `#1E3A2E` | 64× | Primär-Dunkelgrün, Headings, Button-Hover |
| `sage` | `#3D5C4A` | 78× | Button-BG, Links, mittlere Grünfläche |
| `dark` | `#0F1F1A` | 3× | Dunkelste Sektionen |
| `card-dark` | `#162B20` | 2× | Karten auf dunklem Grund |
| `cream` | `#FAF5EA` | 50× | Seiten-Hintergrund |
| `surf` | `#FFFDF7` | 27× | Heller Flächen-Hintergrund |
| `sand` | `#F5EEDB` | 18× | Warmer Neutral-Block |
| `sand2` | `#E5D9BD` | 26× | Warmer Neutral, dunkler |
| `sand-shadow` | `#C8BC9E` | 4× | Warme Schatten/Border |
| `mint` | `#CDDDCB` | 41× | Akzent hellgrün |
| `honig` / `honig2` | `#B0832B` / `#EDD89A` | 4× / 8× | Gold-Akzent |
| `terra` | `#B5654B` | 2× | Terrakotta-Akzent |
| `ink` | `#1A1A1A` | 39× | Fließtext |
| `stein` | `#6E6A60` | 24× | Muted Text |
| `olive` | `#768064` | 21× | Sekundär-Akzent |

**To-do Phase 2:** `--color-primary` ist aktuell `#1b433b` (falsches Grün) → auf `#1E3A2E` (`deep`) korrigieren.
Diese Tokens müssen künftig als **Utilities** (`bg-deep`, `text-sage`, …) statt als rohe Hex genutzt werden
(heute praktisch nur die Font-Tokens in Utility-Form verwendet).

---

## 2. Grüntöne → auf Landing-Palette KONSOLIDIEREN

Entscheidung: vereinheitlichen. Mapping nach Helligkeit/Rolle. Optische Änderung an Alt-Seiten ist **gewollt**.

### 2a. → `deep` (`#1E3A2E`) — dunkle Markengrüns
| Hex | Nutzung | Hauptorte |
|---|---|---|
| `#1B433B` | 62× | auth/pages, svg-container, profile (= alter `--color-primary`) |
| `#1D3A35` | 31× | auth/pages, questionnaire, FAQ (AuthButton) |
| `#16302B` | 17× | auth/pages (AuthButton-Hover) → `deep`/Hover |
| `#234021` | 14× | — |
| `#19301E` | 9× | — |
| `#13302A`, `#0B1C19`, `#114538`, `#163730`, `#193D36`, `#082723` | je 1–5× | CTABanner u.a. |

### 2b. → `sage` (`#3D5C4A`) — mittlere Grüns
| Hex | Nutzung | Hauptorte |
|---|---|---|
| `#29574E` | **114×** | svg-container, auth, admin, BlogDetails — **Top-Offender** |
| `#4A8E83` | 14× | — |
| `#4A645D` | 13× | — |
| `#2D6B61` | 12× | — |
| `#235248`, `#1B6B5A`, `#2D6A5F`, `#3D524C`, `#3D6B50`, `#4A6E58` | je 1–5× | — |

### 2c. Helles „CTA/Success"-Grün — GESONDERT entscheiden (Phase 2)
`#227C31` (106×) ist deutlich heller/gesättigter als `sage`. Es markiert teils **CTAs**, teils **Success**.
- CTAs (z.B. `CTABanner`, Buttons) → `sage`/`deep` (Marken-CTA).
- Echte Erfolgs-Status (Häkchen, „erledigt") → **nicht** brand-mappen, siehe §4 (Status).
- Verwandte: `#22C55E`(7), `#16A34A`(3), `#0B8A4A`, `#036B26`, `#15803D`, `#166534`, `#0F5132`.

---

## 3. Neutrals / Slate-Grautöne → ink / stein / Neutral-Skala

Generische Tailwind-/Slate-Defaults. Vorschlag: schlanke Neutral-Skala als Tokens
(`neutral-50/100/200/400/500/700/900`) + Text auf `ink`/`stein`.

| Hex | Nutzung | Bedeutung | Ziel |
|---|---|---|---|
| `#6B7280` | 115× | gray-500 (Muted-Text) | `stein` / muted-foreground |
| `#667185` | 84× | Admin Slate-Text | `stein` / neutral-500 |
| `#E5E7EB` | 65× | gray-200 (Border) | neutral-200 / border |
| `#E8ECEB` | 56× | heller Border | neutral-200 |
| `#101928` | 46× | Admin Near-Black (Heading) | `ink` / neutral-900 |
| `#E2E8F0` | 46× | slate-200 | neutral-200 |
| `#020817` | 44× | slate-950 (shadcn Default) | `ink` |
| `#ACB5BB` | 43× | Gray | neutral-400 |
| `#4B5563` | 42× | gray-600 | neutral-700 |
| `#E5E9EB` | 42× | heller Gray | neutral-200 |
| `#64748B` | 40× | slate-500 | neutral-500 |
| `#DCE4E8` | 34× | heller Border-Blaugrau | neutral-200 |
| `#94A3B8` | 30× | slate-400 | neutral-400 |
| `#111827`, `#374151`, `#9CA3AF`, `#CBD5E1`, `#98A2B3`, `#D1D5DB`, `#6C7278`, `#808897` | je 4–24× | Slate/Gray | Neutral-Skala |

---

## 4. Funktionale & Marken-Farben → BEHALTEN (NICHT brand-mappen)

Diese tragen Bedeutung (Status) oder fremde Markenidentität (Zahlarten/Social). Bleiben erhalten;
höchstens als semantische Tokens (`--color-success`, `--color-error`, `--color-warning`, `--color-info`) zentralisieren.

**Status:**
- Error/Rot: `#EF4444`(5), `#B42318`(4), `#FEF2F2`(5), `#B91C1C`, `#D92D20`, `#FEE2E2`, `#FEF3F2`, `#FCA5A5`
- Success/Grün: `#22C55E`(7), `#16A34A`(3), `#DCFCE7`, `#BBF7D0`, `#F0FDF4`, `#0B8A4A`
- Warning/Amber: `#F59E0B`(3), `#F9A000`, `#B45309`, `#FFFAEB`, `#F79E1B`
- Info/Blau: `#01478F`(39), `#1D62EC`, `#2563EB`, `#1D4ED8`, `#4A90D9`, `#03A9F4`

**Marken (Zahlarten/Social) — v.a. in `svg-container`:**
- Google: `#4285F4`, `#34A853`, `#FBBC05`, `#EA4335`
- PayPal: `#179BD7`, `#003569`, `#172B85`, `#009689`
- Mastercard: `#EB001B`, `#FF5F00`, `#F79E1B`
- Visa/Amex/Klarna/Facebook/TikTok: `#1877F2`, `#00F6EF`, `#FF004F`, diverse

> ⚠️ `#01478F` (39×, auth + svg-container): vor Mapping prüfen, ob Link-Blau (→ `info`-Token)
> oder Zahlart-Brand (→ behalten). Nicht blind ersetzen.

---

## 5. Weitere Tokens (heute nur als Arbitrary-Values)

- **Radii:** `--radius-pill: 999px`, `--radius-card: 24px`, `--radius-card-sm: 16px`, `--radius-field: 8–12px`
- **Shadows (grün-getönt, wiederkehrend):**
  - `--shadow-card: 0 18px 44px rgba(30,58,46,.18)`
  - `--shadow-dropdown: 0 22px 55px rgba(30,58,46,.24)`
  - `--shadow-cta: 0 4px 24px rgba(0,0,0,.30)`
- **Container/Spacing:** wiederkehrend `mx-5 / lg:mx-10 / xl:mx-15`, Section-Padding `py-10 xl:py-20` → `Container`/`Section`-Pattern.

---

## 6. Button-Systeme, die zusammengeführt werden (→ ein `ui/button.tsx`)

| Heute | Ort | Farben | Ziel-Variante |
|---|---|---|---|
| shadcn `Button` | `ui/button.tsx` | `slate-900/50` | wird themed |
| Inline-Pills | Navbar, Sections | `#3D5C4A`→`#1E3A2E` | `primary` |
| `AuthButton` | auth | `#1d3a35`→`#16302b`, `gray-300/700` | `primary` / `outline` |
| `CTABanner`-Button | CTABanner | `#227C31`, white | `cta` |

→ Varianten: `primary` (sage→deep, cream Text, Pill) · `outline` (transparent, sage-Border) · `cta` (mit Pulse/Shimmer) · `ghost`/`link`.

---

## 7. Hotspots (Datei-Refactor nach Größe)

Große Dateien mit gemischtem Styling (Zerlegung in Phase 4/5):
`SvgContainer.tsx` (1640), `PharmacyOverviewPage` (1090), `DeliveryMethodSelectionPage` (991),
`PrivacySection` (982), `WarumWirSection` (834), `SlimedoHero` (783), `PricesSection` (698),
`BmiCalculatorSection` (659), `Navbar` (651), `BlogSection` (604), `CtaSection` (600).
