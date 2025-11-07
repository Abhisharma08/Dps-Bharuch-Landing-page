import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Header() {
  const logo = PlaceHolderImages.find(p => p.id === 'dps-bharuch-logo');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur-none supports-[backdrop-filter]:bg-background">
      <div className="container flex justify-center items-center h-28">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl">
          {logo && (
            <Image
              src={logo.imageUrl}
              alt={logo.description}
              width={250}          // size increased
              height={120}         // height increased
              className="object-contain rounded-md p-2 bg-transparent"
              data-ai-hint={logo.imageHint}
            />
          )}
        </Link>
      </div>
    </header>
  );
}
