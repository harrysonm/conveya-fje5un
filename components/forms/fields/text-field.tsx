"use client";

import { Input } from "@/components/ui/input";
import { BaseField } from "./base-field";
import { FormField } from "@/types/form";
import { cn } from "@/lib/utils";

interface TextFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export function TextField({ 
  field,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value = "",
  onChange,
  error
}: TextFieldProps) {
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;
  const placeholder = shouldShowPlaceholder ? (field.placeholder || "Enter text") : undefined;

  return (
    <BaseField 
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      preview={preview}
    >
      <div className="space-y-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          required={field.validation?.required}
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
          pattern={field.validation?.pattern}
          disabled={preview && !onChange}
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500"
          )}
        />
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </BaseField>
  );
}