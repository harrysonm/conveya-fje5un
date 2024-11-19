"use client";

import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { BaseField } from "./base-field";
import { FormField } from "@/types/form";

interface EmailFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function EmailField({ 
  field,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value = "",
  onChange
}: EmailFieldProps) {
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;
  const placeholder = shouldShowPlaceholder ? (field.placeholder || "Enter email address") : undefined;

  return (
    <BaseField 
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      preview={preview}
    >
      <div className="relative">
        <Input
          type="email"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="pl-8"
          required={field.validation?.required}
          disabled={preview && !onChange}
        />
        <Mail className="h-4 w-4 absolute left-2.5 top-2.5 text-neutral-500" />
      </div>
    </BaseField>
  );
}