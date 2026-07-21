import { lazy } from "react";
import type { NoteDefinition } from "../types";

const RefDemo = lazy(() =>
  import("./RefDemo").then((module) => ({ default: module.RefDemo })),
);

const reactCode = `import { forwardRef, useImperativeHandle, useRef } from "react";

type SearchInputHandle = {
  focus: () => void;
};

const SearchInput = forwardRef<SearchInputHandle>(function SearchInput(_, ref) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  return <input ref={inputRef} />;
});

export function Parent() {
  const searchRef = useRef<SearchInputHandle>(null);

  return (
    <>
      <SearchInput ref={searchRef} />
      <button onClick={() => searchRef.current?.focus()}>
        聚焦输入框
      </button>
    </>
  );
}`;

const vueCode = `<!-- SearchInput.vue -->
<script setup lang="ts">
import { ref } from "vue";

const inputRef = ref<HTMLInputElement>();

const focus = () => inputRef.value?.focus();

defineExpose({ focus });
</script>

<template>
  <input ref="inputRef" />
</template>

<!-- Parent.vue -->
<script setup lang="ts">
import { ref } from "vue";
import SearchInput from "./SearchInput.vue";

const searchRef = ref<InstanceType<typeof SearchInput>>();
</script>

<template>
  <SearchInput ref="searchRef" />
  <button @click="searchRef?.focus()">聚焦输入框</button>
</template>`;

export const refNote: NoteDefinition = {
  path: "/ref",
  title: "useRef 与模板 ref",
  label: "DOM 引用",
  description:
    "React 使用 useRef 保存 DOM 引用，并可通过 forwardRef 转发；Vue 则通过模板 ref 获取组件或元素实例。",
  keywords: ["useRef", "forwardRef", "ref", "DOM", "defineExpose"],
  Demo: RefDemo,
  react: {
    fileName: "SearchInput.tsx",
    language: "TSX",
    syntax: "tsx",
    code: reactCode,
  },
  vue: {
    fileName: "SearchInput.vue / Parent.vue",
    language: "Vue SFC",
    syntax: "markup",
    code: vueCode,
  },
};
