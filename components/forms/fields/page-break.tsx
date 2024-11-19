"use client";

import { FormField } from "@/types/form";
import { cn } from "@/lib/utils";

interface PageBreakProps {
  field: FormField;
  preview?: boolean;
  onEdit?: () => void;
}

export function PageBreak({ field, preview = false, onEdit }: PageBreakProps) {
  if (preview) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <div className="relative py-4 group" onClick={handleClick}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-neutral-200" />
      </div>
      <div className="relative text-center">
        <span
          className={cn(
            "inline-block px-4 text-sm font-medium bg-white",
            !field.settings?.stepTitle && "text-neutral-400",
            "group-hover:bg-neutral-50 transition-colors"
          )}
        >
          {field.settings?.stepTitle || "Page Break"}
        </span>
      </div>
    </div>
  );
}