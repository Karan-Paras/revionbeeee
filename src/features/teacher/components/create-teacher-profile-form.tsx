"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import {
  createTeacherProfile,
  type CreateTeacherProfileFormState,
} from "@/features/teacher/actions/create-profile";
import {
  getInternationalPhoneNumber,
  getNationalPhoneNumber,
} from "@/features/teacher/phone-number";
import { CreateTeacherProfileSchema } from "@/features/teacher/schemas";
import {
  closePhoneCountryDropdown,
  useDismissPhoneCountryDropdown,
} from "@/hooks/use-dismiss-phone-country-dropdown";
import { paths } from "@/routes";
import { City, Country } from "country-state-city";
import {
  Camera,
  ChevronDown,
  CircleDollarSign,
  CircleUserRound,
} from "lucide-react";
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
  const phoneInputRef = useRef<PhoneInputRefType>(null);
  const [imagePreview, setImagePreview] = useState<string>();
  const [selectedCountryCode, setSelectedCountryCode] = useState("IN");
  const [mobileNumber, setMobileNumber] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+91");
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
      profileImage: formData.get("profileImage"),
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

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
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
              required
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
                    setMobileNumber(`${nextPhoneCountryCode}${nationalNumber}`);
                  }
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
                defaultValue=""
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
              disabled={isPending}
              inputProps={{
                required: true,
                "aria-label": "Mobile number",
              }}
              onChange={(phone, { country }) => {
                setMobileNumber(phone);
                setPhoneCountryCode(`+${country.dialCode.replace(/\D/g, "")}`);
                closePhoneCountryDropdown(phoneInputRef.current);
                const countryCode = country.iso2.toUpperCase();

                setSelectedCountryCode((currentCountryCode) => {
                  if (currentCountryCode !== countryCode) {
                    setLiveErrors((current) => ({
                      ...current,
                      country: undefined,
                      city: undefined,
                    }));
                  }
                  return countryCode;
                });

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
              onChange={(event) =>
                validateField("hourlyRate", event.target.value)
              }
              className={`${inputClassName} pl-16`}
            />
          </span>
          <FieldError errors={fieldErrors("hourlyRate")} />
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
