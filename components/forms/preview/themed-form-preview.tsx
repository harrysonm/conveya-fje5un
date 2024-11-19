"use client";

import { useTheme } from "@/hooks/use-theme";
import { FormPreview } from "./form-preview";
import { cn } from "@/lib/utils";

interface ThemedFormPreviewProps {
  className?: string;
  [key: string]: any;
}

export function ThemedFormPreview({ className, ...props }: ThemedFormPreviewProps) {
  const { getThemeStyles, getFieldClasses } = useTheme();
  const styles = getThemeStyles();
  const classes = getFieldClasses();

  return (
    <div 
      className={cn("themed-form-preview", className)}
      style={{
        "--theme-primary": styles.colors.primary,
        "--theme-background": styles.colors.background,
        "--theme-text": styles.colors.text,
        "--theme-border": styles.colors.border,
        "--theme-heading-font": styles.fonts.heading,
        "--theme-body-font": styles.fonts.body,
      } as React.CSSProperties}
    >
      <style jsx global>{`
        .themed-form-preview {
          background-color: var(--theme-background);
          color: var(--theme-text);
        }
        
        .themed-form-preview h1,
        .themed-form-preview h2,
        .themed-form-preview h3 {
          font-family: var(--theme-heading-font), system-ui;
        }
        
        .themed-form-preview * {
          font-family: var(--theme-body-font), system-ui;
        }
        
        .themed-form-preview input,
        .themed-form-preview textarea,
        .themed-form-preview select {
          border-color: var(--theme-border);
        }
        
        .themed-form-preview button[type="submit"] {
          background-color: var(--theme-primary);
          color: white;
        }
      `}</style>
      
      <FormPreview {...props} />
    </div>
  );
}