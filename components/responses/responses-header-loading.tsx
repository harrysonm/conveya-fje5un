"use client";

import { Button } from "@/components/ui/button";
import { PanelLeft, Plug, Eye, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ResponsesHeaderLoading() {
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 px-4 sm:px-5 py-2">
      <div className="flex items-center gap-1.5">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-7 w-7"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center text-sm">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div className="hidden sm:flex items-center">
        <ToggleGroup type="single" value="responses" className="w-[240px]">
          <ToggleGroupItem value="create" className="flex-1 gap-2">
            <Skeleton className="h-4 w-4" />
            Create
          </ToggleGroupItem>
          <ToggleGroupItem value="responses" className="w-full gap-2">
            <Skeleton className="h-4 w-4" />
            Responses
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Plug className="h-4 w-4 text-neutral-500" />
        </Button>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Eye className="h-4 w-4 text-neutral-500" />
        </Button>
        <Button size="sm" className="h-9 ml-1">
          <Share2 className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
    </div>
  );
}