<script setup lang="ts">
import { computed, ref } from "vue";

const products = [
  { id: 1, name: "Apple", price: "$1", stocked: true },
  { id: 2, name: "Dragonfruit", price: "$1", stocked: true },
  { id: 3, name: "Passionfruit", price: "$2", stocked: false },
  { id: 4, name: "Spinach", price: "$2", stocked: true },
];

const query = ref("");
const inStockOnly = ref(false);

const visibleProducts = computed(() =>
  products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.value.toLowerCase());
    return matchesQuery && (!inStockOnly.value || product.stocked);
  }),
);
</script>

<template>
  <div class="demo-stack">
    <label class="demo-field">
      搜索商品
      <input
        v-model="query"
        class="demo-input"
        placeholder="例如 Apple"
      />
    </label>
    <label class="demo-field">
      <span>
        <input v-model="inStockOnly" type="checkbox" />
        仅显示有库存
      </span>
    </label>
    <ul class="demo-list">
      <li v-for="product in visibleProducts" :key="product.id">
        <span>{{ product.name }}</span>
        <span :class="{ 'demo-muted': !product.stocked }">
          {{ product.price }} · {{ product.stocked ? "有库存" : "缺货" }}
        </span>
      </li>
    </ul>
  </div>
</template>
