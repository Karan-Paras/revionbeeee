"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import {
  createTeacherProfile,
  type CreateTeacherProfileFormState,
} from "@/features/teacher/actions/create-profile";
import { getTeacherProfileDetail } from "@/features/teacher/actions/get-profile-detail";
import {
  getInternationalPhoneNumber,
  getNationalPhoneNumber,
} from "@/features/teacher/phone-number";
import { CreateTeacherProfileSchema } from "@/features/teacher/schemas";
import { useDismissPhoneCountryDropdown } from "@/hooks/use-dismiss-phone-country-dropdown";
import { getTeacherImageUrl } from "@/lib/media-urls";
import { paths } from "@/routes";
import { City, Country } from "country-state-city";
import { Camera, ChevronDown, CircleUserRound, DollarSign } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { PhoneInput, type PhoneInputRefType } from "react-international-phone";

const initialState: CreateTeacherProfileFormState = { errors: {} };

type ProfileField = Exclude<
  keyof CreateTeacherProfileFormState["errors"],
  "_form"
>;

const inputClassName =
  "h-11 w-full rounded-lg border border-transparent bg-white px-4 text-sm outline-none transition placeholder:text-[#9b9b9b] focus:border-[#53a2eb] focus:ring-4 focus:ring-[#53a2eb]/10 disabled:cursor-not-allowed disabled:opacity-60";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <span className="mt-1 block text-[11px] text-red-500">{errors[0]}</span>
  );
}

