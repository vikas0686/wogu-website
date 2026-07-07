import type { Metadata } from "next";

import { DocPage } from "@/components/doc-page";
import { getAdjacentDocs, getDocBySlug } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Install WoGu, run your first scan, and learn how rules, reports, and custom rules fit together.",
  alternates: { canonical: "/docs" },
};

export default function DocsIndexPage() {
  const doc = getDocBySlug("installation");
  if (!doc) throw new Error("Missing installation doc content");

  const { next } = getAdjacentDocs("installation");

  return <DocPage doc={doc} previous={null} next={next} />;
}
