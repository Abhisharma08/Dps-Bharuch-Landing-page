import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#ffffff]/100 backdrop-blur supports-[backdrop-filter]:bg-[#ffffff]/100">
      <div className="container flex h-20 items-center">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl">
          <div className="bg-white p-1 rounded-md">
            <Image
              src="https://res.cloudinary.com/dtc8bbbco/image/upload/v1761806169/DPS-Baruch-logo_y9ux94.png"
              alt="DPS Bharuch Logo"
              width={200}
              height={100}
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
