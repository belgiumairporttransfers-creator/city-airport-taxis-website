"use client";

import { Phone } from "lucide-react";

export interface ServiceCardData {
    title: string;
    audiences: string[];
}

interface ServiceCardProps {
    service: ServiceCardData;
    perfectForLabel: string;
}

export default function ServiceCard({ service, perfectForLabel }: ServiceCardProps) {
    const { title, audiences } = service;

    return (
        <article className="flex h-full w-full flex-col rounded-2xl border border-gray-100 bg-gray-50 p-5 md:p-6">
            <Phone className="mb-4 h-6 w-6 text-secondary" strokeWidth={1.75} aria-hidden />
            <h3 className="text-base font-bold leading-snug text-primary md:text-lg">{title}</h3>
            <p className="mt-4 text-sm font-bold text-secondary">{perfectForLabel}</p>
            <ul className="mt-3 flex flex-1 list-disc flex-col gap-2 pl-4 text-sm leading-relaxed text-gray-600">
                {audiences.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </article>
    );
}
