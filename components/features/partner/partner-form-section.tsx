"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/features/form/Input";
import FileUpload from "@/components/features/form/file-upload";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import CitySelectorModal from "./city-selector-modal";

interface PartnerFormValues {
    country: string;
    city: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    carType: string;
    carColor: string;
    carYearModel: string;
    licensePlate: string;
    experience: string;
    shift: "day" | "night" | "";
    driverTimingFrom: string;
    driverTimingTo: string;
    chauffeurPassFront: string;
    chauffeurPassBack: string;
    kiwaPermit: string;
    insurancePolicy: string;
    bankpas: string;
    kvkExtract: string;
    driverLicenseFront: string;
    driverLicenseBack: string;
    carFront: string;
    carBack: string;
    carLeft: string;
    carRight: string;
    carInside: string;
    carPlate: string;
    carCard: string;
}

const SHIFT_OPTIONS = [
    { value: "day", labelKey: "partner.form.shift_options.day" as const },
    { value: "night", labelKey: "partner.form.shift_options.night" as const },
];

export default function PartnerFormSection() {
    const t = useTranslations("business");

    const methods = useForm<PartnerFormValues>({
        defaultValues: {
            country: "",
            city: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            carType: "",
            carColor: "",
            carYearModel: "",
            licensePlate: "",
            experience: "",
            shift: "",
            driverTimingFrom: "",
            driverTimingTo: "",
            chauffeurPassFront: "",
            chauffeurPassBack: "",
            kiwaPermit: "",
            insurancePolicy: "",
            bankpas: "",
            kvkExtract: "",
            driverLicenseFront: "",
            driverLicenseBack: "",
            carFront: "",
            carBack: "",
            carLeft: "",
            carRight: "",
            carInside: "",
            carPlate: "",
            carCard: "",
        },
    });

    const onSubmit = (data: PartnerFormValues) => {
       console.log(data);
    };

    return (
        <section id="partner-form" className="py-12 lg:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">


                    <div className="lg:col-span-5 hidden lg:block sticky top-32 h-fit">
                        <div className="flex flex-col space-y-8">
                            <div className="mb-8">
                                <span className="text-primary font-bold text-base tracking-widest uppercase">
                                    {t("partner.form.top_text")}
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    {t.rich("partner.form.title", {
                                        br: () => <br />
                                    })}
                                </h2>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-lg">
                                    {t("partner.form.description")}
                                </p>
                            </div>

                            <div className="flex flex-col gap-6">
                                {[
                                    {
                                        title: t("partner.form.benefits.onboarding.title"),
                                        desc: t("partner.form.benefits.onboarding.desc")
                                    },
                                    {
                                        title: t("partner.form.benefits.payments.title"),
                                        desc: t("partner.form.benefits.payments.desc")
                                    },
                                    {
                                        title: t("partner.form.benefits.fleet.title"),
                                        desc: t("partner.form.benefits.fleet.desc")
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 group cursor-pointer">
                                        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary/5 flex items-center justify-center transition-colors group-hover:bg-primary/10">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-bold text-base tracking-tight uppercase">
                                                {item.title}
                                            </span>
                                            <span className="text-gray-400 text-xs font-medium">
                                                {item.desc}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 lg:p-10 lg:bg-gray-50 lg:border lg:border-border lg:rounded-2xl shadow-none">
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8">
                                <CitySelectorModal onConfirm={(data) => {
                                    methods.setValue("country", data.country);
                                    methods.setValue("city", data.city);
                                }} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        name="country"
                                        label={t("partner.form.labels.country")}
                                        placeholder={t("partner.form.placeholders.country")}
                                        required
                                        disabled
                                    />
                                    <Input
                                        name="city"
                                        label={t("partner.form.labels.city")}
                                        placeholder={t("partner.form.placeholders.city")}
                                        required
                                        disabled
                                    />
                                    <Input
                                        name="firstName"
                                        label={t("partner.form.labels.firstname")}
                                        placeholder={t("partner.form.placeholders.firstname")}
                                        required
                                    />
                                    <Input
                                        name="lastName"
                                        label={t("partner.form.labels.lastname")}
                                        placeholder={t("partner.form.placeholders.lastname")}
                                        required
                                    />
                                    <Input
                                        name="email"
                                        type="email"
                                        label={t("partner.form.labels.email")}
                                        placeholder={t("partner.form.placeholders.email")}
                                        required
                                    />
                                    <Input
                                        name="phone"
                                        type="phone"
                                        label={t("partner.form.labels.phone")}
                                        placeholder={t("partner.form.placeholders.phone")}
                                        required
                                    />

                                    <Input
                                        name="carType"
                                        label={t("partner.form.labels.cartype")}
                                        placeholder={t("partner.form.placeholders.cartype")}
                                        required
                                    />
                                    <Input
                                        name="carColor"
                                        label={t("partner.form.labels.carcolor")}
                                        placeholder={t("partner.form.placeholders.carcolor")}
                                        required
                                    />
                                    <Input
                                        name="licensePlate"
                                        label={t("partner.form.labels.license_plate")}
                                        placeholder={t("partner.form.placeholders.license_plate")}
                                        required
                                    />
                                    <Input
                                        name="experience"
                                        label={t("partner.form.labels.experience")}
                                        placeholder={t("partner.form.placeholders.experience")}
                                        required
                                    />
                                    <Input
                                        name="carYearModel"
                                        label={t("partner.form.labels.car_year_model")}
                                        placeholder={t("partner.form.placeholders.car_year_model")}
                                        required
                                    />
                                    <Input
                                        name="shift"
                                        type="select"
                                        label={t("partner.form.labels.shift")}
                                        selectPlaceholder={t("partner.form.placeholders.shift")}
                                        selectOptions={SHIFT_OPTIONS.map((option) => ({
                                            value: option.value,
                                            label: t(option.labelKey),
                                        }))}
                                        required
                                    />
                                    <div className="md:col-span-2 space-y-2">
                                        <p className="text-sm font-semibold text-gray-700">
                                            {t("partner.form.labels.driver_timing")}
                                            <span className="text-error ml-1">*</span>
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <Input
                                                name="driverTimingFrom"
                                                type="time"
                                                label={t("partner.form.labels.timing_from")}
                                                placeholder={t("partner.form.placeholders.timing_from")}
                                                required
                                            />
                                            <Input
                                                name="driverTimingTo"
                                                type="time"
                                                label={t("partner.form.labels.timing_to")}
                                                placeholder={t("partner.form.placeholders.timing_to")}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <Input
                                        name="address"
                                        type="location"
                                        label={t("partner.form.labels.address")}
                                        placeholder={t("partner.form.placeholders.address")}
                                        required
                                    />
                                </div>
                                <div className="space-y-8">
                                    <div className="flex flex-col space-y-1">
                                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{t("partner.form.labels.documents")}</h3>
                                        <p className="text-sm text-gray-500">{t("partner.form.labels.documents_desc")}</p>
                                    </div>

                                    {/* ID Documents */}
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                            <FileUpload
                                                name="chauffeurPassFront"
                                                label={t("partner.form.labels.pass_front")}
                                                required
                                            />
                                            <FileUpload
                                                name="chauffeurPassBack"
                                                label={t("partner.form.labels.pass_back")}
                                                required
                                            />
                                        </div>
                                        <FileUpload
                                            name="kiwaPermit"
                                            label={t("partner.form.labels.kiwa")}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                        <FileUpload
                                            name="driverLicenseFront"
                                            label={t("partner.form.labels.license_front")}
                                            required
                                        />
                                        <FileUpload
                                            name="driverLicenseBack"
                                            label={t("partner.form.labels.license_back")}
                                            required
                                        />
                                    </div>

                                    {/* Vehicle Photos */}
                                    <div className="space-y-4 pt-4">
                                        <div className="flex flex-col space-y-1">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t("partner.form.labels.vehicle_photos")}</h4>
                                            <p className="text-sm text-gray-500">{t("partner.form.labels.vehicle_photos_desc")}</p>
                                        </div>
                                        <FileUpload
                                            name="carCard"
                                            label={t("partner.form.labels.car_card")}
                                            required
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                            <FileUpload
                                                name="carFront"
                                                label={t("partner.form.labels.car_front")}
                                                required
                                            />
                                            <FileUpload
                                                name="carBack"
                                                label={t("partner.form.labels.car_back")}
                                                required
                                            />
                                            <FileUpload
                                                name="carLeft"
                                                label={t("partner.form.labels.car_left")}
                                                required
                                            />
                                            <FileUpload
                                                name="carRight"
                                                label={t("partner.form.labels.car_right")}
                                                required
                                            />
                                            <FileUpload
                                                name="carInside"
                                                label={t("partner.form.labels.car_inside")}
                                                required
                                            />
                                            <FileUpload
                                                name="carPlate"
                                                label={t("partner.form.labels.car_plate")}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Business & Insurance */}
                                    <div className="space-y-4 pt-4">
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t("partner.form.labels.business_insurance")}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                            <FileUpload
                                                name="insurancePolicy"
                                                label={t("partner.form.labels.insurance")}
                                                required
                                            />
                                            <FileUpload
                                                name="kvkExtract"
                                                label={t("partner.form.labels.kvk")}
                                                required
                                            />
                                        </div>
                                        <FileUpload
                                            name="bankpas"
                                            label={t("partner.form.labels.bankpas")}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-14 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black/90 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span>{t("partner.form.button")}</span>
                                    <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </section>
    );
}
