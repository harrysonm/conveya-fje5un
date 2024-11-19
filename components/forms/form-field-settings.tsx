"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

interface FormFieldSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  field: {
    label: string;
    placeholder: string;
    required?: boolean;
  };
  onFieldUpdate: (field: any) => void;
}

export function FormFieldSettings({
  open,
  onOpenChange,
  field,
  onFieldUpdate,
}: FormFieldSettingsProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Field Settings</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <Label>Label</Label>
            <Input
              value={field.label}
              onChange={(e) =>
                onFieldUpdate({ ...field, label: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Placeholder</Label>
            <Input
              value={field.placeholder}
              onChange={(e) =>
                onFieldUpdate({ ...field, placeholder: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Required field</Label>
            <Switch
              checked={field.required}
              onCheckedChange={(checked) =>
                onFieldUpdate({ ...field, required: checked })
              }
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}