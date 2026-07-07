import type { MetadataRoute } from "next";

import { getAllDocs } from "@/lib/docs";
import { getAllRules } from "@/lib/rules";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly" as const, priority: 1, lastModified: now },
    { url: `${siteConfig.url}/docs`, changeFrequency: "monthly" as const, priority: 0.9, lastModified: now },
    { url: `${siteConfig.url}/rules`, changeFrequency: "weekly" as const, priority: 0.9, lastModified: now },
    { url: `${siteConfig.url}/plugins`, changeFrequency: "monthly" as const, priority: 0.7, lastModified: now },
    { url: `${siteConfig.url}/plugins/maven`, changeFrequency: "monthly" as const, priority: 0.7, lastModified: now },
    { url: `${siteConfig.url}/plugins/gradle`, changeFrequency: "monthly" as const, priority: 0.7, lastModified: now },
    { url: `${siteConfig.url}/architecture`, changeFrequency: "monthly" as const, priority: 0.7, lastModified: now },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly" as const, priority: 0.6, lastModified: now },
    { url: `${siteConfig.url}/community`, changeFrequency: "monthly" as const, priority: 0.5, lastModified: now },
  ];

  const docRoutes: MetadataRoute.Sitemap = getAllDocs()
    .filter((doc) => doc.slug !== "installation")
    .map((doc) => ({
      url: `${siteConfig.url}/docs/${doc.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const ruleRoutes: MetadataRoute.Sitemap = getAllRules().map((rule) => ({
    url: `${siteConfig.url}/rules/${rule.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...docRoutes, ...ruleRoutes, ...postRoutes];
}
