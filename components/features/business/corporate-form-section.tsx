"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/features/form/Input";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
// import { useAuthSignup } from "@/hooks/queries/use-auth";
import { useTranslations } from "next-intl";

interface CorporateFormValues {
    agencyName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export default function CorporateFormSection() {
    const t = useTranslations("business");
    // const authSignup = useAuthSignup();
    const authSignup = { isPending: false, mutate: () => {} };
    const methods = useForm<CorporateFormValues>({
        defaultValues: {
            agencyName: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = (data: CorporateFormValues) => {
        console.log(data);
    };

    return (
        <section id="corporate-form" className="py-12 lg:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

                    <div className="lg:col-span-5 hidden lg:block sticky top-32 h-fit">
                        <div className="flex flex-col space-y-8">
                            <div className="mb-8">
                                <span className="text-secondary font-bold text-base tracking-widest uppercase">
                                    {t("corporate.form.top_text")}
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    {t.rich("corporate.form.title", {
                                        br: () => <br />
                                    })}
                                </h2>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-lg">
                                    {t("corporate.form.description")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 lg:p-10 lg:bg-gray-50 lg:border lg:border-border lg:rounded-2xl shadow-none">
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Input
                                            name="agencyName"
                                            label={t("corporate.form.labels.agency_name")}
                                            placeholder={t("corporate.form.placeholders.agency_name")}
                                            required
                                        />
                                    </div>
                                    <Input
                                        name="firstName"
                                        label={t("corporate.form.labels.firstname")}
                                        placeholder={t("corporate.form.placeholders.firstname")}
                                        required
                                    />
                                    <Input
                                        name="lastName"
                                        label={t("corporate.form.labels.lastname")}
                                        placeholder={t("corporate.form.placeholders.lastname")}
                                        required
                                    />
                                    <Input
                                        name="email"
                                        type="email"
                                        label={t("corporate.form.labels.email")}
                                        placeholder={t("corporate.form.placeholders.email")}
                                        required
                                    />
                                    <Input
                                        name="phone"
                                        type="phone"
                                        label={t("corporate.form.labels.phone")}
                                        placeholder={t("corporate.form.placeholders.phone")}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={authSignup.isPending}
                                    loading={authSignup.isPending}
                                    className="w-full h-14 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black/90 transition-all group"
                                >
                                    <span>{t("corporate.form.button")}</span>
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
