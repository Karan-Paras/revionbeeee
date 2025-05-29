"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getUserImageUrl } from "@/lib/media-urls";
import Link from "next/link";
import { ChevronDown } from "@/lib/icons";
import { paths } from "@/routes";
import { User } from "@/types/user";
import { useLogout } from "@/features/auth/queries/use-logout";

interface ProfileDropdownProps {
  user: User;
}

const LINKS = [
  {
    name: "Profile",
    href: paths.accounts.myProfile(),
  },
  {
    name: "Subscription",
    href: paths.accounts.subscription(),
  },
  {
    name: "Settings",
    href: paths.accounts.settings(),
  },
];

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const logout = useLogout();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { firstName, lastName, profilePicture } = user;
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer focus:outline-none md:w-auto w-full md:justify-start justify-between"
      >
        {profilePicture ? (
          <div className="size-14 rounded-full overflow-hidden border-2 border-gray-200 relative">
            <Image
              src={getUserImageUrl(profilePicture)}
              alt="User Profile Picture"
              className="object-cover"
              fill
            />
          </div>
        ) : (
          <div className="size-14 border-2 border-white rounded-full mx-auto overflow-hidden bg-blue-500">
            <div className="flex items-center justify-center rounded-full bg-muted text-white font-bold w-full h-full">
              {user.firstName?.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        <span className="md:inline text-[#505050]">
          {firstName}&nbsp;{lastName}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-8 fill-[#FBBE1B]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl md:shadow-2xl shadow-2xl/5 md:border-b border-b-0 border-[#858080] pt-2  z-50 "
          >
            {LINKS.map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-2 text-sm border-b border-[#c9c9c9] pb-2 my-2 text-gray-700"
                onClick={closeDropdown}
              >
                {name}
              </Link>
            ))}
            <button
              onClick={() => logout()}
              className="block w-full text-left px-4 py-2 text-sm pb-2 mb-2 text-gray-700 cursor-pointer"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
