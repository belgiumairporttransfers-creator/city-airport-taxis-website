"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/features/form/Input";
import FileUpload from "@/components/features/form/file-upload";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { BELGIUM_CITIES } from "@/constants/cities";
import {
    DRIVER_DOCUMENT_FIELDS,
    type DriverDocuments,
    type DriverShiftType,
    type SubmitDriverApplicationPayload,
} from "@/lib/api/drivers";
import { useSubmitDriverApplication } from "@/hooks/queries/use-driver";

type PartnerFormValues = {
    operatingCountry: string;
    operatingCity: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    homeAddress: string;
    carType: string;
    carColor: string;
    licensePlate: string;
    carYearModel: string;
    yearsOfExperience: string;
    shiftType: DriverShiftType | "";
    availableFrom: string;
    availableTo: string;
    profilePhoto: string;
} & DriverDocuments;

const SHIFT_OPTIONS: { value: DriverShiftType; labelKey: "partner.form.shift_options.day" | "partner.form.shift_options.night" | "partner.form.shift_options.both" }[] = [
    { value: "day", labelKey: "partner.form.shift_options.day" },
    { value: "night", labelKey: "partner.form.shift_options.night" },
    { value: "both", labelKey: "partner.form.shift_options.both" },
];

const EMPTY_DOCUMENTS = Object.fromEntries(
    DRIVER_DOCUMENT_FIELDS.map((field) => [field, ""])
) as DriverDocuments;

function toSubmitPayload(data: PartnerFormValues): SubmitDriverApplicationPayload {
    const documents = Object.fromEntries(
        DRIVER_DOCUMENT_FIELDS.map((field) => [field, data[field]])
    ) as DriverDocuments;

    return {
        operatingCountry: data.operatingCountry,
        operatingCity: data.operatingCity,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        homeAddress: data.homeAddress.trim(),
        carType: data.carType.trim(),
        carColor: data.carColor.trim(),
        licensePlate: data.licensePlate.trim(),
        carYearModel: data.carYearModel.trim(),
        yearsOfExperience: Number(data.yearsOfExperience),
        shiftType: data.shiftType as DriverShiftType,
        availableFrom: data.availableFrom,
        availableTo: data.availableTo,
        ...(data.profilePhoto ? { profilePhoto: data.profilePhoto } : {}),
        documents,
    };
}

export default function PartnerFormSection() {
    const t = useTranslations("business");
    const { mutate: submitApplication, isPending } = useSubmitDriverApplication();

    const methods = useForm<PartnerFormValues>({
        defaultValues: {
            operatingCountry: "Belgium",
            operatingCity: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            homeAddress: "",
            carType: "",
            carColor: "",
            carYearModel: "",
            licensePlate: "",
            yearsOfExperience: "",
            shiftType: "",
            availableFrom: "",
            availableTo: "",
            profilePhoto: "",
            ...EMPTY_DOCUMENTS,
        },
    });

    const onSubmit = (data: PartnerFormValues) => {
        submitApplication(toSubmitPayload(data), {
            onSuccess: () => {
                methods.reset({
                    operatingCountry: "Belgium",
                    operatingCity: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    homeAddress: "",
                    carType: "",
                    carColor: "",
                    carYearModel: "",
                    licensePlate: "",
                    yearsOfExperience: "",
                    shiftType: "",
                    availableFrom: "",
                    availableTo: "",
                    profilePhoto: "",
                    ...EMPTY_DOCUMENTS,
                });
            },
        });
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
                                        br: () => <br />,
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
                                        desc: t("partner.form.benefits.onboarding.desc"),
                                    },
                                    {
                                        title: t("partner.form.benefits.payments.title"),
                                        desc: t("partner.form.benefits.payments.desc"),
                                    },
                                    {
                                        title: t("partner.form.benefits.fleet.title"),
                                        desc: t("partner.form.benefits.fleet.desc"),
                                    },
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        name="operatingCountry"
                                        type="select"
                                        label={t("partner.form.labels.country")}
                                        selectPlaceholder={t("partner.form.placeholders.country")}
                                        selectOptions={[{ label: "Belgium", value: "Belgium" }]}
                                        required
                                    />
                                    <Input
                                        name="operatingCity"
                                        type="select"
                                        label={t("partner.form.labels.city")}
                                        selectPlaceholder={t("partner.form.placeholders.city")}
                                        selectOptions={BELGIUM_CITIES.map((city) => ({
                                            label: city,
                                            value: city,
                                        }))}
                                        required
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
                                        name="yearsOfExperience"
                                        type="number"
                                        label={t("partner.form.labels.experience")}
                                        placeholder={t("partner.form.placeholders.experience")}
                                        min={0}
                                        max={80}
                                        required
                                    />
                                    <Input
                                        name="carYearModel"
                                        label={t("partner.form.labels.car_year_model")}
                                        placeholder={t("partner.form.placeholders.car_year_model")}
                                        required
                                    />
                                    <Input
                                        name="shiftType"
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
                                                name="availableFrom"
                                                type="time"
                                                label={t("partner.form.labels.timing_from")}
                                                placeholder={t("partner.form.placeholders.timing_from")}
                                                required
                                            />
                                            <Input
                                                name="availableTo"
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
                                        name="homeAddress"
                                        type="location"
                                        label={t("partner.form.labels.address")}
                                        placeholder={t("partner.form.placeholders.address")}
                                        required
                                    />
                                </div>

                                <div className="space-y-8">
                                    <div className="flex flex-col space-y-1">
                                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                                            {t("partner.form.labels.documents")}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {t("partner.form.labels.documents_desc")}
                                        </p>
                                    </div>

                                    <FileUpload
                                        name="profilePhoto"
                                        label={t("partner.form.labels.profile_photo")}
                                    />

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

                                    <div className="space-y-4 pt-4">
                                        <div className="flex flex-col space-y-1">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                                {t("partner.form.labels.vehicle_photos")}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {t("partner.form.labels.vehicle_photos_desc")}
                                            </p>
                                        </div>
                                        <FileUpload
                                            name="carCard"
                                            label={t("partner.form.labels.car_card")}
                                            required
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                            <FileUpload
                                                name="carFrontView"
                                                label={t("partner.form.labels.car_front")}
                                                required
                                            />
                                            <FileUpload
                                                name="carBackView"
                                                label={t("partner.form.labels.car_back")}
                                                required
                                            />
                                            <FileUpload
                                                name="carLeftView"
                                                label={t("partner.form.labels.car_left")}
                                                required
                                            />
                                            <FileUpload
                                                name="carRightView"
                                                label={t("partner.form.labels.car_right")}
                                                required
                                            />
                                            <FileUpload
                                                name="carInsideView"
                                                label={t("partner.form.labels.car_inside")}
                                                required
                                            />
                                            <FileUpload
                                                name="licensePlateView"
                                                label={t("partner.form.labels.car_plate")}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                            {t("partner.form.labels.business_insurance")}
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                            <FileUpload
                                                name="taxiInsurancePolicy"
                                                label={t("partner.form.labels.insurance")}
                                                required
                                            />
                                            <FileUpload
                                                name="kvkUittreksel"
                                                label={t("partner.form.labels.kvk")}
                                                required
                                            />
                                        </div>
                                        <FileUpload
                                            name="bankCardCopy"
                                            label={t("partner.form.labels.bankpas")}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full h-14 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black/90 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>{t("partner.form.button_submitting")}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{t("partner.form.button")}</span>
                                            <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </section>
    );
}
