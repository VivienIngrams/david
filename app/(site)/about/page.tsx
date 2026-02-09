import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { SanityImage, type SanityImageType } from "@/components/sanity-image";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A propos | David Heidelberger",
  description: "Biographie de David Heidelberger, artiste sculpteur.",
};

export default async function AboutPage() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <div>
      <section className="px-6 pb-24 pt-12 md:px-12 md:pt-20 lg:px-20">
        <h1 className="mb-12 font-serif text-3xl tracking-wide text-foreground md:mb-16 md:text-5xl">
          A propos
        </h1>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Portrait */}
          {settings?.portraitImage && (
            <div className="lg:w-2/5">
              <div className="relative aspect-3/4 overflow-hidden bg-muted">
                <SanityImage
                  image={settings.portraitImage}
                  alt={settings?.name || "Portrait de l'artiste"}
                  width={800}
                  height={1067}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>
          )}

          {/* Bio */}
          <div className="lg:w-3/5">
            {settings?.statement && (
              <p className="mb-8 font-serif text-xl leading-relaxed text-foreground md:text-2xl">
                {settings.statement}
              </p>
            )}

            {settings?.bio && (
              <div className="prose-muted max-w-none text-base leading-relaxed text-muted-foreground md:text-lg [&>p]:mb-4">
                <PortableText value={settings.bio} />
              </div>
            )}

            {settings?.location && (
              <p className="mt-10 text-sm uppercase tracking-widest text-muted-foreground">
                {settings.location}
              </p>
            )}
          </div>
        </div>

        {/* Atelier images */}
        {settings?.atelierImages && settings.atelierImages.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Atelier
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {settings.atelierImages.map(
                (img: SanityImageType, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-4/3 overflow-hidden bg-muted"
                  >
                    <SanityImage
                      image={img}
                      alt={`Atelier - ${idx + 1}`}
                      width={800}
                      height={600}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
