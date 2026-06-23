import type { ApiClient } from "@/lib/api/api-client.types";
import {
  mediaAssetSchema,
  mediaListSchema,
  mediaTypeForFile,
  uploadUrlResponseSchema,
} from "../schemas/media.schema";
import type {
  MediaAsset,
  UploadUrlRequest,
  UploadUrlResponse,
} from "../types/media.types";

function uploadToSignedUrl(
  upload: UploadUrlResponse,
  file: File,
  onProgress?: (progress: number) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(upload.uploadMethod, upload.uploadUrl);
    for (const [key, value] of Object.entries(upload.requiredHeaders)) {
      request.setRequestHeader(key, value);
    }
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress?.(Math.round((event.loaded / event.total) * 100));
      }
    };
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) resolve();
      else reject(new Error("Upload failed"));
    };
    request.onerror = () => reject(new Error("Upload failed"));
    request.send(file);
  });
}

export const mediaService = {
  complete: (client: ApiClient, mediaAssetId: string) =>
    client.request<MediaAsset, Record<string, never>>(
      `/media/${encodeURIComponent(mediaAssetId)}/complete`,
      {
        method: "POST",
        body: {},
        schema: mediaAssetSchema,
      },
    ),
  delete: (client: ApiClient, mediaAssetId: string) =>
    client.request<void>(`/media/${encodeURIComponent(mediaAssetId)}`, {
      method: "DELETE",
    }),
  list: (client: ApiClient) =>
    client.request<MediaAsset[]>("/media", { schema: mediaListSchema }),
  requestUploadUrl: (client: ApiClient, body: UploadUrlRequest) =>
    client.request<UploadUrlResponse, UploadUrlRequest>("/media/upload-url", {
      method: "POST",
      body,
      schema: uploadUrlResponseSchema,
    }),
  uploadFile: async (
    client: ApiClient,
    file: File,
    onProgress?: (progress: number) => void,
  ) => {
    const upload = await mediaService.requestUploadUrl(client, {
      filename: file.name,
      mimeType: file.type,
      originalFilename: file.name,
      sizeBytes: file.size,
      type: mediaTypeForFile(file),
    });
    await uploadToSignedUrl(upload, file, onProgress);
    return mediaService.complete(client, upload.mediaAssetId);
  },
};
