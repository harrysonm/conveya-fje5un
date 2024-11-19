"use client";

import { FormField } from "@/types/form";
import { FormField as FormFieldComponent } from "../form-field";
import { useThemeStore } from "@/stores/theme-store";
import { cn } from "@/lib/utils";

interface FormPreviewFieldProps {
  field: FormField;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  preview?: boolean;
}

export function FormPreviewField({ 
  field, 
  preview = true, 
  value, 
  onChange, 
  error
}: FormPreviewFieldProps) {
  const { theme } = useThemeStore();

  // Skip page breaks in preview
  if (field.type === 'page-break') return null;

  // Hide field if not visible based on settings
  if (field.settings?.visible === false) {
    return null;
  }

  const getFieldStyles = () => {
    const radiusMap = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full"
    };

    return cn(
      "form-field",
      radiusMap[theme.borderRadius],
      "transition-all duration-200",
      error && "ring-2 ring-red-500",
      field.settings?.disabled && "opacity-50 pointer-events-none"
    );
  };

  return (
    <div className="space-y-1">
      <FormFieldComponent 
        field={{
          ...field,
          validation: {
            ...field.validation,
            required: field.validation?.required
          }
        }}
        preview={preview}
        value={value}
        onChange={onChange}
        error={error}
        className={getFieldStyles()}
      />
    </div>
  );
}