import { Plus } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { ScreensGrid } from "@/features/screens/components/screens-grid";

export const metadata = { title: "Screens" };
export default function ScreensPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Display fleet"
        title="Your screens"
        description="Monitor every connected TV and open its control center."
        action={
          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-400 px-4 text-sm font-semibold text-slate-950"
            href="/pair"
          >
            <Plus aria-hidden className="size-4" /> Pair a TV
          </Link>
        }
      />
      <ScreensGrid />
    </div>
  );
}
