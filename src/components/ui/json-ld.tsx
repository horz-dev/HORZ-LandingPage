/**
 * Renders one or more JSON-LD blocks as <script type="application/ld+json">.
 *
 * `<` is escaped to < so a string in the data can never break out of the
 * </script> tag (the standard, XSS-safe way to inline JSON-LD). Server-rendered;
 * no client JS — the markup is in the static HTML for crawlers on first byte.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
