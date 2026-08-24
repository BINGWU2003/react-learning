<script setup lang="ts">
import { inject } from "vue";
import { userKey } from "./userContext";

const context = inject(userKey);
if (!context) throw new Error("Missing UserProvider");
</script>

<template>
  <div class="demo-form">
    <label class="demo-field">
      Consumer B 修改用户名
      <input
        :value="context.user.value.name"
        class="d-input d-input-sm w-full"
        @input="context.setName(($event.target as HTMLInputElement).value)"
      />
    </label>
    <div class="demo-actions">
      <button
        class="d-btn d-btn-primary d-btn-sm"
        type="button"
        @click="context.toggleRole"
      >
        切换角色
      </button>
    </div>
  </div>
</template>
