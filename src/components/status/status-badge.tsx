import {
  Activity,
  CircleAlert,
  CircleOff,
  LoaderCircle,
  Pause,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ScreenStatus } from "@/features/screens/types/screen.types";

const statusStyles: Record<ScreenStatus, string> = {
  online: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  offline: "bg-slate-400/10 text-slate-400 ring-slate-400/20",
  idle: "bg-amber-400/10 text-amber-200 ring-amber-400/20",
  playing: "bg-violet-400/10 text-violet-300 ring-violet-400/20",
  syncing: "bg-cyan-400/10 text-cyan-300 ring-cyan-400/20",
  error: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
};

const icons = {
  online: Activity,
  offline: CircleOff,
  idle: Pause,
  playing: Play,
  syncing: LoaderCircle,
  error: CircleAlert,
};

export function StatusBadge({ status }: { status: ScreenStatus }) {
  const Icon = icons[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset",
        statusStyles[status],
      )}
    >
      <Icon
        aria-hidden
        className={cn("size-3.5", status === "syncing" && "animate-spin")}
      />
      {status}
    </span>
  );
}
