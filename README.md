# React × Vue 差异笔记

基于 Astro 与 Fumadocs UI 的 React × Vue 对照知识库。内容按知识关系组织，每篇笔记通过心智模型、Mermaid 流程图、最小代码和在线 Demo 解释一个明确主题。

## 内容结构

- 渲染与响应式：render、setup、状态与副作用。
- 组件边界：通信、内容分发、上下文与 ref。
- 复用与性能：Custom Hook、Composable、派生与缓存。
- 表单与样式：表单数据流、样式隔离与 CSS 变量。
- React 生态实践：表单校验、服务端状态和复杂本地状态。

笔记借鉴 Obsidian 的原子主题与关联式组织方式，但 MDX 是唯一内容源。内部链接、Callout、代码块和流程图均使用 Fumadocs 能直接构建与搜索的语法。

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

- `index.mdx`：完整知识正文，包含流程图、最小代码、Demo 入口和相关主题链接。
- `ReactDemo.tsx`：实际运行的 React 示例。
- `VueDemo.vue`：实际运行的 Vue 示例。

普通代码使用 fenced code block；主题流程图由对应的 `Flow.astro` 提供 Mermaid 数据，并统一通过 `FlowDiagram.astro` 渲染卡片、暗色主题和放大视图。React/Vue Demo 仍直接在 MDX 的独立小节中挂载。

新增主题后，在 `content/docs/meta.json` 中加入页面 slug。Fumadocs 提供默认文档宽度、右侧目录、侧边栏、全文搜索、前后页导航、代码高亮和明暗主题。

## 部署

文档页面和搜索索引在构建时静态生成；`/api/learning-resources` 由 Netlify Function 按需运行。示例数据只保存在 Function 进程内存中，重启或冷启动后会恢复。
