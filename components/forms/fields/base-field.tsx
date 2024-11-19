"use client";

import { cn } from "@/lib/utils";
import { FormField } from "@/types/form";
import { Label } from "@/components/ui/label";

interface BaseFieldProps {
  field: FormField;
  children: React.ReactNode;
  className?: string;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
}

export function BaseField({ 
  field, 
  children, 
  className,
  showLabel = true,
  showHelperText = true,
  preview = false
}: BaseFieldProps) {
  const shouldShowLabel = showLabel && field.settings?.showLabel !== false;
  const shouldShowHelperText = showHelperText && field.settings?.showHelperText;

  return (
    <div className={cn(
      "space-y-2 group/field",
      !preview && "hover:bg-neutral-50 rounded-md transition-colors p-2 -mx-2",
      className
    )}>
      {shouldShowLabel && field.label && (
        <Label className="group-hover/field:bg-neutral-50 transition-colors rounded-md">
          {field.label || "Untitled Field"}
          {field.validation?.required && <span className="text-red-500 ml-0.5">*</span>}
        </Label>
      )}
      {children}
      {shouldShowHelperText && (
        <p className="text-sm text-muted-foreground group-hover/field:bg-neutral-50 transition-colors rounded-md">
          {field.helperText || "Add helper text"}
        </p>
      )}
    </div>
  );
}