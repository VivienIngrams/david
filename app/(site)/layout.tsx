import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <div className="flex min-h-screen flex-col">
      <Header artistName={settings?.name ?? undefined} />
      <main className="flex-1 pt-20">{children}</main>
      <Footer
        artistName={settings?.name ?? undefined}
        instagram={settings?.instagram ?? undefined}
      />
    </div>
  );
}
