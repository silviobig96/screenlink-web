import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <p className="text-sm font-bold tracking-[.25em] text-cyan-300 uppercase">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          This screen is out of range
        </h1>
        <p className="mt-3 text-slate-400">
          The page you requested does not exist.
        </p>
        <Link
          className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-400 px-5 font-semibold text-slate-950"
          href="/dashboard"
        >
          <ArrowLeft aria-hidden className="size-4" /> Back to dashboard
        </Link>
      </div>
    </main>
  );
}
