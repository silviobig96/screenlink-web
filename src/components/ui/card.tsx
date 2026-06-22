import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/[.08] bg-slate-900/65 shadow-[0_24px_80px_-36px_rgba(2,8,23,.9)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
