"use client";

import { useState, useEffect, useCallback } from "react";
import { ClockIcon } from "@/components/icons/clock-icon";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { DEFAULT_TIMEZONE } from "@/constants/app-default";
import TimeColumn from "./time-column";
import { Button } from "@/components/ui/button";

interface TimePickerProps {
  value?: string;
  onChange: (val: string) => void;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  timezone?: string;
  customTrigger?: (value: string) => React.ReactNode;
  boxed?: boolean;
}

export default function TimePicker({
  value,
  onChange,
  label,
  disabled,
  placeholder = "Select time (24h)",
  error,
  timezone = DEFAULT_TIMEZONE,
  customTrigger,
  boxed = false,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);

  const getInitialTime = useCallback(() => {
    const zoned = toZonedTime(new Date(), timezone);
    const h = parseInt(format(zoned, "H"), 10);
    const m = parseInt(format(zoned, "mm"), 10);
    return { h, m };
  }, [timezone]);

  // Initialize state based on value or current time
  const [hour, setHour] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);

  useEffect(() => {
    if (!value) {
      const initial = getInitialTime();
      setHour(initial.h);
      setMinute(initial.m);
      return;
    }

    const match = value.match(/^(\d{1,2}):(\d{2})$/);
    if (match) {
      setHour(parseInt(match[1], 10));
      setMinute(parseInt(match[2], 10));
    }
  }, [value, timezone, getInitialTime]);

  useEffect(() => {
    if (open && hour !== null && minute !== null) {
      const formatted = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      if (formatted !== value) {
        onChange(formatted);
      }
    }
  }, [hour, minute, open, onChange, value]);

  const displayVal = value || placeholder;

  const formattedDisplayVal = (() => {
    if (!value) return displayVal;
    const match = value.match(/^(\d{1,2}):(\d{2})$/);
    if (!match || !boxed) return displayVal;

    const hour = parseInt(match[1], 10);
    const minute = match[2];
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;

    return `${hour12.toString().padStart(2, "0")}:${minute} ${period}`;
  })();

  return (
    <div className="relative w-full">
      {label && !boxed && (
        <label className="block text-sm mb-1.5 font-medium text-gray-700">
          {label}
        </label>
      )}

      {customTrigger ? (
        <div onClick={() => !disabled && setOpen((prev) => !prev)}>
          {customTrigger(displayVal)}
        </div>
      ) : boxed ? (
        <div
          className={`flex min-h-[76px] flex-col justify-center rounded-md bg-[#EEEEEE] px-4 py-3 transition
            ${error ? "ring-1 ring-error" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          onClick={() => {
            if (!disabled) setOpen((prev) => !prev);
          }}
        >
          {label ? (
            <span className="mb-1.5 block text-left text-sm font-medium text-foreground">
              {label}
            </span>
          ) : null}
          <div className="flex items-center gap-2.5">
            <ClockIcon size={16} className={error ? "text-red-500" : "text-gray-500"} />
            <span className={`text-sm ${value ? "text-foreground" : "text-gray-500"}`}>
              {formattedDisplayVal}
            </span>
          </div>
        </div>
      ) : (
        <div
          className={`flex h-[48px] items-center gap-2 rounded-md border px-4 py-2.5 transition
            ${error ? "border-red-500 bg-red-50/10" : "border-border hover:border-gray-400"}
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer bg-white"}
          `}
          onClick={() => {
            if (!disabled) setOpen((prev) => !prev);
          }}
        >
          <ClockIcon size={16} className={error ? "text-red-500" : "text-gray-400"} />

          <span
            className={
              value ? "text-gray-900 font-medium" : "text-gray-400"
            }
          >
            {displayVal}
          </span>
        </div>
      )}

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity"
            onClick={() => setOpen(false)}
          />
          <div className="fixed sm:absolute z-50 bottom-0 inset-x-0 sm:inset-auto sm:bottom-full sm:mb-2 w-full sm:w-64 bg-white rounded-t-xl sm:rounded-md border border-border shadow-2xl overflow-hidden sm:left-1/2 sm:-translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className='p-4'>
              <div className="grid grid-cols-2 gap-4">
                <TimeColumn
                  label="Hour (24h)"
                  values={Array.from({ length: 24 }, (_, i) => i)}
                  selected={hour}
                  onSelect={setHour}
                />

                <TimeColumn
                  label="Minute"
                  values={Array.from({ length: 60 }, (_, i) => i)}
                  selected={minute}
                  onSelect={setMinute}
                />
              </div>

              <Button
                type="button"
                onClick={() => setOpen(false)}
                disabled={hour === null || minute === null}
                className={`mt-2 w-full py-4 sm:py-2 rounded-md text-sm font-bold transition ${hour === null || minute === null
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-black/80"
                  }`}
              >
                Done
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}