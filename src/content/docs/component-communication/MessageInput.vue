<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  send: [message: string];
}>();

const value = ref("");

function handleSubmit() {
  const message = value.value.trim();
  if (!message) return;
  emit("send", message);
  value.value = "";
}
</script>

<template>
  <form class="demo-form" @submit.prevent="handleSubmit">
    <label class="demo-field">
      子组件输入
      <input
        v-model="value"
        class="demo-input"
        placeholder="输入一条消息"
      />
    </label>
    <div class="demo-actions">
      <button class="demo-button" type="submit">发送给父组件</button>
    </div>
  </form>
</template>
