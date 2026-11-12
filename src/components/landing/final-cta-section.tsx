import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FinalCtaSection() {
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="container mx-auto text-center">
        <h2 className="mb-4 font-headline text-3xl font-bold md:text-4xl">
          Take the First Step Toward Your Child&apos;s Bright Future
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-200">
          Complete the form at the top of this page to begin your admission journey with DPS
          Bharuch.
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-full bg-accent px-8 py-6 text-lg font-bold text-accent-foreground hover:bg-accent/90"
        >
          <Link href="#form-scrl">Enquire Now</Link>
        </Button>
      </div>
    </section>
  );
}
