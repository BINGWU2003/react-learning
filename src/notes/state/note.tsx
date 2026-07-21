import { lazy } from "react";
import type { NoteDefinition } from "../types";

const StateDemo = lazy(() =>
  import("./StateDemo").then((module) => ({ default: module.StateDemo })),
);

const reactCode = `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  const [profile, setProfile] = useState({ name: "小明", score: 0 });

  const increment = () => {
    setCount((current) => current + 1);
    setProfile((current) => ({
      ...current,
      score: current.score + 1,
    }));
  };

  return (
    <button onClick={increment}>
      {profile.name}: {count} / {profile.score}
    </button>
  );
}`;

const vueCode = `<script setup lang="ts">
import { reactive, ref } from "vue";

const count = ref(0);
const profile = reactive({ name: "小明", score: 0 });

const increment = () => {
  count.value += 1;
  profile.score += 1;
};
</script>

<template>
  <button @click="increment">
    {{ profile.name }}: {{ count }} / {{ profile.score }}
  </button>
</template>`;

export const stateNote: NoteDefinition = {
  path: "/state",
  title: "useState 与 ref / reactive",
  label: "状态管理",
  description:
    "React 通过 setter 提交下一次状态并保持数据不可变；Vue 通过 ref / reactive 对可变对象进行响应式追踪。",
  keywords: ["useState", "ref", "reactive", "state", "状态", "井字棋"],
  Demo: StateDemo,
  react: {
    fileName: "Counter.tsx",
    language: "TSX",
    syntax: "tsx",
    code: reactCode,
  },
  vue: {
    fileName: "Counter.vue",
    language: "Vue SFC",
    syntax: "markup",
    code: vueCode,
  },
};
