import Link from "next/link";

export function Footer({
  artistName,
  instagram,
}: {
  artistName?: string;
  instagram?: string;
}) {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-12 lg:px-20">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          {artistName || "David Heidelberger"}
        </p>
        <div className="flex items-center gap-6">
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </a>
          )}
          <Link
            href="/contact"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
