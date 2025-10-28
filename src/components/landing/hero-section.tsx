import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { InquiryForm } from '@/components/landing/inquiry-form';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section id="inquiry-form" className="relative w-full flex items-center justify-center text-white py-24 md:py-16">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline tracking-tight">
              Build Your Child’s Tomorrow at DPS Bharuch
            </h1>
            <p className="text-lg md:text-xl text-slate-200">
         At DPS Bharuch, education goes beyond books — we help students grow into confident, capable, and compassionate global citizens. Admissions for the 2026–27 academic year are now open.

            </p>
            <ul className="space-y-3 text-left self-center md:self-start text-lg">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <span className="font-semibold">Progressive CBSE Curriculum
 </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <span className="font-semibold">Balanced Learning Approach
 </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <span className="font-semibold"> Skilled & Caring Mentors</span>
              </li>
            </ul>
          </div>
          <div className="w-full max-w-md mx-auto">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
