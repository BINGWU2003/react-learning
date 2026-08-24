<script setup lang="ts">
import { ref } from "vue";
import MessageInput from "./MessageInput.vue";

const message = ref("还没有收到消息");
</script>

<template>
  <div class="demo-stack">
    <div class="demo-card">
      <span class="demo-tag">Parent</span>
      <h2>组件通信</h2>
      <p>父组件监听子组件触发的 send 事件。</p>
    </div>
    <MessageInput @send="message = $event" />
    <p class="demo-result" aria-live="polite">父组件收到：{{ message }}</p>
  </div>
</template>
