import { Phone } from "lucide-react";
import { Link } from "@/i18n/routing";
import { COMPANY_PHONE_HREF } from "@/constants/app-default";
import { cn } from "@/lib/utils";

export interface BookingCTASectionProps {
    title: string;
    description: string;
    bookOnlineText: string;
    callSupportText: string;
    bookOnlineHref?: string;
    callSupportHref?: string;
    className?: string;
}

export default function BookingCTASection({
    title,
    description,
    bookOnlineText,
    callSupportText,
    bookOnlineHref = "/",
    callSupportHref = COMPANY_PHONE_HREF,
    className,
}: BookingCTASectionProps) {
    return (
        <section className={cn("bg-white py-12 md:py-16", className)}>
            <div className="container mx-auto px-4">
                <div className="rounded-3xl bg-secondary px-6 py-10 text-center md:rounded-[2rem] md:px-10 md:py-12 lg:px-14 lg:py-14">
                    <h2 className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
                        {title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary/90 md:mt-5 md:text-base md:leading-7">
                        {description}
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-10">
                        <Link
                            href={bookOnlineHref}
                            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90 sm:w-auto md:px-10 md:text-base"
                        >
                            {bookOnlineText}
                        </Link>
                        <a
                            href={callSupportHref}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-transparent px-8 py-3.5 text-sm font-bold text-primary transition-colors hover:bg-primary/5 sm:w-auto md:px-10 md:text-base"
                        >
                            <Phone className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                            {callSupportText}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
