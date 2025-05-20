interface ForgotPasswordLayoutProps {
  children: React.ReactNode;
}

export default function ForgotPasswordLayout({
  children,
}: ForgotPasswordLayoutProps) {
  return (
    <section className="mths_bg p-5 md:h-[calc(100vh-50px)] min-h-screen bg-no-repeat bg-cover">
      <div className="container mx-auto h-full">
        <div className="grid h-full content-center">{children}</div>
      </div>
    </section>
  );
}
