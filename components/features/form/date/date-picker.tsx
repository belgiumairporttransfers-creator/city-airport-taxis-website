"use client";

import { useState, useMemo, useCallback } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isBefore,
  startOfDay,
  isSameMonth,
  parse,
} from "date-fns";
import { toZonedTime, formatInTimeZone } from "date-fns-tz";
import { ChevronRight, X } from "lucide-react";
import { CalendarDaysIcon } from "@/components/icons/calendar-days-icon";
import { DEFAULT_TIMEZONE } from "@/constants/app-default";

interface DatePickerProps {
  value?: string; // yyyy-MM-dd
  onChange: (value: string) => void;
  placeholder?: string;
  minSelectableDate?: Date | null;
  excludeDate?: Date | null;
  timezone?: string;
  disabled?: boolean;
  label?: string;
  error?: boolean;
  customTrigger?: (value: string) => React.ReactNode;
  boxed?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  minSelectableDate,
  excludeDate,
  timezone = DEFAULT_TIMEZONE,
  disabled,
  label,
  error,
  customTrigger,
  boxed = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const toDateKey = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Today key in target timezone (yyyy-MM-dd) to avoid Date shift issues.
  const todayKey = useMemo(
    () => formatInTimeZone(new Date(), timezone, "yyyy-MM-dd"),
    [timezone]
  );
  const todayZoned = useMemo(() => startOfDay(toZonedTime(new Date(), timezone)), [timezone]);

  const [currentMonth, setCurrentMonth] = useState(() =>
    startOfMonth(toZonedTime(new Date(), timezone))
  );

  const selectedDate = useMemo(() => {
    if (!value) return null;
    try {
      return parse(value, "yyyy-MM-dd", new Date());
    } catch {
      return null;
    }
  }, [value]);

  const displayValue = useMemo(() => {
    if (!selectedDate) return placeholder;
    return boxed
      ? format(selectedDate, "EEE, dd MMM, yyyy")
      : format(selectedDate, "dd MMM yyyy");
  }, [selectedDate, placeholder, boxed]);

  const calendarDays = useMemo(() => {
    const startMonth = startOfMonth(currentMonth);
    // Adjust for Monday start: (getDay + 6) % 7
    const startDayOffset = (getDay(startMonth) + 6) % 7;

    const startDate = new Date(startMonth);
    startDate.setDate(startMonth.getDate() - startDayOffset);

    return eachDayOfInterval({
      start: startDate,
      end: new Date(startDate.getTime() + 41 * 86400000),
    });
  }, [currentMonth]);

  const checkIsDisabled = useCallback((date: Date) => {
    // Calendar cell dates are logical day cells; use their local day parts directly.
    const dateKey = toDateKey(date);

    if (dateKey < todayKey) return true;

    if (minSelectableDate) {
      const minKey = toDateKey(minSelectableDate);
      if (dateKey < minKey) return true;
    }

    if (excludeDate) {
      const excludeKey = toDateKey(excludeDate);
      if (dateKey === excludeKey) return true;
    }

    return false;
  }, [todayKey, minSelectableDate, excludeDate, toDateKey]);

  const handleSelect = (date: Date) => {
    // Persist selected calendar day exactly as clicked.
    onChange(toDateKey(date));
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      {label && !boxed && (
        <label className="block text-sm mb-1.5 font-medium text-gray-700">
          {label}
        </label>
      )}

      {customTrigger ? (
        <div onClick={() => !disabled && setOpen((prev) => !prev)}>
          {customTrigger(displayValue)}
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
            <CalendarDaysIcon
              size={16}
              className={error ? "text-red-500" : "text-gray-500"}
            />
            <span className={`text-sm ${value ? "text-foreground" : "text-gray-500"}`}>
              {displayValue}
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
          <CalendarDaysIcon
            size={16}
            className={error ? "text-red-500" : "text-gray-400"}
          />

          <span className={value ? "text-gray-900 font-medium" : "text-gray-400"}>
            {displayValue}
          </span>
        </div>
      )}

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity"
            onClick={() => setOpen(false)}
          />
          <div className="fixed sm:absolute z-50 bottom-0 inset-x-0 sm:inset-auto sm:bottom-full sm:mb-2 w-full sm:w-[340px] bg-white rounded-t-2xl sm:rounded-xl shadow-2xl border border-border overflow-hidden sm:left-0 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className='p-5'>
              <div className="flex justify-between items-center mb-5">
                <button
                  type="button"
                  disabled={isSameMonth(currentMonth, todayZoned)}
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-20 disabled:pointer-events-none'
                >
                  <ChevronRight size={18} className="rotate-180 text-gray-600" />
                </button>

                <h3 className="font-bold text-gray-900 text-sm">
                  {format(currentMonth, "MMMM yyyy")}
                </h3>

                <button
                  type="button"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                  <ChevronRight size={18} className="text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 text-[10px] text-center mb-3 font-bold text-gray-400 uppercase tracking-widest">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-sm">
                {calendarDays.map((date, i) => {
                  const inactive = !isSameMonth(date, currentMonth);
                  const disabledDay = checkIsDisabled(date);
                  const selected = selectedDate && isSameDay(date, selectedDate);

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={disabledDay}
                      onClick={() => handleSelect(date)}
                      className={`relative text-center py-2.5 rounded-lg transition-all focus:outline-none
                        ${disabledDay ? "text-gray-200 cursor-not-allowed" : "cursor-pointer"}
                        ${inactive && !disabledDay ? "text-gray-500" : ""}
                        ${!inactive && !disabledDay ? "font-semibold text-gray-700" : ""}
                        ${selected
                          ? "bg-black text-white shadow-lg font-bold"
                          : !disabledDay ? "hover:bg-gray-100" : ""
                        }
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}