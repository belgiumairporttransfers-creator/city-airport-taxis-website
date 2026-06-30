import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServiceCTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    className?: string;
}

export default function ServiceCTA({
    title = "Book Your Airport Transfer Today",
    description = "Experience reliable, professional, and on-time airport transfers with Airport Transfer. Book now for fixed-price, 24/7 taxi service across Pakistan.",
    buttonText = "BOOK NOW",
    buttonLink = "/booking",
    className = "",
}: ServiceCTAProps) {
    return (
        <section className={`py-16 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                        <div className="flex-1 max-w-3xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {title}
                            </h2>
                            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-2xl whitespace-pre-line">
                                {description}
                            </p>
                        </div>
                        <div className="shrink-0">
                            <Link href={buttonLink}>
                                <Button className="bg-secondary text-white px-10 py-6 rounded-full font-bold text-base hover:bg-secondary-600 transition-all duration-300 active:scale-95 whitespace-nowrap">
                                    {buttonText} <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
