"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { BaseField } from "./base-field";
import { FormField } from "@/types/form";

interface SelectFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
}

export function SelectField({ 
  field,
  showLabel = true,
  preview = false,
  value,
  onChange
}: SelectFieldProps) {
  const isMulti = field.type === 'multi-select';
  const options = field.options || [];
  const minSelections = field.validation?.min;
  const maxSelections = field.validation?.max;

  const shouldShowLabel = field.settings?.showLabel !== false;
  const shouldShowHelperText = field.settings?.showHelperText || false;

  const getSelectionText = () => {
    if (minSelections && maxSelections) {
      return `Select between ${minSelections} and ${maxSelections} options`;
    }
    if (minSelections) {
      return `Select at least ${minSelections} options`;
    }
    if (maxSelections) {
      return `Select up to ${maxSelections} options`;
    }
    return "";
  };

  const combinedHelperText = isMulti
    ? [field.helperText, getSelectionText()].filter(Boolean).join(" • ")
    : field.helperText;

  const handleMultiSelect = (optionValue: string, checked: boolean) => {
    if (!onChange) return;
    
    const currentValues = Array.isArray(value) ? value : [];
    const newValues = checked
      ? [...currentValues, optionValue]
      : currentValues.filter(v => v !== optionValue);
    
    onChange(newValues);
  };

  return (
    <BaseField 
      field={{
        ...field,
        helperText: combinedHelperText
      }}
      showLabel={shouldShowLabel}
      showHelperText={shouldShowHelperText}
    >
      {isMulti ? (
        <div className="grid gap-0">
          {options.map((option, index) => {
            const checkboxId = `${field.id}-${index}-multi-${option.value}`;
            return (
              <div key={checkboxId} className="flex items-center">
                <label className={cn(
                  "flex items-center w-full py-2",
                  "cursor-pointer select-none"
                )}>
                  <Checkbox
                    id={checkboxId}
                    className={cn(
                      "h-5 w-5 mr-3 rounded border-[1.5px] border-neutral-300",
                      "data-[state=checked]:border-[var(--theme-primary)]",
                      "data-[state=checked]:bg-[var(--theme-primary)]",
                      "transition-colors duration-200"
                    )}
                    checked={Array.isArray(value) && value.includes(option.value)}
                    onCheckedChange={(checked) => handleMultiSelect(option.value, checked as boolean)}
                    required={field.validation?.required}
                    disabled={preview && !onChange}
                  />
                  <span className="text-neutral-700">{option.label}</span>
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        <RadioGroup 
          value={value as string} 
          onValueChange={onChange as (value: string) => void}
          disabled={preview && !onChange}
          className="grid gap-0"
        >
          {options.map((option, index) => {
            const radioId = `${field.id}-${index}-single-${option.value}`;
            const isSelected = value === option.value;
            
            return (
              <div key={radioId} className="flex items-center">
                <label
                  htmlFor={radioId}
                  className={cn(
                    "flex items-center w-full py-2",
                    "cursor-pointer select-none transform-gpu",
                    "transition-all duration-200 ease-in-out will-change-transform"
                  )}
                >
                  <RadioGroupItem 
                    value={option.value} 
                    id={radioId}
                    required={field.validation?.required}
                    className={cn(
                      "h-5 w-5 mr-3 border-[1.5px] border-neutral-300",
                      "text-[var(--theme-primary)]",
                      "data-[state=checked]:border-[var(--theme-primary)]",
                      "data-[state=checked]:bg-[var(--theme-primary)]",
                      "[&_span]:rounded-full !rounded-full",
                      "[&_span]:after:rounded-full",
                      "transition-[border-color,background-color] duration-200"
                    )}
                  />
                  <span className="text-sm text-neutral-700">
                    {option.label}
                  </span>
                </label>
              </div>
            );
          })}
          {options.length === 0 && (
            <div className="text-sm text-muted-foreground">
              Add options in field settings
            </div>
          )}
        </RadioGroup>
      )}
    </BaseField>
  );
}