import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Header() {
  const logo = PlaceHolderImages.find(p => p.id === 'dps-anand-logo');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/100">
      <div className="container flex h-20 items-center">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl">
          {logo && (
            <div className="bg-white p-1 rounded-md">
              <Image
                src={logo.imageUrl}
                alt={logo.description}
                width={200}
                height={50}
                className="object-contain"
                data-ai-hint={logo.imageHint}
              />
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}

