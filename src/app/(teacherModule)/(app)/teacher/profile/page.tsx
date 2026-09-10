"use client";

import { Modal } from "@/components/common/modal";
import { deleteTeacherProfileItem } from "@/features/teacher/actions/delete-profile-item";
import { getTeacherAvailabilities } from "@/features/teacher/actions/get-availabilities";
import { getTeacherProfileDetail } from "@/features/teacher/actions/get-profile-detail";
import { updateTeacherProfile } from "@/features/teacher/actions/update-profile";
import { getNationalPhoneNumber } from "@/features/teacher/phone-number";
import { CreateTeacherProfileSchema } from "@/features/teacher/schemas";
import {
  closePhoneCountryDropdown,
  useDismissPhoneCountryDropdown,
} from "@/hooks/use-dismiss-phone-country-dropdown";
import {
  getTeacherCertificationUrl,
  getTeacherImageUrl,
} from "@/lib/media-urls";
import { paths } from "@/routes";
import { City, Country } from "country-state-city";
import {
  Award,
  Camera,
  ChevronDown,
  CircleDollarSign,
  Plus,
  UserRound,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { PhoneInput, type PhoneInputRefType } from "react-international-phone";
import { toast } from "sonner";

const tabs = [
  "Edit Profile",
  "Qualification",
  "Certifications",
  "Availability",
] as const;
type ProfileTab = (typeof tabs)[number];

type Qualification = {
  id: number | string;
  institution: string;
  degree: string;
  field: string;
  year: string;
};

type Certification = {
  id: number | string;
  name: string;
  authority: string;
  issueDate: string;
  image: string;
};

type DeleteTarget = {
  type: "qualification" | "certification";
  id: number | string;
};

type EditableProfileField =
  | "fullName"
  | "professionalTitle"
  | "bio"
  | "mobileNumber"
  | "country"
  | "city"
  | "hourlyRate";

type AvailabilitySlot = { id: string; startTime: string; endTime: string };
type DayAvailability = { enabled: boolean; slots: AvailabilitySlot[] };
const availabilityDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function emptyAvailability(): Record<string, DayAvailability> {
  return Object.fromEntries(
    availabilityDays.map((day) => [day, { enabled: false, slots: [] }])
  );
}

function formatAvailabilityTime(value: string) {
  const [hourText, minute = "00"] = value.split(":");
  const hour = Number(hourText);
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) return value;
  return `${hour % 12 || 12}:${minute} ${hour >= 12 ? "PM" : "AM"}`;
}

const inputClassName =
  "h-12 w-full rounded-lg border border-[#dbe0e5] bg-[#fbfcfd] px-4 text-xs text-[#242424] outline-none transition placeholder:text-[#a1a5aa] focus:border-[#53a2eb] focus:bg-white focus:ring-4 focus:ring-[#53a2eb]/10";
const countries = Country.getAllCountries();

