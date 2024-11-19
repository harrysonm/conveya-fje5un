"use client";

import { useState, useRef } from "react";
import { FormTitle } from "../form-title";
import { FormDescription } from "../form-description";
import { FormFieldSettings } from "../settings/field-settings/field-settings";
import { ThemeSettings } from "../settings/theme-settings";
import { FormLogo } from "../form-logo";
import { SortableFormField } from "../sortable-form-field";
import { FormSubmitButton } from "../form-submit-button";
import { ButtonSettings } from "../settings/button-settings";
import { ButtonSettings as ButtonSettingsType } from "@/types/button";
import { cn } from "@/lib/utils";
import { FormField } from "@/types/form";
import { useThemeStore } from "@/stores/theme-store";
import { formElements } from "@/lib/constants/form-elements";
import { FormPreview } from "../preview/form-preview";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useClickOutside } from "@/hooks/use-click-outside";

const defaultSettings = {
  coverType: 'none' as const,
  showLogo: true
};

const defaultButtonSettings: ButtonSettingsType = {
  label: "Submit",
  variant: "default",
  size: "default",
  fullWidth: false
};

interface FormBuilderProps {
  isThemeSettingsOpen: boolean;
  onThemeSettingsOpenChange: (open: boolean) => void;
  isPreviewOpen: boolean;
  onPreviewOpenChange: (open: boolean) => void;
  isShareOpen: boolean;
  onShareOpenChange: (open: boolean) => void;
  title?: string;
  onTitleChange?: (title: string) => void;
  description?: string;
  onDescriptionChange?: (description: string) => void;
  themeSettings?: {
    coverType: 'none' | 'color' | 'image';
    coverColor?: string;
    coverImage?: string;
    showLogo: boolean;
    logo?: string;
  };
  onThemeSettingsChange?: (settings: any) => void;
  fields?: FormField[];
  onFieldsChange?: (fields: FormField[]) => void;
  buttonSettings?: ButtonSettingsType;
  onButtonSettingsChange?: (settings: ButtonSettingsType) => void;
  enableReview?: boolean;
}

