import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | David Heidelberger",
  description: "Contactez David Heidelberger, artiste sculpteur.",
};

export default async function ContactPage() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <div>
      <section className="flex min-h-[60vh] flex-col justify-center px-6 pb-24 pt-12 md:px-12 md:pt-20 lg:px-20">
        <h1 className="mb-12 font-serif text-3xl tracking-wide text-foreground md:mb-16 md:text-5xl">
          Contact
        </h1>

        <div className="max-w-lg">
          <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg">
            Pour toute demande concernant les oeuvres, expositions ou
            collaborations, n{"'"}hesitez pas a prendre contact.
          </p>

          <div className="flex flex-col gap-8 border-t border-border pt-8">
            {settings?.contactEmail && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Email
                </p>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-lg text-foreground transition-colors hover:text-accent"
                >
                  {settings.contactEmail}
                </a>
              </div>
            )}

            {settings?.instagram && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Instagram
                </p>
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-foreground transition-colors hover:text-accent"
                >
                  Instagram
                </a>
              </div>
            )}

            {settings?.location && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Localisation
                </p>
                <p className="text-lg text-foreground">{settings.location}</p>
              </div>
            )}
          </div>

          {!settings?.contactEmail &&
            !settings?.instagram &&
            !settings?.location && (
              <p className="text-muted-foreground">
                Informations de contact non disponibles.
                <br />
                <span className="text-sm">
                  Configurez-les dans{" "}
                  <a
                    href="/studio"
                    className="underline transition-colors hover:text-foreground"
                  >
                    Sanity Studio
                  </a>
                  .
                </span>
              </p>
            )}
        </div>
      </section>
    </div>
  );
}
