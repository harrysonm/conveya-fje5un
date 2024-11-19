"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormField } from "@/types/form";
import { BaseField } from "./base-field";

interface DateFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: Date;
  onChange?: (value: Date | undefined) => void;
}

export function DateField({ 
  field,
  showLabel = true,
  showHelperText = false,
  preview = false,
  value,
  onChange
}: DateFieldProps) {
  // Use settings to control label, placeholder and helper text visibility
  const shouldShowLabel = field.settings?.showLabel !== false;
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;
  const shouldShowHelperText = field.settings?.showHelperText || false;

  return (
    <BaseField 
      field={field}
      showLabel={shouldShowLabel}
      showHelperText={shouldShowHelperText}
    >
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "date-field_button w-full justify-start text-left font-normal pl-8",
                !value && "text-muted-foreground"
              )}
              disabled={preview && !onChange}
            >
              <CalendarIcon className="h-4 w-4 absolute left-2.5 top-2.5 text-neutral-500" />
              {value ? format(value, "PPP") : (shouldShowPlaceholder ? field.placeholder : "Pick a date")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              initialFocus
              required={field.validation?.required}
              disabled={preview && !onChange}
            />
          </PopoverContent>
        </Popover>
      </div>
    </BaseField>
  );
}