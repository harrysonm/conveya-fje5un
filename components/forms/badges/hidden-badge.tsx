"use client";

import { Badge } from "@/components/ui/badge";
import { EyeOff } from "lucide-react";

export function HiddenBadge() {
  return (
    <Badge 
      variant="secondary" 
      className="gap-1 shadow-sm px-2 py-0.5 text-xs"
    >
      <EyeOff className="h-3 w-3" />
      Hidden
    </Badge>
  );
}