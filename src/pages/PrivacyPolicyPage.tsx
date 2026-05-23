import { Link } from "react-router-dom";

type PolicySection = {
  title: string;
  description: string;
  points: string[];
};

const policySections: PolicySection[] = [
  {
    title: "Informationen, die wir sammeln",
    description:
      "Wir erfassen die Informationen, die Sie bei der Kontoerstellung, bei Pflegeanfragen oder bei der Nutzung des Apotheken-Dashboards angeben.",
    points: [
      "Kontodetails wie Name, E-Mail-Adresse, Telefonnummer und Standort.",
      "Gesundheits- und bestellbezogene Daten, die Sie über Formulare und Dashboard-Aktionen übermitteln.",
      "Technische Daten wie Geräteinformationen, Cookies und Nutzungsereignisse, um den Service stabil zu halten.",
    ],
  },
  {
    title: "Wie wir Ihre Informationen verwenden",
    description:
      "Wir verwenden Ihre Daten nur zum Betrieb der Plattform und zur Bereitstellung der von Ihnen angeforderten Dienste.",
    points: [
      "Erstellen und Verwalten Ihres Kontos und Profils.",
      "Bearbeitung von Bestellungen, Rezepten, Zahlungen und Supportanfragen.",
      "Verbesserung der Produktqualität, Sicherheit, Leistung und des Kundenerlebnisses.",
    ],
  },
  {
    title: "Weitergabe und Offenlegung",
    description:
      "Wir verkaufen Ihre persönlichen Daten nicht. Wir geben Daten nur dann weiter, wenn dies für den Betrieb des Dienstes oder die Erfüllung gesetzlicher Verpflichtungen erforderlich ist.",
    points: [
      "An Apotheken, Ärzte und Dienstleister, die an Ihrer Betreuung oder der Bestellabwicklung beteiligt sind.",
      "An vertrauenswürdige Anbieter, die Hosting, Analysen, Kommunikation und Zahlungen unterstützen.",
      "Wenn dies durch Gesetze, Vorschriften oder zum Schutz der Rechte und der Sicherheit der Nutzer erforderlich ist.",
    ],
  },
  {
    title: "Ihre Möglichkeiten",
    description:
      "Sie können Ihr Profil jederzeit überprüfen und aktualisieren und kontrollieren, wie viele Informationen Sie weitergeben.",
    points: [
      "Aktualisieren Sie Ihre persönlichen Daten und Apothekendetails über Ihr Dashboard.",
      "Beantragen Sie ggf. Zugang, Berichtigung oder Löschung.",
      "Verwalten Sie Browser-Cookies und Kommunikationseinstellungen über Ihre Geräteeinstellungen.",
    ],
  },
  {
    title: "Sicherheit und Aufbewahrung",
    description:
      "Wir wenden angemessene Sicherheitsvorkehrungen an, um Ihre Daten zu schützen, und bewahren sie nur so lange auf, wie es für den Service erforderlich ist.",
    points: [
      "Zugriffskontrollen und sichere Übertragung für sensible Aktionen.",
      "Aufbewahrung im Einklang mit geschäftlichen, rechtlichen und klinischen Anforderungen.",
      "Löschung oder Anonymisierung, sobald Informationen nicht mehr benötigt werden.",
    ],
  },
  {
    title: "Kontaktiere uns",
    description:
      "Wenn Sie Fragen zu dieser Richtlinie oder Ihren Daten haben, wenden Sie sich bitte an unser Support-Team.",
    points: ["E-Mail: support@slimedo.com", "Telefon: +880 1234-567890"],
  },
];

function PolicyCard({ section }: { section: PolicySection }) {
  return (
    <article className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-[#111827]">{section.title}</h2>
      <p className="mt-3 text-sm leading-6 text-[#4B5563]">
        {section.description}
      </p>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-[#374151]">
        {section.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B433B]" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F4F7F5] text-[#0F172A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(27,107,90,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(20,79,66,0.1),transparent_24%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-14 lg:px-8">
        <section className="overflow-hidden rounded-4xl bg-linear-to-br from-[#0D3B31] via-[#144C3F] to-[#1B6B5A] p-8 text-white shadow-[0_25px_70px_-30px_rgba(27,67,59,0.75)] md:p-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Datenschutzbestimmungen
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Ihre Privatsphäre, klar erklärt
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78 md:text-base">
              Auf dieser Seite wird erläutert, welche Informationen wir sammeln, wie wir sie verwenden und
              welche Möglichkeiten Sie bei der Nutzung der Slimedo-Plattform haben.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#114538] transition-colors hover:bg-white/90"
              >
                Zur Startseite
              </Link>
              <Link
                to="/terms"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                Bedingungen ansehen
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <FactCard label="Zuletzt aktualisiert" value="23. April 2026" />
            <FactCard
              label="Gilt für"
              value="Patienten, Apotheken und Besucher"
            />
            <FactCard label="Support" value="support@slimedo.com" />
          </div>
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            {policySections.map((section) => (
              <PolicyCard key={section.title} section={section} />
            ))}
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6B7280]">
                Kurze Zusammenfassung
              </p>
              <div className="mt-4 space-y-4 text-sm leading-6 text-[#4B5563]">
                <p>
                  Wir erfassen nur die Daten, die zur Bereitstellung der Pflege, zur Bearbeitung von
                  Bestellungen und zur Sicherung Ihres Kontos erforderlich sind.
                </p>
                <p>
                  Sensible Informationen werden mit Sorgfalt behandelt und durch angemessene
                  technische und organisatorische Sicherheitsmaßnahmen geschützt.
                </p>
                <p>
                  Sie können die Profilinformationen jederzeit über Ihr Konto-Dashboard
                  aktualisieren.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-[#E5E7EB] bg-[#0F5132] p-6 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                Brauchen Sie Hilfe?
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Support kontaktieren</h2>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Wenn Sie Hilfe bei Datenschutzfragen, Kontozugriff oder Profiländerungen
                benötigen, wenden Sie sich an unser Support-Team.
              </p>
              <div className="mt-5 space-y-2 text-sm text-white/85">
                <p>E-Mail: support@slimedo.com</p>
                <p>Telefon: +880 1234-567890</p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
