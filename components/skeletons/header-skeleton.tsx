"use client";

import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between px-5 py-2 border-b border-neutral-100">
      <div className="flex items-center gap-1.5">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-7 w-7"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="flex items-center gap-1">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
    </div>
  );
}