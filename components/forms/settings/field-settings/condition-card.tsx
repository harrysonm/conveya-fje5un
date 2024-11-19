"use client";

import { FieldCondition } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ConditionCardProps {
  index: number;
  condition: FieldCondition;
  availableFields: Array<{ id: string; label: string; type: string }>;
  operators: Array<{ value: string; label: string }>;
  actionOptions: Array<{ value: string; label: string }>;
  onUpdate: (updates: Partial<FieldCondition>) => void;
  onRemove: () => void;
}

export function ConditionCard({
  index,
  condition,
  availableFields,
  operators,
  actionOptions,
  onUpdate,
  onRemove
}: ConditionCardProps) {
  const conditionKey = `condition-${condition.field}-${index}`;
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(conditionKey);
      return stored ? JSON.parse(stored) : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem(conditionKey, JSON.stringify(isOpen));
  }, [isOpen, conditionKey]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove();
  }, [onRemove]);

  const handleUpdate = useCallback((key: keyof FieldCondition, value: any) => {
    onUpdate({ [key]: value });
  }, [onUpdate]);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg border border-neutral-200 bg-neutral-50"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-sm font-medium">Condition {index + 1}</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0"
              onClick={handleClick}
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-neutral-500 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent className="px-3 pb-3">
        <div className="space-y-3">
          <div className="space-y-2">
            <span className="text-sm text-neutral-500">When</span>
            <Select
              value={condition.field}
              onValueChange={(value) => handleUpdate('field', value)}
              onOpenChange={(open) => {
                if (open) handleClick;
              }}
            >
              <SelectTrigger onClick={handleClick}>
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent onClick={handleClick}>
                {availableFields.map((field) => (
                  <SelectItem 
                    key={field.id} 
                    value={field.id}
                    onSelect={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={condition.operator}
              onValueChange={(value) => handleUpdate('operator', value as FieldCondition['operator'])}
              onOpenChange={(open) => {
                if (open) handleClick;
              }}
            >
              <SelectTrigger onClick={handleClick}>
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent onClick={handleClick}>
                {operators.map((op) => (
                  <SelectItem 
                    key={op.value} 
                    value={op.value}
                    onSelect={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {condition.operator !== 'is_empty' && 
             condition.operator !== 'is_not_empty' && (
              <Input
                value={condition.value || ''}
                onChange={(e) => handleUpdate('value', e.target.value)}
                placeholder="Enter value"
                onClick={handleClick}
              />
            )}
          </div>

          <div className="space-y-2">
            <span className="text-sm text-neutral-500">Then</span>
            <Select
              value={condition.action}
              onValueChange={(value) => handleUpdate('action', value as FieldCondition['action'])}
              onOpenChange={(open) => {
                if (open) handleClick;
              }}
            >
              <SelectTrigger onClick={handleClick}>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent onClick={handleClick}>
                {actionOptions.map((action) => (
                  <SelectItem 
                    key={action.value} 
                    value={action.value}
                    onSelect={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {action.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}