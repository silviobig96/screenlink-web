import { describe, expect, it } from "vitest";
import { mediaUrlSchema } from "./command.schema";

describe("mediaUrlSchema", () => {
  it.each(["https://example.com/media.jpg", "http://localhost:8080/video.mp4"])(
    "accepts %s",
    (url) => expect(mediaUrlSchema.parse({ url })).toEqual({ url }),
  );
  it.each(["javascript:alert(1)", "ftp://example.com/file", "not-a-url"])(
    "rejects unsafe URL %s",
    (url) => expect(() => mediaUrlSchema.parse({ url })).toThrow(),
  );
});
