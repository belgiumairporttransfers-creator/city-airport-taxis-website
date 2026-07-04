import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Globe,
  Landmark,
  MapPin,
  PlaneTakeoff,
  Route,
  Shield,
  Users,
} from "lucide-react";

export interface NavLink {
  title: string;
  path?: string;
  sublinks?: { title: string; path: string; icon?: LucideIcon }[];
}

export const NAV_LINKS: NavLink[] = [
  { title: "nav.home", path: "/" },
  {
    title: "nav.services",
    sublinks: [
      {
        title: "nav.services_list.airport_transfers",
        path: "/airport-transfers",
        icon: PlaneTakeoff,
      },
      {
        title: "nav.services_list.hourly_transfers",
        path: "/hourly-transfers",
        icon: Clock,
      },
      {
        title: "nav.services_list.corporate_transfers",
        path: "/corporate-transfers",
        icon: Briefcase,
      },
      {
        title: "nav.services_list.event_transfers",
        path: "/event-transfers",
        icon: Calendar,
      },
      {
        title: "nav.services_list.airline_crew",
        path: "/airline-crew-transfers",
        icon: Users,
      },
      {
        title: "nav.services_list.diplomatic_embassy",
        path: "/diplomatic-embassy-transfers",
        icon: Shield,
      },
    ],
  },
  {
    title: "nav.cities",
    sublinks: [
      {
        title: "nav.cities_list.brussels",
        path: "/brussels-city",
        icon: Building2,
      },
      {
        title: "nav.cities_list.antwerp",
        path: "/antwerp-city",
        icon: MapPin,
      },
      {
        title: "nav.cities_list.ghent",
        path: "/ghent-city",
        icon: Landmark,
      },
      {
        title: "nav.cities_list.bruges",
        path: "/bruges-city",
        icon: Globe,
      },
      {
        title: "nav.cities_list.amsterdam",
        path: "/amsterdam-city",
        icon: PlaneTakeoff,
      },
      {
        title: "nav.cities_list.paris",
        path: "/paris-city",
        icon: Landmark,
      },
      {
        title: "nav.cities_list.luxembourg",
        path: "/luxembourg-city",
        icon: Shield,
      },
      {
        title: "nav.cities_list.maastricht",
        path: "/brussels-to-maastricht",
        icon: Route,
      },
    ],
  },
  { title: "nav.about", path: "/about" },
  { title: "nav.partner", path: "/partner-with-us" },
  { title: "nav.contact", path: "/contact-us" },
];

export function isNavActive(pathname: string | null, link: NavLink): boolean {
  if (!pathname) return false;
  if (link.path && (pathname === link.path || pathname.startsWith(`${link.path}/`))) return true;
  return link.sublinks?.some((sub) => pathname === sub.path || pathname.startsWith(`${sub.path}/`)) ?? false;
}
