import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import { SanityImageType } from "@/components/sanity-image";

interface SelectionCardProps {
  title: string;
  slug: { current: string };
 coverImage: SanityImageType;

}

export function SelectionCard({ title, slug, coverImage }: SelectionCardProps) {
  if (!slug?.current) return null;

  return (
    <Link
      href={`/works/${slug.current}`}
      className="group block space-y-3"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-muted">
        <SanityImage
           image={coverImage}
            alt={title}
            width={800}
            height={1000}
            fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="text-sm">
        <p className="font-medium">{title}</p>
        
      </div>
    </Link>
  );
}
