import { lazy } from "react";
import type { NoteDefinition } from "../types";

const CssModulesDemo = lazy(() =>
  import("./CssModulesDemo").then((module) => ({
    default: module.CssModulesDemo,
  })),
);

const reactCode = `// Card.tsx
import styles from "./Card.module.css";

export function Card() {
  return (
    <section className={styles.card}>
      <h2>CSS Modules</h2>
      <div className="third-party-content">内容</div>
    </section>
  );
}

/* Card.module.css */
.card {
  padding: 16px;
  border-radius: 12px;
}

.card :global(.third-party-content) {
  color: #1677ff;
}`;

const vueCode = `<script setup lang="ts">
// 不需要导入样式对象。
</script>

<template>
  <section class="card">
    <h2>Vue scoped</h2>
    <div class="third-party-content">内容</div>
  </section>
</template>

<style scoped>
.card {
  padding: 16px;
  border-radius: 12px;
}

.card :deep(.third-party-content) {
  color: #42b883;
}
</style>`;

export const cssModulesNote: NoteDefinition = {
  path: "/css-modules",
  title: "CSS Modules 与 scoped",
  label: "样式隔离",
  description:
    "CSS Modules 通过导入后的哈希类名实现隔离，Vue scoped 则为当前组件模板和样式添加作用域属性。",
  keywords: ["CSS Modules", "scoped", "global", "deep", "样式穿透", "样式隔离"],
  Demo: CssModulesDemo,
  react: {
    fileName: "Card.tsx / Card.module.css",
    language: "TSX + CSS",
    syntax: "tsx",
    code: reactCode,
  },
  vue: {
    fileName: "Card.vue",
    language: "Vue SFC",
    syntax: "markup",
    code: vueCode,
  },
};
