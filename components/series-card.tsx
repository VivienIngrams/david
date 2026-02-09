import Link from "next/link";
import { SanityImage, type SanityImageType } from "@/components/sanity-image";

interface SeriesCardProps {
  title: string;
  slug: { current: string };
  coverImage: SanityImageType;
  sculptureCount: number;
}

export function SeriesCard({
  title,
  slug,
  coverImage,
  sculptureCount,
}: SeriesCardProps) {
  return (
    <Link
      href={`/series/${slug.current}`}
      className="group block"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-muted">
        {coverImage && (
          <SanityImage
            image={coverImage}
            alt={title}
            width={800}
            height={1000}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="mt-4">
        <h2 className="font-serif text-lg tracking-wide text-foreground md:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {sculptureCount} {sculptureCount === 1 ? "sculpture" : "sculptures"}
        </p>
      </div>
    </Link>
  );
}
