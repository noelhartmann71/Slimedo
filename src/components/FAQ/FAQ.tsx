import { axiosPublic } from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Skeleton } from "../ui/skeleton";

const categories = [
  { id: "all", label: "Alle" },
  { id: "ablauf", label: "Ablauf & Behandlung" },
  { id: "kosten", label: "Kosten & Zahlung" },
  { id: "versand", label: "Versand & Apotheke" },
  { id: "medikamente", label: "Medikamente" },
  { id: "nebenwirkungen", label: "Nebenwirkungen" },
  { id: "sicherheit", label: "Sicherheit & Datenschutz" },
];

const faqs = [
  {
    id: 1,
    category: "ablauf",
    question: "Wie funktioniert die Online-Behandlung bei Slimedo?",
    answer:
      "Die Online-Behandlung bei Slimedo ist einfach und sicher. Sie füllen zunächst einen medizinischen Fragebogen aus, der von unseren GMC-registrierten Ärzten innerhalb von 24 Stunden überprüft wird. Bei Eignung erhalten Sie Ihr Rezept digital und können es in Ihrer Wunschapotheke einlösen. Der gesamte Prozess ist diskret, professionell und vollständig DSGVO-konform.",
  },
  {
    id: 2,
    category: "ablauf",
    question: "Wie lange dauert es, bis ich eine Antwort vom Arzt erhalte?",
    answer:
      "Die meisten Rezepte werden innerhalb von 24 Stunden geprüft und genehmigt. In einigen Fällen können zusätzliche Informationen erforderlich sein, was den Prozess geringfügig verlängern kann.",
  },
  {
    id: 3,
    category: "ablauf",
    question: "Kann ich meinen behandelnden Arzt auswählen?",
    answer:
      "Unsere Plattform weist Ihnen automatisch einen verfügbaren, lizenzierten Arzt zu. Eine manuelle Auswahl ist derzeit nicht möglich, aber alle unsere Ärzte sind vollständig qualifiziert.",
  },
  {
    id: 4,
    category: "ablauf",
    question: "Muss ich persönlich zum Arzt gehen?",
    answer:
      "Nein. Unsere Telemedizinangebote ermöglichen eine vollständig digitale Konsultation. Sie müssen keine Arztpraxis aufsuchen – alles läuft bequem von zu Hause aus.",
  },
  {
    id: 5,
    category: "ablauf",
    question: "Wie oft muss ich mit meinem Arzt sprechen?",
    answer:
      "Das hängt von Ihrer Behandlung ab. Bei einigen Behandlungen ist eine regelmäßige Nachverfolgung erforderlich, während andere nur eine einmalige Konsultation erfordern.",
  },
  {
    id: 6,
    category: "kosten",
    question: "Was kostet die Online-Konsultation?",
    answer:
      "Die Kosten variieren je nach Behandlung. Eine detaillierte Preisübersicht finden Sie auf unserer Preisseite. Die Konsultationsgebühr ist im Gesamtpreis enthalten.",
  },
  {
    id: 7,
    category: "kosten",
    question: "Welche Zahlungsmethoden werden akzeptiert?",
    answer:
      "Wir akzeptieren alle gängigen Zahlungsmethoden, darunter Kreditkarten, Debitkarten und PayPal. Alle Zahlungen sind sicher verschlüsselt.",
  },
  {
    id: 8,
    category: "kosten",
    question:
      "Erhalte ich eine Rückerstattung, wenn mein Rezept abgelehnt wird?",
    answer:
      "Ja. Wenn ein Arzt die Behandlung als ungeeignet erachtet, werden Sie vollständig informiert und erhalten eine vollständige Rückerstattung.",
  },
  {
    id: 9,
    category: "versand",
    question: "Wie erhalte ich mein Medikament?",
    answer:
      "Nach der Genehmigung können Sie Ihre bevorzugte Apotheke wählen oder eine diskrete Lieferung nach Hause bestellen. Wir arbeiten mit lizenzierten Apotheken in ganz Deutschland zusammen.",
  },
  {
    id: 10,
    category: "versand",
    question: "Wie lange dauert die Lieferung?",
    answer:
      "Die Lieferzeit beträgt in der Regel 2–4 Werktage, abhängig von Ihrem Standort und der gewählten Apotheke.",
  },
  {
    id: 11,
    category: "medikamente",
    question: "Welche Medikamente können online verschrieben werden?",
    answer:
      "Wir können eine Vielzahl von Medikamenten für zugelassene Erkrankungen verschreiben. Bestimmte Medikamente erfordern möglicherweise eine persönliche Konsultation.",
  },
  {
    id: 12,
    category: "nebenwirkungen",
    question: "Was soll ich tun, wenn ich Nebenwirkungen erlebe?",
    answer:
      "Bei Nebenwirkungen wenden Sie sich bitte sofort an unseren medizinischen Support. Im Notfall rufen Sie bitte den Notruf 112 an.",
  },
  {
    id: 13,
    category: "sicherheit",
    question: "Sind meine persönlichen und medizinischen Daten sicher?",
    answer:
      "Absolut. Wir verwenden DSGVO-konforme Datenverschlüsselung und sichere Speicherung. Ihre Daten werden niemals ohne Ihre ausdrückliche Zustimmung weitergegeben.",
  },
  {
    id: 14,
    category: "sicherheit",
    question: "Sind die Ärzte wirklich lizenziert?",
    answer:
      "Ja. Alle Ärzte sind vollständig lizenzierte Mediziner, die bei den zuständigen Ärztekammern registriert sind. Jedes Rezept wird von einem qualifizierten Arzt unterzeichnet.",
  },
];

