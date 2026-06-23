import { describe, expect, it } from "vitest";
import { screenSchema, screensResponseSchema } from "./screen.schema";

const screen = {
  deviceName: "Living Room TV",
  id: "screen-1",
  name: "Living Room",
  platform: "google-tv",
  status: "offline",
};

describe("screenSchema", () => {
  it("keeps missing lastSeenAt as null", () => {
    expect(screenSchema.parse(screen).lastSeenAt).toBeNull();
  });

  it("keeps explicit null lastSeenAt as null", () => {
    expect(
      screenSchema.parse({ ...screen, lastSeenAt: null }).lastSeenAt,
    ).toBeNull();
  });
});

describe("screensResponseSchema", () => {
  it("parses a bare array response", () => {
    expect(screensResponseSchema.parse([screen])).toHaveLength(1);
  });

  it("parses a screens wrapper response", () => {
    expect(screensResponseSchema.parse({ screens: [screen] })).toHaveLength(1);
  });

  it("parses an items wrapper response", () => {
    expect(screensResponseSchema.parse({ items: [screen] })).toHaveLength(1);
  });
});
