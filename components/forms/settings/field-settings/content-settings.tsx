"use client";

import { FormField } from "@/types/form";
import { SettingsSection } from "./settings-section";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ContentSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function ContentSettings({ field, onFieldUpdate }: ContentSettingsProps) {
  if (field.type !== 'heading' && field.type !== 'paragraph') return null;

  const isHeading = field.type === 'heading';

  return (
    <SettingsSection title="Content">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>{isHeading ? 'Heading Text' : 'Paragraph Text'}</Label>
          <Textarea
            value={field.content || ''}
            onChange={(e) => onFieldUpdate({
              ...field,
              content: e.target.value
            })}
            placeholder={isHeading ? "Enter heading text" : "Enter paragraph text"}
            className={cn(
              "resize-y",
              isHeading ? "min-h-[80px]" : "min-h-[100px]"
            )}
          />
        </div>
      </div>
    </SettingsSection>
  );
}