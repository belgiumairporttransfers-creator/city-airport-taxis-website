import React from "react";
import { FileText, MessageSquare } from "lucide-react";
import { Input } from "@/components/features/form/Input";

export const DriverNotesField = () => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          name="notes"
          type="textarea"
          placeholder="Add any special instructions for your driver..."
          rows={5}
          inputClassName="p-4 border-gray-100"
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-3 text-orange-500 pointer-events-none">
          <FileText size={18} />
          <MessageSquare size={18} />
        </div>
      </div>
    </div>
  );
};
