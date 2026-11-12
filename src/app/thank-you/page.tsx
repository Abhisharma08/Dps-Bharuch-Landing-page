import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
      <Script
        id="conversion-event"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `gtag('event', 'conversion', {'send_to': 'AW-16677728495/ISdQCPr5ncwZEO_hx5A-'});`,
        }}
      />
      <div className="max-w-2xl">
        <CheckCircle2 className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Thank You!</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          We have received your inquiry. Our admissions team will contact you shortly.
        </p>
        <Button asChild size="lg">
          <Link href="/">Go Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
