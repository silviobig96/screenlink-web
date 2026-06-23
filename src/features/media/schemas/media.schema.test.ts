import { describe, expect, it } from "vitest";
import {
  mediaAssetSchema,
  mediaListSchema,
  mediaTypeForFile,
  validateUploadFile,
} from "./media.schema";

function file(name: string, type: string, size = 1024) {
  const upload = new File(["x".repeat(Math.min(size, 1024))], name, { type });
  Object.defineProperty(upload, "size", { value: size });
  return upload;
}

describe("media upload validation", () => {
  it.each([
    ["photo.jpg", "image/jpeg", "image"],
    ["photo.png", "image/png", "image"],
    ["photo.webp", "image/webp", "image"],
    ["clip.mp4", "video/mp4", "video"],
    ["clip.webm", "video/webm", "video"],
  ] as const)("accepts %s", (_name, mimeType, expectedType) => {
    const upload = file(_name, mimeType);

    expect(validateUploadFile(upload)).toBeNull();
    expect(mediaTypeForFile(upload)).toBe(expectedType);
  });

  it("rejects unsupported file types", () => {
    expect(validateUploadFile(file("payload.svg", "image/svg+xml"))).toBe(
      "Upload a supported image or video file.",
    );
  });

  it("rejects oversized images and videos", () => {
    expect(
      validateUploadFile(file("huge.jpg", "image/jpeg", 26 * 1024 * 1024)),
    ).toBe("Images must be 25 MB or smaller.");
    expect(
      validateUploadFile(file("huge.mp4", "video/mp4", 501 * 1024 * 1024)),
    ).toBe("Videos must be 500 MB or smaller.");
  });
});

describe("media response mapping", () => {
  it("maps media list responses without storage keys", () => {
    const parsed = mediaListSchema.parse([
      {
        createdAt: "2026-06-23T00:00:00.000Z",
        filename: "image.jpg",
        id: "media-1",
        mimeType: "image/jpeg",
        originalFilename: "image.jpg",
        previewUrl: "https://signed.example.com/image.jpg",
        sizeBytes: 1234,
        status: "ready",
        storageKey: "internal/key.jpg",
        type: "image",
        updatedAt: "2026-06-23T00:00:00.000Z",
      },
    ]);

    expect(parsed).toEqual([
      expect.objectContaining({
        filename: "image.jpg",
        id: "media-1",
        previewUrl: "https://signed.example.com/image.jpg",
      }),
    ]);
    expect(mediaAssetSchema.parse(parsed[0])).not.toHaveProperty("storageKey");
    expect(mediaAssetSchema.parse(parsed[0])).not.toHaveProperty("playbackUrl");
  });
});
