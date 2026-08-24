<script setup lang="ts">
import { inject } from "vue";
import { userKey } from "./userContext";

const context = inject(userKey);
if (!context) throw new Error("Missing UserProvider");
</script>

<template>
  <div class="demo-card">
    <span class="demo-tag">Consumer A</span>
    <h2>{{ context.user.value.name }}</h2>
    <p>当前角色：{{ context.user.value.role }}</p>
  </div>
</template>
