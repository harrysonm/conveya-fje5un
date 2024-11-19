"use client";

import { FormField } from "@/types/form";
import { SettingsSection } from "./settings-section";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Toggle } from "./toggle";
import { useState } from "react";

interface CheckboxSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function CheckboxSettings({ field, onFieldUpdate }: CheckboxSettingsProps) {
  if (field.type !== 'checkbox') return null;
  const [showAsInput, setShowAsInput] = useState(false);

  return (
    <>
      <SettingsSection title="Display Options">
        <Toggle
          label="Show as Input"
          description="Toggle between checkbox with label or input with checkbox"
          checked={showAsInput}
          onCheckedChange={(checked) => {
            setShowAsInput(checked);
            onFieldUpdate({
              ...field,
              settings: {
                ...field.settings,
                showAsInput: checked
              }
            });
          }}
        />
      </SettingsSection>

      <SettingsSection title={showAsInput ? "Input Settings" : "Checkbox Text"}>
        {showAsInput ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={field.label}
                onChange={(e) => onFieldUpdate({
                  ...field,
                  label: e.target.value
                })}
                placeholder="Enter field label"
              />
            </div>
            <div className="space-y-2">
              <Label>Checkbox Text</Label>
              <Input
                value={field.content || ""}
                onChange={(e) => onFieldUpdate({
                  ...field,
                  content: e.target.value
                })}
                placeholder="Enter checkbox text"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={field.content || ""}
              onChange={(e) => onFieldUpdate({
                ...field,
                content: e.target.value
              })}
              placeholder="Enter the text that appears next to the checkbox"
              className="min-h-[80px] resize-y"
            />
            <p className="text-xs text-muted-foreground">
              This text will appear next to the checkbox and explain what the user is agreeing to
            </p>
          </div>
        )}
      </SettingsSection>
    </>
  );
}