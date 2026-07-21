<script setup lang="ts">
import { ref } from "vue";

const name = ref("小明");
const direction = ref("Vue");
const submitted = ref(0);

function submit() {
  submitted.value += 1;
}
</script>

<template>
  <div class="demo-stack">
    <form class="demo-form" @submit.prevent="submit">
      <label class="demo-field">
        姓名
        <input v-model="name" class="demo-input" />
      </label>
      <label class="demo-field">
        学习方向
        <select v-model="direction" class="demo-select">
          <option>React</option>
          <option>Vue</option>
          <option>两者对比</option>
        </select>
      </label>
      <button class="demo-button" type="submit">保存资料</button>
    </form>
    <div class="demo-card">
      <span class="demo-tag">实时 ref</span>
      <h2>{{ name || "未填写姓名" }}</h2>
      <p>正在学习：{{ direction }}</p>
      <p>已保存：{{ submitted }} 次</p>
    </div>
  </div>
</template>

