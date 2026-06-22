import { AlertTriangle, Inbox, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

interface StatePanelProps {
  title: string;
  description: string;
  kind?: "empty" | "error";
  action?: ReactNode;
  onRetry?: () => void;
}

export function StatePanel({
  title,
  description,
  kind = "empty",
  action,
  onRetry,
}: StatePanelProps) {
  const Icon = kind === "error" ? AlertTriangle : Inbox;
  return (
    <Card className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
      <div className="mb-5 grid size-14 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300">
        <Icon aria-hidden className="size-6" />
      </div>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
        {description}
      </p>
      <div className="mt-6">
        {onRetry ? (
          <Button variant="secondary" onClick={onRetry}>
            <RotateCcw aria-hidden className="size-4" /> Try again
          </Button>
        ) : (
          action
        )}
      </div>
    </Card>
  );
}
