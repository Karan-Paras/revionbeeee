"use client";

import { ProfileJordan } from "@/assets/images";
import { getTeacherProfileDetail } from "@/features/teacher/actions/get-profile-detail";
import { getTeacherImageUrl } from "@/lib/media-urls";
import {
  Camera,
  ChevronDown,
  CircleDollarSign,
  Phone,
  Plus,
  UserRound,
  X,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
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

const initialQualifications: Qualification[] = Array.from(
  { length: 4 },
  (_, index) => ({
    id: index + 1,
    institution: "BA Mechanical Engineering",
    degree: "B.Tech",
    field: "Civil",
    year: "2012",
  })
);

const initialCertifications: Certification[] = Array.from(
  { length: 4 },
  (_, index) => ({
    id: index + 1,
    name: "Engineer Of The Year",
    authority: "Company Name",
    issueDate: "20 Nov 2012",
    image:
      index < 2
        ? "/images/teacher-certifications.png"
        : "/images/teacher-education.png",
  })
);

const inputClassName =
  "h-12 w-full rounded-lg border border-[#dbe0e5] bg-[#fbfcfd] px-4 text-xs text-[#242424] outline-none transition placeholder:text-[#a1a5aa] focus:border-[#53a2eb] focus:bg-white focus:ring-4 focus:ring-[#53a2eb]/10";

export default function TeacherProfilePage() {
  const pathname = usePathname();
  const router = useRouter();
  const routeTab: ProfileTab =
    pathname === "/teacher/profile/qualification"
      ? "Qualification"
      : pathname === "/teacher/settings/certifications"
        ? "Certifications"
        : "Edit Profile";
  const [activeTab, setActiveTab] = useState<ProfileTab>(routeTab);
  const [profileImage, setProfileImage] = useState<string | StaticImageData>(
    ProfileJordan
  );
  const [profileDetails, setProfileDetails] = useState({
    fullName: "",
    professionalTitle: "",
    bio: "",
    mobileNumber: "",
    country: "",
    city: "",
    hourlyRate: "",
  });
  const [qualifications, setQualifications] = useState(initialQualifications);
  const [certifications, setCertifications] = useState(initialCertifications);

  useEffect(() => {
    getTeacherProfileDetail().then((result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      const detail = result.data;
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
        setProfileImage(getTeacherImageUrl(image));
      }

      if (detail.qualifications) {
        setQualifications(
          detail.qualifications.map((qualification, index) => ({
            id: qualification.id ?? `qualification-${index}`,
            institution:
              qualification.institutionName ?? qualification.institution ?? "",
            degree: qualification.degree ?? "",
            field: qualification.fieldOfStudy ?? "",
            year: String(qualification.graduationYear ?? ""),
          }))
        );
      }

      if (detail.certifications) {
        setCertifications(
          detail.certifications.map((certification, index) => ({
            id: certification.id ?? `certification-${index}`,
            name: certification.certificationName ?? certification.name ?? "",
            authority:
              certification.issuingAuthority ?? certification.authority ?? "",
            issueDate: certification.issueDate ?? "",
            image:
              certification.certificationFile ??
              certification.image ??
              "/images/teacher-certifications.png",
          }))
        );
      }
    });
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Profile updated successfully");
  }

  function changeTab(tab: ProfileTab) {
    const destination =
      tab === "Edit Profile"
        ? "/teacher/profile"
        : tab === "Qualification"
          ? "/teacher/profile/qualification"
          : tab === "Certifications"
            ? "/teacher/settings/certifications"
            : undefined;

    if (destination && destination !== pathname) {
      router.push(destination);
      return;
    }

    setActiveTab(tab);
  }

  function removeQualification(id: number | string) {
    setQualifications((items) => items.filter((item) => item.id !== id));
  }

  function addQualification() {
    setQualifications((items) => [
      ...items,
      {
        id: crypto.randomUUID(),
        institution: "BA Mechanical Engineering",
        degree: "B.Tech",
        field: "Civil",
        year: "2012",
      },
    ]);
  }

  function removeCertification(id: number | string) {
    setCertifications((items) => items.filter((item) => item.id !== id));
  }

  function addCertification() {
    setCertifications((items) => [
      ...items,
      {
        id: crypto.randomUUID(),
        name: "Engineer Of The Year",
        authority: "Company Name",
        issueDate: "20 Nov 2012",
        image: "/images/teacher-certifications.png",
      },
    ]);
  }

  return (
    <main className="min-h-full bg-[#f5f6f8] p-4 sm:p-8 lg:px-9 lg:py-9">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-[22px] font-bold leading-tight text-[#111]">
          {activeTab === "Edit Profile" ? "My Profile" : "Settings"}
        </h1>
        <p className="mt-2 text-xs text-[#6f7378] sm:text-sm">
          Lorem ipsum dolor sit amet consectetur. Varius eu fermentum arcu lacus
          lacus. Adipiscing egestas pretium rhoncus.
        </p>

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
              className="grid gap-8 py-7 lg:grid-cols-[150px_1fr] lg:px-5"
            >
              <div className="flex justify-center lg:justify-start">
                <label className="relative block h-[116px] w-[116px] cursor-pointer rounded-full">
                  <Image
                    src={profileImage}
                    alt="Teacher profile"
                    fill
                    sizes="116px"
                    className="rounded-full object-cover"
                  />
                  <span className="absolute right-0 bottom-1 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#53a2eb] text-white shadow-sm">
                    <Camera size={15} strokeWidth={2} />
                  </span>
                  <input
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
                        className={`${inputClassName} pl-11`}
                      />
                    </span>
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
                        className={`${inputClassName} pl-11`}
                      />
                    </span>
                  </label>
                </div>

                <label className="block text-xs font-medium text-[#222]">
                  Bio
                  <textarea
                    name="bio"
                    defaultValue={profileDetails.bio}
                    placeholder="Write about yourself"
                    rows={4}
                    className="mt-2 min-h-[100px] w-full resize-none rounded-lg border border-[#dbe0e5] bg-[#fbfcfd] px-4 py-3 text-xs text-[#242424] outline-none transition placeholder:text-[#a1a5aa] focus:border-[#53a2eb] focus:bg-white focus:ring-4 focus:ring-[#53a2eb]/10"
                  />
                </label>

                <label className="block text-xs font-medium text-[#222]">
                  Mobile Number
                  <span className="relative mt-2 block">
                    <Phone
                      className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#a0a4a8]"
                      size={16}
                      strokeWidth={1.7}
                    />
                    <input
                      name="mobileNumber"
                      defaultValue={profileDetails.mobileNumber}
                      type="tel"
                      placeholder="Enter Mobile Number"
                      className={`${inputClassName} pl-11`}
                    />
                  </span>
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-xs font-medium text-[#222]">
                    Country
                    <span className="relative mt-2 block">
                      <select
                        name="country"
                        defaultValue={profileDetails.country}
                        className={`${inputClassName} appearance-none pr-10`}
                      >
                        <option value="" disabled>
                          Choose Country
                        </option>
                        <option value="India">India</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#999]"
                        size={16}
                      />
                    </span>
                  </label>

                  <label className="block text-xs font-medium text-[#222]">
                    City
                    <span className="relative mt-2 block">
                      <select
                        name="city"
                        defaultValue={profileDetails.city}
                        className={`${inputClassName} appearance-none pr-10`}
                      >
                        <option value="" disabled>
                          Choose City
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="London">London</option>
                        <option value="New York">New York</option>
                        <option value="Toronto">Toronto</option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#999]"
                        size={16}
                      />
                    </span>
                  </label>
                </div>

                <label className="block text-xs font-medium text-[#222]">
                  Hourly Rate
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
                      min="0"
                      placeholder="Enter Amount"
                      className={`${inputClassName} pl-[70px]`}
                    />
                  </span>
                </label>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="h-12 w-full rounded-lg bg-[#53a2eb] text-xs font-semibold text-white shadow-[0_8px_20px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df] sm:w-[290px]"
                  >
                    Update
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
                      onClick={() => removeQualification(qualification.id)}
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
                      onClick={() => removeCertification(certification.id)}
                      aria-label="Remove certification"
                      className="absolute -top-2 -right-2 z-10 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-[#ff3643] text-white shadow-sm transition hover:scale-110"
                    >
                      <X size={11} strokeWidth={3} />
                    </button>

                    <div className="relative min-h-[74px] overflow-hidden rounded-md bg-[#ece8df]">
                      <Image
                        src={certification.image}
                        alt="Certification document"
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
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
            <div className="grid min-h-[390px] place-items-center px-6 text-center">
              <div>
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#edf7ff] text-[#53a2eb]">
                  <UserRound size={22} />
                </span>
                <h2 className="mt-4 text-sm font-semibold text-[#333]">
                  {activeTab}
                </h2>
                <p className="mt-1 text-xs text-[#999]">
                  Your {activeTab.toLowerCase()} details will appear here.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
