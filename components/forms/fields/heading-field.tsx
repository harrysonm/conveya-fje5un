"use client";

import { cn } from "@/lib/utils";
import { FormField } from "@/types/form";
import { Input } from "@/components/ui/input";

interface HeadingFieldProps {
  field: FormField;
  onFieldChange?: (field: Partial<FormField>) => void;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function HeadingField({ 
  field,
  onFieldChange,
  preview = false,
  value,
  onChange
}: HeadingFieldProps) {
  const level = field.settings?.headingLevel || 2;
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  const displayText = value || field.content || field.placeholder || "Heading";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    onFieldChange?.({ content });
    onChange?.(content);
  };

  const className = cn(
    "font-[var(--theme-heading-font)]",
    level === 1 && "text-3xl font-bold",
    level === 2 && "text-2xl font-semibold",
    level === 3 && "text-xl font-medium"
  );

  if (preview) {
    return (
      <Component className={className}>
        {displayText}
      </Component>
    );
  }

  return (
    <Input
      value={displayText}
      onChange={handleChange}
      placeholder="Enter heading"
      className={cn(
        className,
        "px-0 border-0 focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0 w-full bg-transparent"
      )}
    />
  );
}