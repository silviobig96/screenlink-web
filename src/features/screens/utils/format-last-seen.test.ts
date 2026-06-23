import { describe, expect, it } from "vitest";
import { formatLastSeen } from "./format-last-seen";

describe("formatLastSeen", () => {
  it("does not format null as the Unix epoch", () => {
    expect(formatLastSeen(null)).toBe("No heartbeat yet");
    expect(formatLastSeen(undefined)).toBe("No heartbeat yet");
  });

  it("handles invalid dates", () => {
    expect(formatLastSeen("not-a-date")).toBe("Unknown");
  });
});
