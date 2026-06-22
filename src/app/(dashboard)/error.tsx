"use client";

import { StatePanel } from "@/components/feedback/state-panel";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <StatePanel
      kind="error"
      title="This view could not be loaded"
      description="Your account and devices are safe. Retry the request when you are ready."
      onRetry={reset}
    />
  );
}
