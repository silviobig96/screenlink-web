"use client";

import { QueryProvider } from "@/lib/query/query-provider";
import { type ReactNode } from "react";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <Toaster theme="dark" richColors position="top-center" />
    </QueryProvider>
  );
}
