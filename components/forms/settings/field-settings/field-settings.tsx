"use client";

import { FormField } from "@/types/form";
import { BaseSettings } from "./base-settings";
import { ValidationSettings } from "./validation-settings";
import { DisplaySettings } from "./display-settings";
import { SelectSettings } from "./select-settings";
import { FileSettings } from "./file-settings";
import { HeadingSettings } from "./heading-settings";
import { RatingSettings } from "./rating-settings";
import { ContentSettings } from "./content-settings";
import { DropdownSettings } from "./dropdown-settings";
import { PageBreakSettings } from "./page-break-settings";
import { CheckboxSettings } from "./checkbox-settings";
import { SettingsHeader } from "./header";
import { toast } from "@/hooks/use-toast";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { useState } from "react";

interface FormFieldSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
  onDismiss: () => void;
  fields: FormField[];
}

export function FormFieldSettings({
  field,
  onFieldUpdate,
  onDismiss,
  fields
}: FormFieldSettingsProps) {
  const [originalField] = useState<FormField>(field);

  const handleReset = () => {
    onFieldUpdate(originalField);
    toast({
      description: "Settings reset to original values",
    });
  };

  useHotkeys('esc', onDismiss);
  useHotkeys('mod+z', handleReset);

  if (!field || !field.type) return null;

  const isRatingField = field.type === 'star-rating' || field.type === 'number-rating';
  const isContentField = field.type === 'heading' || field.type === 'paragraph';
  const isPageBreak = field.type === 'page-break';
  const isCheckbox = field.type === 'checkbox';

  return (
    <div className="absolute inset-y-0 right-0 w-[400px] border-l border-neutral-100 bg-white flex flex-col">
      <SettingsHeader 
        onDismiss={onDismiss} 
        onReset={handleReset}
        fieldType={field.type}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          {isPageBreak ? (
            <PageBreakSettings 
              field={field} 
              onFieldUpdate={onFieldUpdate} 
            />
          ) : (
            <>
              {!isPageBreak && !isCheckbox && (
                <DisplaySettings 
                  field={field} 
                  onFieldUpdate={onFieldUpdate}
                />
              )}

              {!isContentField && !isPageBreak && (
                <ValidationSettings 
                  field={field} 
                  onFieldUpdate={onFieldUpdate}
                />
              )}

              {isContentField && (
                <ContentSettings field={field} onFieldUpdate={onFieldUpdate} />
              )}

              {!isContentField && !isRatingField && !isPageBreak && !isCheckbox && (
                <BaseSettings 
                  field={field} 
                  onFieldUpdate={onFieldUpdate}
                />
              )}

              {isCheckbox && (
                <CheckboxSettings
                  field={field}
                  onFieldUpdate={onFieldUpdate}
                />
              )}

              {field.type === 'heading' && (
                <HeadingSettings 
                  field={field} 
                  onFieldUpdate={onFieldUpdate}
                />
              )}

              {(field.type === 'select' || field.type === 'multi-select') && (
                <SelectSettings 
                  field={field} 
                  onFieldUpdate={onFieldUpdate}
                />
              )}

              {field.type === 'dropdown' && (
                <DropdownSettings
                  field={field}
                  onFieldUpdate={onFieldUpdate}
                />
              )}

              {field.type === 'file' && (
                <FileSettings 
                  field={field} 
                  onFieldUpdate={onFieldUpdate}
                />
              )}

              {isRatingField && (
                <RatingSettings 
                  field={field} 
                  onFieldUpdate={onFieldUpdate}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}