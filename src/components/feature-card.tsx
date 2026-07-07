import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand/40",
        className,
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-brand-muted">
        <Icon className="size-5 text-brand" strokeWidth={1.8} />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
