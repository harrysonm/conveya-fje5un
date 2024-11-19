"use client";

import { useState, useCallback } from 'react';
import { FormField } from '@/types/form';

interface ValidationError {
  fieldId: string;
  message: string;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateField = useCallback((field: FormField, value: any): string | null => {
    // Skip validation for content fields
    if (field.type === 'heading' || field.type === 'paragraph') return null;

    // Required field check
    if (field.validation?.required && !value) {
      return `${field.label} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value && !field.validation?.required) return null;

    switch (field.type) {
      case 'text':
      case 'textarea':
        if (field.validation?.minLength && value.length < field.validation.minLength) {
          return `${field.label} must be at least ${field.validation.minLength} characters`;
        }
        if (field.validation?.maxLength && value.length > field.validation.maxLength) {
          return `${field.label} must be no more than ${field.validation.maxLength} characters`;
        }
        if (field.validation?.pattern) {
          const regex = new RegExp(field.validation.pattern);
          if (!regex.test(value)) {
            return `${field.label} format is invalid`;
          }
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        break;

      case 'phone':
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(value)) {
          return 'Please enter a valid phone number';
        }
        break;

      case 'number-rating':
        const num = Number(value);
        if (field.validation?.min !== undefined && num < field.validation.min) {
          return `${field.label} must be at least ${field.validation.min}`;
        }
        if (field.validation?.max !== undefined && num > field.validation.max) {
          return `${field.label} must be no more than ${field.validation.max}`;
        }
        break;

      case 'file':
        if (value instanceof FileList) {
          const file = value[0];
          if (field.settings?.maxFileSize && file.size > field.settings.maxFileSize * 1024 * 1024) {
            return `File size must be less than ${field.settings.maxFileSize}MB`;
          }
          if (field.settings?.acceptedFileTypes?.length) {
            const fileType = file.name.split('.').pop()?.toLowerCase();
            if (!field.settings.acceptedFileTypes.includes(`.${fileType}`)) {
              return `File type must be: ${field.settings.acceptedFileTypes.join(', ')}`;
            }
          }
        }
        break;

      case 'select':
      case 'multi-select':
        const selected = Array.isArray(value) ? value : [value];
        if (field.validation?.min && selected.length < field.validation.min) {
          return `Please select at least ${field.validation.min} options`;
        }
        if (field.validation?.max && selected.length > field.validation.max) {
          return `Please select no more than ${field.validation.max} options`;
        }
        break;
    }

    return null;
  }, []);

  const validateForm = useCallback((fields: FormField[], values: Record<string, any>) => {
    const newErrors: ValidationError[] = [];

    fields.forEach(field => {
      // Skip validation for content fields
      if (field.type === 'heading' || field.type === 'paragraph') return;

      const error = validateField(field, values[field.id]);
      if (error) {
        newErrors.push({
          fieldId: field.id,
          message: error
        });
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [validateField]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getFieldError = useCallback((fieldId: string) => {
    return errors.find(error => error.fieldId === fieldId)?.message;
  }, [errors]);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    getFieldError
  };
}