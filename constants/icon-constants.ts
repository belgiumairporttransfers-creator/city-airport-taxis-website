import {
    Tag,
    ShieldCheck,
    PhoneCall,
    MapPin,
    Car,
    Clock,
    Globe,
    CheckCircle2,
    Users,
    PlaneTakeoff,
    PlaneLanding,
    Shield,
    Calendar,
    Search,
    Briefcase,
    Compass,
} from "lucide-react";

export const ICON_COMPONENTS = {
    Tag,
    ShieldCheck,
    PhoneCall,
    MapPin,
    Car,
    Clock,
    Globe,
    CheckCircle2,
    Users,
    PlaneTakeoff,
    PlaneLanding,
    Shield,
    Calendar,
    Search,
    Briefcase,
    Compass,
} as const;

export type IconName = keyof typeof ICON_COMPONENTS;

export const ICONS: Record<string, IconName> = {
    TAG: "Tag",
    SHIELD_CHECK: "ShieldCheck",
    PHONE_CALL: "PhoneCall",
    MAP_PIN: "MapPin",
    CAR: "Car",
    CLOCK: "Clock",
    GLOBE: "Globe",
    CHECK_CIRCLE: "CheckCircle2",
    USERS: "Users",
    PLANE: "PlaneTakeoff",
    PLANE_LANDING: "PlaneLanding",
    SHIELD: "Shield",
    CALENDAR: "Calendar",
    SEARCH: "Search",
    BRIEFCASE: "Briefcase",
    COMPASS: "Compass",
} as const;

/** Feature grid icons per service page section (order matches translation items). */
export const SERVICE_PAGE_ICONS = {
    airline_crew: {
        premium_services: ["Car", "PlaneLanding", "Clock"] as IconName[],
        premium_services_featured_index: 1,
        coverage: ["MapPin", "Globe", "ShieldCheck"] as IconName[],
        support: ["PlaneTakeoff", "PlaneLanding", "MapPin", "Briefcase"] as IconName[],
    },
    corporate_transfers: {
        premium_services: ["Car", "Users", "Calendar"] as IconName[],
        premium_services_featured_index: 1,
        coverage: ["Briefcase", "Tag", "PhoneCall"] as IconName[],
        support: ["Clock", "Globe", "Search", "ShieldCheck"] as IconName[],
    },
    event_transfers: {
        premium_services: ["Users", "Calendar", "Compass"] as IconName[],
        premium_services_featured_index: 1,
        coverage: ["Compass", "Car", "Tag"] as IconName[],
        support: ["Car", "Users", "MapPin", "PhoneCall"] as IconName[],
    },
    diplomatic_embassy_transfers: {
        premium_services: ["PlaneLanding", "MapPin", "Calendar", "Globe"] as IconName[],
        premium_services_featured_index: 2,
        coverage: ["Shield", "Users", "Compass"] as IconName[],
        support: ["Shield", "Globe", "MapPin", "ShieldCheck"] as IconName[],
    },
    hourly_transfers: {
        premium_services: ["Briefcase", "Tag", "Compass", "Clock"] as IconName[],
        premium_services_featured_index: 1,
        coverage: ["Tag", "Clock", "Calendar"] as IconName[],
        support: ["Calendar", "MapPin", "Clock", "Users"] as IconName[],
    },
    airport_transfers: {
        airport_hubs: ["PlaneLanding", "PlaneTakeoff", "MapPin"] as IconName[],
        airport_hubs_featured_index: 0,
        why_choose: ["Search", "Tag", "ShieldCheck", "Users"] as IconName[],
        areas_served: ["MapPin", "MapPin", "Compass"] as IconName[],
    },
    antwerp_city: {
        premium_services: ["Briefcase", "Clock", "PlaneLanding", "Globe", "MapPin", "PlaneTakeoff"] as IconName[],
        premium_services_featured_index: 0,
        why_choose: ["MapPin", "Search", "ShieldCheck", "Tag"] as IconName[],
    },
    brussels_city: {
        premium_services: ["PlaneTakeoff", "PlaneLanding", "Clock", "Shield", "MapPin", "Briefcase"] as IconName[],
        premium_services_featured_index: 0,
        why_choose: ["Clock", "Tag", "Users", "Search"] as IconName[],
    },
    ghent_city: {
        premium_services: ["Briefcase", "Clock", "PlaneTakeoff", "Globe", "Users", "Compass"] as IconName[],
        premium_services_featured_index: 2,
        why_choose: ["Users", "ShieldCheck", "Tag", "MapPin"] as IconName[],
    },
    bruges_city: {
        premium_services: ["PlaneTakeoff", "MapPin", "Globe", "Clock", "Users", "Briefcase"] as IconName[],
        premium_services_featured_index: 0,
        why_choose: ["Users", "ShieldCheck", "Tag", "MapPin"] as IconName[],
    },
    amsterdam_city: {
        premium_services: ["MapPin", "Briefcase", "PlaneTakeoff", "Clock", "Users"] as IconName[],
        premium_services_featured_index: 0,
        why_choose: ["MapPin", "Search", "Globe", "Tag"] as IconName[],
    },
    paris_city: {
        premium_services: ["PlaneTakeoff", "MapPin", "Globe", "Clock", "Users"] as IconName[],
        premium_services_featured_index: 0,
        why_choose: ["Users", "Briefcase", "Tag", "MapPin"] as IconName[],
    },
    luxembourg_city: {
        premium_services: ["PlaneTakeoff", "MapPin", "Briefcase", "Clock", "Users"] as IconName[],
        premium_services_featured_index: 0,
        why_choose: ["Users", "Briefcase", "Tag", "ShieldCheck"] as IconName[],
    },
    brussels_to_maastricht: {
        premium_services: ["PlaneLanding", "Briefcase", "Users", "Globe", "MapPin"] as IconName[],
        premium_services_featured_index: 0,
        why_choose: ["Users", "ShieldCheck", "Tag", "Search"] as IconName[],
    },
} as const;
