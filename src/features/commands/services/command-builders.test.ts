import { describe, expect, it } from "vitest";
import {
  buildClearScreenCommand,
  buildDisplayImageCommand,
  buildDisplayVideoCommand,
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
  });
});
