"use client";

import { getTeacherProfileDetail } from "@/features/teacher/actions/get-profile-detail";
import { updateTeacherOnlineStatus } from "@/features/teacher/actions/update-online-status";
import { getTeacherImageUrl } from "@/lib/media-urls";
import { Bell, Menu, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function resolveProfileImage(image: string) {
  return getTeacherImageUrl(image);
}

export function TeacherNavbar() {
  const { data: session } = useSession();
  const [teacherName, setTeacherName] = useState("Teacher");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherImage, setTeacherImage] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    const sessionName = session?.user?.name?.trim();
    const sessionEmail = session?.user?.email?.trim();
    const sessionImage = session?.user?.image;

    if (sessionName) setTeacherName(sessionName);
    if (sessionEmail) setTeacherEmail(sessionEmail);
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

      const onlineStatus =
        result.data.isOnline ??
        result.data.is_online ??
        result.data.onlineStatus ??
        result.data.online_status;
      if (typeof onlineStatus === "boolean") setIsOnline(onlineStatus);
      else if (typeof onlineStatus === "number")
        setIsOnline(onlineStatus === 1);
    });
  }, []);

  async function handleOnlineStatusChange() {
    if (isUpdatingStatus) return;

    const nextStatus = !isOnline;
    setIsUpdatingStatus(true);
    const result = await updateTeacherOnlineStatus(nextStatus);

    if (!result.success) {
      toast.error(result.error);
      setIsUpdatingStatus(false);
      return;
    }

    setIsOnline(result.isOnline);
    setIsUpdatingStatus(false);
    toast.success(result.isOnline ? "You are online" : "You are offline");
  }

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
        {teacherImage ? (
          <Image
            src={teacherImage}
            alt={teacherName}
            width={42}
            height={42}
            onError={() => setTeacherImage(null)}
            className="h-10 w-10 rounded-full border border-[#dce7ef] object-cover"
          />
        ) : (
          <span
            role="img"
            aria-label="Profile image not available"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d7e3ec] bg-gradient-to-br from-[#edf6fd] to-[#dcecf8] text-[#7e9bb1]"
          >
            <UserRound size={21} strokeWidth={1.7} />
          </span>
        )}
        <div>
          <p className="text-sm font-semibold text-[#171717] sm:text-base">
            {greeting}, {teacherName}
          </p>
          <p className="mt-0.5 hidden text-[11px] text-[#777] sm:block">
            {teacherEmail ? `${teacherEmail} • ${currentDate}` : currentDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          role="switch"
          aria-checked={isOnline}
          aria-label={`Set status ${isOnline ? "offline" : "online"}`}
          disabled={isUpdatingStatus}
          onClick={handleOnlineStatusChange}
          className="flex items-center gap-2 rounded-full border border-[#dce3e8] bg-[#f7fafc] px-2.5 py-1.5 transition disabled:cursor-wait disabled:opacity-60"
        >
          <span
            className={`relative h-5 w-9 rounded-full transition-colors ${isOnline ? "bg-[#71df69]" : "bg-[#c6cbd0]"}`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${isOnline ? "right-0.5" : "left-0.5"}`}
            />
          </span>
          <span
            className={`hidden text-xs font-medium sm:inline ${isOnline ? "text-[#38b44a]" : "text-[#7b8187]"}`}
          >
            {isUpdatingStatus ? "Updating..." : isOnline ? "Online" : "Offline"}
          </span>
        </button>
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
