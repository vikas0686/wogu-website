import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

import { Section } from "@/components/section";
import { SeverityBadge } from "@/components/severity-badge";
import { RenderedMarkdown } from "@/components/rendered-markdown";
import { JsonLd } from "@/components/json-ld";
import {
  getAdjacentRules,
  getAllRules,
  getRuleById,
  getRuleSection,
} from "@/lib/rules";
import { renderMarkdown } from "@/lib/markdown";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getAllRules().map((rule) => ({ id: rule.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const rule = getRuleById(id);
  if (!rule) return {};

  const problem = getRuleSection(rule, "Problem") ?? "";
  const description = problem.replace(/\s+/g, " ").slice(0, 155).trim();

  return {
    title: `${rule.id} — ${rule.title}`,
    description,
    alternates: { canonical: `/rules/${rule.id}` },
    openGraph: {
      title: `${rule.id} — ${rule.title} · ${siteConfig.name}`,
      description,
      url: `/rules/${rule.id}`,
    },
  };
}

const SECTION_LABELS: Record<string, string> = {
  Problem: "Description",
  "Why this matters": "Why This Matters",
  "Bad Example": "Violation Example",
  "Good Example": "Compliant Example",
  "Recommended Fix": "Recommended Fix",
  References: "References",
  "False Positives": "False Positives",
};

const SECTION_ORDER = [
  "Problem",
  "Why this matters",
  "Bad Example",
  "Good Example",
  "Recommended Fix",
  "References",
  "False Positives",
];

export default async function RulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rule = getRuleById(id);
  if (!rule) notFound();

  const { previous, next } = getAdjacentRules(rule.id);

  const orderedSections = SECTION_ORDER.map((heading) => ({
    heading,
    body: getRuleSection(rule, heading),
  })).filter((section): section is { heading: string; body: string } => Boolean(section.body));

  const renderedSections = await Promise.all(
    orderedSections.map(async (section) => ({
      heading: section.heading,
      html: await renderMarkdown(section.body),
    })),
  );

  const problemSummary = (getRuleSection(rule, "Problem") ?? "")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <Section className="pt-10 sm:pt-14" containerClassName="max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: `${rule.id} — ${rule.title}`,
          description: problemSummary,
          identifier: rule.id,
          url: `${siteConfig.url}/rules/${rule.id}`,
          about: rule.category,
          proficiencyLevel: "Expert",
          author: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href="/rules" className="hover:text-foreground">
          Rules
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{rule.id}</span>
      </nav>

      <header className="mt-6 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm font-semibold text-brand">{rule.id}</span>
          <SeverityBadge severity={rule.severity} />
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {rule.category}
          </span>
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {rule.title}
        </h1>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs text-muted-foreground">Engine</dt>
            <dd className="mt-0.5 font-medium text-foreground">{rule.engine}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Since</dt>
            <dd className="mt-0.5 font-medium text-foreground">{rule.since}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Auto Fix</dt>
            <dd className="mt-0.5 font-medium text-foreground">{rule.autoFix}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Category Range</dt>
            <dd className="mt-0.5 font-mono font-medium text-foreground">
              {rule.categoryRange}
            </dd>
          </div>
        </dl>
      </header>

      <div className="mt-2">
        {renderedSections.map((section) => (
          <div key={section.heading} id={sectionId(section.heading)} className="scroll-mt-20">
            <h2 className="mt-10 text-lg font-semibold tracking-tight text-foreground first:mt-8">
              {SECTION_LABELS[section.heading] ?? section.heading}
            </h2>
            <RenderedMarkdown html={section.html} className="mt-3 [&>h2]:hidden" />
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-brand/30 bg-brand-muted p-4 text-sm">
        <p className="text-foreground">
          Found an issue with this rule&apos;s detection?{" "}
          <a
            href={siteConfig.githubIssues}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand underline underline-offset-4"
          >
            Open an issue
          </a>{" "}
          with a minimal reproduction.
        </p>
      </div>

      <nav className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/rules/${previous.id}`}
            className="group flex flex-col rounded-lg border border-border p-4 transition-colors hover:border-brand/40"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5" />
              Previous
            </span>
            <span className="mt-1.5 text-sm font-medium text-foreground">
              {previous.id} — {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/rules/${next.id}`}
            className="group flex flex-col rounded-lg border border-border p-4 text-right transition-colors hover:border-brand/40 sm:col-start-2"
          >
            <span className="inline-flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              Next
              <ArrowRight className="size-3.5" />
            </span>
            <span className="mt-1.5 text-sm font-medium text-foreground">
              {next.id} — {next.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Section>
  );
}

function sectionId(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
