import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { LogoMark } from "@/components/logo";
import { footerNav, siteConfig } from "@/lib/site-config";

function FooterColumn({
  title,
  titleHref,
  items,
}: {
  title: string;
  titleHref?: string;
  items: { title: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      {titleHref ? (
        <Link
          href={titleHref}
          className="text-sm font-semibold text-foreground hover:text-brand"
        >
          {title}
        </Link>
      ) : (
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      )}
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
                <ArrowUpRight className="size-3" />
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <LogoMark />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Workflow correctness for Temporal. Open-source, build-time
              validation for engineering teams.
            </p>
          </div>
          <FooterColumn title="Product" items={footerNav.product} />
          <FooterColumn title="Community" titleHref="/community" items={footerNav.community} />
          <FooterColumn title="Resources" items={footerNav.resources} />
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Licensed under
            the Apache License 2.0.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for engineering teams running Temporal in production.
          </p>
        </div>
      </div>
    </footer>
  );
}
