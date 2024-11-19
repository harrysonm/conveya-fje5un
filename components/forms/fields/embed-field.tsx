"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { BaseField } from "./base-field";
import { FormField } from "@/types/form";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmbedFieldProps {
  field: FormField;
  onFieldChange?: (field: Partial<FormField>) => void;
  preview?: boolean;
}

interface VideoInfo {
  embedUrl: string;
  error?: string;
}

export function EmbedField({ field, onFieldChange, preview = false }: EmbedFieldProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

  const settings = field.settings?.embed || {
    width: '100%',
    maxWidth: 800,
    aspectRatio: '16/9',
    align: 'center',
    showCaption: false,
    caption: ''
  };

  const getVideoInfo = (url: string): VideoInfo | null => {
    try {
      // YouTube URL patterns
      const youtubePatterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
        /youtube\.com\/embed\/([^&\s]+)/
      ];

      // Vimeo URL patterns
      const vimeoPatterns = [
        /vimeo\.com\/(\d+)/,
        /vimeo\.com\/video\/(\d+)/,
        /player\.vimeo\.com\/video\/(\d+)/
      ];

      // Check YouTube patterns
      for (const pattern of youtubePatterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return {
            embedUrl: `https://www.youtube.com/embed/${match[1]}?rel=0`
          };
        }
      }

      // Check Vimeo patterns
      for (const pattern of vimeoPatterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return {
            embedUrl: `https://player.vimeo.com/video/${match[1]}`
          };
        }
      }

      return {
        embedUrl: '',
        error: 'Invalid video URL. Please enter a valid YouTube or Vimeo URL.'
      };
    } catch (error) {
      return {
        embedUrl: '',
        error: 'Failed to process video URL. Please try again.'
      };
    }
  };

  useEffect(() => {
    if (!field.settings?.embed?.url) {
      setVideoInfo(null);
      return;
    }

    setIsLoading(true);
    try {
      const info = getVideoInfo(field.settings.embed.url);
      setVideoInfo(info);
    } catch (error) {
      setVideoInfo({
        embedUrl: '',
        error: 'Failed to load video. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [field.settings?.embed?.url]);

  const handleUrlChange = (url: string) => {
    onFieldChange?.({
      settings: {
        ...field.settings,
        embed: {
          ...settings,
          url
        }
      }
    });
  };

  const containerStyles = {
    maxWidth: settings.maxWidth ? `${settings.maxWidth}px` : '100%',
    margin: settings.align === 'center' ? '0 auto' : undefined,
    marginLeft: settings.align === 'right' ? 'auto' : undefined
  };

  const aspectRatioPadding = (() => {
    const [width, height] = settings.aspectRatio.split('/').map(Number);
    return `${(height / width) * 100}%`;
  })();

  if (preview) {
    if (!videoInfo?.embedUrl) {
      return (
        <div 
          className="w-full aspect-video bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-500"
          style={containerStyles}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading video...</span>
            </div>
          ) : (
            videoInfo?.error || "No video URL provided"
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2" style={containerStyles}>
        <div 
          className="relative w-full rounded-lg overflow-hidden bg-black"
          style={{ paddingBottom: aspectRatioPadding }}
        >
          <iframe
            src={videoInfo.embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={field.label || "Embedded video"}
          />
        </div>
        {settings.showCaption && settings.caption && (
          <p className={cn(
            "text-sm text-neutral-500 mt-2",
            settings.align === 'center' && "text-center",
            settings.align === 'right' && "text-right"
          )}>
            {settings.caption}
          </p>
        )}
      </div>
    );
  }

  return (
    <BaseField field={field}>
      <div className="space-y-4">
        <Input
          value={field.settings?.embed?.url || ""}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="Enter YouTube or Vimeo URL"
          aria-label="Video URL"
          aria-invalid={!!videoInfo?.error}
          aria-errormessage={videoInfo?.error ? `${field.id}-error` : undefined}
        />
        
        {videoInfo?.error && (
          <p 
            id={`${field.id}-error`}
            className="text-sm text-red-500"
            role="alert"
          >
            {videoInfo.error}
          </p>
        )}

        {videoInfo?.embedUrl && (
          <div 
            className="relative w-full rounded-lg overflow-hidden bg-black"
            style={{ paddingBottom: aspectRatioPadding }}
          >
            <iframe
              src={videoInfo.embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={field.label || "Embedded video"}
            />
          </div>
        )}
      </div>
    </BaseField>
  );
}