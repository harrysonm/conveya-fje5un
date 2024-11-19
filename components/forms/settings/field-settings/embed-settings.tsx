"use client";

import { FormField } from "@/types/form";
import { SettingsSection } from "./settings-section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Toggle } from "./toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmbedSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

const ASPECT_RATIOS = [
  { label: '16:9 (Widescreen)', value: '16/9' },
  { label: '4:3 (Standard)', value: '4/3' },
  { label: '1:1 (Square)', value: '1/1' },
  { label: '9:16 (Vertical)', value: '9/16' },
];

const ALIGNMENTS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
];

export function EmbedSettings({ field, onFieldUpdate }: EmbedSettingsProps) {
  if (field.type !== 'embed') return null;

  const settings = field.settings?.embed || {
    width: '100%',
    maxWidth: 800,
    aspectRatio: '16/9',
    align: 'center',
    showCaption: false,
    caption: ''
  };

  const handleSettingChange = (key: string, value: any) => {
    onFieldUpdate({
      ...field,
      settings: {
        ...field.settings,
        embed: {
          ...settings,
          [key]: value
        }
      }
    });
  };

  return (
    <>
      <SettingsSection title="Layout Settings">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Maximum Width</Label>
            <Input
              type="number"
              min="200"
              max="2000"
              value={settings.maxWidth}
              onChange={(e) => handleSettingChange('maxWidth', Number(e.target.value))}
              placeholder="Enter maximum width in pixels"
            />
            <p className="text-xs text-muted-foreground">
              Maximum width in pixels (leave empty for full width)
            </p>
          </div>

          <div className="space-y-2">
            <Label>Aspect Ratio</Label>
            <Select
              value={settings.aspectRatio}
              onValueChange={(value) => handleSettingChange('aspectRatio', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                {ASPECT_RATIOS.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Alignment</Label>
            <Select
              value={settings.align}
              onValueChange={(value) => handleSettingChange('align', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select alignment" />
              </SelectTrigger>
              <SelectContent>
                {ALIGNMENTS.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Caption Settings">
        <div className="space-y-4">
          <Toggle
            label="Show Caption"
            description="Display a caption below the video"
            checked={settings.showCaption}
            onCheckedChange={(checked) => handleSettingChange('showCaption', checked)}
          />

          {settings.showCaption && (
            <div className="space-y-2">
              <Label>Caption Text</Label>
              <Input
                value={settings.caption}
                onChange={(e) => handleSettingChange('caption', e.target.value)}
                placeholder="Enter caption text"
              />
            </div>
          )}
        </div>
      </SettingsSection>
    </>
  );
}