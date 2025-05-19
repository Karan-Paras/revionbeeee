import { Header } from "@/components/common/header";
import { Footer } from "@/components/footer/footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header variant="dashboard" />
      {children}
      <Footer variant="compact" />
    </>
  );
}
