"use client";

import { FormField } from "@/types/form";
import { SettingsSection } from "./settings-section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PageBreakSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function PageBreakSettings({ field, onFieldUpdate }: PageBreakSettingsProps) {
  if (field.type !== 'page-break') return null;

  const handleTitleChange = (value: string) => {
    onFieldUpdate({
      ...field,
      settings: {
        ...field.settings,
        stepTitle: value
      }
    });
  };

  return (
    <SettingsSection title="Step Settings">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Step Title</Label>
          <Input
            value={field.settings?.stepTitle || ""}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter step title"
          />
          <p className="text-xs text-muted-foreground">
            This title will appear in the step navigation
          </p>
        </div>
      </div>
    </SettingsSection>
  );
}