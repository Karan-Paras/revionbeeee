interface ForgotPasswordLayoutProps {
  children: React.ReactNode;
}

export default function forgotPasswordLayout({
  children,
}: ForgotPasswordLayoutProps) {
  return (
    <section className="mths_bg p-5 h-[calc(100vh-50px)] bg-no-repeat bg-cover">
      <div className="container mx-auto h-full">
        <div className="grid h-full content-center">{children}</div>
      </div>
    </section>
  );
}
