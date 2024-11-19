"use client";

import { useTheme } from "@/hooks/use-theme";
import { FormField } from "@/types/form";
import { FormField as FormFieldComponent } from "../form-field";
import { cn } from "@/lib/utils";

interface ThemedFieldProps {
  field: FormField;
  className?: string;
  [key: string]: any;
}

export function ThemedField({ field, className, ...props }: ThemedFieldProps) {
  const { getFieldClasses } = useTheme();
  const classes = getFieldClasses();

  return (
    <div className={cn(classes.form, className)}>
      <FormFieldComponent
        field={field}
        {...props}
        className={cn(classes.input)}
      />
    </div>
  );
}