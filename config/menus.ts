import { BookOpen, CreditCard, FileText, LayoutGrid, UserCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface MenuItemProps {
  title: string;
  href?: string;
  icon?: LucideIcon;
  badge?: string;
  isHeader?: boolean;
  child?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
}

export const menus: MenuItemProps[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "My Bookings",
    href: "/bookings",
    icon: BookOpen,
  },
  {
    title: "My Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    title: "Statements",
    href: "/statements",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCircle2,
  },
];

