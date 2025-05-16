import { Header } from "@/components/common/header";
import { LandingFooter } from "@/components/footer/landing-footer";

import { HeroSection } from "@/app/(home)/hero-section";
import { InteractiveQuiz } from "@/app/(home)/interactive-quiz";
import { SelectTopics } from "@/app/(home)/select-topics";
import { Pricing } from "@/app/(home)/pricing";
import { ContactUs } from "@/app/(home)/contact-us";
import { Testimonials } from "@/app/(home)/testimonials";

export default function LandingPage() {
  return (
    <>
      <Header variant="home" />
      <HeroSection />
      <InteractiveQuiz />
      <SelectTopics />
      <Pricing />
      <ContactUs />
      <Testimonials />
      <LandingFooter />
    </>
  );
}
