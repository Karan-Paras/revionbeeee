import { describe, expect, it } from "vitest";

import {
  AddTeacherQualificationSchema,
  CreateTeacherProfileSchema,
} from "./schemas";

const validProfile = {
  fullName: "Jamie Smith",
  professionalTitle: "Mathematics Teacher",
  bio: "Experienced mathematics teacher for IB students.",
  mobileNumber: "+91 98765 43210",
  country: "India",
  city: "Delhi",
  hourlyRate: 25,
  profileImage: new File(["image"], "profile.png", { type: "image/png" }),
};

describe("CreateTeacherProfileSchema", () => {
  it("accepts a valid teacher profile", () => {
    expect(CreateTeacherProfileSchema.safeParse(validProfile).success).toBe(
      true
    );
  });

  it("rejects a mobile number with fewer than 10 digits", () => {
    const result = CreateTeacherProfileSchema.safeParse({
      ...validProfile,
      mobileNumber: "12345",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a non-image profile file", () => {
    const result = CreateTeacherProfileSchema.safeParse({
      ...validProfile,
      profileImage: new File(["document"], "profile.pdf", {
        type: "application/pdf",
      }),
    });

    expect(result.success).toBe(false);
  });

  it("rejects a zero hourly rate", () => {
    const result = CreateTeacherProfileSchema.safeParse({
      ...validProfile,
      hourlyRate: 0,
    });

    expect(result.success).toBe(false);
  });
});

describe("AddTeacherQualificationSchema", () => {
  const validQualification = {
    institutionName: "University of Delhi",
    degree: "Bachelor's",
    fieldOfStudy: "Mathematics",
    graduationYear: "2020",
    degreeDocument: new File(["document"], "degree.pdf", {
      type: "application/pdf",
    }),
  };

  it("accepts a valid qualification", () => {
    expect(
      AddTeacherQualificationSchema.safeParse(validQualification).success
    ).toBe(true);
  });

  it("rejects blank qualification fields", () => {
    const result = AddTeacherQualificationSchema.safeParse({
      ...validQualification,
      institutionName: " ",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a future graduation year", () => {
    const result = AddTeacherQualificationSchema.safeParse({
      ...validQualification,
      graduationYear: String(new Date().getFullYear() + 1),
    });

    expect(result.success).toBe(false);
  });
});
