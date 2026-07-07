export const siteConfig = {
  name: "WoGu",
  fullName: "WoGu — Workflow Guard",
  description:
    "Workflow correctness for Temporal. Detect determinism violations, retry policy issues, timeout misconfigurations, workflow anti-patterns, and workflow best-practice violations before deployment.",
  url: "https://wogu.dev",
  github: "https://github.com/vikas0686/wogu",
  githubIssues: "https://github.com/vikas0686/wogu/issues",
  githubDiscussions: "https://github.com/vikas0686/wogu/discussions",
  githubContributing: "https://github.com/vikas0686/wogu/blob/main/CONTRIBUTING.md",
  githubCodeOfConduct: "https://github.com/vikas0686/wogu/blob/main/CODE_OF_CONDUCT.md",
  githubSecurity: "https://github.com/vikas0686/wogu/security/policy",
  githubLicense: "https://github.com/vikas0686/wogu/blob/main/LICENSE",
  mavenCentral: "https://search.maven.org/artifact/io.github.vikas0686/wogu-maven-plugin",
  gradlePluginPortal: "https://plugins.gradle.org/plugin/io.github.vikas0686.wogu",
  twitterHandle: "@wogudev",
} as const;

export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Documentation", href: "/docs" },
  { title: "Rules", href: "/rules" },
  { title: "Plugins", href: "/plugins" },
  { title: "Architecture", href: "/architecture" },
  { title: "Blog", href: "/blog" },
  { title: "GitHub", href: siteConfig.github, external: true },
];

export const footerNav = {
  product: [
    { title: "Documentation", href: "/docs" },
    { title: "Rules", href: "/rules" },
    { title: "Plugins", href: "/plugins" },
    { title: "Architecture", href: "/architecture" },
  ],
  community: [
    { title: "GitHub", href: siteConfig.github, external: true },
    { title: "Issues", href: siteConfig.githubIssues, external: true },
    { title: "Discussions", href: siteConfig.githubDiscussions, external: true },
    { title: "Contributing Guide", href: siteConfig.githubContributing, external: true },
  ],
  resources: [
    { title: "Maven Central", href: siteConfig.mavenCentral, external: true },
    { title: "Gradle Plugin Portal", href: siteConfig.gradlePluginPortal, external: true },
    { title: "License", href: siteConfig.githubLicense, external: true },
    { title: "Security", href: siteConfig.githubSecurity, external: true },
    { title: "Code of Conduct", href: siteConfig.githubCodeOfConduct, external: true },
  ],
};
