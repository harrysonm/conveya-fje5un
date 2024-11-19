"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { FormBuilder } from "@/components/forms/form-builder";
import { FormBuilderHeader } from "@/components/forms/form-builder-header";
import { useState } from "react";

export default function NewFormPage() {
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("Untitled form");

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <FormBuilderHeader 
          onThemeSettingsOpen={() => setIsThemeSettingsOpen(true)}
          onPreviewOpen={() => setIsPreviewOpen(true)}
          onShareOpen={() => setIsShareOpen(true)}
        />
        <FormBuilder 
          isThemeSettingsOpen={isThemeSettingsOpen}
          onThemeSettingsOpenChange={setIsThemeSettingsOpen}
          title={formTitle}
          onTitleChange={setFormTitle}
          isPreviewOpen={isPreviewOpen}
          onPreviewOpenChange={setIsPreviewOpen}
          isShareOpen={isShareOpen}
          onShareOpenChange={setIsShareOpen}
        />
      </main>
    </div>
  );
}