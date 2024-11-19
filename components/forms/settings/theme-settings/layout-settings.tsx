"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LayoutSettingsProps {
  borderRadius: string;
  spacing: string;
  onBorderRadiusChange: (value: string) => void;
  onSpacingChange: (value: string) => void;
}

const BORDER_RADIUS_OPTIONS = [
  { value: "none", label: "None" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" }
];

const SPACING_OPTIONS = [
  { value: "compact", label: "Compact" },
  { value: "comfortable", label: "Comfortable" },
  { value: "spacious", label: "Spacious" }
];

export function LayoutSettings({
  borderRadius,
  spacing,
  onBorderRadiusChange,
  onSpacingChange
}: LayoutSettingsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Layout</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Border Radius</Label>
          <Select value={borderRadius} onValueChange={onBorderRadiusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BORDER_RADIUS_OPTIONS.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Field Spacing</Label>
          <Select value={spacing} onValueChange={onSpacingChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SPACING_OPTIONS.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}