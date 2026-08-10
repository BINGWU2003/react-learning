<script setup lang="ts">
import { ref, watchEffect } from "vue";

const setupExecutions = 1;
const count = ref(0);
const theme = ref<"light" | "dark">("light");
const lastAction = ref("创建 ref，并首次运行 watchEffect");
const trackedEffectRuns = ref(0);
const trackedSnapshot = ref("");

let runCount = 0;

watchEffect(() => {
  const currentCount = count.value;

  runCount += 1;
  trackedEffectRuns.value = runCount;
  trackedSnapshot.value = `读取 count=${currentCount}`;
});

function incrementCount() {
  lastAction.value = "count.value += 1 → trigger count 依赖";
  count.value += 1;
}

function toggleTheme() {
  lastAction.value = "theme.value 切换；未触发 count 的 effect";
  theme.value = theme.value === "light" ? "dark" : "light";
}

function reset() {
  lastAction.value = "把两个 ref 恢复为初始值";
  count.value = 0;
  theme.value = "light";
}
</script>

<template>
  <div class="demo-stack">
    <div class="demo-card">
      <span class="demo-tag">响应式 ref</span>
      <h2>count：{{ count }}</h2>
      <p>无关状态 theme：{{ theme }}</p>
    </div>

    <div class="demo-actions">
      <button class="demo-button" type="button" @click="incrementCount">
        count + 1
      </button>
      <button class="demo-button" type="button" @click="toggleTheme">
        切换无关状态
      </button>
      <button class="demo-button" type="button" @click="reset">重置</button>
    </div>

    <ol class="demo-trace" aria-label="Vue 执行观察">
      <li>
        <span>01 / 最近赋值</span>
        <code>{{ lastAction }}</code>
      </li>
      <li>
        <span>02 / count effect</span>
        <strong>{{ trackedSnapshot }}；已执行 {{ trackedEffectRuns }} 次</strong>
      </li>
      <li>
        <span>03 / setup</span>
        <p>
          仍为 {{ setupExecutions }} 次；组件实例与闭包继续持有同一组 refs。
        </p>
      </li>
    </ol>
  </div>
</template>
