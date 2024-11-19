"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Inbox, 
  Share2,
  Eye,
  PanelLeft,
  Palette,
  Plug,
  Wand2,
  ChevronRight,
  Loader2
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebarStore } from "@/stores/sidebar-store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useFormStore } from "@/stores/form-store";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FormBuilderHeaderProps {
  onThemeSettingsOpen: () => void;
  onPreviewOpen: () => void;
  onShareOpen: () => void;
}

export function FormBuilderHeader({ 
  onThemeSettingsOpen, 
  onPreviewOpen,
  onShareOpen
}: FormBuilderHeaderProps) {
  const { toggleSidebar } = useSidebarStore();
  const params = useParams();
  const router = useRouter();
  const form = useFormStore(state => 
    state.forms.find(f => f.id === params.id)
  );
  const updateForm = useFormStore(state => state.updateForm);
  const [isNavigatingToResponses, setIsNavigatingToResponses] = useState(false);

  const handleNameChange = async (name: string) => {
    if (form) {
      await updateForm(form.id, { name });
    }
  };

  const handleNavigateToResponses = () => {
    setIsNavigatingToResponses(true);
    router.push(`/responses/${params.id}`);
  };

  return (
    <div className="flex items-center justify-between border-b border-neutral-100 px-4 sm:px-5 py-2">
      <div className="flex items-center gap-1.5">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-7 w-7"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-4 w-4 text-neutral-500" />
        </Button>
        <div className="flex items-center text-sm">
          <Link 
            href="/"
            className="text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Forms
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-neutral-400" />
          <Input
            value={form?.name || "New form"}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-auto h-9 bg-transparent border-0 text-sm font-normal px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="hidden sm:flex items-center">
        <ToggleGroup type="single" value="create" className="w-[240px]">
          <ToggleGroupItem value="create" className="flex-1 px-4 py-2 gap-2">
            <Wand2 className="h-4 w-4 text-neutral-500" />
            Create
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="responses" 
            className="flex-1 px-4 py-2 gap-2"
            onClick={handleNavigateToResponses}
          >
            {isNavigatingToResponses ? (
              <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
            ) : (
              <Inbox className="h-4 w-4 text-neutral-500" />
            )}
            Responses
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 w-9 p-0"
                onClick={onThemeSettingsOpen}
              >
                <Palette className="h-4 w-4 text-neutral-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Theme</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Plug className="h-4 w-4 text-neutral-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Integrations</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 w-9 p-0"
                onClick={onPreviewOpen}
              >
                <Eye className="h-4 w-4 text-neutral-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Preview</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button 
          size="sm" 
          className="h-9 ml-1"
          onClick={onShareOpen}
        >
          <Share2 className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
    </div>
  );
}