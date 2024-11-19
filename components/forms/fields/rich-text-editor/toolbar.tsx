"use client";

import { forwardRef } from "react";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Bold, Italic, Underline } from "lucide-react";
import { ToolbarButton } from "./toolbar-button";
import { LinkPopover } from "./link-popover";

interface ToolbarProps {
  activeFormats: string[];
  editorId: string;
  onFormatClick: (format: string) => void;
  linkState: {
    isOpen: boolean;
    url: string;
    text: string;
  };
  onLinkOpenChange: (open: boolean) => void;
  onLinkUrlChange: (url: string) => void;
  onLinkTextChange: (text: string) => void;
  onLinkSubmit: (e: React.FormEvent) => void;
}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ 
    activeFormats, 
    editorId, 
    onFormatClick,
    linkState,
    onLinkOpenChange,
    onLinkUrlChange,
    onLinkTextChange,
    onLinkSubmit
  }, ref) => {
    const formatButtons = [
      { format: 'bold', icon: Bold, label: 'Bold', shortcut: '⌘B' },
      { format: 'italic', icon: Italic, label: 'Italic', shortcut: '⌘I' },
      { format: 'underline', icon: Underline, label: 'Underline', shortcut: '⌘U' },
    ];

    return (
      <TooltipProvider>
        <ToggleGroup 
          ref={ref}
          type="multiple" 
          value={activeFormats} 
          className="justify-start"
          aria-controls={editorId}
          aria-label="Formatting options"
        >
          {formatButtons.map(({ format, icon, label, shortcut }) => (
            <ToolbarButton
              key={format}
              value={format}
              label={label}
              shortcut={shortcut}
              icon={icon}
              onClick={() => onFormatClick(format)}
            />
          ))}
          <LinkPopover
            isOpen={linkState.isOpen}
            onOpenChange={onLinkOpenChange}
            url={linkState.url}
            text={linkState.text}
            onUrlChange={onLinkUrlChange}
            onTextChange={onLinkTextChange}
            onSubmit={onLinkSubmit}
          />
        </ToggleGroup>
      </TooltipProvider>
    );
  }
);