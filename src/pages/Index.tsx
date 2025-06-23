
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import PortfolioSection from '@/components/PortfolioSection';
import CostCalculator from '@/components/CostCalculator';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgress from '@/components/ScrollProgress';
import PerformanceIndicators from '@/components/PerformanceIndicators';
import ChatWidget from '@/components/ChatWidget';
import TrustNotification from '@/components/TrustNotification';
import AppointmentCalendar from '@/components/AppointmentCalendar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ScrollProgress />
      <Header />
      <section id="hero">
        <HeroSection />
      </section>
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <PerformanceIndicators />
      <PortfolioSection />
      <CostCalculator />
      <PricingSection />
      <TestimonialsSection />
      <AppointmentCalendar />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
      <ChatWidget />
      <TrustNotification />
    </div>
  );
};

export default Index;
