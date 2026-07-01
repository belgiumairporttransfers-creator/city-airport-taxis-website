"use client";

import React, { ReactNode } from "react";
import { Eye, EyeOff, X, ChevronDown } from "lucide-react";
import { useFormContext, ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/features/form/form";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { DEFAULT_PHONE_COUNTRY } from "@/constants/app-default";
import { cn } from "@/lib/utils";
import { LocationInput } from "./location-input";
import { Checkbox } from "./checkbox";
import DatePickerV2 from "./date/date-picker";
import TimePickerV2 from "./time/time-picker";
import { Switch } from "@/components/features/form/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/features/form/select";
import { Counter } from "./counter";

type InputType =
    | "text"
    | "email"
    | "number"
    | "tel"
    | "password"
    | "location"
    | "textarea"
    | "counter"
    | "checkbox"
    | "toggle"
    | "phone"
    | "date"
    | "time"
    | "select";

export interface SelectOption {
    label: ReactNode;
    value: string | number;
}

interface InputProps {
    name: string;
    type?: InputType;
    placeholder?: string;
    label?: ReactNode;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    rows?: number;
    min?: number;
    max?: number;
    step?: number;
    icon?: ReactNode;
    onRemove?: () => void;
    selectOptions?: SelectOption[];
    selectPlaceholder?: string;
    selectValueAsNumber?: boolean;
    maxLength?: number;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    digitsOnly?: boolean;
    inputClassName?: string;
    minSelectableDate?: Date | null;
    excludeDate?: Date | null;
    timezone?: string;
    suffix?: string;
    boxed?: boolean;
}

export const Input: React.FC<InputProps> = ({
    name,
    type = "text",
    placeholder,
    label,
    disabled = false,
    required = false,
    className,
    rows = 6,
    min,
    max,
    step = 1,
    icon,
    onRemove,
    selectOptions = [],
    selectPlaceholder,
    selectValueAsNumber = false,
    maxLength,
    inputMode,
    digitsOnly = false,
    inputClassName,
    minSelectableDate,
    excludeDate,
    timezone,
    suffix,
    boxed = false,
}) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = React.useState(false);
    const fieldRadiusClass = "rounded-sm";

    const inputBase = cn(
        "w-full h-[48px] py-2.5 border border-border bg-white text-black text-sm md:text-base placeholder:text-sm md:placeholder:text-base appearance-none focus:outline-none focus:ring-0 focus-visible:outline-none",
        fieldRadiusClass,
        icon ? "pl-10 pr-4" : "px-4"
    );
    const inputError = (error: boolean) => error ? "border-error" : "border-border";

    const renderInput = (
        field: ControllerRenderProps<FieldValues, string>,
        error: boolean
    ) => {
        switch (type) {

            case "textarea":
                return (
                    <textarea
                        {...field}
                        value={field.value ?? ""}
                        rows={rows}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={cn(
                            "w-full py-2.5 border border-border bg-white text-black text-sm md:text-base placeholder:text-sm md:placeholder:text-base appearance-none focus:outline-none focus:ring-0 focus-visible:outline-none resize-none",
                            fieldRadiusClass,
                            icon ? "pl-10 pr-4" : "px-4",
                            inputError(error),
                            inputClassName
                        )}
                    />
                );

            case "phone":
                return (
                    <ReactPhoneInput
                        country={DEFAULT_PHONE_COUNTRY}
                        value={field.value || ""}
                        onChange={(phone) => field.onChange(phone)}
                        isValid={true}
                        countryCodeEditable={false}
                        containerClass="!w-full phone-input-container"
                        inputClass={cn(
                            "!w-full !h-[46px] !pl-12 !pr-4 !border !bg-white !text-black",
                            `!${fieldRadiusClass}`,
                            error ? "!border-error" : "!border-gray-300"
                        )}
                        buttonClass={cn(
                            "!border !border-r !bg-white",
                            fieldRadiusClass === "rounded-sm" ? "!rounded-l-sm" : "",
                            error ? "!border-error !border-r-error" : "!border-gray-300 !border-r-gray-300"
                        )}
                    />
                );

            case "location":
                const { ref: _ref, ...locationField } = field;
                return (
                    <LocationInput
                        {...locationField}
                        value={field.value || ""}
                        placeholder={placeholder}
                        label={typeof label === "string" ? label : undefined}
                        error={error}
                    />
                );

            case "counter":
                return (
                    <Counter
                        value={Number(field.value)}
                        onChange={field.onChange}
                        min={min}
                        max={max}
                        step={step}
                        disabled={disabled}
                        className={inputError(error)}
                        suffix={suffix}
                        placeholder={placeholder}
                        boxed={boxed}
                        label={typeof label === "string" ? label : undefined}
                    />
                );

            case "checkbox":
                return (
                    <Checkbox
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        disabled={disabled}
                    />
                );

            case "toggle":
                return (
                    <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        disabled={disabled}
                    />
                );

            case "date":
                return (
                    <DatePickerV2
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        error={error}
                        minSelectableDate={minSelectableDate}
                        excludeDate={excludeDate}
                        timezone={timezone}
                        label={typeof label === "string" ? label : undefined}
                        boxed={boxed}
                    />
                );

            case "time":
                return (
                    <TimePickerV2
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        error={error}
                        timezone={timezone}
                        label={typeof label === "string" ? label : undefined}
                        boxed={boxed}
                    />
                );

            case "select": {
                const selectPlaceholderText =
                    selectPlaceholder || placeholder || "Select an option";

                if (boxed && typeof label === "string") {
                    return (
                        <Select
                            value={String(field.value ?? "")}
                            onValueChange={(value) =>
                                field.onChange(selectValueAsNumber ? Number(value) : value)
                            }
                            disabled={disabled}
                        >
                            <div
                                className={cn(
                                    "flex min-h-[76px] flex-col justify-center rounded-md bg-[#EEEEEE] px-4 py-3",
                                    error && "ring-1 ring-error"
                                )}
                            >
                                <span className="mb-1.5 block text-left text-sm font-medium text-foreground">
                                    {label}
                                </span>
                                <SelectTrigger
                                    className={cn(
                                        "h-auto w-full items-start justify-start border-0 bg-transparent p-0 text-left shadow-none",
                                        "focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent",
                                        "[&>svg]:hidden"
                                    )}
                                >
                                    <div className="flex w-full items-center justify-between gap-3">
                                        <SelectValue
                                            placeholder={selectPlaceholderText}
                                            className="min-w-0 flex-1 text-left text-sm font-normal text-foreground data-[placeholder]:text-gray-500"
                                        />
                                        <ChevronDown
                                            className="h-4 w-4 shrink-0 text-foreground"
                                            strokeWidth={2}
                                        />
                                    </div>
                                </SelectTrigger>
                            </div>
                            <SelectContent className="border border-border bg-white text-black shadow-md">
                                {selectOptions.map((option) => (
                                    <SelectItem key={String(option.value)} value={String(option.value)}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    );
                }

                return (
                    <Select
                        value={String(field.value ?? "")}
                        onValueChange={(value) =>
                            field.onChange(selectValueAsNumber ? Number(value) : value)
                        }
                        disabled={disabled}
                    >
                        <SelectTrigger
                            className={cn(
                                "w-full h-[48px] rounded-md border bg-white text-black shadow-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent",
                                fieldRadiusClass,
                                icon ? "pl-10 pr-4" : "px-4",
                                inputError(error)
                            )}
                        >
                            <SelectValue placeholder={selectPlaceholderText} />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black border border-border shadow-md">
                            {selectOptions.map((option) => (
                                <SelectItem key={String(option.value)} value={String(option.value)}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            }

            default:
                const isPasswordField = type === "password";
                const resolvedType = isPasswordField
                    ? showPassword
                        ? "text"
                        : "password"
                    : type;

                return (
                    <div className="relative">
                        <input
                            {...field}
                            value={field.value ?? ""}
                            type={resolvedType}
                            placeholder={placeholder}
                            disabled={disabled}
                            min={min}
                            max={max}
                            step={step}
                            maxLength={maxLength}
                            inputMode={inputMode}
                            onChange={(event) => {
                                let nextValue = event.target.value;
                                if (digitsOnly) {
                                    nextValue = nextValue.replace(/\D/g, "");
                                }
                                if (typeof maxLength === "number") {
                                    nextValue = nextValue.slice(0, maxLength);
                                }
                                field.onChange(nextValue);
                            }}
                            className={cn(
                                inputBase,
                                isPasswordField && "pr-10",
                                inputError(error),
                                inputClassName
                            )}
                        />
                        {isPasswordField && (
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                    </div>
                );
        }
    };

    const fieldRules =
        type === "phone" && required
            ? {
                  required: "This field is required",
                  validate: (value: string) =>
                      value && value.length >= 10 ? true : "Please enter a valid phone number",
              }
            : type === "checkbox" && required
              ? {
                    validate: (value: boolean) =>
                        value === true || "This field is required",
                }
              : required
                ? { required: "This field is required" }
                : undefined;

    return (
        <FormField
            control={control}
            name={name}
            rules={fieldRules}
            render={({ field, fieldState }) => {
                const hasError = !!fieldState.error;

                if (type === "toggle") {
                    return (
                        <FormItem className={cn("flex flex-col", className)}>
                            <div className={cn("flex items-center justify-between gap-3 border border-border bg-background p-3", fieldRadiusClass)}>
                                <FormLabel className={hasError ? "text-error" : undefined}>
                                    {label}
                                    {required && <span className="text-error ml-1">*</span>}
                                </FormLabel>
                                <FormControl>
                                    {renderInput(field, hasError)}
                                </FormControl>
                            </div>
                        </FormItem>
                    );
                }

                if (type === "checkbox") {
                    return (
                        <FormItem className={cn("flex flex-col space-y-1", className)}>
                            <div className="flex flex-row items-center space-x-2 space-y-0">
                                <FormControl>
                                    {renderInput(field, hasError)}
                                </FormControl>
                                {label && (
                                    <FormLabel className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer", hasError ? "text-error" : "text-gray-700")}>
                                        {label}
                                        {required && <span className="text-error ml-1">*</span>}
                                    </FormLabel>
                                )}
                            </div>
                        </FormItem>
                    );
                }

                return (
                    <FormItem className={cn("flex flex-col", className)}>
                        {label &&
                            type !== "location" &&
                            !(
                                boxed &&
                                (type === "select" || type === "date" || type === "time" || type === "counter")
                            ) && (
                            <FormLabel className={cn("text-sm font-medium text-gray-700", hasError ? "text-error" : undefined)}>
                                {label}
                                {required && <span className="text-error ml-1">*</span>}
                            </FormLabel>
                        )}
                        <div className="relative">
                            {icon && type !== "date" && type !== "time" && type !== "counter" && (
                                <span className={cn(
                                    "absolute left-3 text-gray-400 z-10 pointer-events-none",
                                    type === "textarea" ? "top-3" : "top-1/2 -translate-y-1/2"
                                )}>
                                    {icon}
                                </span>
                            )}
                            <FormControl>
                                {renderInput(field, hasError)}
                            </FormControl>

                            {onRemove && (
                                <button
                                    type="button"
                                    onClick={onRemove}
                                    className="absolute -top-2 -right-2 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        {/* <FormMessage /> */}
                    </FormItem>
                );
            }}
        />
    );
};