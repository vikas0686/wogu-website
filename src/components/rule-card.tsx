import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SeverityBadge } from "@/components/severity-badge";
import type { Rule } from "@/lib/rule-types";
import { excerptText, getRuleSection } from "@/lib/rule-types";

export function RuleCard({ rule }: { rule: Rule }) {
  const problem = getRuleSection(rule, "Problem") ?? "";

  return (
    <Link
      href={`/rules/${rule.id}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-semibold text-brand">
          {rule.id}
        </span>
        <SeverityBadge severity={rule.severity} />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-foreground">
        {rule.title}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {excerptText(problem)}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>{rule.category}</span>
        <span className="inline-flex items-center gap-1 font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
          View rule
          <ArrowRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
