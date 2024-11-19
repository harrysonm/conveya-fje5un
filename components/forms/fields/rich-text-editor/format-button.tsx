"use client";

import { forwardRef } from "react";
import { ToggleItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FormatButtonProps {
  format: string;
  icon: LucideIcon;
  label: string;
  shortcut: string;
  onClick: () => void;
  isActive: boolean;
}

export const FormatButton = forwardRef<HTMLButtonElement, FormatButtonProps>(({
  format,
  icon: Icon,
  label,
  shortcut,
  onClick,
  isActive
}, ref) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ToggleItem
          ref={ref}
          value={format}
          aria-label={label}
          className={cn(
            "h-8 w-8 p-0 data-[state=on]:bg-neutral-200",
            isActive && "bg-neutral-200"
          )}
          onClick={onClick}
        >
          <Icon className="h-4 w-4" />
        </ToggleItem>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="flex items-center gap-2">
          <span>{label}</span>
          <kbd className="text-xs bg-neutral-100 px-1 rounded">
            {shortcut}
          </kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
});

FormatButton.displayName = "FormatButton";