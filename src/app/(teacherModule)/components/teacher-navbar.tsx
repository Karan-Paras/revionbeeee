"use client";

import { getTeacherProfileDetail } from "@/features/teacher/actions/get-profile-detail";
import { updateTeacherOnlineStatus } from "@/features/teacher/actions/update-online-status";
import {
  getTeacherNotifications,
  markTeacherNotificationsRead,
  type TeacherNotification,
} from "@/features/teacher/api/get-notifications";
import { getTeacherImageUrl } from "@/lib/media-urls";
import { paths } from "@/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Menu, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function resolveProfileImage(image: string) {
  return getTeacherImageUrl(image);
}

const NOTIFICATION_REFETCH_INTERVAL = 10_000;

type CachedTeacherProfile = {
  name?: string;
  image?: string;
  isOnline?: boolean;
};

function profileCacheKey(email: string) {
  return `revision-bee:teacher-profile:${email.toLowerCase()}`;
}

function readCachedProfile(email: string): CachedTeacherProfile | undefined {
  try {
    const value = window.sessionStorage.getItem(profileCacheKey(email));
    return value ? (JSON.parse(value) as CachedTeacherProfile) : undefined;
  } catch {
    return undefined;
  }
}

function cacheProfile(email: string, profile: CachedTeacherProfile) {
  if (!email) return;
  const current = readCachedProfile(email) ?? {};
  const definedProfile = Object.fromEntries(
    Object.entries(profile).filter(([, value]) => value !== undefined)
  ) as CachedTeacherProfile;
  window.sessionStorage.setItem(
    profileCacheKey(email),
    JSON.stringify({ ...current, ...definedProfile })
  );
}

export function TeacherNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [teacherName, setTeacherName] = useState("Teacher");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherImage, setTeacherImage] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const { mutate: markTeacherRead } = useMutation({
    mutationFn: markTeacherNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-notifications"] });
    },
  });

  function handleMarkAllRead() {
    queryClient.setQueriesData<TeacherNotification[]>(
      { queryKey: ["teacher-notifications"] },
      (current) => current?.map((n) => ({ ...n, unread: false }))
    );
    markTeacherRead(undefined, {
      onError: () => {
        /* ignore mark-read API failure */
      },
    });
  }

  const { data: notifications = [] } = useQuery({
    queryKey: ["teacher-notifications"],
    queryFn: getTeacherNotifications,
    staleTime: 0,
    refetchInterval: NOTIFICATION_REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
  });
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const sessionName = session?.user?.name?.trim();
    const sessionEmail = session?.user?.email?.trim();
    const sessionImage = session?.user?.image;

    if (sessionName) setTeacherName(sessionName);
    if (sessionImage) setTeacherImage(resolveProfileImage(sessionImage));
    if (sessionEmail) {
      setTeacherEmail(sessionEmail);
      const cachedProfile = readCachedProfile(sessionEmail);
      if (cachedProfile?.name) setTeacherName(cachedProfile.name);
      if (cachedProfile?.image) setTeacherImage(cachedProfile.image);
      if (typeof cachedProfile?.isOnline === "boolean") {
        setIsOnline(cachedProfile.isOnline);
      }
    }
  }, [session]);

  useEffect(() => {
    const token = session?.user?.token;
    if (!token) return;

    getTeacherProfileDetail(token)
      .then((result) => {
        if (!result) return;
        if (!result.success) {
          toast.error(result.error);
          return;
        }

        const fullName =
          result.data.fullName?.trim() ||
          [result.data.firstName, result.data.lastName]
            .filter(Boolean)
            .join(" ")
            .trim() ||
          result.data.name?.trim();

        if (fullName) setTeacherName(fullName);

        const image = result.data.profileImage ?? result.data.profilePicture;
        const resolvedImage = image ? resolveProfileImage(image) : undefined;
        if (resolvedImage) setTeacherImage(resolvedImage);

        const onlineStatus =
          result.data.isOnline ??
          result.data.is_online ??
          result.data.onlineStatus ??
          result.data.online_status;
        const normalizedOnlineStatus =
          typeof onlineStatus === "boolean"
            ? onlineStatus
            : typeof onlineStatus === "number"
              ? onlineStatus === 1
              : undefined;
        if (typeof normalizedOnlineStatus === "boolean") {
          setIsOnline(normalizedOnlineStatus);
        }
        cacheProfile(session?.user?.email?.trim() ?? "", {
          name: fullName,
          image: resolvedImage,
          isOnline: normalizedOnlineStatus,
        });
      })
      .catch((error: unknown) => {
        toast.error(
          error instanceof Error ? error.message : "Unable to load profile."
        );
      });
  }, [session?.user?.email, session?.user?.token]);

  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const detail = (
        event as CustomEvent<{
          name?: string;
          image?: string;
          isOnline?: boolean;
        }>
      ).detail;
      const updatedName = detail?.name?.trim();
      if (updatedName) setTeacherName(updatedName);
      if (detail?.image) {
        setTeacherImage(resolveProfileImage(detail.image));
      }
      if (typeof detail?.isOnline === "boolean") {
        setIsOnline(detail.isOnline);
      }
      cacheProfile(session?.user?.email?.trim() ?? "", {
        name: updatedName,
        image: detail?.image ? resolveProfileImage(detail.image) : undefined,
        isOnline: detail?.isOnline,
      });
    };

    window.addEventListener("teacher-profile-updated", handleProfileUpdate);
    return () =>
      window.removeEventListener(
        "teacher-profile-updated",
        handleProfileUpdate
      );
  }, [session?.user?.email]);

  async function handleOnlineStatusChange() {
    if (isUpdatingStatus) return;

    const nextStatus = !isOnline;
    setIsUpdatingStatus(true);
    const result = await updateTeacherOnlineStatus(nextStatus);

    if (!result || !result.success) {
      toast.error(result?.error ?? "Status update returned an empty response.");
      setIsUpdatingStatus(false);
      return;
    }

    setIsOnline(result.isOnline);
    cacheProfile(teacherEmail, { isOnline: result.isOnline });
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
          onClick={onMenuClick}
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
            unoptimized
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
        <Link
          href={paths.teacherNotifications()}
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
          className="relative rounded-full p-1 text-[#3899ec] transition hover:bg-[#edf6ff]"
          onClick={handleMarkAllRead}
        >
          <Bell size={22} strokeWidth={1.7} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-[#ff3d4d] text-[9px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
