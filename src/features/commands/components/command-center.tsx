"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eraser, Image, LoaderCircle, Radio, Send, Video } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMediaLibrary } from "@/features/media/hooks/use-media";
import { formatBytes } from "@/features/media/utils/format-bytes";
import { getErrorMessage } from "@/lib/api/api-error";
import {
  mediaUrlSchema,
  type MediaUrlFormValues,
} from "../schemas/command.schema";
import {
  buildClearScreenCommand,
  buildDisplayImageCommand,
  buildDisplayImageMediaCommand,
  buildDisplayVideoCommand,
  buildDisplayVideoMediaCommand,
  buildPingCommand,
} from "../services/command-builders";
import { useSendCommand } from "../hooks/use-send-command";
import type { CommandRequest } from "../types/command.types";

function QuickAction({
  icon: Icon,
  title,
  description,
  disabled,
  onClick,
  danger,
}: {
  icon: typeof Radio;
  title: string;
  description: string;
  disabled: boolean;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="group flex min-h-28 items-center gap-4 rounded-2xl border border-white/[.08] bg-white/[.035] p-4 text-left transition hover:border-cyan-300/20 hover:bg-white/[.06] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none disabled:opacity-50"
    >
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-xl ${danger ? "bg-rose-400/10 text-rose-300" : "bg-cyan-400/10 text-cyan-300"}`}
      >
        <Icon aria-hidden className="size-5" />
      </span>
      <span>
        <span className="block font-semibold text-white">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-slate-500">
          {description}
        </span>
      </span>
    </button>
  );
}

function MediaCommandForm({
  screenId,
  type,
}: {
  screenId: string;
  type: "image" | "video";
}) {
  const mutation = useSendCommand(screenId);
  const mediaQuery = useMediaLibrary();
  const [selectedMediaAssetId, setSelectedMediaAssetId] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MediaUrlFormValues>({
    resolver: zodResolver(mediaUrlSchema),
    defaultValues: { url: "" },
  });
  const Icon = type === "image" ? Image : Video;
  const libraryItems = useMemo(
    () =>
      (mediaQuery.data ?? []).filter(
        (asset) => asset.type === type && asset.status === "ready",
      ),
    [mediaQuery.data, type],
  );
  const submit = ({ url }: MediaUrlFormValues) =>
    mutation.mutate(
      type === "image"
        ? buildDisplayImageCommand(url)
        : buildDisplayVideoCommand(url),
      {
        onSuccess: () => {
          toast.success(`${type === "image" ? "Image" : "Video"} command sent`);
          reset();
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );
  const sendSelectedMedia = () => {
    if (!selectedMediaAssetId) {
      toast.error(`Choose a ${type} from the library first.`);
      return;
    }
    mutation.mutate(
      type === "image"
        ? buildDisplayImageMediaCommand(selectedMediaAssetId)
        : buildDisplayVideoMediaCommand(selectedMediaAssetId),
      {
        onSuccess: () =>
          toast.success(`${type === "image" ? "Image" : "Video"} command sent`),
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );
  };
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
          <Icon aria-hidden className="size-5" />
        </span>
        <div>
          <h3 className="font-semibold text-white">Display {type}</h3>
          <p className="text-xs text-slate-500">
            Send a public http or https URL
          </p>
        </div>
      </div>
      <form className="mt-5 space-y-3" onSubmit={handleSubmit(submit)}>
        <label className="sr-only" htmlFor={`${type}-url`}>
          {type} URL
        </label>
        <Input
          id={`${type}-url`}
          inputMode="url"
          autoComplete="url"
          placeholder={`https://example.com/${type}.${type === "image" ? "jpg" : "mp4"}`}
          {...register("url")}
        />
        {errors.url && (
          <p role="alert" className="text-xs text-rose-300">
            {errors.url.message}
          </p>
        )}
        <Button
          className="w-full"
          variant="secondary"
          disabled={mutation.isPending}
          type="submit"
        >
          {mutation.isPending ? (
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden className="size-4" />
          )}{" "}
          Send {type}
        </Button>
      </form>
      <div className="mt-5 border-t border-white/[.08] pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold text-white">
              Choose from library
            </h4>
            <p className="text-xs text-slate-500">
              Send uploaded {type} media without pasting a URL.
            </p>
          </div>
          {mediaQuery.isFetching && (
            <LoaderCircle
              aria-label="Loading media"
              className="size-4 animate-spin text-slate-500"
            />
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor={`${type}-media-asset`}>
            {type} from library
          </label>
          <select
            id={`${type}-media-asset`}
            value={selectedMediaAssetId}
            onChange={(event) => setSelectedMediaAssetId(event.target.value)}
            className="h-11 w-full rounded-xl border border-white/[.08] bg-slate-950 px-3 text-sm text-white transition outline-none focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={libraryItems.length === 0 || mutation.isPending}
          >
            <option value="">
              {libraryItems.length === 0
                ? `No uploaded ${type}s ready`
                : `Select a ${type}`}
            </option>
            {libraryItems.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.filename} · {formatBytes(asset.sizeBytes)}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant="secondary"
            disabled={
              mutation.isPending ||
              libraryItems.length === 0 ||
              !selectedMediaAssetId
            }
            onClick={sendSelectedMedia}
          >
            {mutation.isPending ? (
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
            ) : (
              <Send aria-hidden className="size-4" />
            )}{" "}
            Send selected
          </Button>
        </div>
        {mediaQuery.isError && (
          <p role="alert" className="mt-3 text-xs text-rose-300">
            Media library could not be loaded.
          </p>
        )}
      </div>
    </Card>
  );
}

export function CommandCenter({ screenId }: { screenId: string }) {
  const mutation = useSendCommand(screenId);
  const send = (command: CommandRequest, label: string) =>
    mutation.mutate(command, {
      onSuccess: () => toast.success(`${label} command sent`),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  return (
    <section aria-labelledby="command-heading">
      <div className="mb-4">
        <h2 id="command-heading" className="text-xl font-semibold text-white">
          Command center
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Actions are delivered to this TV in real time.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <QuickAction
          icon={Radio}
          title="Ping device"
          description="Check whether this TV is responding."
          disabled={mutation.isPending}
          onClick={() => send(buildPingCommand(), "Ping")}
        />
        <QuickAction
          icon={Eraser}
          title="Clear screen"
          description="Immediately stop content and clear the display."
          danger
          disabled={mutation.isPending}
          onClick={() => send(buildClearScreenCommand(), "Clear screen")}
        />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <MediaCommandForm screenId={screenId} type="image" />
        <MediaCommandForm screenId={screenId} type="video" />
      </div>
    </section>
  );
}
