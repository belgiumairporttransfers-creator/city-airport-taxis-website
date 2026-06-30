import {
    CalendarCheck,
    Car,
    CheckCircle2,
    Search,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEP_ICONS: Record<string, LucideIcon> = {
    Search,
    CheckCircle2,
    CalendarCheck,
    Car,
};

export interface BookingStepItem {
    icon: string;
    title: string;
    description: string;
}

export interface BookingStepsSectionProps {
    title: string;
    description: string;
    steps: BookingStepItem[];
    className?: string;
}

export default function BookingStepsSection({
    title,
    description,
    steps,
    className,
}: BookingStepsSectionProps) {
    return (
        <section className={cn("bg-white py-12 md:py-16", className)}>
            <div className="container mx-auto px-4">
                <div className="rounded-2xl border border-gray-200/80 bg-[#f5f5f5] px-5 py-10 md:rounded-3xl md:px-8 md:py-12 lg:px-12">
                    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
                            {title}
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-gray-500 md:text-base">
                            {description}
                        </p>
                    </div>

                    <div className="relative">
                        <div
                            className="absolute left-[12%] right-[12%] top-10 hidden h-px bg-gray-300 md:block lg:top-11"
                            aria-hidden
                        />

                        <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                            {steps.map((step, index) => {
                                const Icon = STEP_ICONS[step.icon] ?? Search;

                                return (
                                    <li key={index} className="flex flex-col items-center text-center">
                                        <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary md:h-[5.5rem] md:w-[5.5rem]">
                                            <Icon
                                                className="h-8 w-8 text-secondary md:h-9 md:w-9"
                                                strokeWidth={1.75}
                                                aria-hidden
                                            />
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900 md:text-lg">
                                            {step.title}
                                        </h3>
                                        <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-gray-500 md:text-[15px]">
                                            {step.description}
                                        </p>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
