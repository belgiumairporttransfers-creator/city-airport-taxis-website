"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowUpRight, Star } from "lucide-react";
import ReviewCard, { type Review } from "@/components/features/testimonial/testimonial-card";
import TestimonialSkeleton from "../skeletons/testimonial-skeleton";
// import { useReviewsQuery } from "@/hooks/queries/use-reviews";
import { GoogleIcon, StarsIcon } from "@/components/icons";
import AnimatedCounter from "@/components/ui/animated-counter";
import { useTranslations } from "next-intl";

/** Shown when the reviews API fails or returns no reviews (up to 10). */
const DUMMY_REVIEWS: Review[] = [
    {
        author_name: "Thomas Vermeer",
        rating: 5,
        relative_time_description: "2 weeks ago",
        text: "Booked a pickup from Brussels Airport to the city centre — driver was on time, car was clean, and the fixed price was exactly what I saw online. Highly recommend City Airport Taxis.",
    },
    {
        author_name: "Sophie Laurent",
        rating: 5,
        relative_time_description: "1 month ago",
        text: "Used them for an early flight from Charleroi. Flight tracking worked perfectly and we were not rushed at all. Professional service.",
    },
    {
        author_name: "Marc De Smet",
        rating: 4,
        relative_time_description: "3 weeks ago",
        text: "Corporate booking for our team from Brussels Airport to the EU district. Invoice and communication were smooth. Will use again for business travel.",
    },
    {
        author_name: "Emma Janssens",
        rating: 5,
        relative_time_description: "5 days ago",
        text: "WhatsApp support helped me change my pickup time last minute. Driver still arrived with a smile. Excellent experience.",
    },
    {
        author_name: "Lucas Peeters",
        rating: 5,
        relative_time_description: "1 week ago",
        text: "Family of five with luggage — the van was spacious and child seats were arranged as requested. Door-to-door without stress.",
    },
    {
        author_name: "Charlotte Dubois",
        rating: 5,
        relative_time_description: "2 months ago",
        text: "First time landing at Brussels Airport and I was nervous about getting to my hotel. Meet-and-greet made it effortless. Felt very safe.",
    },
    {
        author_name: "Pieter Van den Berg",
        rating: 4,
        relative_time_description: "4 days ago",
        text: "Competitive rate compared to random taxis at the curb. Transparent pricing and polite driver. Good value.",
    },
    {
        author_name: "Julie Moreau",
        rating: 5,
        relative_time_description: "3 days ago",
        text: "Hourly booking for meetings across Brussels — driver knew the routes and saved us a lot of time. Worth every euro.",
    },
    {
        author_name: "Niels Wouters",
        rating: 5,
        relative_time_description: "6 weeks ago",
        text: "Late-night arrival from Dubai. Driver waited with a name board, helped with bags, and drove smoothly to Antwerp.",
    },
    {
        author_name: "Marie Claes",
        rating: 5,
        relative_time_description: "Yesterday",
        text: "Easy online payment and instant confirmation. The whole process from booking to drop-off was seamless. Five stars.",
    },
];

export default function Testimonials() {
    const t = useTranslations("home.testimonials");
    // const { data: reviewsData, isLoading, isError } = useReviewsQuery();
    const isLoading = false;
    const isError = true;

    if (isLoading) {
        return <TestimonialSkeleton />;
    }

    const apiReviews = undefined;
    const googleReviewsUrl = undefined;
    const useDummyReviews =
        isError || !Array.isArray(apiReviews);
    const displayReviews: Review[] = useDummyReviews
        ? DUMMY_REVIEWS
        : (apiReviews as Review[]).slice(0, 10);

    return (
        <div className="bg-white py-16 mt-20">
            <div className="text-center mb-8 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center gap-3 mb-3">
                    <StarsIcon className="shrink-0" />
                    {t("title")}
                </h2>
                <p className="text-sm md:text-base text-gray-500 mx-auto leading-relaxed">
                    {t("description")}
                    {googleReviewsUrl ? (
                        <a
                            href={googleReviewsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 ml-2 align-middle hover:opacity-80 transition-opacity"
                        >
                            <span className="h-4 w-4 flex items-center justify-center">
                                <GoogleIcon className="h-4 w-4" />
                            </span>

                            <span className="text-sm font-medium text-gray-500 leading-none">
                                Google
                            </span>

                            <ArrowUpRight size={14} className="text-gray-400" />
                        </a>
                    ) : null}
                </p>
            </div>
            <div className="container mx-auto px-4 relative group">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="testimonial-swiper !p-1"
                >
                    {displayReviews.map((r, i) => (
                        <SwiperSlide
                            key={`${r.author_name}-${i}-${useDummyReviews ? "dummy" : "api"}`}
                            className="!h-auto !flex"
                        >
                            <ReviewCard review={r} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* <div className="container mx-auto px-4">
                <div className="flex items-center justify-center mt-14 gap-0">
                    <div className="flex-1 flex flex-col items-center gap-1 px-2 md:px-8">
                        <div className="text-2xl md:text-5xl font-extrabold text-primary tracking-tight">
                            <AnimatedCounter end={10} suffix="K+" />
                        </div>
                        <span className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            {t("stats.happy_customers")}
                        </span>
                    </div>

                    <div className="w-px h-10 md:h-14 bg-gray-200 shrink-0" />

                    <div className="flex-1 flex flex-col items-center gap-1 px-2 md:px-8">
                        <div className="text-2xl md:text-5xl font-extrabold text-primary tracking-tight">
                            <AnimatedCounter end={4} prefix="0" suffix="+" />
                        </div>
                        <span className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            {t("stats.countries")}
                        </span>
                    </div>

                    <div className="w-px h-10 md:h-14 bg-gray-200 shrink-0" />

                    <div className="flex-1 flex flex-col items-center gap-1 px-2 md:px-8">
                        <div className="flex items-center justify-center gap-1 md:gap-2">
                            <div className="text-2xl md:text-5xl font-extrabold text-primary tracking-tight">
                                <AnimatedCounter end={5.0} decimals={1} />
                            </div>
                            <Star className="w-7 h-7 text-secondary fill-secondary" />
                        </div>
                        <span className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            {t("stats.avg_rating")}
                        </span>
                    </div>
                </div>
            </div> */}
        </div>
    );
}