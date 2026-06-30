"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, Loader2, X, CheckCircle2, FileText, Eye, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUpload } from "@/hooks/queries/use-upload";
import toast from "react-hot-toast";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/features/form/form";

interface FileUploadProps {
    name: string;
    label: string;
    value?: string;
    onChange?: (url: string) => void;
    required?: boolean;
    className?: string;
}

export default function FileUpload({
    name,
    label,
    value: propValue,
    onChange: propOnChange,
    required,
    className
}: FileUploadProps) {
    const { control } = useFormContext();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutate: upload, isPending } = useUpload();
    const [fileName, setFileName] = useState<string>("");

    return (
        <FormField
            control={control}
            name={name}
            rules={required ? { required: `${label} is required` } : undefined}
            render={({ field, fieldState }) => {
                const value = propValue || field.value;
                const onChange = (url: string) => {
                    field.onChange(url);
                    propOnChange?.(url);
                };

                const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                            toast.error("File size exceeds 5MB limit.");
                            return;
                        }

                        setFileName(file.name);
                        upload({ file }, {
                            onSuccess: (data) => {
                                if (!data?.url) return;
                                onChange(data.url);
                                toast.success("File uploaded successfully");
                            },
                            onError: (error: any) => {
                                const message = error?.response?.data?.message || "Upload failed. Please try again.";
                                toast.error(message);
                                setFileName("");
                            }
                        });
                    }
                };

                const removeFile = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    onChange("");
                    setFileName("");
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                };

                return (
                    <FormItem className={cn("space-y-2", className)}>
                        <FormLabel className={cn("text-sm font-semibold flex items-center gap-1", fieldState.error ? "text-destructive" : "text-gray-700")}>
                            {label} {required && <span className="text-error ml-1">*</span>}
                        </FormLabel>

                        <FormControl>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                    "relative border-2 rounded-xl transition-all cursor-pointer group flex flex-col items-center justify-center text-center h-[140px] overflow-hidden",
                                    value
                                        ? "border-success/30 bg-success/5 border-solid p-0"
                                        : fieldState.error
                                            ? "border-destructive bg-destructive/5 border-dashed p-6"
                                            : "border-gray-200 border-dashed hover:border-primary/40 hover:bg-primary/5 bg-gray-50/50 p-6"
                                )}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".png,.jpeg,.jpg,.pdf"
                                />

                                {isPending ? (
                                    <div className="flex flex-col items-center gap-2 p-6">
                                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                        <p className="text-xs font-medium text-gray-600 italic">Uploading {fileName}...</p>
                                    </div>
                                ) : value ? (
                                    <div className="relative w-full h-full">
                                        {/* Remove button at top-right */}
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="absolute top-2 right-2 w-7 h-7 bg-destructive text-white rounded-full flex items-center justify-center shadow-lg hover:bg-destructive/90 transition-all z-30"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>

                                        {/* Preview */}
                                        {value.toLowerCase().endsWith(".pdf") ? (
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-white group/pdf">
                                                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover/pdf:scale-110 transition-transform">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <p className="text-[10px] font-bold text-gray-900 px-4 text-center line-clamp-2">PDF Attached</p>

                                                {/* Actions Overlay for PDF */}
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.open(value, "_blank");
                                                        }}
                                                        className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 cursor-pointer transition-transform"
                                                        title="View PDF"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative w-full h-full bg-white group/img">
                                                <img
                                                    src={value}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                {/* Actions Overlay */}
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-[2px]">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.open(value, "_blank");
                                                        }}
                                                        className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 cursor-pointer transition-transform"
                                                        title="View Image"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            fileInputRef.current?.click();
                                                        }}
                                                        className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 cursor-pointer transition-transform"
                                                        title="Change Image"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                            <UploadCloud className={cn("w-5 h-5 transition-colors", fieldState.error ? "text-destructive" : "text-gray-400 group-hover:text-primary")} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className={cn("text-sm font-bold transition-colors", fieldState.error ? "text-destructive" : "text-gray-900")}>
                                                Upload {label}
                                            </p>
                                            <p className="text-xs text-gray-400 font-medium">
                                                PNG, JPG, PDF (max 5MB)
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </FormControl>
                        {/* <FormMessage /> */}
                    </FormItem>
                );
            }}
        />
    );
}
