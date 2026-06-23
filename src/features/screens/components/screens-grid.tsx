"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { StatePanel } from "@/components/feedback/state-panel";
import { Skeleton } from "@/components/feedback/skeleton";
import { useScreens } from "../hooks/use-screens";
import { ScreenCard } from "./screen-card";

export function ScreensGrid({ limit }: { limit?: number }) {
  const query = useScreens();
  if (query.isPending)
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: limit ?? 6 }, (_, index) => (
          <Skeleton key={index} className="h-60" />
        ))}
      </div>
    );
  if (query.isError)
    return (
      <StatePanel
        kind="error"
        title="Screens are unavailable"
        description="We could not load your displays from the ScreenLink API."
        onRetry={() => query.refetch()}
      />
    );
  const screens = limit ? query.data.slice(0, limit) : query.data;
  if (!screens.length)
    return (
      <StatePanel
        title="No screens paired yet"
        description="Pair your first Google TV to start controlling content from this dashboard."
        action={
          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-400 px-4 font-semibold text-slate-950"
            href="/pair"
          >
            <Plus aria-hidden className="size-4" /> Pair a TV
          </Link>
        }
      />
    );
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {screens.map((screen) => (
        <ScreenCard key={screen.id} screen={screen} />
      ))}
    </div>
  );
}
