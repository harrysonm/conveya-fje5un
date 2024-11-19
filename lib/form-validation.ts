import { FormField, FormValidation } from "@/types/form";

export function validateField(field: FormField, value: any): string | null {
  const validation = field.validation;
  if (!validation) return null;

  // Required field check
  if (validation.required && !value) {
    return "This field is required";
  }

  // Skip other validations if field is empty and not required
  if (!value) return null;

  switch (field.type) {
    case "text":
    case "textarea":
      return validateTextInput(value, validation);
    
    case "email":
      return validateEmail(value, validation);
    
    case "file":
      return validateFile(value, validation);
    
    case "number-rating":
      return validateNumber(value, validation);
    
    case "select":
    case "multi-select":
      return validateSelect(value, validation, field.type === "multi-select");

    case "url":
      return validateURL(value, validation);
  }

  return null;
}

function validateTextInput(value: string, validation: FormValidation): string | null {
  if (validation.minLength && value.length < validation.minLength) {
    return `Minimum ${validation.minLength} characters required`;
  }

  if (validation.maxLength && value.length > validation.maxLength) {
    return `Maximum ${validation.maxLength} characters allowed`;
  }

  if (validation.pattern) {
    const regex = new RegExp(validation.pattern);
    if (!regex.test(value)) {
      return "Invalid format";
    }
  }

  return null;
}

function validateEmail(value: string, validation: FormValidation): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Invalid email address";
  }

  return null;
}

function validateFile(files: FileList, validation: FormValidation): string | null {
  const file = files[0];
  
  if (validation.fileSize && file.size > validation.fileSize * 1024 * 1024) {
    return `File size must be less than ${validation.fileSize}MB`;
  }

  if (validation.fileTypes && validation.fileTypes.length > 0) {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!validation.fileTypes.includes(`.${fileExtension}`)) {
      return `Accepted file types: ${validation.fileTypes.join(', ')}`;
    }
  }

  return null;
}

function validateNumber(value: number, validation: FormValidation): string | null {
  if (validation.min !== undefined && value < validation.min) {
    return `Minimum value is ${validation.min}`;
  }

  if (validation.max !== undefined && value > validation.max) {
    return `Maximum value is ${validation.max}`;
  }

  return null;
}

function validateSelect(value: string | string[], validation: FormValidation, isMulti: boolean): string | null {
  if (isMulti) {
    const selected = Array.isArray(value) ? value : [];
    if (validation.min && selected.length < validation.min) {
      return `Select at least ${validation.min} options`;
    }
    if (validation.max && selected.length > validation.max) {
      return `Select no more than ${validation.max} options`;
    }
  }

  return null;
}

function validateURL(value: string, validation: FormValidation): string | null {
  // Basic URL validation
  try {
    new URL(value);
  } catch {
    return "Please enter a valid URL";
  }

  // Check if protocol is required
  if (validation.protocol && !value.startsWith('http://') && !value.startsWith('https://')) {
    return "URL must start with http:// or https://";
  }

  return null;
}