"use client";

import { FormTemplate } from "@/lib/constants/form-templates";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useThemeStore } from "@/stores/theme-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormTheme } from "@/hooks/use-form-theme";

interface TemplatePreviewProps {
  template: FormTemplate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseTemplate: () => void;
}

export function TemplatePreview({ 
  template,
  open,
  onOpenChange,
  onUseTemplate
}: TemplatePreviewProps) {
  const { getThemeStyles } = useFormTheme();
  const styles = getThemeStyles();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] p-0 gap-0">
        <DialogHeader className="h-[45px] min-h-[45px] border-b border-neutral-100 px-4 flex-shrink-0 flex items-center">
          <DialogTitle className="text-sm font-normal">
            Preview: {template.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div 
              className="max-w-[640px] mx-auto px-6 py-8"
              style={styles.container}
            >
              <div style={styles.content} className="space-y-[var(--theme-spacing)]">
                <div>
                  <h1 className="text-2xl font-semibold font-[var(--theme-heading-font)]">
                    {template.name}
                  </h1>
                  <p className="mt-2 text-sm text-neutral-500 font-[var(--theme-body-font)]">
                    {template.description}
                  </p>
                </div>

                {template.fields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    preview
                  />
                ))}

                <Button 
                  className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:opacity-90 rounded-[var(--theme-radius)]"
                  onClick={() => {
                    onUseTemplate();
                    onOpenChange(false);
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}