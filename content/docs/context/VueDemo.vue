<script setup lang="ts">
import { provide, ref } from "vue";
import UserActions from "./UserActions.vue";
import UserProfile from "./UserProfile.vue";
import { userKey, type User } from "./userContext";

const user = ref<User>({ name: "小明", role: "访客" });

function setName(name: string) {
  user.value.name = name || "小明";
}

function toggleRole() {
  user.value.role = user.value.role === "访客" ? "管理员" : "访客";
}

provide(userKey, { user, setName, toggleRole });
</script>

<template>
  <div class="demo-stack">
    <UserProfile />
    <UserActions />
  </div>
</template>
