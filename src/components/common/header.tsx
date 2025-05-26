"use client";

import { ProfileDropdown } from "@/components/dropdowns/profile-dropdown";
import { MobileSidebar } from "@/components/sidebars/mobile-sidebar";
import { NavLink } from "@/components/ui/nav-link";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useGetProfile } from "@/features/user/hooks/use-get-profile";
import { Logo } from "@/lib/assets";
import { paths } from "@/routes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  variant?: "home" | "dashboard";
}

export function Header({ variant = "dashboard" }: HeaderProps) {
  const { data: session, status } = useSession();

  const logout = useLogout();

  const { data, isPending } = useGetProfile();

  const navLinks =
    variant === "dashboard"
      ? [
          { name: "Dashboard", path: paths.dashboard() },
          { name: "Progress", path: paths.progress() },
          { name: "Questions Bank", path: paths.questionsBank() },
          { name: "Quiz", path: paths.quiz() },
        ]
      : [
          { name: "Home", path: "#home" },
          { name: "About", path: "#about" },
          { name: "Topics", path: "#topics" },
          { name: "Pricing", path: "#pricing" },
          { name: "Contact us", path: "#contact" },
        ];

  const renderAuthButtons = () => {
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (variant === "home") {
      if (session) {
        const { user } = session;
        const isProfileComplete = user.name && user.image;

        return (
          <div className="flex gap-5">
            <Link
              href={
                isProfileComplete ? paths.dashboard() : paths.createProfile()
              }
              className="flex border-2 mb-4 rounded-xl border-[#53A2EB] text-[#53A2EB] px-5 py-4 font-semibold cursor-pointer hover:bg-[#53A2EB] hover:text-white duration-500 ease-in-out"
            >
              {isProfileComplete ? "Go to Dashboard" : "Complete Profile"}
            </Link>
            <button
              onClick={() => logout()}
              className="border-2 rounded-xl border-[#53A2EB] text-[#53A2EB] px-8 py-4 font-semibold cursor-pointer hover:bg-[#53A2EB] hover:text-white duration-500 ease-in-out"
            >
              Logout
            </button>
          </div>
        );
      }

      return (
        <Link
          href="/login"
          className="border-2 mb-4 rounded-xl border-[#53A2EB] text-[#53A2EB] px-8 py-4 font-semibold cursor-pointer hover:bg-[#53A2EB] hover:text-white duration-500 ease-in-out"
        >
          Login Now
        </Link>
      );
    }

    if (isPending) {
      return <p>Loading...</p>;
    }

    if (data) {
      return <ProfileDropdown user={data.data} />;
    }
  };

  return (
    <header className="relative z-[999] p-10 hed_bg">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-1">
            <div className="size-32 absolute left-[100px] flex items-center justify-center">
              <Link
                href={variant === "home" ? paths.home() : paths.dashboard()}
              >
                <Image src={Logo} alt="Logo" fill />
              </Link>
            </div>
          </div>

          <div className="col-span-3 relative">
            <div className="hidden lg:flex justify-end items-center w-full gap-5">
              <ul className="flex gap-5">
                {navLinks.map(({ name, path }) => (
                  <li key={name}>
                    <NavLink
                      href={path}
                      activeClassName="text-[#53A2EB]"
                      className="font-medium text-[#505050] hover:text-[#53A2EB] 2xl:text-base md:text-sm"
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="btn">{renderAuthButtons()}</div>
            </div>
          </div>
        </div>

        <MobileSidebar
          NavLinks={navLinks}
          variant={variant}
          session={session}
        />
      </div>
    </header>
  );
}
