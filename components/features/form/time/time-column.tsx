"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";

interface TimeColumnProps {
    label: string;
    values: number[];
    selected: number | null;
    onSelect: (val: number) => void;
}

export default function TimeColumn({
    label,
    values,
    selected,
    onSelect,
}: TimeColumnProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selected !== null && ref.current) {
            const selectedElement = ref.current.children[values.indexOf(selected)] as HTMLElement;
            if (selectedElement) {
                ref.current.scrollTo({
                    top: selectedElement.offsetTop,
                    behavior: "smooth",
                });
            }
        }
    }, [selected, values]);

    const scroll = (dir: "up" | "down") => {
        if (!ref.current) return;

        const amount = 40;
        ref.current.scrollBy({
            top: dir === "up" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <div className="flex flex-col">
            <label className="text-xs text-center mb-2 text-gray-500 font-medium">
                {label}
            </label>

            <div className="relative border border-border rounded-md overflow-hidden bg-white">
                <button
                    type="button"
                    onClick={() => scroll("up")}
                    className="w-full py-1.5 border-b border-border flex justify-center hover:bg-gray-50 transition"
                >
                    <ChevronUp size={14} className="text-gray-400" />
                </button>

                <div
                    ref={ref}
                    className="max-h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] relative"
                >
                    {values.map((val) => {
                        const isSelected = selected === val;

                        return (
                            <button
                                key={val}
                                type="button"
                                onClick={() => onSelect(val)}
                                className={`w-full py-2 text-sm border-b border-border last:border-b-0 transition font-bold cursor-pointer ${isSelected
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-gray-100 text-slate-700"
                                    }`}
                            >
                                {val.toString().padStart(2, "0")}
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={() => scroll("down")}
                    className="w-full py-1.5 border-t border-border flex justify-center hover:bg-gray-50 transition"
                >
                    <ChevronDown size={14} className="text-gray-400" />
                </button>
            </div>
        </div>
    );
}