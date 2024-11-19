export interface FormValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  email?: boolean;
  fileSize?: number;
  fileTypes?: string[];
  min?: number;
  max?: number;
  customError?: string;
  url?: boolean;
  protocol?: boolean;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'date' | 'time' | 'textarea' | 'file' | 'star-rating' | 'number-rating' | 'select' | 'multi-select' | 'heading' | 'paragraph' | 'dropdown' | 'url' | 'page-break' | 'checkbox';
  label: string;
  placeholder?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
  validation?: FormValidation;
  error?: string;
  content?: string;
  settings?: {
    required?: boolean;
    showLabel?: boolean;
    showPlaceholder?: boolean;
    showHelperText?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    multiple?: boolean;
    acceptedFileTypes?: string[];
    maxFileSize?: number;
    maxStars?: number;
    maxRating?: number;
    allowHalfStars?: boolean;
    showValues?: boolean;
    headingLevel?: 1 | 2 | 3;
    disabled?: boolean;
    clearable?: boolean;
    searchable?: boolean;
    requireProtocol?: boolean;
    visible?: boolean;
    stepTitle?: string;
    stepDescription?: string;
  };
}