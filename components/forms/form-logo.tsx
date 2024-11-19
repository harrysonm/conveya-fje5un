"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface FormLogoProps {
  logo?: string;
  onLogoChange?: (logo: string) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function FormLogo({ logo, onLogoChange }: FormLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onLogoChange?.(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLogoChange?.('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative -mt-12">
      <div
        className={cn(
          "relative inline-block",
          !logo && "cursor-pointer"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={!logo ? handleClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />

        {logo ? (
          <>
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm">
              <img 
                src={logo} 
                alt="Form logo" 
                className="w-full h-full object-cover"
              />
            </div>
            {isHovered && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={handleRemoveLogo}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </>
        ) : (
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-sm bg-white hover:bg-neutral-50 transition-colors flex items-center justify-center">
            <ImagePlus className="h-8 w-8 text-neutral-400" />
          </div>
        )}
      </div>
    </div>
  );
}