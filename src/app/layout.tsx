import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import GtmScript from './GtmScript';

export const metadata: Metadata = {
  title: 'DPS Bharuch Admissions',
  description: 'Shape Your Child\'s Future at DPS Bharuch. Admissions for 2026-27 are now open.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <GtmScript />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
