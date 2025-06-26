"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { User } from "@/features/user/types";
import { useLogout } from "@/features/auth/hooks/use-logout";

import { getUserImageUrl } from "@/lib/media-urls";

import { ChevronDown, Crown } from "@/lib/icons";

import { paths } from "@/routes";
import { Button } from "@/components/ui/button";
import { CrownIcon } from "lucide-react";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useSubscriptionModal } from "@/features/subscriptions/stores/use-subscription-modal";

interface ProfileDropdownProps {
  user: User;
}

const LINKS = [
  {
    name: "Profile",
    href: paths.accounts.myProfile(),
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

  const { onOpen } = useSubscriptionModal();

  const { shouldBlock, isLoading } = usePaywall();

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
        className="flex w-full cursor-pointer items-center justify-between gap-2 focus:outline-none md:w-auto md:justify-start"
      >
        <div className="relative">
          {!shouldBlock && (
            <span className="absolute -top-2.5 -right-3.5 z-50 flex size-8 items-center justify-center rounded-full border-2 border-white bg-black p-2">
              <Crown />
            </span>
          )}
          {profilePicture ? (
            <div className="relative size-14 overflow-hidden rounded-full border-2 border-gray-200">
              <Image
                src={getUserImageUrl(profilePicture)}
                alt="User Profile Picture"
                className="object-cover"
                fill
              />
            </div>
          ) : (
            <div className="mx-auto size-14 overflow-hidden rounded-full border-2 border-white bg-blue-500">
              <div className="bg-muted flex h-full w-full items-center justify-center rounded-full font-bold text-white">
                {user.firstName?.charAt(0).toUpperCase() || "R"}
              </div>
            </div>
          )}
        </div>
        <span className="text-[#505050] md:inline">
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
            className="absolute right-0 z-50 mt-2 w-48 rounded-xl border-b-0 border-[#858080] bg-white pt-2 shadow-2xl/5 md:border-b md:shadow-2xl"
          >
            {shouldBlock && !isLoading && (
              <Button
                className="flex items-center gap-1 rounded-none border-0 border-b px-2 py-3 text-sm"
                variant="secondary"
                onClick={onOpen}
              >
                <CrownIcon color="#FBBE1B" />
                Upgrade Your Plan
              </Button>
            )}
            {LINKS.map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className="my-2 block border-b border-[#c9c9c9] px-4 py-2 pb-2 text-sm text-gray-700"
                onClick={closeDropdown}
              >
                {name}
              </Link>
            ))}
            <button
              onClick={() => logout()}
              className="mb-2 block w-full cursor-pointer px-4 py-2 pb-2 text-left text-sm text-gray-700"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
