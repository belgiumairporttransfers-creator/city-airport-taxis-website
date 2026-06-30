"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/features/form/Input";
import { Button } from "@/components/ui/button";
import { useSubscribeNewsletter } from "@/hooks/queries/use-newsletter";

type NewsletterFormValues = {
  email: string;
};

export default function ComingSoonNewsletterForm() {
  const t = useTranslations("common.coming_soon");
  const { mutate, isPending } = useSubscribeNewsletter();

  const methods = useForm<NewsletterFormValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = (data: NewsletterFormValues) => {
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="relative mt-8 lg:mt-10">
          <Input
            name="email"
            type="email"
            placeholder={t("email_placeholder")}
            required
            disabled={isPending}
            className="w-full"
            inputClassName="h-12 pr-32 placeholder:text-base lg:h-14 lg:pr-36 !bg-background"
          />
          <Button
            type="submit"
            loading={isPending}
            loadingText={t("submitting")}
            className="absolute top-1/2 h-9 -translate-y-1/2 ltr:right-2 rtl:left-2 lg:h-11"
          >
            {t("notify_button")}
          </Button>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{t("spam_disclaimer")}</p>
      </form>
    </FormProvider>
  );
}
