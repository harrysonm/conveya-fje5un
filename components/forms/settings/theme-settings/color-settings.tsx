"use client";

import { ColorPicker } from "./color-picker";

interface ColorSettingsProps {
  primaryColor: string;
  backgroundColor: string;
  borderColor: string;
  onPrimaryColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onBorderColorChange: (color: string) => void;
}

export function ColorSettings({
  primaryColor,
  backgroundColor,
  borderColor,
  onPrimaryColorChange,
  onBackgroundColorChange,
  onBorderColorChange,
}: ColorSettingsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Colors</h3>
      
      <div className="space-y-4">
        <ColorPicker
          label="Primary Color"
          description="Main color used for buttons and accents"
          value={primaryColor}
          onChange={onPrimaryColorChange}
        />

        <ColorPicker
          label="Background Color"
          description="Form background color"
          value={backgroundColor}
          onChange={onBackgroundColorChange}
        />

        <ColorPicker
          label="Border Color"
          description="Color used for input borders and dividers"
          value={borderColor}
          onChange={onBorderColorChange}
        />
      </div>
    </div>
  );
}