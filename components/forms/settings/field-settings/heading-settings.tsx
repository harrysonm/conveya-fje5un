"use client";

import { FormField } from "@/types/form";
import { Label } from "@/components/ui/label";
import { SettingsSection } from "./settings-section";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeadingSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function HeadingSettings({ field, onFieldUpdate }: HeadingSettingsProps) {
  if (field.type !== 'heading') return null;

  return (
    <SettingsSection title="Heading Level">
      <Select
        value={String(field.settings?.headingLevel || 2)}
        onValueChange={(value) => onFieldUpdate({
          ...field,
          settings: {
            ...field.settings,
            headingLevel: Number(value) as 1 | 2 | 3
          }
        })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select heading level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Heading 1</SelectItem>
          <SelectItem value="2">Heading 2</SelectItem>
          <SelectItem value="3">Heading 3</SelectItem>
        </SelectContent>
      </Select>
    </SettingsSection>
  );
}