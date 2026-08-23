"use client";

import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { SourceTabs, type SourceFile } from "./SourceTabs";

export type SourceGroup = {
  label: string;
  sources: SourceFile[];
};

export function FrameworkSourceTabs({ groups }: { groups: SourceGroup[] }) {
  if (groups.length === 1) {
    return <SourceTabs sources={groups[0]?.sources ?? []} />;
  }

  return (
    <Tabs items={groups.map((group) => group.label)}>
      {groups.map((group) => (
        <Tab key={group.label}>
          <SourceTabs sources={group.sources} />
        </Tab>
      ))}
    </Tabs>
  );
}
