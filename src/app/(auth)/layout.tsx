import { MonitorPlay } from "lucide-react";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-cyan-400/[.08] blur-3xl"
      />
      <div className="relative flex w-full max-w-md flex-col items-center gap-7">
        <div className="flex items-center gap-3 text-white">
          <span className="grid size-11 place-items-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20">
            <MonitorPlay aria-hidden className="size-6" />
          </span>
          <span className="text-xl font-semibold tracking-tight">
            ScreenLink
          </span>
        </div>
        {children}
      </div>
    </main>
  );
}
