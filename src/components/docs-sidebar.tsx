"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { DocMeta } from "@/lib/docs";

export function DocsSidebar({ docs }: { docs: DocMeta[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="space-y-1">
      {docs.map((doc) => {
        const href = doc.slug === "installation" ? "/docs" : `/docs/${doc.slug}`;
        const active =
          pathname === href || (doc.slug !== "installation" && pathname === `/docs/${doc.slug}`);
        return (
          <Link
            key={doc.slug}
            href={href}
            className={cn(
              "block rounded-md px-3 py-1.5 text-sm transition-colors",
              active
                ? "bg-brand-muted font-medium text-brand"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {doc.title}
          </Link>
        );
      })}
    </nav>
  );
}
