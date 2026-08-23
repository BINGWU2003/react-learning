<script setup lang="ts">
import { ref } from "vue";

const setupExecutions = 1;
const count = ref(0);
const compact = ref(false);
</script>

<template>
  <div class="demo-stack">
    <div class="demo-card">
      <span class="demo-tag">setup 执行</span>
      <h2>{{ compact ? "紧凑视图" : "标准视图" }}</h2>
      <p>count：{{ count }}</p>
      <p>VueDemo 本次挂载已执行 setup：{{ setupExecutions }} 次</p>
    </div>
    <div class="demo-actions">
      <button class="demo-button" type="button" @click="count += 1">
        count + 1
      </button>
      <button class="demo-button" type="button" @click="compact = !compact">
        切换显示模式
      </button>
    </div>
  </div>
</template>

