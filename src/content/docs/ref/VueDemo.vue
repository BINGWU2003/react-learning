<script setup lang="ts">
import { ref } from "vue";
import SearchInput from "./SearchInput.vue";

const searchRef = ref<InstanceType<typeof SearchInput> | null>(null);
const action = ref("等待操作");

function focusInput() {
  searchRef.value?.focus();
  action.value = "已聚焦输入框";
}

function selectInput() {
  searchRef.value?.select();
  action.value = "已全选输入内容";
}
</script>

<template>
  <div class="demo-stack">
    <SearchInput ref="searchRef" />
    <div class="demo-actions">
      <button class="demo-button" type="button" @click="focusInput">
        聚焦
      </button>
      <button class="demo-button" type="button" @click="selectInput">
        全选
      </button>
    </div>
    <p class="demo-result" aria-live="polite">{{ action }}</p>
  </div>
</template>
