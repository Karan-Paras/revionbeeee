import { isUserProfileComplete } from "@/features/user/utils";
import { User } from "next-auth";
import { describe, expect, it } from "vitest";

describe("isUserProfileComplete()", () => {
  it("should return true if user has name and image", () => {
    const user = {
      name: "John Doe",
      image: "https://example.com/image.jpg",
    } as User;
    const result = isUserProfileComplete(user);
    expect(result).toBe(true);
  });
  it("should return false if user does not have name", () => {
    const user = {
      name: "",
      image: "https://example.com/image.jpg",
    } as User;
    const result = isUserProfileComplete(user);
    expect(result).toBe(false);
  });

  it("should return false if user does not have image", () => {
    const user = {
      name: "John Doe",
      image: "",
    } as User;
    const result = isUserProfileComplete(user);
    expect(result).toBe(false);
  });

  it("should return false if user does not have name and image", () => {
    const user = {
      name: "",
      image: "",
    } as User;
    const result = isUserProfileComplete(user);
    expect(result).toBe(false);
  });
});
