import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { DashboardOverview } from "@/features/screens/components/dashboard-overview";

export const metadata = { title: "Dashboard" };
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Control center"
        title="Everything is in view"
        description="Keep every display connected, current, and ready for the next command."
      />
      <Card className="relative overflow-hidden border-cyan-300/10 bg-gradient-to-br from-cyan-400/[.09] via-slate-900/70 to-violet-400/[.08] p-6 sm:p-8">
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cyan-400 text-slate-950">
              <Sparkles aria-hidden className="size-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Ready to connect a TV?
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                Enter the six-digit code from ScreenLink on your Google TV.
                Pairing takes only a moment.
              </p>
            </div>
          </div>
          <Link
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 font-semibold text-slate-950 transition hover:bg-cyan-50"
            href="/pair"
          >
            Pair a TV <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </Card>
      <DashboardOverview />
    </div>
  );
}
