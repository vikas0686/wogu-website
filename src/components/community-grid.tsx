import { ArrowUpRight, FileCode2, GitPullRequestArrow, MessageSquare } from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

const communityLinks = [
  {
    icon: GitHubIcon,
    title: "GitHub",
    description: "Source, releases, and the issue tracker.",
    href: siteConfig.github,
  },
  {
    icon: MessageSquare,
    title: "Issues",
    description: "Report a bug or request a rule.",
    href: siteConfig.githubIssues,
  },
  {
    icon: GitPullRequestArrow,
    title: "Discussions",
    description: "Ask questions and share feedback.",
    href: siteConfig.githubDiscussions,
  },
  {
    icon: FileCode2,
    title: "Contributing Guide",
    description: "How the repository is built and how to add a rule.",
    href: siteConfig.githubContributing,
  },
];

export function CommunityGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {communityLinks.map((item) => (
        <a
          key={item.title}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand/40"
        >
          <div className="flex items-center justify-between">
            <item.icon className="size-5 text-brand" strokeWidth={1.8} />
            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-foreground">{item.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </a>
      ))}
    </div>
  );
}
