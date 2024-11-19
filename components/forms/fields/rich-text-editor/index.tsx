"use client";

import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Toolbar } from "./toolbar";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  label?: string;
}

interface Selection {
  start: number;
  end: number;
}

export function RichTextEditor({ 
  content, 
  onChange, 
  placeholder,
  className,
  id,
  label = "Rich text editor"
}: RichTextEditorProps) {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [linkState, setLinkState] = useState({
    isOpen: false,
    url: "",
    text: "",
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
            isOpen: true,
            url: linkMatch ? linkMatch[1] : "",
            text: linkMatch ? linkMatch[2] : selectedText,
          });
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

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selection) return;

    const before = content.substring(0, selection.start);
    const after = content.substring(selection.end);
    const newContent = `${before}<a href="${linkState.url}" target="_blank" rel="noopener noreferrer">${linkState.text}</a>${after}`;

    onChange(newContent);
    setLinkState({ isOpen: false, url: "", text: "" });
    setActiveFormats([...activeFormats, 'link']);

    if (textareaRef.current) {
      textareaRef.current.focus();
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
      <Toolbar
        activeFormats={activeFormats}
        editorId={editorId}
        onFormatClick={applyFormat}
        linkState={linkState}
        onLinkOpenChange={(open) => setLinkState(prev => ({ ...prev, isOpen: open }))}
        onLinkUrlChange={(url) => setLinkState(prev => ({ ...prev, url }))}
        onLinkTextChange={(text) => setLinkState(prev => ({ ...prev, text }))}
        onLinkSubmit={handleLinkSubmit}
      />

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