import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export interface FooterLinkItem {
  href: string;
  label: string;
}

interface FooterLinksColumnProps {
  title: string;
  links: FooterLinkItem[];
}

export default function FooterLinksColumn({ title, links }: FooterLinksColumnProps) {
  return (
    <div className="flex flex-col items-start">
      <h3 className="mb-5 text-sm font-semibold tracking-[0.08em] text-white uppercase">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="group inline-flex items-center gap-2 text-sm leading-relaxed text-gray-300 transition-colors hover:text-secondary">
              <ArrowRight className="h-3.5 w-3.5 text-gray-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-secondary" />
              <span className="transition-all duration-200 group-hover:translate-x-1 group-hover:text-secondary">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
