import { PageSkeleton } from "@/components/skeletons/page-skeleton";
import { HeaderSkeleton } from "@/components/skeletons/header-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewFormLoading() {
  return (
    <PageSkeleton header={<HeaderSkeleton />}>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[640px] mx-auto px-5 py-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>

            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}

            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </PageSkeleton>
  );
}