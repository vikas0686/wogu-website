import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

const prettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
  defaultLang: "text",
  bypassInlineCode: true,
};

let processor: ReturnType<typeof buildProcessor> | null = null;

function buildProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .use(rehypePrettyCode as any, prettyCodeOptions)
    .use(rehypeStringify);
}

/** Renders a Markdown fragment to a self-contained HTML string at build time. */
export async function renderMarkdown(markdown: string): Promise<string> {
  if (!processor) processor = buildProcessor();
  const file = await processor.process(markdown);
  return String(file);
}

/** Renders a single fenced code block, e.g. for standalone code examples outside of prose. */
export async function renderCodeBlock(
  code: string,
  lang: string,
  title?: string,
): Promise<string> {
  const meta = title ? ` title="${title}"` : "";
  const fence = "```" + lang + meta + "\n" + code.replace(/\n$/, "") + "\n```";
  return renderMarkdown(fence);
}
