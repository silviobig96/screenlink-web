import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-base text-white transition outline-none placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10",
        className,
      )}
      {...props}
    />
  );
}
