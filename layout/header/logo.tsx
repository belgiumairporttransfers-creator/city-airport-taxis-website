import { Link } from "@/i18n/routing";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "dark" | "white";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

const LOGO_SRC_BY_VARIANT: Record<LogoVariant, string> = {
  dark: "/assets/logo/logo-black.png",
  white: "/assets/logo/logo-white.png",
};

export function Logo({ variant = "white", className }: LogoProps) {
  return (
    <div className={cn("flex items-center justify-start", className)}>
      <Link
        href="/"
        className="relative h-14 w-40 cursor-pointer transition-all duration-300 md:h-18 md:w-40"
      >
        <Image
          src={LOGO_SRC_BY_VARIANT[variant]}
          alt="Airport Transfer"
          fill
          className="object-contain object-left"
          priority
        />
      </Link>
    </div>
  );
}

