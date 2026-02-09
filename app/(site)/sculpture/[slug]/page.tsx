import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { SCULPTURE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { SculptureGallery } from "@/components/sculpture-gallery";
import { type SanityImageType } from "@/components/sanity-image";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sculpture = await client.fetch(SCULPTURE_BY_SLUG_QUERY, { slug });
  if (!sculpture) return {};
  return {
    title: `${sculpture.title} | David Heidelberger`,
    description: `${sculpture.title}${sculpture.materials ? ` - ${sculpture.materials}` : ""}${sculpture.year ? `, ${sculpture.year}` : ""}`,
  };
}

export default async function SculpturePage({ params }: Props) {
  const { slug } = await params;
  const sculpture = await client.fetch(SCULPTURE_BY_SLUG_QUERY, { slug });

  if (!sculpture) notFound();

  const images = (sculpture.images || []).map(
    (img: SanityImageType, index: number) => ({
      image: img,
      alt: `${sculpture.title} - Image ${index + 1}`,
    })
  );

  return (
    <div>
      <section className="px-6 pt-12 md:px-12 md:pt-20 lg:px-20">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Oeuvres
          </Link>
          <span>/</span>
          {sculpture.series && (
            <>
              <Link
                href={`/series/${sculpture.series.slug.current}`}
                className="transition-colors hover:text-foreground"
              >
                {sculpture.series.title}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">{sculpture.title}</span>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 lg:px-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Image gallery */}
          <div className="lg:w-3/5">
            <SculptureGallery images={images} title={sculpture.title} />
          </div>

          {/* Details sidebar */}
          <div className="lg:w-2/5 lg:pt-2">
            <h1 className="font-serif text-3xl tracking-wide text-foreground md:text-4xl">
              {sculpture.title}
            </h1>

            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
              {sculpture.year && (
                <div className="flex justify-between">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground">
                    Annee
                  </span>
                  <span className="text-sm text-foreground">
                    {sculpture.year}
                  </span>
                </div>
              )}
              {sculpture.materials && (
                <div className="flex justify-between">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground">
                    Materiaux
                  </span>
                  <span className="text-sm text-foreground">
                    {sculpture.materials}
                  </span>
                </div>
              )}
              {sculpture.dimensions && (
                <div className="flex justify-between">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground">
                    Dimensions
                  </span>
                  <span className="text-sm text-foreground">
                    {sculpture.dimensions}
                  </span>
                </div>
              )}
            </div>

            {sculpture.description && (
              <div className="mt-8 border-t border-border pt-6 text-base leading-relaxed text-muted-foreground">
                <PortableText value={sculpture.description} />
              </div>
            )}

            {sculpture.series && (
              <div className="mt-10">
                <Link
                  href={`/series/${sculpture.series.slug.current}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="rotate-180"
                  >
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Retour a {sculpture.series.title}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
