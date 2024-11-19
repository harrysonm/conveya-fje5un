"use client";

import { useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import { useFormStore } from "@/stores/form-store";
import { Sidebar } from "@/components/layout/sidebar";
import { FormBuilder } from "@/components/forms/form-builder";
import { FormBuilderHeader } from "@/components/forms/form-builder-header";
import { ShareSettings } from "@/components/forms/settings/share-settings";
import { ButtonSettings } from "@/types/button";
import { Form } from "@/types/form";

export default function EditFormClient() {
  const params = useParams();
  const router = useRouter();
  const form = useFormStore(state => state.forms.find(f => f.id === params.id && !f.deletedAt));
  const updateForm = useFormStore(state => state.updateForm);
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [enableReview, setEnableReview] = useState(false);

  // Redirect to not-found if form doesn't exist or is deleted
  if (!form) {
    notFound();
  }

  const handleTitleChange = async (title: string) => {
    await updateForm(params.id as string, { title });
  };

  const handleDescriptionChange = async (description: string) => {
    await updateForm(params.id as string, { description });
  };

  const handleThemeSettingsChange = async (newSettings: Form['themeSettings']) => {
    await updateForm(params.id as string, { themeSettings: newSettings });
  };

  const handleFieldsChange = async (newFields: Form['fields']) => {
    await updateForm(params.id as string, { fields: newFields });
  };

  const handleButtonSettingsChange = async (newSettings: ButtonSettings) => {
    await updateForm(params.id as string, { 
      buttonSettings: newSettings 
    } as Partial<Form>);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <FormBuilderHeader 
          onThemeSettingsOpen={() => setIsThemeSettingsOpen(true)}
          onPreviewOpen={() => setIsPreviewOpen(true)}
          onShareOpen={() => setIsShareOpen(true)}
        />
        <div className="flex-1 overflow-y-auto relative">
          <FormBuilder 
            isThemeSettingsOpen={isThemeSettingsOpen}
            onThemeSettingsOpenChange={setIsThemeSettingsOpen}
            isPreviewOpen={isPreviewOpen}
            onPreviewOpenChange={setIsPreviewOpen}
            isShareOpen={isShareOpen}
            onShareOpenChange={setIsShareOpen}
            title={form.title}
            onTitleChange={handleTitleChange}
            description={form.description}
            onDescriptionChange={handleDescriptionChange}
            themeSettings={form.themeSettings}
            onThemeSettingsChange={handleThemeSettingsChange}
            fields={form.fields}
            onFieldsChange={handleFieldsChange}
            buttonSettings={form.buttonSettings}
            onButtonSettingsChange={handleButtonSettingsChange}
            enableReview={enableReview}
          />

          {isShareOpen && (
            <div className="absolute inset-y-0 right-0 w-[400px] border-l border-neutral-100 bg-white">
              <ShareSettings
                formId={params.id as string}
                onClose={() => setIsShareOpen(false)}
                onEnableReviewChange={setEnableReview}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}