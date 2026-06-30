"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FleetFeaturesAccordionProps {
  fleetName: string;
}

export function FleetFeaturesAccordion({
  fleetName,
}: FleetFeaturesAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={`features-${fleetName}`} className="border-0 pt-1">
        <AccordionTrigger className="text-sm cursor-pointer font-medium text-foreground hover:no-underline [&>svg]:text-gray-900 [&>svg]:font-bold [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
          <span>Included Features</span>
        </AccordionTrigger>
        <AccordionContent className="pt-2 pb-3">
          <div className="space-y-2 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0"></div>
              <span>Free 30 minutes of wait time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0"></div>
              <span>Complimentary bottle of water</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0"></div>
              <span>Complimentary in-vehicle WiFi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0"></div>
              <span>Tissues and sanitizer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0"></div>
              <span>Android and iPhone chargers</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

