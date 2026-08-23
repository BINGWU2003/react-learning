import { navigate } from "astro:transitions/client";
import type { AstroProviderProps } from "fumadocs-core/framework/astro";
import type { Root } from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import {
  DocsPage,
  type DocsPageProps,
} from "fumadocs-ui/layouts/docs/page";
import { RootProvider } from "fumadocs-ui/provider/astro";
import type { ReactNode } from "react";
import SearchDialog from "./search";

const translations = {
  Search: "搜索文档",
  "No results found": "没有找到结果",
  "Open Search": "打开搜索",
  "Close Search": "关闭搜索",
  "Open Sidebar": "打开侧边栏",
  "Close Sidebar": "关闭侧边栏",
  "Previous Page": "上一篇",
  "Next Page": "下一篇",
  "On this page": "本页内容",
  Light: "亮色",
  Dark: "暗色",
  System: "跟随系统",
  "Toggle Theme": "切换主题",
};

export function Docs({
  tree,
  children,
  pathname,
  params,
  page,
}: {
  tree: Root;
  children: ReactNode;
  pathname: string;
  params: AstroProviderProps["params"];
  page?: DocsPageProps;
}) {
  return (
    <RootProvider
      pathname={pathname}
      params={params}
      navigate={navigate}
      theme={{
        defaultTheme: "system",
        enableSystem: true,
        storageKey: "react-vue-theme",
      }}
      i18n={{ locale: "zh-CN", translations }}
      search={{ SearchDialog }}
    >
      <DocsLayout
        tree={tree}
        nav={{ title: "React × Vue", url: "/" }}
        githubUrl="https://github.com/BINGWU2003/react-learning"
      >
        <DocsPage {...page}>{children}</DocsPage>
      </DocsLayout>
    </RootProvider>
  );
}
