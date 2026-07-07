import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Timer,
  GitBranch as GitBranchIcon,
  Workflow,
  FileCode2,
  Layers,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons";
import { Terminal } from "@/components/terminal";
import { Section, SectionHeading } from "@/components/section";
import { FeatureCard } from "@/components/feature-card";
import { RuleCard } from "@/components/rule-card";
import { CodeTabs } from "@/components/code-tabs";
import { CodeBlock } from "@/components/code-block";
import { Timeline } from "@/components/timeline";
import { CommunityGrid } from "@/components/community-grid";
import { FadeIn } from "@/components/fade-in";
import { JsonLd } from "@/components/json-ld";
import { getAllRules } from "@/lib/rules";
import { roadmapItems } from "@/lib/roadmap";
import { siteConfig } from "@/lib/site-config";
import {
  cliSnippet,
  githubActionsSnippet,
  gradlePluginSnippet,
  mavenPluginSnippet,
} from "@/lib/code-samples";

export default function Home() {
  const rules = getAllRules().slice(0, 6);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: siteConfig.fullName,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Java 17+, Maven 3.9+, Gradle 8+",
          description: siteConfig.description,
          url: siteConfig.url,
          license: "https://www.apache.org/licenses/LICENSE-2.0",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          author: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-dot pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)] opacity-60" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center lg:py-32">
          <FadeIn>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-brand" />
              Open source · Apache 2.0
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Workflow correctness for Temporal.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Detect determinism violations, retry policy issues, timeout
              misconfigurations, workflow anti-patterns, and workflow
              best-practice violations before deployment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" render={<Link href="/docs" />}>
                Get Started
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<a href={siteConfig.github} target="_blank" rel="noreferrer" />}
              >
                <GitHubIcon className="size-4" />
                View on GitHub
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Terminal />
          </FadeIn>
        </div>
      </section>

      {/* Why WoGu */}
      <Section>
        <FadeIn>
          <SectionHeading
            eyebrow="Why WoGu"
            title="Workflow quality checked at build time, not discovered in production"
            description="WoGu plugs into your build the same way a coverage or static-analysis gate does, and fails it when workflow code violates a correctness rule — before it ever reaches a worker."
          />
        </FadeIn>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Workflow,
              title: "Determinism validation",
              description:
                "Flags non-deterministic APIs reachable from a workflow's entry point — random values, wall-clock reads, blocking sleeps, and unmanaged threads.",
            },
            {
              icon: Layers,
              title: "Call graph analysis",
              description:
                "Follows every resolvable method call from a workflow's entry point, however many hops deep, and stops precisely at an Activity boundary.",
            },
            {
              icon: GitBranchIcon,
              title: "Build-time quality gate",
              description:
                "Bound to mvn verify or gradle build by default, so a violation fails the build instead of shipping quietly.",
            },
            {
              icon: FileCode2,
              title: "Extensible rule engine",
              description:
                "Most rules are declarative YAML evaluated by a generic rule executor — adding one never touches the core engine.",
            },
            {
              icon: Timer,
              title: "Zero-config defaults",
              description:
                "Add the plugin and run your build. The default rule set requires no configuration to start catching violations.",
            },
            {
              icon: ShieldCheck,
              title: "Self-contained reports",
              description:
                "A single HTML report renders every violation with its full call path, alongside your console build output.",
            },
          ].map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.05}>
              <FeatureCard {...feature} />
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Rules */}
      <Section className="border-t border-border bg-muted/30">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Rules"
              title="Every rule, documented and searchable"
              description="Each rule explains the problem, why it matters, a violation example, a compliant fix, and exactly where WoGu's call-graph analysis stops."
            />
            <Button variant="outline" render={<Link href="/rules" />}>
              Browse all rules
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </FadeIn>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((rule, index) => (
            <FadeIn key={rule.id} delay={index * 0.05}>
              <RuleCard rule={rule} />
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Code examples */}
      <Section className="border-t border-border bg-muted/30">
        <FadeIn>
          <SectionHeading
            eyebrow="Integration"
            title="Drops into the build you already have"
            description="Maven, Gradle, the CLI output your build already prints, and a CI workflow that fails on a real violation."
          />
        </FadeIn>
        <FadeIn delay={0.1} className="mt-10">
          <CodeTabs
            tabs={[
              {
                value: "maven",
                label: "Maven",
                content: <CodeBlock code={mavenPluginSnippet} lang="xml" title="pom.xml" />,
              },
              {
                value: "gradle",
                label: "Gradle",
                content: (
                  <CodeBlock code={gradlePluginSnippet} lang="kotlin" title="build.gradle.kts" />
                ),
              },
              {
                value: "cli",
                label: "CLI",
                content: <CodeBlock code={cliSnippet} lang="bash" title="Terminal" />,
              },
              {
                value: "actions",
                label: "GitHub Actions",
                content: (
                  <CodeBlock
                    code={githubActionsSnippet}
                    lang="yaml"
                    title=".github/workflows/ci.yml"
                  />
                ),
              },
            ]}
          />
        </FadeIn>
      </Section>

      {/* Roadmap teaser */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              eyebrow="Roadmap"
              title="Built for Java today, designed for more"
              description="WoGu's core engine has zero dependency on Temporal or Java specifically — new rules, and new workflow engines and languages, are additive."
            />
            <Button variant="outline" className="mt-6" render={<Link href="/docs/roadmap" />}>
              View full roadmap
              <ArrowRight className="size-4" />
            </Button>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Timeline items={roadmapItems.slice(0, 4)} />
          </FadeIn>
        </div>
      </Section>

      {/* Community */}
      <Section className="border-t border-border bg-muted/30">
        <FadeIn>
          <SectionHeading
            eyebrow="Community"
            title="Open source and built in the open"
            description="Every rule, every line of the engine, and every report template lives in the public repository."
          />
        </FadeIn>
        <FadeIn delay={0.05} className="mt-10">
          <CommunityGrid />
        </FadeIn>
      </Section>

      {/* Final CTA */}
      <Section className="border-t border-border">
        <FadeIn className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Catch workflow bugs before they ship.
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Add WoGu to your build in a few minutes. No configuration required
            for the default rule set.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/docs/quick-start" />}>
              Get Started
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/rules" />}>
              Browse Rules
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
