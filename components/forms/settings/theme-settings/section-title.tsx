"use client";

import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  description?: string;
  className?: string;
}

export function SectionTitle({ children, description, className }: SectionTitleProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h3 className="text-sm font-medium text-neutral-900">
        {children}
      </h3>
      {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}