import type { TimelineItem } from "@/components/timeline";

export const roadmapItems: TimelineItem[] = [
  {
    title: "Java (Temporal Java SDK)",
    description:
      "Ten Determinism rules (WG001–WG010) shipped in v0.1, built on recursive call-graph analysis across the workflow's full reachable call graph.",
    status: "available",
  },
  {
    title: "Custom Rules",
    description:
      "Declarative YAML rules for method and constructor patterns today; a CustomRule extension point for analysis that goes beyond a single call pattern.",
    status: "in-progress",
  },
  {
    title: "SARIF Reports",
    description:
      "Standard SARIF output alongside the HTML report, for GitHub code scanning and other static-analysis tooling.",
    status: "planned",
  },
  {
    title: "Spring Boot",
    description:
      "First-class support for Temporal workers wired through Spring Boot's dependency injection and configuration.",
    status: "planned",
  },
  {
    title: "Python",
    description: "Workflow correctness rules for the Temporal Python SDK.",
    status: "planned",
  },
  {
    title: "Go",
    description: "Workflow correctness rules for the Temporal Go SDK.",
    status: "planned",
  },
  {
    title: "TypeScript",
    description: "Workflow correctness rules for the Temporal TypeScript SDK.",
    status: "planned",
  },
];
