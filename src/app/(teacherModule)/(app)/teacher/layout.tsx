"use client";

import { TeacherNavbar } from "@/app/(teacherModule)/components/teacher-navbar";
import { TeacherSidebar } from "@/app/(teacherModule)/components/teacher-sidebar";
import { useEffect, useState } from "react";

const SIDEBAR_COLLAPSED_KEY = "revision-bee:teacher-sidebar-collapsed";

export default function TeacherAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    } catch {
      /* ignore storage access error */
    }
  }, []);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      } catch {
        /* ignore storage access error */
      }
      return next;
    });
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-[#f5f6f8]">
      <TeacherSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <TeacherNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
