import { describe, expect, it } from "vitest";
import { mediaUrlSchema } from "./command.schema";

describe("mediaUrlSchema", () => {
  it.each([
    "https://example.com/media.jpg",
    "https://example.com/media.jpeg",
    "https://example.com/media.png",
    "https://example.com/media.webp",
    "https://example.com/media.gif",
    "http://localhost:8080/video.mp4",
    "https://example.com/video.webm",
    "https://example.com/video.mov",
    "https://example.com/video.m4v",
    "https://example.com/media.png?width=1200&token=abc",
    "https://upload.wikimedia.org/example/icon.svg.png",
  ])("accepts %s", (url) =>
    expect(mediaUrlSchema.parse({ url })).toEqual({ url }),
  );

  it.each([
    "javascript:alert(1)",
    "data:image/png;base64,abc",
    "file:///tmp/image.png",
    "ftp://example.com/file.jpg",
    "not-a-url",
  ])("rejects unsafe URL %s", (url) =>
    expect(() => mediaUrlSchema.parse({ url })).toThrow(),
  );

  it("rejects unsupported media extensions", () => {
    expect(() =>
      mediaUrlSchema.parse({ url: "https://example.com/file.svg" }),
    ).toThrow("Use a supported media URL");
  });
});
