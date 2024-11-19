"use client";

import { PageSkeleton } from "@/components/skeletons/page-skeleton";
import { HeaderSkeleton } from "@/components/skeletons/header-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <PageSkeleton header={<HeaderSkeleton />}>
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-2xl">
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-2/3" />
                  <Skeleton className="h-10 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSkeleton>
  );
}