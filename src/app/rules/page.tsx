import type { Metadata } from "next";

import { Section, SectionHeading } from "@/components/section";
import { RulesExplorer } from "@/components/rules-explorer";
import { getAllRules, getRuleCategories } from "@/lib/rules";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Rules",
  description:
    "Every WoGu rule that checks Temporal workflow code for determinism violations and best-practice issues, searchable by id, category, and severity.",
  alternates: { canonical: "/rules" },
  openGraph: {
    title: `Rules · ${siteConfig.name}`,
    description:
      "Every WoGu rule that checks Temporal workflow code for determinism violations and best-practice issues.",
    url: "/rules",
  },
};

export default function RulesIndexPage() {
  const rules = getAllRules();
  const categories = getRuleCategories();

  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeading
        eyebrow="Rules"
        title="Rule Reference"
        description="Every rule WoGu evaluates against your Temporal workflow code — what it flags, why it matters, and exactly how to fix it."
      />
      <div className="mt-10">
        <RulesExplorer rules={rules} categories={categories} />
      </div>
    </Section>
  );
}
