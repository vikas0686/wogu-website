import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Section } from "@/components/section";
import { CodeBlock } from "@/components/code-block";
import { CodeTabs } from "@/components/code-tabs";
import { InlineCode } from "@/components/inline-code";
import { siteConfig } from "@/lib/site-config";
import {
  gradleCliSnippet,
  gradleFullExampleSnippet,
  gradleLocalInstallSnippet,
  gradlePluginGroovySnippet,
  gradlePluginSnippet,
} from "@/lib/code-samples";

export const metadata: Metadata = {
  title: "Gradle Plugin",
  description: "Install and configure the WoGu Gradle plugin.",
  alternates: { canonical: "/plugins/gradle" },
};

export default function GradlePluginPage() {
  return (
    <Section className="pt-10 sm:pt-14" containerClassName="max-w-3xl">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3.5" />
        <Link href="/plugins" className="hover:text-foreground">Plugins</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">Gradle Plugin</span>
      </nav>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        Gradle Plugin
      </h1>
      <p className="mt-3 text-muted-foreground">
        Registers the <InlineCode>woguValidate</InlineCode> task and wires it into{" "}
        <InlineCode>build</InlineCode> once the <InlineCode>java</InlineCode> plugin is
        present.
      </p>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
        The Gradle plugin isn&apos;t published to the Gradle Plugin Portal yet. Build and
        install it from source into your local Maven repository, as shown below.
      </div>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">Installation</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Build the plugin locally and publish it to <InlineCode>mavenLocal()</InlineCode>:
      </p>
      <div className="mt-4">
        <CodeBlock code={gradleLocalInstallSnippet} lang="bash" title="Terminal" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Then add <InlineCode>mavenLocal()</InlineCode> to your project&apos;s plugin
        repositories, and apply the plugin:
      </p>
      <div className="mt-4">
        <CodeTabs
          tabs={[
            {
              value: "kotlin",
              label: "build.gradle.kts",
              content: (
                <CodeBlock code={gradlePluginSnippet} lang="kotlin" title="build.gradle.kts" />
              ),
            },
            {
              value: "groovy",
              label: "build.gradle",
              content: (
                <CodeBlock code={gradlePluginGroovySnippet} lang="groovy" title="build.gradle" />
              ),
            },
          ]}
        />
      </div>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">Configuration</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Applying the plugin registers <InlineCode>woguValidate</InlineCode>. Once the{" "}
        <InlineCode>java</InlineCode> plugin is applied in the same project, WoGu wires{" "}
        <InlineCode>woguValidate</InlineCode> into <InlineCode>build</InlineCode>{" "}
        automatically — no additional task dependency configuration is needed.
      </p>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">Usage</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Run your build as usual, or run the validation task directly:
      </p>
      <div className="mt-4">
        <CodeBlock code={gradleCliSnippet} lang="bash" title="Terminal" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        A build with violations fails with a non-zero exit code and writes the report to{" "}
        <InlineCode>build/reports/wogu/index.html</InlineCode>.
      </p>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">Example</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        A minimal project with the Temporal SDK and the WoGu plugin:
      </p>
      <div className="mt-4">
        <CodeBlock code={gradleFullExampleSnippet} lang="kotlin" title="build.gradle.kts" />
      </div>

      <div className="mt-12 rounded-lg border border-border bg-muted/30 p-4 text-sm">
        <p className="text-foreground">
          Need Maven instead?{" "}
          <Link
            href="/plugins/maven"
            className="font-medium text-brand underline underline-offset-4"
          >
            View the Maven Plugin
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
