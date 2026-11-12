import type {Metadata} from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import GtmScript from './GtmScript';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'DPS Bharuch Admissions',
  description: 'Shape Your Child\'s Future at DPS Bharuch. Admissions for 2027-28 are now open.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} font-body antialiased`}>
        <GtmScript />
        {children}
      </body>
    </html>
  );
}
