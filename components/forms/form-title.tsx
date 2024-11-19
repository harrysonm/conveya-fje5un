"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formElements } from "@/lib/constants/form-elements";

interface FormTitleProps {
  onAddField: (type: string) => void;
  title?: string;
  onTitleChange?: (title: string) => void;
  editable?: boolean;
}

export function FormTitle({ onAddField, title = "", onTitleChange, editable = true }: FormTitleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative rounded-lg p-2 transition-colors",
        isHovered && "bg-neutral-50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Input
        value={title}
        onChange={(e) => onTitleChange?.(e.target.value)}
        placeholder="Untitled form"
        className={cn(
          "px-0 text-4xl font-bold border-0 focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0 w-full bg-transparent",
          "min-h-0 h-auto"
        )}
        readOnly={!editable}
      />

      {editable && (
        <div
          className={cn(
            "absolute -top-8 right-0 opacity-0 transition-opacity bg-neutral-50 rounded-sm py-0.5 px-1",
            isHovered && "opacity-100"
          )}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="bottom"
              sideOffset={5}
              alignOffset={0}
              className="w-72"
              collisionPadding={20}
              sticky="always"
              avoidCollisions={true}
            >
              <ScrollArea className="h-[360px]">
                {formElements.map((category) => (
                  <div key={category.category}>
                    <DropdownMenuLabel className="text-xs font-medium text-neutral-500">
                      {category.category}
                    </DropdownMenuLabel>
                    {category.items.map((element) => (
                      <DropdownMenuItem
                        key={element.type}
                        onClick={() => onAddField(element.type)}
                        className="flex items-start gap-2 py-3"
                      >
                        <element.icon className="h-4 w-4 mt-0.5 text-neutral-500" />
                        <div>
                          <span className="font-medium block">{element.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {element.description}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </div>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}