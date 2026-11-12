import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FloatingInquiryButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/90 p-4 backdrop-blur-sm md:hidden">
      <Button
        asChild
        size="lg"
        className="w-full rounded-full bg-accent py-6 text-lg font-bold text-accent-foreground hover:bg-accent/90"
      >
        <Link href="#form-scrl">Enquire Now</Link>
      </Button>
    </div>
  );
}
