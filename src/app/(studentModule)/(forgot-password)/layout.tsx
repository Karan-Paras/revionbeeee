interface ForgotPasswordLayoutProps {
  children: React.ReactNode;
}

export default function ForgotPasswordLayout({
  children,
}: ForgotPasswordLayoutProps) {
  return (
    <section className="mths_bg min-h-screen bg-cover bg-no-repeat p-5 md:h-[calc(100vh-50px)]">
      <div className="container mx-auto h-full">
        <div className="grid h-full content-center">{children}</div>
      </div>
    </section>
  );
}
