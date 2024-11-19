"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/stores/form-store";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { FormPreviewThumbnail } from "@/components/forms/form-preview-thumbnail";
import { FormPreview } from "@/components/forms/preview/form-preview";

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    fields: any[];
    themeSettings?: {
      coverType: 'none' | 'color' | 'image';
      coverColor?: string;
      coverImage?: string;
      showLogo: boolean;
      logo?: string;
    };
  };
}

export function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter();
  const addForm = useFormStore((state) => state.addForm);
  const [showPreview, setShowPreview] = useState(false);

  const handleUseTemplate = () => {
    const newForm = {
      id: nanoid(),
      name: template.name,
      title: template.name,
      description: template.description,
      responses: 0,
      lastUpdated: new Date().toISOString(),
      fields: template.fields,
      themeSettings: template.themeSettings || {
        coverType: 'none',
        showLogo: true,
        coverColor: "#f3f4f6",
        coverImage: "",
        logo: ""
      }
    };

    addForm(newForm);
    router.push(`/edit/${newForm.id}`);
  };

  return (
    <div className="group relative rounded-md border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div 
        className="relative cursor-pointer bg-neutral-50 h-[144px]"
        onClick={() => setShowPreview(true)}
      >
        <FormPreviewThumbnail
          title={template.name}
          description={template.description}
          fields={template.fields}
          themeSettings={template.themeSettings || {
            coverType: 'none',
            showLogo: true,
            coverColor: "#f3f4f6",
            coverImage: "",
            logo: ""
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 
          className="font-medium text-sm text-gray-900 mb-1 cursor-pointer"
          onClick={() => setShowPreview(true)}
        >
          {template.name}
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          {template.description}
        </p>
        <div className="mt-auto">
          <Button 
            variant="ghost"
            size="sm"
            className="w-auto"
            onClick={handleUseTemplate}
          >
            Use template
          </Button>
        </div>
      </div>

      <FormPreview
        open={showPreview}
        onOpenChange={setShowPreview}
        title={template.name}
        description={template.description}
        fields={template.fields}
        name={template.name}
        formId={template.id}
        themeSettings={template.themeSettings || {
          coverType: 'none',
          showLogo: true,
          coverColor: "#f3f4f6",
          coverImage: "",
          logo: ""
        }}
      />
    </div>
  );
}