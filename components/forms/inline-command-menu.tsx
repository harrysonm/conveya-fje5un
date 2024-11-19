"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface InlineCommandMenuProps {
  onSelect: (type: string) => void;
  onClose: () => void;
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

export function InlineCommandMenu({ onSelect, onClose }: InlineCommandMenuProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    inputRef.current?.focus();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const filteredElements = formElements.filter(element =>
    element.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    element.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={menuRef} className="relative my-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
          placeholder="Search fields..."
        />
      </div>
      {searchQuery && (
        <Card className="absolute z-10 w-full mt-1 shadow-lg">
          <ScrollArea className="max-h-[300px]">
            <div className="p-2 space-y-1">
              {filteredElements.map((element) => (
                <Button
                  key={element.type}
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    onSelect(element.type);
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
      )}
    </div>
  );
}