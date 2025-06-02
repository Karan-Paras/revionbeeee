import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function SupportLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header variant="home" />
      {children}
      <Footer variant="compact" />
    </>
  );
}
