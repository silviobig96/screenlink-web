import { z } from "zod";

export const pairingCodeSchema = z.object({
  code: z
    .string()
    .regex(/^\d{6}$/, "Enter the complete six-digit pairing code."),
});
export const pairingResponseSchema = z.object({ screenId: z.string().min(1) });
export type PairingFormValues = z.infer<typeof pairingCodeSchema>;
