"use client";

import { cn } from "@/lib/utils";
import { FormField as IFormField } from "@/types/form";
import { useThemeStore } from "@/stores/theme-store";
import { TextField } from "./fields/text-field";
import { TextareaField } from "./fields/textarea-field";
import { EmailField } from "./fields/email-field";
import { PhoneField } from "./fields/phone-field";
import { DateField } from "./fields/date-field";
import { TimeField } from "./fields/time-field";
import { FileUploadField } from "./fields/file-upload";
import { StarRatingField } from "./fields/star-rating";
import { NumberRatingField } from "./fields/number-rating";
import { SelectField } from "./fields/select-field";
import { HeadingField } from "./fields/heading-field";
import { ParagraphField } from "./fields/paragraph-field";
import { DropdownField } from "./fields/dropdown-field";
import { URLField } from "./fields/url-field";
import { PageBreak } from "./fields/page-break";
import { CheckboxField } from "./fields/checkbox-field";
import { Label } from "@/components/ui/label";
import { HiddenBadge } from "./badges/hidden-badge";

interface FormFieldProps {
  field: IFormField;
  onFieldChange?: (field: Partial<IFormField>) => void;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  error?: string;
  onEdit?: () => void;
}

export function FormField({ 
  field,
  onFieldChange,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value,
  onChange,
  className,
  error,
  onEdit
}: FormFieldProps) {
  const { theme } = useThemeStore();
  
  if (!field) return null;

  const radiusMap = {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  };

  const fieldStyles = {
    "--radius": radiusMap[theme.borderRadius],
    "--border": theme.colors.border,
  } as React.CSSProperties;

  const components = {
    text: TextField,
    textarea: TextareaField,
    email: EmailField,
    phone: PhoneField,
    date: DateField,
    time: TimeField,
    file: FileUploadField,
    'star-rating': StarRatingField,
    'number-rating': NumberRatingField,
    select: SelectField,
    'multi-select': SelectField,
    heading: HeadingField,
    paragraph: ParagraphField,
    dropdown: DropdownField,
    url: URLField,
    'page-break': PageBreak,
    checkbox: CheckboxField
  };

  const Component = components[field.type];
  if (!Component) return null;

  const isContentField = field.type === 'heading' || field.type === 'paragraph';
  const isPageBreak = field.type === 'page-break';
  const isHidden = !isContentField && !isPageBreak && field.settings?.visible === false;

  // Don't render hidden fields in preview mode
  if (preview && isHidden) {
    return null;
  }

  return (
    <div 
      className={cn(
        "form-field",
        "[&_input]:rounded-[var(--radius)] [&_input]:border-[var(--border)]",
        "[&_textarea]:rounded-[var(--radius)] [&_textarea]:border-[var(--border)]",
        "[&_select]:rounded-[var(--radius)] [&_select]:border-[var(--border)]",
        "[&_button]:rounded-[var(--radius)] [&_button]:border-[var(--border)]",
        "[&_.select-trigger]:rounded-[var(--radius)] [&_.select-trigger]:border-[var(--border)]",
        "[&_.select-content]:rounded-[var(--radius)]",
        "[&_.file-input]:rounded-[var(--radius)] [&_.file-input]:border-[var(--border)]",
        "[&_.rating-button]:rounded-[var(--radius)] [&_.rating-button]:border-[var(--border)]",
        className
      )}
      style={fieldStyles}
    >
      {!isPageBreak && (
        <div className="flex items-center justify-between mb-2">
          {isHidden && !isContentField && !preview && <HiddenBadge />}
        </div>
      )}
      
      <Component
        field={field}
        onFieldChange={onFieldChange}
        showLabel={showLabel}
        showHelperText={showHelperText}
        preview={preview}
        value={value}
        onChange={onChange}
        error={error}
        onEdit={onEdit}
      />
    </div>
  );
}