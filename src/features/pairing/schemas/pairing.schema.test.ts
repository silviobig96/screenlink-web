import { describe, expect, it } from "vitest";
import { pairingCodeSchema } from "./pairing.schema";

describe("pairingCodeSchema", () => {
  it("accepts exactly six digits", () =>
    expect(pairingCodeSchema.parse({ code: "123456" })).toEqual({
      code: "123456",
    }));
  it.each(["", "12345", "1234567", "12A456"])(
    "rejects invalid code %s",
    (code) => expect(() => pairingCodeSchema.parse({ code })).toThrow(),
  );
});
