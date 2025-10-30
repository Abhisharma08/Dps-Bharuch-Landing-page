"use client";

import { Button } from '@/components/ui/button';

export default function FinalCtaSection() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
          Take the First Step Toward Your Child’s Bright Future
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-slate-200 mb-8">
          Complete the form at the top of this page to begin your admission journey with DPS Bharuch.
        </p>
        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-full"
          onClick={scrollToTop}
        >
          Enquire Now
        </Button>
      </div>
    </section>
  );
}
