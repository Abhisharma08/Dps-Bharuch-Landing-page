import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { InquiryForm } from '@/components/landing/inquiry-form';
import { getCloudinaryImageUrl } from '@/lib/cloudinary';

export default function HeroSection() {
  return (
    <section
      id="inquiry-form"
      className="relative flex w-full items-center justify-center py-16 text-white md:py-16"
    >
      <Image
        src={getCloudinaryImageUrl(
          'https://res.cloudinary.com/ddqqlfsjp/image/upload/v1770729228/WhatsApp_Image_2026-02-10_at_6.34.38_PM_ztdpqh.jpg',
          { width: 1400, height: 1600 }
        )}
        alt="DPS Bharuch School Building"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="container relative mx-auto">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Build Your Child&apos;s Tomorrow at DPS Bharuch
            </h1>
            <p className="text-lg text-slate-200 md:text-xl">
              At DPS Bharuch, education goes beyond books. We help students grow into confident,
              capable, and compassionate global citizens. Admissions for the 2027-28 academic year
              are now open.
            </p>
            <ul className="space-y-3 self-center text-left text-lg md:self-start">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <span className="font-semibold">Progressive CBSE Curriculum</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <span className="font-semibold">Balanced Learning Approach</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <span className="font-semibold">Skilled and Caring Mentors</span>
              </li>
            </ul>
          </div>

          <div className="mx-auto w-full max-w-md">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
