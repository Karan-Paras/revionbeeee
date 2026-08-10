import {
  getQuestionBankVideoUrl,
  getQuizAnswerVideoUrl,
  getQuizQuestionVideoUrl,
  getSubjectVideoUrl,
  getTeacherImageUrl,
  getUserImageUrl,
  MEDIA_URL,
} from "@/lib/media-urls";
import { describe, expect, it } from "vitest";

describe("getUserImageUrl()", () => {
  it("should return the correct user image URL", () => {
    const image = "user.jpg";
    const expectedUrl = `${MEDIA_URL}/profilePicture/${image}`;

    const result = getUserImageUrl(image);

    expect(result).toBe(expectedUrl);
  });
});

describe("getTeacherImageUrl()", () => {
  it("should use the teacher profile picture directory", () => {
    const image = "teacher.webp";

    expect(getTeacherImageUrl(image)).toBe(
      `${MEDIA_URL}/teacherProfilePicture/${image}`
    );
  });

  it("should preserve an absolute teacher image URL", () => {
    const image = "https://example.com/teacher.webp";

    expect(getTeacherImageUrl(image)).toBe(image);
  });
});

describe("getSubjectVideoUrl()", () => {
  it("should return the correct subject video URL", () => {
    const video = "video.mp4";
    const expectedUrl = `${MEDIA_URL}/video/${video}`;

    const result = getSubjectVideoUrl(video);

    expect(result).toBe(expectedUrl);
  });
});

describe("getQuestionBankVideoUrl()", () => {
  it("should return the correct question bank video URL", () => {
    const video = "video.mp4";
    const expectedUrl = `${MEDIA_URL}/questionBank/video/${video}`;

    const result = getQuestionBankVideoUrl(video);

    expect(result).toBe(expectedUrl);
  });
});

describe("getQuizQuestionVideoUrl()", () => {
  it("should return the correct quiz question video URL", () => {
    const video = "video.mp4";
    const expectedUrl = `${MEDIA_URL}/quizQuestion/questionVideo/${video}`;

    const result = getQuizQuestionVideoUrl(video);

    expect(result).toBe(expectedUrl);
  });
});

describe("getQuizAnswerVideoUrl()", () => {
  it("should return the correct quiz answer video URL", () => {
    const video = "video.mp4";
    const expectedUrl = `${MEDIA_URL}/quizQuestion/answerVideo/${video}`;

    const result = getQuizAnswerVideoUrl(video);

    expect(result).toBe(expectedUrl);
  });
});
