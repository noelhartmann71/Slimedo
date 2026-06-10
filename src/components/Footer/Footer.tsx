import { Link } from 'react-router-dom';
import type { MouseEvent, ReactNode } from 'react';
import toast from 'react-hot-toast';
import {
  isUsercentricsConfigured,
  openUsercentricsSecondLayerWhenReady,
} from '@/lib/usercentrics';

type FooterLink = {
  label: string;
  path?: string;
  href?: string;
  action?: 'cookie-settings';
};

const abnehmProgrammeLinks: FooterLink[] = [
  { label: "So funktioniert's", path: '/#how-it-works-section' },
  { label: 'Eignung prüfen', path: '/product/select' },
  { label: 'Unsere Ärzte', path: '/team' },
];

const rechtlichesLinks: FooterLink[] = [
  { label: 'Datenschutz', path: '/privacy' },
  { label: 'AGB', path: '/terms' },
  { label: 'Impressum', path: '/terms' },
  { label: 'Cookie-Einstellungen', path: '/', action: 'cookie-settings' },
];

const kontaktLinks: FooterLink[] = [
  { label: 'Häufige Fragen (FAQ)', path: '/#faq' },
  { label: 'Kontaktformular', href: 'mailto:support@slimedo.de' },
];

const chipClass =
  'inline-block rounded-[5px] bg-[rgba(255,255,255,.9)] px-2 py-[3px] text-[11px] font-bold text-[#333]';

const footerLinkClass =
  'font-inter text-[14px] text-[rgba(205,221,203,.55)] no-underline transition-colors duration-200 hover:text-cream';

