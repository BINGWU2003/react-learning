# React × Vue 差异笔记

一个用于记录 React 与 Vue 使用差异的个人学习项目。页面采用可搜索侧边栏与独立内容路由，现有示例被拆分为不同笔记页面。

## 本地运行

```bash
pnpm install
pnpm dev
```

## 新增笔记

每篇笔记独立放在 `src/notes/<topic>/` 中，由 Demo、样式和 `note.tsx` 组成；最后在 `src/notes/registry.ts` 注册。侧边栏、搜索与页面路由会自动读取这份配置。

每条笔记包含：

- `path`：访问路径
- `title`：侧边栏与页面标题
- `label`：简短分类
- `description`：当前差异说明
- `keywords`：侧边栏搜索关键词
- `Demo`：可运行的 React 示例
- `react`：React 代码片段
- `vue`：对应的 Vue 代码片段

## 目录结构

```text
src/
├─ app/                 # 页面骨架与笔记页面
├─ notes/               # 每个主题自包含的 Demo、样式和代码对比
├─ shared/components/   # 通用代码对比组件
├─ styles/              # 全局布局样式
└─ main.tsx             # 应用入口
```
