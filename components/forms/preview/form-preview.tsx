"use client";

import { useState } from "react";
import { FormField } from "@/types/form";
import { FormPreviewField } from "./form-preview-field";
import { FormSubmitButton } from "../form-submit-button";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { useThemeStore } from "@/stores/theme-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormLogo } from "../form-logo";
import { FormSteps } from "./form-steps";

interface FormPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  fields: FormField[];
  name: string;
  formId: string;
  themeSettings?: {
    coverType: 'none' | 'color' | 'image';
    coverColor?: string;
    coverImage?: string;
    showLogo: boolean;
    logo?: string;
  };
  buttonSettings?: {
    label: string;
    variant: "default" | "secondary" | "outline" | "ghost";
    size: "default" | "sm" | "lg";
    fullWidth: boolean;
  };
  formData?: Record<string, any>;
  enableReview?: boolean;
}

export function FormPreview({ 
  open,
  onOpenChange,
  title,
  description = "",
  fields,
  name,
  formId,
  themeSettings = { coverType: 'none', showLogo: true },
  buttonSettings,
  formData: initialFormData = {},
  enableReview = false
}: FormPreviewProps) {
  const { theme } = useThemeStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState(initialFormData);

  const showLogoSection = themeSettings.showLogo && themeSettings.logo;

  // Split fields into steps based on page breaks
  const steps = fields.reduce((acc: FormField[][], field) => {
    if (field.type === 'page-break') {
      acc.push([]); // Start new step
    } else {
      if (acc.length === 0) acc.push([]); // Initialize first step
      acc[acc.length - 1].push(field);
    }
    return acc;
  }, []);

  // Only add review step if enabled and there are fields to review
  if (enableReview && steps.length > 0) {
    steps.push([]);
  }

  // Ensure we have at least one step
  if (steps.length === 0) {
    steps.push([]);
  }

  const {
    isSubmitting,
    getFieldError,
    handleFieldChange,
    handleSubmit
  } = useFormSubmission({
    formId,
    fields: fields.filter(f => f.type !== 'heading' && f.type !== 'paragraph' && f.type !== 'page-break'),
    onSuccess: () => {
      onOpenChange(false);
    }
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Theme styles with proper background color application
  const containerStyles = {
    "--theme-primary": theme.colors.primary.value,
    "--theme-background": theme.colors.background,
    "--theme-text": theme.colors.text,
    "--theme-border": theme.colors.border,
    "--theme-radius": (() => {
      switch (theme.borderRadius) {
        case 'none': return '0';
        case 'sm': return '0.125rem';
        case 'md': return '0.375rem';
        case 'lg': return '0.5rem';
        case 'full': return '9999px';
        default: return '0.375rem';
      }
    })(),
    "--theme-spacing": theme.spacing === 'compact' ? '0.75rem' : 
                      theme.spacing === 'comfortable' ? '1.5rem' : '2rem',
    "--theme-heading-font": theme.fonts.heading,
    "--theme-body-font": theme.fonts.body,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  } as React.CSSProperties;

  const buttonStyle = {
    backgroundColor: theme.colors.primary.value,
    color: theme.colors.primary.textColor,
    borderRadius: 'var(--theme-radius)',
  } as React.CSSProperties;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full w-full h-screen p-0 m-0 border-0 shadow-none rounded-none flex flex-col gap-0">
        <DialogHeader className="h-[45px] min-h-[45px] border-b border-neutral-100 px-5 flex-shrink-0 flex">
          <DialogTitle className="text-sm font-normal my-auto">
            {name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto" style={containerStyles}>
          {steps.length > 1 && (
            <FormSteps
              fields={fields}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={(step) => {
                if (completedSteps.includes(step)) {
                  setCurrentStep(step);
                }
              }}
            />
          )}

          <form onSubmit={handleSubmit}>
            {themeSettings.coverType !== 'none' && (
              <div className="w-full h-48">
                {themeSettings.coverType === 'color' && (
                  <div 
                    className="w-full h-full" 
                    style={{ backgroundColor: themeSettings.coverColor || '#f3f4f6' }}
                  />
                )}
                {themeSettings.coverType === 'image' && themeSettings.coverImage && (
                  <img
                    src={themeSettings.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}
            
            <div className={cn(
              "max-w-[640px] mx-auto px-5 pb-20",
              themeSettings.coverType === 'none' && showLogoSection && "pt-24",
              themeSettings.coverType !== 'none' && !showLogoSection && "pt-12",
              themeSettings.coverType === 'none' && !showLogoSection && "pt-12"
            )}>
              {showLogoSection && (
                <div className="mb-12">
                  <FormLogo logo={themeSettings.logo} />
                </div>
              )}

              <div className="space-y-[var(--theme-spacing)]">
                <div>
                  <div className="text-4xl font-bold font-[var(--theme-heading-font)]">
                    {title}
                  </div>
                  {description && (
                    <p className="mt-2 text-sm text-neutral-500 font-[var(--theme-body-font)]">
                      {description}
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  {currentStep === steps.length - 1 && enableReview ? (
                    // Review step
                    <div className="space-y-6">
                      {fields.filter(f => f.type !== 'page-break').map((field) => {
                        const value = formData[field.id];
                        if (!value || field.type === 'heading' || field.type === 'paragraph') return null;

                        return (
                          <div key={field.id} className="space-y-1">
                            <h3 className="text-sm font-medium">{field.label}</h3>
                            <p className="text-sm text-neutral-600">{value}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // Form fields for current step
                    steps[currentStep]?.map((field) => (
                      <FormPreviewField 
                        key={field.id} 
                        field={field}
                        preview={true}
                        value={formData[field.id]}
                        onChange={(value) => {
                          handleFieldChange(field.id, value);
                          setFormData(prev => ({
                            ...prev,
                            [field.id]: value
                          }));
                        }}
                        error={getFieldError(field.id)}
                      />
                    ))
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      {currentStep > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                          style={{ borderRadius: 'var(--theme-radius)' }}
                          className="transition-colors"
                        >
                          Back
                        </Button>
                      )}

                      {currentStep < steps.length - 1 ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          style={buttonStyle}
                          className="transition-colors hover:opacity-90"
                        >
                          Next
                        </Button>
                      ) : (
                        <FormSubmitButton 
                          preview 
                          settings={buttonSettings}
                          isLoading={isSubmitting}
                        />
                      )}
                    </div>

                    {steps.length > 1 && (
                      <p className="text-sm text-neutral-500">
                        Step {currentStep + 1} of {steps.length}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}