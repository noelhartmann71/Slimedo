// ============================================================
//  SLIMEDO · LANDINGPAGE
//  Vollständige Neuimplementierung nach dem Design-Template
//  slimedo_full_page-13.html · Mai 2026
// ============================================================

import type { CSSProperties } from 'react';
import SlimedoTicker from '@/components/slimedo-landing/SlimedoTicker';
import SlimedoNavbar from '@/components/slimedo-landing/SlimedoNavbar';
import SlimedoHero from '@/components/slimedo-landing/SlimedoHero';
import TrustStrip from '@/components/slimedo-landing/TrustStrip';
import GlpIntroSection from '@/components/slimedo-landing/GlpIntroSection';
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
import SlimedoFooter from '@/components/slimedo-landing/SlimedoFooter';
import NewTrustSection from "@/components/NewTrustSection/NewTrustSection.tsx";

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
  | 'surf-to-dark-footer';

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
};

function Bridge({ variant }: { variant: BridgeVariant }) {
  return <div aria-hidden="true" style={bridgeStyles[variant]} />;
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

      <main>
        {/* ── Hero ───────────────────────────── */}
        <SlimedoHero />

        {/* ── Trust Strip (Sand → Mint Verlauf) ─ */}
        <TrustStrip />

        {/* ── GLP-1 Intro ────────────────────── */}
        <Bridge variant="mint-to-cream" />
        <GlpIntroSection />

        {/* ── 3 Schritte ─────────────────────── */}
        <Bridge variant="cream-to-sand" />
        <NewTrustSection />

        {/* ── Wirkungsweise ──────────────────── */}
        <Bridge variant="sand-to-cream" />
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
      <SlimedoFooter />
    </div>
  );
}
