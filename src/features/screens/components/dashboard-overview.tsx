"use client";

import {
  ArrowRight,
  Monitor,
  MonitorCheck,
  MonitorX,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/feedback/skeleton";
import { StatePanel } from "@/components/feedback/state-panel";
import { useScreens } from "../hooks/use-screens";
import { ScreenCard } from "./screen-card";

export function DashboardOverview() {
  const query = useScreens();
  if (query.isPending)
    return (
      <div className="space-y-7">
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-36" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  if (query.isError)
    return (
      <StatePanel
        kind="error"
        title="Dashboard data is unavailable"
        description="ScreenLink could not load the latest display status."
        onRetry={() => query.refetch()}
      />
    );
  const screens = query.data;
  const online = screens.filter((screen) =>
    ["online", "idle", "playing", "syncing"].includes(screen.status),
  ).length;
  const stats = [
    {
      label: "Total screens",
      value: screens.length,
      icon: Monitor,
      style: "text-cyan-300 bg-cyan-400/10",
    },
    {
      label: "Online now",
      value: online,
      icon: MonitorCheck,
      style: "text-emerald-300 bg-emerald-400/10",
    },
    {
      label: "Offline",
      value: screens.filter((screen) => screen.status === "offline").length,
      icon: MonitorX,
      style: "text-slate-300 bg-slate-400/10",
    },
  ];
  return (
    <div className="space-y-8">
      <section
        aria-label="Screen summary"
        className="grid gap-4 sm:grid-cols-3"
      >
        {stats.map(({ label, value, icon: Icon, style }) => (
          <Card key={label} className="p-5">
            <div
              className={`grid size-11 place-items-center rounded-xl ${style}`}
            >
              <Icon aria-hidden className="size-5" />
            </div>
            <p className="mt-5 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
          </Card>
        ))}
      </section>
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Recent screens</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your latest connected displays.
            </p>
          </div>
          <Link
            className="hidden items-center gap-1 text-sm font-semibold text-cyan-300 hover:text-cyan-200 sm:flex"
            href="/screens"
          >
            View all <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        {screens.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {screens.slice(0, 3).map((screen) => (
              <ScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        ) : (
          <StatePanel
            title="Connect your first screen"
            description="Pair a Google TV to bring your ScreenLink dashboard to life."
            action={
              <Link
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-400 px-4 font-semibold text-slate-950"
                href="/pair"
              >
                <Plus aria-hidden className="size-4" /> Pair a TV
              </Link>
            }
          />
        )}
      </section>
    </div>
  );
}
