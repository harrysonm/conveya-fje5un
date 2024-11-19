"use client";

import { FormField } from "@/types/form";
import { useThemeStore } from "@/stores/theme-store";
import { cn } from "@/lib/utils";

interface FormPreviewThumbnailProps {
  title: string;
  description?: string;
  fields: FormField[];
  themeSettings?: {
    coverType: 'none' | 'color' | 'image';
    coverColor?: string;
    coverImage?: string;
    showLogo: boolean;
    logo?: string;
  };
}

export function FormPreviewThumbnail({ 
  title, 
  description, 
  fields,
  themeSettings = { coverType: 'none', showLogo: true }
}: FormPreviewThumbnailProps) {
  const { theme } = useThemeStore();
  
  // Get first 3 non-content fields for preview
  const previewFields = fields
    .filter(f => f.type !== 'heading' && f.type !== 'paragraph' && f.type !== 'page-break')
    .slice(0, 3);

  const getFieldPreview = (field: FormField) => {
    const commonLabelClasses = "text-[9px] font-medium text-neutral-600 truncate";

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'url':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className="h-6 bg-white border border-neutral-200 rounded flex items-center px-2">
              <div className="text-[8px] text-neutral-400 truncate">
                {field.placeholder || `Enter ${field.type}`}
              </div>
            </div>
          </div>
        );

      case 'textarea':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className="h-[40px] bg-white border border-neutral-200 rounded p-2">
              <div className="text-[8px] text-neutral-400 truncate">
                {field.placeholder || "Enter text"}
              </div>
            </div>
          </div>
        );

      case 'select':
      case 'multi-select':
      case 'dropdown':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className="h-6 bg-white border border-neutral-200 rounded flex items-center justify-between px-2">
              <div className="text-[8px] text-neutral-400 truncate">Select option</div>
              <div className="h-2 w-2 border-r border-b border-neutral-400 transform rotate-45 translate-y-[-1px]" />
            </div>
          </div>
        );

      case 'star-rating':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="h-4 w-4 text-[10px] text-neutral-200"
                >
                  ★
                </div>
              ))}
            </div>
          </div>
        );

      case 'number-rating':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="h-4 w-4 rounded border border-neutral-200 bg-white flex items-center justify-center text-[8px] text-neutral-400"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        );

      case 'file':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className="h-6 bg-white border border-dashed border-neutral-200 rounded flex items-center justify-center">
              <div className="text-[8px] text-neutral-400">Choose file</div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className="h-6 bg-white border border-neutral-200 rounded" />
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full bg-white p-4 overflow-hidden max-h-[144px]">
      {themeSettings?.coverType !== 'none' && (
        <div className="h-12 -mx-4 -mt-4 mb-3">
          {themeSettings?.coverType === 'color' && (
            <div 
              className="w-full h-full" 
              style={{ backgroundColor: themeSettings.coverColor || '#f3f4f6' }}
            />
          )}
          {themeSettings?.coverType === 'image' && themeSettings.coverImage && (
            <img
              src={themeSettings.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}
      
      {themeSettings?.showLogo && themeSettings?.logo && (
        <div className="w-6 h-6 rounded-full bg-white shadow-sm mb-3">
          <img 
            src={themeSettings.logo} 
            alt="" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      )}

      <div className="space-y-2">
        {/* Title and Description */}
        <div className="space-y-1">
          <div className="text-[11px] font-medium text-neutral-800 leading-tight line-clamp-1">
            {title}
          </div>
          {description && (
            <div className="text-[8px] text-neutral-500 leading-tight line-clamp-2">
              {description}
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="space-y-2 pt-1">
          {previewFields.map((field) => (
            <div key={field.id}>
              {getFieldPreview(field)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}