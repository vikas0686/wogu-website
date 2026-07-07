import fs from "node:fs";
import path from "node:path";

import type { Rule, RuleMeta, RuleSection, RuleSeverity } from "@/lib/rule-types";

export type { Rule, RuleMeta, RuleSection, RuleSeverity } from "@/lib/rule-types";
export { getRuleSection } from "@/lib/rule-types";

const RULES_DIR = path.join(process.cwd(), "src/content/rules");

function parseMetadataRow(line: string): [string, string] | null {
  const match = line.match(/^\|\s*\*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|$/);
  if (!match) return null;
  return [match[1].trim(), match[2].trim()];
}

function stripMarkdownLinks(value: string): string {
  return value.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
}

function parseRuleFile(raw: string, filename: string): Rule {
  const lines = raw.split("\n");

  const titleLine = lines.find((line) => line.startsWith("# "));
  if (!titleLine) {
    throw new Error(`Rule file ${filename} is missing an H1 title`);
  }
  const [, idPart, titlePart] =
    titleLine.match(/^#\s*(WG\d{3})\s*—\s*(.+)$/) ?? [];
  if (!idPart || !titlePart) {
    throw new Error(`Rule file ${filename} has an unexpected title format`);
  }

  const metadata: Record<string, string> = {};
  for (const line of lines) {
    const row = parseMetadataRow(line);
    if (row) metadata[row[0]] = row[1];
  }

  const categoryRaw = metadata["Category"] ?? "";
  const categoryMatch = categoryRaw.match(/^(.+?)\s*\(\[(.+?)\]/);
  const category = categoryMatch ? categoryMatch[1].trim() : categoryRaw;
  const categoryRange = categoryMatch ? categoryMatch[2].trim() : "";

  const sectionRegex = /^##\s+(.+)$/;
  const sections: RuleSection[] = [];
  let currentHeading: string | null = null;
  let currentBody: string[] = [];

  const flush = () => {
    if (currentHeading !== null) {
      sections.push({
        heading: currentHeading,
        body: currentBody.join("\n").trim(),
      });
    }
  };

  for (const line of lines) {
    const match = line.match(sectionRegex);
    if (match) {
      flush();
      currentHeading = match[1].trim();
      currentBody = [];
    } else if (currentHeading !== null) {
      currentBody.push(line);
    }
  }
  flush();

  return {
    id: idPart,
    slug: idPart,
    title: titlePart.trim(),
    category,
    categoryRange,
    severity: (metadata["Severity"] as RuleSeverity) ?? "ERROR",
    engine: metadata["Engine"] ?? "",
    since: metadata["Since"] ?? "",
    autoFix: stripMarkdownLinks(metadata["Auto Fix"] ?? ""),
    sections: sections.map((section) => ({
      heading: section.heading,
      body: section.body,
    })),
  };
}

let cachedRules: Rule[] | null = null;

export function getAllRules(): Rule[] {
  if (cachedRules) return cachedRules;
  const files = fs
    .readdirSync(RULES_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();

  cachedRules = files.map((file) => {
    const raw = fs.readFileSync(path.join(RULES_DIR, file), "utf-8");
    return parseRuleFile(raw, file);
  });

  return cachedRules;
}

export function getRuleById(id: string): Rule | undefined {
  return getAllRules().find(
    (rule) => rule.id.toLowerCase() === id.toLowerCase(),
  );
}

export function getAdjacentRules(id: string): {
  previous: RuleMeta | null;
  next: RuleMeta | null;
} {
  const rules = getAllRules();
  const index = rules.findIndex((rule) => rule.id === id);
  return {
    previous: index > 0 ? rules[index - 1] : null,
    next: index >= 0 && index < rules.length - 1 ? rules[index + 1] : null,
  };
}

export function getRuleCategories(): { name: string; range: string; count: number }[] {
  const rules = getAllRules();
  const map = new Map<string, { range: string; count: number }>();
  for (const rule of rules) {
    const existing = map.get(rule.category);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(rule.category, { range: rule.categoryRange, count: 1 });
    }
  }
  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    range: value.range,
    count: value.count,
  }));
}
