import SlimedoTicker from '@/components/slimedo-landing/SlimedoTicker';
import SlimedoNavbar from '@/components/Navbar/Navbar';
import SlimedoFooter from '@/components/slimedo-landing/SlimedoFooter';
import CtaSection from "@/components/slimedo-landing/CtaSection.tsx";

type ExpertMember = {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  focusAreas: string[];
};

const expertMembers: ExpertMember[] = [
  {
    id: 1,
    name: 'Dr. Abdur Rahim',
    title: 'Leitender Berater',
    bio: 'Dr. Abdur Rahim ist ein Arzt mit langjaehriger Erfahrung in der Patientenversorgung. Er stellt sicher, dass medizinisches Fachwissen und hoechste Standards die Grundlage unserer Programme zur Gewichtsreduktion bilden.',
    image: '/images/home/doctor-image.png',
    focusAreas: [
      'Telemedizinische Adipositas-Therapie',
      'Medizinische Begutachtung und Verschreibung',
      'Langfristige Therapiebegleitung',
    ],
  },
  {
    id: 2,
    name: 'Dr. Angel Sadia Bechstein',
    title: 'Leitende Beraterin',
    bio: 'Dr. Angel Sadia Bechstein ist Aerztin mit langjaehriger Erfahrung in der Patientenversorgung. Sie stellt sicher, dass medizinisches Fachwissen und hoechste Standards die Grundlage unserer Programme zur Gewichtsreduktion bilden.',
    image: '/images/home/doctor-image.png',
    focusAreas: [
      'Patientenzentrierte Therapieplanung',
      'Evidenzbasierte Behandlungsansaetze',
      'Qualitaetssicherung in der Versorgung',
    ],
  },
];

export default function TeamPage() {
  return (
    <div
      style={{
        background: '#FAF5EA',
        fontFamily: '"Inter", system-ui, sans-serif',
        color: '#1A1A1A',
        WebkitFontSmoothing: 'antialiased',
        overflowX: 'clip',
      }}
    >
      <SlimedoTicker />
      <SlimedoNavbar />

      <main>
        <section
          className="border-b border-[#d8d1c1]"
          style={{
            background:
              'linear-gradient(180deg, rgba(30,58,46,0.08) 0%, rgba(250,245,234,0.95) 72%, #FAF5EA 100%)',
          }}
        >
          <div className="mx-auto max-w-[1160px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <span className="inline-flex rounded-full border border-[#c5bda9] bg-[#f7f1e4] px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] text-[#3D5C4A] uppercase">
              Medizinisches Fachpersonal
            </span>
            <h1 className="mt-4 max-w-[900px] font-[var(--font-serif)] text-[40px] leading-[1.1] font-semibold tracking-[-0.02em] text-[#1E3A2E] md:text-[52px]">
              Lernen Sie unser Expertenteam kennen
            </h1>
            <p className="mt-4 max-w-[760px] text-[17px] leading-relaxed text-[#4B6457] md:text-[19px]">
              Zugelassene Aerzte, die sich einer umfassenden, verantwortungsvollen
              Versorgung verschrieben haben. Jeder Fall wird individuell medizinisch
              geprueft und begleitet.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="space-y-7">
            {expertMembers.map((member) => (
              <article
                key={member.id}
                className="grid items-stretch gap-5 lg:grid-cols-[1.06fr_0.94fr]"
              >
                <div className="rounded-[24px] border border-[#d8d1c1] bg-[#fffdf7] p-6 shadow-[0_14px_30px_rgba(30,58,46,0.08)] md:p-8">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#7C8E83]">
                    Expertin / Experte
                  </p>
                  <h2 className="mt-2 text-[34px] leading-[1.05] font-semibold tracking-[-0.02em] text-[#1E3A2E]">
                    {member.name}
                  </h2>
                  <p className="mt-1 text-[15px] font-medium text-[#3D5C4A]">
                    {member.title}
                  </p>
                  <p className="mt-4 text-[16px] leading-relaxed text-[#4B6457]">
                    {member.bio}
                  </p>

                  <div className="mt-6 rounded-[16px] border border-[#e2dac8] bg-[#f9f4e8] p-4">
                    <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6f8478]">
                      Schwerpunkte
                    </p>
                    <ul className="space-y-2">
                      {member.focusAreas.map((area) => (
                        <li
                          key={area}
                          className="flex items-start gap-2 text-[15px] text-[#365446]"
                        >
                          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#3D5C4A]" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-[#d8d1c1] bg-[#efe8d9] shadow-[0_14px_30px_rgba(30,58,46,0.1)]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full min-h-[360px] w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <CtaSection sectionBackground="#FAF5EA" />
      <SlimedoFooter />
    </div>
  );
}
