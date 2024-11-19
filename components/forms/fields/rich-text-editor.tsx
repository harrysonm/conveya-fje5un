"use client";

import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Bold, Italic, Link as LinkIcon, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  label?: string;
}

interface LinkState {
  url: string;
  text: string;
  selection: { start: number; end: number } | null;
}

const formatButtons = [
  { format: 'bold', icon: Bold, label: 'Bold', shortcut: '⌘B' },
  { format: 'italic', icon: Italic, label: 'Italic', shortcut: '⌘I' },
  { format: 'underline', icon: Underline, label: 'Underline', shortcut: '⌘U' },
  { format: 'link', icon: LinkIcon, label: 'Link', shortcut: '⌘K' }
];

export function RichTextEditor({ 
  content, 
  onChange, 
  placeholder,
  className,
  id,
  label = "Rich text editor"
}: RichTextEditorProps) {
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [linkState, setLinkState] = useState<LinkState>({
    url: "",
    text: "",
    selection: null
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorId = id || Math.random().toString(36).slice(2);

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const newSelection = {
      start: target.selectionStart,
      end: target.selectionEnd
    };
    setSelection(newSelection);

    const selectedText = content.substring(target.selectionStart, target.selectionEnd);
    const formats: string[] = [];
    if (/<strong>.*<\/strong>/.test(selectedText)) formats.push('bold');
    if (/<em>.*<\/em>/.test(selectedText)) formats.push('italic');
    if (/<u>.*<\/u>/.test(selectedText)) formats.push('underline');
    if (/<a.*>.*<\/a>/.test(selectedText)) formats.push('link');
    setActiveFormats(formats);
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkState.selection) return;

    const before = content.substring(0, linkState.selection.start);
    const after = content.substring(linkState.selection.end);
    const newContent = `${before}<a href="${linkState.url}" target="_blank" rel="noopener noreferrer">${linkState.text}</a>${after}`;

    onChange(newContent);
    setIsLinkOpen(false);
    setLinkState({ url: "", text: "", selection: null });
    setActiveFormats([...activeFormats, 'link']);

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const applyFormat = (format: string) => {
    if (!selection) {
      textareaRef.current?.focus();
      return;
    }

    const before = content.substring(0, selection.start);
    const selected = content.substring(selection.start, selection.end);
    const after = content.substring(selection.end);

    let newContent = content;
    const isActive = activeFormats.includes(format);

    switch (format) {
      case 'bold':
        newContent = isActive
          ? `${before}${selected.replace(/<\/?strong>/g, '')}${after}`
          : `${before}<strong>${selected}</strong>${after}`;
        break;
      case 'italic':
        newContent = isActive
          ? `${before}${selected.replace(/<\/?em>/g, '')}${after}`
          : `${before}<em>${selected}</em>${after}`;
        break;
      case 'underline':
        newContent = isActive
          ? `${before}${selected.replace(/<\/?u>/g, '')}${after}`
          : `${before}<u>${selected}</u>${after}`;
        break;
      case 'link':
        if (!isActive) {
          const selectedText = content.substring(selection.start, selection.end);
          const linkMatch = selectedText.match(/<a href="([^"]+)">(.*?)<\/a>/);
          setLinkState({
            url: linkMatch ? linkMatch[1] : "",
            text: linkMatch ? linkMatch[2] : selectedText,
            selection
          });
          setIsLinkOpen(true);
          return;
        } else {
          newContent = `${before}${selected.replace(/<a.*?>(.*?)<\/a>/g, '$1')}${after}`;
        }
        break;
    }

    onChange(newContent);
    setActiveFormats(isActive 
      ? activeFormats.filter(f => f !== format)
      : [...activeFormats, format]
    );

    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(selection.start, selection.end);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'b' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      applyFormat('bold');
    } else if (e.key === 'i' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      applyFormat('italic');
    } else if (e.key === 'u' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      applyFormat('underline');
    } else if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      applyFormat('link');
    }
  };

  return (
    <div 
      className="space-y-2"
      role="application"
      aria-label={label}
    >
      <TooltipProvider>
        <ToggleGroup 
          type="multiple" 
          value={activeFormats} 
          className="justify-start"
          aria-controls={editorId}
          aria-label="Formatting options"
        >
          {formatButtons.map(({ format, icon: Icon, label, shortcut }) => (
            <Tooltip key={format}>
              <TooltipTrigger asChild>
                {format === 'link' ? (
                  <Popover open={isLinkOpen} onOpenChange={setIsLinkOpen}>
                    <PopoverTrigger asChild>
                      <ToggleGroupItem
                        value={format}
                        size="sm"
                        className="h-8 w-8 p-0"
                        aria-label={label}
                        onClick={() => applyFormat(format)}
                      >
                        <Icon className="h-4 w-4" />
                      </ToggleGroupItem>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="start">
                      <form onSubmit={handleLinkSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="url">URL</Label>
                          <Input
                            id="url"
                            value={linkState.url}
                            onChange={(e) => setLinkState(prev => ({ ...prev, url: e.target.value }))}
                            placeholder="https://example.com"
                            type="url"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="text">Text</Label>
                          <Input
                            id="text"
                            value={linkState.text}
                            onChange={(e) => setLinkState(prev => ({ ...prev, text: e.target.value }))}
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
                ) : (
                  <ToggleGroupItem
                    value={format}
                    size="sm"
                    className="h-8 w-8 p-0"
                    aria-label={label}
                    onClick={() => applyFormat(format)}
                  >
                    <Icon className="h-4 w-4" />
                  </ToggleGroupItem>
                )}
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <div className="flex items-center gap-2">
                  <span>{label}</span>
                  <kbd className="text-xs bg-neutral-100 px-1 rounded">
                    {shortcut}
                  </kbd>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </ToggleGroup>
      </TooltipProvider>

      <Textarea
        ref={textareaRef}
        id={editorId}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelect}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn("min-h-[100px] resize-y", className)}
        aria-multiline="true"
        role="textbox"
        aria-label={label}
      />
    </div>
  );
}