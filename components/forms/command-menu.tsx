"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (type: string) => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

const formElements = [
  { type: "text", label: "Text Field", description: "Single line text input" },
  { type: "email", label: "Email Field", description: "Email address input" },
  { type: "phone", label: "Phone Field", description: "Phone number input" },
  { type: "date", label: "Date Field", description: "Date picker input" },
  { type: "time", label: "Time Field", description: "Time picker input" },
  { type: "textarea", label: "Text Area", description: "Multi-line text input" },
  { type: "file", label: "File Upload", description: "File attachment field" },
  { type: "star-rating", label: "Star Rating", description: "5-star rating field" },
  { type: "number-rating", label: "Number Scale", description: "1-10 rating scale" },
  { type: "select", label: "Single Select", description: "Choose one option from a list" },
  { type: "multi-select", label: "Multi Select", description: "Choose multiple options from a list" },
];

export function CommandMenu({ open, onOpenChange, onSelect, triggerRef }: CommandMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open && e.key === '/') {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    const updatePosition = () => {
      if (triggerRef?.current && menuRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        let top = triggerRect.bottom + scrollY;
        let left = triggerRect.left + scrollX;

        const rightOverflow = left + menuRect.width - window.innerWidth;
        if (rightOverflow > 0) {
          left = Math.max(0, left - rightOverflow - 8);
        }

        const bottomOverflow = top + menuRect.height - (window.innerHeight + scrollY);
        if (bottomOverflow > 0) {
          top = Math.max(0, triggerRect.top + scrollY - menuRect.height - 8);
        }

        setPosition({ top, left });
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      updatePosition();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, onOpenChange, triggerRef]);

  if (!open) return null;

  const filteredElements = formElements.filter(element =>
    element.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    element.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card 
      ref={menuRef}
      className="w-[425px] fixed z-50 shadow-lg"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      <div className="p-2 border-b border-border relative">
        <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-9"
          placeholder="Search fields... (Press '/' to focus)"
        />
      </div>
      <ScrollArea className="h-[300px] p-4">
        <div className="grid gap-2">
          {filteredElements.map((element) => (
            <Button
              key={element.type}
              variant="ghost"
              className="w-full justify-start text-left"
              onClick={() => {
                onSelect(element.type);
                onOpenChange(false);
                setSearchQuery("");
              }}
            >
              <div>
                <div className="font-medium">{element.label}</div>
                <div className="text-xs text-muted-foreground">
                  {element.description}
                </div>
              </div>
            </Button>
          ))}
          {filteredElements.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-4">
              No matching fields found
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}