"use client";

import React, { useState, useEffect } from "react";
import { PAKISTAN_CITIES } from "@/constants/cities";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/features/form/Input";
import { FormProvider, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle2, Navigation } from "lucide-react";
import { useTranslations } from "next-intl";

interface CitySelectorModalProps {
    onConfirm?: (data: { country: string; city: string }) => void;
}

export default function CitySelectorModal({ onConfirm }: CitySelectorModalProps) {
    const t = useTranslations('business');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm({
        defaultValues: {
            country: "Pakistan",
            city: "",
        }
    });

    const { watch, setValue } = methods;
    const selectedCountry = watch("country");
    const selectedCity = watch("city");

    // Show modal on mount
    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handleConfirm = () => {
        if (selectedCountry && selectedCity) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setIsOpen(false);
                onConfirm?.({ country: selectedCountry, city: selectedCity });
                document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' });
            }, 800);
        }
    };

    const countryOptions = [
        { label: "🇵🇰 Pakistan", value: "Pakistan" }
    ];

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!selectedCity || !selectedCountry) return;
            setIsOpen(open);
        }}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none bg-white rounded-md shadow-2xl [&>button]:hidden">
                {/* Header Section */}
                <div className="relative h-32 bg-secondary flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 30 0 70 0 100 100 Z" fill="white" />
                        </svg>
                    </div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative z-10 bg-white/20 p-5 rounded-full backdrop-blur-md shadow-inner"
                    >
                        <Navigation className="w-10 h-10 text-white animate-pulse" />
                    </motion.div>
                </div>

                <div className="p-8 space-y-8">
                    <div className="text-center space-y-3">
                        <DialogTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {t("partner_register.modal.title")}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 text-base">
                            {t("partner_register.modal.description")}
                        </DialogDescription>
                    </div>

                    <FormProvider {...methods}>
                        <div className="space-y-5">
                            <Input
                                name="country"
                                type="select"
                                label={t("partner_register.modal.country_label")}
                                selectPlaceholder={t("partner_register.modal.country_placeholder")}
                                selectOptions={countryOptions}
                                required
                                disabled
                            />

                            <Input
                                name="city"
                                type="select"
                                label={t("partner_register.modal.city_label")}
                                selectPlaceholder={t("partner_register.modal.city_placeholder")}
                                selectOptions={PAKISTAN_CITIES.map(city => ({
                                    label: city,
                                    value: city
                                }))}
                                required
                            />
                        </div>
                    </FormProvider>

                    <Button
                        onClick={handleConfirm}
                        disabled={!selectedCity}
                        loading={isLoading}
                        className="w-full"
                    >
                        {t("partner_register.modal.button_ready")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
