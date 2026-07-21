<script setup lang="ts">
import { computed, ref } from "vue";

const themes = [
  { name: "海蓝", color: "#1677ff", background: "#eaf3ff", radius: 18 },
  { name: "葡萄", color: "#7c3aed", background: "#f4edff", radius: 8 },
];

const themeIndex = ref(0);
const theme = computed(() => themes[themeIndex.value]);
const cardStyle = computed(() => ({
  "--demo-accent": theme.value.color,
  "--demo-background": theme.value.background,
  "--demo-radius": `${theme.value.radius}px`,
}));
</script>

<template>
  <div class="demo-stack">
    <section class="dynamic-demo-card" :style="cardStyle">
      <span class="demo-tag">{{ theme.name }}</span>
      <h2>运行时主题</h2>
      <p>颜色与圆角都来自组件状态。</p>
    </section>
    <div class="demo-actions">
      <button
        v-for="(item, index) in themes"
        :key="item.name"
        class="demo-button"
        type="button"
        @click="themeIndex = index"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>
