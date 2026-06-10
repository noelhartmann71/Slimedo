// ============================================================
//  SLIMEDO · LANDINGPAGE
//  Vollständige Neuimplementierung nach dem Design-Template
//  slimedo_full_page-13.html · Mai 2026
// ============================================================

import type { CSSProperties } from 'react';
import SlimedoTicker from '../components/SlimedoTicker/SlimedoTicker';
import SlimedoNavbar from '@/components/Navbar/Navbar';
import SlimedoHero from '@/components/slimedo-landing/SlimedoHero';
import PricesSection from '@/components/slimedo-landing/PricesSection';
import WirkungsweiseSection from '@/components/slimedo-landing/WirkungsweiseSection';
import BmiCalculatorSection from '@/components/slimedo-landing/BmiCalculatorSection';
import AnwendungSection from '@/components/slimedo-landing/AnwendungSection';
import WarumWirSection from '@/components/slimedo-landing/WarumWirSection';
import TestimonialsSection from '@/components/slimedo-landing/TestimonialsSection';
import PrivacySection from '@/components/slimedo-landing/PrivacySection';
import LifestyleSection from '@/components/slimedo-landing/LifestyleSection';
import BlogSection from '@/components/slimedo-landing/BlogSection';
import FaqSection from '@/components/slimedo-landing/FaqSection';
import CtaSection from '@/components/slimedo-landing/CtaSection';
import NewTrustSection from "@/components/NewTrustSection/NewTrustSection.tsx";
import TherapieSection from '@/components/slimedo-landing/TherapieSection';
import Footer from "@/components/Footer/Footer";

// ── Übergangs-Brücken ─────────────────────────────────────────
type BridgeVariant =
  | 'sand-to-cream'
  | 'cream-to-sand'
  | 'mint-to-cream'
  | 'cream-to-dark'
  | 'dark-to-surf'
  | 'surf-to-dark'
  | 'dark-to-sand'
  | 'sand-to-dark'
  | 'cream-to-surf'
  | 'surf-to-dark-footer'
  | 'sand-to-linen'
  | 'linen-to-cream'
  | 'sand-to-offwhite'
  | 'offwhite-to-sand';

const bridgeStyles: Record<BridgeVariant, CSSProperties> = {
  'sand-to-cream': {
    height: 48,
    background: 'linear-gradient(to bottom,#F5EEDB,#FAF5EA)',
  },
  'cream-to-sand': {
    height: 48,
    background: 'linear-gradient(to bottom,#FAF5EA,#F5EEDB)',
  },
  'mint-to-cream': {
    height: 48,
    background: 'linear-gradient(to bottom,#CDDDCB,#FAF5EA)',
  },
  'cream-to-dark': {
    height: 88,
    background: 'linear-gradient(to bottom,#FAF5EA 0%,#3D5C4A 55%,#1E3A2E 100%)',
  },
  'dark-to-surf': {
    height: 80,
    background: 'linear-gradient(to bottom,#1E3A2E,#FFFDF7)',
  },
  'surf-to-dark': {
    height: 88,
    background: 'linear-gradient(to bottom,#FFFDF7 0%,#3D5C4A 55%,#1E3A2E 100%)',
  },
  'dark-to-sand': {
    height: 48,
    background: 'linear-gradient(to bottom,#1E3A2E,#F5EEDB)',
  },
  'sand-to-dark': {
    height: 64,
    background: 'linear-gradient(to bottom,#F5EEDB,#1E3A2E)',
  },
  'cream-to-surf': {
    height: 48,
    background: 'linear-gradient(to bottom,#FAF5EA,#FFFDF7)',
  },
  'surf-to-dark-footer': {
    height: 48,
    background: 'linear-gradient(to bottom,#FFFDF7,#0F1F1A)',
  },
  'sand-to-linen': {
    height: 48,
    background: 'linear-gradient(to bottom,#F5EEDB,#FAF6EE)',
  },
  'linen-to-cream': {
    height: 48,
    background: 'linear-gradient(to bottom,#FAF6EE,#FAF5EA)',
  },
  'sand-to-offwhite': {
    height: 48,
    background: 'linear-gradient(to bottom,#F5EEDB,#FAFBF9)',
  },
  'offwhite-to-sand': {
    height: 48,
    background: 'linear-gradient(to bottom,#FAFBF9,#F5EEDB)',
  },
};

const bridgeMobileClass: Record<BridgeVariant, string> = {
  'cream-to-dark': 'bridge-lg',
  'dark-to-surf': 'bridge-lg',
  'surf-to-dark': 'bridge-lg',
  'sand-to-dark': 'bridge-md',
  'sand-to-cream': 'bridge-sm',
  'cream-to-sand': 'bridge-sm',
  'mint-to-cream': 'bridge-sm',
  'dark-to-sand': 'bridge-sm',
  'cream-to-surf': 'bridge-sm',
  'surf-to-dark-footer': 'bridge-sm',
  'sand-to-linen': 'bridge-sm',
  'linen-to-cream': 'bridge-sm',
  'sand-to-offwhite': 'bridge-sm',
  'offwhite-to-sand': 'bridge-sm',
};

function Bridge({ variant }: { variant: BridgeVariant }) {
  return <div aria-hidden="true" className={bridgeMobileClass[variant]} style={bridgeStyles[variant]} />;
}

// ── Landing Page ──────────────────────────────────────────────
export default function LandingPage() {
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
      {/* ── Ticker ─────────────────────────── */}
      <SlimedoTicker />

      {/* ── Navigation ─────────────────────── */}
      <SlimedoNavbar />

      <style>{`
        @media (max-width: 640px) {
          .bridge-sm { height: 20px !important; }
          .bridge-md { height: 28px !important; }
          .bridge-lg { height: 36px !important; }
        }
      `}</style>

      <main>
        {/* ── Hero ───────────────────────────── */}
        <SlimedoHero />

        {/* ── Preise ─────────────────────────── */}
        <Bridge variant="sand-to-offwhite" />
        <PricesSection />

        {/* ── 3 Schritte ─────────────────────── */}
        <NewTrustSection />

        {/* ── Die Therapie ───────────────────── */}
        <TherapieSection />

        {/* ── Wirkungsweise ──────────────────── */}
        <Bridge variant="linen-to-cream" />
        <WirkungsweiseSection />

        {/* ── BMI Rechner ────────────────────── */}
        <Bridge variant="cream-to-sand" />
        <BmiCalculatorSection />

        {/* ── Anwendung ──────────────────────── */}
        <Bridge variant="sand-to-cream" />
        <AnwendungSection />

        {/* ── Warum wir ──────────────────────── */}
        <Bridge variant="cream-to-dark" />
        <WarumWirSection />

        {/* ── Testimonials ───────────────────── */}
        <Bridge variant="dark-to-surf" />
        <TestimonialsSection />

        {/* ── Datenschutz ────────────────────── */}
        <Bridge variant="surf-to-dark" />
        <PrivacySection />

        {/* ── Lifestyle Collage ──────────────── */}
        <Bridge variant="cream-to-sand" />
        <LifestyleSection />

        {/* ── Blog ───────────────────────────── */}
        <Bridge variant="sand-to-cream" />
        <BlogSection />

        {/* ── FAQ ────────────────────────────── */}
        <Bridge variant="cream-to-surf" />
        <FaqSection />

        {/* ── CTA Section ────────────────────── */}
        <CtaSection />
      </main>

      {/* ── Footer (nahtloser Übergang von sec9 dunkel) ─ */}
      <Footer />
    </div>
  );
}
