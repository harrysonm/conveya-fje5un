"use client";

import { forwardRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolbarButton } from "./toolbar-button";
import { Link } from "lucide-react";

interface LinkPopoverProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  text: string;
  onUrlChange: (url: string) => void;
  onTextChange: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LinkPopover = forwardRef<HTMLButtonElement, LinkPopoverProps>(
  ({ isOpen, onOpenChange, url, text, onUrlChange, onTextChange, onSubmit }, ref) => {
    return (
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <ToolbarButton
            ref={ref}
            value="link"
            label="Link"
            shortcut="⌘K"
            icon={Link}
            onClick={() => onOpenChange(true)}
          />
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder="https://example.com"
                type="url"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder="Link text"
                required
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="sm">
                Save
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    );
  }
);