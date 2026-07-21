<script setup lang="ts">
import { computed, ref } from "vue";

type SortOrder = "asc" | "desc";

const categories = ["机械键盘", "无线鼠标", "显示器", "前端书籍"];

const products = Array.from({ length: 5_000 }, (_, index) => ({
  id: index + 1,
  name: `${categories[index % categories.length]} ${String(index + 1).padStart(4, "0")}`,
  price: 99 + ((index * 37) % 900),
}));

const priceFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0,
});

const keyword = ref("");
const sortOrder = ref<SortOrder>("asc");
const cartCount = ref(0);

const result = computed(() => {
  const visibleProducts = products
    .filter((product) => product.name.includes(keyword.value.trim()))
    .sort((a, b) =>
      sortOrder.value === "asc" ? a.price - b.price : b.price - a.price,
    );

  return {
    count: visibleProducts.length,
    total: visibleProducts.reduce((sum, product) => sum + product.price, 0),
    preview: visibleProducts.slice(0, 5),
  };
});
</script>

<template>
  <div class="demo-stack">
    <div class="demo-form">
      <label class="demo-field">
        搜索 5,000 条商品
        <input
          v-model="keyword"
          class="demo-input"
          placeholder="例如 机械键盘"
        />
      </label>
      <label class="demo-field">
        价格排序
        <select v-model="sortOrder" class="demo-select">
          <option value="asc">从低到高</option>
          <option value="desc">从高到低</option>
        </select>
      </label>
    </div>

    <div class="demo-card">
      <span class="demo-tag">缓存的计算结果</span>
      <h2>{{ result.count.toLocaleString() }} 件商品</h2>
      <p>合计 {{ priceFormatter.format(result.total) }}</p>
    </div>

    <ul class="demo-list">
      <li v-for="product in result.preview" :key="product.id">
        <span>{{ product.name }}</span>
        <span>{{ priceFormatter.format(product.price) }}</span>
      </li>
    </ul>

    <div class="demo-actions">
      <button class="demo-button" type="button" @click="cartCount++">
        购物车 +1（当前 {{ cartCount }}）
      </button>
    </div>
    <p class="demo-muted">购物车不是依赖，更新它会复用上一次计算结果。</p>
  </div>
</template>
