import { describe, expect, it } from "vitest";
import { normalizeApiError } from "./api-error";

describe("normalizeApiError", () => {
  it("uses a safe server message instead of leaking response content", async () => {
    const response = new Response(
      JSON.stringify({
        message: "database password leaked",
        stack: "sensitive",
      }),
      { status: 500 },
    );
    expect(await normalizeApiError(response)).toEqual({
      status: 500,
      code: "SERVER",
      message: "ScreenLink is temporarily unavailable. Please try again.",
    });
  });
  it("preserves useful validation messages", async () => {
    const response = new Response(
      JSON.stringify({ message: "Pairing code has expired" }),
      { status: 400 },
    );
    expect((await normalizeApiError(response)).message).toBe(
      "Pairing code has expired",
    );
  });
  it("normalizes network failures", async () =>
    expect((await normalizeApiError()).code).toBe("NETWORK"));
});
