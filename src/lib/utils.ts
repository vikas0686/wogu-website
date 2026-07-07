import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function extractHeadings(markdown: string): { text: string; slug: string }[] {
  const headingRegex = /^##\s+(.+)$/gm
  const headings: { text: string; slug: string }[] = []
  let match: RegExpExecArray | null
  while ((match = headingRegex.exec(markdown)) !== null) {
    const text = match[1].replace(/`/g, "").trim()
    headings.push({ text, slug: slugify(text) })
  }
  return headings
}
