import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { Section } from "@/components/section";
import { RenderedMarkdown } from "@/components/rendered-markdown";
import { JsonLd } from "@/components/json-ld";
import { getAllPosts, getPostBySlug, formatPostDate } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: `${post.title} · ${siteConfig.name}`,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);

  return (
    <Section className="pt-10 sm:pt-14" containerClassName="max-w-2xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url: `${siteConfig.url}/blog/${post.slug}`,
          author: {
            "@type": "Organization",
            name: post.author,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3.5" />
        <Link href="/blog" className="hover:text-foreground">Blog</Link>
      </nav>

      <header className="mt-6 border-b border-border pb-8">
        <time dateTime={post.date} className="font-mono text-xs text-muted-foreground">
          {formatPostDate(post.date)}
        </time>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">By {post.author}</p>
      </header>

      <RenderedMarkdown html={html} className="mt-8" />

      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/blog"
          className="text-sm font-medium text-brand underline underline-offset-4"
        >
          ← Back to all posts
        </Link>
      </div>
    </Section>
  );
}
