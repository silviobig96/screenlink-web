import { ArrowUpRight, Clock3, Monitor } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/status/status-badge";
import type { Screen } from "../types/screen.types";
import { formatLastSeen } from "../utils/format-last-seen";

export function ScreenCard({ screen }: { screen: Screen }) {
  return (
    <Link
      href={`/screens/${encodeURIComponent(screen.id)}`}
      className="group block rounded-3xl focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
    >
      <Card className="h-full p-5 transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-300/20 group-hover:bg-slate-900/90">
        <div className="flex items-start justify-between gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/15 to-violet-400/10 text-cyan-300">
            <Monitor aria-hidden className="size-6" />
          </div>
          <StatusBadge status={screen.status} />
        </div>
        <h2 className="mt-6 truncate text-lg font-semibold text-white">
          {screen.name}
        </h2>
        <p className="mt-1 truncate text-sm text-slate-400">
          {screen.deviceName} · {screen.deviceModel}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/[.06] pt-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock3 aria-hidden className="size-3.5" />{" "}
            {formatLastSeen(screen.lastSeenAt)}
          </span>
          <ArrowUpRight
            aria-hidden
            className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300"
          />
        </div>
      </Card>
    </Link>
  );
}
