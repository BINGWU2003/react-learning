# React × Vue 差异笔记

基于 Astro 与官方 Fumadocs UI 的个人学习笔记。每个主题使用同一个 Demo 分别实现 React 与 Vue 版本，并在页面中同时运行和展示真实源码。

## 本地运行

需要 Node.js 22.12 或更高版本，以及 pnpm 11。

```bash
pnpm install
pnpm dev
```

## 常用命令

```bash
pnpm lint
pnpm check
pnpm build
pnpm preview
```

## 新增笔记

每篇笔记独立放在 `content/docs/<topic>/` 中：

- `index.mdx`：标题、说明和对比组件入口。
- `ReactDemo.tsx`：实际运行的 React 示例。
- `VueDemo.vue`：实际运行的 Vue 示例。
- `Comparison.astro`：同时挂载示例，并通过 `?raw` 读取同一份源码。

新增主题后，在 `content/docs/meta.json` 中加入页面 slug。Fumadocs 提供侧边栏、全文搜索、前后页导航、代码高亮和明暗主题。

## 部署

文档页面和搜索索引在构建时静态生成；`/api/learning-resources` 由 Netlify Function 按需运行。示例数据只保存在 Function 进程内存中，重启或冷启动后会恢复。
