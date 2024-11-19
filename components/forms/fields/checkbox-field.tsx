"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { BaseField } from "./base-field";
import { FormField } from "@/types/form";

interface CheckboxFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
  error?: string;
}

export function CheckboxField({
  field,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value = false,
  onChange,
  error
}: CheckboxFieldProps) {
  const shouldShowLabel = field.settings?.showLabel !== false;
  const shouldShowHelperText = field.settings?.showHelperText || false;
  const showAsInput = field.settings?.showAsInput;

  if (showAsInput) {
    return (
      <BaseField
        field={field}
        showLabel={shouldShowLabel}
        showHelperText={showHelperText}
        preview={preview}
      >
        <div className="flex items-center space-x-2">
          <Checkbox
            id={field.id}
            checked={value}
            onCheckedChange={onChange}
            disabled={preview && !onChange}
            required={field.validation?.required}
            className={cn(
              "h-5 w-5 rounded border-[1.5px] border-neutral-300",
              "data-[state=checked]:border-[var(--theme-primary)]",
              "data-[state=checked]:bg-[var(--theme-primary)]",
              "transition-colors duration-200",
              error && "border-red-500"
            )}
          />
          <label
            htmlFor={field.id}
            className="text-sm text-neutral-700 cursor-pointer select-none"
          >
            {field.content}
          </label>
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}
      </BaseField>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-start space-x-2">
        <Checkbox
          id={field.id}
          checked={value}
          onCheckedChange={onChange}
          disabled={preview && !onChange}
          required={field.validation?.required}
          className={cn(
            "h-5 w-5 mt-1 rounded border-[1.5px] border-neutral-300",
            "data-[state=checked]:border-[var(--theme-primary)]",
            "data-[state=checked]:bg-[var(--theme-primary)]",
            "transition-colors duration-200",
            error && "border-red-500"
          )}
        />
        <label
          htmlFor={field.id}
          className={cn(
            "text-sm leading-relaxed text-neutral-700",
            "cursor-pointer select-none"
          )}
        >
          {field.content || field.label}
        </label>
      </div>
      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}