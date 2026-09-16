"use client";

import { TeacherNavbar } from "@/app/(teacherModule)/components/teacher-navbar";
import { TeacherSidebar } from "@/app/(teacherModule)/components/teacher-sidebar";
import { useState } from "react";

export default function TeacherAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-[#f5f6f8]">
      <TeacherSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <TeacherNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
