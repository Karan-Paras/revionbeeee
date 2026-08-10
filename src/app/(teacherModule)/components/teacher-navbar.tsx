"use client";

import { ProfileJordan } from "@/assets/images";
import { getTeacherProfileDetail } from "@/features/teacher/actions/get-profile-detail";
import { getTeacherImageUrl } from "@/lib/media-urls";
import { Bell, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

function resolveProfileImage(image: string) {
  return getTeacherImageUrl(image);
}

export function TeacherNavbar() {
  const { data: session } = useSession();
  const [teacherName, setTeacherName] = useState("Teacher");
  const [teacherImage, setTeacherImage] = useState<string | StaticImageData>(
    ProfileJordan
  );

  useEffect(() => {
    const sessionName = session?.user?.name?.trim();
    const sessionImage = session?.user?.image;

    if (sessionName) setTeacherName(sessionName);
    if (sessionImage) setTeacherImage(resolveProfileImage(sessionImage));
  }, [session]);

  useEffect(() => {
    getTeacherProfileDetail().then((result) => {
      if (!result.success) return;

      const fullName =
        result.data.fullName?.trim() ||
        [result.data.firstName, result.data.lastName]
          .filter(Boolean)
          .join(" ")
          .trim() ||
        result.data.name?.trim();

      if (fullName) setTeacherName(fullName);

      const image = result.data.profileImage ?? result.data.profilePicture;
      if (image) setTeacherImage(resolveProfileImage(image));
    });
  }, []);

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 17
        ? "Good Afternoon"
        : "Good Evening";
  const currentDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="flex h-[86px] shrink-0 items-center justify-between border-b border-[#edf0f3] bg-white px-5 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          className="lg:hidden"
        >
          <Menu size={22} />
        </button>
        <Image
          src={teacherImage}
          alt={teacherName}
          width={42}
          height={42}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-[#171717] sm:text-base">
            {greeting}, {teacherName}
          </p>
          <p className="mt-0.5 hidden text-[11px] text-[#777] sm:block">
            {currentDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 rounded-full border border-[#dce3e8] bg-[#f7fafc] px-2.5 py-1.5">
          <span className="relative h-5 w-9 rounded-full bg-[#71df69]">
            <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-white shadow" />
          </span>
          <span className="hidden text-xs font-medium text-[#38b44a] sm:inline">
            Online
          </span>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative text-[#3899ec]"
        >
          <Bell size={22} strokeWidth={1.7} />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full border border-white bg-[#ff3d4d]" />
        </button>
      </div>
    </header>
  );
}
