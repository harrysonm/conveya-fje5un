"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ThemeSelectProps {
  label: string;
  description?: string;
  options: Array<{ id: string; name: string; value: string; description?: string }>;
  value: string;
  onChange: (value: string) => void;
}

export function ThemeSelect({
  label,
  description,
  options,
  value,
  onChange
}: ThemeSelectProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1">
        <Label>{label}</Label>
        {description && (
          <span className="text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem 
              key={option.id} 
              value={option.value}
              className="flex flex-col items-start py-2"
            >
              <span>{option.name}</span>
              {option.description && (
                <span className="text-xs text-muted-foreground">
                  {option.description}
                </span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}