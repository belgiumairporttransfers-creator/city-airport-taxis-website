import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

export function Counter({
  value,
  min = 0,
  max = 99,
  onChange,
  icon,
  label,
  className
}: CounterProps) {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {(icon || label) && (
        <div className="flex items-center gap-1 text-primary">
          {icon}
          {label && <span className="text-sm font-semibold">{label}</span>}
        </div>
      )}
      <div className="flex items-center gap-1 sm:gap-2.5 ml-1">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="w-6 h-6 flex items-center justify-center rounded-full border border-border text-gray-500 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="text-[11px] sm:text-sm font-bold w-4 text-center select-none text-black">
          {value}
        </span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="w-6 h-6 flex items-center justify-center rounded-full border border-border text-gray-500 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
