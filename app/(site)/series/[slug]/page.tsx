import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { SERIES_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await client.fetch(SERIES_BY_SLUG_QUERY, { slug });
  if (!series) return {};
  return {
    title: `${series.title} | David Heidelberger`,
    description: `Series: ${series.title}`,
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = await client.fetch(SERIES_BY_SLUG_QUERY, { slug });

  if (!series) notFound();

  return (
    <div>
      {/* Series header */}
      <section className="px-6 pb-12 pt-12 md:px-12 md:pb-16 md:pt-20 lg:px-20">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
          Toutes les series
        </Link>

        <h1 className="font-serif text-3xl tracking-wide text-foreground md:text-5xl">
          {series.title}
        </h1>

        {series.description && (
          <div className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            <PortableText value={series.description} />
          </div>
        )}
      </section>

      {/* Sculptures grid */}
      <section className="px-6 pb-24 md:px-12 lg:px-20">
        {series.sculptures && series.sculptures.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
            {series.sculptures.map(
              (sculpture: {
                _id: string;
                title: string;
                slug: { current: string };
                images: Array<{ asset: { _ref: string } }>;
                year?: number;
                materials?: string;
              }) => (
                <Link
                  key={sculpture._id}
                  href={`/sculpture/${sculpture.slug.current}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    {sculpture.images?.[0] && (
                      <Image
                        src={urlFor(sculpture.images[0])
                          .width(800)
                          .height(1000)
                          .url()}
                        alt={sculpture.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-serif text-lg tracking-wide text-foreground">
                      {sculpture.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                      {sculpture.year && <span>{sculpture.year}</span>}
                      {sculpture.materials && (
                        <>
                          {sculpture.year && (
                            <span className="text-border">|</span>
                          )}
                          <span>{sculpture.materials}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        ) : (
          <p className="py-20 text-center text-muted-foreground">
            Aucune sculpture dans cette serie.
          </p>
        )}
      </section>
    </div>
  );
}
