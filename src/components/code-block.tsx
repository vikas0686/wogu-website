import { renderCodeBlock } from "@/lib/markdown";
import { RenderedMarkdown } from "@/components/rendered-markdown";
import { cn } from "@/lib/utils";

export async function CodeBlock({
  code,
  lang,
  title,
  className,
}: {
  code: string;
  lang: string;
  title?: string;
  className?: string;
}) {
  const html = await renderCodeBlock(code, lang, title);
  return <RenderedMarkdown html={html} className={cn("[&>*]:my-0", className)} />;
}
