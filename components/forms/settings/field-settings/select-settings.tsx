"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { FormField } from "@/types/form";
import { SettingsSection } from "./settings-section";

interface SelectSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function SelectSettings({ field, onFieldUpdate }: SelectSettingsProps) {
  if (field.type !== 'select' && field.type !== 'multi-select') return null;

  return (
    <SettingsSection title="Options">
      <div className="space-y-4">
        {(field.options || []).map((option, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={option.label}
              onChange={(e) => {
                const newOptions = [...(field.options || [])];
                newOptions[index] = {
                  ...newOptions[index],
                  label: e.target.value,
                  value: e.target.value.toLowerCase().replace(/\s+/g, '-')
                };
                onFieldUpdate({
                  ...field,
                  options: newOptions
                });
              }}
              placeholder={`Option ${index + 1}`}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const newOptions = [...(field.options || [])];
                newOptions.splice(index, 1);
                onFieldUpdate({
                  ...field,
                  options: newOptions
                });
              }}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => {
            const newOptions = [...(field.options || [])];
            newOptions.push({ label: "", value: "" });
            onFieldUpdate({
              ...field,
              options: newOptions
            });
          }}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Option
        </Button>
      </div>
    </SettingsSection>
  );
}