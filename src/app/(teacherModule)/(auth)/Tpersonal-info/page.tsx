import { CreateTeacherProfileForm } from "@/features/teacher/components/create-teacher-profile-form";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Teacher Personal Information - Revision Bee",
  description: "Complete your Revision Bee teacher profile.",
};

export default function TeacherPersonalInformation() {
  return (
    <main className="h-dvh w-full overflow-hidden bg-[#f4f4f4]">
      <div className="grid h-full w-full overflow-hidden bg-[#f4f4f4] lg:grid-cols-2">
        <section className="flex h-full items-center justify-center overflow-y-auto px-5 py-4 sm:px-10">
          <div className="w-full max-w-[470px]">
            <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
                Personal Information
              </h1>
              <p className="mt-1.5 text-xs text-[#555] sm:text-sm">
                Add your details to start receiving bookings.
              </p>
            </div>

            <CreateTeacherProfileForm />
          </div>
        </section>

        <section className="relative hidden h-full overflow-hidden lg:block">
          <Image
            src="/images/teacher-personal-info.svg"
            alt="Teacher presenting a lesson at a whiteboard"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </section>
      </div>
    </main>
  );
}
