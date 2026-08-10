import { describe, expect, it } from "vitest";

import { getPostLoginPath } from "./utils";

describe("getPostLoginPath", () => {
  it.each([
    [1, "/Tsignup"],
    [2, "/Tpersonal-info"],
    [3, "/Teducation"],
    [4, "/Tcertifications"],
    [5, "/Tavailability"],
    [6, "/teacher/dashboard"],
  ])("routes teacher status %s to %s", (status, expectedPath) => {
    expect(getPostLoginPath("teacher", status)).toBe(expectedPath);
  });

  it("routes students to the student dashboard", () => {
    expect(getPostLoginPath("student", 2)).toBe("/dashboard");
  });

  it("routes an unknown user type back to login", () => {
    expect(getPostLoginPath(undefined, undefined)).toBe("/login");
  });
});
