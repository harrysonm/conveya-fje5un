"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormField } from "@/types/form";
import { Toggle } from "./toggle";
import { SettingsSection } from "./settings-section";

interface FileSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function FileSettings({ field, onFieldUpdate }: FileSettingsProps) {
  if (field.type !== 'file') return null;

  return (
    <SettingsSection title="File Upload Settings">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Max File Size (MB)</Label>
          <Input
            type="number"
            min="0"
            value={field.settings?.maxFileSize || ""}
            onChange={(e) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  maxFileSize: Number(e.target.value)
                }
              })
            }
            placeholder="Enter max file size in MB"
          />
          <p className="text-xs text-muted-foreground">
            Leave empty for no size limit
          </p>
        </div>

        <div className="space-y-2">
          <Label>Accepted File Types</Label>
          <Input
            value={field.settings?.acceptedFileTypes?.join(", ") || ""}
            onChange={(e) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  acceptedFileTypes: e.target.value.split(",").map(t => t.trim())
                }
              })
            }
            placeholder=".pdf, .doc, .docx"
          />
          <p className="text-xs text-muted-foreground">
            Enter file extensions separated by commas (e.g., .pdf, .doc)
          </p>
        </div>

        <Toggle
          label="Allow Multiple Files"
          description="Enable users to upload multiple files at once"
          checked={field.settings?.multiple || false}
          onCheckedChange={(checked) =>
            onFieldUpdate({
              ...field,
              settings: {
                ...field.settings,
                multiple: checked
              }
            })
          }
        />
      </div>
    </SettingsSection>
  );
}