import { z } from "zod";
import { mediaStatuses, mediaTypes } from "../types/media.types";

export const MAX_IMAGE_SIZE_BYTES = 25 * 1024 * 1024;
export const MAX_VIDEO_SIZE_BYTES = 500 * 1024 * 1024;

export const supportedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const supportedVideoTypes = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-m4v",
] as const;

export const mediaAssetSchema = z.object({
  createdAt: z.string(),
  durationSeconds: z.number().optional(),
  filename: z.string(),
  height: z.number().optional(),
  id: z.string().min(1),
  mimeType: z.string(),
  originalFilename: z.string(),
  previewUrl: z.string().optional(),
  sizeBytes: z.number(),
  status: z.enum(mediaStatuses),
  type: z.enum(mediaTypes),
  updatedAt: z.string(),
  width: z.number().optional(),
});

export const mediaListSchema = z.array(mediaAssetSchema);

export const uploadUrlResponseSchema = z.object({
  mediaAssetId: z.string().min(1),
  requiredHeaders: z.record(z.string(), z.string()),
  uploadMethod: z.literal("PUT"),
  uploadUrl: z.string().url(),
});

export function validateUploadFile(file: File) {
  const isImage = supportedImageTypes.includes(file.type as never);
  const isVideo = supportedVideoTypes.includes(file.type as never);
  if (!isImage && !isVideo) {
    return "Upload a supported image or video file.";
  }
  const maxSize = isImage ? MAX_IMAGE_SIZE_BYTES : MAX_VIDEO_SIZE_BYTES;
  if (file.size > maxSize) {
    return `${isImage ? "Images" : "Videos"} must be ${isImage ? "25 MB" : "500 MB"} or smaller.`;
  }
  return null;
}

export function mediaTypeForFile(file: File) {
  return supportedImageTypes.includes(file.type as never) ? "image" : "video";
}
