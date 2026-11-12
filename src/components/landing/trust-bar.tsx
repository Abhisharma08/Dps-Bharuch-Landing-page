import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getCloudinaryImageUrl } from '@/lib/cloudinary';

export default function TrustBar() {
  const cbseLogo = PlaceHolderImages.find(p => p.id === 'cbse-logo');
  const dpsLogo = PlaceHolderImages.find(p => p.id === 'dps-society-logo');
 

  return (
    <section className="bg-muted py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <span className="text-md font-semibold text-muted-foreground whitespace-nowrap">
            Affiliated & Recognized By:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {cbseLogo && (
              <Image
                src={getCloudinaryImageUrl(cbseLogo.imageUrl, { width: 160, crop: 'fit' })}
                alt={cbseLogo.description}
                width={120}
                height={40}
                sizes="120px"
                data-ai-hint={cbseLogo.imageHint}
                className="opacity-70 transition-opacity hover:opacity-100"
              />
            )}
            {dpsLogo && (
              <Image
                src={getCloudinaryImageUrl(dpsLogo.imageUrl, { width: 160, crop: 'fit' })}
                alt={dpsLogo.description}
                width={120}
                height={40}
                sizes="120px"
                data-ai-hint={dpsLogo.imageHint}
                className="opacity-70 transition-opacity hover:opacity-100"
              />
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
}
