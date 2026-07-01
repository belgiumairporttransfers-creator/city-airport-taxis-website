"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Map, Send, ArrowRight } from "lucide-react";
import { IMAGES } from "@/constants/image-constants";
import { CompassIcon } from "../../icons";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "../form/Input";
import { Button } from "../../ui/button";
import { useSubscribeNewsletter } from "@/hooks/queries/use-newsletter";

export default function CtaNewsletter() {
    const { mutate, isPending } = useSubscribeNewsletter();
    const methods = useForm({
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (data: { email: string }) => {
        mutate(
            { email: data.email },
            {
                onSuccess: () => {
                    methods.reset();
                },
            }
        );
    };

    return (
        <section className="bg-gray-100 py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-[#1a1a1a] rounded-md p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden group flex-1">
                            <div className="absolute top-6 right-6 text-white/5 transform group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                                <CompassIcon width={120} height={120} />
                            </div>

                            <div className="z-10">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                                    <Map className="text-white w-5 h-5" />
                                </div>
                                <h3 className="text-white text-2xl font-bold leading-tight tracking-tight mb-3">
                                    Explore new destinations with comfort
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed max-w-[220px]">
                                    Discover hidden gems and scenic routes with our premium fleet.
                                </p>
                            </div>

                            <Link
                                href="/blogs"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-600 text-white rounded-full font-bold text-xs transition-all duration-300 w-fit z-10 mt-6"
                            >
                                Start Exploring
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="relative rounded-md overflow-hidden group min-h-[260px] flex-1">
                            <Image
                                src={IMAGES.CTA_BANNER}
                                alt="Featured Experience"
                                fill
                                className="object-center object-bottom"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 whitespace-nowrap">
                                    Featured Experience
                                </span>
                                <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 whitespace-nowrap">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    Live Status
                                </span>
                            </div>

                            <div className="absolute bottom-6 left-6">
                                <p className="text-white/70 text-[10px] font-bold mb-0.5 tracking-[0.1em] uppercase">Vehicles Available</p>
                                <h4 className="text-white text-4xl font-black tracking-tighter">50+</h4>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 relative rounded-md overflow-hidden group min-h-[580px] shadow-lg flex flex-col justify-end p-8 md:p-14 lg:p-16">
                        <Image
                            src={IMAGES.CTA_BANNER}
                            alt="Subscribe to newsletter"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-block bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-5 py-2 rounded-full border border-white/20 uppercase tracking-[0.15em] mb-6">
                                Subscribe
                            </span>
                            <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
                                Subscribe to our newsletter and get 5% off on your first ride!
                            </h2>
                            <p className="text-white/60 text-sm md:text-base lg:text-lg font-medium mb-8 md:mb-12">
                                Get the latest updates and offers directly in your inbox.
                            </p>
                            {/* Newsletter Form */}
                            <FormProvider {...methods}>
                                <form
                                    className="relative w-full max-w-xl group/input"
                                    onSubmit={methods.handleSubmit(onSubmit)}
                                >
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 p-1.5 focus-within:border-white/40 focus-within:bg-white/15 transition-all duration-500 shadow-2xl">
                                        <div className="flex-1 relative">
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email address here..."
                                                required
                                                inputClassName="newsletter-input !bg-transparent !border-0 !text-white !placeholder:text-white/40 !h-12 !px-6 !py-0 !shadow-none !ring-0 focus:!ring-0"
                                                className="w-full"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isPending}
                                            className="px-8 bg-secondary hover:bg-secondary-600 text-white rounded-full font-bold text-sm transition-all duration-500 shadow-xl active:scale-95 whitespace-nowrap h-12"
                                        >
                                            {isPending ? "Subscribing..." : "Subscribe"}
                                        </Button>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
