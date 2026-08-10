import { TeacherNavbar } from "@/app/(teacherModule)/components/teacher-navbar";
import { TeacherSidebar } from "@/app/(teacherModule)/components/teacher-sidebar";

export default function TeacherAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-dvh overflow-hidden bg-[#f5f6f8]">
      <TeacherSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TeacherNavbar />
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
