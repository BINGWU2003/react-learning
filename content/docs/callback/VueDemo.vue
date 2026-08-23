<script setup lang="ts">
import { ref } from "vue";
import ProductList from "./ProductList.vue";

type Product = {
  id: number;
  name: string;
  price: number;
};

const cartCount = ref(0);
const selectedProduct = ref<Product | null>(null);

function handleSelect(product: Product) {
  selectedProduct.value = product;
}
</script>

<template>
  <div class="demo-stack">
    <ProductList
      :selected-id="selectedProduct?.id ?? null"
      @select="handleSelect"
    />

    <div class="demo-card">
      <span class="demo-tag">当前选择</span>
      <h2>{{ selectedProduct?.name ?? "尚未选择商品" }}</h2>
      <p>
        {{
          selectedProduct
            ? `价格 ¥${selectedProduct.price}`
            : "点击列表中的按钮选择商品。"
        }}
      </p>
    </div>

    <div class="demo-actions">
      <button class="demo-button" type="button" @click="cartCount++">
        购物车 +1（当前 {{ cartCount }}）
      </button>
    </div>
    <p class="demo-muted">
      更新购物车不会改变子组件的 props，Vue 会跳过不必要的子组件更新。
    </p>
  </div>
</template>
