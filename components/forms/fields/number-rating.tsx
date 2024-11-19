"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BaseField } from "./base-field";
import { FormField } from "@/types/form";

interface NumberRatingProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: number;
  onChange?: (value: number) => void;
}

export function NumberRatingField({ 
  field,
  showLabel = true,
  showHelperText = false,
  preview = false,
  value,
  onChange
}: NumberRatingProps) {
  const maxRating = field.settings?.maxRating || 10;
  const showValues = field.settings?.showValues !== false;
  const numbers = Array.from({ length: maxRating }, (_, i) => i + 1);

  // Use settings to control label and helper text visibility
  const shouldShowLabel = field.settings?.showLabel !== false;
  const shouldShowHelperText = field.settings?.showHelperText || false;

  const handleClick = (number: number, e: React.MouseEvent) => {
    e.preventDefault();
    onChange?.(number);
  };

  return (
    <BaseField 
      field={field}
      showLabel={shouldShowLabel}
      showHelperText={shouldShowHelperText}
    >
      <div className="flex flex-wrap gap-2">
        {numbers.map((number) => (
          <Button
            key={number}
            type="button"
            variant="outline"
            className={cn(
              "number-rating_button h-10 w-10 p-0 transition-colors",
              "hover:bg-[var(--theme-primary)] hover:text-white hover:border-[var(--theme-primary)]",
              value === number && "selected border-[var(--theme-primary)] bg-[var(--theme-primary)] text-white"
            )}
            onClick={(e) => handleClick(number, e)}
            disabled={preview && !onChange}
          >
            {showValues ? number : ""}
          </Button>
        ))}
      </div>
    </BaseField>
  );
}