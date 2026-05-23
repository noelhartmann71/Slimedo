import Navbar from "../components/Navbar/Navbar";
import Ticker from "../components/Ticker/Ticker";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import ExpertTeam from "../components/ExpertTeam/ExpertTeam";
import WeightCalculator from "../components/WeightCalculator/WeightCalculator";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import CTABanner from "../components/CTABanner/CTABanner";
import Footer from "../components/Footer/Footer";
import Slimedo from "@/components/Slimedo/Slimedo";
import LatestHealth from "@/components/LatestHealth/LatestHealth";
import BloomwellRichtig from "@/components/BloomwellRichtig/BloomwellRichtig";
import NewTrustSection from "@/components/NewTrustSection/NewTrustSection";
import NewBanner from "@/components/NewBanner/NewBanner";
import YourPrivacy from "@/components/YourPrivacy/YourPrivacy";
import NewHowItWork from "@/components/NewHowItWork/NewHowItWork";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <NewBanner />
        <Ticker />
        <NewTrustSection />
        <BloomwellRichtig />
        <Slimedo />
        <ExpertTeam />
        <WeightCalculator />
        <NewHowItWork />
        <Testimonials />
        <YourPrivacy />
        <FeaturesSection />
        <LatestHealth />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
