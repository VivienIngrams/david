import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanityImageType {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
}

interface SanityImageProps {
  image: SanityImageType | SanityImageSource;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  quality?: number;
}

function getHotspotPosition(image: SanityImageType | SanityImageSource): string | undefined {
  if (
    typeof image === "object" &&
    image !== null &&
    "hotspot" in image &&
    image.hotspot
  ) {
    const hotspot = image.hotspot as { x: number; y: number };
    return `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`;
  }
  return undefined;
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  className,
  quality = 85,
}: SanityImageProps) {
  if (!image) return null;

  const builder = urlFor(image as SanityImageSource).quality(quality);

  if (width) builder.width(width);
  if (height) builder.height(height);

  // Apply crop and hotspot via the builder if present
  if (typeof image === "object" && image !== null && "crop" in image && image.crop) {
    builder.crop("focalpoint");
  }
  if (typeof image === "object" && image !== null && "hotspot" in image && image.hotspot) {
    builder.fit("crop").crop("focalpoint");
    const hs = image.hotspot as { x: number; y: number };
    builder.focalPoint(hs.x, hs.y);
  }

  const url = builder.auto("format").url();
  const objectPosition = getHotspotPosition(image);

  if (fill) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        style={objectPosition ? { objectPosition } : undefined}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width || 800}
      height={height || 600}
      sizes={sizes}
      priority={priority}
      className={className}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}
