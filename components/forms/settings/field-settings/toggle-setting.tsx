"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ToggleSettingProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function ToggleSetting({
  label,
  checked,
  onCheckedChange,
  description,
  disabled = false,
  className
}: ToggleSettingProps) {
  const id = `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="space-y-0.5">
        <Label 
          htmlFor={id}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
        </Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-label={label}
        aria-describedby={description ? `${id}-description` : undefined}
      />
    </div>
  );
}