"use client";

import { Button } from "@/components/ui/button";
import { X, RotateCcw } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SettingsHeaderProps {
  onDismiss: () => void;
  onReset: () => void;
  fieldType: string;
}

export function SettingsHeader({ onDismiss, onReset, fieldType }: SettingsHeaderProps) {
  const formatFieldType = (type: string) => {
    // Convert kebab-case to sentence case
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  return (
    <div className="flex items-center justify-between px-6 h-[56px] border-b border-neutral-100">
      <div className="text-base font-medium text-neutral-900">
        {formatFieldType(fieldType)} Settings
      </div>
      <TooltipProvider>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onReset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset settings</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onDismiss}
              >
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Close settings</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}