import { AlertCircle, AlertTriangle, Info } from "lucide-react";

import { cn } from "@/lib/utils";
import type { RuleSeverity } from "@/lib/rule-types";

const styles: Record<RuleSeverity, string> = {
  ERROR:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  WARNING:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  INFO: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20",
};

const icons: Record<RuleSeverity, typeof AlertCircle> = {
  ERROR: AlertCircle,
  WARNING: AlertTriangle,
  INFO: Info,
};

export function SeverityBadge({
  severity,
  className,
}: {
  severity: RuleSeverity;
  className?: string;
}) {
  const Icon = icons[severity];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        styles[severity],
        className,
      )}
    >
      <Icon className="size-3" strokeWidth={2.5} />
      {severity}
    </span>
  );
}
