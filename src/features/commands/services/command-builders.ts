import { mediaUrlSchema } from "../schemas/command.schema";
import type { CommandRequest } from "../types/command.types";

export const buildPingCommand = (): CommandRequest => ({
  type: "PING",
  payload: {},
});
export const buildClearScreenCommand = (): CommandRequest => ({
  type: "CLEAR_SCREEN",
  payload: {},
});
export function buildDisplayImageCommand(url: string): CommandRequest {
  return { type: "DISPLAY_IMAGE", payload: mediaUrlSchema.parse({ url }) };
}
export function buildDisplayVideoCommand(url: string): CommandRequest {
  return { type: "DISPLAY_VIDEO", payload: mediaUrlSchema.parse({ url }) };
}
export function buildDisplayImageMediaCommand(
  mediaAssetId: string,
): CommandRequest {
  return { type: "DISPLAY_IMAGE", payload: { mediaAssetId } };
}
export function buildDisplayVideoMediaCommand(
  mediaAssetId: string,
): CommandRequest {
  return { type: "DISPLAY_VIDEO", payload: { mediaAssetId } };
}
