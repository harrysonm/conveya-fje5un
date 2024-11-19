"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { useFormStore } from "@/stores/form-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewFormModal({ open, onOpenChange }: NewFormModalProps) {
  const [name, setName] = useState("");
  const router = useRouter();
  const addForm = useFormStore((state) => state.addForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const newForm = {
      id: nanoid(),
      name,
      title: "Untitled form",
      description: "",
      responses: 0,
      lastUpdated: new Date().toISOString(), // Ensure proper ISO date string
      fields: [],
      themeSettings: {
        coverType: 'color' as const,
        showLogo: true,
        coverImage: "",
        coverColor: "#f3f4f6"
      }
    };

    addForm(newForm);
    onOpenChange(false);
    router.push(`/edit/${newForm.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new form</DialogTitle>
          <DialogDescription>
            Give your form a name to get started. You can change this later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Form name"
              className="w-full"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}