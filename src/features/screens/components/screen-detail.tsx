"use client";

import { Clock3, Cpu, MonitorSmartphone } from "lucide-react";
import { StatePanel } from "@/components/feedback/state-panel";
import { Skeleton } from "@/components/feedback/skeleton";
import { StatusBadge } from "@/components/status/status-badge";
import { Card } from "@/components/ui/card";
import { CommandCenter } from "@/features/commands/components/command-center";
import { useScreen } from "../hooks/use-screens";
import { formatLastSeen } from "../utils/format-last-seen";

export function ScreenDetail({ screenId }: { screenId: string }) {
  const query = useScreen(screenId);
  if (query.isPending)
    return (
      <div className="space-y-5">
        <Skeleton className="h-64" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-56" />
          <Skeleton className="h-56" />
        </div>
      </div>
    );
  if (query.isError)
    return (
      <StatePanel
        kind="error"
        title="Screen unavailable"
        description="This display could not be loaded. It may have been removed or the API is unavailable."
        onRetry={() => query.refetch()}
      />
    );
  const screen = query.data;
  return (
    <div className="space-y-9">
      <Card className="relative overflow-hidden p-6 sm:p-8">
        <div
          aria-hidden
          className="absolute -top-20 -right-16 size-64 rounded-full bg-cyan-400/[.08] blur-3xl"
        />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <StatusBadge status={screen.status} />
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              {screen.name}
            </h1>
            <p className="mt-2 text-slate-400">{screen.deviceName}</p>
          </div>
          <div className="grid gap-3 text-sm sm:min-w-72">
            <div className="flex items-center gap-3 rounded-xl bg-white/[.04] p-3">
              <Cpu aria-hidden className="size-4 text-cyan-300" />
              <span className="text-slate-500">Model</span>
              <span className="ml-auto text-white">{screen.deviceModel}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[.04] p-3">
              <MonitorSmartphone aria-hidden className="size-4 text-cyan-300" />
              <span className="text-slate-500">Platform</span>
              <span className="ml-auto text-white">{screen.platform}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[.04] p-3">
              <Clock3 aria-hidden className="size-4 text-cyan-300" />
              <span className="text-slate-500">Last seen</span>
              <span className="ml-auto text-white">
                {formatLastSeen(screen.lastSeenAt)}
              </span>
            </div>
          </div>
        </div>
      </Card>
      <CommandCenter screenId={screenId} />
    </div>
  );
}
