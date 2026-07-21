import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import vue from "@astrojs/vue";

export default defineConfig({
  redirects: {
    "/": "/component-communication/",
  },
  integrations: [
    starlight({
      title: "React × Vue",
      description: "用同一个可运行 Demo 对照 React 与 Vue 的实现差异。",
      favicon: "/favicon.svg",
      defaultLocale: "root",
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      tableOfContents: false,
      expressiveCode: {
        themes: ["one-dark-pro"],
      },
      customCss: ["./src/styles/custom.css"],
      components: {
        ThemeProvider: "./src/components/LightTheme.astro",
        ThemeSelect: "./src/components/Empty.astro",
      },
      sidebar: [
        {
          label: "差异笔记",
          items: [
            { label: "渲染模型", slug: "render-setup" },
            { label: "表单双向绑定", slug: "form-binding" },
            { label: "逻辑复用", slug: "logic-reuse" },
            { label: "内容分发", slug: "children-slots" },
            { label: "组件通信", slug: "component-communication" },
            { label: "跨组件状态", slug: "context" },
            { label: "副作用", slug: "effect" },
            { label: "DOM 引用", slug: "ref" },
            { label: "状态管理", slug: "state" },
            { label: "派生状态", slug: "derived-state" },
            { label: "计算缓存", slug: "memo" },
            { label: "回调引用", slug: "callback" },
            { label: "样式隔离", slug: "css-modules" },
            { label: "动态样式", slug: "dynamic-styles" },
          ],
        },
      ],
    }),
    react({ include: [/\.[jt]sx$/] }),
    vue(),
  ],
});
