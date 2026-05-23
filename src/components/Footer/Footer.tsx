const company = [
  { label: "Über uns", path: "/about" },
  { label: "Unser Team", path: "/team" },
  { label: "Karriere", path: "/careers" },
  { label: "Presse & Medien", path: "/press" },
];
const departments = [
  { label: "Kardiologie", path: "/departments/cardiology" },
  { label: "Neurologie", path: "/departments/neurology" },
  { label: "Orthopädie", path: "/departments/orthopedics" },
  { label: "Pädiatrie", path: "/departments/pediatrics" },
];
import { Link } from "react-router";
import CtaBanner from "../../../public/images/logo/cta-banner.png";
import {
  FacebookSvg,
  FooterLogoIconSvg,
  InstagramSvg,
  KlarnaSvg,
  MasterCardSvg,
  PaypalSvg,
  PaySvg,
  StripeSvg,
  TiktokSvg,
  TwitterSvg,
  VisaIconSvg,
} from "../svg-container/SvgContainer";
const patientServices = [
  { label: "Gesundheitspakete", path: "/services/packages" },
  { label: "Termine", path: "/appointments" },
  { label: "Rezepte", path: "/prescriptions" },
  { label: "Medizinische Berichte", path: "/reports" },
];
const quickLinks = [
  { label: "Datenschutzrichtlinie", path: "/privacy" },
  { label: "Allgemeine Geschäftsbedingungen", path: "/terms" },
  { label: "Medizinische Ethik", path: "/ethics" },
  { label: "Cookie-Richtlinie", path: "/cookies" },
  { label: "Apotheken-Dashboard", path: "/pharmacy-dashboard/login" },
];

// Social icon paths
const socials = [
  {
    label: "Facebook",
    path: <FacebookSvg />,
    url: "https://www.facebook.com",
  },
  {
    label: "Twitter",
    path: <TwitterSvg />,
    url: "https://www.twitter.com",
  },
  {
    label: "Instagram",
    path: <InstagramSvg />,
    url: "https://www.instagram.com",
  },
  {
    label: "LinkedIn",
    path: <TiktokSvg />,
    url: "https://www.linkedin.com",
  },
];

// Payment logos as styled text badges
const payments = [
  { name: <VisaIconSvg /> },
  { name: <MasterCardSvg /> },
  { name: <StripeSvg /> },
  { name: <PaypalSvg /> },
  { name: <PaySvg /> },
  { name: <KlarnaSvg /> },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1C19]">
      <div className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-30 py-10 lg:py-20">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-32 2xl:gap-95 mb-5 lg:mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:w-62.5 shrink-0">
            <div className="flex items-center gap-2.5">
              <Link to={"/"}>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <img
                    src={CtaBanner}
                    alt="Slimedo Logo"
                    className="w-21.5 h-14 object-contain -mb-1"
                  />
                </div>
              </Link>
              <Link to={"/"}>
                <FooterLogoIconSvg />
              </Link>
            </div>
            <p className="text-[#96A9A5] text-sm leading-relaxed">
              Ihr vertrauenswürdiger Telemedizin-Partner für professionelle medizinische
              Beratung und Rezeptdienste.
            </p>
            {/* Social icons */}
            <div className="flex gap-2 mt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-[#FFFFFF1A]"
                >
                  {s.path}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { title: "Unternehmen", links: company },
              { title: "Fachabteilungen", links: departments },
              { title: "Patientenservices", links: patientServices },
              { title: "Schnellzugriff", links: quickLinks },
            ].map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h4 className="text-[#F9FAFB] text-base lg:text-xl font-normal">
                  {col.title}
                </h4>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="text-[#96A9A5] hover:text-white/70 text-sm transition-colors leading-relaxed"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.07] pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Payment section */}
          <div>
            <p className="text-white/35 text-xs mb-2.5 font-medium">
              Sichere Zahlungsmethoden
            </p>
            <div className="flex gap-2 flex-wrap">
              {payments.map((p, index) => (
                <div
                  key={index}
                  className="rounded  py-1 min-w-11.5 flex items-center justify-center"
                >
                  <span className="font-bold text-[10px]">{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-right">
            <p className="text-white/30 text-xs">
              © Slimedo Telemedicine Platform Ltd. 2026
            </p>
            <p className="text-white/20 text-xs mt-0.5">
              Mit Sorgfalt entworfen • Alle Rechte vorbehalten
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
