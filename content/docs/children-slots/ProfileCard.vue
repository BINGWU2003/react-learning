<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <section class="demo-card">
    <span class="demo-tag">default / footer slot</span>
    <h2>{{ title }}</h2>
    <div><slot /></div>
    <div class="demo-actions"><slot name="footer" /></div>
  </section>
</template>

