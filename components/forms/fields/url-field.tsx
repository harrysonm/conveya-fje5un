"use client";

import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { BaseField } from "./base-field";
import { FormField } from "@/types/form";
import { cn } from "@/lib/utils";

interface URLFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export function URLField({ 
  field,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value = "",
  onChange,
  error
}: URLFieldProps) {
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;
  const placeholder = shouldShowPlaceholder ? (field.placeholder || "Enter URL") : undefined;

  return (
    <BaseField 
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      preview={preview}
    >
      <div className="relative">
        <Input
          type="url"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "pl-8",
            error && "border-red-500 focus-visible:ring-red-500"
          )}
          required={field.validation?.required}
          disabled={preview && !onChange}
        />
        <Link className="h-4 w-4 absolute left-2.5 top-2.5 text-neutral-500" />
      </div>
      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </BaseField>
  );
}