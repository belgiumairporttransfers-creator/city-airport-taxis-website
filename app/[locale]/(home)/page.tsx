import HeroSection from "@/components/features/home/hero-section";
import DestinationsSection from "@/components/features/home/destinations-section";
import FleetSection from "@/components/features/home/fleet-section";
import WhyChooseUs from "@/components/features/home/why-choose-us";
import SafetyReliabilitySection from "@/components/features/home/safety-reliability-section";
import BookAirportTransferSection from "@/components/features/home/book-airport-transfer-section";
import CorporateTransportationSection from "@/components/features/home/corporate-transportation-section";
import ServicesSection from "@/components/features/home/services-section";
import FaqSection from "@/components/shared/faqs/faq-section";
import Testimonials from "@/components/features/home/testimonial-section";


export default function Home() {
    return (
        <>
            <HeroSection />
            <Testimonials />
            <WhyChooseUs />
            <CorporateTransportationSection />
            <FleetSection />
            <ServicesSection />
            <DestinationsSection />
            <SafetyReliabilitySection />
            <FaqSection />
            <BookAirportTransferSection />
        </>
    );
}