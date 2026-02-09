import { client } from "@/sanity/lib/client";
import {
  SITE_SETTINGS_QUERY,
  ALL_SERIES_QUERY,
} from "@/sanity/lib/queries";
import { SeriesCard } from "@/components/series-card";
import Link from "next/link";

export default async function HomePage() {
  const [settings, allSeries] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(ALL_SERIES_QUERY),
  ]);

  return (
    <div>
      {/* Hero section */}
      <section className="px-6 pb-16 pt-12 md:px-12 md:pb-24 md:pt-20 lg:px-20">
        <h1 className="max-w-3xl font-serif text-3xl leading-snug tracking-wide text-foreground md:text-5xl md:leading-snug">
          {settings?.name || "David Heidelberger"}
        </h1>
        {settings?.statement && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {settings.statement}
          </p>
        )}
      </section>

      {/* Series grid */}
      <section className="px-6 pb-24 md:px-12 lg:px-20">
        <div className="mb-10 flex items-baseline justify-between border-b border-border pb-4">
          <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Series
          </h2>
        </div>

        {allSeries && allSeries.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
            {allSeries.map((s: Record<string, unknown>) => (
              <SeriesCard
                key={s._id as string}
                title={s.title as string}
                slug={s.slug as { current: string }}
                coverImage={s.coverImage}
                sculptureCount={s.sculptureCount as number}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-center text-muted-foreground">
              Aucune serie pour le moment.
              <br />
              <span className="text-sm">
                Ajoutez du contenu dans{" "}
                <Link
                  href="/studio"
                  className="underline transition-colors hover:text-foreground"
                >
                  Sanity Studio
                </Link>
                .
              </span>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
