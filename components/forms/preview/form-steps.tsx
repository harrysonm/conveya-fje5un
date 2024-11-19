"use client";

import { FormField } from "@/types/form";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface FormStepsProps {
  fields: FormField[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (step: number) => void;
}

export function FormSteps({ 
  fields, 
  currentStep, 
  completedSteps,
  onStepClick 
}: FormStepsProps) {
  // Get all page breaks to determine steps
  const steps = fields
    .filter(field => field.type === 'page-break')
    .map((field, index) => ({
      title: field.settings?.stepTitle || `Step ${index + 1}`,
      description: field.settings?.stepDescription
    }));

  // Add final step for review/submission
  steps.push({
    title: "Review",
    description: "Review your responses"
  });

  return (
    <nav aria-label="Progress" className="px-4 py-2 border-b">
      <ol role="list" className="flex items-center justify-center gap-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index;

          return (
            <li key={index} className="flex-1 max-w-[200px]">
              <button
                className={cn(
                  "group flex flex-col w-full",
                  onStepClick && "cursor-pointer"
                )}
                onClick={() => onStepClick?.(index)}
                disabled={!onStepClick}
              >
                <span className="text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ring-1 ring-inset",
                        isCompleted && "bg-primary text-primary-foreground ring-primary",
                        isCurrent && "ring-primary",
                        !isCompleted && !isCurrent && "ring-neutral-200"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        (isCompleted || isCurrent) && "text-neutral-900",
                        !isCompleted && !isCurrent && "text-neutral-500"
                      )}
                    >
                      {step.title}
                    </span>
                  </span>
                </span>
                {step.description && (
                  <span
                    className={cn(
                      "mt-0.5 text-xs",
                      (isCompleted || isCurrent) && "text-neutral-600",
                      !isCompleted && !isCurrent && "text-neutral-400"
                    )}
                  >
                    {step.description}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}