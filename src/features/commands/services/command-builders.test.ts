import { describe, expect, it } from "vitest";
import {
  buildClearScreenCommand,
  buildDisplayImageCommand,
  buildDisplayImageMediaCommand,
  buildDisplayVideoCommand,
  buildDisplayVideoMediaCommand,
  buildPingCommand,
} from "./command-builders";

describe("command payload builders", () => {
  it("builds commands matching the backend contract", () => {
    expect(buildPingCommand()).toEqual({ type: "PING", payload: {} });
    expect(buildClearScreenCommand()).toEqual({
      type: "CLEAR_SCREEN",
      payload: {},
    });
    expect(buildDisplayImageCommand("https://example.com/a.jpg")).toEqual({
      type: "DISPLAY_IMAGE",
      payload: { url: "https://example.com/a.jpg" },
    });
    expect(buildDisplayVideoCommand("https://example.com/a.mp4")).toEqual({
      type: "DISPLAY_VIDEO",
      payload: { url: "https://example.com/a.mp4" },
    });
    expect(buildDisplayImageMediaCommand("media-image-1")).toEqual({
      type: "DISPLAY_IMAGE",
      payload: { mediaAssetId: "media-image-1" },
    });
    expect(buildDisplayVideoMediaCommand("media-video-1")).toEqual({
      type: "DISPLAY_VIDEO",
      payload: { mediaAssetId: "media-video-1" },
    });
  });
});
