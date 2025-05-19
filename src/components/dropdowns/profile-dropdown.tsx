"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import { getUserImageUrl } from "@/lib/media-urls";

interface ProfileDropdownProps {
  user: User;
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 focus:outline-none"
      >
        {user.image && (
          <div className="size-14 rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src={getUserImageUrl(user.image)}
              alt="User Profile Picture"
              className="object-cover"
              width={56}
              height={56}
            />
          </div>
        )}
        <span className="hidden md:inline text-[#505050]">{user.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className="size-8 fill-[#FBBE1B]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border-b border-[#858080] pt-2  z-50"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm border-b border-[#c9c9c9] pb-2 my-2 text-gray-700 "
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm border-b border-[#c9c9c9] pb-2 my-2 text-gray-700 "
            >
              Settings
            </a>
            <button
              onClick={() => signOut()}
              className="block px-4 py-2 text-sm pb-2 mb-2 text-gray-700 cursor-pointer"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
