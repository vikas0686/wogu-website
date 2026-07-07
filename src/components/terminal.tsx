"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const lines = [
  { type: "command", text: "./mvnw wogu:scan" },
  { type: "result", text: "26 rules executed" },
  { type: "result", text: "Determinism validation passed" },
  { type: "result", text: "Retry policy validated" },
  { type: "result", text: "Timeout validation passed" },
  { type: "success", text: "Workflow ready" },
] as const;

export function Terminal() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-black/60 bg-black shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-zinc-400">
          wogu — scan
        </span>
      </div>
      <div className="space-y-2 px-5 py-6 font-mono text-[13px] leading-relaxed sm:text-sm">
        {lines.map((line, index) => (
          <motion.div
            key={line.text}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.12, ease: "easeOut" }}
            className="flex items-start gap-2"
          >
            {line.type === "command" ? (
              <>
                <span className="select-none text-zinc-500">$</span>
                <span className="text-zinc-100">{line.text}</span>
              </>
            ) : (
              <>
                <Check
                  className={
                    line.type === "success"
                      ? "mt-0.5 size-4 shrink-0 text-brand"
                      : "mt-0.5 size-4 shrink-0 text-emerald-400"
                  }
                  strokeWidth={2.5}
                />
                <span
                  className={
                    line.type === "success"
                      ? "font-semibold text-zinc-100"
                      : "text-zinc-400"
                  }
                >
                  {line.text}
                </span>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
