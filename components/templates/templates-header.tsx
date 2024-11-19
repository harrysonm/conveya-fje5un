"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeft, Plus } from "lucide-react";
import { useSidebarStore } from "@/stores/sidebar-store";
import { NewFormModal } from "@/components/forms/new-form-modal";

export function TemplatesHeader() {
  const { toggleSidebar } = useSidebarStore();
  const [showNewFormModal, setShowNewFormModal] = useState(false);

  return (
    <div className="flex items-center justify-between px-5 py-2 border-b border-neutral-100">
      <div className="flex items-center gap-1.5">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-7 w-7"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-sm font-normal">Templates</h1>
      </div>

      <Button 
        variant="default" 
        size="sm" 
        className="h-9"
        onClick={() => setShowNewFormModal(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        New form
      </Button>

      <NewFormModal 
        open={showNewFormModal} 
        onOpenChange={setShowNewFormModal} 
      />
    </div>
  );
}