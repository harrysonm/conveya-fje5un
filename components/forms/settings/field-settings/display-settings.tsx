"use client";

import { FormField } from "@/types/form";
import { SettingsSection } from "./settings-section";
import { SettingsToggle } from "./settings-toggle";

interface DisplaySettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function DisplaySettings({ field, onFieldUpdate }: DisplaySettingsProps) {
  // Skip display settings for content fields
  if (field.type === 'heading' || field.type === 'paragraph') {
    return null;
  }

  const isRatingField = field.type === 'star-rating' || field.type === 'number-rating';
  const isSelectField = field.type === 'select' || field.type === 'multi-select';

  return (
    <SettingsSection title="Display Options">
      <div className="space-y-4">
        {/* Visibility toggle */}
        <SettingsToggle
          label="Field Visibility"
          description="Control whether this field is visible in the form"
          checked={field.settings?.visible !== false}
          onCheckedChange={(checked) =>
            onFieldUpdate({
              ...field,
              settings: {
                ...field.settings,
                visible: checked
              }
            })
          }
        />

        {/* Label toggle for all fields */}
        <SettingsToggle
          label="Show Label"
          description="Display the field label above the input"
          checked={field.settings?.showLabel !== false}
          onCheckedChange={(checked) =>
            onFieldUpdate({
              ...field,
              settings: {
                ...field.settings,
                showLabel: checked
              }
            })
          }
        />

        {/* Placeholder toggle for fields that support it */}
        {!isRatingField && !isSelectField && (
          <SettingsToggle
            label="Show Placeholder"
            description="Show placeholder text inside the input field"
            checked={field.settings?.showPlaceholder !== false}
            onCheckedChange={(checked) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  showPlaceholder: checked
                }
              })
            }
          />
        )}

        {/* Helper text toggle for all fields */}
        <SettingsToggle
          label="Show Helper Text"
          description="Display additional help text below the field"
          checked={field.settings?.showHelperText || false}
          onCheckedChange={(checked) =>
            onFieldUpdate({
              ...field,
              settings: {
                ...field.settings,
                showHelperText: checked
              }
            })
          }
        />
      </div>
    </SettingsSection>
  );
}