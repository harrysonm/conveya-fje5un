"use client";

import { FormField } from "@/types/form";
import { SettingsSection } from "./settings-section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { Toggle } from "./toggle";

interface DropdownSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
  description?: string;
}

export function DropdownSettings({ field, onFieldUpdate, description }: DropdownSettingsProps) {
  if (field.type !== 'dropdown') return null;

  return (
    <SettingsSection title="Dropdown Options" description={description}>
      <div className="space-y-6">
        {/* Options Management */}
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

        {/* Dropdown Behavior */}
        <div className="space-y-4">
          <Toggle
            label="Clearable"
            description="Allow users to clear their selection"
            checked={field.settings?.clearable !== false}
            onCheckedChange={(checked) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  clearable: checked
                }
              })
            }
          />

          <Toggle
            label="Searchable"
            description="Enable search functionality for options"
            checked={field.settings?.searchable || false}
            onCheckedChange={(checked) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  searchable: checked
                }
              })
            }
          />

          <Toggle
            label="Disabled"
            description="Make the dropdown field non-interactive"
            checked={field.settings?.disabled || false}
            onCheckedChange={(checked) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  disabled: checked
                }
              })
            }
          />
        </div>
      </div>
    </SettingsSection>
  );
}