import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InnovationSection from "@/components/InnovationSection";
import FleetSection from "@/components/FleetSection";
import BookingSection from "@/components/BookingSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <InnovationSection />
      <FleetSection />
      <BookingSection />
      <FooterSection />
    </div>
  );
};

export default Index;
