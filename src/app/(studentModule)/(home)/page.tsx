import { HeroSection } from "@/app/(studentModule)/(home)/hero-section";
import { InteractiveQuiz } from "@/app/(studentModule)/(home)/interactive-quiz";
import { Pricing } from "@/app/(studentModule)/(home)/pricing";
import { SelectSubjects } from "@/app/(studentModule)/(home)/select-subjects";
import { Support } from "@/app/(studentModule)/(home)/support";
import { Testimonials } from "@/app/(studentModule)/(home)/testimonials";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";

export default function LandingPage() {
  return (
    <>
      <Header variant="home" />
      <HeroSection />
      <InteractiveQuiz />
      <SelectSubjects />
      <Pricing />
      <Support />
      <Testimonials />
      <Footer variant="extended" />
    </>
  );
}
