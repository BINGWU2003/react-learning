# React × Vue 差异笔记

一个用于记录 React 与 Vue 使用差异的个人学习项目。页面采用可搜索侧边栏与独立内容路由，现有示例被拆分为不同笔记页面。

## 本地运行

```bash
pnpm install
pnpm dev
```

## 新增笔记

在 `src/noteRoutes.tsx` 的 `noteRoutes` 中添加一项。侧边栏、搜索与页面路由会自动读取这份配置。

每条笔记包含：

- `path`：访问路径
- `title`：侧边栏与页面标题
- `label`：简短分类
- `description`：当前差异说明
- `keywords`：侧边栏搜索关键词
- `content`：React 示例或任意 JSX 内容
