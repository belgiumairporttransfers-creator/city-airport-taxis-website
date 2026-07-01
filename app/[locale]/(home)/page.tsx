import HeroSection from "@/components/features/home/hero-section";
import DestinationsSection from "@/components/features/home/destinations-section";
import CitiesSection from "@/components/features/home/cities-section";
import FleetSection from "@/components/features/home/fleet-section";
import WhyChooseUs from "@/components/features/home/why-choose-us";
import SafetyReliabilitySection from "@/components/features/home/safety-reliability-section";
import BookAirportTransferSection from "@/components/features/home/book-airport-transfer-section";
import CorporateTransportationSection from "@/components/features/home/corporate-transportation-section";
import Services from "@/components/features/services/services";
import FaqSection from "@/components/shared/faqs/faq-section";
import HowItWorks from "@/components/features/home/how-it-works";
import PartnersSection from "@/components/features/home/partners-section";
import Testimonials from "@/components/features/home/testimonial-section";


export default function Home() {
    return (
        <>
            <HeroSection />
            <Testimonials />
            <Services />
            <WhyChooseUs />
            <CorporateTransportationSection />
            <FleetSection />
            <DestinationsSection />
            <CitiesSection />
            <SafetyReliabilitySection />
            <FaqSection />
            <HowItWorks />
            <BookAirportTransferSection />
            <PartnersSection />
        </>
    );
}