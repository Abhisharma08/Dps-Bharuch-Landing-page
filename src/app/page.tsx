import dynamic from 'next/dynamic';
import {
  Header,
  HeroSection,
  TrustBar,
  WhyChooseUsSection,
  AdmissionProcessSection,
  LifeAtDPSBharuch,
  TestimonialSection,
  FinalCtaSection,
  Footer,
  FloatingInquiryButton,
} from '@/components/landing';

const FaqSection = dynamic(() => import('@/components/landing/faq-section'));

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <WhyChooseUsSection />
        <AdmissionProcessSection />
        <LifeAtDPSBharuch />
        <TestimonialSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <FloatingInquiryButton />
    </div>
  );
}
