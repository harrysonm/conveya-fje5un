"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useId } from "react";

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
  className
}: ToggleProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div 
      className={cn(
        "flex items-center justify-between gap-4 py-1.5",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="space-y-0.5">
        <Label 
          htmlFor={id}
          className="text-sm font-medium leading-none cursor-pointer"
        >
          {label}
        </Label>
        {description && (
          <p 
            id={descriptionId}
            className="text-xs text-neutral-500 leading-relaxed"
          >
            {description}
          </p>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={(value) => {
          if (!disabled) {
            onCheckedChange(value);
          }
        }}
        disabled={disabled}
        aria-label={label}
        aria-describedby={descriptionId}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
}