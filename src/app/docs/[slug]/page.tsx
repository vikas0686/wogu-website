import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocPage } from "@/components/doc-page";
import { getAdjacentDocs, getAllDocs, getDocBySlug } from "@/lib/docs";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getAllDocs()
    .filter((doc) => doc.slug !== "installation")
    .map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/${doc.slug}` },
    openGraph: {
      title: `${doc.title} · ${siteConfig.name}`,
      description: doc.description,
      url: `/docs/${doc.slug}`,
    },
  };
}

export default async function DocSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc || doc.slug === "installation") notFound();

  const { previous, next } = getAdjacentDocs(slug);

  return <DocPage doc={doc} previous={previous} next={next} />;
}
