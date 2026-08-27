import { describe, expect, it } from "vitest";
import { LoginSchema, newPassword } from "./schemas";

const messagesFor = (password: string) => {
  const result = newPassword.safeParse(password);
  return result.success
    ? []
    : result.error.issues.map((issue) => issue.message);
};

describe("authentication schemas", () => {
  it("accepts a valid email and strict password", () => {
    expect(
      LoginSchema.safeParse({
        email: "Student@example.com",
        password: "Revision1!",
      }).success
    ).toBe(true);
  });

  it("rejects a malformed email address", () => {
    const result = LoginSchema.safeParse({
      email: "not-an-email",
      password: "Revision1!",
    });
    expect(result.success).toBe(false);
  });

  it("reports all missing password requirements", () => {
    const messages = messagesFor("password");
    expect(messages).toContain("Password must start with an uppercase letter");
    expect(messages).toContain("Password must include a number");
    expect(messages).toContain("Password must include a special character");
  });

  it("rejects short passwords and passwords containing spaces", () => {
    expect(messagesFor("Rev 1!")).toContain(
      "Password must be at least 8 characters"
    );
    expect(messagesFor("Revision 1!")).toContain(
      "Password must not contain spaces"
    );
  });
});
