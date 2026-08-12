"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import {
  createTeacherProfile,
  type CreateTeacherProfileFormState,
} from "@/features/teacher/actions/create-profile";
import { paths } from "@/routes";
import {
  Camera,
  ChevronDown,
  CircleDollarSign,
  CircleUserRound,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const initialState: CreateTeacherProfileFormState = { errors: {} };

const inputClassName =
  "h-11 w-full rounded-lg border border-transparent bg-white px-4 text-sm outline-none transition placeholder:text-[#9b9b9b] focus:border-[#53a2eb] focus:ring-4 focus:ring-[#53a2eb]/10 disabled:cursor-not-allowed disabled:opacity-60";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <span className="mt-1 block text-[11px] text-red-500">{errors[0]}</span>
  );
}

export function CreateTeacherProfileForm() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string>();
  const [formState, action, isPending] = useActionState(
    createTeacherProfile,
    initialState
  );
  const errors = formState?.errors ?? {};

  useEffect(() => {
    if (formState?.success) {
      router.replace(paths.teacherEducation());
    }
  }, [formState?.success, router]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setImagePreview(undefined);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <div className="mb-5 flex gap-1.5" aria-label="Step 2 of 6">
        {Array.from({ length: 2 }).map((_, index) => (
          <span
            key={`complete-${index}`}
            className="h-1.5 w-12 rounded-full bg-[#fbbe1b]"
          />
        ))}
        {Array.from({ length: 4 }).map((_, index) => (
          <span
            key={`remaining-${index}`}
            className="h-1.5 w-12 rounded-full bg-[#d1d1d1]"
          />
        ))}
      </div>

      <form action={action} noValidate className="space-y-3">
        <div className="mb-4 text-center">
          <label className="relative mx-auto grid h-20 w-20 cursor-pointer place-items-center overflow-visible rounded-full border border-dashed border-[#333] bg-white">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile preview"
                fill
                sizes="80px"
                className="rounded-full object-cover"
              />
            ) : (
              <CircleUserRound
                size={48}
                strokeWidth={1.1}
                className="text-[#dedede]"
              />
            )}
            <span className="absolute right-0 bottom-0 z-10 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#53a2eb] text-white">
              <Camera size={14} />
            </span>
            <input
              required
              type="file"
              name="profileImage"
              accept="image/*"
              disabled={isPending}
              onChange={handleImageChange}
              aria-label="Upload your image"
              className="absolute inset-0 z-20 cursor-pointer opacity-0"
            />
          </label>
          <p className="mt-1.5 text-xs text-[#555]">Upload your image</p>
          <FieldError errors={errors.profileImage} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs font-medium text-[#222]">
            Full name
            <input
              required
              name="fullName"
              placeholder="Enter Name"
              disabled={isPending}
              className={`${inputClassName} mt-1.5`}
            />
            <FieldError errors={errors.fullName} />
          </label>
          <label className="text-xs font-medium text-[#222]">
            Professional Title
            <input
              required
              name="professionalTitle"
              placeholder="Enter Title"
              disabled={isPending}
              className={`${inputClassName} mt-1.5`}
            />
            <FieldError errors={errors.professionalTitle} />
          </label>
        </div>

        <label className="block text-xs font-medium text-[#222]">
          Bio
          <textarea
            required
            name="bio"
            placeholder="Write about yourself"
            disabled={isPending}
            rows={2}
            className="mt-1.5 min-h-16 w-full resize-none rounded-lg border border-transparent bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#9b9b9b] focus:border-[#53a2eb] focus:ring-4 focus:ring-[#53a2eb]/10 disabled:opacity-60"
          />
          <FieldError errors={errors.bio} />
        </label>

        <label className="block text-xs font-medium text-[#222]">
          Mobile Number
          <input
            required
            name="mobileNumber"
            type="tel"
            inputMode="tel"
            placeholder="Enter Mobile Number"
            disabled={isPending}
            className={`${inputClassName} mt-1.5`}
          />
          <FieldError errors={errors.mobileNumber} />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs font-medium text-[#222]">
            Country
            <span className="relative mt-1.5 block">
              <select
                required
                name="country"
                defaultValue=""
                disabled={isPending}
                className={`${inputClassName} appearance-none pr-10`}
              >
                <option value="" disabled>
                  Choose Country
                </option>
                <option value="India">India</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#999]"
                size={16}
              />
            </span>
            <FieldError errors={errors.country} />
          </label>
          <label className="text-xs font-medium text-[#222]">
            City
            <span className="relative mt-1.5 block">
              <select
                required
                name="city"
                defaultValue=""
                disabled={isPending}
                className={`${inputClassName} appearance-none pr-10`}
              >
                <option value="" disabled>
                  Choose City
                </option>
                <option value="Delhi">Delhi</option>
                <option value="London">London</option>
                <option value="New York">New York</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#999]"
                size={16}
              />
            </span>
            <FieldError errors={errors.city} />
          </label>
        </div>

        <label className="block text-xs font-medium text-[#222]">
          Rate per minute
          <span className="relative mt-1.5 block">
            <CircleDollarSign
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#999]"
              size={17}
              strokeWidth={1.6}
            />
            <ChevronDown
              className="pointer-events-none absolute top-1/2 left-10 -translate-y-1/2 text-[#999]"
              size={14}
            />
            <input
              name="hourlyRate"
              type="number"
              min="0.01"
              max="500"
              step="0.01"
              inputMode="decimal"
              placeholder="Enter amount (max 500)"
              required
              disabled={isPending}
              className={`${inputClassName} pl-16`}
            />
          </span>
          <FieldError errors={errors.hourlyRate} />
        </label>

        <ErrorBlock errors={errors._form} />
        <button
          type="submit"
          disabled={isPending}
          className="flex h-11 w-full items-center justify-center rounded-lg bg-[#53a2eb] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Continue"}
        </button>
      </form>
    </>
  );
}
