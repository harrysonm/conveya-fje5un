"use client";

import { FormField } from "@/types/form";
import { BaseField } from "./base-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DropdownFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export function DropdownField({
  field,
  showLabel = true,
  showHelperText = false,
  preview = false,
  value,
  onChange,
  disabled = false,
  error
}: DropdownFieldProps) {
  // Use settings to control label and helper text visibility
  const shouldShowLabel = field.settings?.showLabel !== false;
  const shouldShowHelperText = field.settings?.showHelperText || false;
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;

  const options = field.options || [];

  return (
    <BaseField
      field={field}
      showLabel={shouldShowLabel}
      showHelperText={shouldShowHelperText}
    >
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled || (preview && !onChange)}
      >
        <SelectTrigger
          className={cn(
            "select-trigger w-full",
            error && "border-red-500 focus:ring-red-500"
          )}
        >
          <SelectValue 
            placeholder={shouldShowPlaceholder ? field.placeholder : "Select an option"} 
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
          {options.length === 0 && (
            <div className="py-2 px-2 text-sm text-muted-foreground">
              No options available
            </div>
          )}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </BaseField>
  );
}