"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonSettings } from "@/types/button";
import { useThemeStore } from "@/stores/theme-store";

interface FormSubmitButtonProps {
  onEdit?: () => void;
  settings?: ButtonSettings;
  onSettingsChange?: (settings: ButtonSettings) => void;
  preview?: boolean;
  isLoading?: boolean;
  className?: string;
}

const defaultSettings: ButtonSettings = {
  label: "Submit",
  variant: "default",
  size: "default",
  fullWidth: false
};

export function FormSubmitButton({ 
  onEdit,
  settings = defaultSettings,
  onSettingsChange,
  preview = false,
  isLoading = false,
  className
}: FormSubmitButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useThemeStore();

  // Base button styles that are shared between preview and builder
  const buttonStyles = cn(
    "transition-all duration-200",
    "border-none",
    {
      "h-9 px-3 text-sm": settings?.size === "sm",
      "h-10 px-4 text-base": settings?.size === "default",
      "h-11 px-6 text-base": settings?.size === "lg",
      "w-full": settings?.fullWidth,
      "w-auto": !settings?.fullWidth,
    },
    className
  );

  // Dynamic styles based on theme
  const style = {
    backgroundColor: theme.colors.primary.value,
    color: theme.colors.primary.textColor,
    borderRadius: `var(--radius)`,
    '--radius': (() => {
      switch (theme.borderRadius) {
        case 'none': return '0';
        case 'sm': return '0.125rem';
        case 'md': return '0.375rem';
        case 'lg': return '0.5rem';
        case 'full': return '9999px';
        default: return '0.375rem';
      }
    })(),
  } as React.CSSProperties;

  if (preview) {
    return (
      <div className={settings?.fullWidth ? "w-full" : "w-auto"}>
        <Button
          type="submit"
          className={buttonStyles}
          style={style}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {settings?.label || defaultSettings.label}
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative p-2 transition-colors",
        isHovered && "bg-neutral-50 rounded-lg",
        settings?.fullWidth ? "w-full" : "w-auto"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        type="button"
        className={buttonStyles}
        style={style}
        onClick={onEdit}
      >
        {settings?.label || defaultSettings.label}
      </Button>

      {onEdit && (
        <div
          className={cn(
            "absolute -top-8 right-0 flex items-center gap-1 opacity-0 transition-opacity bg-neutral-50 rounded-sm py-0.5 px-1",
            "group-hover:opacity-100"
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 rounded-sm"
            onClick={onEdit}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}