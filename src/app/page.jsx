import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import AvailabilitySection from "@/components/AvailabalitySection";
import BrandsSection from "@/components/BrandsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import VideoCarousel from "@/components/VideoCarousel";

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Navbar />
      <Hero />
      <ProjectsSection />
      <VideoCarousel />
      <ServicesSection />
      <ProcessSection />
      <AvailabilitySection />
      <BrandsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;