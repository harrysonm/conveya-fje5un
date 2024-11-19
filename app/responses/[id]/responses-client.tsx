"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { ResponsesHeader } from "@/components/responses/responses-header";
import { ResponsesTable } from "@/components/responses/responses-table";
import { useState } from "react";
import { FormPreview } from "@/components/forms/preview/form-preview";
import { ShareSettings } from "@/components/forms/settings/share-settings";
import { useFormStore } from "@/stores/form-store";
import { notFound, useParams } from "next/navigation";

export default function ResponsesClient() {
  const params = useParams();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const form = useFormStore(state => state.forms.find(f => f.id === params.id));

  if (!form) {
    notFound();
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <ResponsesHeader 
          onShareOpen={() => setIsShareOpen(true)} 
          onPreviewOpen={() => setIsPreviewOpen(true)}
        />
        <div className="flex-1 overflow-y-auto relative">
          <ResponsesTable />
          {isShareOpen && (
            <div className="absolute inset-y-0 right-0 w-[320px] border-l border-neutral-100 bg-white overflow-y-auto z-10">
              <ShareSettings
                formId={params.id as string}
                onClose={() => setIsShareOpen(false)}
              />
            </div>
          )}
        </div>
      </main>

      <FormPreview
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        title={form.title}
        description={form.description}
        fields={form.fields}
        name={form.name}
        themeSettings={form.themeSettings}
      />
    </div>
  );
}