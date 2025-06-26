import { HeroSection } from "@/app/(home)/hero-section";
import { InteractiveQuiz } from "@/app/(home)/interactive-quiz";
import { Pricing } from "@/app/(home)/pricing";
import { SelectTopics } from "@/app/(home)/select-topics";
import { Support } from "@/app/(home)/support";
import { Testimonials } from "@/app/(home)/testimonials";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";

export default function LandingPage() {
  return (
    <>
      <Header variant="home" />
      <HeroSection />
      <InteractiveQuiz />
      <SelectTopics />
      <Pricing />
      <Support />
      <Testimonials />
      <Footer variant="extended" />
    </>
  );
}
