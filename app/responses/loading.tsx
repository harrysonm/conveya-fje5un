import { PageSkeleton } from "@/components/skeletons/page-skeleton";
import { HeaderSkeleton } from "@/components/skeletons/header-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResponsesLoading() {
  return (
    <PageSkeleton header={<HeaderSkeleton />}>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-10 w-[240px]" />
            <Skeleton className="h-5 w-24" />
          </div>

          <div className="border rounded-md">
            <div className="border-b p-3">
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6" />
                ))}
              </div>
            </div>
            <div className="divide-y">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-3">
                  <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, j) => (
                      <Skeleton key={j} className="h-5" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageSkeleton>
  );
}