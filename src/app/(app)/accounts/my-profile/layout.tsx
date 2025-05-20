interface MyProfileLayoutProps {
  children: React.ReactNode;
}

export default function MyProfileLayout({ children }: MyProfileLayoutProps) {
  return (
    <div className="bg-white px-7 py-8 rounded-xl">
      <h3 className="font-bold border-b text-2xl pb-3 border-[#D9D9D9]">
        Profile
      </h3>

      {children}
    </div>
  );
}
