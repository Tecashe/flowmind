import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { ProcessVisualization } from '@/components/landing/process-visualization';
import { ROICalculator } from '@/components/landing/roi-calculator';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { CTASection } from '@/components/landing/cta-section';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header />
      <main>
        <HeroSection />
        <ProcessVisualization />
        <FeaturesSection />
        <ROICalculator />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}