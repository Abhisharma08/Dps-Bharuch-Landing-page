import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { getCloudinaryImageUrl } from '@/lib/cloudinary';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const IMAGES_PER_PAGE = 6;

function GalleryGrid({ ids }: { ids: typeof PlaceHolderImages }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {ids.map((image) => (
        <div key={image.id} className="group relative aspect-video overflow-hidden rounded-lg shadow-lg">
          <Image
            src={getCloudinaryImageUrl(image.imageUrl, { width: 900, height: 675 })}
            alt={image.description}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={image.imageHint}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-sm font-semibold text-white">{image.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GallerySection() {
  const galleryImages = PlaceHolderImages.filter((image) => image.id.startsWith('gallery-'));
  const initialImages = galleryImages.slice(0, IMAGES_PER_PAGE);
  const remainingImages = galleryImages.slice(IMAGES_PER_PAGE);

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Life at DPS Bharuch</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Step inside our vibrant campus where curiosity, creativity, and collaboration come
            alive.
          </p>
        </div>

        <GalleryGrid ids={initialImages} />

        {remainingImages.length > 0 && (
          <details className="group mt-4">
            <summary
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mx-auto mt-12 flex w-fit cursor-pointer list-none rounded-md'
              )}
            >
              <span className="group-open:hidden">Load More</span>
              <span className="hidden group-open:inline">Show Less</span>
            </summary>

            <div className="mt-4">
              <GalleryGrid ids={remainingImages} />
            </div>
          </details>
        )}
      </div>
    </section>
  );
}
