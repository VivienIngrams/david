"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  url: string;
  alt: string;
}

export function SculptureGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center bg-muted">
        <p className="text-muted-foreground">Aucune image</p>
      </div>
    );
  }

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden transition-opacity ${
                idx === activeIndex
                  ? "opacity-100 ring-1 ring-foreground"
                  : "opacity-60 hover:opacity-80"
              }`}
              aria-label={`${title} - Image ${idx + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
