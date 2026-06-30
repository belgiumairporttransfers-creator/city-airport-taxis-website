"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import React from "react";

export interface FAQItem {
    id?: string;
    question: string;
    answer: React.ReactNode;
}

interface FAQAccordionProps {
    items: FAQItem[];
    defaultValue?: string;
    className?: string;
}

export function FAQAccordion({ items, defaultValue, className }: FAQAccordionProps) {
    return (
        <Accordion
            type="single"
            collapsible
            defaultValue={defaultValue}
            className={cn("flex w-full flex-col gap-4", className)}
        >
            {items.map((faq, index) => (
                <AccordionItem
                    key={faq.id ?? `item-${index}`}
                    value={faq.id ?? `item-${index}`}
                    className="group border-none cursor-pointer"
                >
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors duration-300 group-data-[state=open]:border-secondary/30 group-data-[state=open]:bg-secondary/15">
                        <AccordionTrigger className="flex w-full items-center justify-between px-5 py-3 text-left hover:no-underline md:px-6 [&[data-state=open]>svg]:rotate-180 cursor-pointer">
                            <span className="pr-4 text-sm font-bold leading-snug text-primary md:text-base">
                                {faq.question}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-0 pt-0 md:px-6 [&>div>div]:pb-3 [&>div>div]:pt-0">
                            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                                {faq.answer}
                            </p>
                        </AccordionContent>
                    </div>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export const DEFAULT_FAQS: FAQItem[] = [
    {
        question: "What do I need to book a transfer?",
        answer: "You will need your flight details, pickup and drop-off addresses, and a valid contact number. Payment can be completed securely online.",
    },
    {
        question: "Is insurance included in the price?",
        answer: "Yes, standard coverage is included. Additional options may be available for your peace of mind.",
    },
    {
        question: "Can I book a one-way transfer between cities?",
        answer: "Absolutely. We offer one-way transfers across major cities in Pakistan. Additional fees may apply based on distance.",
    },
    {
        question: "What is your cancellation policy?",
        answer: "Cancellations made more than 24 hours before pickup are generally free of charge. See our terms and conditions for full details.",
    },
];
