import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DOCS_DIR = path.join(process.cwd(), "src/content/docs");

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
}

export interface Doc extends DocMeta {
  content: string;
}

let cachedDocs: Doc[] | null = null;

export function getAllDocs(): Doc[] {
  if (cachedDocs) return cachedDocs;

  const files = fs.readdirSync(DOCS_DIR).filter((file) => file.endsWith(".md"));

  cachedDocs = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(DOCS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title as string,
        description: data.description as string,
        order: (data.order as number) ?? 0,
        content: content.trim(),
      };
    })
    .sort((a, b) => a.order - b.order);

  return cachedDocs;
}

export function getDocBySlug(slug: string): Doc | undefined {
  return getAllDocs().find((doc) => doc.slug === slug);
}

export function getAdjacentDocs(slug: string): {
  previous: DocMeta | null;
  next: DocMeta | null;
} {
  const docs = getAllDocs();
  const index = docs.findIndex((doc) => doc.slug === slug);
  return {
    previous: index > 0 ? docs[index - 1] : null,
    next: index >= 0 && index < docs.length - 1 ? docs[index + 1] : null,
  };
}
