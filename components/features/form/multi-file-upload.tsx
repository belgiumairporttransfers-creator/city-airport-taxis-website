"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, Loader2, X, FileText, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUpload } from "@/hooks/queries/use-upload";
import toast from "react-hot-toast";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/features/form/form";
import {
  getFileTooLargeMessage,
  MAX_UPLOAD_FILE_SIZE_BYTES,
  MAX_UPLOAD_FILE_SIZE_LABEL,
} from "@/constants/upload";

interface MultiFileUploadProps {
  name: string;
  label: string;
  required?: boolean;
  minFiles?: number;
  maxFiles?: number;
  className?: string;
  hint?: string;
}

const isPdfUrl = (url: string) => url.toLowerCase().includes(".pdf");

export default function MultiFileUpload({
  name,
  label,
  required,
  minFiles = 1,
  maxFiles = 30,
  className,
  hint,
}: MultiFileUploadProps) {
  const { control } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: upload } = useUpload();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadLabel, setUploadLabel] = useState("");

  return (
    <FormField
      control={control}
      name={name}
      rules={{
        validate: (value: string[]) => {
          const urls = Array.isArray(value) ? value.filter(Boolean) : [];
          if (required && urls.length < minFiles) {
            return `Please upload at least ${minFiles} files`;
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => {
        const urls: string[] = Array.isArray(field.value) ? field.value.filter(Boolean) : [];

        const setUrls = (next: string[]) => {
          field.onChange(next);
        };

        const handleFiles = async (fileList: FileList | null) => {
          if (!fileList?.length || isUploading) return;

          const remaining = maxFiles - urls.length;
          if (remaining <= 0) {
            toast.error(`You can upload a maximum of ${maxFiles} files.`);
            return;
          }

          const files = Array.from(fileList).slice(0, remaining);
          const oversized = files.find((file) => file.size > MAX_UPLOAD_FILE_SIZE_BYTES);
          if (oversized) {
            toast.error(getFileTooLargeMessage());
            return;
          }

          setIsUploading(true);
          const uploaded: string[] = [];

          try {
            for (const file of files) {
              setUploadLabel(file.name);
              const data = await upload({ file, folder: "driver-documents" });
              if (data?.url) {
                uploaded.push(data.url);
              }
            }

            if (uploaded.length) {
              setUrls([...urls, ...uploaded]);
              toast.success(
                uploaded.length === 1
                  ? "File uploaded successfully"
                  : `${uploaded.length} files uploaded successfully`
              );
            }
          } catch {
            // useUpload already surfaces upload errors via toast
          } finally {
            setIsUploading(false);
            setUploadLabel("");
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }
        };

        const removeAt = (index: number, e: React.MouseEvent) => {
          e.stopPropagation();
          setUrls(urls.filter((_, i) => i !== index));
        };

        return (
          <FormItem className={cn("space-y-2", className)}>
            <FormLabel
              className={cn(
                "text-sm font-semibold flex items-center gap-1",
                fieldState.error ? "text-destructive" : "text-gray-700"
              )}
            >
              {label} {required ? <span className="text-error ml-1">*</span> : null}
            </FormLabel>

            <FormControl>
              <div className="space-y-3">
                <div
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                  className={cn(
                    "relative border-2 rounded-xl transition-all cursor-pointer group flex flex-col items-center justify-center text-center min-h-[140px] overflow-hidden p-6",
                    fieldState.error
                      ? "border-destructive bg-destructive/5 border-dashed"
                      : urls.length
                        ? "border-success/30 bg-success/5 border-solid"
                        : "border-gray-200 border-dashed hover:border-primary/40 hover:bg-primary/5 bg-gray-50/50"
                  )}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    onChange={(e) => void handleFiles(e.target.files)}
                    className="hidden"
                    accept=".png,.jpeg,.jpg,.pdf"
                  />

                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      <p className="text-xs font-medium text-gray-600 italic">
                        Uploading {uploadLabel}...
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <UploadCloud
                          className={cn(
                            "w-5 h-5 transition-colors",
                            fieldState.error
                              ? "text-destructive"
                              : "text-gray-400 group-hover:text-primary"
                          )}
                        />
                      </div>
                      <div className="space-y-1 mt-2">
                        <p
                          className={cn(
                            "text-sm font-bold transition-colors",
                            fieldState.error ? "text-destructive" : "text-gray-900"
                          )}
                        >
                          {urls.length
                            ? "Add more files"
                            : "Click to upload all required documents & photos"}
                        </p>
                        <p className="text-xs text-gray-400 font-medium">
                          PNG, JPG, PDF (max {MAX_UPLOAD_FILE_SIZE_LABEL} each) · multiple files
                          allowed
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {urls.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {urls.map((url, index) => (
                      <li
                        key={`${url}-${index}`}
                        className="relative flex items-center gap-3 rounded-xl border border-border bg-white p-3"
                      >
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                          {isPdfUrl(url) ? (
                            <FileText className="h-5 w-5 text-primary" />
                          ) : (
                            <img src={url} alt="" className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            File {index + 1}
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(url, "_blank");
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                          >
                            <Eye className="h-3 w-3" />
                            View
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => removeAt(index, e)}
                          className="h-7 w-7 shrink-0 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/90"
                          aria-label={`Remove file ${index + 1}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {hint ? <p className="text-sm text-gray-500 leading-relaxed">{hint}</p> : null}
                {fieldState.error ? (
                  <p className="text-xs font-medium text-destructive">{fieldState.error.message}</p>
                ) : null}
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
