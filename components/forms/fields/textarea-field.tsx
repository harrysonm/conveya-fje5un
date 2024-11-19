"use client";

import { Textarea } from "@/components/ui/textarea";
import { BaseField } from "./base-field";
import { FormField } from "@/types/form";

interface TextareaFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function TextareaField({ 
  field,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value = "",
  onChange
}: TextareaFieldProps) {
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;
  const placeholder = shouldShowPlaceholder ? (field.placeholder || "Enter text") : undefined;

  return (
    <BaseField 
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      preview={preview}
    >
      <Textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={field.validation?.required}
        minLength={field.validation?.minLength}
        maxLength={field.validation?.maxLength}
        className="min-h-[100px] resize-y"
        disabled={preview && !onChange}
      />
    </BaseField>
  );
}