"use client";

import { forwardRef } from "react";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  value: string;
  label: string;
  shortcut: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ value, label, shortcut, icon: Icon, onClick }, ref) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem
            ref={ref}
            value={value}
            size="sm"
            className="h-8 w-8 p-0"
            aria-label={label}
            onClick={onClick}
          >
            <Icon className="h-4 w-4" />
          </ToggleGroupItem>
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
  }
);