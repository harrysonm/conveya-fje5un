"use client";

import { useState } from "react";
import { Bold, Italic, Link, Underline } from "lucide-react";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface RichTextPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFormat: (format: string, url?: string) => void;
}

export function RichTextPopover({
  open,
  onOpenChange,
  onFormat
}: RichTextPopoverProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [url, setUrl] = useState("");

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormat('link', url);
    setUrl("");
    setShowLinkInput(false);
  };

  const formatButtons = [
    { icon: Bold, format: 'bold', label: 'Bold' },
    { icon: Italic, format: 'italic', label: 'Italic' },
    { icon: Underline, format: 'underline', label: 'Underline' },
    { icon: Link, format: 'link', label: 'Link' }
  ];

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent 
        className="w-fit p-1" 
        align="start"
        sideOffset={5}
      >
        {showLinkInput ? (
          <form onSubmit={handleLinkSubmit} className="p-2 space-y-2">
            <div className="space-y-1">
              <Label htmlFor="url" className="text-xs">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="h-7 text-sm"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 text-xs"
                onClick={() => setShowLinkInput(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="h-7 text-xs"
                disabled={!url}
              >
                Add Link
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex gap-1">
            {formatButtons.map(({ icon: Icon, format, label }) => (
              <Button
                key={format}
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  format === 'link' && "text-blue-600 hover:text-blue-600 hover:bg-blue-50"
                )}
                onClick={() => {
                  if (format === 'link') {
                    setShowLinkInput(true);
                  } else {
                    onFormat(format);
                  }
                }}
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only">{label}</span>
              </Button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}