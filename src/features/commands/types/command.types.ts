export const commandTypes = [
  "PING",
  "CLEAR_SCREEN",
  "DISPLAY_IMAGE",
  "DISPLAY_VIDEO",
] as const;
export type CommandType = (typeof commandTypes)[number];
export interface CommandRequest {
  type: CommandType;
  payload: Record<string, never> | { url: string };
}
export interface CommandResponse {
  id?: string;
  status?: string;
}
