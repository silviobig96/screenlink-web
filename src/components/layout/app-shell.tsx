import { UserButton } from "@clerk/nextjs";
import { MonitorPlay, Radio } from "lucide-react";
import type { ReactNode } from "react";
import { DesktopNavigation, MobileNavigation } from "./navigation";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/[.07] bg-slate-950/50 p-5 backdrop-blur-xl lg:flex lg:flex-col">
        <div className="flex items-center gap-3 px-2 text-white">
          <span className="grid size-10 place-items-center rounded-xl bg-cyan-400 text-slate-950">
            <MonitorPlay aria-hidden className="size-5" />
          </span>
          <div>
            <p className="font-semibold tracking-tight">ScreenLink</p>
            <p className="text-[11px] text-slate-500">Control center</p>
          </div>
        </div>
        <DesktopNavigation />
        <div className="mt-auto rounded-2xl border border-emerald-400/10 bg-emerald-400/[.04] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
            <Radio aria-hidden className="size-4" /> API ready
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Commands are secured with your Clerk session.
          </p>
        </div>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/[.06] bg-[#050914]/75 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 lg:hidden">
            <MonitorPlay aria-hidden className="size-5 text-cyan-300" />
            <span className="font-semibold text-white">ScreenLink</span>
          </div>
          <p className="hidden text-sm text-slate-500 lg:block">
            Your displays, connected.
          </p>
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: "flex-row-reverse text-slate-300",
                avatarBox: "size-9",
              },
            }}
          />
        </header>
        <main className="mx-auto max-w-[1500px] px-4 pt-7 pb-28 sm:px-6 lg:px-8 lg:pt-10 lg:pb-12">
          {children}
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
