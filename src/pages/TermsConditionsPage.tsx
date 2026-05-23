import { Link } from "react-router-dom";

type TermsSection = {
  title: string;
  description: string;
  points: string[];
};

const termsSections: TermsSection[] = [
  {
    title: "Nutzung der Plattform",
    description:
      "Durch den Zugriff auf Slimedo erklären Sie sich damit einverstanden, die Plattform nur für rechtmäßige, angemessene und vorgesehene Zwecke zu nutzen.",
    points: [
      "Versuchen Sie nicht, den Dienst zu stören, zu kopieren oder zurückzuentwickeln.",
      "Nutzen Sie die Plattform nur mit genauen und wahrheitsgemäßen Informationen.",
      "Befolgen Sie alle Anweisungen, die im Patienten- oder Apotheken-Dashboard angezeigt werden.",
    ],
  },
  {
    title: "Konten und Verantwortung",
    description:
      "Sie sind für die Aktivitäten unter Ihrem Konto und für die sichere Aufbewahrung Ihrer Zugangsdaten verantwortlich.",
    points: [
      "Halten Sie Ihr Passwort geheim und aktualisieren Sie es, wenn Sie unbefugten Zugriff vermuten.",
      "Stellen Sie sicher, dass die von Ihnen angegebenen Kontakt- und Profildetails korrekt sind.",
      "Teilen Sie uns umgehend mit, wenn Sie verdächtige Kontoaktivitäten bemerken.",
    ],
  },
  {
    title: "Medizinische Informationen und Leistungsgrenzen",
    description:
      "Inhalte auf der Plattform sollen die Pflegekoordination unterstützen und nicht die direkte ärztliche Beurteilung ersetzen.",
    points: [
      "Befolgen Sie stets den Rat einer zugelassenen medizinischen Fachkraft.",
      "Notfallsituationen sollten umgehend über die örtlichen Rettungsdienste abgewickelt werden.",
      "Plattforminformationen können sich aufgrund klinischer Überprüfungen oder betrieblicher Erfordernisse ändern.",
    ],
  },
  {
    title: "Bestellungen, Zahlungen und Rezepte",
    description:
      "Bestellungen, Rezeptbearbeitung und Zahlungen können von den von Ihnen bereitgestellten Informationen und der Verfügbarkeit von Partnern abhängen.",
    points: [
      "Gebühren, Zahlungsschritte und Erfüllungsoptionen können je nach Produkt und Apotheke variieren.",
      "Die Genehmigung oder Ablehnung von Rezepten hängt von den geltenden Regeln und Überprüfungen ab.",
      "Rückerstattungen, Stornierungen und Lieferänderungen folgen den Richtlinien, die während des Bestellvorgangs oder in der Support-Kommunikation angezeigt werden.",
    ],
  },
  {
    title: "Akzeptable Nutzung",
    description:
      "Sie erklären sich damit einverstanden, die Plattform nicht zu missbrauchen oder die Erfahrung anderer zu beeinträchtigen.",
    points: [
      "Keine missbräuchliche, betrügerische, schädliche oder illegale Nutzung des Dienstes.",
      "Keine unbefugten Zugriffsversuche, Scraping oder Spam.",
      "Kein Hochladen von Inhalten, die gegen Gesetze, Rechte oder Sicherheitsanforderungen verstoßen.",
    ],
  },
  {
    title: "Änderungen und Beendigung",
    description:
      "Wir können diese Bedingungen aktualisieren oder den Zugriff auf die Plattform aussetzen, wenn dies aus Gründen der Sicherheit, Compliance oder Servicequalität erforderlich ist.",
    points: [
      "Wir können diese Bedingungen von Zeit zu Zeit aktualisieren.",
      "Wir können den Zugriff bei Richtlinienverstößen oder Missbrauch aussetzen oder beenden.",
      "Die fortgesetzte Nutzung der Plattform bedeutet, dass Sie die aktualisierten Bedingungen akzeptieren.",
    ],
  },
];

function TermsCard({ section }: { section: TermsSection }) {
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

export default function TermsConditionsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F4F7F5] text-[#0F172A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,107,90,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(20,79,66,0.1),transparent_24%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-14 lg:px-8">
        <section className="overflow-hidden rounded-4xl bg-linear-to-br from-[#123B33] via-[#174C41] to-[#1B6B5A] p-8 text-white shadow-[0_25px_70px_-30px_rgba(27,67,59,0.75)] md:p-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Allgemeine Geschäftsbedingungen
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Klare Regeln für die Nutzung von Slimedo
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78 md:text-base">
              Diese Bedingungen erklären, wie die Plattform funktioniert, wofür Sie
              verantwortlich sind und welche Bedingungen für Ihre Nutzung des
              Dienstes gelten.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#114538] transition-colors hover:bg-white/90"
              >
                Zur Startseite
              </Link>
              <Link
                to="/privacy"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                Datenschutzbestimmungen ansehen
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <FactCard label="Zuletzt aktualisiert" value="23. April 2026" />
            <FactCard
              label="Gilt für"
              value="Patienten, Apotheken und Administratoren"
            />
            <FactCard label="Support" value="support@slimedo.com" />
          </div>
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            {termsSections.map((section) => (
              <TermsCard key={section.title} section={section} />
            ))}
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6B7280]">
                Verpflichtungen der Nutzer
              </p>
              <div className="mt-4 space-y-4 text-sm leading-6 text-[#4B5563]">
                <p>
                  Bewahren Sie Ihre Zugangsdaten sicher auf und nutzen Sie die Plattform nur für
                  rechtmäßige Zwecke.
                </p>
                <p>
                  Befolgen Sie alle im Dashboard angezeigten Anweisungen, insbesondere für
                  Bestellungen, Rezepte und Zahlungen.
                </p>
                <p>
                  Kontaktieren Sie den Support, wenn Sie Hilfe bei Zugriffs-, Abrechnungs- oder
                  Richtlinienfragen benötigen.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-[#E5E7EB] bg-[#0F5132] p-6 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                Brauchen Sie Hilfe?
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Support kontaktieren</h2>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Wenn Sie Fragen zu diesen Bedingungen haben, kann unser Team Ihnen helfen,
                die Plattformregeln und Kontoanforderungen zu verstehen.
              </p>
              <div className="mt-5 space-y-2 text-sm text-white/85">
                <p>Email: support@slimedo.com</p>
                <p>Phone: +880 1234-567890</p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
