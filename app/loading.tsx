import { PageSkeleton } from "@/components/skeletons/page-skeleton";
import { FormCardSkeleton } from "@/components/skeletons/form-card-skeleton";
import { HeaderSkeleton } from "@/components/skeletons/header-skeleton";

export default function Loading() {
  return (
    <PageSkeleton header={<HeaderSkeleton />}>
      <div className="flex-1 overflow-y-auto">
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <FormCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </PageSkeleton>
  );
}