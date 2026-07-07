"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { RuleCard } from "@/components/rule-card";
import { cn } from "@/lib/utils";
import type { Rule, RuleSeverity } from "@/lib/rule-types";
import { getRuleSection } from "@/lib/rule-types";

export function RulesExplorer({
  rules,
  categories,
}: {
  rules: Rule[];
  categories: { name: string; range: string; count: number }[];
}) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);
  const [severity, setSeverity] = React.useState<RuleSeverity | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return rules.filter((rule) => {
      if (category && rule.category !== category) return false;
      if (severity && rule.severity !== severity) return false;
      if (!q) return true;
      const haystack = [
        rule.id,
        rule.title,
        rule.category,
        getRuleSection(rule, "Problem") ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [rules, query, category, severity]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search rules by id, title, or keyword…"
            className="pl-9"
            aria-label="Search rules"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setCategory(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            category === null
              ? "border-brand bg-brand-muted text-brand"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          All categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setCategory(cat.name === category ? null : cat.name)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              category === cat.name
                ? "border-brand bg-brand-muted text-brand"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {cat.name}
            <span className="ml-1 opacity-60">{cat.count}</span>
          </button>
        ))}

        <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />

        {(["ERROR", "WARNING", "INFO"] as RuleSeverity[]).map((sev) => (
          <button
            key={sev}
            onClick={() => setSeverity(sev === severity ? null : sev)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              severity === sev
                ? "border-brand bg-brand-muted text-brand"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {sev}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {filtered.length} of {rules.length} rules
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((rule) => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No rules match your search.
        </div>
      )}
    </div>
  );
}
