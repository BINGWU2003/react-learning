<script setup lang="ts">
import { useViewportSize as viewportSizeComposable } from "./useViewportSize.vue";

const { height, label, width } = viewportSizeComposable();
</script>

<template>
  <div class="demo-stack">
    <div class="demo-card">
      <span class="demo-tag">useViewportSize()</span>
      <h2>{{ label }}</h2>
      <p>窗口宽度：{{ width || "等待客户端挂载" }}</p>
      <p>窗口高度：{{ height || "等待客户端挂载" }}</p>
    </div>
    <p class="demo-muted">
      调整浏览器窗口后，Composable 内部的 resize 监听会修改 refs。
    </p>
  </div>
</template>