interface FaqData {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const INITIAL_VISIBLE = 5;

export default function FAQ() {
  const { data: faqData = [], isLoading } = useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      const response = await axiosPublic.get("/faq");
      return response?.data?.data;
    },
  });

  // console.log("FAQ data:", faqData);

  const [openId, setOpenId] = useState<number | null>(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visibleFaqs = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE && !showAll;

  return (
    <section id="faq" className="bg-[#FFFFFE] py-10 lg:py-20 px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#e4e8e7] text-deep text-sm font-medium rounded-full mb-5 tracking-wide">
            FAQ
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-sage mb-3 tracking-tight">
            Häufig gestellte Fragen
          </h2>
          <p className="text-base text-[#5a6e6b]">
            Alles, was Sie über unseren Telemedizin-Service wissen müssen
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" stroke="#9aaca9" strokeWidth="2" />
            <path
              d="M21 21l-4.35-4.35"
              stroke="#9aaca9"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Artikel suchen..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowAll(false);
              setOpenId(null);
            }}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#e0e4e3] rounded-xl text-sm text-[#1a2e2b] placeholder-[#9aaca9] outline-none focus:border-deep transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowAll(false);
                  setOpenId(null);
                }}
                className={`px-4 py-3 rounded-lg text-base font-medium border transition-all cursor-pointer ${
                  isActive
                    ? "bg-sage text-white border-deep"
                    : "bg-white text-sage border-[#d8dedd] hover:border-deep hover:text-deep"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="py-5 border-b border-[#e4e8e7]">
                <div className="flex items-center justify-between gap-4">
                  <Skeleton className="h-8 w-3/4 bg-deep/10" />
                  <Skeleton className="h-6 w-6 rounded-full bg-deep/10" />
                </div>
              </div>
            ))
          ) : visibleFaqs.length === 0 ? (
            <p className="text-center py-10 text-[#8aaca9]">
              Keine Ergebnisse gefunden. Versuchen Sie eine andere Suche oder Kategorie.
            </p>
          ) : (
            faqData.map((faq: FaqData) => (
              <div key={faq.id}>
                <button
                  className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer bg-transparent border-none"
                  onClick={() =>
                    setOpenId((prev) => (prev === faq.id ? null : faq.id))
                  }
                >
                  <span
                    className={`text-base lg:text-2xl font-serif text-neutral-900 ${
                      openId === faq.id ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {faq.question}
                  </span>

                  {openId === faq.id ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0"
                    >
                      <circle cx="12" cy="12" r="11" fill="#1E3A2E" />
                      <path
                        d="M8 12h8"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="11"
                        stroke="#c8d2d0"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 8v8M8 12h8"
                        stroke="#9aaca9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>

                {openId === faq.id && (
                  <p className="text-sm lg:text-lg text-[#4a5a58] leading-relaxed pb-5">
                    {faq.answer}
                  </p>
                )}

                <div className="border-t border-[#e4e8e7]" />
              </div>
            ))
          )}
        </div>

        {/* Mehr anzeigen Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 px-7 py-3 bg-sage text-white text-sm font-medium rounded-full hover:bg-[#162e29] transition-colors cursor-pointer border-none"
            >
              Mehr anzeigen
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12l7 7 7-7"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
