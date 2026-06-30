import {
  ChevronDown,
  ChevronUp,
  XCircle,
  Eye,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps {
  column: Column<any, any>;
  title: string;
  className?: string;
}

export function DataTableColumnHeader({ column, title, className }:DataTableColumnHeaderProps) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
          >
            <span className="text-secondary font-semibold">{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ChevronDown className="ltr:ml-2 rtl:mr-2 h-4 w-4 text-secondary" />
            ) : column.getIsSorted() === "asc" ? (
              <ChevronUp className="ltr:ml-2 rtl:mr-2 h-4 w-4 text-secondary" />
            ) : (
              <XCircle className="ltr:ml-2 rtl:mr-2 h-4 w-4 text-secondary" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-white text-black border border-border shadow-md cursor-pointer">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)} className="cursor-pointer">
            <ChevronUp className="ltr:mr-2 rtl:ml-2 h-3.5 w-3.5 text-secondary/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)} className="cursor-pointer">
            <ChevronDown className="ltr:mr-2 rtl:ml-2 h-3.5 w-3.5 text-secondary/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)} className="cursor-pointer border-t border-border rounded-none">
            <Eye className="ltr:mr-2 rtl:ml-2 h-3.5 w-3.5 text-secondary/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
