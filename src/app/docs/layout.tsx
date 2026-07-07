import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsSearch } from "@/components/docs-search";
import { getAllDocs } from "@/lib/docs";
import { getAllRules } from "@/lib/rules";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const docs = getAllDocs();
  const rules = getAllRules();

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-12 lg:py-14">
      <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
        <div className="mb-4">
          <DocsSearch
            docs={docs.map((doc) => ({
              title: doc.title,
              description: doc.description,
              href: doc.slug === "installation" ? "/docs" : `/docs/${doc.slug}`,
            }))}
            rules={rules.map((rule) => ({
              id: rule.id,
              title: rule.title,
              href: `/rules/${rule.id}`,
            }))}
          />
        </div>
        <DocsSidebar
          docs={docs.map(({ slug, title, description, order }) => ({
            slug,
            title,
            description,
            order,
          }))}
        />
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}
