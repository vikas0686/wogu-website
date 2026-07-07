import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How WoGu discovers workflow code, traverses its call graph, evaluates rules, and reports results back to the build.",
  alternates: { canonical: "/architecture" },
};

const stages = [
  {
    title: "Developer",
    body: "A developer writes Temporal workflow code as part of a normal feature or fix — nothing WoGu-specific is required in the workflow code itself.",
  },
  {
    title: "Maven / Gradle Plugin",
    body: "The plugin is bound to the build lifecycle: wogu:validate runs on mvn verify by default, and woguValidate wires into gradle build once the java plugin is present.",
  },
  {
    title: "Workflow Scanner",
    body: "Discovers workflow implementation classes and their entry points — the methods matching an @WorkflowMethod-annotated interface method.",
  },
  {
    title: "Rule Engine",
    body: "A call-graph analyzer follows every resolvable method call from each entry point, however many hops deep, and evaluates every declarative rule against what it finds — stopping precisely at an Activity boundary.",
  },
  {
    title: "Validation Report",
    body: "Every rule's outcome is aggregated into a build summary: console output, and a self-contained HTML report with a violation card and full call path for each failure.",
  },
  {
    title: "CI/CD",
    body: "Because WoGu fails the build like a test failure would, a violation blocks a merge in CI the same way any other build-time gate does.",
  },
  {
    title: "Production",
    body: "Only workflow code that has passed every rule reaches a worker — determinism bugs are caught before they can cause a NonDeterministicException in production.",
  },
];

export default function ArchitecturePage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <SectionHeading
          eyebrow="Architecture"
          title="From workflow code to production, one pipeline"
          description="A build tool invokes WoGu, which discovers your workflow classes, traverses their call graph, evaluates every rule against it, and reports results back to the build — before code ever reaches CI/CD or production."
        />
      </Section>

      <Section className="border-t border-border bg-muted/30 pt-12">
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:items-start">
          <div className="mx-auto w-full max-w-sm lg:sticky lg:top-24">
            <ArchitectureDiagram detailed />
          </div>
          <div className="space-y-8">
            {stages.map((stage, index) => (
              <div key={stage.title} className="flex gap-4">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-muted-foreground">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{stage.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {stage.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="call-graph-analysis" className="scroll-mt-20 border-t border-border">
        <SectionHeading
          eyebrow="Under the hood"
          title="Call graph analysis"
          description="The core of WoGu's rule engine — how it finds a violation reachable through a helper class or service, and knows precisely where to stop."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground">
              Follows every reachable call
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Starting from a workflow&apos;s entry point, WoGu follows every method call
              it can resolve to source elsewhere in the project, however many hops deep —
              not just the workflow implementation class itself.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground">
              Stops at an Activity boundary
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Activities are not replayed, so the traversal deliberately stops there —
              this is what keeps every rule free of false positives inside Activity code.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Button variant="outline" render={<Link href="/docs/rules" />}>
            Read the full model in the docs
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Section>

      <Section className="border-t border-border bg-muted/30">
        <SectionHeading
          eyebrow="Modules"
          title="Built to be additive"
          description="wogu-core and wogu-report depend only on the shared API module and discover or render engine output reflectively — a new rule, or a new workflow engine, is additive, never a change to the pipeline above."
        />
        <div className="mt-8">
          <Button variant="outline" render={<Link href="/docs/architecture" />}>
            View the module layout
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
