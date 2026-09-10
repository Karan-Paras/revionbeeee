"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { NotificationBell } from "@/components/common/notification-bell";
import { ProfileDropdown } from "@/components/dropdowns/profile-dropdown";

import { useGetProfile } from "@/features/user/queries/use-get-profile";

import { Logo } from "@/assets/images";
import { Menu, X } from "lucide-react";

import { useLogoutModal } from "@/features/auth/stores/use-logout-modal";
import { getPostLoginPath } from "@/features/auth/utils";
import { paths } from "@/routes";

interface MobileSidebarProps {
  NavLinks: Array<{
    name: string;
    path: string;
  }>;
  variant?: "home" | "dashboard";
  session: Session | null;
}

export function MobileSidebar({
  NavLinks,
  variant,
  session,
}: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetProfile(variant !== "home");

  const { onOpen } = useLogoutModal();

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <style jsx global>{`
          body {
            overflow: hidden;
            height: 100vh;
          }
        `}</style>
      )}

      <button
        onClick={openSidebar}
        className="absolute top-0 right-5 bottom-0 text-[#53A2EB] lg:hidden"
      >
        <Menu className="stroke-[#505050]" size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed top-0 left-0 z-[99999] h-full w-10/12 bg-white p-6 shadow-lg lg:w-64"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="mb-5 flex items-start justify-between">
                <div className="img relative flex size-20 items-start justify-center">
                  <Link href={paths.home()}>
                    <Image src={Logo} alt="logo" fill />
                  </Link>
                </div>
                <button onClick={closeSidebar}>
                  <X size={24} />
                </button>
              </div>
              <ul className="flex flex-col gap-4">
                {NavLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      onClick={closeSidebar}
                      className="block text-[#505050] hover:text-[#53A2EB]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {variant === "home" ? (
                  session ? (
                    <>
                      {session.user.userType === "teacher" ||
                      session.user.image ? (
                        <Link
                          href={getPostLoginPath(
                            session.user.userType,
                            session.user.teacherProfileStatus
                          )}
                          className="mt-4 mb-3 block w-full rounded-xl border-2 border-[#53A2EB] px-4 py-2 text-center font-semibold text-[#53A2EB] transition hover:bg-[#53A2EB] hover:text-white lg:mb-0"
                        >
                          {session.user.userType === "teacher" &&
                          Number(session.user.teacherProfileStatus) < 7
                            ? "Continue Profile"
                            : "Go to Dashboard"}
                        </Link>
                      ) : (
                        <Link
                          href={paths.createProfile()}
                          className="mt-4 mb-3 block w-full rounded-xl border-2 border-[#53A2EB] px-4 py-2 text-center font-semibold text-[#53A2EB] transition hover:bg-[#53A2EB] hover:text-white lg:mb-0"
                        >
                          Complete Profile
                        </Link>
                      )}
                      <button
                        onClick={onOpen}
                        className="mb-3 w-full rounded-xl border-2 border-[#53A2EB] px-4 py-2 font-semibold text-[#53A2EB] transition hover:bg-[#53A2EB] hover:text-white lg:mb-0"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href={paths.login()}
                      className="mt-4 block w-full rounded-xl border-2 border-[#53A2EB] px-4 py-2 text-center font-semibold text-[#53A2EB] transition hover:bg-[#53A2EB] hover:text-white"
                    >
                      Login Now
                    </Link>
                  )
                ) : (
                  data && (
                    <div className="flex items-center gap-3">
                      <NotificationBell />
                      <ProfileDropdown
                        user={data.data}
                        onClick={closeSidebar}
                      />
                    </div>
                  )
                )}
              </div>
            </motion.div>

            <motion.div
              className="bg-opacity-40 fixed inset-0 z-[999] bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
