export interface NavLink {
  title: string;
  path?: string;
  sublinks?: { title: string; path: string; icon?: React.ComponentType<{ className?: string }> }[];
}

export const NAV_LINKS: NavLink[] = [
  { title: "nav.home", path: "/" },
  { title: "nav.about", path: "/about" },
  { title: "nav.contact", path: "/contact-us" },
];

export function isNavActive(pathname: string | null, link: NavLink): boolean {
  if (!pathname) return false;
  if (link.path && pathname === link.path) return true;
  return link.sublinks?.some((sub) => pathname.startsWith(sub.path)) ?? false;
}
