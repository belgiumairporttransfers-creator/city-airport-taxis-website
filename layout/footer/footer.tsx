"use client";

import { MapPin, Phone, Mail, FileText } from "lucide-react";
import FooterLinksColumn, { FooterLinkItem } from "./FooterLinksColumn";
import FooterBottomBar from "./FooterBottomBar";
import { Logo } from "@/layout/header/logo";
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_EMAIL_HREF,
  COMPANY_PHONE,
  COMPANY_PHONE_HREF,
  COMPANY_REGISTRATION,
  SOCIAL_LINKS,
} from "@/constants/app-default";
import { FacebookIcon, InstagramIcon, TrustpilotIcon, TwitterIcon } from "@/components/icons";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("common");

  const quickLinks: FooterLinkItem[] = [
    { href: "/", label: t("footer.links.home") },
    { href: "/airport-transfer", label: t("nav.services_list.airport_transfer") },
    { href: "/fleet", label: t("footer.links.fleet") },
    { href: "/partner-with-us", label: t("footer.links.partner") },
    { href: "/contact-us", label: t("footer.links.contact") },
    { href: "/help-desk", label: t("footer.links.help_desk") },
  ];

  const airportLinks: FooterLinkItem[] = [
    { href: "/karachi-jinnah-airport-transfer", label: t("airports.karachi_jinnah") },
    { href: "/islamabad-airport-transfer", label: t("airports.islamabad") },
    { href: "/lahore-airport-transfer", label: t("airports.lahore") },
    { href: "/skardu-airport-transfer", label: t("airports.skardu") },
  ];

  const serviceLinks: FooterLinkItem[] = [
    { href: "/airport-transfer", label: t("nav.services_list.airport_transfer") },
    { href: "/airline-crew-transportation", label: t("nav.services_list.airline_crew") },
    { href: "/city-ride", label: t("nav.services_list.city_rides") },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-12 px-4 sm:py-16">
        <div className="grid grid-cols-1 gap-10 text-left sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start lg:col-span-3">
            <div className="flex items-center mb-10">
              <Logo />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-300 mb-8">{t("footer.description")}</p>

            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5 text-white" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5 text-white" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5 text-white" />
              </a>
              <a
                href={SOCIAL_LINKS.trustpilot}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00b67a] hover:border-[#00b67a] hover:scale-110 transition-all duration-300"
                aria-label="Trustpilot"
              >
                <TrustpilotIcon className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterLinksColumn title={t("footer.quick_links")} links={quickLinks} />
          </div>
          <div className="lg:col-span-2">
            <FooterLinksColumn title={t("footer.our_services")} links={serviceLinks} />
          </div>
          <div className="lg:col-span-3">
            <FooterLinksColumn title={t("footer.popular_airports")} links={airportLinks} />
          </div>

          <div className="flex flex-col items-start lg:col-span-2">
            <h3 className="mb-5 text-sm font-semibold tracking-[0.08em] text-white uppercase">
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
                  icon: Mail,
                  text: COMPANY_EMAIL,
                  href: COMPANY_EMAIL_HREF,
                },
                // {
                //   icon: FileText,
                //   text: `NTN: ${COMPANY_REGISTRATION}`,
                //   href: "#",
                // },
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
