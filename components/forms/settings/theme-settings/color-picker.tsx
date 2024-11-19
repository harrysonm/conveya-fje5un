"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [color, setColor] = useState(value || "#000000");

  useEffect(() => {
    setColor(value || "#000000");
  }, [value]);

  const handleChange = (newColor: string) => {
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex gap-2 items-center">
        <div className="h-10 w-10 shrink-0 rounded-md border border-input overflow-hidden relative">
          <input
            type="color"
            value={color}
            onChange={(e) => handleChange(e.target.value)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 cursor-pointer border-none bg-transparent"
          />
        </div>
        <Input
          type="text"
          value={color}
          onChange={(e) => handleChange(e.target.value)}
          className="font-mono"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}