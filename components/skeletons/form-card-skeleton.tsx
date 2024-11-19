"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function FormCardSkeleton() {
  return (
    <div className="rounded-md border border-neutral-200 bg-white overflow-hidden">
      <div className="h-[144px] bg-neutral-50" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}