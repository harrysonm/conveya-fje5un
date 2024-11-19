"use client";

import { useState } from "react";
import { useFormStore } from "@/stores/form-store";
import { Sidebar } from "@/components/layout/sidebar";
import { DeletedHeader } from "@/components/deleted/deleted-header";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { MoreHorizontal, Inbox } from "lucide-react";
import { FormPreviewThumbnail } from "@/components/forms/form-preview-thumbnail";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DeletedPage() {
  const deletedForms = useFormStore((state) => state.forms.filter(f => f.deletedAt));
  const restoreForm = useFormStore((state) => state.restoreForm);
  const permanentlyDeleteForm = useFormStore((state) => state.permanentlyDeleteForm);

  const handleRestore = (id: string) => {
    restoreForm(id);
    toast({ description: "Form restored" });
  };

  const handlePermanentDelete = (id: string) => {
    permanentlyDeleteForm(id);
    toast({ description: "Form permanently deleted" });
  };

  if (deletedForms.length === 0) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <DeletedHeader />
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md mx-auto text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold mb-2">No deleted forms</h2>
              <p className="text-sm text-neutral-500">
                Forms that you delete will appear here
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <DeletedHeader />
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {deletedForms.map((form) => (
              <div
                key={form.id}
                className="group relative rounded-md border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative bg-neutral-50 h-[144px]">
                  <FormPreviewThumbnail 
                    title={form.title}
                    description={form.description}
                    fields={form.fields}
                    themeSettings={form.themeSettings}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-base text-gray-900 mb-1">
                      {form.name}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem onClick={() => handleRestore(form.id)}>
                          Restore
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handlePermanentDelete(form.id)}
                        >
                          Delete Permanently
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span>Deleted {new Date(form.deletedAt!).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}