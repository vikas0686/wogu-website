"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const COPY_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const CHECK_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

export function RenderedMarkdown({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const fragments = container.querySelectorAll<HTMLElement>(
      "[data-rehype-pretty-code-figure]",
    );

    const cleanups: Array<() => void> = [];

    fragments.forEach((fragment) => {
      if (fragment.querySelector("[data-copy-button]")) return;
      const pre = fragment.querySelector("pre");
      if (!pre) return;

      fragment.classList.add("code-block");
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("data-copy-button", "");
      button.setAttribute("aria-label", "Copy code");
      button.className = "copy-button";
      button.innerHTML = COPY_ICON;

      const handleClick = () => {
        void navigator.clipboard.writeText(pre.textContent ?? "");
        button.innerHTML = CHECK_ICON;
        setTimeout(() => {
          button.innerHTML = COPY_ICON;
        }, 1500);
      };

      button.addEventListener("click", handleClick);
      fragment.appendChild(button);
      cleanups.push(() => button.removeEventListener("click", handleClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [html]);

  return (
    <div
      ref={ref}
      className={cn("prose-wogu", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
