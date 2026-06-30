"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Logout() {
  return (
    <Button
      type="button"
      variant="ghost"
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
}
