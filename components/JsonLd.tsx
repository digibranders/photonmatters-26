/**
 * Renders a JSON-LD structured-data block. Server-safe; use inside any
 * Server Component to emit schema.org markup for search engines and AI crawlers.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
