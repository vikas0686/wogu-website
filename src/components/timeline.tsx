import { cn } from "@/lib/utils";

export type TimelineStatus = "available" | "in-progress" | "planned";

export interface TimelineItem {
  title: string;
  description: string;
  status: TimelineStatus;
}

const statusStyles: Record<TimelineStatus, { dot: string; label: string; text: string }> = {
  available: {
    dot: "bg-emerald-500",
    label: "Available",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  "in-progress": {
    dot: "bg-brand",
    label: "In Progress",
    text: "text-brand",
  },
  planned: {
    dot: "bg-muted-foreground/40",
    label: "Planned",
    text: "text-muted-foreground",
  },
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l border-border pl-6">
      {items.map((item, index) => {
        const style = statusStyles[item.status];
        return (
          <li key={item.title} className={cn("relative", index !== items.length - 1 && "pb-8")}>
            <span
              className={cn(
                "absolute -left-[1.65rem] top-1 size-3 rounded-full ring-4 ring-background",
                style.dot,
              )}
            />
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              <span className={cn("text-xs font-medium", style.text)}>
                {style.label}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
