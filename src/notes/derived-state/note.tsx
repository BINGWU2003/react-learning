import { lazy } from "react";
import type { NoteDefinition } from "../types";

const DerivedStateDemo = lazy(() =>
  import("./DerivedStateDemo").then((module) => ({
    default: module.DerivedStateDemo,
  })),
);

const reactCode = `import { useState } from "react";

type Product = { name: string; stocked: boolean };

export function ProductList({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  // 不需要额外的 state：每次渲染时从现有状态计算。
  const visibleProducts = products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesQuery && (!inStockOnly || product.stocked);
  });

  return (
    <>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <input
        type="checkbox"
        checked={inStockOnly}
        onChange={(event) => setInStockOnly(event.target.checked)}
      />
      {visibleProducts.map((product) => (
        <p key={product.name}>{product.name}</p>
      ))}
    </>
  );
}`;

const vueCode = `<script setup lang="ts">
import { computed, ref } from "vue";

type Product = { name: string; stocked: boolean };

const props = defineProps<{ products: Product[] }>();
const query = ref("");
const inStockOnly = ref(false);

const visibleProducts = computed(() =>
  props.products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.value.toLowerCase());
    return matchesQuery && (!inStockOnly.value || product.stocked);
  }),
);
</script>

<template>
  <input v-model="query" />
  <input v-model="inStockOnly" type="checkbox" />
  <p v-for="product in visibleProducts" :key="product.name">
    {{ product.name }}
  </p>
</template>`;

export const derivedStateNote: NoteDefinition = {
  path: "/derived-state",
  title: "派生状态与 computed",
  label: "数据筛选",
  description:
    "React 通常在渲染期间直接计算派生值，Vue 则使用 computed 缓存并追踪相关响应式依赖。",
  keywords: ["computed", "派生状态", "filter", "筛选", "Thinking in React"],
  Demo: DerivedStateDemo,
  react: {
    fileName: "ProductList.tsx",
    language: "TSX",
    syntax: "tsx",
    code: reactCode,
  },
  vue: {
    fileName: "ProductList.vue",
    language: "Vue SFC",
    syntax: "markup",
    code: vueCode,
  },
};
