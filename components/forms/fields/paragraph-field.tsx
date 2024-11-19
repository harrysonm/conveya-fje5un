"use client";

import { cn } from "@/lib/utils";
import { FormField } from "@/types/form";
import { Textarea } from "@/components/ui/textarea";

interface ParagraphFieldProps {
  field: FormField;
  onFieldChange?: (field: Partial<FormField>) => void;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function ParagraphField({ 
  field,
  onFieldChange,
  preview = false,
  value,
  onChange
}: ParagraphFieldProps) {
  const displayText = value || field.content || field.placeholder || "Enter text";

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    onFieldChange?.({ content });
    onChange?.(content);
  };

  const className = cn(
    "font-[var(--theme-body-font)]",
    "text-neutral-600"
  );

  if (preview) {
    return (
      <p className={className}>
        {displayText}
      </p>
    );
  }

  return (
    <Textarea
      value={displayText}
      onChange={handleChange}
      placeholder="Enter text"
      className={cn(
        className,
        "px-0 border-0 focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0 w-full bg-transparent resize-none",
        "min-h-0 h-auto"
      )}
      rows={1}
      style={{ height: 'auto' }}
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = '0';
        const height = target.scrollHeight;
        target.style.height = `${height}px`;
      }}
    />
  );
}