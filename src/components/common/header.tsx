"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { ProfileDropdown } from "@/components/dropdowns/profile-dropdown";
import { MobileSidebar } from "@/components/sidebars/mobile-sidebar";
import { NavLink } from "@/components/ui/nav-link";

import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { isUserProfileComplete } from "@/features/user/utils";

import { Logo } from "@/assets/images";

import { useLogoutModal } from "@/features/auth/stores/use-logout-modal";
import { getPostLoginPath } from "@/features/auth/utils";
import { paths } from "@/routes";

interface HeaderProps {
  variant?: "home" | "dashboard";
}

export function Header({ variant = "dashboard" }: HeaderProps) {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetProfile(variant === "dashboard");

  const { onOpen } = useLogoutModal();

  const navLinks =
    variant === "dashboard"
      ? [
          { name: "Dashboard", path: paths.dashboard() },
          { name: "Lessons", path: paths.lessons() },
          { name: "My Lessons", path: paths.myLessons() },
          { name: "Progress", path: paths.progress() },
          { name: "Subjects", path: paths.subjects() },
          { name: "Quiz", path: paths.quiz() },
        ]
      : [
          { name: "Home", path: paths.home.hero() },
          { name: "About", path: paths.home.aboutUs() },
          { name: "Topics", path: paths.home.topics() },
          { name: "Pricing", path: paths.home.pricing() },
          { name: "Contact us", path: paths.home.support() },
        ];

  const renderAuthButtons = () => {
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (variant === "home") {
      if (session) {
        const { user } = session;
        const isProfileComplete = isUserProfileComplete(user);
        const isTeacher = user.userType === "teacher";
        const isTeacherProfileComplete =
          isTeacher && Number(user.teacherProfileStatus) >= 7;
        const dashboardPath = getPostLoginPath(
          user.userType,
          user.teacherProfileStatus
        );

        return (
          <div className="flex gap-5">
            <Link
              href={
                isTeacher
                  ? dashboardPath
                  : isProfileComplete
                    ? paths.dashboard()
                    : paths.createProfile()
              }
              className="flex cursor-pointer rounded-xl border-2 border-[#53A2EB] px-5 py-4 font-semibold text-[#53A2EB] duration-500 ease-in-out hover:bg-[#53A2EB] hover:text-white"
            >
              {isTeacher
                ? isTeacherProfileComplete
                  ? "Go to Dashboard"
                  : "Continue Profile"
                : isProfileComplete
                  ? "Go to Dashboard"
                  : "Complete Profile"}
            </Link>
            <button
              onClick={onOpen}
              className="cursor-pointer rounded-xl border-2 border-[#53A2EB] px-8 py-4 font-semibold text-[#53A2EB] duration-500 ease-in-out hover:bg-[#53A2EB] hover:text-white"
            >
              Logout
            </button>
          </div>
        );
      }

      return (
        <Link
          href={paths.login()}
          className="mb-4 cursor-pointer rounded-xl border-2 border-[#53A2EB] px-8 py-4 font-semibold text-[#53A2EB] duration-500 ease-in-out hover:bg-[#53A2EB] hover:text-white"
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
    <header className="hed_bg relative z-[999] p-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-1">
            <div className="absolute left-[100px] flex size-32 items-center justify-center">
              <Link
                href={variant === "home" ? paths.home() : paths.dashboard()}
              >
                <Image src={Logo} alt="Logo" fill />
              </Link>
            </div>
          </div>

          <div className="relative col-span-3">
            <div className="hidden w-full items-center justify-end gap-5 lg:flex">
              <ul className="flex gap-5">
                {navLinks.map(({ name, path }) => (
                  <li key={name}>
                    <NavLink
                      href={path}
                      activeClassName="text-[#53A2EB]"
                      className="font-medium text-[#505050] hover:text-[#53A2EB] md:text-sm 2xl:text-base"
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
