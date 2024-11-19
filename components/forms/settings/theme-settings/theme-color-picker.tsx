"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ThemeColor } from "@/stores/theme-store";

interface ThemeColorPickerProps {
  label: string;
  colors: { name: string; value: string; textColor?: string }[];
  value?: string;
  onChange: (color: any) => void;
}

export function ThemeColorPicker({
  label,
  colors,
  value,
  onChange
}: ThemeColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-8 gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            className={cn(
              "h-8 w-8 rounded-md border border-neutral-200",
              "focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
              "transition-transform hover:scale-110"
            )}
            style={{ 
              backgroundColor: color.value,
              color: color.textColor || '#000000'
            }}
            onClick={() => onChange(color)}
            type="button"
          >
            {value === color.value && (
              <Check className="h-4 w-4 mx-auto" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}