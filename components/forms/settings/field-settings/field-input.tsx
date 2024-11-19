"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FieldInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  description?: string;
}

export function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  description,
}: FieldInputProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}