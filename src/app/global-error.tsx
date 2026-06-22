"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="grid min-h-screen place-items-center bg-slate-950 p-6 text-center text-white">
        <div>
          <h1 className="text-3xl font-semibold">
            ScreenLink hit an unexpected error
          </h1>
          <p className="mt-3 text-slate-400">
            No sensitive details were exposed. You can safely retry.
          </p>
          <Button className="mt-6" onClick={reset}>
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
