# React × Vue 差异笔记

基于 Astro Starlight 的个人学习笔记。每个主题使用同一个 Demo 分别实现 React 与 Vue 版本，并在页面中同时运行和展示真实源码。

## 本地运行

需要 Node.js 22.12 或更高版本。

```bash
pnpm install
pnpm dev
```

## 新增笔记

每篇笔记独立放在 `src/content/docs/<topic>/` 中：

- `index.mdx`：笔记标题、说明和对比组件入口
- `ReactDemo.tsx`：实际运行的 React 示例
- `VueDemo.vue`：实际运行的 Vue 示例
- `Comparison.astro`：同时挂载两个示例，并通过 `?raw` 读取同一份源码用于高亮展示

新增主题后，在 `astro.config.mjs` 的 `sidebar` 中添加路由即可。Starlight 提供搜索、侧边栏和移动端导航。

## 目录结构

```text
src/
├─ components/          # React/Vue 通用对比外壳
├─ content/docs/        # 每个主题自包含的笔记和双框架 Demo
├─ styles/              # Starlight 主题与 Demo 通用样式
├─ content.config.ts    # Starlight 内容集合
└─ env.d.ts             # Astro 类型声明
```
