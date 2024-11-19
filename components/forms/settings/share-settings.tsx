"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { X, Copy, Link2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ShareSettingsProps {
  formId: string;
  onClose: () => void;
  onEnableReviewChange?: (enabled: boolean) => void;
}

export function ShareSettings({ formId, onClose, onEnableReviewChange }: ShareSettingsProps) {
  const [settings, setSettings] = useState({
    allowAnonymous: true,
    requireLogin: false,
    collectEmail: true,
    responseLimit: "",
    expiryDate: "",
    enableReview: false
  });

  const formUrl = `${window.location.origin}/form/${formId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(formUrl);
      toast({
        description: "Link copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleEmailShare = () => {
    const subject = "Please fill out this form";
    const body = `I've shared a form with you: ${formUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleEnableReviewChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, enableReview: checked }));
    onEnableReviewChange?.(checked);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 h-[45px] border-b border-neutral-100">
        <div className="text-[14px] font-medium">Share Form</div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Share Link</Label>
            <div className="flex gap-2">
              <Input value={formUrl} readOnly className="flex-1" />
              <Button variant="outline" size="icon" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quick Share</Label>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleCopyLink}>
                <Link2 className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleEmailShare}>
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[14px] font-medium">Settings</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow anonymous responses</Label>
                <p className="text-xs text-muted-foreground">
                  Let users submit without identifying themselves
                </p>
              </div>
              <Switch
                checked={settings.allowAnonymous}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowAnonymous: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require login</Label>
                <p className="text-xs text-muted-foreground">
                  Users must be logged in to submit
                </p>
              </div>
              <Switch
                checked={settings.requireLogin}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireLogin: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Collect email addresses</Label>
                <p className="text-xs text-muted-foreground">
                  Request email before form submission
                </p>
              </div>
              <Switch
                checked={settings.collectEmail}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, collectEmail: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable response review</Label>
                <p className="text-xs text-muted-foreground">
                  Allow users to review their responses before submitting
                </p>
              </div>
              <Switch
                checked={settings.enableReview}
                onCheckedChange={handleEnableReviewChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Response limit</Label>
              <Input
                type="number"
                placeholder="Unlimited"
                value={settings.responseLimit}
                onChange={(e) =>
                  setSettings({ ...settings, responseLimit: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Expiry date</Label>
              <Input
                type="date"
                value={settings.expiryDate}
                onChange={(e) =>
                  setSettings({ ...settings, expiryDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}