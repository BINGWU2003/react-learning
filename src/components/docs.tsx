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
  "Search(search trigger)": "搜索",
  "Search(search dialog)": "搜索文档",
  "No results found(search dialog)": "没有找到结果",
  "Open Search(search trigger)(aria-label)": "打开搜索",
  "Close Search(search dialog)(aria-label)": "关闭搜索",
  "Open Sidebar(aria-label)": "打开侧边栏",
  "Open Sidebar(sidebar)(aria-label)": "打开侧边栏",
  "Close Sidebar(aria-label)": "关闭侧边栏",
  "Close Sidebar(sidebar)(aria-label)": "关闭侧边栏",
  "Collapse Sidebar(sidebar)(aria-label)": "折叠侧边栏",
  "Previous Page(pagination)": "上一篇",
  "Next Page(pagination)": "下一篇",
  "On this page(table of contents)": "本页内容",
  "Light(theme switcher)(aria-label)": "亮色",
  "Dark(theme switcher)(aria-label)": "暗色",
  "System(theme switcher)(aria-label)": "跟随系统",
  "Toggle Theme(theme switcher)(aria-label)": "切换主题",
  "Copy Text(code block)(aria-label)": "复制源码",
  "Copied Text(code block)(aria-label)": "已复制",
  "Copy Anchor Link(heading anchor)(aria-label)": "复制标题链接",
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