export default function TeacherProfilePage() {
  useDismissPhoneCountryDropdown();
  const { data: session, update: updateSession } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const phoneInputRef = useRef<PhoneInputRefType>(null);
  const routeTab: ProfileTab =
    pathname === "/teacher/profile/qualification"
      ? "Qualification"
      : pathname === "/teacher/profile/certifications"
        ? "Certifications"
        : pathname === "/teacher/profile/availability"
          ? "Availability"
          : "Edit Profile";
  const [activeTab, setActiveTab] = useState<ProfileTab>(routeTab);
  const [profileImage, setProfileImage] = useState<string>();
  const [profileDetails, setProfileDetails] = useState({
    fullName: "",
    professionalTitle: "",
    bio: "",
    mobileNumber: "",
    country: "",
    city: "",
    hourlyRate: "",
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState("IN");
  const [mobileNumber, setMobileNumber] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+91");
  const [mobileNumberError, setMobileNumberError] = useState<string>();
  const [profileErrors, setProfileErrors] = useState<
    Partial<Record<EditableProfileField, string>>
  >({});
  const cities = City.getCitiesOfCountry(selectedCountryCode) ?? [];
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [failedCertificationImages, setFailedCertificationImages] = useState<
    Set<number | string>
  >(new Set());
  const [isUpdating, startUpdateTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [availability, setAvailability] =
    useState<Record<string, DayAvailability>>(emptyAvailability);

  useEffect(() => {
    const token = session?.user?.token;
    if (!token) return;

    getTeacherProfileDetail(token)
      .then((result) => {
        if (!result) {
          toast.error("Teacher profile returned an empty response.");
          return;
        }
        if (!result.success) {
          toast.error(result.error);
          return;
        }

        const detail = result.data;
        const countryCode =
          countries.find((country) => country.name === detail.country)
            ?.isoCode ?? "IN";
        setSelectedCountryCode(countryCode);
        const dialCode = detail.countryCode?.startsWith("+")
          ? detail.countryCode
          : detail.countryCode
            ? `+${detail.countryCode}`
            : "";
        const profileMobileNumber = detail.mobileNumber ?? "";
        const internationalMobileNumber = profileMobileNumber.startsWith("+")
          ? profileMobileNumber
          : `${dialCode}${profileMobileNumber.replace(/\D/g, "")}`;
        setPhoneCountryCode(dialCode || "+91");
        setMobileNumber(internationalMobileNumber);
        setProfileDetails({
          fullName: detail.fullName ?? "",
          professionalTitle: detail.professionalTitle ?? "",
          bio: detail.bio ?? "",
          mobileNumber: detail.mobileNumber ?? "",
          country: detail.country ?? "",
          city: detail.city ?? "",
          hourlyRate: String(detail.hourlyRate ?? ""),
        });

        const image = detail.profileImage ?? detail.profilePicture;
        if (image) {
          const imageUrl = getTeacherImageUrl(image);
          setProfileImage(imageUrl);
          const email = session?.user?.email?.trim();
          if (email) {
            try {
              const cacheKey = `revision-bee:teacher-profile:${email.toLowerCase()}`;
              const cachedProfile = window.sessionStorage.getItem(cacheKey);
              const cachedData = cachedProfile
                ? (JSON.parse(cachedProfile) as Record<string, unknown>)
                : {};
              window.sessionStorage.setItem(
                cacheKey,
                JSON.stringify({
                  ...cachedData,
                  name: detail.fullName?.trim(),
                  image: imageUrl,
                })
              );
            } catch {
              // Profile data still renders if browser storage is unavailable.
            }
          }
        }
        const fullName = detail.fullName?.trim();

        window.dispatchEvent(
          new CustomEvent("teacher-profile-updated", {
            detail: {
              name: fullName,
              image,
              isOnline: detail.isOnline === true || detail.isOnline === 1,
            },
          })
        );

        if (detail.qualifications) {
          setQualifications(
            detail.qualifications.map((qualification, index) => ({
              id: qualification.id ?? `qualification-${index}`,
              institution:
                qualification.institutionName ??
                qualification.institution_name ??
                qualification.institution ??
                "",
              degree: qualification.degree ?? "",
              field:
                qualification.fieldOfStudy ??
                qualification.field_of_study ??
                "",
              year: String(
                qualification.graduationYear ??
                  qualification.graduation_year ??
                  ""
              ),
            }))
          );
        }

        if (detail.certifications) {
          setCertifications(
            detail.certifications.map((certification, index) => ({
              id: certification.id ?? `certification-${index}`,
              name:
                certification.certificationName ??
                certification.certification_name ??
                certification.name ??
                "",
              authority:
                certification.issuingAuthority ??
                certification.issuing_authority ??
                certification.authority ??
                "",
              issueDate:
                certification.issueDate ?? certification.issue_date ?? "",
              image: getTeacherCertificationUrl(
                certification.certificationFile ??
                  certification.certification_file ??
                  certification.image ??
                  ""
              ),
            }))
          );
        }
      })
      .catch((error: unknown) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load teacher profile."
        );
      });
  }, [session?.user?.token]);

  useEffect(() => {
    let isActive = true;

    const loadAvailability = () =>
      getTeacherAvailabilities()
        .then((result) => {
          if (!isActive) return;
          if (!result) {
            toast.error("Availability returned an empty response.");
            return;
          }
          if (!result.success) {
            toast.error(result.error);
            return;
          }
          const nextAvailability = emptyAvailability();
          result.data.forEach((item, index) => {
            const day = availabilityDays[item.dayOfWeek];
            if (!day || !item.isAvailable) return;
            nextAvailability[day].enabled = true;
            nextAvailability[day].slots.push({
              id: String(item.id ?? `availability-${index}`),
              startTime: item.startTime.slice(0, 5),
              endTime: item.endTime.slice(0, 5),
            });
          });
          setAvailability(nextAvailability);
        })
        .catch((error: unknown) => {
          if (!isActive) return;
          toast.error(
            error instanceof Error
              ? error.message
              : "Unable to load availability."
          );
        });

    void loadAvailability();
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void loadAvailability();
    }, 10_000);
    const refetchOnFocus = () => void loadAvailability();
    const refetchOnVisibility = () => {
      if (document.visibilityState === "visible") void loadAvailability();
    };
    window.addEventListener("focus", refetchOnFocus);
    document.addEventListener("visibilitychange", refetchOnVisibility);

    return () => {
      isActive = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", refetchOnFocus);
      document.removeEventListener("visibilitychange", refetchOnVisibility);
    };
  }, []);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function validateProfileField(field: EditableProfileField, value: unknown) {
    const result = CreateTeacherProfileSchema.shape[field].safeParse(value);
    const message = result.success
      ? undefined
      : result.error.issues[0]?.message;
    setProfileErrors((current) => ({ ...current, [field]: message }));
    return message;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: Record<EditableProfileField, FormDataEntryValue | string> = {
      fullName: formData.get("fullName") ?? "",
      professionalTitle: formData.get("professionalTitle") ?? "",
      bio: formData.get("bio") ?? "",
      mobileNumber,
      country: formData.get("country") ?? "",
      city: formData.get("city") ?? "",
      hourlyRate: formData.get("hourlyRate") ?? "",
    };
    const nextErrors = Object.fromEntries(
      (Object.keys(values) as EditableProfileField[])
        .map((field) => {
          const result = CreateTeacherProfileSchema.shape[field].safeParse(
            values[field]
          );
          return [
            field,
            result.success ? undefined : result.error.issues[0]?.message,
          ];
        })
        .filter(([, message]) => message)
    ) as Partial<Record<EditableProfileField, string>>;

    setProfileErrors(nextErrors);
    setMobileNumberError(nextErrors.mobileNumber);
    if (Object.keys(nextErrors).length) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setMobileNumberError(undefined);

    startUpdateTransition(async () => {
      const result = await updateTeacherProfile(formData);

      if (!result || !result.success) {
        toast.error(
          result?.error ?? "Profile update returned an empty response."
        );
        return;
      }

      await updateSession();
      window.dispatchEvent(
        new CustomEvent("teacher-profile-updated", {
          detail: { name: String(values.fullName).trim() },
        })
      );
      toast.success("Profile updated successfully");
      router.refresh();
    });
  }

  function changeTab(tab: ProfileTab) {
    const destination =
      tab === "Edit Profile"
        ? "/teacher/profile"
        : tab === "Qualification"
          ? "/teacher/profile/qualification"
          : tab === "Certifications"
            ? "/teacher/profile/certifications"
            : tab === "Availability"
              ? "/teacher/profile/availability"
              : undefined;

    if (destination && destination !== pathname) {
      router.push(destination);
      return;
    }

    setActiveTab(tab);
  }

  function addQualification() {
    router.push(
      `${paths.teacherAddQualification()}?returnTo=${encodeURIComponent("/teacher/profile/qualification")}`
    );
  }

  function confirmDelete() {
    if (!deleteTarget) return;

    startDeleteTransition(async () => {
      const result = await deleteTeacherProfileItem(
        deleteTarget.type,
        deleteTarget.id
      );

      if (!result || !result.success) {
        toast.error(
          result?.error ?? "Delete request returned an empty response."
        );
        return;
      }

      if (deleteTarget.type === "qualification") {
        setQualifications((items) =>
          items.filter((item) => item.id !== deleteTarget.id)
        );
      } else {
        setCertifications((items) =>
          items.filter((item) => item.id !== deleteTarget.id)
        );
      }

      toast.success(
        `${deleteTarget.type === "qualification" ? "Qualification" : "Certification"} deleted successfully`
      );
      setDeleteTarget(undefined);
    });
  }

  function addCertification() {
    router.push(
      `${paths.teacherAddCertification()}?returnTo=${encodeURIComponent("/teacher/profile/certifications")}`
    );
  }

  return (
    <main className="min-h-full bg-[#f5f6f8] p-4 sm:p-8 lg:px-9 lg:py-9">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-[22px] font-bold leading-tight text-[#111]">
          My Profile
        </h1>
        <section className="mt-8 min-h-[560px] overflow-hidden rounded-[22px] bg-white px-5 py-4 shadow-[0_1px_3px_rgba(20,30,40,0.03)] sm:px-7">
          <nav
            className="flex overflow-x-auto border-b border-[#edf0f2]"
            aria-label="Profile sections"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => changeTab(tab)}
                className={`relative shrink-0 px-4 py-4 text-xs font-medium transition sm:min-w-[150px] ${activeTab === tab ? "text-[#53a2eb]" : "text-[#999] hover:text-[#555]"}`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute right-3 bottom-0 left-3 h-0.5 rounded-full bg-[#53a2eb]" />
                )}
              </button>
            ))}
          </nav>

          {activeTab === "Edit Profile" ? (
            <form
              key={JSON.stringify(profileDetails)}
              onSubmit={handleSubmit}
              noValidate
              className="grid gap-8 py-7 lg:grid-cols-[150px_1fr] lg:px-5"
            >
              <div className="flex justify-center lg:justify-start">
                <label className="relative grid h-[116px] w-[116px] cursor-pointer place-items-center rounded-full bg-[#eef1f4]">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Teacher profile"
                      fill
                      sizes="116px"
                      unoptimized
                      onError={() => setProfileImage(undefined)}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <UserRound
                      aria-label="No profile picture"
                      size={64}
                      strokeWidth={1.2}
                      className="text-[#b8bec5]"
                    />
                  )}
                  <span className="absolute right-0 bottom-1 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#53a2eb] text-white shadow-sm">
                    <Camera size={15} strokeWidth={2} />
                  </span>
                  <input
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                    aria-label="Change profile photo"
                  />
                </label>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-xs font-medium text-[#222]">
                    Full name
                    <span className="relative mt-2 block">
                      <UserRound
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#a0a4a8]"
                        size={16}
                        strokeWidth={1.7}
                      />
                      <input
                        name="fullName"
                        defaultValue={profileDetails.fullName}
                        placeholder="Enter Name"
                        onChange={(event) =>
                          validateProfileField("fullName", event.target.value)
                        }
                        className={`${inputClassName} pl-11`}
                      />
                    </span>
                    {profileErrors.fullName && (
                      <span className="mt-1 block text-[11px] text-red-500">
                        {profileErrors.fullName}
                      </span>
                    )}
                  </label>

                  <label className="block text-xs font-medium text-[#222]">
                    Professional Title
                    <span className="relative mt-2 block">
                      <UserRound
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#a0a4a8]"
                        size={16}
                        strokeWidth={1.7}
                      />
                      <input
                        name="professionalTitle"
                        defaultValue={profileDetails.professionalTitle}
                        placeholder="Enter Title"
                        onChange={(event) =>
                          validateProfileField(
                            "professionalTitle",
                            event.target.value
                          )
                        }
                        className={`${inputClassName} pl-11`}
                      />
                    </span>
                    {profileErrors.professionalTitle && (
                      <span className="mt-1 block text-[11px] text-red-500">
                        {profileErrors.professionalTitle}
                      </span>
                    )}
                  </label>
                </div>

                <label className="block text-xs font-medium text-[#222]">
                  Bio
                  <textarea
                    name="bio"
                    defaultValue={profileDetails.bio}
                    placeholder="Write about yourself"
                    rows={4}
                    onChange={(event) =>
                      validateProfileField("bio", event.target.value)
                    }
                    className="mt-2 min-h-[100px] w-full resize-none rounded-lg border border-[#dbe0e5] bg-[#fbfcfd] px-4 py-3 text-xs text-[#242424] outline-none transition placeholder:text-[#a1a5aa] focus:border-[#53a2eb] focus:bg-white focus:ring-4 focus:ring-[#53a2eb]/10"
                  />
                  {profileErrors.bio && (
                    <span className="mt-1 block text-[11px] text-red-500">
                      {profileErrors.bio}
                    </span>
                  )}
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-xs font-medium text-[#222]">
                    Country
                    <span className="relative mt-2 block">
                      <select
                        name="country"
                        value={
                          countries.find(
                            (country) => country.isoCode === selectedCountryCode
                          )?.name ?? ""
                        }
                        onChange={(event) => {
                          const countryCode =
                            event.currentTarget.selectedOptions[0]?.dataset
                              .isoCode ?? "";
                          setSelectedCountryCode(countryCode);
                          setMobileNumberError(undefined);
                          validateProfileField("country", event.target.value);
                          setProfileErrors((current) => ({
                            ...current,
                            city: undefined,
                          }));
                          const selectedCountry = countries.find(
                            (country) => country.isoCode === countryCode
                          );
                          if (selectedCountry?.phonecode) {
                            const nextPhoneCountryCode = `+${selectedCountry.phonecode.replace(
                              /\D/g,
                              ""
                            )}`;
                            const nationalNumber = getNationalPhoneNumber(
                              mobileNumber,
                              phoneCountryCode
                            );
                            setPhoneCountryCode(nextPhoneCountryCode);
                            setMobileNumber(
                              `${nextPhoneCountryCode}${nationalNumber}`
                            );
                          }
                        }}
                        className={`${inputClassName} appearance-none pr-10`}
                      >
                        <option value="" disabled>
                          Choose Country
                        </option>
                        {countries.map((country) => (
                          <option
                            key={country.isoCode}
                            value={country.name}
                            data-iso-code={country.isoCode}
                          >
                            {country.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#999]"
                        size={16}
                      />
                    </span>
                    {profileErrors.country && (
                      <span className="mt-1 block text-[11px] text-red-500">
                        {profileErrors.country}
                      </span>
                    )}
                  </label>

                  <label className="block text-xs font-medium text-[#222]">
                    City
                    <span className="relative mt-2 block">
                      <select
                        key={`${selectedCountryCode}-${profileDetails.city}`}
                        name="city"
                        defaultValue={profileDetails.city}
                        onChange={(event) =>
                          validateProfileField("city", event.target.value)
                        }
                        className={`${inputClassName} appearance-none pr-10`}
                      >
                        <option value="" disabled>
                          Choose City
                        </option>
                        {cities.map((city) => (
                          <option
                            key={`${city.stateCode}-${city.name}-${city.latitude}-${city.longitude}`}
                            value={city.name}
                          >
                            {city.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#999]"
                        size={16}
                      />
                    </span>
                    {profileErrors.city && (
                      <span className="mt-1 block text-[11px] text-red-500">
                        {profileErrors.city}
                      </span>
                    )}
                  </label>
                </div>

                <label className="block text-xs font-medium text-[#222]">
                  Mobile Number
                  <input
                    type="hidden"
                    name="mobileNumber"
                    value={getNationalPhoneNumber(
                      mobileNumber,
                      phoneCountryCode
                    )}
                  />
                  <input
                    type="hidden"
                    name="countryCode"
                    value={phoneCountryCode}
                  />
                  <span className="teacher-phone-input teacher-phone-input-bordered mt-2 block">
                    <PhoneInput
                      ref={phoneInputRef}
                      defaultCountry={selectedCountryCode.toLowerCase()}
                      value={mobileNumber}
                      disabled={isUpdating}
                      inputProps={{
                        required: true,
                        "aria-label": "Mobile number",
                        "aria-invalid": !!mobileNumberError,
                      }}
                      onChange={(phone, { country }) => {
                        setMobileNumber(phone);
                        setPhoneCountryCode(
                          `+${country.dialCode.replace(/\D/g, "")}`
                        );
                        closePhoneCountryDropdown(phoneInputRef.current);
                        const countryCode = country.iso2.toUpperCase();
                        setSelectedCountryCode(countryCode);

                        const phoneDigits = phone.replace(/\D/g, "");
                        const dialCodeDigits = country.dialCode.replace(
                          /\D/g,
                          ""
                        );
                        if (phoneDigits.length > dialCodeDigits.length) {
                          const result =
                            CreateTeacherProfileSchema.shape.mobileNumber.safeParse(
                              phone
                            );
                          setMobileNumberError(
                            result.success
                              ? undefined
                              : result.error.issues[0]?.message
                          );
                        } else {
                          setMobileNumberError(undefined);
                        }
                      }}
                    />
                  </span>
                  {mobileNumberError && (
                    <span className="mt-1 block text-[11px] text-red-500">
                      {mobileNumberError}
                    </span>
                  )}
                </label>

                <label className="block text-xs font-medium text-[#222]">
                  Rate per minute
                  <span className="relative mt-2 block">
                    <CircleDollarSign
                      className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#a0a4a8]"
                      size={17}
                      strokeWidth={1.7}
                    />
                    <ChevronDown
                      className="pointer-events-none absolute top-1/2 left-11 -translate-y-1/2 text-[#a0a4a8]"
                      size={14}
                    />
                    <input
                      name="hourlyRate"
                      defaultValue={profileDetails.hourlyRate}
                      type="number"
                      min="0.01"
                      max="500"
                      step="0.01"
                      inputMode="decimal"
                      required
                      placeholder="Enter amount (max 500)"
                      onChange={(event) =>
                        validateProfileField("hourlyRate", event.target.value)
                      }
                      className={`${inputClassName} pl-[70px]`}
                    />
                  </span>
                  {profileErrors.hourlyRate && (
                    <span className="mt-1 block text-[11px] text-red-500">
                      {profileErrors.hourlyRate}
                    </span>
                  )}
                </label>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="h-12 w-full rounded-lg bg-[#53a2eb] text-xs font-semibold text-white shadow-[0_8px_20px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df] disabled:cursor-not-allowed disabled:opacity-60 sm:w-[290px]"
                  >
                    {isUpdating ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </form>
          ) : activeTab === "Qualification" ? (
            <div className="flex min-h-[440px] flex-col py-5">
              <div className="grid gap-3 md:grid-cols-2">
                {qualifications.map((qualification) => (
                  <article
                    key={qualification.id}
                    className="relative grid min-h-[98px] grid-cols-[92px_1fr] gap-3 rounded-lg border border-[#e1e4e7] bg-[#fcfcfc] p-2.5"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          type: "qualification",
                          id: qualification.id,
                        })
                      }
                      aria-label="Remove qualification"
                      className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-[#ff3643] text-white shadow-sm transition hover:scale-110"
                    >
                      <X size={11} strokeWidth={3} />
                    </button>

                    <div className="relative flex min-h-[74px] flex-col items-center justify-center overflow-hidden rounded border border-[#efb5b5] bg-[#fffafa] px-1 text-center text-[#9e4a4a]">
                      <div className="absolute inset-x-0 top-2 border-t border-[#e9c7c7]" />
                      <p className="font-serif text-[7px] tracking-[0.14em]">
                        CERTIFICATE
                      </p>
                      <p className="mt-1 text-[4px] text-[#a57b7b]">
                        OF ACHIEVEMENT
                      </p>
                      <span className="mt-2 h-3 w-3 rounded-full bg-[#cb1f27] shadow-[0_0_0_2px_#f4b2b5]" />
                      <div className="absolute inset-x-2 bottom-2 border-b border-[#e9c7c7]" />
                    </div>

                    <dl className="grid content-center grid-cols-[1fr_auto] gap-x-2 gap-y-1 text-[9px] leading-tight">
                      <dt className="text-[#666]">Institution Name</dt>
                      <dd className="text-right font-semibold text-[#111]">
                        {qualification.institution}
                      </dd>
                      <dt className="text-[#666]">Degree</dt>
                      <dd className="text-right font-semibold text-[#111]">
                        {qualification.degree}
                      </dd>
                      <dt className="text-[#666]">Field of Study</dt>
                      <dd className="text-right font-semibold text-[#111]">
                        {qualification.field}
                      </dd>
                      <dt className="text-[#666]">Graduation Year</dt>
                      <dd className="text-right font-semibold text-[#111]">
                        {qualification.year}
                      </dd>
                    </dl>
                  </article>
                ))}

                <button
                  type="button"
                  onClick={addQualification}
                  className="flex min-h-[98px] items-center justify-center gap-2 rounded-lg border border-dashed border-[#d5d9dd] bg-[#fdfdfd] text-xs font-medium text-[#888] transition hover:border-[#53a2eb] hover:bg-[#f7fbff] hover:text-[#53a2eb] md:col-start-2"
                >
                  <Plus size={17} />
                  Add
                </button>
              </div>

              <div className="mt-auto flex justify-end pt-8">
                <button
                  type="button"
                  onClick={() =>
                    toast.success("Qualifications updated successfully")
                  }
                  className="h-12 w-full rounded-lg bg-[#53a2eb] text-xs font-semibold text-white shadow-[0_8px_20px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df] sm:w-[290px]"
                >
                  Update
                </button>
              </div>
            </div>
          ) : activeTab === "Certifications" ? (
            <div className="flex min-h-[440px] flex-col py-5">
              <div className="grid gap-3 md:grid-cols-2">
                {certifications.map((certification) => (
                  <article
                    key={certification.id}
                    className="relative grid min-h-[98px] grid-cols-[112px_1fr] gap-3 rounded-lg border border-[#e1e4e7] bg-[#fcfcfc] p-2.5"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          type: "certification",
                          id: certification.id,
                        })
                      }
                      aria-label="Remove certification"
                      className="absolute -top-2 -right-2 z-10 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-[#ff3643] text-white shadow-sm transition hover:scale-110"
                    >
                      <X size={11} strokeWidth={3} />
                    </button>

                    <div className="relative min-h-[74px] overflow-hidden rounded-md bg-gradient-to-br from-[#edf7ff] via-white to-[#e7f2fb]">
                      {!failedCertificationImages.has(certification.id) &&
                      !/\.pdf(?:$|[?#])/i.test(certification.image) ? (
                        <Image
                          src={certification.image}
                          alt=""
                          fill
                          sizes="112px"
                          className="object-cover"
                          onError={() =>
                            setFailedCertificationImages((failedImages) => {
                              const nextFailedImages = new Set(failedImages);
                              nextFailedImages.add(certification.id);
                              return nextFailedImages;
                            })
                          }
                        />
                      ) : (
                        <div
                          className="absolute inset-0 grid place-items-center border border-[#d9eaf8]"
                          aria-label="Certificate cover"
                        >
                          <span className="absolute inset-x-3 top-3 h-px bg-[#b9d9f2]" />
                          <span className="absolute inset-x-3 bottom-3 h-px bg-[#b9d9f2]" />
                          <span className="grid h-10 w-10 place-items-center rounded-full border border-[#aad0ed] bg-white/90 text-[#53a2eb] shadow-sm">
                            <Award size={22} strokeWidth={1.7} />
                          </span>
                        </div>
                      )}
                    </div>

                    <dl className="grid content-center grid-cols-[1fr_auto] gap-x-2 gap-y-2 text-[9px] leading-tight">
                      <dt className="text-[#666]">Certification Name</dt>
                      <dd className="text-right font-semibold text-[#111]">
                        {certification.name}
                      </dd>
                      <dt className="text-[#666]">Issuing Authority</dt>
                      <dd className="text-right font-semibold text-[#111]">
                        {certification.authority}
                      </dd>
                      <dt className="text-[#666]">Issue Date</dt>
                      <dd className="text-right font-semibold text-[#111]">
                        {certification.issueDate}
                      </dd>
                    </dl>
                  </article>
                ))}

                <button
                  type="button"
                  onClick={addCertification}
                  className="flex min-h-[98px] items-center justify-center gap-2 rounded-lg border border-dashed border-[#d5d9dd] bg-[#fdfdfd] text-xs font-medium text-[#888] transition hover:border-[#53a2eb] hover:bg-[#f7fbff] hover:text-[#53a2eb] md:col-start-2"
                >
                  <Plus size={17} />
                  Add
                </button>
              </div>

              <div className="mt-auto flex justify-end pt-8">
                <button
                  type="button"
                  onClick={() =>
                    toast.success("Certifications updated successfully")
                  }
                  className="h-12 w-full rounded-lg bg-[#53a2eb] text-xs font-semibold text-white shadow-[0_8px_20px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df] sm:w-[290px]"
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[440px] flex-col py-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-[#222]">
                    Your availability
                  </h2>
                  <p className="mt-1 text-xs text-[#888]">
                    Days and times currently available for bookings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    router.push("/teacher/profile/availability/update")
                  }
                  className="h-10 rounded-lg bg-[#53a2eb] px-7 text-xs font-semibold text-white transition hover:bg-[#4395df]"
                >
                  Update
                </button>
              </div>
              <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                {availabilityDays.map((day) => {
                  const dayAvailability = availability[day];
                  return (
                    <div
                      key={day}
                      className="rounded-xl border border-[#e1e5e9] bg-[#fafbfc] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#222]">
                          {day}
                        </span>
                        <span
                          className={`text-[10px] ${dayAvailability.enabled ? "text-[#25ad56]" : "text-[#ff3547]"}`}
                        >
                          {dayAvailability.enabled
                            ? "Available"
                            : "Unavailable"}
                        </span>
                      </div>

                      {dayAvailability.enabled && (
                        <div className="mt-3 space-y-2">
                          {dayAvailability.slots.map((slot) => (
                            <div
                              key={slot.id}
                              className="rounded-lg bg-white px-3 py-2 text-xs text-[#667085]"
                            >
                              {formatAvailabilityTime(slot.startTime)} –{" "}
                              {formatAvailabilityTime(slot.endTime)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>

      {deleteTarget && (
        <Modal
          onClose={() => {
            if (!isDeleting) setDeleteTarget(undefined);
          }}
          className="sm:max-w-md"
        >
          <div className="p-7 text-center">
            <h2 className="text-lg font-semibold text-[#222]">
              Delete{" "}
              {deleteTarget.type === "qualification"
                ? "Qualification"
                : "Certification"}
            </h2>
            <p className="mt-3 text-sm text-[#666]">
              Do you really want to delete this {deleteTarget.type}?
            </p>
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(undefined)}
                className="h-11 flex-1 rounded-lg border border-[#d8dde1] text-sm font-medium text-[#555] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="h-11 flex-1 rounded-lg bg-[#ff3643] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
