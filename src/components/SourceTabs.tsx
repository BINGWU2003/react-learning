"use client";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

export type SourceFile = {
  code: string;
  fileName: string;
  language: string;
};

export function SourceTabs({ sources }: { sources: SourceFile[] }) {
  if (sources.length === 1) {
    const source = sources[0];
    return (
      <DynamicCodeBlock
        code={source.code.trim()}
        lang={source.language}
        codeblock={{ title: source.fileName }}
      />
    );
  }

  return (
    <Tabs items={sources.map((source) => source.fileName)}>
      {sources.map((source) => (
        <Tab
          key={source.fileName}
          value={source.fileName.toLowerCase().replace(/\s/, "-")}
        >
          <DynamicCodeBlock
            code={source.code.trim()}
            lang={source.language}
            codeblock={{ title: source.fileName }}
          />
        </Tab>
      ))}
    </Tabs>
  );
}
