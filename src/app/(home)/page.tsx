import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";

import { HeroSection } from "@/app/(home)/hero-section";
import { InteractiveQuiz } from "@/app/(home)/interactive-quiz";
import { SelectTopics } from "@/app/(home)/select-topics";
import { Pricing } from "@/app/(home)/pricing";
import { Support } from "@/app/(home)/support";
import { Testimonials } from "@/app/(home)/testimonials";

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
