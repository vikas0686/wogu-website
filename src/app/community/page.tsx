import type { Metadata } from "next";

import { Section, SectionHeading } from "@/components/section";
import { CommunityGrid } from "@/components/community-grid";

export const metadata: Metadata = {
  title: "Community",
  description: "WoGu is open source and built in the open — source, issues, discussions, and the contributing guide.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeading
        eyebrow="Community"
        title="Open source and built in the open"
        description="Every rule, every line of the engine, and every report template lives in the public repository under the Apache 2.0 license."
      />
      <div className="mt-10">
        <CommunityGrid />
      </div>
    </Section>
  );
}
