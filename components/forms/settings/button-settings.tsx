"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ButtonSettings as ButtonSettingsType } from "@/types/button";

interface ButtonSettingsProps {
  settings: ButtonSettingsType;
  onSettingsChange: (settings: ButtonSettingsType) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ButtonSettings({ 
  settings, 
  onSettingsChange,
  open,
  onOpenChange
}: ButtonSettingsProps) {
  const handleSettingChange = (key: string, value: any) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    onSettingsChange(newSettings);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 h-[45px] border-b border-neutral-100">
        <div className="text-[14px] font-medium">Button Settings</div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Label</Label>
            <Input
              value={settings.label}
              onChange={(e) => handleSettingChange('label', e.target.value)}
              placeholder="Button label"
            />
          </div>

          <div className="space-y-2">
            <Label>Variant</Label>
            <Select
              value={settings.variant}
              onValueChange={(value) => handleSettingChange('variant', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
                <SelectItem value="ghost">Ghost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Size</Label>
            <Select
              value={settings.size}
              onValueChange={(value) => handleSettingChange('size', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>Full Width</Label>
            <Switch
              checked={settings.fullWidth}
              onCheckedChange={(checked) => handleSettingChange('fullWidth', checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}