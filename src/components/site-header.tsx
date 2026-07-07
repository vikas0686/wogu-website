"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";

import { LogoMark } from "@/components/logo";
import { GitHubIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <LogoMark />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1">
          {mainNav
            .filter((item) => !item.external)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive(pathname, item.href) && "text-foreground",
                )}
              >
                {item.title}
              </Link>
            ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            render={<a href={siteConfig.github} target="_blank" rel="noreferrer" />}
          >
            <GitHubIcon className="size-4" />
            GitHub
          </Button>
          <Button size="sm" render={<Link href="/docs" />}>
            Get Started
            <ArrowUpRight className="size-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" aria-label="Open menu" />}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <LogoMark />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {mainNav.map((item) =>
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                        isActive(pathname, item.href) && "bg-muted text-foreground",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ),
                )}
                <Button
                  className="mt-2"
                  render={<Link href="/docs" onClick={() => setOpen(false)} />}
                >
                  Get Started
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
