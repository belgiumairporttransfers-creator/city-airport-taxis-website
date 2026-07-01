"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  suffix?: string;
  placeholder?: string;
  label?: string;
  boxed?: boolean;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  disabled = false,
  className,
  suffix = "",
  placeholder = "",
  label,
  boxed = false,
}) => {
  const resolvedMin = min;
  const resolvedMax = max;
  const parsedValue = Number(value);
  const currentValue = Number.isNaN(parsedValue)
    ? resolvedMin
    : Math.min(resolvedMax, Math.max(resolvedMin, parsedValue));

  const fieldRadiusClass = "rounded-sm";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const newValue = rawValue === "" ? 0 : parseInt(rawValue, 10);
    onChange(Math.min(resolvedMax, Math.max(resolvedMin, newValue)));
  };

  const getDisplayValue = () => {
    if (currentValue === 0 && placeholder) return placeholder;

    if (suffix === "min") {
      if (currentValue >= 60) {
        const h = Math.floor(currentValue / 60);
        const m = currentValue % 60;
        const hourPart = `${h} ${h === 1 ? "hour" : "hours"}`;
        const minPart = m > 0 ? ` ${m} min` : "";
        return `${hourPart}${minPart}`;
      }
      return `${currentValue} min`;
    }
    return suffix ? `${currentValue} ${suffix}` : currentValue;
  };

  if (boxed) {
    return (
      <div
        className={cn(
          "flex min-h-[76px] flex-col rounded-md bg-[#EEEEEE] px-4 py-3",
          className
        )}
      >
        {label ? (
          <span className="text-sm font-medium text-foreground">{label}</span>
        ) : null}
        <div className="mt-auto flex items-end justify-between gap-3">
          <span className="text-lg font-medium text-foreground md:text-xl">{getDisplayValue()}</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onChange(Math.max(resolvedMin, currentValue - step))}
              disabled={disabled || currentValue <= resolvedMin}
              aria-label="Decrease quantity"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-secondary/50 text-white transition-colors hover:bg-secondary/60 disabled:cursor-not-allowed"
            >
              <Minus className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => onChange(Math.min(resolvedMax, currentValue + step))}
              disabled={disabled || currentValue >= resolvedMax}
              aria-label="Increase quantity"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-secondary text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
            >
              <Plus className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "grid grid-cols-[40px_1fr_40px] h-[46px] items-center border border-border bg-white text-black overflow-hidden transition-colors",
      fieldRadiusClass,
      className
    )}>
      <button
        type="button"
        onClick={() => onChange(Math.max(resolvedMin, currentValue - step))}
        disabled={disabled || currentValue <= resolvedMin}
        className="h-full flex items-center justify-center border-r border-gray-100 text-lg font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none"
        aria-label="Decrease quantity"
      >
        -
      </button>

      <div className="h-full flex items-center justify-center relative px-2">
        <input
          type="text"
          value={getDisplayValue()}
          onChange={handleInputChange}
          disabled={disabled}
          className="w-full bg-transparent text-center text-sm font-bold tabular-nums focus:outline-none"
        />
      </div>

      <button
        type="button"
        onClick={() => onChange(Math.min(resolvedMax, currentValue + step))}
        disabled={disabled || currentValue >= resolvedMax}
        className="h-full flex items-center justify-center border-l border-gray-100 text-lg font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};
