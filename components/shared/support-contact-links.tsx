import Link from "next/link";
import {
    COMPANY_PHONE,
    COMPANY_PHONE_HREF,
    COMPANY_WHATSAPP_DISPLAY,
    COMPANY_WHATSAPP_HREF,
} from "@/constants/app-default";
import { cn } from "@/lib/utils";

type SupportContactLinksProps = {
    className?: string;
    phoneLabel?: string;
    whatsappLabel?: string;
};

export default function SupportContactLinks({
    className,
    phoneLabel = "Phone",
    whatsappLabel = "WhatsApp",
}: SupportContactLinksProps) {
    return (
        <div className={cn("flex flex-col gap-2 text-sm text-gray-600", className)}>
            <p>
                {phoneLabel}:{" "}
                <Link href={COMPANY_PHONE_HREF} className="font-semibold text-secondary hover:underline">
                    {COMPANY_PHONE}
                </Link>
            </p>
            <p>
                {whatsappLabel}:{" "}
                <Link
                    href={COMPANY_WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-secondary hover:underline"
                >
                    {COMPANY_WHATSAPP_DISPLAY}
                </Link>
            </p>
        </div>
    );
}
