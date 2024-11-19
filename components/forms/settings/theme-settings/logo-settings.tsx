"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface LogoSettingsProps {
  showLogo: boolean;
  onShowLogoChange: (show: boolean) => void;
  onLogoChange: (file: File) => void;
  isUploading: boolean;
}

export function LogoSettings({
  showLogo,
  onShowLogoChange,
  onLogoChange,
  isUploading
}: LogoSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Show logo</Label>
        <Switch
          checked={showLogo}
          onCheckedChange={onShowLogoChange}
        />
      </div>

      {showLogo && (
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Logo
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onLogoChange(file);
            }}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground">
            Maximum file size: 5MB. Recommended size: 200x200px
          </p>
        </div>
      )}
    </div>
  );
}