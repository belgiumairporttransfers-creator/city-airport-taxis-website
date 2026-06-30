import React from "react";
import {
  VisaIcon,
  MastercardIcon,
  AmexIcon,
  JcbIcon,
  PaypalIcon,
  ApplePayIcon,
  GooglePayIcon,
  IdealIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PaymentMethodsProps {
  className?: string;
  image?: string;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ className, image }) => {
  const icons = [
    { Icon: VisaIcon, name: "Visa" },
    { Icon: MastercardIcon, name: "Mastercard" },
    { Icon: AmexIcon, name: "American Express" },
    { Icon: JcbIcon, name: "JCB" },
    { Icon: PaypalIcon, name: "PayPal" },
    { Icon: ApplePayIcon, name: "Apple Pay" },
    { Icon: GooglePayIcon, name: "Google Pay" },
    { Icon: IdealIcon, name: "iDEAL" },
  ];

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4 sm:gap-6", className)}>
      {image ? (
        <div className="relative h-10 w-full opacity-80 hover:opacity-100 transition-opacity duration-300">
          <Image src={image} alt="Payment Methods" fill className="object-contain" />
        </div>
      ) : (
        icons.map((item, index) => (
          <div
            key={index}
            className="h-4 sm:h-5 w-auto flex items-center justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            title={item.name}
          >
            <item.Icon className="h-full w-auto" />
          </div>
        ))
      )}
    </div>
  );
};

export default PaymentMethods;
