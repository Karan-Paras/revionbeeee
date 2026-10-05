import { describe, expect, it } from "vitest";

import { getPostLoginPath } from "./utils";

describe("getPostLoginPath", () => {
  it.each([
    [1, "/Tsignup"],
    [2, "/Tpersonal-info"],
    [3, "/Teducation"],
    [4, "/Tcertifications"],
    [5, "/Tavailability"],
    [6, "/Tbank-details"],
    [7, "/teacher/dashboard"],
  ])("routes teacher status %s to %s", (status, expectedPath) => {
    expect(getPostLoginPath("teacher", status)).toBe(expectedPath);
  });

  it("routes students with profile status 1 to create profile", () => {
    expect(getPostLoginPath("student", undefined, 1)).toBe("/create-profile");
  });

  it("routes students with profile status 2 to subscription plans", () => {
    expect(getPostLoginPath("student", undefined, 2)).toBe(
      "/subscription-plans"
    );
  });

  it("routes an unknown user type back to login", () => {
    expect(getPostLoginPath(undefined, undefined)).toBe("/login");
  });
});
