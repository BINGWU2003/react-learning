import { lazy } from "react";
import type { NoteDefinition } from "../types";

const DynamicStylesDemo = lazy(() =>
  import("./DynamicStylesDemo").then((module) => ({
    default: module.DynamicStylesDemo,
  })),
);

const reactCode = `import type { CSSProperties } from "react";
import styles from "./Card.module.css";

type CardStyle = CSSProperties & {
  "--accent": string;
  "--radius": string;
};

export function Card({ color, radius }: { color: string; radius: number }) {
  const style: CardStyle = {
    "--accent": color,
    "--radius": radius + "px",
  };

  return (
    <section className={styles.card} style={style}>
      动态样式
    </section>
  );
}

/* Card.module.css */
.card {
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--radius);
}`;

const vueCode = `<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  color: string;
  radius: number;
}>();

const style = computed(() => ({
  "--accent": props.color,
  "--radius": props.radius + "px",
}));
</script>

<template>
  <section class="card" :style="style">动态样式</section>
</template>

<style scoped>
.card {
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--radius);
}
</style>`;

export const dynamicStylesNote: NoteDefinition = {
  path: "/dynamic-styles",
  title: "Props 动态样式与 CSS 变量",
  label: "动态样式",
  description:
    "两者都能把运行时数据绑定到 CSS 自定义属性；差异主要在 props、类型和模板绑定方式。",
  keywords: ["props", "CSS Variables", "style", "动态样式", "v-bind"],
  Demo: DynamicStylesDemo,
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
