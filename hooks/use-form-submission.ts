"use client";

import { useState } from "react";
import { useResponseStore } from "@/stores/response-store";
import { nanoid } from "nanoid";
import { FormField } from "@/types/form";
import { useFormValidation } from "./use-form-validation";
import { toast } from "./use-toast";

interface UseFormSubmissionProps {
  formId: string;
  fields: FormField[];
  onSuccess?: () => void;
}

export function useFormSubmission({ formId, fields, onSuccess }: UseFormSubmissionProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { validateForm, getFieldError } = useFormValidation();
  const addResponse = useResponseStore((state) => state.addResponse);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out heading and paragraph fields before validation
    const formFields = fields.filter(f => f.type !== 'heading' && f.type !== 'paragraph');
    
    const isValid = validateForm(formFields, formData);
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Transform the data to use field labels instead of IDs
      const labeledData = formFields.reduce((acc, field) => {
        if (formData[field.id] !== undefined) {
          acc[field.label] = formData[field.id];
        }
        return acc;
      }, {} as Record<string, any>);

      const response = {
        id: nanoid(),
        formId,
        data: labeledData,
        submittedAt: new Date().toISOString()
      };

      addResponse(response);

      toast({
        title: "Success!",
        description: "Form submitted successfully"
      });
      
      setFormData({});
      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    getFieldError,
    handleFieldChange,
    handleSubmit
  };
}