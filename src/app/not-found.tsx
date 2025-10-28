import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
      <div className="max-w-2xl">
        <SearchX className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">404 - Page Not Found</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Button asChild size="lg">
          <Link href="/">Go Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
