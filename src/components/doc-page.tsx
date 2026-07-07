import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { RenderedMarkdown } from "@/components/rendered-markdown";
import { Timeline } from "@/components/timeline";
import { renderMarkdown } from "@/lib/markdown";
import { extractHeadings } from "@/lib/utils";
import { roadmapItems } from "@/lib/roadmap";
import type { Doc, DocMeta } from "@/lib/docs";

function hrefFor(slug: string): string {
  return slug === "installation" ? "/docs" : `/docs/${slug}`;
}

export async function DocPage({
  doc,
  previous,
  next,
}: {
  doc: Doc;
  previous: DocMeta | null;
  next: DocMeta | null;
}) {
  const html = await renderMarkdown(doc.content);
  const headings = extractHeadings(doc.content);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_180px] lg:gap-12">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {doc.title}
        </h1>
        <p className="mt-2 text-muted-foreground">{doc.description}</p>

        <RenderedMarkdown html={html} className="mt-8" />

        {doc.slug === "roadmap" && (
          <div className="mt-10">
            <h2 id="by-platform-and-feature" className="scroll-mt-20 text-lg font-semibold tracking-tight text-foreground">
              By platform and feature
            </h2>
            <div className="mt-6">
              <Timeline items={roadmapItems} />
            </div>
          </div>
        )}

        <nav className="mt-16 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {previous ? (
            <Link
              href={hrefFor(previous.slug)}
              className="group flex flex-col rounded-lg border border-border p-4 transition-colors hover:border-brand/40"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5" />
                Previous
              </span>
              <span className="mt-1.5 text-sm font-medium text-foreground">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={hrefFor(next.slug)}
              className="group flex flex-col rounded-lg border border-border p-4 text-right transition-colors hover:border-brand/40 sm:col-start-2"
            >
              <span className="inline-flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                Next
                <ArrowRight className="size-3.5" />
              </span>
              <span className="mt-1.5 text-sm font-medium text-foreground">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>

      {headings.length > 0 && (
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              On this page
            </p>
            <ul className="mt-3 space-y-2.5 border-l border-border pl-4 text-sm">
              {headings.map((heading) => (
                <li key={heading.slug}>
                  <a
                    href={`#${heading.slug}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
              {doc.slug === "roadmap" && (
                <li>
                  <a
                    href="#by-platform-and-feature"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    By platform and feature
                  </a>
                </li>
              )}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}
