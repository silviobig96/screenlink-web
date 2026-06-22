import { Skeleton } from "@/components/feedback/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-7">
      <Skeleton className="h-24 w-full" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
      <Skeleton className="h-72" />
    </div>
  );
}
