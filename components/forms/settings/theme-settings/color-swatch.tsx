"use client";

import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  color: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ColorSwatch({ color, selected, onClick, className }: ColorSwatchProps) {
  return (
    <button
      type="button"
      className={cn(
        "h-10 w-10 rounded-md outline-none border border-input",
        "transition-transform hover:scale-110",
        selected && "ring-2 ring-neutral-950 ring-offset-2",
        className
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
}