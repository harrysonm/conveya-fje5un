"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings2, Plus, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formElements } from "@/lib/constants/form-elements";
import { FormField as IFormField } from "@/types/form";
import { FormField } from "./form-field";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableFormFieldProps {
  field: IFormField;
  onDelete: (id: string) => void;
  onEdit: (field: IFormField) => void;
  onAdd: (type: string, afterId: string) => void;
  onFieldChange?: (field: IFormField) => void;
  isSelected?: boolean;
}

export function SortableFormField({ 
  field,
  onDelete,
  onEdit,
  onAdd,
  onFieldChange,
  isSelected
}: SortableFormFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleFieldClick = () => {
    onEdit(field);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-lg p-2 transition-colors",
        "hover:bg-neutral-50",
        isDragging && "opacity-50 bg-neutral-50 shadow-lg",
        isSelected && "bg-neutral-50"
      )}
    >
      <FormField 
        field={field} 
        onFieldChange={onFieldChange}
        preview={false}
        onEdit={handleFieldClick}
      />

      <div
        className={cn(
          "absolute -top-8 right-0 flex items-center gap-1 opacity-0 transition-opacity bg-neutral-50 rounded-sm py-0.5 px-1",
          "group-hover:opacity-100"
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 rounded-sm cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 rounded-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(field.id);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 rounded-sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(field);
          }}
        >
          <Settings2 className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 rounded-sm"
              onClick={(e) => e.stopPropagation()}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd(element.type, field.id);
                      }}
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
    </div>
  );
}