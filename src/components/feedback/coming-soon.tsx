import { ArrowRight, type LucideIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export function ComingSoon({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card className="relative min-h-[28rem] overflow-hidden p-7 sm:p-10">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 size-80 rounded-full bg-violet-500/10 blur-3xl"
      />
      <div className="relative flex h-full max-w-xl flex-col justify-center">
        <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/15 to-violet-400/15 text-cyan-300 ring-1 ring-white/10">
          <Icon aria-hidden className="size-7" />
        </div>
        <span className="mt-8 flex items-center gap-2 text-xs font-bold tracking-[.2em] text-violet-300 uppercase">
          <Sparkles aria-hidden className="size-4" /> Coming soon
        </span>
        <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
        <p className="mt-3 text-base leading-7 text-slate-400">{description}</p>
        <Link
          href="/screens"
          className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[.05] px-4 text-sm font-semibold text-white hover:bg-white/10"
        >
          Control a screen <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </Card>
  );
}
