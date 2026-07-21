<script setup lang="ts">
import { ref } from "vue";
import ProfileCard from "./ProfileCard.vue";

const completed = ref(3);
</script>

<template>
  <ProfileCard title="本周学习进度">
    <p>已经完成 {{ completed }} 篇 React / Vue 对比笔记。</p>
    <p class="demo-muted">正文进入默认插槽，按钮进入 footer 具名插槽。</p>

    <template #footer>
      <button class="demo-button" type="button" @click="completed += 1">
        完成一篇
      </button>
    </template>
  </ProfileCard>
</template>

