import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("size-6", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-foreground" />
      <path
        d="M16 7l7 2.6v5.2c0 4.6-3 8.3-7 9.8-4-1.5-7-5.2-7-9.8V9.6L16 7z"
        stroke="var(--background)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12.4 15.8l2.6 2.6 4.6-5"
        stroke="var(--background)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}>
      <Logo />
      <span>WoGu</span>
    </span>
  );
}
