export const screenStatuses = [
  "online",
  "offline",
  "idle",
  "playing",
  "syncing",
  "error",
] as const;
export type ScreenStatus = (typeof screenStatuses)[number];

export interface Screen {
  id: string;
  name: string;
  deviceName: string;
  deviceModel: string;
  platform: string;
  status: ScreenStatus;
  lastSeenAt: string;
}
