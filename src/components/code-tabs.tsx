"use client";

import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface CodeTabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

export function CodeTabs({
  tabs,
  defaultValue,
}: {
  tabs: CodeTabItem[];
  defaultValue?: string;
}) {
  return (
    <Tabs defaultValue={defaultValue ?? tabs[0]?.value} className="gap-0">
      <TabsList className="h-auto rounded-b-none border border-black bg-black p-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="text-xs text-zinc-400 hover:text-zinc-100 data-active:border-transparent data-active:bg-white/10 data-active:text-zinc-100"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-0">
          <div className="[&_.code-block]:rounded-t-none [&_.code-block]:border-t-0">
            {tab.content}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
