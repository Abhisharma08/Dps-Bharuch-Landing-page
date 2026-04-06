import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur-none supports-[backdrop-filter]:bg-background">
      <div className="container flex h-24 items-center justify-center md:h-32">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl">
          <Image
            src="https://resources.edunexttechnologies.com/web-data/dpsbharuch/img/header-logo-bhruch.png"
            alt="DPS Bharuch School Logo"
            width={320}
            height={144}
            sizes="(max-width: 768px) 220px, 320px"
            className="object-contain rounded-md bg-transparent"
          />
        </Link>
      </div>
    </header>
  );
}
