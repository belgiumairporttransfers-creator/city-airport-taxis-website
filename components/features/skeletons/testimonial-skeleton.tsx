"use client";

export default function TestimonialSkeleton() {
    return (
        <div className="bg-white px-4 md:px-8 pt-52 pb-16 animate-pulse">
            <div className="text-center mb-8">
                <div className="h-9 w-72 bg-gray-200 rounded mx-auto mb-6" />

                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-5 w-28 bg-gray-200 rounded" />
                    <div className="h-5 w-16 bg-gray-200 rounded" />
                    <div className="h-5 w-52 bg-gray-200 rounded" />
                    <div className="h-5 w-20 bg-gray-200 rounded" />
                </div>
            </div>

            <div className="container mx-auto mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl border border-gray-200 p-5 min-h-[220px]">
                            <div className="h-4 w-28 bg-gray-200 rounded mb-3" />
                            <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
                            <div className="space-y-2 mb-6">
                                <div className="h-3 w-full bg-gray-200 rounded" />
                                <div className="h-3 w-11/12 bg-gray-200 rounded" />
                                <div className="h-3 w-9/12 bg-gray-200 rounded" />
                            </div>
                            <div className="flex items-center justify-between mt-8">
                                <div className="h-4 w-20 bg-gray-200 rounded" />
                                <div className="h-4 w-16 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-2">
                <div className="h-5 w-52 bg-gray-200 rounded" />
            </div>
        </div>
    );
}

