import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Section } from "@/components/section";
import { CodeBlock } from "@/components/code-block";
import { InlineCode } from "@/components/inline-code";
import { siteConfig } from "@/lib/site-config";
import {
  cliSnippet,
  mavenBoundPhaseSnippet,
  mavenFullExampleSnippet,
  mavenPluginSnippet,
} from "@/lib/code-samples";

export const metadata: Metadata = {
  title: "Maven Plugin",
  description: "Install and configure the WoGu Maven plugin, published on Maven Central.",
  alternates: { canonical: "/plugins/maven" },
};

export default function MavenPluginPage() {
  return (
    <Section className="pt-10 sm:pt-14" containerClassName="max-w-3xl">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3.5" />
        <Link href="/plugins" className="hover:text-foreground">Plugins</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">Maven Plugin</span>
      </nav>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        Maven Plugin
      </h1>
      <p className="mt-3 text-muted-foreground">
        Published on Maven Central under <InlineCode>io.github.vikas0686</InlineCode>. No
        repository configuration is needed — it resolves straight from Central.
      </p>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">Installation</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Add the plugin to the <InlineCode>&lt;build&gt;</InlineCode> section of your{" "}
        <InlineCode>pom.xml</InlineCode>:
      </p>
      <div className="mt-4">
        <CodeBlock code={mavenPluginSnippet} lang="xml" title="pom.xml" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        That&apos;s it — <InlineCode>mvn verify</InlineCode> now runs WoGu automatically,
        bound to the <InlineCode>verify</InlineCode> phase.
      </p>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">Configuration</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        The default binds <InlineCode>wogu:validate</InlineCode> to{" "}
        <InlineCode>verify</InlineCode>, after your tests run. Bind it to an earlier phase
        for faster feedback by setting <InlineCode>&lt;phase&gt;</InlineCode> explicitly:
      </p>
      <div className="mt-4">
        <CodeBlock code={mavenBoundPhaseSnippet} lang="xml" title="pom.xml" />
      </div>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">Usage</h2>
      <p className="mt-2 text-sm text-muted-foreground">Run your build as usual:</p>
      <div className="mt-4">
        <CodeBlock code={cliSnippet} lang="bash" title="Terminal" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        A build with violations fails with a non-zero exit code, prints a console summary,
        and writes the full report to <InlineCode>target/wogu/index.html</InlineCode>. See{" "}
        <Link href="/docs/reports" className="text-brand underline underline-offset-4">
          Reports
        </Link>{" "}
        for what the report contains.
      </p>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">Example</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        A minimal project with the Temporal SDK and the WoGu plugin:
      </p>
      <div className="mt-4">
        <CodeBlock code={mavenFullExampleSnippet} lang="xml" title="pom.xml" />
      </div>

      <div className="mt-12 rounded-lg border border-border bg-muted/30 p-4 text-sm">
        <p className="text-foreground">
          Need Gradle instead?{" "}
          <Link
            href="/plugins/gradle"
            className="font-medium text-brand underline underline-offset-4"
          >
            View the Gradle Plugin
          </Link>
          , or open an issue on{" "}
          <a
            href={siteConfig.githubIssues}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
