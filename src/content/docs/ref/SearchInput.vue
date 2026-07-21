<script setup lang="ts">
import { ref } from "vue";

const inputRef = ref<HTMLInputElement | null>(null);

function focus() {
  inputRef.value?.focus();
}

function select() {
  inputRef.value?.select();
}

defineExpose({ focus, select });
</script>

<template>
  <label class="demo-field">
    子组件输入框
    <input
      ref="inputRef"
      class="demo-input"
      value="Vue template ref"
    />
  </label>
</template>
