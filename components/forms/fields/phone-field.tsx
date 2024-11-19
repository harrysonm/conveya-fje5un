"use client";

import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { BaseField } from "./base-field";
import { FormField } from "@/types/form";

interface PhoneFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function PhoneField({ 
  field,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value = "",
  onChange
}: PhoneFieldProps) {
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;
  const placeholder = shouldShowPlaceholder ? (field.placeholder || "Enter phone number") : undefined;

  return (
    <BaseField 
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      preview={preview}
    >
      <div className="relative">
        <Input
          type="tel"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="pl-8"
          required={field.validation?.required}
          disabled={preview && !onChange}
        />
        <Phone className="h-4 w-4 absolute left-2.5 top-2.5 text-neutral-500" />
      </div>
    </BaseField>
  );
}