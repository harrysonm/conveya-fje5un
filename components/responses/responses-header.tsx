"use client";

import { Button } from "@/components/ui/button";
import { 
  Inbox, 
  Share2,
  Eye,
  PanelLeft,
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
import { useState } from "react";

interface ResponsesHeaderProps {
  onShareOpen: () => void;
  onPreviewOpen: () => void;
}

export function ResponsesHeader({ onShareOpen, onPreviewOpen }: ResponsesHeaderProps) {
  const { toggleSidebar } = useSidebarStore();
  const params = useParams();
  const router = useRouter();
  const form = useFormStore(state => 
    state.forms.find(f => f.id === params.id)
  );
  const updateForm = useFormStore(state => state.updateForm);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNameChange = async (name: string) => {
    if (form) {
      await updateForm(form.id, { name });
    }
  };

  const handleNavigate = (path: string) => {
    setIsNavigating(true);
    router.push(path);
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
          <PanelLeft className="h-4 w-4" />
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
            value={form?.name || "Form Responses"}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-auto h-9 bg-transparent border-0 text-sm font-normal px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="hidden sm:flex items-center">
        <ToggleGroup type="single" value="responses" className="w-[240px]">
          <ToggleGroupItem 
            value="create" 
            className="flex-1 px-4 py-2 gap-2"
            onClick={() => handleNavigate(`/edit/${params.id}`)}
          >
            {isNavigating ? (
              <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
            ) : (
              <Wand2 className="h-4 w-4 text-neutral-500" />
            )}
            Create
          </ToggleGroupItem>
          <ToggleGroupItem value="responses" className="flex-1 px-4 py-2 gap-2">
            <Inbox className="h-4 w-4 text-neutral-500" />
            Responses
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-1">
        <TooltipProvider>
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

        <Button size="sm" className="h-9 ml-1" onClick={onShareOpen}>
          <Share2 className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
    </div>
  );
}