export function CreateTeacherProfileForm() {
  useDismissPhoneCountryDropdown();
  const router = useRouter();
  const { data: session } = useSession();
  const phoneInputRef = useRef<PhoneInputRefType>(null);
  const [imagePreview, setImagePreview] = useState<string>();
  const [existingProfileImage, setExistingProfileImage] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("IN");
  const [mobileNumber, setMobileNumber] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+91");
  const [savedProfile, setSavedProfile] = useState({
    fullName: "",
    professionalTitle: "",
    bio: "",
    country: "India",
    city: "",
    hourlyRate: "",
  });
  const [hasSavedProfile, setHasSavedProfile] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileLoadError, setProfileLoadError] = useState<string>();
  const [liveErrors, setLiveErrors] = useState<
    Partial<Record<ProfileField, string[] | undefined>>
  >({});
  const countries = Country.getAllCountries();
  const cities = selectedCountryCode
    ? City.getCitiesOfCountry(selectedCountryCode)
    : [];
  const [formState, action, isPending] = useActionState(
    createTeacherProfile,
    initialState
  );
  const errors = formState?.errors ?? {};
  const profileImageErrors = fieldErrors("profileImage");

  function validateField(field: ProfileField, value: unknown) {
    const result = CreateTeacherProfileSchema.shape[field].safeParse(value);
    setLiveErrors((current) => ({
      ...current,
      [field]: result.success
        ? undefined
        : result.error.issues.map((issue) => issue.message),
    }));
  }

  function fieldErrors(field: ProfileField) {
    return Object.prototype.hasOwnProperty.call(liveErrors, field)
      ? liveErrors[field]
      : errors[field];
  }

  useEffect(() => {
    let isCurrent = true;

    async function loadSavedProfile() {
      setIsLoadingProfile(true);
      setProfileLoadError(undefined);

      const result = await getTeacherProfileDetail(session?.user?.token);
      if (!isCurrent) return;

      if (!result.success) {
        setProfileLoadError(result.error);
        setIsLoadingProfile(false);
        return;
      }

      const detail = result.data;
      const countryName = detail.country?.trim() || "India";
      const country =
        countries.find((item) => item.name === countryName) ??
        countries.find((item) => item.isoCode === "IN");
      const countryCode = country?.isoCode ?? "IN";
      const callingCode = detail.countryCode?.trim() || "+91";
      const internationalPhone = detail.mobileNumber
        ? getInternationalPhoneNumber(detail.mobileNumber, callingCode)
        : "";
      const profileImage = detail.profileImage || detail.profilePicture || "";
      const nextSavedProfile = {
        fullName: detail.fullName?.trim() || "",
        professionalTitle: detail.professionalTitle?.trim() || "",
        bio: detail.bio?.trim() || "",
        country: country?.name ?? countryName,
        city: detail.city?.trim() || "",
        hourlyRate: detail.hourlyRate ? String(detail.hourlyRate) : "",
      };

      setSavedProfile(nextSavedProfile);
      setHasSavedProfile(
        Boolean(
          nextSavedProfile.fullName ||
            nextSavedProfile.professionalTitle ||
            nextSavedProfile.bio ||
            nextSavedProfile.city ||
            nextSavedProfile.hourlyRate ||
            profileImage
        )
      );
      setSelectedCountryCode(countryCode);
      setMobileNumber(internationalPhone);
      setPhoneCountryCode(callingCode);
      setExistingProfileImage(profileImage);
      setImagePreview(
        profileImage ? getTeacherImageUrl(profileImage) : undefined
      );
      setIsLoadingProfile(false);
    }

    void loadSavedProfile();

    return () => {
      isCurrent = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.token]);

  useEffect(() => {
    if (formState?.success) {
      router.replace(paths.teacherEducation());
    }
  }, [formState?.success, router]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    validateField("profileImage", file);
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const profileImage = formData.get("profileImage");
    const hasNewProfileImage =
      profileImage instanceof File &&
      profileImage.size > 0 &&
      profileImage.type !== "application/octet-stream";
    const validation = CreateTeacherProfileSchema.safeParse({
      fullName: formData.get("fullName"),
      professionalTitle: formData.get("professionalTitle"),
      bio: formData.get("bio"),
      mobileNumber: getInternationalPhoneNumber(
        formData.get("mobileNumber"),
        formData.get("countryCode")
      ),
      countryCode: formData.get("countryCode"),
      country: formData.get("country"),
      city: formData.get("city"),
      hourlyRate: formData.get("hourlyRate"),
      profileImage:
        hasNewProfileImage || !existingProfileImage
          ? profileImage
          : new File(["existing"], "existing-profile-image.jpg", {
              type: "image/jpeg",
            }),
    });

    if (!validation.success) {
      const fieldValidationErrors = validation.error.flatten().fieldErrors;
      setLiveErrors(fieldValidationErrors);

      const firstInvalidField = validation.error.issues[0]?.path[0];
      if (firstInvalidField === "mobileNumber") {
        phoneInputRef.current?.focus();
      } else if (typeof firstInvalidField === "string") {
        const field = event.currentTarget.elements.namedItem(firstInvalidField);
        if (field instanceof HTMLElement) field.focus();
      }
      return;
    }

    startTransition(() => {
      action(formData);
    });
  }

  if (isLoadingProfile) {
    return (
      <div className="space-y-4" aria-busy="true">
        <div className="mb-5 flex gap-1.5" aria-label="Step 1 of 6">
          <span className="h-1.5 w-12 rounded-full bg-[#fbbe1b]" />
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-12 rounded-full bg-[#d1d1d1]"
            />
          ))}
        </div>
        <div className="mx-auto h-20 w-20 animate-pulse rounded-full bg-white" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-16 animate-pulse rounded-lg bg-white" />
          <div className="h-16 animate-pulse rounded-lg bg-white" />
        </div>
        <div className="h-20 animate-pulse rounded-lg bg-white" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-16 animate-pulse rounded-lg bg-white" />
          <div className="h-16 animate-pulse rounded-lg bg-white" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex gap-1.5" aria-label="Step 1 of 6">
        {Array.from({ length: 1 }).map((_, index) => (
          <span
            key={`complete-${index}`}
            className="h-1.5 w-12 rounded-full bg-[#fbbe1b]"
          />
        ))}
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={`remaining-${index}`}
            className="h-1.5 w-12 rounded-full bg-[#d1d1d1]"
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <input
          type="hidden"
          name="existingProfileImage"
          value={existingProfileImage}
        />
        <input
          type="hidden"
          name="hasSavedProfile"
          value={hasSavedProfile ? "1" : "0"}
        />
        <div className="mb-4 text-center">
          <label
            className={`relative mx-auto grid h-20 w-20 cursor-pointer place-items-center overflow-visible rounded-full border border-dashed bg-white transition ${profileImageErrors?.length ? "border-2 border-red-500" : "border-[#333]"}`}
          >
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
              required={!existingProfileImage}
              type="file"
              name="profileImage"
              accept="image/*"
              disabled={isPending}
              onChange={handleImageChange}
              aria-label="Upload your image"
              aria-invalid={!!profileImageErrors?.length}
              aria-describedby="profile-image-error"
              className="absolute inset-0 z-20 cursor-pointer opacity-0"
            />
          </label>
          <p className="mt-1.5 text-xs text-[#555]">Upload your image</p>
          <span id="profile-image-error">
            <FieldError errors={profileImageErrors} />
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs font-medium text-[#222]">
            Full name
            <input
              required
              name="fullName"
              placeholder="Enter Name"
              defaultValue={savedProfile.fullName}
              disabled={isPending}
              onChange={(event) =>
                validateField("fullName", event.target.value)
              }
              className={`${inputClassName} mt-1.5`}
            />
            <FieldError errors={fieldErrors("fullName")} />
          </label>
          <label className="text-xs font-medium text-[#222]">
            Professional Title
            <input
              required
              name="professionalTitle"
              placeholder="Enter Title"
              defaultValue={savedProfile.professionalTitle}
              disabled={isPending}
              onChange={(event) =>
                validateField("professionalTitle", event.target.value)
              }
              className={`${inputClassName} mt-1.5`}
            />
            <FieldError errors={fieldErrors("professionalTitle")} />
          </label>
        </div>

        <label className="block text-xs font-medium text-[#222]">
          Bio
          <textarea
            required
            name="bio"
            placeholder="Write about yourself"
            defaultValue={savedProfile.bio}
            disabled={isPending}
            onChange={(event) => validateField("bio", event.target.value)}
            rows={2}
            className="mt-1.5 min-h-16 w-full resize-none rounded-lg border border-transparent bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#9b9b9b] focus:border-[#53a2eb] focus:ring-4 focus:ring-[#53a2eb]/10 disabled:opacity-60"
          />
          <FieldError errors={fieldErrors("bio")} />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs font-medium text-[#222]">
            Country
            <span className="relative mt-1.5 block">
              <select
                required
                name="country"
                value={
                  countries.find(
                    (country) => country.isoCode === selectedCountryCode
                  )?.name ?? ""
                }
                onChange={(event) => {
                  const countryCode =
                    event.currentTarget.selectedOptions[0]?.dataset.isoCode ??
                    "";
                  setSelectedCountryCode(countryCode);
                  setSavedProfile((current) => ({
                    ...current,
                    country: event.target.value,
                    city: "",
                  }));
                  validateField("country", event.target.value);
                  setLiveErrors((current) => ({
                    ...current,
                    city: undefined,
                    mobileNumber: undefined,
                  }));
                }}
                disabled={isPending}
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
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#999]"
                size={16}
              />
            </span>
            <FieldError errors={fieldErrors("country")} />
          </label>
          <label className="text-xs font-medium text-[#222]">
            City
            <span className="relative mt-1.5 block">
              <select
                key={selectedCountryCode}
                required
                name="city"
                defaultValue={savedProfile.city}
                disabled={isPending || !selectedCountryCode}
                onChange={(event) => validateField("city", event.target.value)}
                className={`${inputClassName} appearance-none pr-10`}
              >
                <option value="" disabled>
                  Choose City
                </option>
                {cities?.map((city) => (
                  <option
                    key={`${city.stateCode}-${city.name}-${city.latitude}-${city.longitude}`}
                    value={city.name}
                  >
                    {city.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#999]"
                size={16}
              />
            </span>
            <FieldError errors={fieldErrors("city")} />
          </label>
        </div>

        <label className="block text-xs font-medium text-[#222]">
          Mobile Number
          <input
            type="hidden"
            name="mobileNumber"
            value={getNationalPhoneNumber(mobileNumber, phoneCountryCode)}
          />
          <input type="hidden" name="countryCode" value={phoneCountryCode} />
          <span className="teacher-phone-input mt-1.5 block">
            <PhoneInput
              ref={phoneInputRef}
              defaultCountry="in"
              value={mobileNumber}
              forceDialCode
              disabled={isPending}
              inputProps={{
                required: true,
                "aria-label": "Mobile number",
              }}
              onChange={(phone, { country }) => {
                setMobileNumber(phone);
                setPhoneCountryCode(`+${country.dialCode.replace(/\D/g, "")}`);

                const phoneDigits = phone.replace(/\D/g, "");
                const dialCodeDigits = country.dialCode.replace(/\D/g, "");
                if (phoneDigits.length > dialCodeDigits.length) {
                  validateField("mobileNumber", phone);
                } else {
                  setLiveErrors((current) => ({
                    ...current,
                    mobileNumber: undefined,
                  }));
                }
              }}
            />
          </span>
          <FieldError errors={fieldErrors("mobileNumber")} />
        </label>

        <label className="block text-xs font-medium text-[#222]">
          Rate per minute
          <span className="relative mt-1.5 block">
            <DollarSign
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#9c9898]"
              size={17}
              strokeWidth={1.5}
            />

            <input
              name="hourlyRate"
              type="number"
              min="0.01"
              max="500"
              step="0.01"
              inputMode="decimal"
              placeholder="Enter amount (max 500)"
              defaultValue={savedProfile.hourlyRate}
              required
              disabled={isPending}
              onChange={(event) =>
                validateField("hourlyRate", event.target.value)
              }
              onWheel={(event) => event.currentTarget.blur()}
              className={`${inputClassName} inp_spc pl-16`}
            />
          </span>
          <FieldError errors={fieldErrors("hourlyRate")} />
        </label>

        <ErrorBlock
          errors={profileLoadError ? [profileLoadError] : errors._form}
        />
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
