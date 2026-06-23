"use client";

import { Image, LoaderCircle, Trash2, UploadCloud, Video } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatePanel } from "@/components/feedback/state-panel";
import { Skeleton } from "@/components/feedback/skeleton";
import { getErrorMessage } from "@/lib/api/api-error";
import {
  useDeleteMedia,
  useMediaLibrary,
  useUploadMedia,
} from "../hooks/use-media";
import { validateUploadFile } from "../schemas/media.schema";
import { formatBytes } from "../utils/format-bytes";

function mediaExtension(filename: string, mimeType: string) {
  const extension = filename.split(".").pop();
  if (extension && extension !== filename) return extension.toUpperCase();
  return mimeType.split("/").pop()?.toUpperCase() ?? "MEDIA";
}

function formatUploadedDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function MediaCard({
  asset,
  onDelete,
  deleting,
}: {
  asset: {
    createdAt: string;
    filename: string;
    id: string;
    mimeType: string;
    previewUrl?: string;
    sizeBytes: number;
    status: string;
    type: "image" | "video";
  };
  deleting: boolean;
  onDelete: () => void;
}) {
  const Icon = asset.type === "image" ? Image : Video;
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-slate-950">
        {asset.type === "image" && asset.previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset.previewUrl}
            alt=""
            className="size-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="grid size-full place-items-center bg-cyan-400/[.04] text-cyan-300">
            <Icon aria-hidden className="size-8" />
          </div>
        )}
        <div className="absolute top-3 left-3 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {mediaExtension(asset.filename, asset.mimeType)}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate font-semibold text-white">
              {asset.filename}
            </h2>
            <p className="mt-1 text-xs text-slate-500">{asset.mimeType}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            disabled={deleting}
            aria-label={`Delete ${asset.filename}`}
          >
            {deleting ? (
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
            ) : (
              <Trash2 aria-hidden className="size-4" />
            )}
          </Button>
        </div>
        <div className="mt-5 grid gap-2 border-t border-white/[.06] pt-4 text-xs text-slate-500">
          <div className="flex items-center justify-between gap-3">
            <span className="capitalize">{asset.status.replace("_", " ")}</span>
            <span>{formatBytes(asset.sizeBytes)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="capitalize">{asset.type}</span>
            <span>{formatUploadedDate(asset.createdAt)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function MediaLibrary() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const media = useMediaLibrary();
  const upload = useUploadMedia();
  const remove = useDeleteMedia();

  const handleFile = (file: File) => {
    const error = validateUploadFile(file);
    if (error) {
      toast.error(error);
      return;
    }
    setProgress(0);
    upload.mutate(
      { file, onProgress: setProgress },
      {
        onError: (mutationError) => toast.error(getErrorMessage(mutationError)),
        onSettled: () => setProgress(null),
        onSuccess: () => toast.success("Media uploaded"),
      },
    );
  };

  const onDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const [file] = Array.from(event.dataTransfer.files);
    if (file) handleFile(file);
  };

  if (media.isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-52" />
        ))}
      </div>
    );
  }
  if (media.isError) {
    return (
      <StatePanel
        kind="error"
        title="Media unavailable"
        description="The media library could not be loaded."
        onRetry={() => media.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
          className="flex min-h-44 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-300/30 bg-cyan-400/[.04] p-6 text-center transition hover:bg-cyan-400/[.07] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
        >
          <UploadCloud aria-hidden className="size-9 text-cyan-300" />
          <span className="mt-4 font-semibold text-white">
            Upload image or video
          </span>
          <span className="mt-1 text-sm text-slate-500">
            Drop a file here or choose from your device.
          </span>
          {progress !== null && (
            <span className="mt-4 text-sm text-cyan-200">
              Uploading {progress}%
            </span>
          )}
        </button>
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime,video/x-m4v"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) handleFile(file);
            event.currentTarget.value = "";
          }}
        />
      </Card>
      {media.data.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {media.data.map((asset) => (
            <MediaCard
              key={asset.id}
              asset={asset}
              deleting={remove.isPending}
              onDelete={() =>
                remove.mutate(asset.id, {
                  onError: (error) => toast.error(getErrorMessage(error)),
                  onSuccess: () => toast.success("Media deleted"),
                })
              }
            />
          ))}
        </div>
      ) : (
        <StatePanel
          title="No media uploaded yet"
          description="Upload TV-ready images and videos, then send them from a screen control center."
        />
      )}
    </div>
  );
}
