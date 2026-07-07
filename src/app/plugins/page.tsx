import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";

export const metadata: Metadata = {
  title: "Plugins",
  description: "The WoGu Maven and Gradle build plugins.",
  alternates: { canonical: "/plugins" },
};

const plugins = [
  {
    slug: "maven",
    name: "Maven Plugin",
    summary:
      "Published on Maven Central. Bind wogu:validate to the verify phase and it runs on every mvn verify.",
    coordinates: "io.github.vikas0686:wogu-maven-plugin",
  },
  {
    slug: "gradle",
    name: "Gradle Plugin",
    summary:
      "Registers the woguValidate task and wires it into build once the java plugin is present.",
    coordinates: "io.github.vikas0686.wogu",
  },
];

export default function PluginsIndexPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeading
        eyebrow="Plugins"
        title="Build Tool Plugins"
        description="WoGu ships as a build plugin, not a separate tool to run — it fails your existing build the same way a test failure would."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {plugins.map((plugin) => (
          <Link
            key={plugin.slug}
            href={`/plugins/${plugin.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand/40"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-muted">
              <Package className="size-5 text-brand" strokeWidth={1.8} />
            </div>
            <h2 className="mt-4 text-base font-semibold text-foreground">
              {plugin.name}
            </h2>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
              {plugin.summary}
            </p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {plugin.coordinates}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
              View plugin
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