export function FormBuilder({
  isThemeSettingsOpen,
  onThemeSettingsOpenChange,
  isPreviewOpen,
  onPreviewOpenChange,
  isShareOpen,
  onShareOpenChange,
  title = "",
  onTitleChange,
  description = "",
  onDescriptionChange,
  themeSettings = defaultSettings,
  onThemeSettingsChange,
  fields = [],
  onFieldsChange,
  buttonSettings = defaultButtonSettings,
  onButtonSettingsChange,
  enableReview = false
}: FormBuilderProps) {
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [showButtonSettings, setShowButtonSettings] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { theme } = useThemeStore();

  const formBuilderRef = useRef<HTMLDivElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useClickOutside(
    formBuilderRef,
    () => {
      if (selectedField) {
        setSelectedField(null);
      }
    },
    !!selectedField,
    [settingsPanelRef]
  );

  const handleFieldClick = (field: FormField) => {
    setSelectedField(field);
  };

  const handleAddField = (type: string, afterFieldId?: string) => {
    const fieldElement = formElements
      .flatMap(category => category.items)
      .find(item => item.type === type);

    const newField: FormField = {
      id: Math.random().toString(36).slice(2, 11),
      type,
      label: type === 'heading' ? 'Heading' : 
             type === 'paragraph' ? 'Paragraph' : 
             type === 'page-break' ? '' :
             `New ${type} field`,
      placeholder: type === 'heading' ? 'Enter heading' :
                  type === 'paragraph' ? 'Enter text' :
                  type === 'page-break' ? '' :
                  `Enter ${type}`,
      helperText: "",
      validation: {
        required: false
      },
      settings: {
        headingLevel: type === 'heading' ? 2 : undefined,
        visible: true
      },
      content: type === 'heading' ? 'New Heading' :
              type === 'paragraph' ? 'Enter your text here' :
              undefined,
      options: fieldElement?.defaultOptions || []
    };

    if (afterFieldId) {
      const index = fields.findIndex(f => f.id === afterFieldId);
      const newFields = [...fields];
      newFields.splice(index + 1, 0, newField);
      onFieldsChange?.(newFields);
    } else {
      onFieldsChange?.([...fields, newField]);
    }
  };

  const handleDeleteField = (id: string) => {
    onFieldsChange?.(fields.filter(field => field.id !== id));
    if (selectedField?.id === id) {
      setSelectedField(null);
    }
  };

  const handleFieldUpdate = (updatedField: FormField) => {
    const updatedFields = fields.map(field => 
      field.id === updatedField.id ? updatedField : field
    );
    onFieldsChange?.(updatedFields);
    
    if (selectedField?.id === updatedField.id) {
      setSelectedField(updatedField);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      
      const newFields = [...fields];
      const [removed] = newFields.splice(oldIndex, 1);
      newFields.splice(newIndex, 0, removed);
      
      onFieldsChange?.(newFields);
    }
  };

  // Theme styles for consistent appearance
  const themeStyles = {
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

  return (
    <div className="relative h-full" ref={formBuilderRef}>
      <div className="h-full overflow-y-auto" style={themeStyles}>
        <div className="w-full">
          {themeSettings.coverType !== 'none' && (
            <div 
              className="w-full h-48"
              style={{
                backgroundColor: themeSettings.coverType === 'color' ? themeSettings.coverColor : undefined,
                backgroundImage: themeSettings.coverType === 'image' && themeSettings.coverImage ? `url(${themeSettings.coverImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          )}
          
          <div className={cn(
            "max-w-[640px] mx-auto px-5 pb-20",
            themeSettings.coverType === 'none' && themeSettings.showLogo && "pt-24",
            themeSettings.coverType !== 'none' && !themeSettings.showLogo && "pt-12",
            themeSettings.coverType === 'none' && !themeSettings.showLogo && "pt-12"
          )}>
            {themeSettings.showLogo && (
              <div className="mb-12">
                <FormLogo
                  logo={themeSettings.logo}
                  onLogoChange={(logo) => onThemeSettingsChange?.({
                    ...themeSettings,
                    logo
                  })}
                />
              </div>
            )}
            <div className="space-y-[var(--theme-spacing)]">
              <div>
                <FormTitle 
                  title={title}
                  onTitleChange={onTitleChange}
                  onAddField={(type) => handleAddField(type)}
                />
                <FormDescription
                  description={description}
                  onDescriptionChange={onDescriptionChange}
                  onAddField={(type) => handleAddField(type)}
                />
              </div>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={fields.map(f => f.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {fields.map((field) => (
                    <SortableFormField
                      key={field.id} 
                      field={field}
                      onDelete={handleDeleteField}
                      onEdit={() => handleFieldClick(field)}
                      onAdd={handleAddField}
                      onFieldChange={handleFieldUpdate}
                      isSelected={selectedField?.id === field.id}
                    />
                  ))}
                </SortableContext>
              </DndContext>
              <div className="pt-4">
                <FormSubmitButton 
                  settings={buttonSettings}
                  onSettingsChange={onButtonSettingsChange}
                  onEdit={() => setShowButtonSettings(true)}
                  preview={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedField && (
        <div className="absolute top-0 right-0 bottom-0 w-[400px] border-l border-neutral-100 bg-white" ref={settingsPanelRef}>
          <FormFieldSettings
            field={selectedField}
            onFieldUpdate={handleFieldUpdate}
            onDismiss={() => setSelectedField(null)}
            fields={fields}
          />
        </div>
      )}

      {isThemeSettingsOpen && (
        <div className="absolute top-0 right-0 bottom-0 w-[400px] border-l border-neutral-100 bg-white">
          <ThemeSettings
            settings={themeSettings}
            onSettingsChange={onThemeSettingsChange}
            onClose={() => onThemeSettingsOpenChange(false)}
          />
        </div>
      )}

      {showButtonSettings && (
        <div className="absolute top-0 right-0 bottom-0 w-[400px] border-l border-neutral-100 bg-white">
          <ButtonSettings
            settings={buttonSettings}
            onSettingsChange={onButtonSettingsChange}
            open={showButtonSettings}
            onOpenChange={setShowButtonSettings}
          />
        </div>
      )}

      <FormPreview
        open={isPreviewOpen}
        onOpenChange={onPreviewOpenChange}
        title={title}
        description={description}
        fields={fields}
        name="Form Preview"
        formId="preview"
        themeSettings={themeSettings}
        buttonSettings={buttonSettings}
        formData={formData}
        enableReview={enableReview}
      />
    </div>
  );
}