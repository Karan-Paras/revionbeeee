"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ProfileDropdown } from "@/components/dropdowns/profile-dropdown";
import { paths } from "@/routes";
import { Session } from "next-auth";
import Image from "next/image";
import { Logo } from "@/lib/assets";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { useLogout } from "@/features/auth/hooks/use-logout";

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

  const logout = useLogout();

  const { data } = useGetProfile();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden text-[#53A2EB] right-5 top-0 bottom-0 absolute"
      >
        <Menu className="stroke-[#505050]" size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed top-0 left-0 lg:w-64 w-10/12 h-full bg-white z-[1000] shadow-lg p-6 "
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-start mb-5">
                <div className="img size-20 relative flex items-start justify-center">
                  <Link className="" href="/">
                    <Image src={Logo} alt="" fill />
                  </Link>
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <ul className="flex flex-col gap-4">
                {NavLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
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
                      {session.user.image ? (
                        <Link
                          href={paths.dashboard()}
                          className="block w-full mt-4 mb-3 lg:mb-0 border-2 rounded-xl text-center border-[#53A2EB] text-[#53A2EB] px-4 py-2 font-semibold hover:bg-[#53A2EB] hover:text-white transition"
                        >
                          Go to Dashboard
                        </Link>
                      ) : (
                        <Link
                          href={paths.createProfile()}
                          className="block w-full mt-4 mb-3 lg:mb-0 border-2 rounded-xl text-center border-[#53A2EB] text-[#53A2EB] px-4 py-2 font-semibold hover:bg-[#53A2EB] hover:text-white transition"
                        >
                          Complete Profile
                        </Link>
                      )}
                      <button
                        onClick={() => logout()}
                        className="w-full border-2 mb-3 lg:mb-0 rounded-xl border-[#53A2EB] text-[#53A2EB] px-4 py-2 font-semibold hover:bg-[#53A2EB] hover:text-white transition"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="block w-full mt-4 border-2 rounded-xl text-center border-[#53A2EB] text-[#53A2EB] px-4 py-2 font-semibold hover:bg-[#53A2EB] hover:text-white transition"
                    >
                      Login Now
                    </Link>
                  )
                ) : (
                  data && <ProfileDropdown user={data.data} />
                )}
              </div>
            </motion.div>

            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 bg-opacity-40 z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
