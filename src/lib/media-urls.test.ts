import { describe, expect, it } from "vitest";
import { getUserImageUrl, MEDIA_URL } from "@/lib/media-urls";

describe("getUserImageUrl()", () => {
  it("should return the correct user image URL", () => {
    const image = "user123.jpg";
    const expectedUrl = `${MEDIA_URL}/profilePicture/${image}`;

    const result = getUserImageUrl(image);

    expect(result).toBe(expectedUrl);
  });
});
