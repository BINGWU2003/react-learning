<script setup lang="ts">
import { reactive, ref } from "vue";

const count = ref(0);
const profile = reactive({
  name: "小明",
  score: 0,
});

function increment() {
  count.value += 1;
  profile.score += 1;
}

function reset() {
  count.value = 0;
  profile.score = 0;
}
</script>

<template>
  <div class="demo-stack">
    <div class="demo-card">
      <span class="demo-tag">ref / reactive</span>
      <h2>{{ profile.name }}的计数器</h2>
      <p>count：{{ count }}</p>
      <p>score：{{ profile.score }}</p>
    </div>
    <div class="demo-actions">
      <button class="demo-button" type="button" @click="increment">
        同时加一
      </button>
      <button class="demo-button" type="button" @click="reset">重置</button>
    </div>
  </div>
</template>
