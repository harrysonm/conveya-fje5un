"use client";

import { useState } from "react";
import { FormField } from "@/types/form";
import { HeadingSettings } from "./field-settings/heading-settings";
import { SettingsHeader } from "./field-settings/header";
import { toast } from "@/hooks/use-toast";
import { useHotkeys } from "@/hooks/use-hotkeys";

interface FieldSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
  onDismiss: () => void;
}

export function FieldSettings({ field, onFieldUpdate, onDismiss }: FieldSettingsProps) {
  const [originalField] = useState(field);

  const handleReset = () => {
    onFieldUpdate(originalField);
    toast({
      description: "Settings reset to original values",
    });
  };

  useHotkeys('esc', onDismiss);
  useHotkeys('mod+z', handleReset);

  return (
    <div className="h-full flex flex-col bg-white">
      <SettingsHeader 
        onDismiss={onDismiss} 
        onReset={handleReset}
        fieldType={field.type}
      />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-8">
          {field.type === 'heading' ? (
            <HeadingSettings field={field} onFieldUpdate={onFieldUpdate} />
          ) : field.type === 'paragraph' ? (
            <div className="text-sm text-neutral-500 text-center py-4">
              No additional settings available
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}