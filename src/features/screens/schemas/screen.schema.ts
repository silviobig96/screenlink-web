import { z } from "zod";
import { screenStatuses } from "../types/screen.types";

export const screenSchema = z.looseObject({
  id: z.string().min(1),
  name: z.string().min(1),
  deviceName: z.string().catch("Google TV"),
  deviceModel: z.string().catch("Unknown model"),
  platform: z.string().catch("Google TV"),
  status: z.enum(screenStatuses).catch("offline"),
  lastSeenAt: z.iso
    .datetime()
    .or(z.string())
    .nullable()
    .optional()
    .catch(null)
    .transform((value) => value ?? null),
});

export const screensResponseSchema = z
  .union([
    z.array(screenSchema),
    z.object({ screens: z.array(screenSchema) }),
    z.object({ items: z.array(screenSchema) }),
  ])
  .transform((value) => {
    if (Array.isArray(value)) return value;
    if ("screens" in value) return value.screens;
    return value.items;
  });
