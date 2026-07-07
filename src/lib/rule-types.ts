export type RuleSeverity = "ERROR" | "WARNING" | "INFO";

export interface RuleSection {
  heading: string;
  body: string;
}

export interface RuleMeta {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryRange: string;
  severity: RuleSeverity;
  engine: string;
  since: string;
  autoFix: string;
}

export interface Rule extends RuleMeta {
  sections: RuleSection[];
}

export function getRuleSection(rule: Rule, heading: string): string | undefined {
  return rule.sections.find(
    (section) => section.heading.toLowerCase() === heading.toLowerCase(),
  )?.body;
}

export function excerptText(text: string, max = 130): string {
  const clean = text
    .replace(/`/g, "")
    .replace(/\n+/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean;
}
