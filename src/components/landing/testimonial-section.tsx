import { Quote } from 'lucide-react';
import content from '@/lib/content.json';

const { testimonials } = content;

export default function TestimonialSection() {
  const testimonial = testimonials[0]; // Assuming we only show the first one for now

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">What Parents Say</h2>
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <Quote className="h-16 w-16 text-accent absolute -top-8 -left-8 opacity-20" aria-hidden="true" />
          <blockquote className="text-xl md:text-2xl italic">
            "{testimonial.quote}"
          </blockquote>
          <footer className="mt-6 font-semibold text-lg">- {testimonial.author}</footer>
          <Quote className="h-16 w-16 text-accent absolute -bottom-8 -right-8 opacity-20 transform rotate-180" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
