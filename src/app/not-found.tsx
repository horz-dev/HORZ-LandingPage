import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Container, Eyebrow, CTA } from "@/components/ui";

/**
 * 404 — the survey-station "off the grid" reading (content/02 §4). Next returns a
 * 404 status here, so it is never indexed; copy is verbatim from the content
 * system. Left-aligned on the content column (the house rule: never centre body
 * prose). `data-nav-flare="off"` hands the one flare fill to "Return home.".
 */
export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main
        id="main-content"
        tabIndex={-1}
        data-nav-flare="off"
        className="flex-1"
      >
        <Container width="content">
          <div className="flex min-h-[68vh] flex-col justify-center py-32">
            <Eyebrow className="mb-6">404 · Off the grid</Eyebrow>
            <h1 className="display-l max-w-[16ch] text-balance">
              No station at these coordinates.
            </h1>
            <p className="lead mt-6 max-w-[44ch] text-ink-muted">
              Nothing surveyed at this path.
            </p>
            <div className="mt-10">
              <CTA href="/" variant="primary">
                Return home.
              </CTA>
            </div>
            <p className="caption mt-16 font-mono text-ink-faint">
              404 · NO SECTION DRAWN · OFF GRID
            </p>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
