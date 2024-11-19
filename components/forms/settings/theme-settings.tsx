"use client";

import { Button } from "@/components/ui/button";
import { X, RotateCcw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { CoverSettings } from "./theme-settings/cover-settings";
import { LogoSettings } from "./theme-settings/logo-settings";
import { ColorSettings } from "./theme-settings/color-settings";
import { TypographySettings } from "./theme-settings/typography-settings";
import { LayoutSettings } from "./theme-settings/layout-settings";
import { SectionTitle } from "./theme-settings/section-title";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useThemeStore } from "@/stores/theme-store";
import { THEME_COLORS, BACKGROUND_COLORS, BORDER_COLORS } from "@/lib/constants/theme-options";

interface ThemeSettings {
  showLogo: boolean;
  coverType: 'none' | 'color' | 'image';
  coverColor?: string;
  coverImage?: string;
  logo?: string;
}

interface ThemeSettingsProps {
  settings?: ThemeSettings;
  onSettingsChange?: (settings: ThemeSettings) => void;
  onClose: () => void;
}

const defaultSettings: ThemeSettings = {
  showLogo: true,
  coverType: 'none',
  coverColor: '#f3f4f6'
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function ThemeSettings({ settings = defaultSettings, onSettingsChange, onClose }: ThemeSettingsProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { theme, updateTheme } = useThemeStore();

  const handleReset = () => {
    onSettingsChange?.(defaultSettings);
    toast({
      description: "Theme settings reset to default"
    });
  };

  const handleFileUpload = async (file: File, type: 'cover' | 'logo') => {
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (type === 'cover') {
            onSettingsChange?.({
              ...settings,
              coverType: 'image',
              coverImage: reader.result
            });
          } else {
            onSettingsChange?.({
              ...settings,
              logo: reader.result
            });
          }
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleColorChange = (type: 'primary' | 'background' | 'border', color: string) => {
    updateTheme({
      colors: {
        ...theme.colors,
        [type]: type === 'primary' 
          ? { name: 'Custom', value: color, textColor: '#ffffff' }
          : color
      }
    });
  };

  const handleFontChange = (type: 'heading' | 'body', font: string) => {
    updateTheme({
      fonts: {
        ...theme.fonts,
        [type]: font
      }
    });
  };

  const handleLayoutChange = (
    type: 'borderRadius' | 'spacing',
    value: typeof theme.borderRadius | typeof theme.spacing
  ) => {
    updateTheme({
      [type]: value
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 h-[45px] border-b border-neutral-100">
        <div className="text-[14px] font-medium">Theme Settings</div>
        <TooltipProvider>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset to defaults</TooltipContent>
            </Tooltip>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </TooltipProvider>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div>
            <SectionTitle 
              description="Customize the header area of your form"
            >
              Header
            </SectionTitle>
            <div className="mt-4 space-y-6">
              <CoverSettings
                coverType={settings.coverType}
                coverColor={settings.coverColor}
                onCoverTypeChange={(type) => onSettingsChange?.({ ...settings, coverType: type })}
                onCoverColorChange={(color) => onSettingsChange?.({ ...settings, coverColor: color })}
                onCoverImageChange={(file) => handleFileUpload(file, 'cover')}
                isUploading={isUploading}
              />

              <LogoSettings
                showLogo={settings.showLogo}
                onShowLogoChange={(show) => onSettingsChange?.({ ...settings, showLogo: show })}
                onLogoChange={(file) => handleFileUpload(file, 'logo')}
                isUploading={isUploading}
              />
            </div>
          </div>

          <Separator />

          <div>
            <SectionTitle 
              description="Define the visual style of your form"
            >
              Style
            </SectionTitle>
            <div className="mt-4 space-y-6">
              <ColorSettings
                primaryColor={theme.colors.primary.value}
                backgroundColor={theme.colors.background}
                borderColor={theme.colors.border}
                onPrimaryColorChange={(color) => handleColorChange('primary', color)}
                onBackgroundColorChange={(color) => handleColorChange('background', color)}
                onBorderColorChange={(color) => handleColorChange('border', color)}
                primaryPresets={THEME_COLORS.map(c => c.value)}
                backgroundPresets={BACKGROUND_COLORS.map(c => c.value)}
                borderPresets={BORDER_COLORS.map(c => c.value)}
              />

              <TypographySettings
                headingFont={theme.fonts.heading}
                bodyFont={theme.fonts.body}
                onHeadingFontChange={(font) => handleFontChange('heading', font)}
                onBodyFontChange={(font) => handleFontChange('body', font)}
              />

              <LayoutSettings
                borderRadius={theme.borderRadius}
                spacing={theme.spacing}
                onBorderRadiusChange={(value) => handleLayoutChange('borderRadius', value as any)}
                onSpacingChange={(value) => handleLayoutChange('spacing', value as any)}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}