import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function TrustBar() {
  const cbseLogo = PlaceHolderImages.find(p => p.id === 'cbse-logo');
  const dpsLogo = PlaceHolderImages.find(p => p.id === 'dps-society-logo');
 

  return (
    <section className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <span className="text-md font-semibold text-muted-foreground whitespace-nowrap">
            Affiliated & Recognized By:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {cbseLogo && <Image src={cbseLogo.imageUrl} alt={cbseLogo.description} width={120} height={40} data-ai-hint={cbseLogo.imageHint} className="opacity-70 transition-opacity hover:opacity-100" />}
            {dpsLogo && <Image src={dpsLogo.imageUrl} alt={dpsLogo.description} width={120} height={40} data-ai-hint={dpsLogo.imageHint} className="opacity-70 transition-opacity hover:opacity-100" />}
            
          </div>
        </div>
      </div>
    </section>
  );
}
