"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
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

interface FormDescriptionProps {
  onAddField: (type: string) => void;
  description?: string;
  onDescriptionChange?: (description: string) => void;
  editable?: boolean;
}

export function FormDescription({ 
  onAddField, 
  description = "", 
  onDescriptionChange,
  editable = true 
}: FormDescriptionProps) {
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
      <Textarea
        value={description}
        onChange={(e) => onDescriptionChange?.(e.target.value)}
        placeholder="Form description"
        className={cn(
          "px-0 text-sm text-neutral-500 border-0 focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0 w-full bg-transparent resize-none",
          "min-h-0 h-auto"
        )}
        readOnly={!editable}
        rows={1}
        style={{ height: 'auto' }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = '0';
          const height = target.scrollHeight;
          target.style.height = `${height}px`;
        }}
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