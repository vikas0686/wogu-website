import type { Metadata } from "next";
import Link from "next/link";

import { Section, SectionHeading } from "@/components/section";
import { getAllPosts, formatPostDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on workflow correctness, determinism, and how WoGu is built.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <Section className="pt-12 sm:pt-16" containerClassName="max-w-3xl">
      <SectionHeading
        eyebrow="Blog"
        title="Notes on workflow correctness"
        description="Engineering notes on determinism, call-graph analysis, and how WoGu is built."
      />
      <div className="mt-10 divide-y divide-border border-t border-border">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-6 transition-colors first:pt-0"
          >
            <time
              dateTime={post.date}
              className="font-mono text-xs text-muted-foreground"
            >
              {formatPostDate(post.date)}
            </time>
            <h2 className="mt-2 text-lg font-semibold text-foreground transition-colors group-hover:text-brand">
              {post.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
