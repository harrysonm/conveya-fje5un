"use client";

import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { useSidebarStore } from "@/stores/sidebar-store";

export function FeedbackHeader() {
  const { toggleSidebar } = useSidebarStore();

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
        <h1 className="text-sm font-normal">Send Feedback</h1>
      </div>
    </div>
  );
}