"use client";

import { FormField } from "@/types/form";
import { SettingsSection } from "./settings-section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BaseSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function BaseSettings({ field, onFieldUpdate }: BaseSettingsProps) {
  const isContentField = field.type === 'heading' || field.type === 'paragraph';
  
  // Don't show base settings for content fields
  if (isContentField) return null;

  return (
    <SettingsSection title="Basic Settings">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Label</Label>
          <Input
            value={field.label}
            onChange={(e) => onFieldUpdate({ ...field, label: e.target.value })}
            placeholder="Enter field label"
          />
        </div>

        <div className="space-y-2">
          <Label>Placeholder</Label>
          <Input
            value={field.placeholder || ""}
            onChange={(e) => onFieldUpdate({ ...field, placeholder: e.target.value })}
            placeholder="Enter placeholder text"
          />
        </div>

        <div className="space-y-2">
          <Label>Helper Text</Label>
          <Input
            value={field.helperText || ""}
            onChange={(e) => onFieldUpdate({ ...field, helperText: e.target.value })}
            placeholder="Enter helper text"
          />
        </div>
      </div>
    </SettingsSection>
  );
}