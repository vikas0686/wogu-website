import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
}

export interface Post extends PostMeta {
  content: string;
}

let cachedPosts: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cachedPosts) return cachedPosts;

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));

  cachedPosts = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        author: (data.author as string) ?? "WoGu Team",
        content: content.trim(),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return cachedPosts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
