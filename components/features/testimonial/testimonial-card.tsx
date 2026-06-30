import Image from "next/image";
import { Star, CheckCircle2 } from "lucide-react";
import { GoogleIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface Review {
    author_name: string;
    author_url?: string;
    profile_photo_url?: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time?: number;
}

function AmberStars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => (
                <span
                    key={i}
                    className={`w-[19px] h-[19px] rounded-[2px] flex items-center justify-center ${i < rating ? "bg-secondary" : "bg-gray-200"
                        }`}
                >
                    <Star size={11} fill="white" stroke="none" />
                </span>
            ))}
        </div>
    );
}

export default function TestimonialCard({ review }: { review: Review }) {
    return (
        <div className="bg-white rounded-md p-6 flex flex-col h-full w-full shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="mb-4">
                <AmberStars rating={review.rating} />
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-[1.6] flex-1 italic mb-6 line-clamp-5">
                "{review.text}"
            </p>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                <div className="relative">
                    {review.profile_photo_url ? (
                        <Image
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            width={40}
                            height={40}
                            className="rounded-full shrink-0 aspect-square object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                            <span className="text-xs text-white font-bold">{review.author_name.charAt(0)}</span>
                        </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
                        <GoogleIcon size={12} />
                    </div>
                </div>

                <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-gray-900 truncate">{review.author_name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 fill-green-500/10 shrink-0" />
                    </div>
                    <span className="text-base text-gray-400 font-medium">{review.relative_time_description}</span>
                </div>
            </div>
        </div>
    );
}



