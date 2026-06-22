import { z } from "zod";
import { screenStatuses } from "../types/screen.types";

export const screenSchema = z.looseObject({
  id: z.string().min(1),
  name: z.string().min(1),
  deviceName: z.string().catch("Google TV"),
  deviceModel: z.string().catch("Unknown model"),
  platform: z.string().catch("Google TV"),
  status: z.enum(screenStatuses).catch("offline"),
  lastSeenAt: z.iso.datetime().or(z.string()).catch(new Date(0).toISOString()),
});

export const screensResponseSchema = z.array(screenSchema);
