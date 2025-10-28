"use client";

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const IMAGES_PER_PAGE = 6;

export default function GallerySection() {
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));
  const [visibleImages, setVisibleImages] = useState(IMAGES_PER_PAGE);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleImages(prev => prev + IMAGES_PER_PAGE);
      setLoading(false);
    }, 500); // Simulate network delay
  };

  const imagesToShow = galleryImages.slice(0, visibleImages);

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Life at DPS Bharuch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
           Step inside our vibrant campus — where curiosity, creativity, and collaboration come alive.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imagesToShow.map((image, index) => (
            <div key={image.id} className="relative aspect-video overflow-hidden rounded-lg shadow-lg group">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white text-sm font-semibold">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        {visibleImages < galleryImages.length && (
          <div className="text-center mt-12">
            <Button onClick={handleLoadMore} size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
