export const mediaTypes = ["image", "video"] as const;
export type MediaType = (typeof mediaTypes)[number];

export const mediaStatuses = [
  "pending_upload",
  "ready",
  "failed",
  "deleted",
] as const;
export type MediaStatus = (typeof mediaStatuses)[number];

export interface MediaAsset {
  createdAt: string;
  durationSeconds?: number;
  filename: string;
  height?: number;
  id: string;
  mimeType: string;
  originalFilename: string;
  previewUrl?: string;
  sizeBytes: number;
  status: MediaStatus;
  type: MediaType;
  updatedAt: string;
  width?: number;
}

export interface UploadUrlRequest {
  filename: string;
  mimeType: string;
  originalFilename: string;
  sizeBytes: number;
  type: MediaType;
}

export interface UploadUrlResponse {
  mediaAssetId: string;
  requiredHeaders: Record<string, string>;
  uploadMethod: "PUT";
  uploadUrl: string;
}
