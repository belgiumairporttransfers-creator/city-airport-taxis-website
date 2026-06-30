import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface StickyParallaxCTAProps {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage?: string;
    className?: string;
}

export default function StickyParallaxCTA({
    title = "Experience Seamless Airport Transfers",
    subtitle = "PREMIUM TAXI SERVICE",
    description = "Book your professional airport transfer with Airport Transfer. Fixed prices, 24/7 availability, and comfortable vehicles across Pakistan.",
    buttonText = "BOOK YOUR RIDE NOW",
    buttonLink = "/booking",
    backgroundImage = "/assets/images/cta/cta-image-1.png",
    className = "",
}: StickyParallaxCTAProps) {
    return (
        <section
            className={`relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-fixed bg-cover bg-center ${className}`}
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0" />

            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    {subtitle && (
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="h-[2px] w-8 bg-secondary rounded-full hidden sm:block"></span>
                            <span className="text-secondary font-bold tracking-[0.3em] text-xs md:text-sm uppercase">
                                {subtitle}
                            </span>
                            <span className="h-[2px] w-8 bg-secondary rounded-full hidden sm:block"></span>
                        </div>
                    )}

                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        {title.split(' ').map((word, i) => (
                            <span key={i} className="inline-block mr-[0.2em] last:mr-0">
                                {word}
                            </span>
                        ))}
                    </h2>

                    <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href={buttonLink}>
                            <Button className="bg-secondary text-white px-12 py-7 rounded-full font-bold text-lg hover:bg-secondary-600 transition-all duration-300 active:scale-95 shadow-2xl hover:shadow-secondary/30 group">
                                {buttonText}
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background/10 to-transparent backdrop-blur-[2px] pointer-events-none" />

            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
        </section>
    );
}
