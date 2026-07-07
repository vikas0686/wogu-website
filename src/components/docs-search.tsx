"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FileText, Search, ShieldCheck } from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export interface SearchableDoc {
  title: string;
  description: string;
  href: string;
}

export interface SearchableRule {
  id: string;
  title: string;
  href: string;
}

export function DocsSearch({
  docs,
  rules,
}: {
  docs: SearchableDoc[];
  rules: SearchableRule[];
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-between text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex items-center gap-2">
          <Search className="size-4" />
          Search docs…
        </span>
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Search docs and rules"
      >
        <Command>
          <CommandInput placeholder="Search docs and rules…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Documentation">
              {docs.map((doc) => (
                <CommandItem
                  key={doc.href}
                  value={`${doc.title} ${doc.description}`}
                  onSelect={() => go(doc.href)}
                >
                  <FileText />
                  <div className="flex flex-col">
                    <span>{doc.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {doc.description}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Rules">
              {rules.map((rule) => (
                <CommandItem
                  key={rule.href}
                  value={`${rule.id} ${rule.title}`}
                  onSelect={() => go(rule.href)}
                >
                  <ShieldCheck />
                  <span className="font-mono text-xs text-brand">{rule.id}</span>
                  <span>{rule.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
