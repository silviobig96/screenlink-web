import { afterEach, describe, expect, it, vi } from "vitest";
import type { ApiClient } from "@/lib/api/api-client.types";
import { mediaService } from "./media.service";

const readyAsset = {
  createdAt: "2026-06-23T00:00:00.000Z",
  filename: "image.jpg",
  id: "media-1",
  mimeType: "image/jpeg",
  originalFilename: "image.jpg",
  previewUrl: "https://signed.example.com/image.jpg",
  sizeBytes: 1024,
  status: "ready",
  type: "image",
  updatedAt: "2026-06-23T00:00:00.000Z",
};

class MockXMLHttpRequest {
  static instances: MockXMLHttpRequest[] = [];

  headers: Record<string, string> = {};
  method = "";
  onerror: (() => void) | null = null;
  onload: (() => void) | null = null;
  status = 200;
  upload: {
    onprogress: ((event: ProgressEvent) => void) | null;
  } = { onprogress: null };
  url = "";

  constructor() {
    MockXMLHttpRequest.instances.push(this);
  }

  open(method: string, url: string) {
    this.method = method;
    this.url = url;
  }

  setRequestHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  send() {
    this.upload.onprogress?.({
      lengthComputable: true,
      loaded: 50,
      total: 100,
    } as ProgressEvent);
    this.onload?.();
  }
}

describe("mediaService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    MockXMLHttpRequest.instances = [];
  });

  it("uploads through a signed URL and completes the asset", async () => {
    vi.stubGlobal("XMLHttpRequest", MockXMLHttpRequest);
    const request = vi
      .fn<ApiClient["request"]>()
      .mockResolvedValueOnce({
        mediaAssetId: "media-1",
        requiredHeaders: { "Content-Type": "image/jpeg" },
        uploadMethod: "PUT",
        uploadUrl: "https://uploads.example.com/signed",
      })
      .mockResolvedValueOnce(readyAsset);
    const client = { request };
    const progress = vi.fn();
    const file = new File(["image"], "image.jpg", { type: "image/jpeg" });

    await expect(
      mediaService.uploadFile(client, file, progress),
    ).resolves.toEqual(readyAsset);

    expect(request).toHaveBeenNthCalledWith(1, "/media/upload-url", {
      body: {
        filename: "image.jpg",
        mimeType: "image/jpeg",
        originalFilename: "image.jpg",
        sizeBytes: file.size,
        type: "image",
      },
      method: "POST",
      schema: expect.any(Object),
    });
    expect(MockXMLHttpRequest.instances[0]).toMatchObject({
      headers: { "Content-Type": "image/jpeg" },
      method: "PUT",
      url: "https://uploads.example.com/signed",
    });
    expect(progress).toHaveBeenCalledWith(50);
    expect(request).toHaveBeenNthCalledWith(2, "/media/media-1/complete", {
      body: {},
      method: "POST",
      schema: expect.any(Object),
    });
  });

  it("maps media list and delete requests", async () => {
    const request = vi
      .fn<ApiClient["request"]>()
      .mockResolvedValueOnce([readyAsset])
      .mockResolvedValueOnce(undefined);
    const client = { request };

    await expect(mediaService.list(client)).resolves.toEqual([readyAsset]);
    await expect(
      mediaService.delete(client, "media-1"),
    ).resolves.toBeUndefined();

    expect(request).toHaveBeenNthCalledWith(1, "/media", {
      schema: expect.any(Object),
    });
    expect(request).toHaveBeenNthCalledWith(2, "/media/media-1", {
      method: "DELETE",
    });
  });
});
