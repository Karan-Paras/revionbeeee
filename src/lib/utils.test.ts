import { cn } from "@/lib/utils";
import { describe, expect, it } from "vitest";

describe("cn()", () => {
  it("should merge class names", () => {
    const inputs = ["bg-red-500", "text-white"];
    const result = cn(...inputs);
    const expectedResult = inputs.join(" ");
    expect(result).toBe(expectedResult);
  });

  it("should handle empty inputs", () => {
    const inputs: string[] = [];
    const result = cn(...inputs);
    expect(result).toBe("");
  });

  it("should replace duplicate class names", () => {
    const inputs = ["bg-red-500", "bg-blue-500", "text-white"];
    const result = cn(...inputs);
    const expectedResult = "bg-blue-500 text-white";
    expect(result).toBe(expectedResult);
  });
});
