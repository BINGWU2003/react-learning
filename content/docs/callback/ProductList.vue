<script setup lang="ts">
type Product = {
  id: number;
  name: string;
  price: number;
};

defineProps<{
  selectedId: number | null;
}>();

const emit = defineEmits<{
  select: [product: Product];
}>();

const products: Product[] = [
  { id: 1, name: "机械键盘", price: 499 },
  { id: 2, name: "无线鼠标", price: 299 },
  { id: 3, name: "显示器支架", price: 359 },
];
</script>

<template>
  <ul class="demo-list">
    <li v-for="product in products" :key="product.id">
      <span>{{ product.name }} · ¥{{ product.price }}</span>
      <button
        class="demo-button"
        type="button"
        :aria-pressed="selectedId === product.id"
        @click="emit('select', product)"
      >
        {{ selectedId === product.id ? "已选择" : "选择" }}
      </button>
    </li>
  </ul>
</template>
