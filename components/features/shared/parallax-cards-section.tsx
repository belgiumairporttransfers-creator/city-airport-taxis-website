import React from "react";
import Image from "next/image";

export interface ParallaxCardItem {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export interface ParallaxCardsSectionProps {
    image: string;
    topText?: string;
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    cards: ParallaxCardItem[];
}

export default function ParallaxCardsSection({
    image,
    topText,
    title,
    description,
    cards,
}: ParallaxCardsSectionProps) {
    return (
        <section className="relative py-20 lg:py-28 bg-black">
            {/* Sticky/Parallax Background */}
            <div className="absolute inset-0" style={{ clipPath: "inset(0)" }}>
                <div className="fixed inset-0 w-full h-full">
                    <Image
                        src={image}
                        alt="Section background"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    {topText && (
                        <span className="text-secondary font-semibold text-xs md:text-sm tracking-wider uppercase mb-4 block">
                            {topText}
                        </span>
                    )}
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-gray-300 text-sm md:text-base lg:text-lg">
                            {description}
                        </p>
                    )}
                </div>

                {cards && cards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {cards.map((card, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 md:p-8 border border-secondary/30 shadow-xl transition-transform hover:-translate-y-1 duration-300">
                                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-5">
                                    {card.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
