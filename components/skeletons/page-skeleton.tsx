"use client";

import { Sidebar } from "@/components/layout/sidebar";

interface PageSkeletonProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageSkeleton({ header, children }: PageSkeletonProps) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        {header}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}