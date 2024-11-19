"use client";

import { Label } from "@/components/ui/label";
import { FONTS } from "@/lib/constants/theme-options";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TypographySettingsProps {
  headingFont: string;
  bodyFont: string;
  onHeadingFontChange: (font: string) => void;
  onBodyFontChange: (font: string) => void;
}

export function TypographySettings({
  headingFont,
  bodyFont,
  onHeadingFontChange,
  onBodyFontChange
}: TypographySettingsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Typography</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Heading Font</Label>
          <Select value={headingFont} onValueChange={onHeadingFontChange}>
            <SelectTrigger>
              <SelectValue>
                <span style={{ fontFamily: headingFont }}>
                  {FONTS.find(f => f.value === headingFont)?.name || headingFont}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs text-muted-foreground">
                  Preview text will update as you select
                </SelectLabel>
                {FONTS.map((font) => (
                  <SelectItem 
                    key={font.id} 
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Used for form titles and section headings
          </p>
        </div>

        <div className="space-y-2">
          <Label>Body Font</Label>
          <Select value={bodyFont} onValueChange={onBodyFontChange}>
            <SelectTrigger>
              <SelectValue>
                <span style={{ fontFamily: bodyFont }}>
                  {FONTS.find(f => f.value === bodyFont)?.name || bodyFont}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs text-muted-foreground">
                  Preview text will update as you select
                </SelectLabel>
                {FONTS.map((font) => (
                  <SelectItem 
                    key={font.id} 
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Used for form fields and general text
          </p>
        </div>
      </div>
    </div>
  );
}