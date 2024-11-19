"use client";

import { useState } from "react";
import { useFormStore } from "@/stores/form-store";
import { useResponseStore } from "@/stores/response-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText, Plus } from "lucide-react";
import { Form } from "@/types/form";
import { formatDistanceToNow, parseISO } from "date-fns";
import { FormPreviewThumbnail } from "./form-preview-thumbnail";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NewFormModal } from "./new-form-modal";
import { toast } from "@/hooks/use-toast";

export function FormList() {
  const forms = useFormStore((state) => state.forms.filter(f => !f.deletedAt));
  const updateForm = useFormStore((state) => state.updateForm);
  const deleteForm = useFormStore((state) => state.deleteForm);
  const addForm = useFormStore((state) => state.addForm);
  const getFormResponses = useResponseStore((state) => state.getFormResponses);
  const router = useRouter();
  const [renameForm, setRenameForm] = useState<{ id: string; name: string } | null>(null);
  const [showNewFormModal, setShowNewFormModal] = useState(false);

  const handleRename = async () => {
    if (renameForm) {
      await updateForm(renameForm.id, { 
        name: renameForm.name,
        lastUpdated: new Date().toISOString()
      });
      setRenameForm(null);
      toast({ description: "Form renamed" });
    }
  };

  const handleDuplicate = (form: Form) => {
    const id = Math.random().toString(36).slice(2, 11);
    const newForm = {
      ...form,
      id,
      name: `${form.name} (Copy)`,
      responses: 0,
      lastUpdated: new Date().toISOString()
    };
    addForm(newForm);
    toast({ description: "Form duplicated" });
  };

  const handleDelete = (id: string) => {
    deleteForm(id);
    toast({ description: "Form moved to trash" });
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };

  if (forms.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
            <FileText className="h-6 w-6 text-neutral-400" />
          </div>
          
          <h2 className="text-lg font-semibold mb-2">
            No forms yet
          </h2>
          
          <p className="text-sm text-neutral-500 mb-6">
            Create your first form to start collecting responses
          </p>

          <Button onClick={() => setShowNewFormModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create form
          </Button>
        </div>

        <NewFormModal 
          open={showNewFormModal} 
          onOpenChange={setShowNewFormModal} 
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {forms.map((form) => {
            const responses = getFormResponses(form.id);
            const responseCount = responses.length;
            const timeAgo = formatTimeAgo(form.lastUpdated);

            return (
              <div
                key={form.id}
                className="group relative rounded-md border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
              >
                <div 
                  className="relative cursor-pointer bg-neutral-50"
                  onClick={() => router.push(`/edit/${form.id}`)}
                >
                  <FormPreviewThumbnail 
                    title={form.title}
                    description={form.description}
                    fields={form.fields}
                    themeSettings={form.themeSettings}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 
                      className="font-medium text-base text-gray-900 mb-1 cursor-pointer"
                      onClick={() => router.push(`/edit/${form.id}`)}
                    >
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
                        <DropdownMenuItem onClick={() => router.push(`/edit/${form.id}`)}>
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRenameForm({ id: form.id, name: form.name })}>
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(form)}>
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(form.id)}
                        >
                          Move to Trash
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span>{responseCount} {responseCount === 1 ? 'Response' : 'Responses'}</span>
                    <span>•</span>
                    <span>{timeAgo}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!renameForm} onOpenChange={(open) => !open && setRenameForm(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename form</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={renameForm?.name || ""}
              onChange={(e) => setRenameForm(prev => prev ? { ...prev, name: e.target.value } : null)}
              placeholder="Form name"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameForm(null)}>
              Cancel
            </Button>
            <Button onClick={handleRename}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <NewFormModal 
        open={showNewFormModal} 
        onOpenChange={setShowNewFormModal} 
      />
    </div>
  );
}