export default function SlimedoFooter() {
  return (
      <footer className="bg-[linear-gradient(to_bottom,#1E3A2E_0%,#131E17_18%,#0F1F1A_40%)] px-[clamp(16px,2.5vw,32px)] pt-[clamp(40px,3.5vw,64px)] pb-0">
        <div className="mx-auto max-w-[1160px]">
          {/* Top grid */}
          <div className="footer-top-resp grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 border-b border-[rgba(205,221,203,.1)] pb-14">
            {/* Brand column */}
            <div>
            <span className="mb-3.5 inline-flex items-center gap-2">
              <span
                  aria-hidden="true"
                  className="inline-flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_14px_rgba(8,15,12,.22)]"
              >
                <img
                    src="/images/logo/cta-banner.png"
                    alt="Slimedo Logo"
                    className="h-[38px] w-[38px] shrink-0 object-contain"
                />
              </span>
              <span className="font-serif text-[19px] font-bold leading-none tracking-[0] text-cream">
                Slimedo
              </span>
            </span>
              <p className="mb-[22px] max-w-[240px] font-inter text-[13.5px] leading-[1.6] text-[rgba(205,221,203,.5)]">
                Ihr vertrauenswürdiger Telemedizin-Partner für professionelle medizinische Beratung
                und Rezeptdienste.
              </p>
              {/* Social icons */}
              <div className="flex gap-2.5">
                {/* Facebook */}
                <SocialIcon label="Facebook">
                  <path
                      d="M6.1 14V8.8H4.4V6.7H6.1V5.2C6.1 3.4 7.2 2.4 8.8 2.4C9.6 2.4 10.3 2.5 10.5 2.5V4.4H9.4C8.5 4.4 8.3 4.8 8.3 5.5V6.7H10.4L10.1 8.8H8.3V14H6.1Z"
                      fill="#CDDDCB"
                  />
                </SocialIcon>
                {/* Twitter / X */}
                <SocialIcon label="Twitter / X">
                  <path d="M3 3L12.1 13H13.8L4.7 3H3Z" stroke="#CDDDCB" strokeWidth="1.2" />
                  <path d="M3.1 13L6.6 9.3M9.4 6.4L12.8 3" stroke="#CDDDCB" strokeWidth="1.2" strokeLinecap="round" />
                </SocialIcon>
                {/* Instagram */}
                <SocialIcon label="Instagram">
                  <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="#CDDDCB" strokeWidth="1.3" />
                  <circle cx="8" cy="8" r="2.8" stroke="#CDDDCB" strokeWidth="1.3" />
                  <circle cx="11.2" cy="4.8" r="0.8" fill="#CDDDCB" />
                </SocialIcon>
                {/* TikTok */}
                <SocialIcon label="TikTok">
                  <path
                      d="M10.5 2C10.7 3.5 11.6 4.4 13 4.5V6.5C12 6.5 11.1 6.2 10.5 5.7V10.5C10.5 12.7 8.7 14 6.8 14C4.9 14 3 12.7 3 10.5C3 8.3 4.9 7 6.8 7C7 7 7.2 7 7.4 7V9.1C7.2 9 7 9 6.8 9C6 9 5.2 9.7 5.2 10.5C5.2 11.3 6 12 6.8 12C7.6 12 8.3 11.3 8.3 10.5V2H10.5Z"
                      stroke="#CDDDCB"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </SocialIcon>
              </div>
            </div>

            {/* Link columns */}
            <FooterCol title="Abnehm-Programme" links={abnehmProgrammeLinks} />
            <FooterCol title="Rechtliches" links={rechtlichesLinks} />
            <ContactCol />
          </div>

          {/* Bottom bar */}
          <div className="footer-btm-resp flex items-start justify-between gap-6 pt-[22px] pb-7">
            {/* Shipping */}
            <div className="max-w-[360px]">
              <p className="mb-[9px] font-inter text-[12px] text-[rgba(205,221,203,.35)]">
                Versand &amp; Abholung
              </p>
              <span className={chipClass}>GO! Express</span>
              <p className="mt-2.5 font-inter text-[12px] leading-[1.55] text-[rgba(205,221,203,.45)]">
                Versand erfolgt ausschließlich durch zugelassene Apotheken. slimedo versendet
                keine Arzneimittel.
              </p>
            </div>

            {/* Payment badges and copyright */}
            <div className="footer-pay-resp text-right">
              <p className="mb-[9px] font-inter text-[12px] text-[rgba(205,221,203,.35)]">
                Sichere Zahlungsmethoden
              </p>
              <div>
                {['Visa', 'Mastercard', 'Stripe', 'PayPal', 'Apple Pay', 'Klarna'].map((name) => (
                    <span key={name} className={`${chipClass} mr-1.5 mb-1.5`}>
                      {name}
                    </span>
                ))}
              </div>
              <p className="mt-[18px] font-inter text-[12px] leading-[1.5] text-[rgba(205,221,203,.3)]">
                © 2026 slimedo. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
        </div>
        <style>{`
        @media (max-width: 1024px) {
          .footer-top-resp { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 640px) {
          .footer-top-resp { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .footer-btm-resp { flex-direction: column !important; align-items: flex-start !important; }
          .footer-pay-resp { text-align: left !important; }
        }
        @media (max-width: 480px) {
          .footer-top-resp { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
      </footer>
  );
}

function SocialIcon({
                      label,
                      children,
                    }: {
  label: string;
  children: ReactNode;
}) {
  return (
      <div
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] border border-[rgba(205,221,203,.12)] bg-[rgba(205,221,203,.08)] transition-colors duration-200 hover:bg-[rgba(205,221,203,.16)]"
          aria-label={label}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {children}
        </svg>
      </div>
  );
}

function FooterCol({
                     title,
                     links,
                   }: {
  title: string;
  links: FooterLink[];
}) {
  return (
      <div>
        <FooterHeading>{title}</FooterHeading>
        <FooterLinks links={links} />
      </div>
  );
}

function ContactCol() {
  return (
      <div>
        <FooterHeading>Kontakt</FooterHeading>
        <FooterLinks links={kontaktLinks} />
        <div className="mt-[13px]">
          <a
              href="mailto:support@slimedo.de"
              className="font-inter text-[13.5px] text-cream no-underline transition-colors duration-200 hover:text-mint"
          >
            support@slimedo.de
          </a>
          <p className="mt-1 font-inter text-[12px] leading-[1.55] text-[rgba(205,221,203,.55)]">
            Antwort in 24-48 Stunden
          </p>
        </div>
        <p className="mt-[15px] font-inter text-[12px] leading-[1.55] text-[rgba(205,221,203,.45)]">
          slimedo ist nicht für medizinische Notfälle gedacht. Im Notfall wähle die 112.
        </p>
      </div>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
      <h4 className="mb-[18px] font-[Manrope,sans-serif] text-[13px] font-semibold uppercase tracking-[.08em] text-cream">
        {children}
      </h4>
  );
}

function FooterLinks({ links }: { links: FooterLink[] }) {
  return (
      <ul className="flex list-none flex-col gap-[11px]">
        {links.map((link) => (
            <li key={link.label}>
              {link.href ? (
                  <a href={link.href} className={footerLinkClass}>
                    {link.label}
                  </a>
              ) : (
                  <Link
                      to={link.path ?? '/'}
                      onClick={link.action === 'cookie-settings' ? openCookieSettings : undefined}
                      className={footerLinkClass}
                  >
                    {link.label}
                  </Link>
              )}
            </li>
        ))}
      </ul>
  );
}

async function openCookieSettings(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();

  if (await openUsercentricsSecondLayerWhenReady()) {
    return;
  }

  const message = isUsercentricsConfigured()
      ? 'Cookie-Einstellungen konnten noch nicht geladen werden. Bitte versuche es erneut.'
      : 'Cookie-Einstellungen sind noch nicht konfiguriert. Es fehlt die Usercentrics Settings ID.';

  console.warn(message);
  toast.error(message);
}
