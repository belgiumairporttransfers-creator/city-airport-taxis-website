"use client";

import { MapPin, Phone, Mail, FileText } from "lucide-react";
import FooterLinksColumn, { FooterLinkItem } from "./FooterLinksColumn";
import FooterBottomBar from "./FooterBottomBar";
import { Logo } from "@/layout/header/logo";
import {
  COMPANY_ADDRESS,
  COMPANY_DESCRIPTION,
  COMPANY_EMAIL,
  COMPANY_EMAIL_HREF,
  COMPANY_PHONE,
  COMPANY_PHONE_HREF,
  COMPANY_REGISTRATION,
  COMPANY_WHATSAPP_HREF,
  SOCIAL_LINKS,
} from "@/constants/app-default";
import { FacebookIcon, TrustpilotIcon } from "@/components/icons";
import WhatsAppIcon from "@/components/icons/whatsapp-icon";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("common");

  const quickLinks: FooterLinkItem[] = [
    { href: "/", label: t("footer.links.home") },
    { href: "/about", label: t("footer.links.about") },
    { href: "/partner-with-us", label: t("footer.links.driver") },
    { href: "/contact-us", label: t("footer.links.contact") },
    { href: "/help-desk", label: t("footer.links.faqs") },
  ];

  const cityLinks: FooterLinkItem[] = [
    { href: "/#book-ride-form", label: t("footer.cities.brussels") },
    { href: "/#book-ride-form", label: t("footer.cities.antwerp") },
    { href: "/#book-ride-form", label: t("footer.cities.ghent") },
    { href: "/#book-ride-form", label: t("footer.cities.bruges") },
    { href: "/#book-ride-form", label: t("footer.cities.amsterdam") },
    { href: "/#book-ride-form", label: t("footer.cities.paris") },
    { href: "/#book-ride-form", label: t("footer.cities.luxembourg") },
    { href: "/#book-ride-form", label: t("footer.cities.maastricht") },
  ];

  const serviceLinks: FooterLinkItem[] = [
    { href: "/airport-transfer", label: t("footer.services.airport_transfer") },
    { href: "/city-ride", label: t("footer.services.hourly_transfers") },
    { href: "/airline-crew-transportation", label: t("footer.services.event_transfers") },
    { href: "/corporate-travel-solutions", label: t("footer.services.corporate_business") },
    { href: "/corporate-travel-solutions", label: t("footer.services.embassy_delegation") },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 text-left sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start lg:col-span-3">
            <div className="mb-10 flex items-center">
              <Logo />
            </div>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-gray-300">
              {COMPANY_DESCRIPTION}
            </p>

            <div className="flex items-center gap-3">
              <a
                href={COMPANY_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-secondary hover:bg-secondary"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5 text-white" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-secondary hover:bg-secondary"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5 text-white" />
              </a>
              <a
                href={COMPANY_EMAIL_HREF}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-secondary hover:bg-secondary"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-white" />
              </a>
            </div>

            <a
              href={SOCIAL_LINKS.trustpilot}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 transition-opacity hover:opacity-90"
              aria-label="Rated Excellent on Trustpilot"
            >
              <span className="text-sm font-bold tracking-tight text-white">EXCELLENT</span>
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex h-5 w-5 items-center justify-center bg-[#00B67A]"
                  >
                    <TrustpilotIcon className="size-3 text-white" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <TrustpilotIcon className="size-5 text-[#00B67A]" />
                <span className="text-sm font-normal tracking-tight text-white">Trustpilot</span>
              </div>
            </a>
          </div>

          <div className="lg:col-span-2">
            <FooterLinksColumn title={t("footer.quick_links")} links={quickLinks} />
          </div>

          <div className="lg:col-span-2">
            <FooterLinksColumn title={t("footer.top_cities")} links={cityLinks} />
          </div>

          <div className="lg:col-span-2">
            <FooterLinksColumn title={t("footer.our_services")} links={serviceLinks} />
          </div>

          <div className="flex flex-col items-start lg:col-span-3">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.08em] text-secondary">
              {t("footer.contact_info")}
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  text: COMPANY_PHONE,
                  href: COMPANY_PHONE_HREF,
                },
                {
                  icon: FileText,
                  text: `${t("footer.enterprise_label")} ${COMPANY_REGISTRATION}`,
                  href: "#",
                },
                {
                  icon: Mail,
                  text: COMPANY_EMAIL,
                  href: COMPANY_EMAIL_HREF,
                },
                {
                  icon: MapPin,
                  text: COMPANY_ADDRESS,
                  href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_ADDRESS)}`,
                },
              ].map((item, index) => (
                <div key={index} className="group flex items-start gap-3">
                  <item.icon className="h-4 w-4 shrink-0 text-gray-400 transition-colors duration-300 group-hover:text-secondary" />
                  <a
                    href={item.href}
                    target={item.icon === MapPin ? "_blank" : undefined}
                    rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                    className="text-sm leading-relaxed text-gray-300 transition-colors duration-300 hover:text-secondary"
                  >
                    {item.text}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FooterBottomBar />
    </footer>
  );
}
