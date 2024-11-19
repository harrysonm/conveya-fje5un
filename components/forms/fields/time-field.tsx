"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaseField } from "./base-field";
import { FormField } from "@/types/form";

interface TimeFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function TimeField({ 
  field,
  showLabel = true,
  showHelperText = false,
  preview = false,
  value,
  onChange
}: TimeFieldProps) {
  const [hour, setHour] = useState<string>();
  const [minute, setMinute] = useState<string>();
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  // Use settings to control label, placeholder and helper text visibility
  const shouldShowLabel = field.settings?.showLabel !== false;
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;
  const shouldShowHelperText = field.settings?.showHelperText || false;

  useEffect(() => {
    if (value) {
      const [time, meridian] = value.split(' ');
      const [h, m] = time.split(':');
      setHour(h);
      setMinute(m);
      setPeriod(meridian as "AM" | "PM");
    }
  }, [value]);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleTimeChange = (newHour?: string, newMinute?: string, newPeriod?: "AM" | "PM") => {
    if (newHour !== undefined) setHour(newHour);
    if (newMinute !== undefined) setMinute(newMinute);
    if (newPeriod !== undefined) setPeriod(newPeriod);

    if (onChange && newHour && newMinute) {
      onChange(`${newHour}:${newMinute} ${newPeriod || period}`);
    }
  };

  const formattedTime = hour && minute ? 
    `${hour}:${minute} ${period}` : 
    (shouldShowPlaceholder ? field.placeholder : "Pick a time");

  const isComplete = hour && minute && period;

  return (
    <BaseField 
      field={field}
      showLabel={shouldShowLabel}
      showHelperText={shouldShowHelperText}
    >
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "time-field_button w-full justify-start text-left font-normal pl-8",
                !isComplete && "text-muted-foreground"
              )}
              disabled={preview && !onChange}
            >
              <Clock className="h-4 w-4 absolute left-2.5 top-2.5 text-neutral-500" />
              {formattedTime}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-4" align="start">
            <div className="flex gap-2">
              <Select 
                value={hour} 
                onValueChange={(h) => handleTimeChange(h, undefined, undefined)}
                disabled={preview && !onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={minute} 
                onValueChange={(m) => handleTimeChange(undefined, m, undefined)}
                disabled={preview && !onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={period} 
                onValueChange={(p) => handleTimeChange(undefined, undefined, p as "AM" | "PM")}
                disabled={preview && !onChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </BaseField>
  );
}